import type { Metadata } from "next";
import Link from "next/link";
import { LandingHero } from "@/components/landing/LandingHero";
import { HighlightStrip } from "@/components/landing/HighlightStrip";
import { ProseSection } from "@/components/landing/ProseSection";
import { ChecklistSection } from "@/components/landing/ChecklistSection";
import { TravellerTypesSection } from "@/components/landing/TravellerTypesSection";
import { RoomGallery } from "@/components/landing/RoomGallery";
import { RoomTypesGrid } from "@/components/landing/RoomTypesGrid";
import { ChipSection } from "@/components/landing/ChipSection";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { ReviewsCta } from "@/components/landing/ReviewsCta";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { FaqSection } from "@/components/landing/FaqSection";

const title = "Adirampattinam Lodge | Affordable & Comfortable Accommodation";
const socialTitle = "Adirampattinam Lodge | Affordable & Comfortable Accommodation | Hamza Residency Plaza";
const description =
  "Looking for an Adirampattinam lodge? Hamza Plaza offers affordable accommodation with clean AC rooms, modern amenities, free Wi-Fi, secure parking, and easy room booking.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/lodge-in-adirampattinam" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/lodge-in-adirampattinam",
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

const HIGHLIGHTS = ["Affordable Pricing", "AC Rooms", "Free Wi-Fi", "Secure Parking", "Clean Rooms", "Friendly Hospitality"];

const COMFORT_ITEMS = [
  "Clean and hygienic rooms",
  "Comfortable beds",
  "Air-conditioned accommodation",
  "Attached bathrooms",
  "Peaceful surroundings",
  "Friendly service",
  "Convenient location",
  "Affordable pricing",
];

const TRAVELLER_TYPES = [
  {
    title: "Overnight Travellers",
    description: "Passing through Adirampattinam? Enjoy a comfortable night's rest before continuing your journey.",
  },
  {
    title: "Business Visitors",
    description: "Travelling for work? Relax in peaceful surroundings with complimentary Wi-Fi and modern facilities after a busy day.",
  },
  {
    title: "Family Guests",
    description: "Visiting relatives or attending family functions? Our spacious rooms provide comfort for guests of all ages.",
  },
  {
    title: "Wedding Visitors",
    description:
      "Adirampattinam hosts many weddings and celebrations throughout the year. Hamza Plaza provides comfortable accommodation for guests travelling from nearby cities and towns.",
  },
  {
    title: "Solo Travellers",
    description: "Travelling alone? Our safe environment, helpful staff, and comfortable rooms make Hamza Plaza a dependable choice.",
  },
];

const LODGE_AMENITIES = [
  "Comfortable Air-Conditioned Rooms",
  "High-Speed Wi-Fi",
  "Clean Attached Bathrooms",
  "Fresh Linen & Towels",
  "LED Television",
  "Daily Housekeeping",
  "Secure Parking",
  "24-Hour Reception Assistance",
  "Peaceful Environment",
  "Friendly Hospitality",
];

const GALLERY_IMAGES = [
  { src: "/assets/rooms/room-ac-2.jpg", alt: "Adirampattinam Lodge air-conditioned room at Hamza Plaza", caption: "AC Room" },
  { src: "/assets/rooms/deluxe-suite.jpg", alt: "Spacious family accommodation at Hamza Plaza lodge, Adirampattinam", caption: "Family Room" },
  { src: "/assets/rooms/kitchenette.jpg", alt: "Kitchen-attached lodge room at Hamza Plaza, Adirampattinam", caption: "Kitchen-Attached Room" },
  { src: "/assets/rooms/bathroom.jpg", alt: "Clean attached bathroom at Hamza Plaza lodge, Adirampattinam", caption: "Attached Bathroom" },
  { src: "/assets/rooms/lounge.jpg", alt: "Guest lounge and living area at Hamza Plaza lodge, Adirampattinam", caption: "Guest Lounge" },
  { src: "/assets/hero-frontage-day.jpg", alt: "Hamza Plaza lodge exterior and parking, Adirampattinam", caption: "Exterior & Parking" },
];

const NEARBY_PLACES = [
  "Adirampattinam Bus Stand",
  "Local Shopping Areas",
  "Restaurants & Cafés",
  "Mosques",
  "Educational Institutions",
  "Pattukkottai",
  "Mallipattinam",
  "Muthupet",
  "Nearby Beaches",
];

