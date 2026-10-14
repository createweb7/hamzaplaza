"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { GST_NUMBER } from "@/lib/business-info";
import { createClient } from "@/lib/supabase/server";
import {
  hasErrors,
  normalizePhone,
  validateBookingForm,
  validatePaymentForm,
  validateStayForm,
  type FormState,
} from "./validation";

// Business is in Tamil Nadu (IST, UTC+5:30, no DST) — datetime-local inputs
// carry no offset, so we pin them to IST explicitly rather than letting
// Postgres assume the session timezone (which may not be IST).
function toIstIso(datetimeLocal: string) {
  const withSeconds = datetimeLocal.length === 16 ? `${datetimeLocal}:00` : datetimeLocal;
  return `${withSeconds}+05:30`;
}

type Supabase = Awaited<ReturnType<typeof createClient>>;

// References of active bookings (other than `excludeBookingId`) that hold any
// of `roomIds` during [checkInIso, checkOutIso).
async function findRoomConflicts(
  supabase: Supabase,
  roomIds: string[],
  checkInIso: string,
  checkOutIso: string,
  excludeBookingId?: string,
) {
  const { data: existingRoomBookings } = await supabase
    .from("booking_rooms")
    .select("room_id, bookings(id, check_in_at, check_out_at, status, booking_reference)")
    .in("room_id", roomIds);

  const checkInMs = new Date(checkInIso).getTime();
  const checkOutMs = new Date(checkOutIso).getTime();

  const refs = (existingRoomBookings ?? [])
    .filter((row) => {
      const b = row.bookings;
      if (!b || b.id === excludeBookingId || b.status === "cancelled" || b.status === "no_show") return false;
      const existingIn = new Date(b.check_in_at).getTime();
      const existingOut = new Date(b.check_out_at).getTime();
      return existingIn < checkOutMs && existingOut > checkInMs;
    })
    .map((row) => row.bookings?.booking_reference);

  return [...new Set(refs)];
}

function conflictError(refs: (string | undefined)[]): FormState {
  return { errors: { room_ids: `Room already booked for that period (conflicts with ${refs.join(", ")}).` } };
}

async function uploadIdPhotos(supabase: Supabase, guestId: string, formData: FormData) {
  const update: { id_proof_front_path?: string; id_proof_back_path?: string } = {};

  for (const side of ["front", "back"] as const) {
    const file = formData.get(`id_proof_${side}`);
    if (!(file instanceof File) || file.size === 0) continue;
    const path = `${guestId}/${side}-${Date.now()}.${file.name.split(".").pop() ?? "jpg"}`;
    const { error } = await supabase.storage.from("id-proofs").upload(path, file, { upsert: true, contentType: file.type });
    if (error) return { error: error.message, update };
    update[`id_proof_${side}_path`] = path;
  }

  return { error: null, update };
}

function readBookingForm(formData: FormData) {
  return {
    guestFullName: String(formData.get("guest_full_name") ?? "").trim(),
    guestPhone: normalizePhone(String(formData.get("guest_phone") ?? "").trim()),
    guestEmail: String(formData.get("guest_email") ?? "").trim(),
    checkInIso: toIstIso(String(formData.get("check_in_at") ?? "")),
    checkOutIso: toIstIso(String(formData.get("check_out_at") ?? "")),
    numGuests: formData.get("num_guests") ? Number(formData.get("num_guests")) : null,
    source: (String(formData.get("source") ?? "") || null) as "phone" | "whatsapp" | "walk_in" | null,
    notes: String(formData.get("notes") ?? "").trim(),
    roomIds: formData.getAll("room_ids").map(String),
    totalAmount: Number(formData.get("total_amount") ?? 0),
    idProofType: String(formData.get("id_proof_type") ?? "").trim(),
    idProofNumber: String(formData.get("id_proof_number") ?? "").trim(),
  };
}

