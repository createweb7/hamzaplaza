import { WhatsAppIcon } from "@/components/icons";
import { WA_GENERAL_MESSAGE, waLink } from "@/lib/business-info";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(WA_GENERAL_MESSAGE)}
      target="_blank"
      rel="noopener"
      className="float-whatsapp"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}
