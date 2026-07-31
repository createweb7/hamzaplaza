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

const title = "Adirampattinam Rooms | Best AC & Family Hotel Rooms";
const socialTitle = `${title} | Hamza Residency Plaza`;
const description =
  "Looking for Adirampattinam rooms? Hamza Residency Plaza offers clean AC hotel rooms, family accommodation, free Wi-Fi, parking, and easy room booking at affordable prices.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/rooms-in-adirampattinam" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/rooms-in-adirampattinam",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/assets/og-rooms.jpg", width: 1200, height: 630, alt: socialTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
    images: ["/assets/og-rooms.jpg"],
  },
};

const HIGHLIGHTS = ["24×7 Reception", "Free Parking", "High-Speed Wi-Fi", "AC Rooms", "Family Friendly", "Daily Housekeeping"];

const AMENITIES = [
  "Comfortable Air-Conditioned Rooms",
  "Premium Quality Beds",
  "Clean Attached Bathrooms",
  "Hot & Cold Water",
  "Complimentary High-Speed Wi-Fi",
  "LED Television",
  "Fresh Towels",
  "Daily Housekeeping",
  "Spacious Wardrobe",
  "24-Hour Reception Assistance",
  "Power Backup",
  "Secure Car Parking",
];

const GALLERY_IMAGES = [
  { src: "/assets/rooms/room-ac-2.jpg", alt: "AC Room Adirampattinam - air-conditioned hotel room at Hamza Residency Plaza", caption: "AC Room" },
  { src: "/assets/rooms/deluxe-suite.jpg", alt: "Family Room Adirampattinam - spacious deluxe suite at Hamza Residency Plaza", caption: "Family Room" },
  { src: "/assets/rooms/kitchenette.jpg", alt: "Kitchen-attached hotel room Adirampattinam at Hamza Residency Plaza", caption: "Kitchen-Attached Room" },
  { src: "/assets/rooms/bathroom.jpg", alt: "Hotel rooms in Adirampattinam - clean attached bathroom at Hamza Residency Plaza", caption: "Attached Bathroom" },
  { src: "/assets/rooms/lounge.jpg", alt: "Hotel rooms in Adirampattinam - guest living area at Hamza Residency Plaza", caption: "Guest Living Area" },
  { src: "/assets/hero-frontage.jpg", alt: "Hamza Residency Plaza exterior and parking area, Adirampattinam", caption: "Exterior & Parking" },
];

const NEARBY_PLACES = [
  "Adirampattinam Bus Stand",
  "Adirampattinam Railway Station",
  "Local Shopping Areas",
  "Local Restaurants",
  "Mosques and Religious Places",
  "Educational Institutions",
  "Nearby Beaches",
  "Pattukkottai (approx. 12 km)",
  "Mallipattinam",
  "Muthupet",
];

const WHY_CHOOSE_US = [
  "Clean and hygienic rooms",
  "Comfortable air-conditioned accommodation",
  "Friendly and professional staff",
  "Affordable room rates",
  "Free Wi-Fi",
  "Secure parking",
  "Peaceful surroundings",
  "Convenient location",
  "Family-friendly environment",
  "Excellent customer service",
];

const FAQ_ITEMS = [
  {
    question: "Which are the best Adirampattinam Rooms for families?",
    answer:
      "Hamza Residency Plaza offers spacious and comfortable hotel rooms suitable for families, couples, and groups visiting Adirampattinam.",
  },
  {
    question: "How can I make an Adirampattinam room booking?",
    answer: "You can contact Hamza Residency Plaza directly by phone or WhatsApp to check availability and reserve your room quickly.",
  },
  {
    question: "Do you provide air-conditioned hotel rooms?",
    answer: "Yes. Hamza Residency Plaza offers clean and comfortable air-conditioned hotel rooms with modern amenities.",
  },
  {
    question: "Are Non-AC rooms also available?",
    answer: "Yes. Along with AC rooms, we also offer comfortable Non-AC room options at more budget-friendly rates.",
  },
  {
    question: "Is free Wi-Fi available?",
    answer: "Yes. Complimentary high-speed Wi-Fi is available for all guests.",
  },
  {
    question: "Is parking available?",
    answer: "Yes. Secure parking is available for guests staying at Hamza Residency Plaza.",
  },
  {
    question: "Do you have rooms suitable for business travellers?",
    answer:
      "Yes. Our peaceful rooms with Wi-Fi access make Hamza Residency Plaza a convenient choice for business travellers visiting Adirampattinam.",
  },
  {
    question: "What are the check-in and check-out timings?",
    answer:
      "Check-in and check-out timings are flexible and arranged directly with our reception based on your booking — call or WhatsApp us to confirm timing for your stay.",
  },
  {
    question: "Is early check-in possible?",
    answer:
      "Yes, subject to room availability. Let us know your expected arrival time when booking and we'll do our best to accommodate an early check-in.",
  },
  {
    question: "Why choose Hamza Residency Plaza?",
    answer:
      "Hamza Residency Plaza offers clean rooms, affordable pricing, modern amenities, friendly hospitality, and a convenient location, making it an excellent choice for visitors looking for Adirampattinam rooms.",
  },
];

