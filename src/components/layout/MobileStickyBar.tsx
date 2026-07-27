import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { PRIMARY_PHONE, WA_GENERAL_MESSAGE, waLink } from "@/lib/business-info";

export function MobileStickyBar() {
  return (
    <div className="mobile-sticky-bar">
      <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-outline">
        <PhoneIcon />
        Call
      </a>
      <a href={waLink(WA_GENERAL_MESSAGE)} target="_blank" rel="noopener" className="btn btn-solid">
        <WhatsAppIcon />
        WhatsApp
      </a>
    </div>
  );
}
