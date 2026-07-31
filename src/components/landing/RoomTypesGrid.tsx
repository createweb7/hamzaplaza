import Link from "next/link";
import { ROOM_TYPES } from "@/lib/room-types";

export function RoomTypesGrid({
  eyebrow,
  title,
  intro,
  alt,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  alt?: boolean;
}) {
  return (
    <section className={alt ? "section section-alt" : "section"}>
      <div className="container">
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {intro && <p className="section-lead">{intro}</p>}

        <div className="room-types-grid">
          {ROOM_TYPES.map((roomType) => (
            <Link key={roomType.slug} href={`/rooms#${roomType.slug}`} className="room-type-card">
              <span className="room-type-card-tag">{roomType.tag}</span>
              <h3>{roomType.name}</h3>
              <p>{roomType.tagline}</p>
              <span className="room-type-card-link">Explore Room →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
