"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { PRIMARY_PHONE, WA_GENERAL_MESSAGE, waLink } from "@/lib/business-info";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const active = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " scrolled" : ""}${navOpen ? " nav-open" : ""}`}
      id="siteHeader"
    >
      <div className="container header-inner">
        <Link href="/" className="brand">
          <Image src="/assets/logo-srh.png" alt="SRH emblem" className="brand-mark" width={38} height={38} />
          <span className="brand-name">
            Hamza <em>Residency Plaza</em>
          </span>
        </Link>

        <div className="nav-panel" id="navPanel">
          <nav className="main-nav" id="mainNav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.href === active ? "active" : undefined}
                onClick={() => setNavOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-ghost header-call">
              <PhoneIcon />
              Call Now
            </a>
            <a
              href={waLink(WA_GENERAL_MESSAGE)}
              target="_blank"
              rel="noopener"
              className="btn btn-solid header-whatsapp"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </div>

        <ThemeToggle />

        <button
          className={`nav-toggle${navOpen ? " active" : ""}`}
          id="navToggle"
          aria-label="Toggle menu"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
