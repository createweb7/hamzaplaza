import Link from "next/link";
import { BookingsChart } from "@/components/admin/BookingsChart";
import { createClient } from "@/lib/supabase/server";
import { addMonths, istDateKey, istMonthKey, monthBoundsIst } from "@/lib/dates";

function monthLabel(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleString("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });
}

type BookingRow = { id: string; check_in_at: string; invoices: { grand_total: number }[] | null };

function revenueOf(row: BookingRow) {
  return (row.invoices ?? []).reduce((sum, inv) => sum + Number(inv.grand_total), 0);
}

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month: monthParam } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: staffProfile } = user
    ? await supabase.from("staff_profiles").select("role").eq("id", user.id).maybeSingle()
    : { data: null };

  if (!staffProfile) {
    return (
      <p>
        You&apos;re signed in as {user?.email}, but no staff profile is assigned to this account
        yet, so RLS is blocking access to bookings and invoices. Ask an owner to add a row for
        you in <code>staff_profiles</code>.
      </p>
    );
  }

  const now = new Date();
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const { data: upcoming } = await supabase
    .from("bookings")
    .select("id, booking_reference, check_in_at, check_out_at, status, guests(full_name)")
    .not("status", "in", "(cancelled,no_show)")
    .or(
      `and(check_in_at.gte.${now.toISOString()},check_in_at.lte.${in7Days.toISOString()}),and(check_out_at.gte.${now.toISOString()},check_out_at.lte.${in7Days.toISOString()})`,
    )
    .order("check_in_at");

  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const { data: recentBookings } = await supabase
    .from("bookings")
    .select("id, check_in_at, invoices(grand_total)")
    .gte("check_in_at", sixMonthsAgo.toISOString())
    .not("status", "in", "(cancelled,no_show)")
    .order("check_in_at");

  const bookings = (recentBookings ?? []) as BookingRow[];

  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thisWeekBookings = bookings.filter((b) => {
    const t = new Date(b.check_in_at).getTime();
    return t >= sevenDaysAgo.getTime() && t <= now.getTime();
  });
  const weekRevenue = thisWeekBookings.reduce((sum, b) => sum + revenueOf(b), 0);

  const currentMonthKey = istMonthKey(now.toISOString());
  const selectedMonthKey = monthParam && /^\d{4}-\d{2}$/.test(monthParam) ? monthParam : currentMonthKey;
  const isCurrentMonth = selectedMonthKey === currentMonthKey;

  const { start: selectedMonthStart, end: selectedMonthEnd } = monthBoundsIst(selectedMonthKey);
  const { data: selectedMonthData } = await supabase
    .from("bookings")
    .select("id, check_in_at, invoices(grand_total)")
    .gte("check_in_at", selectedMonthStart)
    .lt("check_in_at", selectedMonthEnd)
    .not("status", "in", "(cancelled,no_show)")
    .order("check_in_at");

  const selectedMonthBookings = (selectedMonthData ?? []) as BookingRow[];
  const monthRevenue = selectedMonthBookings.reduce((sum, b) => sum + revenueOf(b), 0);

  const dailyMap = new Map<string, { bookings: number; revenue: number }>();
  for (const b of selectedMonthBookings) {
    const key = istDateKey(b.check_in_at);
    const entry = dailyMap.get(key) ?? { bookings: 0, revenue: 0 };
    entry.bookings += 1;
    entry.revenue += revenueOf(b);
    dailyMap.set(key, entry);
  }
  const dailySeries = [...dailyMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, v]) => ({ date: date.slice(8), bookings: v.bookings, revenue: v.revenue }));

  const prevMonthKey = addMonths(selectedMonthKey, -1);
  const nextMonthKey = addMonths(selectedMonthKey, 1);

  const monthlyMap = new Map<string, { bookings: number; revenue: number }>();
  for (const b of bookings) {
    const key = istMonthKey(b.check_in_at);
    const entry = monthlyMap.get(key) ?? { bookings: 0, revenue: 0 };
    entry.bookings += 1;
    entry.revenue += revenueOf(b);
    monthlyMap.set(key, entry);
  }
  const monthlyRows = [...monthlyMap.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([month, v]) => ({ month, ...v, avg: v.bookings ? v.revenue / v.bookings : 0 }));

  return (
    <div>
      <h1>Dashboard</h1>

      <section style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", minWidth: "200px" }}>
          <div style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>Last 7 days</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>{thisWeekBookings.length} bookings</div>
          <div style={{ color: "var(--text-dim)" }}>{currency.format(weekRevenue)}</div>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", minWidth: "200px" }}>
          <div style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>{monthLabel(selectedMonthKey)}</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>{selectedMonthBookings.length} bookings</div>
          <div style={{ color: "var(--text-dim)" }}>{currency.format(monthRevenue)}</div>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <h3 style={{ margin: 0 }}>{monthLabel(selectedMonthKey)} — daily bookings &amp; revenue</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link href={`/admin?month=${prevMonthKey}`} className="btn btn-ghost">
              &larr; {monthLabel(prevMonthKey)}
            </Link>
            {!isCurrentMonth && (
              <Link href="/admin" className="btn btn-ghost">
                This month
              </Link>
            )}
            <Link href={`/admin?month=${nextMonthKey}`} className="btn btn-ghost">
              {monthLabel(nextMonthKey)}
              {" "}
              &rarr;
            </Link>
          </div>
        </div>
        {dailySeries.length > 0 ? (
          <BookingsChart data={dailySeries} />
        ) : (
          <p style={{ color: "var(--text-faint)" }}>No bookings that month.</p>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h3>Monthly summary</h3>
        <div className="admin-table-wrap">
        <table style={{ width: "100%", borderCollapse: "collapse", maxWidth: "560px", minWidth: "480px" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "0.5rem" }}>Month</th>
              <th style={{ padding: "0.5rem" }}>Bookings</th>
              <th style={{ padding: "0.5rem" }}>Revenue</th>
              <th style={{ padding: "0.5rem" }}>Avg / Booking</th>
            </tr>
          </thead>
          <tbody>
            {monthlyRows.map((row) => (
              <tr key={row.month} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.5rem" }}>
                  <Link href={`/admin?month=${row.month}`}>{monthLabel(row.month)}</Link>
                </td>
                <td style={{ padding: "0.5rem" }}>{row.bookings}</td>
                <td style={{ padding: "0.5rem" }}>{currency.format(row.revenue)}</td>
                <td style={{ padding: "0.5rem" }}>{currency.format(row.avg)}</td>
              </tr>
            ))}
            {monthlyRows.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "1rem", color: "var(--text-faint)" }}>
                  No bookings in the last 6 months.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h3>Next 7 days</h3>
        <div className="admin-table-wrap">
        <table style={{ width: "100%", borderCollapse: "collapse", maxWidth: "720px", minWidth: "560px" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "0.5rem" }}>Reference</th>
              <th style={{ padding: "0.5rem" }}>Guest</th>
              <th style={{ padding: "0.5rem" }}>Check-in</th>
              <th style={{ padding: "0.5rem" }}>Check-out</th>
              <th style={{ padding: "0.5rem" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {upcoming?.map((booking) => (
              <tr key={booking.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.5rem" }}>
                  <Link href={`/admin/bookings/${booking.id}`}>{booking.booking_reference}</Link>
                </td>
                <td style={{ padding: "0.5rem" }}>{booking.guests?.full_name}</td>
                <td style={{ padding: "0.5rem" }}>{new Date(booking.check_in_at).toLocaleString("en-IN")}</td>
                <td style={{ padding: "0.5rem" }}>{new Date(booking.check_out_at).toLocaleString("en-IN")}</td>
                <td style={{ padding: "0.5rem" }}>{booking.status}</td>
              </tr>
            ))}
            {upcoming?.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "1rem", color: "var(--text-faint)" }}>
                  Nothing checking in or out in the next 7 days.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </section>
    </div>
  );
}
