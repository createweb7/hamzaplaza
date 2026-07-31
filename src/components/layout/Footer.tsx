import Image from "next/image";
import Link from "next/link";
import { EMAIL, PHONE_NUMBERS, ADDRESS_LINE_1, ADDRESS_LINE_2, waLink } from "@/lib/business-info";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Image src="/assets/logo-srh.png" alt="SRH emblem" className="brand-mark" width={44} height={44} />
          <span className="brand-name">
            Hamza <em>Residency Plaza</em>
          </span>
          <a href={`mailto:${EMAIL}`} className="footer-email">
            {EMAIL}
          </a>
          <p className="footer-address">
            {ADDRESS_LINE_1}
            <br />
            {ADDRESS_LINE_2}
          </p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          {PHONE_NUMBERS.map((phone) => (
            <a key={phone.e164} href={`tel:${phone.e164}`}>
              {phone.display}
            </a>
          ))}
          <a href={waLink()} target="_blank" rel="noopener">
            Chat on WhatsApp
          </a>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <div className="footer-explore-grid">
            <Link href="/">Home</Link>
            <Link href="/rooms">Rooms</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/rooms-in-adirampattinam">Adirampattinam Rooms</Link>
            <Link href="/hotel-in-adirampattinam">Adirampattinam Hotel</Link>
            <Link href="/lodge-in-adirampattinam">Adirampattinam Lodge</Link>
            <Link href="/family-rooms-in-adirampattinam">Family Rooms</Link>
            <Link href="/ac-rooms-in-adirampattinam">AC Rooms</Link>
            <Link href="/budget-hotel-in-adirampattinam">Budget Hotel</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hamza Residency Plaza. All rights reserved.</p>
      </div>
    </footer>
  );
}