const BUDGET_REASONS = [
  "Affordable Room Tariffs",
  "Modern Facilities",
  "Friendly Staff",
  "Clean Rooms",
  "Comfortable Beds",
  "Safe Environment",
  "Convenient Room Booking",
  "Excellent Customer Service",
];

const FAQ_ITEMS = [
  {
    question: "Why choose Hamza Plaza when looking for an Adirampattinam lodge?",
    answer: "Hamza Plaza combines the affordability of a lodge with the comfort and facilities of a modern hotel, making it an excellent choice for travellers.",
  },
  {
    question: "Do you provide air-conditioned rooms?",
    answer: "Yes. Our rooms are fully air-conditioned for a comfortable stay throughout the year.",
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
    question: "Is the lodge suitable for families?",
    answer: "Absolutely. Our spacious rooms and peaceful environment make Hamza Plaza suitable for families, couples, and groups.",
  },
  {
    question: "Can I make a room booking by phone?",
    answer: "Yes. You can contact us directly by phone or WhatsApp for quick and convenient room booking.",
  },
  {
    question: "Is Hamza Plaza suitable for business travellers?",
    answer: "Yes. Business guests appreciate our comfortable rooms, peaceful surroundings, and complimentary Wi-Fi.",
  },
  {
    question: "Is Hamza Plaza close to the Adirampattinam Bus Stand?",
    answer: "Yes. Our convenient location makes it easy to reach the bus stand and other important places in and around Adirampattinam.",
  },
];

const WA_MESSAGE = "Assalamu Alaikum, I'd like to know more about lodge accommodation at Hamza Plaza.";

