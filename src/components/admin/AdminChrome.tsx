"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", available: true },
  { href: "/admin/bookings", label: "Bookings", available: true },
  { href: "/admin/invoices", label: "Invoices", available: true },
  { href: "/admin/rooms-admin", label: "Rooms", available: true },
  { href: "/admin/staff", label: "Staff", available: false },
];

export function AdminChrome({
  userLabel,
  signOutButton,
  children,
}: {
  userLabel: string;
  signOutButton: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar${mobileOpen ? " open" : ""}`}>
        <div className="admin-brand">
          <Image
            src="/assets/logo-srh.png"
            alt="Hamza Residency Plaza logo"
            width={72}
            height={Math.round(72 * (738 / 1060))}
          />
          <span>Hamza Residency Plaza</span>
        </div>

        {NAV_ITEMS.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

          if (!item.available) {
            return (
              <span key={item.href} className="admin-nav-link disabled" title="Coming soon">
                {item.label}
              </span>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={`admin-nav-link${active ? " active" : ""}`}>
              {item.label}
            </Link>
          );
        })}
      </aside>

      {mobileOpen && <div className="admin-backdrop" onClick={() => setMobileOpen(false)} />}

      <div className="admin-content">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-nav-toggle"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          <strong>Admin</strong>
          <div className="admin-topbar-right">
            <span className="admin-user-label">{userLabel}</span>
            {signOutButton}
          </div>
        </header>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
