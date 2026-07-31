import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { PRIMARY_PHONE, waLink } from "@/lib/business-info";

export function CtaBanner({
  title,
  description,
  waMessage,
  alt,
}: {
  title: string;
  description: string;
  waMessage: string;
  alt?: boolean;
}) {
  return (
    <section className={alt ? "section section-alt" : "section"}>
      <div className="container">
        <div className="rooms-cta">
          <div>
            <h2 className="section-title" style={{ marginBottom: "8px" }}>
              {title}
            </h2>
            <p>{description}</p>
          </div>
          <div className="rooms-cta-btns">
            <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-solid btn-lg">
              <PhoneIcon />
              Call to Book
            </a>
            <a href={waLink(waMessage)} target="_blank" rel="noopener" className="btn btn-outline btn-lg">
              <WhatsAppIcon />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
