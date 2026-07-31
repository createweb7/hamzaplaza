import Image from "next/image";

type GalleryImage = { src: string; alt: string; caption: string };

export function RoomGallery({
  eyebrow,
  title,
  intro,
  images,
  alt,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  images: GalleryImage[];
  alt?: boolean;
}) {
  return (
    <section className={alt ? "section section-alt" : "section"}>
      <div className="container">
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {intro && <p className="section-lead">{intro}</p>}

        <div className="room-gallery-grid">
          {images.map((image) => (
            <figure className="room-gallery-item" key={image.src}>
              <div className="room-gallery-media">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 980px) 50vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
