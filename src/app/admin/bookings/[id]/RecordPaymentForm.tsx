"use client";

import { useState } from "react";
import { recordPayment } from "../actions";
import { Field, FormMessage, invalidProps, useValidatedForm } from "../form-ui";
import { validatePaymentForm } from "../validation";

export function RecordPaymentForm({ bookingId, invoiceId }: { bookingId: string; invoiceId: string }) {
  // Bumped after a successful save to remount (clear) the form.
  const [formKey, setFormKey] = useState(0);
  const { errors, message, pending, onSubmit, onChange } = useValidatedForm(
    recordPayment.bind(null, bookingId, invoiceId),
    validatePaymentForm,
    () => setFormKey((k) => k + 1),
  );

  return (
    <form
      key={formKey}
      noValidate
      onSubmit={onSubmit}
      onChange={onChange}
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}
    >
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
        <Field label="Amount (₹)" name="amount" errors={errors}>
          <input name="amount" type="number" min={0} step="0.01" style={{ padding: "0.5rem" }} {...invalidProps("amount", errors)} />
        </Field>
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
        <button type="submit" className="btn btn-solid" disabled={pending} aria-busy={pending} style={{ marginTop: "1.55rem" }}>
          {pending ? "Recording…" : "Record Payment"}
        </button>
      </div>
      <FormMessage message={message} />
    </form>
  );
}
