import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { PRIMARY_PHONE, waLink } from "@/lib/business-info";
import { Breadcrumbs } from "@/components/landing/Breadcrumbs";

export function LandingHero({
  eyebrow,
  title,
  description,
  backgroundImage,
  waMessage,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage: string;
  waMessage: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="page-hero">
      <div
        className="page-hero-bg"
        style={{ backgroundImage: `url('${backgroundImage}')`, backgroundPosition: "center 30%" }}
        aria-hidden="true"
      />
      <div className="page-hero-scrim" aria-hidden="true" />
      <div className="container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-desc">{description}</p>
        <div className="hero-ctas">
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
    </section>
  );
}
