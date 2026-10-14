"use client";

import { useMemo, useState } from "react";
import { Field, invalidProps } from "../form-ui";
import type { FieldErrors } from "../validation";

function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return ms > 0 ? Math.max(1, Math.round(ms / (24 * 60 * 60 * 1000))) : 0;
}

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export type StayInitialValues = {
  checkIn: string;
  checkOut: string;
  total: number;
  numGuests: number | null;
  source: string | null;
};

// When `amountPaid` is given the form is editing an existing booking: the
// advance/payment fields are hidden (payments are managed on the booking
// page) and the balance is computed against what's already been paid.
export function StayPaymentFields({
  errors,
  initial,
  amountPaid,
}: {
  errors: FieldErrors;
  initial?: StayInitialValues;
  amountPaid?: number;
}) {
  const isEdit = amountPaid !== undefined;
  const [checkIn, setCheckIn] = useState(initial?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(initial?.checkOut ?? "");
  const initialNights = nightsBetween(initial?.checkIn ?? "", initial?.checkOut ?? "");
  const [roomRate, setRoomRate] = useState(
    initial && initialNights > 0 && initial.total > 0 ? String(Math.round(initial.total / initialNights)) : "",
  );
  const [total, setTotal] = useState(initial?.total ? String(initial.total) : "");
  const [totalTouched, setTotalTouched] = useState(false);
  const [advance, setAdvance] = useState("");

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);

  // Recalculate only in response to the user changing the rate or dates, so
  // an existing total isn't overwritten by the (rounded) derived rate on load.
  function recalcTotal(nextRate: string, nextNights: number) {
    if (totalTouched || !nextRate || nextNights === 0) return;
    setTotal(String(Number(nextRate) * nextNights));
  }

  const balance = Math.max(0, Number(total || 0) - (isEdit ? amountPaid : Number(advance || 0)));

  return (
    <>
      <fieldset style={{ display: "flex", flexDirection: "column", gap: "0.75rem", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
        <legend>Stay</legend>
        <Field label="Check-in" name="check_in_at" errors={errors}>
          <input
            name="check_in_at"
            type="datetime-local"
            value={checkIn}
            onChange={(e) => {
            setCheckIn(e.target.value);
            recalcTotal(roomRate, nightsBetween(e.target.value, checkOut));
          }}
            style={{ padding: "0.5rem" }}
            {...invalidProps("check_in_at", errors)}
          />
        </Field>
        <Field label="Check-out" name="check_out_at" errors={errors}>
          <input
            name="check_out_at"
            type="datetime-local"
            value={checkOut}
            onChange={(e) => {
            setCheckOut(e.target.value);
            recalcTotal(roomRate, nightsBetween(checkIn, e.target.value));
          }}
            style={{ padding: "0.5rem" }}
            {...invalidProps("check_out_at", errors)}
          />
        </Field>
        {nights > 0 && <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.85rem" }}>{nights} night(s)</p>}
        <Field label="Number of guests" name="num_guests" errors={errors}>
          <input
            name="num_guests"
            type="number"
            min={1}
            step={1}
            defaultValue={initial?.numGuests ?? ""}
            style={{ padding: "0.5rem" }}
            {...invalidProps("num_guests", errors)}
          />
        </Field>
        <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          Source
          <select name="source" defaultValue={initial?.source ?? "phone"} style={{ padding: "0.5rem" }}>
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
            onChange={(e) => {
            setRoomRate(e.target.value);
            recalcTotal(e.target.value, nights);
          }}
            style={{ padding: "0.5rem" }}
          />
        </label>
        <Field label="Total amount (₹)" name="total_amount" errors={errors}>
          <input
            name="total_amount"
            type="number"
            min={0}
            step="0.01"
            value={total}
            onChange={(e) => {
              setTotalTouched(true);
              setTotal(e.target.value);
            }}
            style={{ padding: "0.5rem" }}
            {...invalidProps("total_amount", errors)}
          />
        </Field>
        <p style={{ fontSize: "0.8rem", color: "var(--text-faint)", margin: 0 }}>
          Auto-filled from room rate × nights — edit directly for extra charges, discounts, etc.
        </p>
        {!isEdit && (
          <>
            <Field label="Advance given (₹, optional)" name="advance_amount" errors={errors}>
              <input
                name="advance_amount"
                type="number"
                min={0}
                step="0.01"
                value={advance}
                onChange={(e) => setAdvance(e.target.value)}
                style={{ padding: "0.5rem" }}
                {...invalidProps("advance_amount", errors)}
              />
            </Field>
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
          </>
        )}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.6rem", display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "var(--text-dim)" }}>
            {isEdit ? `Balance due (₹${amountPaid} already paid)` : "Balance due"}
          </span>
          <strong>{currency.format(balance)}</strong>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-faint)", margin: 0 }}>
          {isEdit
            ? "Record or remove payments from the booking page."
            : "Leave advance blank/0 if nothing has been collected yet — you can record payments later from the booking page."}
        </p>
      </fieldset>
    </>
  );
}
