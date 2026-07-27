import { MAP_EMBED_URL } from "@/lib/business-info";

export function MapEmbed() {
  return (
    <div className="location-map">
      <iframe
        title="Hamza Residency Plaza location map"
        src={MAP_EMBED_URL}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
