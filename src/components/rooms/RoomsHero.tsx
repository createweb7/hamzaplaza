import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { PRIMARY_PHONE, waLink } from "@/lib/business-info";
import { ROOM_TYPES } from "@/lib/room-types";

export function RoomsHero() {
  return (
    <section className="page-hero">
      <div
        className="page-hero-bg"
        style={{ backgroundImage: "url('/assets/rooms-hero.jpg')", backgroundPosition: "center 30%" }}
        aria-hidden="true"
      />
      <div className="page-hero-scrim" aria-hidden="true" />
      <div className="container">
        <p className="eyebrow">Rooms in Adirampattinam</p>
        <h1>
          Our Room <span className="gold-text">Types</span>
        </h1>
        <p className="page-hero-desc">
          Five room configurations at Hamza Residency Plaza, Adirampattinam, to suit solo travellers, families
          and groups — all on a simple daily-rental basis. Every room comes with an attached bathroom, and AC /
          Non-AC options are available. Rates and live availability are confirmed over a quick call or WhatsApp
          message.
        </p>
        <div className="hero-ctas">
          <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-solid btn-lg">
            <PhoneIcon />
            Call to Book
          </a>
          <a
            href={waLink("Assalamu Alaikum, I'd like to know more about room types and availability at Hamza Residency Plaza.")}
            target="_blank"
            rel="noopener"
            className="btn btn-outline btn-lg"
          >
            <WhatsAppIcon />
            WhatsApp Us
          </a>
        </div>

        <div className="room-jump">
          {ROOM_TYPES.map((roomType) => (
            <a key={roomType.slug} href={`#${roomType.slug}`}>
              {roomType.jumpLabel}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
