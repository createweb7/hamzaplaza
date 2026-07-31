type TravellerType = { title: string; description: string };

export function TravellerTypesSection({
  eyebrow,
  title,
  intro,
  items,
  alt,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: TravellerType[];
  alt?: boolean;
}) {
  return (
    <section className={alt ? "section section-alt" : "section"}>
      <div className="container">
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {intro && <p className="section-lead">{intro}</p>}

        <div className="info-card-grid">
          {items.map((item) => (
            <div className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
