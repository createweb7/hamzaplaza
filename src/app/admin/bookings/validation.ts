// Shared between the client forms (instant inline errors on submit) and the
// server actions (authoritative check) — keep it free of server-only imports.

export type FieldErrors = Partial<Record<string, string>>;

export type FormState = {
  errors?: FieldErrors;
  // Form-level error that doesn't belong to a single field (e.g. DB failure).
  message?: string;
  ok?: boolean;
};

export const MAX_ID_PHOTO_BYTES = 5 * 1024 * 1024;

const PHONE_RE = /^\+?\d{10,13}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function normalizePhone(phone: string) {
  return phone.replace(/[\s()-]/g, "");
}

function validateStay(formData: FormData, errors: FieldErrors) {
  const checkIn = str(formData, "check_in_at");
  const checkOut = str(formData, "check_out_at");

  if (!checkIn) errors.check_in_at = "Check-in is required.";
  if (!checkOut) errors.check_out_at = "Check-out is required.";
  if (checkIn && checkOut && checkOut <= checkIn) {
    errors.check_out_at = "Check-out must be after check-in.";
  }

  const totalRaw = str(formData, "total_amount");
  const total = Number(totalRaw);
  if (!totalRaw) errors.total_amount = "Total amount is required.";
  else if (!Number.isFinite(total) || total <= 0) errors.total_amount = "Total amount must be greater than zero.";
}

function validatePhoto(formData: FormData, key: string, errors: FieldErrors) {
  const file = formData.get(key);
  if (!(file instanceof File) || file.size === 0) return;
  if (!file.type.startsWith("image/")) errors[key] = "Upload an image file.";
  else if (file.size > MAX_ID_PHOTO_BYTES) errors[key] = "Photo must be 5 MB or smaller.";
}

export function validateBookingForm(formData: FormData, mode: "create" | "edit"): FieldErrors {
  const errors: FieldErrors = {};

  const name = str(formData, "guest_full_name");
  if (!name) errors.guest_full_name = "Guest name is required.";
  else if (name.length < 2) errors.guest_full_name = "Enter the guest's full name.";

  const phone = normalizePhone(str(formData, "guest_phone"));
  if (!phone) errors.guest_phone = "Phone number is required.";
  else if (!PHONE_RE.test(phone)) errors.guest_phone = "Enter a valid phone number (10 digits, optional +91).";

  const email = str(formData, "guest_email");
  if (email && !EMAIL_RE.test(email)) errors.guest_email = "Enter a valid email address.";

  const idType = str(formData, "id_proof_type");
  const idNumber = str(formData, "id_proof_number");
  if (idNumber && !idType) errors.id_proof_type = "Select the ID proof type.";
  if (idType === "Aadhaar" && idNumber && !/^\d{12}$/.test(idNumber.replace(/\s/g, ""))) {
    errors.id_proof_number = "Aadhaar number must be 12 digits.";
  }

  validatePhoto(formData, "id_proof_front", errors);
  validatePhoto(formData, "id_proof_back", errors);

  validateStay(formData, errors);

  const numGuests = str(formData, "num_guests");
  if (numGuests && (!Number.isInteger(Number(numGuests)) || Number(numGuests) < 1)) {
    errors.num_guests = "Number of guests must be a whole number, 1 or more.";
  }

  if (formData.getAll("room_ids").length === 0) errors.room_ids = "Select at least one room.";

  if (mode === "create") {
    const advanceRaw = str(formData, "advance_amount");
    const advance = Number(advanceRaw || 0);
    if (!Number.isFinite(advance) || advance < 0) errors.advance_amount = "Advance can't be negative.";
    else if (!errors.total_amount && advance > Number(str(formData, "total_amount"))) {
      errors.advance_amount = "Advance can't be more than the total amount.";
    }
  }

  return errors;
}

export function validateStayForm(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};
  validateStay(formData, errors);
  return errors;
}

export function validatePaymentForm(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const raw = str(formData, "amount");
  const amount = Number(raw);
  if (!raw) errors.amount = "Amount is required.";
  else if (!Number.isFinite(amount) || amount <= 0) errors.amount = "Amount must be greater than zero.";
  return errors;
}

export function hasErrors(errors: FieldErrors) {
  return Object.keys(errors).length > 0;
}
