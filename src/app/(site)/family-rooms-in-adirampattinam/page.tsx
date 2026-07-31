import type { Metadata } from "next";
import Link from "next/link";
import { LandingHero } from "@/components/landing/LandingHero";
import { HighlightStrip } from "@/components/landing/HighlightStrip";
import { ProseSection } from "@/components/landing/ProseSection";
import { ChecklistSection } from "@/components/landing/ChecklistSection";
import { RoomGallery } from "@/components/landing/RoomGallery";
import { RoomTypesGrid } from "@/components/landing/RoomTypesGrid";
import { ChipSection } from "@/components/landing/ChipSection";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { ReviewsCta } from "@/components/landing/ReviewsCta";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { FaqSection } from "@/components/landing/FaqSection";

const title = "Family Rooms in Adirampattinam | Spacious & Comfortable Stay";
const socialTitle = "Family Rooms in Adirampattinam | Spacious & Comfortable Stay | Hamza Residency Plaza";
const description =
  "Looking for family rooms in Adirampattinam? Hamza Plaza offers spacious, clean, and comfortable family accommodation with AC rooms, free Wi-Fi, parking, and modern amenities.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/family-rooms-in-adirampattinam" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/family-rooms-in-adirampattinam",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/assets/og-home.jpg", width: 1200, height: 630, alt: socialTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
    images: ["/assets/og-home.jpg"],
  },
};

const HIGHLIGHTS = ["Spacious Rooms", "Peaceful Environment", "Friendly Hospitality", "Clean Accommodation", "Secure Parking", "Complimentary Wi-Fi"];

const FAMILY_SUITABILITY = [
  "Parents with children",
  "Couples travelling with family",
  "Wedding guests",
  "Family reunions",
  "Holiday travellers",
  "Visitors attending special occasions",
];

const FAMILY_AMENITIES = [
  "Spacious Air-Conditioned Rooms",
  "Comfortable Beds",
  "Clean Attached Bathrooms",
  "Hot & Cold Water",
  "Complimentary High-Speed Wi-Fi",
  "LED Television",
  "Fresh Towels & Linen",
  "Daily Housekeeping",
  "Wardrobe & Storage Space",
  "Power Backup",
  "24-Hour Reception Support",
  "Secure Parking",
];

const GALLERY_IMAGES = [
  { src: "/assets/rooms/deluxe-suite.jpg", alt: "Spacious family room at Hamza Plaza, Adirampattinam", caption: "Family Room" },
  { src: "/assets/rooms/room-ac-2.jpg", alt: "Air-conditioned family room at Hamza Plaza, Adirampattinam", caption: "AC Room" },
  { src: "/assets/rooms/kitchenette.jpg", alt: "Kitchen-attached room for families at Hamza Plaza, Adirampattinam", caption: "Kitchen-Attached Room" },
  { src: "/assets/rooms/bathroom.jpg", alt: "Clean attached bathroom at Hamza Plaza, Adirampattinam", caption: "Attached Bathroom" },
  { src: "/assets/rooms/lounge.jpg", alt: "Family lounge and living area at Hamza Plaza, Adirampattinam", caption: "Guest Lounge" },
  { src: "/assets/hero-frontage.jpg", alt: "Hamza Plaza exterior and parking area, Adirampattinam", caption: "Exterior & Parking" },
];

const NEARBY_PLACES = [
  "Adirampattinam Bus Stand",
  "Local Restaurants",
  "Shopping Areas",
  "Mosques",
  "Educational Institutions",
  "Nearby Beaches",
  "Pattukkottai",
  "Mallipattinam",
  "Muthupet",
];

const WHY_FAMILIES_CHOOSE_US = [
  "Spacious Rooms",
  "Peaceful Environment",
  "Friendly Hospitality",
  "Clean Accommodation",
  "Secure Parking",
  "Complimentary Wi-Fi",
  "Affordable Pricing",
  "Convenient Location",
  "Comfortable Bedding",
  "Easy Room Booking",
];

