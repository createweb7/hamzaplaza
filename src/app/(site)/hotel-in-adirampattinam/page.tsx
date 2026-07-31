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

const title = "Adirampattinam Hotel | Best Hotel for Family & Business Stay";
const socialTitle = "Adirampattinam Hotel | Best Hotel for Family & Business Stay | Hamza Residency Plaza";
const description =
  "Looking for the best Adirampattinam hotel? Hamza Plaza offers comfortable hotel rooms, family accommodation, modern amenities, free Wi-Fi, secure parking, and easy room booking for every traveller.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hotel-in-adirampattinam" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/hotel-in-adirampattinam",
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

const HIGHLIGHTS = [
  "Comfortable Rooms",
  "Friendly Hospitality",
  "Free Wi-Fi",
  "Secure Parking",
  "Affordable Pricing",
  "Peaceful Atmosphere",
];

const WHY_CHOOSE_US = [
  "Comfortable and well-maintained hotel rooms",
  "Air-conditioned accommodation",
  "High-speed Wi-Fi",
  "Secure parking facilities",
  "Friendly and professional hospitality",
  "Peaceful surroundings",
  "Affordable room tariffs",
  "Easy room booking",
  "Convenient location within Adirampattinam",
];

const TRAVELLER_TYPES = [
  {
    title: "Business Travellers",
    description:
      "Business guests require reliable internet, comfortable rooms, and a peaceful environment after meetings. Our hotel provides everything needed for a productive and relaxing stay.",
  },
  {
    title: "Families",
    description:
      "Families appreciate spacious accommodation, a safe atmosphere, and convenient access to nearby attractions. Hamza Plaza offers comfortable rooms where parents and children can enjoy quality time together.",
  },
  {
    title: "Couples",
    description:
      "Couples looking for privacy and comfort will appreciate our peaceful ambience and well-maintained rooms designed for a relaxing stay.",
  },
  {
    title: "Wedding Guests",
    description:
      "Adirampattinam hosts numerous weddings and family celebrations throughout the year. Our hotel provides comfortable accommodation for guests travelling from different cities to attend these special occasions.",
  },
  {
    title: "Tourists",
    description:
      "Whether you're exploring nearby beaches, visiting relatives, or discovering local attractions, Hamza Plaza provides a comfortable base for your visit.",
  },
];

const ROOM_AMENITIES = [
  "Air Conditioning",
  "Comfortable Beds",
  "Attached Bathrooms",
  "Hot & Cold Water",
  "High-Speed Wi-Fi",
  "LED Television",
  "Fresh Linen & Towels",
  "Daily Housekeeping",
  "Wardrobe",
  "Power Backup",
  "24-Hour Reception Support",
];

const GALLERY_IMAGES = [
  { src: "/assets/rooms/kitchenette.jpg", alt: "Kitchen-attached hotel room at Hamza Plaza, Adirampattinam", caption: "Kitchen-Attached Room" },
  { src: "/assets/rooms/deluxe-suite.jpg", alt: "Family accommodation at Hamza Plaza hotel in Adirampattinam", caption: "Family Room" },
  { src: "/assets/rooms/bathroom.jpg", alt: "Clean attached bathroom at Hamza Plaza hotel in Adirampattinam", caption: "Attached Bathroom" },
  { src: "/assets/rooms/lounge.jpg", alt: "Guest lounge and living area at Hamza Plaza hotel in Adirampattinam", caption: "Guest Lounge" },
  { src: "/assets/hero-frontage.jpg", alt: "Hamza Plaza hotel exterior and parking area, Adirampattinam", caption: "Exterior & Parking" },
  { src: "/assets/rooms/room-ac-1.jpg", alt: "Air-conditioned hotel room at Hamza Plaza, Adirampattinam", caption: "AC Room" },
];

const NEARBY_PLACES = [
  "Adirampattinam Bus Stand",
  "Local Shopping Areas",
  "Restaurants & Cafés",
  "Mosques",
  "Educational Institutions",
  "Nearby Beaches",
  "Pattukkottai",
  "Mallipattinam",
  "Muthupet",
];

const RETURN_REASONS = [
  "Comfortable Accommodation",
  "Friendly Hospitality",
  "Affordable Pricing",
  "Peaceful Atmosphere",
  "Clean Rooms",
  "Convenient Location",
  "Free Wi-Fi",
  "Secure Parking",
  "Family-Friendly Environment",
  "Reliable Service",
];

