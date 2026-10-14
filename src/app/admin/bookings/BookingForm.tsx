"use client";

import Link from "next/link";
import { FieldError, FormMessage, Field, invalidProps, useValidatedForm } from "./form-ui";
import { StayPaymentFields, type StayInitialValues } from "./new/StayPaymentFields";
import { validateBookingForm, type FormState } from "./validation";

type Room = { id: string; room_number: string; room_types: { name: string } | null };

export type BookingInitialValues = StayInitialValues & {
  guestFullName: string;
  guestPhone: string;
  guestEmail: string;
  idProofType: string;
  idProofNumber: string;
  roomIds: string[];
  notes: string;
  amountPaid: number;
};

export function BookingForm({
  action,
  rooms,
  initial,
  cancelHref,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  rooms: Room[];
  initial?: BookingInitialValues;
  cancelHref?: string;
}) {
  const mode = initial ? "edit" : "create";
  const { errors, message, pending, onSubmit, onChange } = useValidatedForm(action, (fd) => validateBookingForm(fd, mode));

  return (
    <form noValidate onSubmit={onSubmit} onChange={onChange} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <fieldset style={{ display: "flex", flexDirection: "column", gap: "0.75rem", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
        <legend>Guest</legend>
        <Field label="Full name" name="guest_full_name" errors={errors}>
          <input name="guest_full_name" defaultValue={initial?.guestFullName} style={{ padding: "0.5rem" }} {...invalidProps("guest_full_name", errors)} />
        </Field>
        <Field label="Phone" name="guest_phone" errors={errors}>
          <input
            name="guest_phone"
            type="tel"
            inputMode="tel"
            defaultValue={initial?.guestPhone}
            style={{ padding: "0.5rem" }}
            {...invalidProps("guest_phone", errors)}
          />
        </Field>
        <Field label="Email (optional)" name="guest_email" errors={errors}>
          <input name="guest_email" type="email" defaultValue={initial?.guestEmail} style={{ padding: "0.5rem" }} {...invalidProps("guest_email", errors)} />
        </Field>
        <Field label="ID proof type" name="id_proof_type" errors={errors}>
          <select name="id_proof_type" style={{ padding: "0.5rem" }} defaultValue={initial?.idProofType ?? ""} {...invalidProps("id_proof_type", errors)}>
            <option value="">Select...</option>
            <option value="Aadhaar">Aadhaar</option>
            <option value="Driving License">Driving License</option>
            <option value="Passport">Passport</option>
            <option value="Voter ID">Voter ID</option>
            <option value="Other">Other</option>
          </select>
        </Field>
        <Field label="ID proof number" name="id_proof_number" errors={errors}>
          <input name="id_proof_number" defaultValue={initial?.idProofNumber} style={{ padding: "0.5rem" }} {...invalidProps("id_proof_number", errors)} />
        </Field>
        <Field label={initial ? "Replace ID proof photo — front (optional)" : "ID proof photo — front (optional)"} name="id_proof_front" errors={errors}>
          <input name="id_proof_front" type="file" accept="image/*" style={{ padding: "0.5rem" }} {...invalidProps("id_proof_front", errors)} />
        </Field>
        <Field label={initial ? "Replace ID proof photo — back (optional)" : "ID proof photo — back (optional)"} name="id_proof_back" errors={errors}>
          <input name="id_proof_back" type="file" accept="image/*" style={{ padding: "0.5rem" }} {...invalidProps("id_proof_back", errors)} />
        </Field>
        <p style={{ fontSize: "0.8rem", color: "var(--text-faint)", margin: 0 }}>
          {initial
            ? "Changes here update the guest's record, including on their other bookings."
            : "If a guest with this phone number already exists, we'll reuse their record and update these details on it."}
        </p>
      </fieldset>

      <StayPaymentFields errors={errors} initial={initial} amountPaid={initial?.amountPaid} />

      <fieldset
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          border: `1px solid ${errors.room_ids ? "var(--danger)" : "var(--border)"}`,
          borderRadius: "10px",
          padding: "1rem",
        }}
        aria-invalid={errors.room_ids ? true : undefined}
        aria-describedby={errors.room_ids ? "room_ids-error" : undefined}
      >
        <legend>Rooms</legend>
        {rooms.map((room) => (
          <label key={room.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input type="checkbox" name="room_ids" value={room.id} defaultChecked={initial?.roomIds.includes(room.id)} />
            {room.room_number} — {room.room_types?.name}
          </label>
        ))}
        {rooms.length === 0 && (
          <p style={{ color: "var(--text-faint)", margin: 0 }}>
            No active rooms yet — add some in Rooms first.
          </p>
        )}
        <FieldError id="room_ids" error={errors.room_ids} />
      </fieldset>

      <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        Notes (optional)
        <textarea name="notes" rows={3} defaultValue={initial?.notes} style={{ padding: "0.5rem" }} />
      </label>

      <FormMessage message={message} />

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="submit" className="btn btn-solid" disabled={pending} aria-busy={pending}>
          {pending ? "Saving…" : initial ? "Save Changes" : "Create Booking"}
        </button>
        {cancelHref && (
          <Link href={cancelHref} className="btn btn-ghost">
            Cancel
          </Link>
        )}
      </div>
    </form>
  );
}
