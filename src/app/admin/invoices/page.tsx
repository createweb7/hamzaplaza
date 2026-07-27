import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  issued: "Unpaid",
  paid: "Paid",
  partially_paid: "Partially Paid",
  void: "Void",
};

export default async function InvoicesListPage() {
  const supabase = await createClient();

  const { data: invoices } = await supabase
    .from("invoices")
    .select(
      "id, invoice_number, issue_date, status, grand_total, amount_paid, balance_due, booking_id, guests(full_name, phone), bookings(booking_reference)",
    )
    .order("issue_date", { ascending: false });

  return (
    <div>
      <h1>Invoices</h1>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem" }}>
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
                No invoices yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