const FAQ_ITEMS = [
  {
    question: "Why is Hamza Plaza one of the preferred hotels in Adirampattinam?",
    answer:
      "Hamza Plaza offers comfortable rooms, modern amenities, friendly hospitality, affordable pricing, and a convenient location suitable for business travellers, families, and tourists.",
  },
  {
    question: "Do you provide air-conditioned hotel rooms?",
    answer: "Yes. We offer well-maintained air-conditioned hotel rooms designed for a comfortable stay.",
  },
  {
    question: "How can I make a room booking?",
    answer: "You can contact Hamza Plaza directly by phone or WhatsApp to check availability and reserve your preferred room.",
  },
  {
    question: "Is parking available?",
    answer: "Yes. Secure parking is available for all hotel guests.",
  },
  {
    question: "Do you provide free Wi-Fi?",
    answer: "Yes. Complimentary high-speed Wi-Fi is available throughout the hotel.",
  },
  {
    question: "Is the hotel suitable for families?",
    answer:
      "Absolutely. Our spacious rooms, peaceful surroundings, and welcoming atmosphere make Hamza Plaza an excellent choice for families.",
  },
  {
    question: "Is Hamza Plaza suitable for business travellers?",
    answer: "Yes. Our comfortable rooms, reliable Wi-Fi, and convenient location make us a preferred choice for business visitors.",
  },
  {
    question: "Can I stay for multiple days?",
    answer: "Yes. We welcome both short-term and extended stays, depending on room availability.",
  },
  {
    question: "Is the hotel close to the bus stand?",
    answer:
      "Yes. Hamza Plaza is conveniently located with easy access to the Adirampattinam Bus Stand and other important landmarks.",
  },
  {
    question: "Why should I choose Hamza Plaza?",
    answer:
      "Because we combine comfortable accommodation, excellent hospitality, modern amenities, affordable pricing, and a convenient location to ensure every guest enjoys a memorable stay.",
  },
];

const WA_MESSAGE = "Assalamu Alaikum, I'd like to know more about staying at Hamza Plaza.";