export async function createBooking(_prev: FormState, formData: FormData): Promise<FormState> {
  const errors = validateBookingForm(formData, "create");
  if (hasErrors(errors)) return { errors };

  const {
    guestFullName,
    guestPhone,
    guestEmail,
    checkInIso,
    checkOutIso,
    numGuests,
    source,
    notes,
    roomIds,
    totalAmount,
    idProofType,
    idProofNumber,
  } = readBookingForm(formData);
  const rawPhone = String(formData.get("guest_phone") ?? "").trim();
  const advanceAmount = Number(formData.get("advance_amount") ?? 0) || 0;
  const paymentType = String(formData.get("payment_type") ?? "").trim();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check availability before touching the guest record, so a rejected
  // booking doesn't leave a half-created guest behind.
  const conflicts = await findRoomConflicts(supabase, roomIds, checkInIso, checkOutIso);
  if (conflicts.length > 0) return conflictError(conflicts);

  // Match on the typed value too, for guests saved before phones were normalized.
  const { data: existingGuest } = await supabase
    .from("guests")
    .select("id")
    .in("phone", [...new Set([guestPhone, rawPhone])])
    .limit(1)
    .maybeSingle();

  let guestId = existingGuest?.id as string | undefined;

  if (!guestId) {
    const { data: newGuest, error: guestError } = await supabase
      .from("guests")
      .insert({
        full_name: guestFullName,
        phone: guestPhone,
        email: guestEmail || null,
        id_proof_type: idProofType || null,
        id_proof_number: idProofNumber || null,
      })
      .select("id")
      .single();

    if (guestError) return { message: guestError.message };
    guestId = newGuest.id;
  } else if (idProofType || idProofNumber) {
    await supabase
      .from("guests")
      .update({
        ...(idProofType ? { id_proof_type: idProofType } : {}),
        ...(idProofNumber ? { id_proof_number: idProofNumber } : {}),
      })
      .eq("id", guestId);
  }

  const photos = await uploadIdPhotos(supabase, guestId!, formData);
  if (photos.error) return { message: photos.error };

  if (Object.keys(photos.update).length > 0) {
    const { error: guestUpdateError } = await supabase.from("guests").update(photos.update).eq("id", guestId!);
    if (guestUpdateError) return { message: guestUpdateError.message };
  }

  const { data: roomTypeRows } = await supabase.from("rooms").select("id, room_type_id, room_number").in("id", roomIds);
  if (roomIds.some((id) => !roomTypeRows?.some((r) => r.id === id))) {
    return { errors: { room_ids: "One of the selected rooms no longer exists — reload and pick again." } };
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      guest_id: guestId!,
      check_in_at: checkInIso,
      check_out_at: checkOutIso,
      num_guests: numGuests,
      source,
      notes: notes || null,
      created_by: user?.id,
    })
    .select("id, booking_reference")
    .single();

  if (bookingError) return { message: bookingError.message };

  const bookingRoomsPayload = roomIds.map((roomId) => ({
    booking_id: booking.id,
    room_id: roomId,
    room_type_id: roomTypeRows!.find((r) => r.id === roomId)!.room_type_id,
  }));

  const { error: bookingRoomsError } = await supabase.from("booking_rooms").insert(bookingRoomsPayload);

  if (bookingRoomsError) return { message: bookingRoomsError.message };

  const balanceDue = totalAmount - advanceAmount;
  const invoiceStatus = balanceDue <= 0 ? "paid" : advanceAmount > 0 ? "partially_paid" : "issued";

  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .insert({
      invoice_number: `INV-${booking.booking_reference.replace("HRP-", "")}`,
      booking_id: booking.id,
      guest_id: guestId!,
      status: invoiceStatus,
      subtotal: totalAmount,
      tax_total: 0,
      grand_total: totalAmount,
      amount_paid: advanceAmount,
      balance_due: balanceDue,
      gst_number: GST_NUMBER,
      created_by: user?.id,
    })
    .select("id")
    .single();

  if (invoiceError) return { message: invoiceError.message };

  const roomLabel = roomTypeRows?.map((r) => r.room_number).join(", ") || `${roomIds.length} room(s)`;

  const { error: lineItemError } = await supabase.from("invoice_line_items").insert({
    invoice_id: invoice.id,
    description: `Room stay — ${roomLabel}`,
    quantity: 1,
    unit_price: totalAmount,
    line_subtotal: totalAmount,
    line_tax: 0,
    line_total: totalAmount,
  });

  if (lineItemError) return { message: lineItemError.message };

  if (advanceAmount > 0) {
    const { error: paymentError } = await supabase.from("payments").insert({
      invoice_id: invoice.id,
      amount: advanceAmount,
      payment_method: paymentType || null,
      recorded_by: user?.id,
    });

    if (paymentError) return { message: paymentError.message };
  }

  revalidatePath("/admin/bookings");
  redirect(`/admin/bookings/${booking.id}`);
}

