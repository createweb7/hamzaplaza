import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { PRIMARY_PHONE, WA_GENERAL_MESSAGE, waLink } from "@/lib/business-info";

export function Hero() {
  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: "url('/assets/hero-frontage-day.jpg')" }}
        aria-hidden="true"
      />
      <div className="hero-scrim" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Rooms in Adirampattinam &middot; ECR Road</p>
          <h1>
            Hamza Residency
            <br />
            <span className="gold-text">Plaza</span>
          </h1>
          <p className="hero-tamil">ஹாம்சா ரெசிடென்சி பிளாசா — அனைத்து நவீன வசதிகளுடன்</p>
          <p className="hero-desc">
            Spacious AC &amp; Non-AC rooms on a daily-rental basis, in a quiet, secure setting on ECR Road.
            Booking is simple — just call or WhatsApp us, no forms, no fuss.
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

          <ul className="hero-badges">
            <li>AC &amp; Non-AC Rooms</li>
            <li>Free Wi-Fi</li>
            <li>Secure Parking</li>
            <li>24/7 CCTV</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