const FAQ_ITEMS = [
  {
    question: "Does Hamza Plaza offer family rooms in Adirampattinam?",
    answer: "Yes. We offer spacious family-friendly rooms suitable for parents, children, and relatives travelling together.",
  },
  {
    question: "Are the rooms air-conditioned?",
    answer: "Yes. Our family rooms are equipped with air conditioning to ensure a comfortable stay.",
  },
  {
    question: "Is Wi-Fi available?",
    answer: "Yes. Complimentary high-speed Wi-Fi is available for all guests.",
  },
  {
    question: "Is parking available?",
    answer: "Yes. Secure parking is available for guests staying at Hamza Plaza.",
  },
  {
    question: "Are the family rooms suitable for wedding guests?",
    answer: "Absolutely. Many families choose Hamza Plaza while attending weddings and family functions in Adirampattinam.",
  },
  {
    question: "How can I reserve a family room?",
    answer: "You can contact Hamza Plaza directly by phone or WhatsApp for quick and easy room booking.",
  },
  {
    question: "Is the hotel located near important places?",
    answer: "Yes. Hamza Plaza is conveniently located near the bus stand, shopping areas, restaurants, and other important destinations.",
  },
  {
    question: "Why choose Hamza Plaza for a family stay?",
    answer: "Guests choose Hamza Plaza because of our spacious rooms, modern amenities, clean environment, friendly hospitality, and convenient location.",
  },
];

const WA_MESSAGE = "Assalamu Alaikum, I'd like to know more about family rooms at Hamza Plaza.";

