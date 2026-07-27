import { LightboxProvider } from "@/components/gallery/LightboxProvider";
import { GalleryButton } from "@/components/gallery/GalleryButton";
import { waLink } from "@/lib/business-info";

const GALLERY_ITEMS = [
  { src: "/assets/rooms/deluxe-suite.jpg", alt: "Spacious deluxe room with marble flooring", caption: "Spacious Deluxe Room" },
  { src: "/assets/rooms/room-ac-1.jpg", alt: "AC room with double bed", caption: "Well-Lit AC Room" },
  { src: "/assets/rooms/room-ac-2.jpg", alt: "Cozy double room", caption: "Cozy Double Room" },
  { src: "/assets/rooms/lounge.jpg", alt: "Lounge and sitting area with sofa", caption: "Lounge & Sitting Area" },
  { src: "/assets/rooms/room-deluxe-2.jpg", alt: "Comfortable bedroom with marble floor", caption: "Comfortable Bedroom" },
  { src: "/assets/rooms/bathroom.jpg", alt: "Clean attached bathroom", caption: "Clean Attached Bathroom" },
  { src: "/assets/rooms/kitchenette.jpg", alt: "In-room kitchenette with sink", caption: "In-Room Kitchenette" },
  { src: "/assets/rooms/room-ac-3.jpg", alt: "Bright non-AC room", caption: "Bright Non-AC Room" },
];

export function PhotoGallery() {
  return (
    <section className="section section-alt" id="rooms">
      <div className="container">
        <p className="section-eyebrow">Take a Look Inside</p>
        <h2 className="section-title">Our Rooms &amp; Spaces</h2>
        <p className="section-lead">A glimpse of the comfortable interiors waiting for you at Hamza Residency Plaza.</p>

        <LightboxProvider items={GALLERY_ITEMS}>
          <div className="gallery" id="gallery">
            {GALLERY_ITEMS.map((item, index) => (
              <GalleryButton
                key={item.src}
                index={index}
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                imgSizes="(max-width: 560px) 50vw, (max-width: 980px) 50vw, 25vw"
              />
            ))}
          </div>
        </LightboxProvider>

        <div className="rooms-cta">
          <p>Room types, rates &amp; availability are best confirmed over a quick call or WhatsApp message.</p>
          <div className="rooms-cta-btns">
            <a href="/rooms" className="btn btn-outline">
              View All Room Types
            </a>
            <a
              href={waLink("Assalamu Alaikum, could you share room availability and rates?")}
              target="_blank"
              rel="noopener"
              className="btn btn-solid"
            >
              Ask About Availability
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
