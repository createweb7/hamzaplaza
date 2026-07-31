import { PRIMARY_PHONE, waLink } from "@/lib/business-info";

export function ClosingCta({
  title,
  description,
  waMessage,
}: {
  title: string;
  description: string;
  waMessage: string;
}) {
  return (
    <section className="rooms-closing">
      <div className="container rooms-closing-inner">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="hero-ctas">
          <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-solid btn-lg">
            Call to Book
          </a>
          <a href={waLink(waMessage)} target="_blank" rel="noopener" className="btn btn-outline btn-lg">
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
