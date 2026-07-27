export const SITE_NAME = "Hamza Residency Plaza";

export const PRIMARY_PHONE = "+919042050502";
export const PRIMARY_PHONE_DISPLAY = "+91 90420 50502";

export const PHONE_NUMBERS = [
  { e164: "+919042050502", display: "+91 90420 50502" },
  { e164: "+918940741701", display: "+91 89407 41701" },
  { e164: "+918270409400", display: "+91 82704 09400" },
  { e164: "+919976527996", display: "+91 99765 27996" },
] as const;

export const EMAIL = "info@hamzaplaza.com";
export const WEBSITE = "www.hamzaplaza.com";
export const LANDLINE_DISPLAY = "0437 3451862";
export const GST_NUMBER = "33CRNPR4415C1ZW";

export const ADDRESS_LINE_1 = "546/9 ECR Road, Next Bharath Petrol Bunk";
export const ADDRESS_LINE_2 = "Eripurakarai, Adirampattinam PO-614701";
export const ADDRESS_REGION = "Tamil Nadu, India";
export const FULL_ADDRESS = `${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}, ${ADDRESS_REGION}`;

export const GEO = { latitude: 10.33436107635498, longitude: 79.3762435913086 };
export const MAP_ZOOM = 17;
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${GEO.latitude},${GEO.longitude}&z=${MAP_ZOOM}&output=embed`;
export const MAP_DIRECTIONS_URL = `https://www.google.com/maps?q=${GEO.latitude},${GEO.longitude}&z=${MAP_ZOOM}`;

const WHATSAPP_NUMBER = "919042050502";

export function waLink(message?: string) {
  return message
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;
}

export const WA_GENERAL_MESSAGE =
  "Assalamu Alaikum, I'd like to know more about room availability at Hamza Residency Plaza.";
