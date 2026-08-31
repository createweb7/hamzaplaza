"use client";

import { useEffect, useMemo, useState } from "react";

function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return ms > 0 ? Math.max(1, Math.round(ms / (24 * 60 * 60 * 1000))) : 0;
}

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function StayPaymentFields() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomRate, setRoomRate] = useState("");
  const [total, setTotal] = useState("");
  const [totalTouched, setTotalTouched] = useState(false);
  const [advance, setAdvance] = useState("");

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);

  useEffect(() => {
    if (totalTouched || !roomRate || nights === 0) return;
    setTotal(String(Number(roomRate) * nights));
  }, [roomRate, nights, totalTouched]);

  const balance = Math.max(0, Number(total || 0) - Number(advance || 0));

  return (
    <>
      <fieldset style={{ display: "flex", flexDirection: "column", gap: "0.75rem", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
        <legend>Stay</legend>
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

      <fieldset style={{ display: "flex", flexDirection: "column", gap: "0.75rem", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
        <legend>Payment</legend>
        <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          Room rate (₹ / night)
          <input
            type="number"
            min={0}
            step="0.01"
            value={roomRate}
            onChange={(e) => setRoomRate(e.target.value)}
            style={{ padding: "0.5rem" }}
          />
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
        <p style={{ fontSize: "0.8rem", color: "var(--text-faint)", margin: 0 }}>
          Auto-filled from room rate × nights — edit directly for extra charges, discounts, etc.
        </p>
        <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          Advance given (₹, optional)
          <input
            name="advance_amount"
            type="number"
            min={0}
            step="0.01"
            value={advance}
            onChange={(e) => setAdvance(e.target.value)}
            style={{ padding: "0.5rem" }}
          />
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
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.6rem", display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "var(--text-dim)" }}>Balance due</span>
          <strong>{currency.format(balance)}</strong>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-faint)", margin: 0 }}>
          Leave advance blank/0 if nothing has been collected yet — you can record payments later
          from the booking page.
        </p>
      </fieldset>
    </>
  );
}