export default function HotelInAdirampattinamPage() {
  return (
    <div className="landing-page">
      <LandingHero
        eyebrow="Hamza Residency Plaza"
        title="Adirampattinam Hotel – Experience Comfortable Hospitality at Hamza Plaza"
        description="A trusted Adirampattinam hotel offering comfortable rooms, modern amenities, and genuine hospitality for business travellers, families, and tourists. Call or WhatsApp to check availability."
        backgroundImage="/assets/rooms/room-deluxe-2.jpg"
        waMessage={WA_MESSAGE}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Adirampattinam Hotel" }]}
      />

      <HighlightStrip items={HIGHLIGHTS} />

      <ProseSection
        title="Welcome to Hamza Plaza – Your Trusted Hotel in Adirampattinam"
        paragraphs={[
          "A comfortable hotel can transform an ordinary trip into a memorable experience. Whether you're travelling to Adirampattinam for business, visiting family and friends, attending a wedding, exploring the coastal town, or simply looking for a peaceful getaway, Hamza Plaza offers everything you need for a pleasant and relaxing stay.",
          "As one of the preferred choices for guests searching for an Adirampattinam hotel, we combine comfortable accommodation, modern facilities, friendly hospitality, and a convenient location. Our aim is simple — to provide every guest with a clean, peaceful, and welcoming environment where they can relax after a busy day.",
          "From solo travellers to families and business professionals, Hamza Plaza welcomes guests with genuine care and quality service.",
        ]}
        image="/assets/frontage-day-card.jpg"
        imageAlt="Hamza Plaza hotel building frontage in Adirampattinam"
      />

      <ChecklistSection
        alt
        title="Why Choose Hamza Plaza?"
        intro="Choosing the right hotel is about more than just booking a room. Guests look for comfort, cleanliness, convenience, and a team that genuinely cares about their stay. Guests choose Hamza Plaza because we offer:"
        items={WHY_CHOOSE_US}
        closing="Every detail has been carefully planned to ensure guests enjoy a comfortable stay."
      />

      <TravellerTypesSection
        title="Designed for Every Type of Traveller"
        intro="Every visitor comes to Adirampattinam for a different reason, which is why Hamza Plaza welcomes all types of travellers."
        items={TRAVELLER_TYPES}
      />

      <ChecklistSection
        alt
        title="Comfortable Hotel Rooms That Feel Like Home"
        intro="After a long journey, every traveller deserves a room that feels welcoming. Our hotel rooms are designed to provide comfort, convenience, and relaxation for guests of all ages. Every room is thoughtfully maintained and includes modern facilities to make your stay enjoyable."
        items={ROOM_AMENITIES}
        closing="Whether you're staying for one night or several days, you'll enjoy a comfortable experience throughout your visit."
      />

      <RoomGallery
        eyebrow="Hotel Gallery"
        title="A Closer Look at Hamza Plaza"
        intro="Real photos from our hotel — comfortable rooms, clean bathrooms, a relaxing guest lounge, and secure parking, right in the heart of Adirampattinam."
        images={GALLERY_IMAGES}
      />

      <RoomTypesGrid
        alt
        eyebrow="Room Types"
        title="Explore Our Rooms"
        intro="From budget-friendly single rooms to spacious 2 BHK suites for families — find the room that matches your stay and headcount."
      />

      <ProseSection
        reverse
        title="Experience Genuine Hospitality"
        paragraphs={[
          "Hospitality is what makes a hotel memorable. At Hamza Plaza, we believe every guest deserves friendly service and personal attention.",
          "Our reception team is always ready to assist with room bookings, local information, travel guidance, and special requests whenever possible. We understand that even small gestures can make a big difference during your stay.",
          "Many of our guests return because they appreciate the welcoming atmosphere and dependable service they receive every time they visit.",
        ]}
        image="/assets/rooms/lounge.jpg"
        imageAlt="Relaxing guest lounge area at Hamza Plaza hotel"
      />

      <ChipSection
        alt
        title="Conveniently Located in Adirampattinam"
        intro="Location plays an important role when choosing a hotel. Hamza Plaza is conveniently situated, allowing guests to travel easily around Adirampattinam and nearby areas. From our hotel, guests can quickly reach:"
        items={NEARBY_PLACES}
        closing="Whether you're arriving by car or public transport, reaching Hamza Plaza is simple and convenient."
      />

      <ProseSection
        title="A Hotel That Values Cleanliness"
        paragraphs={[
          "A clean environment is essential for a comfortable stay. Every room at Hamza Plaza is carefully cleaned and prepared before guest arrival.",
          "Our housekeeping team ensures fresh bed linen, sanitised bathrooms, spotless floors, and tidy interiors, giving every guest confidence in the quality of our accommodation.",
          "Maintaining high hygiene standards remains one of our top priorities.",
        ]}
        image="/assets/rooms/bathroom.jpg"
        imageAlt="Clean attached bathroom at Hamza Plaza hotel"
      />

      <CtaBanner
        alt
        title="Easy Adirampattinam Room Booking"
        description="Our Adirampattinam room booking process is simple. Contact our team by phone or WhatsApp to check room availability, enquire about room options, and confirm your reservation."
        waMessage={WA_MESSAGE}
      />

      <ProseSection
        reverse
        title="Affordable Comfort Without Compromising Quality"
        paragraphs={[
          "Travellers often believe quality hotels are expensive. At Hamza Plaza, we prove that comfort and affordability can go together.",
          "We offer competitive room rates while maintaining excellent service, clean accommodation, and modern amenities. Whether you're visiting for a single night or an extended stay, you'll receive exceptional value for your money.",
        ]}
        image="/assets/rooms/room-ac-3.jpg"
        imageAlt="Affordable air-conditioned hotel room at Hamza Plaza"
      />

      <ChecklistSection
        alt
        title="Why Guests Return to Hamza Plaza"
        intro="Many of our guests choose Hamza Plaza every time they visit Adirampattinam because they know they can expect:"
        items={RETURN_REASONS}
        closing="Our goal is not simply to provide accommodation but to create a comfortable experience that guests remember."
      />

      <ProseSection
        title="Plan Your Stay with Confidence"
        paragraphs={[
          "Whether you're travelling for work, visiting relatives, attending a family function, or exploring Adirampattinam, Hamza Plaza offers accommodation designed around your comfort.",
          "Our combination of modern hotel rooms, thoughtful amenities, convenient location, and personalised hospitality makes us one of the preferred choices for visitors searching for an Adirampattinam hotel.",
          <>
            Looking for a specific room type? Browse our{" "}
            <Link className="prose-link" href="/rooms-in-adirampattinam">
              Adirampattinam Rooms
            </Link>{" "}
            for AC and family accommodation details, our{" "}
            <Link className="prose-link" href="/lodge-in-adirampattinam">
              Adirampattinam Lodge
            </Link>{" "}
            page for budget-friendly options, or explore our full{" "}
            <Link className="prose-link" href="/rooms">
              range of room types
            </Link>{" "}
            to find the perfect fit for your stay.
          </>,
        ]}
      />

      <ReviewsCta alt />

      <FaqSection items={FAQ_ITEMS} />

      <ClosingCta
        title="Book Your Stay at Hamza Plaza Today"
        description="If you're searching for a comfortable Adirampattinam hotel that offers modern facilities, friendly hospitality, and affordable accommodation, Hamza Plaza is ready to welcome you. Reserve your room today and experience clean hotel rooms, quality service, and a relaxing atmosphere in the heart of Adirampattinam."
        waMessage={WA_MESSAGE}
      />
    </div>
  );
}
