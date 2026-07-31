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

const title = "Budget Hotel Adirampattinam | Affordable & Comfortable Stay";
const socialTitle = "Budget Hotel Adirampattinam | Affordable & Comfortable Stay | Hamza Residency Plaza";
const description =
  "Looking for a budget hotel in Adirampattinam? Hamza Plaza offers affordable AC rooms, modern amenities, free Wi-Fi, secure parking, and comfortable accommodation at great value.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/budget-hotel-in-adirampattinam" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/budget-hotel-in-adirampattinam",
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

const HIGHLIGHTS = ["Affordable Pricing", "AC Rooms", "Free Wi-Fi", "Secure Parking", "Friendly Hospitality", "Clean Accommodation"];

const WHY_AFFORDABLE = [
  "Affordable room rates",
  "Comfortable accommodation",
  "Air-conditioned rooms",
  "Modern facilities",
  "Clean and hygienic environment",
  "Friendly hospitality",
  "Convenient location",
  "Easy room booking",
];

const ROOM_FACILITIES = [
  "Air Conditioning",
  "Comfortable Beds",
  "Attached Bathroom",
  "Hot & Cold Water",
  "High-Speed Wi-Fi",
  "LED Television",
  "Daily Housekeeping",
  "Fresh Linen & Towels",
  "Wardrobe",
  "Power Backup",
  "24-Hour Reception",
  "Secure Parking",
];

const TRAVELLER_TYPES = [
  {
    title: "Business Travellers",
    description: "Professionals visiting Adirampattinam appreciate our affordable pricing, reliable Wi-Fi, and peaceful atmosphere after a busy working day.",
  },
  {
    title: "Families",
    description: "Families enjoy spacious accommodation, modern amenities, and a safe environment without exceeding their travel budget.",
  },
  {
    title: "Wedding Guests",
    description:
      "Guests attending weddings and celebrations often require comfortable accommodation for a few days. Hamza Plaza offers affordable rooms with convenient access to important locations.",
  },
  {
    title: "Solo Travellers",
    description: "Travelling alone? Enjoy clean accommodation, friendly hospitality, and a comfortable place to relax before continuing your journey.",
  },
];

const GALLERY_IMAGES = [
  { src: "/assets/rooms/room-ac-2.jpg", alt: "Affordable air-conditioned room at Hamza Plaza budget hotel, Adirampattinam", caption: "AC Room" },
  { src: "/assets/rooms/deluxe-suite.jpg", alt: "Spacious room at Hamza Plaza budget hotel, Adirampattinam", caption: "Family Room" },
  { src: "/assets/rooms/kitchenette.jpg", alt: "Kitchen-attached room at Hamza Plaza budget hotel, Adirampattinam", caption: "Kitchen-Attached Room" },
  { src: "/assets/rooms/bathroom.jpg", alt: "Clean attached bathroom at Hamza Plaza budget hotel, Adirampattinam", caption: "Attached Bathroom" },
  { src: "/assets/rooms/lounge.jpg", alt: "Guest lounge area at Hamza Plaza budget hotel, Adirampattinam", caption: "Guest Lounge" },
  { src: "/assets/hero-frontage-day.jpg", alt: "Hamza Plaza budget hotel exterior and parking, Adirampattinam", caption: "Exterior & Parking" },
];

const NEARBY_PLACES = [
  "Adirampattinam Bus Stand",
  "Shopping Areas",
  "Restaurants & Cafés",
  "Mosques",
  "Educational Institutions",
  "Nearby Beaches",
  "Pattukkottai",
  "Mallipattinam",
  "Muthupet",
];

const WHY_GUESTS_RECOMMEND = [
  "Affordable Room Rates",
  "Comfortable Air-Conditioned Rooms",
  "Complimentary Wi-Fi",
  "Secure Parking",
  "Friendly Hospitality",
  "Clean & Hygienic Accommodation",
  "Convenient Location",
  "Peaceful Environment",
  "Modern Facilities",
  "Easy Room Booking",
];

