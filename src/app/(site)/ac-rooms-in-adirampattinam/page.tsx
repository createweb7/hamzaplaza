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

const title = "AC Rooms in Adirampattinam | Comfortable Air-Conditioned Stay";
const socialTitle = "AC Rooms in Adirampattinam | Comfortable Air-Conditioned Stay | Hamza Residency Plaza";
const description =
  "Looking for AC rooms in Adirampattinam? Hamza Plaza offers clean air-conditioned rooms with modern amenities, free Wi-Fi, parking, and easy room booking for business and leisure travellers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ac-rooms-in-adirampattinam" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/ac-rooms-in-adirampattinam",
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

const HIGHLIGHTS = ["Cool & Comfortable Rooms", "Friendly Hospitality", "Free Wi-Fi", "Secure Parking", "Affordable Pricing", "Peaceful Environment"];

const WHY_AC_ROOMS = [
  "Comfortable temperature throughout the day",
  "Spacious and well-maintained interiors",
  "Peaceful atmosphere for restful sleep",
  "Modern amenities for convenience",
  "Clean and hygienic surroundings",
  "Friendly hospitality",
  "Affordable room rates",
];

const ROOM_FACILITIES = [
  "Air Conditioning",
  "Comfortable Premium Beds",
  "Attached Bathroom",
  "Hot & Cold Water",
  "Complimentary High-Speed Wi-Fi",
  "LED Television",
  "Fresh Linen & Towels",
  "Daily Housekeeping",
  "Wardrobe & Storage Space",
  "Power Backup",
  "24-Hour Reception Assistance",
  "Secure Parking",
];

const TRAVELLER_TYPES = [
  {
    title: "Business Travellers",
    description: "After meetings or long journeys, relax in a peaceful air-conditioned room with reliable Wi-Fi and a comfortable workspace.",
  },
  {
    title: "Families",
    description: "Families appreciate our spacious rooms and cool, comfortable environment, especially when travelling with children or elderly family members.",
  },
  {
    title: "Couples",
    description: "Enjoy privacy, comfort, and a peaceful atmosphere during your visit to Adirampattinam.",
  },
  {
    title: "Wedding Guests",
    description: "Attending a wedding or family celebration? Our AC rooms provide a refreshing place to relax after a busy day of events.",
  },
  {
    title: "Tourists",
    description: "Explore Adirampattinam during the day and return to a cool, comfortable room in the evening.",
  },
];

const GALLERY_IMAGES = [
  { src: "/assets/rooms/room-ac-2.jpg", alt: "Air-conditioned AC room at Hamza Plaza, Adirampattinam", caption: "AC Room" },
  { src: "/assets/rooms/room-ac-1.jpg", alt: "Comfortable air-conditioned room interior at Hamza Plaza, Adirampattinam", caption: "AC Room — Interior View" },
  { src: "/assets/rooms/deluxe-suite.jpg", alt: "Spacious family-friendly room at Hamza Plaza, Adirampattinam", caption: "Family Room" },
  { src: "/assets/rooms/bathroom.jpg", alt: "Clean attached bathroom at Hamza Plaza, Adirampattinam", caption: "Attached Bathroom" },
  { src: "/assets/rooms/lounge.jpg", alt: "Guest lounge area at Hamza Plaza, Adirampattinam", caption: "Guest Lounge" },
  { src: "/assets/hero-frontage.jpg", alt: "Hamza Plaza exterior and parking area, Adirampattinam", caption: "Exterior & Parking" },
];

const NEARBY_PLACES = [
  "Adirampattinam Bus Stand",
  "Local Restaurants",
  "Shopping Areas",
  "Mosques",
  "Nearby Beaches",
  "Pattukkottai",
  "Mallipattinam",
  "Muthupet",
];

const WHY_GUESTS_PREFER = [
  "Cool & Comfortable Rooms",
  "Friendly Hospitality",
  "High Standards of Cleanliness",
  "Affordable Pricing",
  "Free Wi-Fi",
  "Secure Parking",
  "Peaceful Environment",
  "Convenient Location",
  "Modern Facilities",
  "Easy Room Booking",
];

