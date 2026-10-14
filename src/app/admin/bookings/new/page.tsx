import { createClient } from "@/lib/supabase/server";
import { createBooking } from "../actions";
import { BookingForm } from "../BookingForm";

export default async function NewBookingPage() {
  const supabase = await createClient();

  const { data: rooms } = await supabase
    .from("rooms")
    .select("id, room_number, room_types(name)")
    .eq("is_active", true)
    .order("room_number");

  return (
    <div style={{ maxWidth: "640px" }}>
      <h1>New Booking</h1>
      <BookingForm action={createBooking} rooms={rooms ?? []} cancelHref="/admin/bookings" />
    </div>
  );
}
