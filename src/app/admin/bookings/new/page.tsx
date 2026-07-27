import { createClient } from "@/lib/supabase/server";
import { createBooking } from "../actions";

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

      <form action={createBooking} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <fieldset style={{ display: "flex", flexDirection: "column", gap: "0.75rem", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
          <legend>Guest</legend>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Full name
            <input name="guest_full_name" required style={{ padding: "0.5rem" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Phone
            <input name="guest_phone" required style={{ padding: "0.5rem" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Email (optional)
            <input name="guest_email" type="email" style={{ padding: "0.5rem" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            ID proof type
            <select name="id_proof_type" style={{ padding: "0.5rem" }} defaultValue="">
              <option value="">Select...</option>
              <option value="Aadhaar">Aadhaar</option>
              <option value="Driving License">Driving License</option>
              <option value="Passport">Passport</option>
              <option value="Voter ID">Voter ID</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            ID proof number
            <input name="id_proof_number" style={{ padding: "0.5rem" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            ID proof photo — front (optional)
            <input name="id_proof_front" type="file" accept="image/*" style={{ padding: "0.5rem" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            ID proof photo — back (optional)
            <input name="id_proof_back" type="file" accept="image/*" style={{ padding: "0.5rem" }} />
          </label>
          <p style={{ fontSize: "0.8rem", color: "var(--text-faint)", margin: 0 }}>
            If a guest with this phone number already exists, we&apos;ll reuse their record and update
            these details on it.
          </p>
        </fieldset>

        <fieldset style={{ display: "flex", flexDirection: "column", gap: "0.75rem", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
          <legend>Stay</legend>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Check-in
            <input name="check_in_at" type="datetime-local" required style={{ padding: "0.5rem" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Check-out
            <input name="check_out_at" type="datetime-local" required style={{ padding: "0.5rem" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Number of guests
            <input name="num_guests" type="number" min={1} style={{ padding: "0.5rem" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Source
            <select name="source" style={{ padding: "0.5rem" }}>
              <option value="phone">Phone</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="walk_in">Walk-in</option>
            </select>
          </label>
        </fieldset>

        <fieldset style={{ display: "flex", flexDirection: "column", gap: "0.5rem", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
          <legend>Rooms</legend>
          {rooms?.map((room) => (
            <label key={room.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input type="checkbox" name="room_ids" value={room.id} />
              {room.room_number} — {room.room_types?.name}
            </label>
          ))}
          {rooms?.length === 0 && (
            <p style={{ color: "var(--text-faint)", margin: 0 }}>
              No active rooms yet — add some in Rooms first.
            </p>
          )}
        </fieldset>

        <fieldset style={{ display: "flex", flexDirection: "column", gap: "0.75rem", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
          <legend>Payment</legend>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Total amount (₹)
            <input name="total_amount" type="number" min={0} step="0.01" required style={{ padding: "0.5rem" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Advance paid now (₹, optional)
            <input name="advance_amount" type="number" min={0} step="0.01" style={{ padding: "0.5rem" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Payment type
            <input name="payment_type" list="payment-types" placeholder="e.g. GPay, Cash" style={{ padding: "0.5rem" }} />
            <datalist id="payment-types">
              <option value="GPay" />
              <option value="Cash" />
              <option value="Bank Transfer" />
              <option value="Card" />
              <option value="Mixed" />
            </datalist>
          </label>
          <p style={{ fontSize: "0.8rem", color: "var(--text-faint)", margin: 0 }}>
            Leave advance blank/0 if nothing has been collected yet — you can record payments later
            from the booking page.
          </p>
        </fieldset>

        <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          Notes (optional)
          <textarea name="notes" rows={3} style={{ padding: "0.5rem" }} />
        </label>

        <button type="submit" className="btn btn-solid">
          Create Booking
        </button>
      </form>
    </div>
  );
}
