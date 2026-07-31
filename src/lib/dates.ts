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
