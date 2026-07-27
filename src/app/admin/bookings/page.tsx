import Link from "next/link";
import { Pagination } from "@/components/admin/Pagination";
import { createClient } from "@/lib/supabase/server";

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Confirmed",
  checked_in: "Checked In",
  checked_out: "Checked Out",
  cancelled: "Cancelled",
  no_show: "No Show",
};

const PAGE_SIZE = 25;
const NO_MATCH_ID = "00000000-0000-0000-0000-000000000000";

export default async function BookingsListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q: rawQ, page: pageParam } = await searchParams;
  const q = (rawQ ?? "").trim();
  const page = Math.max(1, Number(pageParam) || 1);
  const supabase = await createClient();

  let matchingIds: string[] | null = null;

  if (q) {
    const [byReference, byGuest] = await Promise.all([
      supabase.from("bookings").select("id").ilike("booking_reference", `%${q}%`),
      supabase.from("guests").select("id").or(`full_name.ilike.%${q}%,phone.ilike.%${q}%`),
    ]);

    const guestIds = (byGuest.data ?? []).map((g) => g.id);
    let byGuestBookings: { id: string }[] = [];
    if (guestIds.length > 0) {
      const { data } = await supabase.from("bookings").select("id").in("guest_id", guestIds);
      byGuestBookings = data ?? [];
    }

    matchingIds = [...new Set([...(byReference.data ?? []).map((b) => b.id), ...byGuestBookings.map((b) => b.id)])];
  }

  let query = supabase
    .from("bookings")
    .select(
      "id, booking_reference, check_in_at, check_out_at, status, guests(full_name, phone, id_proof_number), booking_rooms(rooms(room_number)), invoices(grand_total, balance_due, status, payments(payment_method))",
      { count: "exact" },
    )
    .order("check_in_at", { ascending: false });

  if (matchingIds) {
    query = query.in("id", matchingIds.length > 0 ? matchingIds : [NO_MATCH_ID]);
  }

  const from = (page - 1) * PAGE_SIZE;
  const { data: bookings, count } = await query.range(from, from + PAGE_SIZE - 1);
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1>Bookings</h1>
        <Link href="/admin/bookings/new" className="btn btn-solid">
          New Booking
        </Link>
      </div>

      <form method="get" style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search by guest name, phone, or booking reference…"
          style={{ padding: "0.5rem", width: "320px", maxWidth: "100%" }}
        />
        <button type="submit" className="btn">
          Search
        </button>
        {q && <Link href="/admin/bookings">Clear</Link>}
      </form>

      <div className="admin-table-wrap">
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "760px" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border)" }}>
            <th style={{ padding: "0.5rem" }}>Reference</th>
            <th style={{ padding: "0.5rem" }}>Guest</th>
            <th style={{ padding: "0.5rem" }}>Rooms</th>
            <th style={{ padding: "0.5rem" }}>Check-in</th>
            <th style={{ padding: "0.5rem" }}>Check-out</th>
            <th style={{ padding: "0.5rem" }}>Status</th>
            <th style={{ padding: "0.5rem" }}>Total</th>
            <th style={{ padding: "0.5rem" }}>Balance</th>
            <th style={{ padding: "0.5rem" }}></th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking) => {
            const invoice = booking.invoices?.[0];
            return (
              <tr key={booking.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.5rem" }}>
                  <Link href={`/admin/bookings/${booking.id}`}>{booking.booking_reference}</Link>
                </td>
                <td style={{ padding: "0.5rem" }}>
                  {booking.guests?.full_name}
                  <div style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>{booking.guests?.phone}</div>
                  {booking.guests?.id_proof_number && (
                    <div style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>{booking.guests.id_proof_number}</div>
                  )}
                </td>
                <td style={{ padding: "0.5rem" }}>
                  {booking.booking_rooms?.map((br) => br.rooms?.room_number).join(", ")}
                </td>
                <td style={{ padding: "0.5rem" }}>{new Date(booking.check_in_at).toLocaleString("en-IN")}</td>
                <td style={{ padding: "0.5rem" }}>{new Date(booking.check_out_at).toLocaleString("en-IN")}</td>
                <td style={{ padding: "0.5rem" }}>{STATUS_LABELS[booking.status] ?? booking.status}</td>
                <td style={{ padding: "0.5rem" }}>
                  {invoice ? `₹${invoice.grand_total}` : "—"}
                  {invoice?.payments && invoice.payments.length > 0 && (
                    <div style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>
                      {[...new Set(invoice.payments.map((p) => p.payment_method).filter(Boolean))].join(", ")}
                    </div>
                  )}
                </td>
                <td style={{ padding: "0.5rem" }}>
                  {invoice ? (Number(invoice.balance_due) > 0 ? `₹${invoice.balance_due}` : "Paid") : "—"}
                </td>
                <td style={{ padding: "0.5rem" }}>
                  {invoice && (
                    <a href={`/admin/bookings/${booking.id}/invoice`} target="_blank" rel="noopener noreferrer">
                      Bill
                    </a>
                  )}
                </td>
              </tr>
            );
          })}
          {bookings?.length === 0 && (
            <tr>
              <td colSpan={9} style={{ padding: "1rem", color: "var(--text-faint)" }}>
                {q ? "No bookings match your search." : "No bookings yet."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      <Pagination basePath="/admin/bookings" q={q} page={page} totalPages={totalPages} />
    </div>
  );
}
