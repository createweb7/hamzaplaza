import { GalleryButton } from "@/components/gallery/GalleryButton";
import { PRIMARY_PHONE, waLink } from "@/lib/business-info";
import type { RoomType } from "@/lib/room-types";

export function RoomTypeSection({ roomType, startIndex }: { roomType: RoomType; startIndex: number }) {
  const sectionClass = roomType.altBackground ? "room-type-section section-alt" : "room-type-section";
  const gridClass = roomType.reverse ? "container room-type-grid reverse" : "container room-type-grid";

  return (
    <section className={sectionClass} id={roomType.slug}>
      <div className={gridClass}>
        <div className="room-type-gallery">
          {roomType.images.map((image, i) => (
            <GalleryButton
              key={image.src}
              index={startIndex + i}
              src={image.src}
              alt={image.alt}
              imgSizes="(max-width: 980px) 50vw, 25vw"
            />
          ))}
        </div>
        <div className="room-type-info">
          <span className="room-type-tag">{roomType.tag}</span>
          <h2>
            {roomType.name}
            {roomType.nameSub && <span className="room-type-sub"> {roomType.nameSub}</span>}
          </h2>
          <p className="room-type-tagline">{roomType.tagline}</p>
          <p className="room-type-desc">{roomType.description}</p>
          <ul className="room-type-features">
            {roomType.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="room-type-ctas">
            <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-solid">
              Call to Book
            </a>
            <a href={waLink(roomType.waMessage)} target="_blank" rel="noopener" className="btn btn-outline">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
