import Image from "next/image";
import { PhoneIcon } from "@/components/icons";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  ADDRESS_REGION,
  MAP_DIRECTIONS_URL,
  PHONE_NUMBERS,
  PRIMARY_PHONE,
  waLink,
} from "@/lib/business-info";

export function ContactDetails() {
  return (
    <div className="location-details">
      <div className="location-photo">
        <Image
          src="/assets/frontage-day-card.jpg"
          alt="Hamza Residency Plaza street-facing frontage by day"
          width={600}
          height={340}
        />
      </div>
      <h3>Hamza Residency Plaza</h3>
      <p className="location-address">
        {ADDRESS_LINE_1}
        <br />
        {ADDRESS_LINE_2}
        <br />
        {ADDRESS_REGION}
      </p>
      <div className="location-phones">
        {PHONE_NUMBERS.map((phone) => (
          <a key={phone.e164} href={`tel:${phone.e164}`}>
            <PhoneIcon />
            {phone.display}
          </a>
        ))}
      </div>
      <div className="location-ctas">
        <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-solid">
          Call Now
        </a>
        <a href={waLink()} target="_blank" rel="noopener" className="btn btn-outline">
          WhatsApp
        </a>
        <a href={MAP_DIRECTIONS_URL} target="_blank" rel="noopener" className="btn btn-outline">
          Get Directions
        </a>
      </div>
    </div>
  );
}
