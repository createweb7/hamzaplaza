import Link from "next/link";
import { Pagination } from "@/components/admin/Pagination";
import { createClient } from "@/lib/supabase/server";

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  issued: "Unpaid",
  paid: "Paid",
  partially_paid: "Partially Paid",
  void: "Void",
};

const PAGE_SIZE = 25;
const NO_MATCH_ID = "00000000-0000-0000-0000-000000000000";

export default async function InvoicesListPage({
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
    const [byNumber, byGuest, byBooking] = await Promise.all([
      supabase.from("invoices").select("id").ilike("invoice_number", `%${q}%`),
      supabase.from("guests").select("id").or(`full_name.ilike.%${q}%,phone.ilike.%${q}%`),
      supabase.from("bookings").select("id").ilike("booking_reference", `%${q}%`),
    ]);

    const guestIds = (byGuest.data ?? []).map((g) => g.id);
    const bookingIds = (byBooking.data ?? []).map((b) => b.id);

    const [byGuestInvoices, byBookingInvoices] = await Promise.all([
      guestIds.length > 0
        ? supabase.from("invoices").select("id").in("guest_id", guestIds)
        : Promise.resolve({ data: [] as { id: string }[] }),
      bookingIds.length > 0
        ? supabase.from("invoices").select("id").in("booking_id", bookingIds)
        : Promise.resolve({ data: [] as { id: string }[] }),
    ]);

    matchingIds = [
      ...new Set([
        ...(byNumber.data ?? []).map((i) => i.id),
        ...(byGuestInvoices.data ?? []).map((i) => i.id),
        ...(byBookingInvoices.data ?? []).map((i) => i.id),
      ]),
    ];
  }

  let query = supabase
    .from("invoices")
    .select(
      "id, invoice_number, issue_date, status, grand_total, amount_paid, balance_due, booking_id, guests(full_name, phone), bookings(booking_reference)",
      { count: "exact" },
    )
    .order("issue_date", { ascending: false });

  if (matchingIds) {
    query = query.in("id", matchingIds.length > 0 ? matchingIds : [NO_MATCH_ID]);
  }

  const from = (page - 1) * PAGE_SIZE;
  const { data: invoices, count } = await query.range(from, from + PAGE_SIZE - 1);
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  return (
    <div>
      <h1>Invoices</h1>

      <form method="get" style={{ margin: "1.5rem 0 0", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search by guest name, phone, invoice #, or booking reference…"
          style={{ padding: "0.5rem", width: "320px", maxWidth: "100%" }}
        />
        <button type="submit" className="btn">
          Search
        </button>
        {q && <Link href="/admin/invoices">Clear</Link>}
      </form>

      <div className="admin-table-wrap">
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", minWidth: "700px" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border)" }}>
            <th style={{ padding: "0.5rem" }}>Invoice #</th>
            <th style={{ padding: "0.5rem" }}>Booking</th>
            <th style={{ padding: "0.5rem" }}>Guest</th>
            <th style={{ padding: "0.5rem" }}>Date</th>
            <th style={{ padding: "0.5rem" }}>Total</th>
            <th style={{ padding: "0.5rem" }}>Balance</th>
            <th style={{ padding: "0.5rem" }}>Status</th>
            <th style={{ padding: "0.5rem" }}></th>
          </tr>
        </thead>
        <tbody>
          {invoices?.map((invoice) => (
            <tr key={invoice.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "0.5rem" }}>{invoice.invoice_number}</td>
              <td style={{ padding: "0.5rem" }}>
                <Link href={`/admin/bookings/${invoice.booking_id}`}>{invoice.bookings?.booking_reference}</Link>
              </td>
              <td style={{ padding: "0.5rem" }}>
                {invoice.guests?.full_name}
                <div style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>{invoice.guests?.phone}</div>
              </td>
              <td style={{ padding: "0.5rem" }}>{new Date(invoice.issue_date).toLocaleDateString("en-IN")}</td>
              <td style={{ padding: "0.5rem" }}>₹{invoice.grand_total}</td>
              <td style={{ padding: "0.5rem" }}>{Number(invoice.balance_due) > 0 ? `₹${invoice.balance_due}` : "—"}</td>
              <td style={{ padding: "0.5rem" }}>{STATUS_LABELS[invoice.status] ?? invoice.status}</td>
              <td style={{ padding: "0.5rem" }}>
                <a href={`/admin/bookings/${invoice.booking_id}/invoice`} target="_blank" rel="noopener noreferrer">
                  Bill
                </a>
              </td>
            </tr>
          ))}
          {invoices?.length === 0 && (
            <tr>
              <td colSpan={8} style={{ padding: "1rem", color: "var(--text-faint)" }}>
                {q ? "No invoices match your search." : "No invoices yet."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      <Pagination basePath="/admin/invoices" q={q} page={page} totalPages={totalPages} />
    </div>
  );
}
