export function ChipSection({
  eyebrow,
  title,
  intro,
  items,
  closing,
  alt,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: string[];
  closing?: string;
  alt?: boolean;
}) {
  return (
    <section className={alt ? "section section-alt" : "section"}>
      <div className="container">
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {intro && <p className="section-lead" style={{ marginBottom: "0" }}>{intro}</p>}

        <div className="chip-list">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        {closing && (
          <p style={{ color: "var(--text-dim)", maxWidth: "760px", fontSize: "1.02rem" }}>{closing}</p>
        )}
      </div>
    </section>
  );
}
