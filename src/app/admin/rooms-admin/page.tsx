import { createClient } from "@/lib/supabase/server";
import { createRoom, setRoomActive } from "./actions";

export default async function RoomsAdminPage() {
  const supabase = await createClient();

  const [{ data: roomTypes }, { data: rooms }] = await Promise.all([
    supabase.from("room_types").select("id, name, slug").order("sort_order"),
    supabase
      .from("rooms")
      .select("id, room_number, is_active, notes, room_types(name)")
      .order("room_number"),
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "720px" }}>
      <div>
        <h1>Rooms</h1>
        <p style={{ color: "var(--text-dim)" }}>
          Manage the physical room inventory. Bookings can only be created against rooms listed
          here.
        </p>
      </div>

      <form
        action={createRoom}
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "flex-end",
          flexWrap: "wrap",
          padding: "1rem",
          border: "1px solid var(--border)",
          borderRadius: "10px",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          Room number
          <input name="room_number" required placeholder="R-1" style={{ padding: "0.5rem" }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          Room type
          <select name="room_type_id" required style={{ padding: "0.5rem" }}>
            <option value="">Select...</option>
            {roomTypes?.map((rt) => (
              <option key={rt.id} value={rt.id}>
                {rt.name}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1 }}>
          Notes
          <input name="notes" placeholder="Optional" style={{ padding: "0.5rem" }} />
        </label>
        <button type="submit" className="btn btn-solid">
          Add Room
        </button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border)" }}>
            <th style={{ padding: "0.5rem" }}>Room</th>
            <th style={{ padding: "0.5rem" }}>Type</th>
            <th style={{ padding: "0.5rem" }}>Status</th>
            <th style={{ padding: "0.5rem" }}></th>
          </tr>
        </thead>
        <tbody>
          {rooms?.map((room) => (
            <tr key={room.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "0.5rem" }}>{room.room_number}</td>
              <td style={{ padding: "0.5rem" }}>{room.room_types?.name}</td>
              <td style={{ padding: "0.5rem" }}>{room.is_active ? "Active" : "Inactive"}</td>
              <td style={{ padding: "0.5rem" }}>
                <form action={setRoomActive.bind(null, room.id, !room.is_active)}>
                  <button type="submit" className="btn btn-ghost">
                    {room.is_active ? "Deactivate" : "Activate"}
                  </button>
                </form>
              </td>
            </tr>
          ))}
          {rooms?.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: "1rem", color: "var(--text-faint)" }}>
                No rooms yet — add your first one above.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
