export function ProseSection({
  eyebrow,
  title,
  paragraphs,
  alt,
  id,
}: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  alt?: boolean;
  id?: string;
}) {
  return (
    <section className={alt ? "section section-alt" : "section"} id={id}>
      <div className="container">
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2 className="section-title" style={{ maxWidth: "820px" }}>
          {title}
        </h2>
        <div style={{ maxWidth: "760px", display: "flex", flexDirection: "column", gap: "18px" }}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} style={{ color: "var(--text-dim)", fontSize: "1.02rem" }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
