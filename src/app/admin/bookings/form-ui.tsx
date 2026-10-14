"use client";

import { startTransition, useActionState, useState, type FormEvent, type ReactNode } from "react";
import { hasErrors, type FieldErrors, type FormState } from "./validation";

// Validates on the client first (instant inline errors, no round trip), then
// dispatches the server action, whose returned errors (e.g. room conflicts)
// render in the same slots. Dispatching manually instead of via
// `<form action>` keeps React from resetting the form, so nothing typed or
// picked (including ID photos) is lost when the server rejects it.
export function useValidatedForm(
  action: (prev: FormState, formData: FormData) => Promise<FormState>,
  validate: (formData: FormData) => FieldErrors,
  onSuccess?: () => void,
) {
  const [state, formAction, pending] = useActionState(action, {});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string | undefined>();
  const [seenState, setSeenState] = useState(state);

  if (state !== seenState) {
    setSeenState(state);
    setErrors(state.errors ?? {});
    setMessage(state.message);
    if (state.ok) onSuccess?.();
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const clientErrors = validate(formData);
    setErrors(clientErrors);
    setMessage(undefined);

    if (hasErrors(clientErrors)) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(clientErrors)[0]}"]`);
      first?.focus();
      return;
    }

    startTransition(() => formAction(formData));
  }

  // Clear a field's error as soon as the user edits it.
  function onChange(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name;
    if (name && errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  return { errors, message, pending, onSubmit, onChange };
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <span id={`${id}-error`} className="field-error" role="alert">
      {error}
    </span>
  );
}

export function FormMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="form-message-error" role="alert">
      {message}
    </div>
  );
}

// aria props that link an input to its inline error.
export function invalidProps(name: string, errors: FieldErrors) {
  return errors[name] ? { "aria-invalid": true as const, "aria-describedby": `${name}-error` } : {};
}

export function Field({ label, name, errors, children }: { label: ReactNode; name: string; errors: FieldErrors; children: ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      {label}
      {children}
      <FieldError id={name} error={errors[name]} />
    </label>
  );
}
