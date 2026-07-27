import { PRIMARY_PHONE, waLink } from "@/lib/business-info";

export function RoomsClosing() {
  return (
    <section className="rooms-closing">
      <div className="container rooms-closing-inner">
        <h2>Not sure which room suits you?</h2>
        <p>
          Tell us your group size and dates over a quick call or WhatsApp message — we&apos;ll help you pick the
          right room type and confirm today&apos;s rate.
        </p>
        <div className="hero-ctas">
          <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-solid btn-lg">
            Call to Book
          </a>
          <a
            href={waLink("Assalamu Alaikum, I'd like help choosing a room at Hamza Residency Plaza.")}
            target="_blank"
            rel="noopener"
            className="btn btn-outline btn-lg"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