const FAQ_ITEMS = [
  {
    question: "Why choose Hamza Plaza as a budget hotel in Adirampattinam?",
    answer:
      "Hamza Plaza offers affordable room rates, clean accommodation, modern amenities, friendly hospitality, and a convenient location, making it an excellent choice for budget-conscious travellers.",
  },
  {
    question: "Do you offer air-conditioned rooms?",
    answer: "Yes. All our rooms are equipped with air conditioning to provide a comfortable stay.",
  },
  {
    question: "Is free Wi-Fi available?",
    answer: "Yes. Complimentary high-speed Wi-Fi is available for all guests.",
  },
  {
    question: "Is parking available?",
    answer: "Yes. Secure parking is available for all hotel guests.",
  },
  {
    question: "Is Hamza Plaza suitable for families?",
    answer: "Absolutely. Families appreciate our spacious rooms, affordable pricing, and peaceful environment.",
  },
  {
    question: "Can I book my room by phone or WhatsApp?",
    answer: "Yes. You can contact us directly for quick room booking and availability.",
  },
  {
    question: "Is the hotel close to Adirampattinam Bus Stand?",
    answer: "Yes. Hamza Plaza is conveniently located with easy access to the bus stand and other important places.",
  },
  {
    question: "Why is Hamza Plaza good value for money?",
    answer:
      "Guests enjoy clean rooms, modern facilities, friendly service, and affordable pricing, making Hamza Plaza one of the preferred budget accommodation choices in Adirampattinam.",
  },
];

const WA_MESSAGE = "Assalamu Alaikum, I'd like to know more about affordable rooms at Hamza Plaza.";

