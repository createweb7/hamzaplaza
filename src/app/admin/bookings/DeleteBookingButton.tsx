"use client";

import { useState, useTransition } from "react";
import { deleteBooking } from "./actions";

export function DeleteBookingButton({
  bookingId,
  reference,
  redirectTo,
  variant = "button",
}: {
  bookingId: string;
  reference: string;
  // Where to go after deleting — needed when deleting from the booking's own page.
  redirectTo?: string;
  variant?: "button" | "link";
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  function onClick() {
    if (
      !window.confirm(
        `Delete booking ${reference}? Its invoice and all recorded payments will be permanently removed. This can't be undone.`,
      )
    ) {
      return;
    }
    setError(undefined);
    startTransition(async () => {
      const result = await deleteBooking(bookingId, redirectTo);
      if (result?.message) setError(result.message);
    });
  }

  return (
    <span style={{ display: "inline-flex", flexDirection: "column", gap: "0.25rem" }}>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        aria-busy={pending}
        className={variant === "link" ? "admin-link admin-link-danger" : "btn btn-danger"}
        style={variant === "link" ? { background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit" } : undefined}
      >
        {pending ? "Deleting…" : variant === "link" ? "Delete" : "Delete Booking"}
      </button>
      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </span>
  );
}
