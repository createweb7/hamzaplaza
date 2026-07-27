"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { GST_NUMBER } from "@/lib/business-info";
import { createClient } from "@/lib/supabase/server";

// Business is in Tamil Nadu (IST, UTC+5:30, no DST) — datetime-local inputs
// carry no offset, so we pin them to IST explicitly rather than letting
// Postgres assume the session timezone (which may not be IST).
function toIstIso(datetimeLocal: string) {
  const withSeconds = datetimeLocal.length === 16 ? `${datetimeLocal}:00` : datetimeLocal;
  return `${withSeconds}+05:30`;
}

export async function createBooking(formData: FormData) {
  const guestFullName = String(formData.get("guest_full_name") ?? "").trim();
  const guestPhone = String(formData.get("guest_phone") ?? "").trim();
  const guestEmail = String(formData.get("guest_email") ?? "").trim();
  const checkInAt = String(formData.get("check_in_at") ?? "");
  const checkOutAt = String(formData.get("check_out_at") ?? "");
  const numGuests = formData.get("num_guests") ? Number(formData.get("num_guests")) : null;
  const source = String(formData.get("source") ?? "") || null;
  const notes = String(formData.get("notes") ?? "").trim();
  const roomIds = formData.getAll("room_ids").map(String);

  const totalAmount = Number(formData.get("total_amount") ?? 0);
  const advanceAmount = Number(formData.get("advance_amount") ?? 0) || 0;
  const paymentType = String(formData.get("payment_type") ?? "").trim();

  const idProofType = String(formData.get("id_proof_type") ?? "").trim();
  const idProofNumber = String(formData.get("id_proof_number") ?? "").trim();
  const idProofFront = formData.get("id_proof_front");
  const idProofBack = formData.get("id_proof_back");

  if (!guestFullName || !guestPhone || !checkInAt || !checkOutAt || roomIds.length === 0) {
    throw new Error("Guest name, phone, check-in/out, and at least one room are required.");
  }

  if (!totalAmount || totalAmount <= 0) {
    throw new Error("Total amount is required.");
  }

  if (advanceAmount > totalAmount) {
    throw new Error("Advance paid can't be more than the total amount.");
  }

  const checkInIso = toIstIso(checkInAt);
  const checkOutIso = toIstIso(checkOutAt);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: existingGuest } = await supabase
    .from("guests")
    .select("id")
    .eq("phone", guestPhone)
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

    if (guestError) throw new Error(guestError.message);
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

  const guestUpdate: { id_proof_front_path?: string; id_proof_back_path?: string } = {};

  if (idProofFront instanceof File && idProofFront.size > 0) {
    const path = `${guestId}/front-${Date.now()}.${idProofFront.name.split(".").pop() ?? "jpg"}`;
    const { error: uploadError } = await supabase.storage
      .from("id-proofs")
      .upload(path, idProofFront, { upsert: true, contentType: idProofFront.type });
    if (uploadError) throw new Error(uploadError.message);
    guestUpdate.id_proof_front_path = path;
  }

  if (idProofBack instanceof File && idProofBack.size > 0) {
    const path = `${guestId}/back-${Date.now()}.${idProofBack.name.split(".").pop() ?? "jpg"}`;
    const { error: uploadError } = await supabase.storage
      .from("id-proofs")
      .upload(path, idProofBack, { upsert: true, contentType: idProofBack.type });
    if (uploadError) throw new Error(uploadError.message);
    guestUpdate.id_proof_back_path = path;
  }

  if (Object.keys(guestUpdate).length > 0) {
    const { error: guestUpdateError } = await supabase.from("guests").update(guestUpdate).eq("id", guestId);
    if (guestUpdateError) throw new Error(guestUpdateError.message);
  }

  const { data: existingRoomBookings } = await supabase
    .from("booking_rooms")
    .select("room_id, bookings(check_in_at, check_out_at, status, booking_reference)")
    .in("room_id", roomIds);

  const checkInMs = new Date(checkInIso).getTime();
  const checkOutMs = new Date(checkOutIso).getTime();

  const conflicts = (existingRoomBookings ?? []).filter((row) => {
    const b = row.bookings;
    if (!b || b.status === "cancelled" || b.status === "no_show") return false;
    const existingIn = new Date(b.check_in_at).getTime();
    const existingOut = new Date(b.check_out_at).getTime();
    return existingIn < checkOutMs && existingOut > checkInMs;
  });

  if (conflicts.length > 0) {
    throw new Error(
      `Room already booked for that period (conflicts with ${conflicts
        .map((c) => c.bookings?.booking_reference)
        .join(", ")}).`,
    );
  }

  const { data: roomTypeRows } = await supabase.from("rooms").select("id, room_type_id, room_number").in("id", roomIds);

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      guest_id: guestId,
      check_in_at: checkInIso,
      check_out_at: checkOutIso,
      num_guests: numGuests,
      source: source as "phone" | "whatsapp" | "walk_in" | null,
      notes: notes || null,
      created_by: user?.id,
    })
    .select("id, booking_reference")
    .single();

  if (bookingError) throw new Error(bookingError.message);

  const bookingRoomsPayload = roomIds.map((roomId) => {
    const roomTypeId = roomTypeRows?.find((r) => r.id === roomId)?.room_type_id;
    if (!roomTypeId) throw new Error(`Room ${roomId} not found.`);
    return { booking_id: booking.id, room_id: roomId, room_type_id: roomTypeId };
  });

  const { error: bookingRoomsError } = await supabase.from("booking_rooms").insert(bookingRoomsPayload);

  if (bookingRoomsError) throw new Error(bookingRoomsError.message);

  const balanceDue = totalAmount - advanceAmount;
  const invoiceStatus = balanceDue <= 0 ? "paid" : advanceAmount > 0 ? "partially_paid" : "issued";

  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .insert({
      invoice_number: `INV-${booking.booking_reference.replace("HRP-", "")}`,
      booking_id: booking.id,
      guest_id: guestId,
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

  if (invoiceError) throw new Error(invoiceError.message);

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

  if (lineItemError) throw new Error(lineItemError.message);

  if (advanceAmount > 0) {
    const { error: paymentError } = await supabase.from("payments").insert({
      invoice_id: invoice.id,
      amount: advanceAmount,
      payment_method: paymentType || null,
      recorded_by: user?.id,
    });

    if (paymentError) throw new Error(paymentError.message);
  }

  revalidatePath("/admin/bookings");
  redirect(`/admin/bookings/${booking.id}`);
}

export async function recordPayment(bookingId: string, invoiceId: string, formData: FormData) {
  const amount = Number(formData.get("amount") ?? 0);
  const paymentType = String(formData.get("payment_type") ?? "").trim();

  if (!amount || amount <= 0) {
    throw new Error("Payment amount must be greater than zero.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: invoice, error: invoiceFetchError } = await supabase
    .from("invoices")
    .select("amount_paid, grand_total")
    .eq("id", invoiceId)
    .single();

  if (invoiceFetchError) throw new Error(invoiceFetchError.message);

  const newAmountPaid = Number(invoice.amount_paid) + amount;
  const newBalanceDue = Number(invoice.grand_total) - newAmountPaid;

  const { error: paymentError } = await supabase.from("payments").insert({
    invoice_id: invoiceId,
    amount,
    payment_method: paymentType || null,
    recorded_by: user?.id,
  });

  if (paymentError) throw new Error(paymentError.message);

  const { error: updateError } = await supabase
    .from("invoices")
    .update({
      amount_paid: newAmountPaid,
      balance_due: newBalanceDue,
      status: newBalanceDue <= 0 ? "paid" : "partially_paid",
    })
    .eq("id", invoiceId);

  if (updateError) throw new Error(updateError.message);

  revalidatePath(`/admin/bookings/${bookingId}`);
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
