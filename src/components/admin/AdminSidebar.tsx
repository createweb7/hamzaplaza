"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", available: true },
  { href: "/admin/bookings", label: "Bookings", available: true },
  { href: "/admin/invoices", label: "Invoices", available: true },
  { href: "/admin/rooms-admin", label: "Rooms", available: true },
  { href: "/admin/staff", label: "Staff", available: false },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        width: "220px",
        flexShrink: 0,
        borderRight: "1px solid var(--border)",
        padding: "1.25rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: "1rem", padding: "0 0.5rem" }}>
        Hamza Residency Plaza
      </div>

      {NAV_ITEMS.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

        if (!item.available) {
          return (
            <span
              key={item.href}
              style={{
                padding: "0.5rem",
                borderRadius: "8px",
                color: "var(--text-faint)",
                cursor: "default",
              }}
              title="Coming soon"
            >
              {item.label}
            </span>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "0.5rem",
              borderRadius: "8px",
              color: active ? "var(--text)" : "var(--text-dim)",
              background: active ? "var(--surface-2)" : "transparent",
              textDecoration: "none",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