export default function FamilyRoomsInAdirampattinamPage() {
  return (
    <div className="landing-page">
      <LandingHero
        eyebrow="Hamza Residency Plaza"
        title="Family Rooms in Adirampattinam – Spacious & Comfortable Stay at Hamza Plaza"
        description="Spacious, clean AC family rooms in Adirampattinam for weddings, family functions, and holiday visits. Call or WhatsApp to check availability."
        backgroundImage="/assets/rooms/room-deluxe-2.jpg"
        waMessage={WA_MESSAGE}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Family Rooms" }]}
      />

      <HighlightStrip items={HIGHLIGHTS} />

      <ProseSection
        title="Comfortable Family Accommodation in Adirampattinam"
        paragraphs={[
          "Travelling with family is a special experience, and choosing the right accommodation plays an important role in making your trip enjoyable. If you're looking for family rooms in Adirampattinam, Hamza Plaza offers spacious, clean, and comfortable accommodation designed for families of all sizes.",
          "Whether you're visiting Adirampattinam for a wedding, family gathering, religious occasion, vacation, or simply spending quality time with loved ones, our family-friendly rooms provide the comfort and convenience you need. With modern amenities, a peaceful environment, and friendly hospitality, Hamza Plaza is a preferred choice for families visiting the town.",
          "Our goal is to ensure every member of your family enjoys a comfortable, safe, and memorable stay.",
        ]}
        image="/assets/frontage-day-card.jpg"
        imageAlt="Hamza Plaza building frontage in Adirampattinam"
      />

      <ChecklistSection
        alt
        title="Spacious Rooms Designed for Families"
        intro="Families need more than just a place to sleep—they need space to relax together after a busy day. At Hamza Plaza, our family rooms are thoughtfully designed to provide comfort, convenience, and privacy for parents, children, and relatives travelling together. Our family rooms are ideal for:"
        items={FAMILY_SUITABILITY}
        closing="Every room is maintained to ensure a pleasant experience throughout your stay."
      />

      <ChecklistSection
        title="Modern Amenities for a Relaxing Family Stay"
        intro="We understand that travelling with family requires reliable facilities. Every family room at Hamza Plaza includes modern amenities designed to make your stay comfortable and convenient. Our family accommodation includes:"
        items={FAMILY_AMENITIES}
        closing="These facilities help families relax and enjoy a worry-free stay."
      />

      <RoomGallery
        alt
        eyebrow="Family Room Gallery"
        title="A Closer Look at Our Family Rooms"
        intro="Real photos of our spacious family rooms and facilities — clean, comfortable, and ready for your family's stay in Adirampattinam."
        images={GALLERY_IMAGES}
      />

      <RoomTypesGrid
        eyebrow="Room Options"
        title="Explore Our Family-Friendly Rooms"
        intro="From 1 BHK rooms to spacious 2 BHK suites — find the room that comfortably fits your family and headcount."
      />

      <ProseSection
        alt
        reverse
        title="Perfect for Weddings & Family Functions"
        paragraphs={[
          "Adirampattinam is well known for family celebrations, weddings, and community gatherings throughout the year. Many visitors travel from nearby cities and overseas to attend these important occasions.",
          "Hamza Plaza provides comfortable accommodation for wedding guests and families, allowing everyone to stay together in a peaceful environment close to local venues and important locations.",
          "If you're travelling with relatives, our family rooms provide the space and comfort needed to make your visit enjoyable.",
        ]}
        image="/assets/rooms/deluxe-suite.jpg"
        imageAlt="Spacious family room ideal for wedding guests at Hamza Plaza"
      />

      <ProseSection
        title="A Safe & Peaceful Environment"
        paragraphs={[
          "When travelling with family, safety and cleanliness are always important. Hamza Plaza offers a calm atmosphere where families can relax with confidence.",
          "Our housekeeping team maintains high standards of hygiene throughout the property, ensuring every room is cleaned carefully before guest arrival.",
          "Parents can enjoy peace of mind knowing they are staying in a clean and well-maintained environment.",
        ]}
        image="/assets/rooms/bathroom.jpg"
        imageAlt="Clean attached bathroom at Hamza Plaza"
      />

      <ChipSection
        alt
        title="Convenient Location for Families"
        intro="One of the biggest advantages of staying at Hamza Plaza is its convenient location. Families can easily access:"
        items={NEARBY_PLACES}
        closing="Whether you're visiting relatives or exploring the area, travelling from Hamza Plaza is easy and convenient."
      />

      <ChecklistSection
        title="Why Families Choose Hamza Plaza"
        intro="Families return to Hamza Plaza because we understand what matters most during a family trip. Guests appreciate:"
        items={WHY_FAMILIES_CHOOSE_US}
        closing="We strive to make every family feel welcome from the moment they arrive."
      />

      <CtaBanner
        alt
        title="Easy Family Room Booking"
        description="Our Adirampattinam room booking process allows families to reserve their rooms quickly through phone or WhatsApp. Whether you're booking in advance for a wedding or planning a holiday, our team is ready to assist — we recommend booking early during festival seasons and wedding periods to ensure room availability."
        waMessage={WA_MESSAGE}
      />

      <ProseSection
        reverse
        title="Make Family Memories at Hamza Plaza"
        paragraphs={[
          "Family trips create lasting memories, and comfortable accommodation helps make those memories even more enjoyable. At Hamza Plaza, we focus on providing a welcoming atmosphere where families can relax after a day of celebrations, sightseeing, or spending time together.",
          "Whether you're visiting Adirampattinam for one night or an extended stay, Hamza Plaza offers accommodation that feels like a home away from home.",
          <>
            Exploring your options? Take a look at our{" "}
            <Link className="prose-link" href="/rooms-in-adirampattinam">
              Adirampattinam Rooms
            </Link>{" "}
            page, our{" "}
            <Link className="prose-link" href="/hotel-in-adirampattinam">
              Adirampattinam Hotel
            </Link>{" "}
            page, our{" "}
            <Link className="prose-link" href="/ac-rooms-in-adirampattinam">
              AC Rooms
            </Link>{" "}
            page, our budget-friendly{" "}
            <Link className="prose-link" href="/lodge-in-adirampattinam">
              Adirampattinam Lodge
            </Link>{" "}
            page, our{" "}
            <Link className="prose-link" href="/budget-hotel-in-adirampattinam">
              Budget Hotel
            </Link>{" "}
            page, or browse the{" "}
            <Link className="prose-link" href="/rooms">
              complete room types
            </Link>{" "}
            to find your perfect fit.
          </>,
        ]}
        image="/assets/rooms/lounge.jpg"
        imageAlt="Family guests relaxing at Hamza Plaza lounge"
      />

      <ReviewsCta alt />

      <FaqSection items={FAQ_ITEMS} />

      <ClosingCta
        title="Book Your Family Stay Today"
        description="Looking for spacious family rooms in Adirampattinam? Hamza Plaza offers comfortable accommodation with modern amenities, friendly service, and affordable pricing, making it an excellent choice for families visiting the town. Contact us today to reserve your family room and enjoy a comfortable stay together."
        waMessage={WA_MESSAGE}
      />
    </div>
  );
}