const WA_MESSAGE = "Assalamu Alaikum, I'd like to know more about room availability at Hamza Residency Plaza.";

export default function RoomsInAdirampattinamPage() {
  return (
    <div className="landing-page">
      <LandingHero
        eyebrow="Hamza Residency Plaza"
        title="Adirampattinam Rooms – Comfortable AC & Family Hotel Rooms"
        description="Clean, affordable AC & Non-AC rooms in the heart of Adirampattinam — perfect for families, business travellers and wedding guests. Call or WhatsApp to check availability."
        backgroundImage="/assets/rooms/room-deluxe-2.jpg"
        waMessage={WA_MESSAGE}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Adirampattinam Rooms" }]}
      />

      <HighlightStrip items={HIGHLIGHTS} />

      <ProseSection
        title="Welcome to Hamza Residency Plaza – Your Trusted Choice for Adirampattinam Rooms"
        paragraphs={[
          "Looking for Adirampattinam Rooms? Hamza Residency Plaza offers clean and comfortable hotel rooms in Adirampattinam for families, business travellers, and tourists. Whether you need Adirampattinam room booking for a single night or an extended stay, our modern rooms, excellent hospitality, and convenient location make every visit enjoyable.",
          "Whether you need a peaceful overnight stay or comfortable accommodation for several days, Hamza Residency Plaza provides well-maintained hotel rooms with modern amenities to ensure a relaxing experience. From the moment you arrive until your departure, our team is committed to making your stay enjoyable with friendly hospitality and quality service.",
          "For guests looking for Adirampattinam room booking, we make the process simple and convenient, helping you reserve the right room for your visit.",
        ]}
        image="/assets/frontage-day-card.jpg"
        imageAlt="Hamza Residency Plaza building frontage in Adirampattinam"
      />

      <ChecklistSection
        alt
        title="Why Guests Choose Hamza Residency Plaza"
        intro="Choosing the right accommodation is important, and many guests return to Hamza Residency Plaza because of our commitment to quality and hospitality. Our guests appreciate:"
        items={WHY_CHOOSE_US}
        closing="We continually strive to provide every guest with a comfortable and memorable experience."
      />

      <ChecklistSection
        title="Modern Amenities for a Pleasant Stay"
        intro="At Hamza Residency Plaza, we believe that a comfortable stay goes beyond providing a clean room. That's why every guest enjoys access to a range of modern amenities designed to make their visit more enjoyable."
        items={AMENITIES}
        closing="Every room is maintained with attention to cleanliness and comfort, ensuring guests experience quality accommodation throughout their stay."
      />

      <RoomGallery
        alt
        eyebrow="Room Gallery"
        title="A Closer Look at Our Adirampattinam Rooms"
        intro="Real photos of our rooms and facilities — from spacious AC rooms to clean bathrooms and convenient parking, right in the heart of Adirampattinam."
        images={GALLERY_IMAGES}
      />

      <RoomTypesGrid
        eyebrow="Room Types"
        title="Explore Our Room Types"
        intro="From budget-friendly single rooms to spacious 2 BHK suites for families — find the room that matches your stay and headcount."
      />

      <ProseSection
        alt
        reverse
        title="Comfortable Hotel Rooms Designed for Every Traveller"
        paragraphs={[
          "Every guest has different travel needs, and Hamza Residency Plaza offers accommodation that suits a variety of visitors. Whether you're travelling alone, with your family, or on a business trip, our rooms provide the comfort and convenience you expect from a quality hotel.",
          "Our Adirampattinam hotel rooms are thoughtfully designed with spacious interiors, comfortable bedding, clean bathrooms, and modern facilities that help you relax after a busy day. We focus on maintaining a peaceful environment so every guest enjoys a restful stay.",
          "Whether you're attending a family celebration, exploring nearby attractions, or visiting for work, you'll find the perfect accommodation at Hamza Residency Plaza.",
        ]}
        image="/assets/rooms/room-ac-1.jpg"
        imageAlt="Spacious air-conditioned hotel room at Hamza Residency Plaza"
      />

      <ProseSection
        title="Family-Friendly Accommodation in Adirampattinam"
        paragraphs={[
          "Families visiting Adirampattinam often look for spacious, comfortable, and safe accommodation. Hamza Residency Plaza is an ideal choice for families attending weddings, religious events, family gatherings, or simply spending time with loved ones.",
          "Our family-friendly rooms provide ample space for parents and children, allowing everyone to enjoy a relaxing stay. The peaceful atmosphere, helpful staff, and convenient location make Hamza Residency Plaza a preferred destination for family accommodation in Adirampattinam.",
          "If you're planning a family visit, our Adirampattinam room booking service ensures you can reserve your accommodation in advance for a hassle-free arrival.",
        ]}
        image="/assets/rooms/deluxe-suite.jpg"
        imageAlt="Spacious deluxe suite for families at Hamza Residency Plaza"
      />

      <CtaBanner
        alt
        title="Easy Adirampattinam Room Booking"
        description="Booking your stay at Hamza Residency Plaza is quick and convenient. Contact us by phone or WhatsApp to check room availability and reserve your preferred accommodation — fast and hassle-free."
        waMessage={WA_MESSAGE}
      />

      <ProseSection
        reverse
        title="Perfect for Business Travellers"
        paragraphs={[
          "Business visitors require accommodation that offers convenience, comfort, and reliable facilities. Hamza Residency Plaza provides a peaceful environment where professionals can relax after meetings or continue working comfortably with access to complimentary Wi-Fi.",
          "Our location allows easy access to commercial areas and nearby towns, making us a convenient choice for corporate travellers. After a productive day, guests can unwind in clean and comfortable surroundings before continuing their journey.",
        ]}
        image="/assets/rooms/lounge.jpg"
        imageAlt="Comfortable lounge seating area at Hamza Residency Plaza"
      />

      <ProseSection
        alt
        title="Cleanliness & Guest Comfort"
        paragraphs={[
          "Cleanliness is one of the most important aspects of a pleasant hotel stay. Our housekeeping team carefully prepares every room before guest arrival, ensuring fresh linens, sanitised bathrooms, and spotless interiors.",
          "Regular cleaning and maintenance help create a hygienic environment where guests can relax with confidence. At Hamza Residency Plaza, we are committed to maintaining high standards of cleanliness throughout the property.",
        ]}
        image="/assets/rooms/bathroom.jpg"
        imageAlt="Clean attached bathroom at Hamza Residency Plaza"
      />

      <ProseSection
        reverse
        title="Affordable Rooms Without Compromising Quality"
        paragraphs={[
          "Quality accommodation doesn't have to be expensive. Hamza Residency Plaza offers affordable hotel rooms that provide excellent value for money while maintaining high standards of comfort and service.",
          "Whether you're staying for a single night, a weekend, or a longer visit, you'll enjoy reliable hospitality and comfortable accommodation at competitive rates.",
        ]}
        image="/assets/rooms/room-ac-3.jpg"
        imageAlt="Affordable air-conditioned hotel room at Hamza Residency Plaza"
      />

      <ProseSection
        alt
        title="Experience the Best Stay in Adirampattinam"
        paragraphs={[
          "When searching online for Adirampattinam rooms, guests look for more than just a place to stay — they want comfort, convenience, and dependable service. Hamza Residency Plaza delivers all of this with clean hotel rooms, modern amenities, and a welcoming atmosphere.",
          "Whether you're visiting Adirampattinam for business, a family event, or a relaxing getaway, our hotel is ready to make your stay comfortable from the moment you arrive.",
          <>
            Looking for something specific? Visit our{" "}
            <Link className="prose-link" href="/hotel-in-adirampattinam">
              Adirampattinam Hotel
            </Link>{" "}
            page for our full range of hospitality, our{" "}
            <Link className="prose-link" href="/lodge-in-adirampattinam">
              Adirampattinam Lodge
            </Link>{" "}
            page for budget-friendly options, or our{" "}
            <Link className="prose-link" href="/family-rooms-in-adirampattinam">
              Family Rooms
            </Link>{" "}
            page if you're travelling with relatives, or our{" "}
            <Link className="prose-link" href="/ac-rooms-in-adirampattinam">
              AC Rooms
            </Link>{" "}
            page for air-conditioned accommodation.
          </>,
        ]}
        image="/assets/hero-frontage-day.jpg"
        imageAlt="Hamza Residency Plaza hotel exterior in Adirampattinam"
      />

      <ChipSection
        title="Conveniently Located Near Popular Places"
        intro="One of the biggest advantages of choosing Hamza Residency Plaza is our convenient location within Adirampattinam. The town sits close to Pattukkottai and is home to several mosques and other local landmarks. Guests staying with us can easily access:"
        items={NEARBY_PLACES}
        closing="Whether you're visiting for business or leisure, staying at Hamza Residency Plaza makes travelling around the region simple and convenient."
      />

      <ReviewsCta alt />

      <FaqSection items={FAQ_ITEMS} />

      <ClosingCta
        title="Looking for Adirampattinam Room Booking?"
        description="Contact Hamza Residency Plaza today to reserve comfortable hotel rooms in Adirampattinam for business trips, family vacations, weddings, and weekend stays."
        waMessage={WA_MESSAGE}
      />
    </div>
  );
}
