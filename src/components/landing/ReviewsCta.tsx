import { MAP_DIRECTIONS_URL } from "@/lib/business-info";

export function ReviewsCta({ alt }: { alt?: boolean }) {
  return (
    <section className={alt ? "section section-alt" : "section"}>
      <div className="container reviews-cta">
        <p className="section-eyebrow">Guest Experience</p>
        <h2 className="section-title">What Our Guests Say</h2>
        <p className="section-lead">
          Read verified guest reviews for Hamza Residency Plaza on Google, or share your own experience after your stay.
        </p>
        <a href={MAP_DIRECTIONS_URL} target="_blank" rel="noopener" className="btn btn-outline btn-lg">
          View Reviews on Google
        </a>
      </div>
    </section>
  );
}