export default function BudgetHotelInAdirampattinamPage() {
  return (
    <div className="landing-page">
      <LandingHero
        eyebrow="Hamza Residency Plaza"
        title="Budget Hotel Adirampattinam – Affordable Comfort at Hamza Plaza"
        description="Affordable, clean AC rooms in Adirampattinam for business trips, family visits, and short stays. Call or WhatsApp to check availability."
        backgroundImage="/assets/rooms/room-deluxe-2.jpg"
        waMessage={WA_MESSAGE}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Budget Hotel" }]}
      />

      <HighlightStrip items={HIGHLIGHTS} />

      <ProseSection
        alt
        title="Looking for a Budget Hotel in Adirampattinam?"
        paragraphs={[
          "Finding a budget hotel in Adirampattinam doesn't mean you have to compromise on comfort, cleanliness, or service. At Hamza Plaza, we believe every traveller deserves quality accommodation at an affordable price. Whether you're visiting for business, attending a family function, travelling with loved ones, or simply looking for a comfortable overnight stay, our hotel provides excellent value without sacrificing quality.",
          "Hamza Plaza is designed for guests who appreciate clean rooms, modern amenities, and friendly hospitality while staying within their travel budget. From the moment you arrive, you'll experience a welcoming atmosphere and thoughtful service that makes every stay enjoyable.",
        ]}
        image="/assets/frontage-day-card.jpg"
        imageAlt="Hamza Plaza budget hotel building frontage in Adirampattinam"
      />

      <ChecklistSection
        title="Affordable Accommodation with Quality Service"
        intro="Many travellers compare several hotels before making a booking. The ideal accommodation should provide comfort, convenience, and dependable service while remaining affordable. Hamza Plaza offers exactly that. Guests choose us because we combine:"
        items={WHY_AFFORDABLE}
        closing="Our goal is to provide excellent value for every guest, whether you're staying for one night or several days."
      />

      <ChecklistSection
        alt
        title="Comfortable Rooms That Fit Your Budget"
        intro="Budget-friendly accommodation should still offer a comfortable and relaxing experience. At Hamza Plaza, every room is designed to provide everything you need for a pleasant stay. Our rooms include:"
        items={ROOM_FACILITIES}
        closing="These facilities ensure guests enjoy comfort without paying premium prices."
      />

      <TravellerTypesSection
        title="Perfect for Every Traveller"
        intro="Hamza Plaza welcomes guests with different travel needs while offering excellent value."
        items={TRAVELLER_TYPES}
      />

      <RoomGallery
        alt
        eyebrow="Room Gallery"
        title="A Closer Look at Our Budget Hotel"
        intro="Real photos of our rooms and facilities — affordable, clean, and comfortable, right in the heart of Adirampattinam."
        images={GALLERY_IMAGES}
      />

      <RoomTypesGrid
        eyebrow="Room Options"
        title="Explore Our Rooms"
        intro="From budget-friendly single rooms to spacious 2 BHK suites — find the room that matches your stay and your budget."
      />

      <ProseSection
        alt
        reverse
        title="Excellent Value for Money"
        paragraphs={[
          "Choosing a budget hotel is about getting the best overall value rather than simply finding the lowest price.",
          "At Hamza Plaza, we focus on providing accommodation that combines comfort, cleanliness, convenience, and personalised service. Guests consistently appreciate the balance between affordability and quality that we offer.",
          "Our team works hard to ensure every visitor enjoys a comfortable stay regardless of the length of their visit.",
        ]}
        image="/assets/rooms/room-ac-2.jpg"
        imageAlt="Comfortable air-conditioned room at Hamza Plaza budget hotel"
      />

      <ProseSection
        title="Cleanliness is Our Priority"
        paragraphs={[
          "A comfortable stay begins with a clean room.",
          "Every room is carefully prepared before guest arrival with fresh bed linen, sanitised bathrooms, and well-maintained interiors. Our housekeeping team follows high standards of cleanliness to provide guests with a pleasant and hygienic environment.",
          "Whether you're staying for one night or several days, you'll always enjoy clean and comfortable accommodation.",
        ]}
        image="/assets/rooms/bathroom.jpg"
        imageAlt="Clean attached bathroom at Hamza Plaza budget hotel"
      />

      <ChipSection
        alt
        title="Convenient Location in Adirampattinam"
        intro="Hamza Plaza is conveniently located, allowing guests to reach important destinations with ease. Nearby places include:"
        items={NEARBY_PLACES}
        closing="Whether you're travelling for work or leisure, our location helps you spend less time commuting and more time enjoying your visit."
      />

      <ChecklistSection
        title="Why Guests Recommend Hamza Plaza"
        intro="Guests who stay with us appreciate the combination of affordability and comfort that Hamza Plaza provides. Reasons to choose us include:"
        items={WHY_GUESTS_RECOMMEND}
        closing="We believe every guest deserves excellent value and a memorable stay."
      />

      <CtaBanner
        alt
        title="Easy Budget Room Booking"
        description="Whether you're planning your trip in advance or need a room at short notice, our team is ready to assist you with fast and simple room booking. Contact us by phone or WhatsApp to check availability and reserve your preferred room today."
        waMessage={WA_MESSAGE}
      />

      <ProseSection
        title="Affordable Stay Without Compromise"
        paragraphs={[
          "When people search for a budget hotel in Adirampattinam, they are looking for accommodation that offers more than just a low price. They want comfort, reliability, and a pleasant experience.",
          "Hamza Plaza delivers exactly that by combining modern facilities, clean rooms, and genuine hospitality at affordable rates. Whether you're visiting for business, family events, holidays, or a short stopover, you'll find excellent value and dependable service throughout your stay.",
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
            page, our{" "}
            <Link className="prose-link" href="/ac-rooms-in-adirampattinam">
              AC Rooms
            </Link>{" "}
            page, our{" "}
            <Link className="prose-link" href="/lodge-in-adirampattinam">
              Adirampattinam Lodge
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
        title="Book Your Budget Hotel in Adirampattinam Today"
        description="If you're looking for a comfortable budget hotel in Adirampattinam, Hamza Plaza welcomes you with affordable accommodation, clean rooms, modern amenities, and friendly hospitality. Reserve your stay today and enjoy quality accommodation that offers exceptional value for money."
        waMessage={WA_MESSAGE}
      />
    </div>
  );
}