export async function updateBooking(bookingId: string, _prev: FormState, formData: FormData): Promise<FormState> {
  const errors = validateBookingForm(formData, "edit");
  if (hasErrors(errors)) return { errors };

  const {
    guestFullName,
    guestPhone,
    guestEmail,
    checkInIso,
    checkOutIso,
    numGuests,
    source,
    notes,
    roomIds,
    totalAmount,
    idProofType,
    idProofNumber,
  } = readBookingForm(formData);

  const supabase = await createClient();

  const { data: booking, error: bookingFetchError } = await supabase
    .from("bookings")
    .select("guest_id")
    .eq("id", bookingId)
    .single();
  if (bookingFetchError) return { message: bookingFetchError.message };

  const conflicts = await findRoomConflicts(supabase, roomIds, checkInIso, checkOutIso, bookingId);
  if (conflicts.length > 0) return conflictError(conflicts);

  const { data: phoneOwner } = await supabase
    .from("guests")
    .select("id")
    .eq("phone", guestPhone)
    .neq("id", booking.guest_id)
    .limit(1)
    .maybeSingle();
  if (phoneOwner) return { errors: { guest_phone: "Another guest already has this phone number." } };

  const { data: roomTypeRows } = await supabase.from("rooms").select("id, room_type_id, room_number").in("id", roomIds);
  if (roomIds.some((id) => !roomTypeRows?.some((r) => r.id === id))) {
    return { errors: { room_ids: "One of the selected rooms no longer exists — reload and pick again." } };
  }

  const photos = await uploadIdPhotos(supabase, booking.guest_id, formData);
  if (photos.error) return { message: photos.error };

  const { error: guestError } = await supabase
    .from("guests")
    .update({
      full_name: guestFullName,
      phone: guestPhone,
      email: guestEmail || null,
      id_proof_type: idProofType || null,
      id_proof_number: idProofNumber || null,
      ...photos.update,
    })
    .eq("id", booking.guest_id);
  if (guestError) return { message: guestError.message };

  const { error: bookingError } = await supabase
    .from("bookings")
    .update({
      check_in_at: checkInIso,
      check_out_at: checkOutIso,
      num_guests: numGuests,
      source,
      notes: notes || null,
    })
    .eq("id", bookingId);
  if (bookingError) return { message: bookingError.message };

  const { error: roomsDeleteError } = await supabase.from("booking_rooms").delete().eq("booking_id", bookingId);
  if (roomsDeleteError) return { message: roomsDeleteError.message };

  const { error: roomsInsertError } = await supabase.from("booking_rooms").insert(
    roomIds.map((roomId) => ({
      booking_id: bookingId,
      room_id: roomId,
      room_type_id: roomTypeRows!.find((r) => r.id === roomId)!.room_type_id,
    })),
  );
  if (roomsInsertError) return { message: roomsInsertError.message };

  const { data: invoice } = await supabase
    .from("invoices")
    .select("id, amount_paid, invoice_line_items(id)")
    .eq("booking_id", bookingId)
    .maybeSingle();

  if (invoice) {
    const amountPaid = Number(invoice.amount_paid);
    const balanceDue = totalAmount - amountPaid;
    const status = balanceDue <= 0 ? "paid" : amountPaid > 0 ? "partially_paid" : "issued";

    const { error: invoiceError } = await supabase
      .from("invoices")
      .update({ subtotal: totalAmount, grand_total: totalAmount, balance_due: balanceDue, status })
      .eq("id", invoice.id);
    if (invoiceError) return { message: invoiceError.message };

    const lineItemId = invoice.invoice_line_items?.[0]?.id;
    if (lineItemId) {
      const roomLabel = roomTypeRows?.map((r) => r.room_number).join(", ") || `${roomIds.length} room(s)`;
      const { error: lineItemError } = await supabase
        .from("invoice_line_items")
        .update({
          description: `Room stay — ${roomLabel}`,
          unit_price: totalAmount,
          line_subtotal: totalAmount,
          line_total: totalAmount,
        })
        .eq("id", lineItemId);
      if (lineItemError) return { message: lineItemError.message };
    }
  }

  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${bookingId}`);
  redirect(`/admin/bookings/${bookingId}`);
}

// Permanently removes the booking with its rooms, invoice, line items and
// payments. The guest record is kept (it may have other bookings).
export async function deleteBooking(bookingId: string, redirectTo?: string): Promise<FormState> {
  const supabase = await createClient();

  const { data: invoices, error: invoiceFetchError } = await supabase
    .from("invoices")
    .select("id")
    .eq("booking_id", bookingId);
  if (invoiceFetchError) return { message: invoiceFetchError.message };

  const invoiceIds = (invoices ?? []).map((i) => i.id);

  if (invoiceIds.length > 0) {
    for (const table of ["payments", "invoice_line_items"] as const) {
      const { error } = await supabase.from(table).delete().in("invoice_id", invoiceIds);
      if (error) return { message: error.message };
    }
    const { error: invoiceDeleteError } = await supabase.from("invoices").delete().in("id", invoiceIds);
    if (invoiceDeleteError) return { message: invoiceDeleteError.message };
  }

  const { error: roomsError } = await supabase.from("booking_rooms").delete().eq("booking_id", bookingId);
  if (roomsError) return { message: roomsError.message };

  const { data: deleted, error: bookingError } = await supabase.from("bookings").delete().eq("id", bookingId).select("id");
  if (bookingError) return { message: bookingError.message };
  if (!deleted || deleted.length === 0) return { message: "Booking could not be deleted (not found or not permitted)." };

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/calendar");
  revalidatePath("/admin/invoices");
  revalidatePath("/admin");

  if (redirectTo?.startsWith("/admin/")) redirect(redirectTo);
  return { ok: true };
}

export async function recordPayment(
  bookingId: string,
  invoiceId: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const errors = validatePaymentForm(formData);
  if (hasErrors(errors)) return { errors };

  const amount = Number(formData.get("amount") ?? 0);
  const paymentType = String(formData.get("payment_type") ?? "").trim();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: invoice, error: invoiceFetchError } = await supabase
    .from("invoices")
    .select("amount_paid, grand_total")
    .eq("id", invoiceId)
    .single();

  if (invoiceFetchError) return { message: invoiceFetchError.message };

  const newAmountPaid = Number(invoice.amount_paid) + amount;
  const newBalanceDue = Number(invoice.grand_total) - newAmountPaid;

  const { error: paymentError } = await supabase.from("payments").insert({
    invoice_id: invoiceId,
    amount,
    payment_method: paymentType || null,
    recorded_by: user?.id,
  });

  if (paymentError) return { message: paymentError.message };

  const { error: updateError } = await supabase
    .from("invoices")
    .update({
      amount_paid: newAmountPaid,
      balance_due: newBalanceDue,
      status: newBalanceDue <= 0 ? "paid" : "partially_paid",
    })
    .eq("id", invoiceId);

  if (updateError) return { message: updateError.message };

  revalidatePath(`/admin/bookings/${bookingId}`);
  return { ok: true };
}

export async function deletePayment(bookingId: string, invoiceId: string, paymentId: string) {
  const supabase = await createClient();

  const { data: payment, error: paymentFetchError } = await supabase
    .from("payments")
    .select("amount")
    .eq("id", paymentId)
    .single();

  if (paymentFetchError) throw new Error(paymentFetchError.message);

  const { data: invoice, error: invoiceFetchError } = await supabase
    .from("invoices")
    .select("amount_paid, grand_total")
    .eq("id", invoiceId)
    .single();

  if (invoiceFetchError) throw new Error(invoiceFetchError.message);

  const { error: deleteError } = await supabase.from("payments").delete().eq("id", paymentId);
  if (deleteError) throw new Error(deleteError.message);

  const newAmountPaid = Number(invoice.amount_paid) - Number(payment.amount);
  const newBalanceDue = Number(invoice.grand_total) - newAmountPaid;

  const { error: updateError } = await supabase
    .from("invoices")
    .update({
      amount_paid: newAmountPaid,
      balance_due: newBalanceDue,
      status: newBalanceDue <= 0 ? (newAmountPaid > 0 ? "paid" : "issued") : newAmountPaid > 0 ? "partially_paid" : "issued",
    })
    .eq("id", invoiceId);

  if (updateError) throw new Error(updateError.message);

  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${bookingId}`);
}