const FAQ_ITEMS = [
  {
    question: "Do you offer AC rooms in Adirampattinam?",
    answer: "Yes. Hamza Plaza offers clean, spacious, and fully air-conditioned rooms suitable for business travellers, families, couples, and tourists.",
  },
  {
    question: "Are the AC rooms suitable for families?",
    answer: "Yes. Our spacious air-conditioned rooms provide comfortable accommodation for families visiting Adirampattinam.",
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
    question: "How can I book an AC room?",
    answer: "You can contact Hamza Plaza directly by phone or WhatsApp for quick room booking and availability.",
  },
  {
    question: "Are the rooms cleaned daily?",
    answer: "Yes. Our housekeeping team cleans and maintains every room to ensure a hygienic and comfortable stay.",
  },
  {
    question: "Is Hamza Plaza close to the bus stand?",
    answer: "Yes. Our hotel is conveniently located with easy access to the Adirampattinam Bus Stand and other important locations.",
  },
  {
    question: "Why choose Hamza Plaza for AC rooms?",
    answer: "Guests choose Hamza Plaza for our comfortable air-conditioned rooms, modern amenities, friendly hospitality, convenient location, and affordable pricing.",
  },
];

const WA_MESSAGE = "Assalamu Alaikum, I'd like to know more about AC rooms at Hamza Plaza.";

