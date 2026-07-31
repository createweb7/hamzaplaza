const IST_TZ = "Asia/Kolkata";

export function istParts(iso: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: IST_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(iso));
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return { year: map.year, month: map.month, day: map.day };
}

export function istDateKey(iso: string) {
  const { year, month, day } = istParts(iso);
  return `${year}-${month}-${day}`;
}

export function istMonthKey(iso: string) {
  const { year, month } = istParts(iso);
  return `${year}-${month}`;
}

// Adds `days` calendar days to a "YYYY-MM-DD" date key, staying in that
// calendar (not a real timezone-aware instant) — fine since we only ever
// use this for generating IST calendar-date sequences.
export function addDays(dateKey: string, days: number): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
}

export function istNowDateKey(): string {
  return istDateKey(new Date().toISOString());
}

// Adds `months` calendar months to a "YYYY-MM" month key.
export function addMonths(monthKey: string, months: number): string {
  const [y, m] = monthKey.split("-").map(Number);
  const total = y * 12 + (m - 1) + months;
  const newYear = Math.floor(total / 12);
  const newMonth = (total % 12) + 1;
  return `${newYear}-${String(newMonth).padStart(2, "0")}`;
}

// IST instant bounds for a "YYYY-MM" month key: [start, end) — end is the
// first instant of the following month, for use with a `.lt()` filter.
export function monthBoundsIst(monthKey: string) {
  return {
    start: `${monthKey}-01T00:00:00+05:30`,
    end: `${addMonths(monthKey, 1)}-01T00:00:00+05:30`,
  };
}
