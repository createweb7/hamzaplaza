import { CheckCircleIcon } from "@/components/icons";

export function ChecklistSection({
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
        {intro && <p className="section-lead">{intro}</p>}

        <div className="checklist-grid">
          {items.map((item) => (
            <div className="checklist-item" key={item}>
              <CheckCircleIcon />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {closing && (
          <p style={{ color: "var(--text-dim)", maxWidth: "760px", marginTop: "30px", fontSize: "1.02rem" }}>
            {closing}
          </p>
        )}
      </div>
    </section>
  );
}