export default function AcRoomsInAdirampattinamPage() {
  return (
    <div className="landing-page">
      <LandingHero
        eyebrow="Hamza Residency Plaza"
        title="AC Rooms in Adirampattinam – Relax in Comfort at Hamza Plaza"
        description="Clean, spacious air-conditioned rooms in Adirampattinam for business trips, family visits, and holidays. Call or WhatsApp to check availability."
        backgroundImage="/assets/rooms/room-deluxe-2.jpg"
        waMessage={WA_MESSAGE}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "AC Rooms" }]}
      />

      <HighlightStrip items={HIGHLIGHTS} />

      <ProseSection
        alt
        title="Stay Cool & Comfortable at Hamza Plaza"
        paragraphs={[
          "A comfortable stay begins with a comfortable room, especially when you're travelling during warm weather. If you're looking for AC rooms in Adirampattinam, Hamza Plaza offers clean, spacious, and well-maintained air-conditioned accommodation designed to help you relax from the moment you arrive.",
          "Whether you're visiting Adirampattinam for business, a family celebration, a holiday, or simply passing through, our air-conditioned rooms provide the perfect environment to unwind after a long day. Enjoy peaceful surroundings, modern facilities, and friendly hospitality while staying in one of the preferred accommodation choices in the town.",
          "At Hamza Plaza, comfort is more than just an amenity—it's part of every guest's experience.",
        ]}
        image="/assets/frontage-day-card.jpg"
        imageAlt="Hamza Plaza building frontage in Adirampattinam"
      />

      <ChecklistSection
        title="Why Choose Our AC Rooms?"
        intro="After a busy day of travelling or attending meetings and family functions, every guest deserves a cool and relaxing place to rest. Our air-conditioned rooms are thoughtfully designed to provide a pleasant environment throughout your stay. Guests choose our AC rooms because they offer:"
        items={WHY_AC_ROOMS}
        closing="Whether you're staying for one night or several days, you'll enjoy a refreshing and comfortable experience."
      />

      <ChecklistSection
        alt
        title="Comfortable Accommodation with Modern Facilities"
        intro="Our AC rooms are equipped with everything you need for a relaxing stay. Each room includes:"
        items={ROOM_FACILITIES}
        closing="Every room is cleaned and prepared before your arrival to ensure a pleasant stay."
      />

      <TravellerTypesSection
        title="Ideal for Every Traveller"
        intro="Our AC rooms are suitable for a wide range of guests visiting Adirampattinam."
        items={TRAVELLER_TYPES}
      />

      <RoomGallery
        alt
        eyebrow="AC Room Gallery"
        title="A Closer Look at Our AC Rooms"
        intro="Real photos of our air-conditioned rooms and facilities — cool, clean, and comfortable, right in the heart of Adirampattinam."
        images={GALLERY_IMAGES}
      />

      <RoomTypesGrid
        eyebrow="Room Options"
        title="Explore Our Rooms"
        intro="From budget-friendly single rooms to spacious 2 BHK suites — all air-conditioned and ready for your stay."
      />

      <ProseSection
        alt
        reverse
        title="Sleep Better, Wake Refreshed"
        paragraphs={[
          "A good night's sleep is essential when travelling. Our air-conditioned rooms create a comfortable environment that helps guests relax and enjoy uninterrupted rest.",
          "Comfortable beds, quiet surroundings, clean interiors, and a pleasant room temperature ensure you wake up refreshed and ready for the day ahead.",
          "Whether your stay is for business or leisure, quality sleep makes every trip more enjoyable.",
        ]}
        image="/assets/rooms/room-ac-2.jpg"
        imageAlt="Comfortable air-conditioned bedroom at Hamza Plaza"
      />

      <ProseSection
        title="Clean, Hygienic & Well-Maintained Rooms"
        paragraphs={[
          "At Hamza Plaza, cleanliness is one of our highest priorities.",
          "Every AC room is thoroughly cleaned before guest arrival. Fresh bed linen, sanitised bathrooms, clean floors, and well-maintained interiors provide a hygienic environment where guests can feel comfortable throughout their stay.",
          "Our housekeeping team works every day to maintain consistent quality across all rooms.",
        ]}
        image="/assets/rooms/bathroom.jpg"
        imageAlt="Clean attached bathroom at Hamza Plaza"
      />

      <ChipSection
        alt
        title="Convenient Location in Adirampattinam"
        intro="Hamza Plaza is conveniently located, making it easy for guests to reach important places in and around Adirampattinam. Nearby locations include:"
        items={NEARBY_PLACES}
        closing="Whether you're travelling by car or public transport, our location offers easy access to local attractions and nearby towns."
      />

      <ChecklistSection
        title="Why Guests Prefer Our AC Rooms"
        intro="Guests repeatedly choose Hamza Plaza because of the comfort and convenience we provide. Our visitors appreciate:"
        items={WHY_GUESTS_PREFER}
        closing="We are committed to making every guest feel comfortable throughout their stay."
      />

      <CtaBanner
        alt
        title="Easy AC Room Booking"
        description="Whether you're planning your visit in advance or looking for accommodation at short notice, our team is available to assist you with quick and convenient room booking. Simply contact us by phone or WhatsApp to check room availability and reserve your preferred room."
        waMessage={WA_MESSAGE}
      />

      <ProseSection
        reverse
        title="Enjoy a Relaxing Stay at Hamza Plaza"
        paragraphs={[
          "When searching for AC rooms in Adirampattinam, comfort, cleanliness, and reliable service matter most. Hamza Plaza combines all of these in one convenient location, offering guests air-conditioned accommodation that is ideal for business trips, family visits, weddings, holidays, and weekend stays.",
          "If you're looking for comfortable accommodation where you can relax after a busy day, Hamza Plaza is ready to welcome you.",
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
            <Link className="prose-link" href="/family-rooms-in-adirampattinam">
              Family Rooms
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
      />

      <ReviewsCta alt />

      <FaqSection items={FAQ_ITEMS} />

      <ClosingCta
        title="Book Your AC Room Today"
        description="Reserve your AC room in Adirampattinam and experience a stay that combines comfort, cleanliness, and warm hospitality. Contact Hamza Plaza today to check availability and enjoy modern accommodation designed to make every visit relaxing and memorable."
        waMessage={WA_MESSAGE}
      />
    </div>
  );
}