export async function updateBookingStay(bookingId: string, _prev: FormState, formData: FormData): Promise<FormState> {
  const errors = validateStayForm(formData);
  if (hasErrors(errors)) return { errors };

  const checkInAt = String(formData.get("check_in_at") ?? "");
  const checkOutAt = String(formData.get("check_out_at") ?? "");
  const totalAmount = Number(formData.get("total_amount") ?? 0);

  const checkInIso = toIstIso(checkInAt);
  const checkOutIso = toIstIso(checkOutAt);

  const supabase = await createClient();

  const { data: currentRooms } = await supabase.from("booking_rooms").select("room_id").eq("booking_id", bookingId);
  const roomIds = (currentRooms ?? []).map((r) => r.room_id);

  if (roomIds.length > 0) {
    const conflicts = await findRoomConflicts(supabase, roomIds, checkInIso, checkOutIso, bookingId);
    if (conflicts.length > 0) {
      return { errors: { check_out_at: `Room already booked for that period (conflicts with ${conflicts.join(", ")}).` } };
    }
  }

  const { data: booking, error: bookingFetchError } = await supabase
    .from("bookings")
    .select("notes")
    .eq("id", bookingId)
    .single();
  if (bookingFetchError) return { message: bookingFetchError.message };

  const editNote = `Stay edited on ${new Date().toLocaleDateString("en-IN")}: check-in/out updated, total set to ₹${totalAmount}.`;

  const { error: updateError } = await supabase
    .from("bookings")
    .update({
      check_in_at: checkInIso,
      check_out_at: checkOutIso,
      notes: booking.notes ? `${booking.notes} ${editNote}` : editNote,
    })
    .eq("id", bookingId);
  if (updateError) return { message: updateError.message };

  const { data: invoice } = await supabase.from("invoices").select("id, amount_paid").eq("booking_id", bookingId).maybeSingle();
  if (invoice) {
    const amountPaid = Number(invoice.amount_paid);
    const balanceDue = totalAmount - amountPaid;
    const status = balanceDue <= 0 ? "paid" : amountPaid > 0 ? "partially_paid" : "issued";

    const { error: invoiceError } = await supabase
      .from("invoices")
      .update({ subtotal: totalAmount, grand_total: totalAmount, balance_due: balanceDue, status })
      .eq("id", invoice.id);
    if (invoiceError) return { message: invoiceError.message };
  }

  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${bookingId}`);
  return { ok: true };
}

export async function setBookingStatus(
  bookingId: string,
  status: "confirmed" | "checked_in" | "checked_out" | "cancelled" | "no_show",
) {
  const supabase = await createClient();
  const { error } = await supabase.from("bookings").update({ status }).eq("id", bookingId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${bookingId}`);
}
