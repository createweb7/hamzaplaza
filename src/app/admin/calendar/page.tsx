import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { addDays, istDateKey, istNowDateKey } from "@/lib/dates";

const WINDOW_DAYS = 14;

type BookingRow = {
  id: string;
  booking_reference: string;
  check_in_at: string;
  check_out_at: string;
  status: string;
  guests: { full_name: string } | null;
  booking_rooms: { room_id: string }[];
};

type Segment = {
  span: number;
  startDate: string;
  booking: BookingRow | null;
};

function buildSegments(dateKeys: string[], occupied: Map<string, BookingRow>): Segment[] {
  const segments: Segment[] = [];
  let i = 0;
  while (i < dateKeys.length) {
    const booking = occupied.get(dateKeys[i]) ?? null;
    let j = i + 1;
    while (j < dateKeys.length && (occupied.get(dateKeys[j]) ?? null)?.id === booking?.id) j++;
    segments.push({ span: j - i, startDate: dateKeys[i], booking });
    i = j;
  }
  return segments;
}

function formatHeaderDate(dateKey: string) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const weekday = dt.toLocaleDateString("en-IN", { weekday: "short", timeZone: "UTC" });
  return { weekday, day: d };
}

export default async function AdminCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ start?: string }>;
}) {
  const { start } = await searchParams;
  const todayKey = istNowDateKey();
  const startKey = start && /^\d{4}-\d{2}-\d{2}$/.test(start) ? start : todayKey;

  const dateKeys = Array.from({ length: WINDOW_DAYS }, (_, i) => addDays(startKey, i));
  const windowStartInstant = `${dateKeys[0]}T00:00:00+05:30`;
  const windowEndInstant = `${addDays(dateKeys[dateKeys.length - 1], 1)}T00:00:00+05:30`;

  const supabase = await createClient();

  const [{ data: rooms }, { data: bookings }] = await Promise.all([
    supabase.from("rooms").select("id, room_number").eq("is_active", true).order("room_number"),
    supabase
      .from("bookings")
      .select("id, booking_reference, check_in_at, check_out_at, status, guests(full_name), booking_rooms(room_id)")
      .not("status", "in", "(cancelled,no_show)")
      .lt("check_in_at", windowEndInstant)
      .gt("check_out_at", windowStartInstant)
      .order("check_in_at"),
  ]);

  const roomList = rooms ?? [];
  const bookingList = (bookings ?? []) as unknown as BookingRow[];

  // room_id -> (dateKey -> booking), inclusive of both check-in and check-out
  // calendar dates so a same-day (day-use) stay still occupies one day, and a
  // guest who hasn't checked out yet still shows the room as held that day.
  const occupancyByRoom = new Map<string, Map<string, BookingRow>>();
  for (const room of roomList) occupancyByRoom.set(room.id, new Map());

  for (const booking of bookingList) {
    const checkinKey = istDateKey(booking.check_in_at);
    const checkoutKey = istDateKey(booking.check_out_at);
    for (const br of booking.booking_rooms) {
      const map = occupancyByRoom.get(br.room_id);
      if (!map) continue;
      let d = checkinKey;
      while (d <= checkoutKey) {
        if (d >= dateKeys[0] && d <= dateKeys[dateKeys.length - 1]) map.set(d, booking);
        d = addDays(d, 1);
      }
    }
  }

  const prevStart = addDays(startKey, -WINDOW_DAYS);
  const nextStart = addDays(startKey, WINDOW_DAYS);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <h1>Booking Calendar</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href={`/admin/calendar?start=${prevStart}`} className="btn btn-ghost">
            &larr; Prev {WINDOW_DAYS}
          </Link>
          <Link href="/admin/calendar" className="btn btn-ghost">
            Today
          </Link>
          <Link href={`/admin/calendar?start=${nextStart}`} className="btn btn-ghost">
            Next {WINDOW_DAYS}
            {" "}
            &rarr;
          </Link>
          <form method="get" style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
            <input type="date" name="start" defaultValue={startKey} style={{ padding: "0.4rem" }} />
            <button type="submit" className="btn btn-ghost">
              Go
            </button>
          </form>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1.25rem", marginBottom: "1rem", fontSize: "0.85rem", color: "var(--text-dim)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
          <span className="calendar-swatch calendar-swatch-booked" /> Booked
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
          <span className="calendar-swatch calendar-swatch-free" /> Free
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
          <span className="calendar-swatch calendar-swatch-past" /> Past
        </span>
      </div>

      <div className="admin-table-wrap">
        <table className="calendar-table" style={{ borderCollapse: "collapse", minWidth: `${560 + dateKeys.length * 90}px` }}>
          <thead>
            <tr>
              <th className="calendar-cell calendar-room-header">Room</th>
              {dateKeys.map((dateKey) => {
                const { weekday, day } = formatHeaderDate(dateKey);
                const isToday = dateKey === todayKey;
                const isPast = dateKey < todayKey;
                return (
                  <th
                    key={dateKey}
                    className={`calendar-cell calendar-date-header${isToday ? " calendar-today" : ""}${isPast ? " calendar-past" : ""}`}
                  >
                    <div>{weekday}</div>
                    <div>{day}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {roomList.map((room) => {
              const occupied = occupancyByRoom.get(room.id) ?? new Map();
              const segments = buildSegments(dateKeys, occupied);
              return (
                <tr key={room.id}>
                  <td className="calendar-cell calendar-room-header">{room.room_number}</td>
                  {segments.map((seg) => {
                    const isPast = seg.startDate < todayKey;
                    if (!seg.booking) {
                      return (
                        <td
                          key={seg.startDate}
                          colSpan={seg.span}
                          className={`calendar-cell calendar-free${isPast ? " calendar-past" : ""}`}
                        />
                      );
                    }
                    return (
                      <td key={seg.startDate} colSpan={seg.span} className="calendar-cell calendar-booked-cell">
                        <Link
                          href={`/admin/bookings/${seg.booking.id}`}
                          className={`calendar-booked-bar${isPast ? " calendar-past" : ""}`}
                          title={`${seg.booking.guests?.full_name ?? "Guest"} — ${seg.booking.booking_reference} — ${new Date(seg.booking.check_in_at).toLocaleString("en-IN")} to ${new Date(seg.booking.check_out_at).toLocaleString("en-IN")} — ${seg.booking.status}`}
                        >
                          {seg.booking.guests?.full_name ?? seg.booking.booking_reference}
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {roomList.length === 0 && (
              <tr>
                <td colSpan={dateKeys.length + 1} style={{ padding: "1rem", color: "var(--text-faint)" }}>
                  No active rooms yet — add some in Rooms first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
