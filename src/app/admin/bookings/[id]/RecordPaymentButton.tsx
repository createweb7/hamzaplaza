"use client";

import { useFormStatus } from "react-dom";

export function RecordPaymentButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-solid" disabled={pending} aria-busy={pending}>
      {pending ? "Recording…" : "Record Payment"}
    </button>
  );
}
