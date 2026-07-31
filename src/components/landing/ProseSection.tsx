import type { ReactNode } from "react";
import Image from "next/image";

export function ProseSection({
  eyebrow,
  title,
  paragraphs,
  alt,
  id,
  image,
  imageAlt,
  reverse,
}: {
  eyebrow?: string;
  title: string;
  paragraphs: ReactNode[];
  alt?: boolean;
  id?: string;
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
}) {
  const text = (
    <div className="landing-split-text">
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-title" style={{ maxWidth: image ? "none" : "820px" }}>
        {title}
      </h2>
      <div style={{ maxWidth: image ? "none" : "760px", display: "flex", flexDirection: "column", gap: "18px" }}>
        {paragraphs.map((paragraph, index) => (
          <p key={index} style={{ color: "var(--text-dim)", fontSize: "1.02rem" }}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );

  if (!image) {
    return (
      <section className={alt ? "section section-alt" : "section"} id={id}>
        <div className="container">{text}</div>
      </section>
    );
  }

  return (
    <section className={alt ? "section section-alt" : "section"} id={id}>
      <div className={`container landing-split${reverse ? " reverse" : ""}`}>
        {text}
        <div className="landing-split-media">
          <Image src={image} alt={imageAlt ?? title} fill sizes="(max-width: 980px) 100vw, 45vw" style={{ objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}
