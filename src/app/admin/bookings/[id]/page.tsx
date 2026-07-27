import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { recordPayment, setBookingStatus } from "../actions";

const INVOICE_STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  issued: "Unpaid",
  paid: "Paid",
  partially_paid: "Partially Paid",
  void: "Void",
};

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Confirmed",
  checked_in: "Checked In",
  checked_out: "Checked Out",
  cancelled: "Cancelled",
  no_show: "No Show",
};

const TRANSITIONS: Record<string, { label: string; to: "confirmed" | "checked_in" | "checked_out" | "cancelled" | "no_show" }[]> = {
  confirmed: [
    { label: "Check In", to: "checked_in" },
    { label: "Cancel", to: "cancelled" },
    { label: "Mark No-Show", to: "no_show" },
  ],
  checked_in: [{ label: "Check Out", to: "checked_out" }],
  checked_out: [],
  cancelled: [],
  no_show: [],
};

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select(
      "id, booking_reference, check_in_at, check_out_at, num_guests, status, source, notes, guests(full_name, phone, email, id_proof_type, id_proof_number, id_proof_front_path, id_proof_back_path), booking_rooms(rooms(room_number, room_types(name)))",
    )
    .eq("id", id)
    .maybeSingle();

  if (!booking) notFound();

  const [idProofFrontUrl, idProofBackUrl] = await Promise.all([
    booking.guests?.id_proof_front_path
      ? supabase.storage.from("id-proofs").createSignedUrl(booking.guests.id_proof_front_path, 3600)
      : Promise.resolve({ data: null }),
    booking.guests?.id_proof_back_path
      ? supabase.storage.from("id-proofs").createSignedUrl(booking.guests.id_proof_back_path, 3600)
      : Promise.resolve({ data: null }),
  ]).then((results) => results.map((r) => r.data?.signedUrl ?? null));

  const { data: invoice } = await supabase
    .from("invoices")
    .select("id, status, grand_total, amount_paid, balance_due, payments(amount, payment_method, paid_at)")
    .eq("booking_id", id)
    .maybeSingle();

  const transitions = TRANSITIONS[booking.status] ?? [];

  return (
    <div style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1>{booking.booking_reference}</h1>
        <span
          style={{
            display: "inline-block",
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid var(--border)",
            fontSize: "0.85rem",
          }}
        >
          {STATUS_LABELS[booking.status] ?? booking.status}
        </span>
      </div>

      <section>
        <h3>Guest</h3>
        <p>
          {booking.guests?.full_name} · {booking.guests?.phone}
          {booking.guests?.email ? ` · ${booking.guests.email}` : ""}
        </p>
        {(booking.guests?.id_proof_type || booking.guests?.id_proof_number) && (
          <p style={{ color: "var(--text-dim)" }}>
            {booking.guests?.id_proof_type ?? "ID Proof"}
            {booking.guests?.id_proof_number ? ` — ${booking.guests.id_proof_number}` : ""}
          </p>
        )}
        {(idProofFrontUrl || idProofBackUrl) && (
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {idProofFrontUrl && (
              <a href={idProofFrontUrl} target="_blank" rel="noopener noreferrer">
                <img src={idProofFrontUrl} alt="ID proof front" style={{ height: "90px", borderRadius: "6px", border: "1px solid var(--border)" }} />
              </a>
            )}
            {idProofBackUrl && (
              <a href={idProofBackUrl} target="_blank" rel="noopener noreferrer">
                <img src={idProofBackUrl} alt="ID proof back" style={{ height: "90px", borderRadius: "6px", border: "1px solid var(--border)" }} />
              </a>
            )}
          </div>
        )}
      </section>

      <section>
        <h3>Stay</h3>
        <p>Check-in: {new Date(booking.check_in_at).toLocaleString("en-IN")}</p>
        <p>Check-out: {new Date(booking.check_out_at).toLocaleString("en-IN")}</p>
        {booking.num_guests && <p>Guests: {booking.num_guests}</p>}
        {booking.source && <p>Source: {booking.source}</p>}
      </section>

      <section>
        <h3>Rooms</h3>
        <ul>
          {booking.booking_rooms?.map((br, i) => (
            <li key={i}>
              {br.rooms?.room_number} — {br.rooms?.room_types?.name}
            </li>
          ))}
        </ul>
      </section>

      {invoice && (
        <section>
          <h3>Payment</h3>
          <p>
            Total ₹{invoice.grand_total} · Paid ₹{invoice.amount_paid} · Balance ₹{invoice.balance_due}
            {" · "}
            <strong>{INVOICE_STATUS_LABELS[invoice.status] ?? invoice.status}</strong>
          </p>
          <a href={`/admin/bookings/${booking.id}/invoice`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            View / Print Cash Bill
          </a>
          {invoice.payments && invoice.payments.length > 0 && (
            <ul>
              {invoice.payments.map((p, i) => (
                <li key={i}>
                  ₹{p.amount} via {p.payment_method ?? "unspecified"} on{" "}
                  {new Date(p.paid_at).toLocaleDateString("en-IN")}
                </li>
              ))}
            </ul>
          )}
          {Number(invoice.balance_due) > 0 && (
            <form
              action={recordPayment.bind(null, booking.id, invoice.id)}
              style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end", flexWrap: "wrap", marginTop: "0.5rem" }}
            >
              <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                Amount (₹)
                <input name="amount" type="number" min={0} step="0.01" required style={{ padding: "0.5rem" }} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                Payment type
                <input name="payment_type" list="payment-types" style={{ padding: "0.5rem" }} />
                <datalist id="payment-types">
                  <option value="GPay" />
                  <option value="Cash" />
                  <option value="Bank Transfer" />
                  <option value="Card" />
                  <option value="Mixed" />
                </datalist>
              </label>
              <button type="submit" className="btn btn-solid">
                Record Payment
              </button>
            </form>
          )}
        </section>
      )}

      {booking.notes && (
        <section>
          <h3>Notes</h3>
          <p>{booking.notes}</p>
        </section>
      )}

      {transitions.length > 0 && (
        <section style={{ display: "flex", gap: "0.75rem" }}>
          {transitions.map((t) => (
            <form key={t.to} action={setBookingStatus.bind(null, booking.id, t.to)}>
              <button type="submit" className={t.to === "cancelled" || t.to === "no_show" ? "btn btn-ghost" : "btn btn-solid"}>
                {t.label}
              </button>
            </form>
          ))}
        </section>
      )}
    </div>
  );
}
