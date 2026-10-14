import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { istDateTimeLocal } from "@/lib/dates";
import { updateBooking } from "../../actions";
import { BookingForm } from "../../BookingForm";

export default async function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: booking }, { data: invoice }] = await Promise.all([
    supabase
      .from("bookings")
      .select(
        "id, booking_reference, check_in_at, check_out_at, num_guests, source, notes, guests(full_name, phone, email, id_proof_type, id_proof_number), booking_rooms(room_id)",
      )
      .eq("id", id)
      .maybeSingle(),
    supabase.from("invoices").select("grand_total, amount_paid").eq("booking_id", id).maybeSingle(),
  ]);

  if (!booking) notFound();

  const bookedRoomIds = (booking.booking_rooms ?? []).map((br) => br.room_id);

  // Active rooms, plus any room already on this booking even if it has since
  // been deactivated, so saving doesn't silently drop it.
  const { data: rooms } = await supabase
    .from("rooms")
    .select("id, room_number, room_types(name)")
    .or(bookedRoomIds.length > 0 ? `is_active.eq.true,id.in.(${bookedRoomIds.join(",")})` : "is_active.eq.true")
    .order("room_number");

  return (
    <div style={{ maxWidth: "640px" }}>
      <h1>Edit {booking.booking_reference}</h1>
      <BookingForm
        action={updateBooking.bind(null, booking.id)}
        rooms={rooms ?? []}
        cancelHref={`/admin/bookings/${booking.id}`}
        initial={{
          guestFullName: booking.guests?.full_name ?? "",
          guestPhone: booking.guests?.phone ?? "",
          guestEmail: booking.guests?.email ?? "",
          idProofType: booking.guests?.id_proof_type ?? "",
          idProofNumber: booking.guests?.id_proof_number ?? "",
          checkIn: istDateTimeLocal(booking.check_in_at),
          checkOut: istDateTimeLocal(booking.check_out_at),
          numGuests: booking.num_guests,
          source: booking.source,
          roomIds: bookedRoomIds,
          notes: booking.notes ?? "",
          total: Number(invoice?.grand_total ?? 0),
          amountPaid: Number(invoice?.amount_paid ?? 0),
        }}
      />
    </div>
  );
}