export default function LodgeInAdirampattinamPage() {
  return (
    <div className="landing-page">
      <LandingHero
        eyebrow="Hamza Residency Plaza"
        title="Adirampattinam Lodge – Affordable Accommodation with Modern Comfort"
        description="Clean, affordable AC lodge accommodation in Adirampattinam for overnight travellers, families, and business visitors. Call or WhatsApp to check availability."
        backgroundImage="/assets/rooms/room-deluxe-2.jpg"
        waMessage={WA_MESSAGE}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Adirampattinam Lodge" }]}
      />

      <HighlightStrip items={HIGHLIGHTS} />

      <ProseSection
        title="Looking for a Lodge in Adirampattinam?"
        paragraphs={[
          "When searching for an Adirampattinam lodge, most travellers want more than just a place to sleep. They want accommodation that is clean, safe, comfortable, and reasonably priced. Whether you're visiting the town for business, attending a family function, travelling with friends, or stopping for a short stay, choosing the right place can make your trip much more enjoyable.",
          "Hamza Plaza offers the perfect balance between affordability and comfort. While many guests search for a lodge, they are pleasantly surprised to discover accommodation that provides the comfort of a modern hotel without the premium price. From clean rooms and friendly hospitality to convenient facilities and a peaceful atmosphere, Hamza Plaza is designed to make every stay relaxing and worry-free.",
        ]}
        image="/assets/frontage-day-card.jpg"
        imageAlt="Hamza Plaza lodge building frontage in Adirampattinam"
      />

      <ChecklistSection
        alt
        title="Affordable Stay Without Compromising Comfort"
        intro="Travelling doesn't always require luxury, but it should always provide comfort. At Hamza Plaza, we believe every guest deserves a pleasant stay regardless of their budget. Our accommodation is ideal for travellers who are looking for:"
        items={COMFORT_ITEMS}
        closing="Whether you're staying overnight or planning a longer visit, you'll enjoy quality accommodation at excellent value."
      />

      <TravellerTypesSection
        title="Perfect for Short Stays and Long Visits"
        intro="Hamza Plaza welcomes guests with different travel needs."
        items={TRAVELLER_TYPES}
      />

      <ChecklistSection
        alt
        title="More Than Just a Lodge"
        intro="Many travellers searching for an Adirampattinam lodge expect only basic facilities. At Hamza Plaza, we go beyond expectations by offering accommodation that combines affordability with modern comfort. Guests enjoy:"
        items={LODGE_AMENITIES}
        closing="We believe every guest deserves quality accommodation, no matter the purpose of their visit."
      />

      <RoomGallery
        eyebrow="Lodge Gallery"
        title="A Closer Look at Hamza Plaza"
        intro="Real photos of our rooms and facilities — clean, comfortable, and affordable accommodation right in the heart of Adirampattinam."
        images={GALLERY_IMAGES}
      />

      <RoomTypesGrid
        alt
        eyebrow="Room Options"
        title="Explore Our Rooms"
        intro="From budget-friendly single rooms to spacious suites for families and groups — find the room that matches your stay and headcount."
      />

      <ProseSection
        reverse
        title="A Peaceful Environment to Relax"
        paragraphs={[
          "After a long day of travelling, meetings, family functions, or sightseeing, a peaceful place to rest makes all the difference.",
          "Hamza Plaza offers a calm and comfortable atmosphere where guests can unwind, recharge, and enjoy a restful night's sleep. Our rooms are carefully maintained to provide cleanliness, privacy, and comfort throughout your stay.",
          "Whether you're staying for one night or several days, you'll always find a welcoming environment waiting for you.",
        ]}
        image="/assets/rooms/lounge.jpg"
        imageAlt="Calm guest lounge area at Hamza Plaza lodge"
      />

      <ChipSection
        alt
        title="Convenient Location in Adirampattinam"
        intro="Location is one of the biggest advantages of staying at Hamza Plaza. Guests can easily access:"
        items={NEARBY_PLACES}
        closing="This convenient location makes travelling around Adirampattinam simple and stress-free."
      />

      <ChecklistSection
        title="Why Budget Travellers Choose Hamza Plaza"
        intro="Guests looking for affordable accommodation often return to Hamza Plaza because we consistently deliver comfort, cleanliness, and value. Our guests appreciate:"
        items={BUDGET_REASONS}
        closing="Instead of choosing accommodation based only on price, guests choose Hamza Plaza because of the quality experience they receive."
      />

      <CtaBanner
        alt
        title="Easy Room Booking"
        description="Hamza Plaza makes Adirampattinam room booking simple and convenient. Whether you're planning your trip in advance or need a room at short notice, our team is happy to assist — contact us by phone or WhatsApp to check availability and reserve your stay within minutes."
        waMessage={WA_MESSAGE}
      />

      <ProseSection
        reverse
        title="Discover Comfortable Accommodation in Adirampattinam"
        paragraphs={[
          "If you're searching online for an Adirampattinam lodge, you're probably looking for accommodation that offers good value, reliable service, and comfortable facilities. Hamza Plaza delivers exactly that.",
          "Instead of simply providing a room, we focus on creating a pleasant experience where guests can relax, sleep comfortably, and enjoy genuine hospitality throughout their visit.",
          <>
            Prefer something more specific? Explore our{" "}
            <Link className="prose-link" href="/rooms-in-adirampattinam">
              Adirampattinam Rooms
            </Link>{" "}
            for AC and family accommodation, our{" "}
            <Link className="prose-link" href="/hotel-in-adirampattinam">
              Adirampattinam Hotel
            </Link>{" "}
            page for our full range of hospitality, our{" "}
            <Link className="prose-link" href="/family-rooms-in-adirampattinam">
              Family Rooms
            </Link>{" "}
            page if you're travelling with relatives, our{" "}
            <Link className="prose-link" href="/ac-rooms-in-adirampattinam">
              AC Rooms
            </Link>{" "}
            page for air-conditioned accommodation, or browse the{" "}
            <Link className="prose-link" href="/rooms">
              complete room types
            </Link>{" "}
            to find your perfect fit.
          </>,
        ]}
        image="/assets/rooms/room-ac-1.jpg"
        imageAlt="Comfortable air-conditioned lodge room at Hamza Plaza"
      />

      <ReviewsCta alt />

      <FaqSection items={FAQ_ITEMS} />

      <ClosingCta
        title="Book Your Stay Today"
        description="Looking for an affordable and comfortable Adirampattinam lodge? Hamza Plaza welcomes travellers with clean accommodation, modern amenities, and friendly hospitality. Reserve your room today and enjoy a relaxing stay with excellent service, convenient facilities, and affordable pricing."
        waMessage={WA_MESSAGE}
      />
    </div>
  );
}
