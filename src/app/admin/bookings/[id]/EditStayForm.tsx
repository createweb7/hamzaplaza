"use client";

import { useEffect, useMemo, useState } from "react";
import { updateBookingStay } from "../actions";

function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return ms > 0 ? Math.max(1, Math.round(ms / (24 * 60 * 60 * 1000))) : 0;
}

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function EditStayForm({
  bookingId,
  initialCheckIn,
  initialCheckOut,
  initialTotal,
  amountPaid,
}: {
  bookingId: string;
  initialCheckIn: string;
  initialCheckOut: string;
  initialTotal: number;
  amountPaid: number;
}) {
  const [open, setOpen] = useState(false);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [total, setTotal] = useState(String(initialTotal || ""));
  const [totalTouched, setTotalTouched] = useState(false);

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  const initialNights = useMemo(() => nightsBetween(initialCheckIn, initialCheckOut), [initialCheckIn, initialCheckOut]);
  const [roomRate, setRoomRate] = useState(initialNights > 0 && initialTotal > 0 ? String(Math.round(initialTotal / initialNights)) : "");

  useEffect(() => {
    if (totalTouched || !roomRate || nights === 0) return;
    setTotal(String(Number(roomRate) * nights));
  }, [roomRate, nights, totalTouched]);

  const balance = Math.max(0, Number(total || 0) - amountPaid);

  if (!open) {
    return (
      <button type="button" className="btn btn-ghost" onClick={() => setOpen(true)}>
        Edit stay / extend
      </button>
    );
  }

  return (
    <form
      action={updateBookingStay.bind(null, bookingId)}
      style={{ display: "flex", flexDirection: "column", gap: "0.75rem", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", maxWidth: "360px" }}
    >
      <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        Check-in
        <input
          name="check_in_at"
          type="datetime-local"
          required
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          style={{ padding: "0.5rem" }}
        />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        Check-out
        <input
          name="check_out_at"
          type="datetime-local"
          required
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          style={{ padding: "0.5rem" }}
        />
      </label>
      {nights > 0 && <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.85rem" }}>{nights} night(s)</p>}
      <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        Room rate (₹ / night)
        <input type="number" min={0} step="0.01" value={roomRate} onChange={(e) => setRoomRate(e.target.value)} style={{ padding: "0.5rem" }} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        Total amount (₹)
        <input
          name="total_amount"
          type="number"
          min={0}
          step="0.01"
          required
          value={total}
          onChange={(e) => {
            setTotalTouched(true);
            setTotal(e.target.value);
          }}
          style={{ padding: "0.5rem" }}
        />
      </label>
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.6rem", display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "var(--text-dim)" }}>New balance due (₹{amountPaid} already paid)</span>
        <strong>{currency.format(balance)}</strong>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="submit" className="btn btn-solid">
          Save changes
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
