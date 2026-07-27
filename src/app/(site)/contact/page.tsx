import type { Metadata } from "next";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { PRIMARY_PHONE, WA_GENERAL_MESSAGE, waLink } from "@/lib/business-info";

const title = "Contact & Location | Hamza Residency Plaza";
const description =
  "Contact Hamza Residency Plaza — call or WhatsApp any of our numbers, or find us on the map. 546/9 ECR Road, Next Bharath Petrol Bunk, Eripurakarai, Adirampattinam PO-614701.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title,
    description,
    url: "/contact",
    type: "website",
    locale: "en_IN",
    images: ["/assets/contact-hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/contact-hero.jpg"],
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: "url('/assets/contact-hero.jpg')", backgroundPosition: "center 35%" }}
          aria-hidden="true"
        />
        <div className="page-hero-scrim" aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">Hamza Residency Plaza</p>
          <h1>
            Contact &amp; <span className="gold-text">Location</span>
          </h1>
          <p className="page-hero-desc">
            Booking is simple — just call or WhatsApp any of the numbers below. We&apos;re on ECR Road, next to
            Bharath Petrol Bunk, Eripurakarai, Adirampattinam.
          </p>
          <div className="hero-ctas">
            <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-solid btn-lg">
              <PhoneIcon />
              Call to Book
            </a>
            <a href={waLink(WA_GENERAL_MESSAGE)} target="_blank" rel="noopener" className="btn btn-outline btn-lg">
              <WhatsAppIcon />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="location-grid">
            <ContactDetails />
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
