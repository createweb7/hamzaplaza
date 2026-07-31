import type { Metadata } from "next";
import { LandingHero } from "@/components/landing/LandingHero";
import { ProseSection } from "@/components/landing/ProseSection";
import { ChecklistSection } from "@/components/landing/ChecklistSection";
import { ChipSection } from "@/components/landing/ChipSection";
import { CtaBanner } from "@/components/landing/CtaBanner";
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

const NEARBY_PLACES = [
  "Adirampattinam Bus Stand",
  "Shopping Centres",
  "Local Restaurants",
  "Mosques and Religious Places",
  "Educational Institutions",
  "Nearby Beaches",
  "Pattukkottai",
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
    question: "Which are the best Adirampattinam rooms for families?",
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
    question: "Is free Wi-Fi available?",
    answer: "Yes. Complimentary high-speed Wi-Fi is available for all guests.",
  },
  {
    question: "Is parking available?",
    answer: "Yes. Secure parking is available for guests staying at Hamza Residency Plaza.",
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
    <>
      <LandingHero
        eyebrow="Adirampattinam Rooms"
        title="Adirampattinam Rooms – Comfortable Hotel Rooms at Hamza Residency Plaza"
        description="Clean, affordable AC & Non-AC rooms in the heart of Adirampattinam — perfect for families, business travellers and wedding guests. Call or WhatsApp to check availability."
        backgroundImage="/assets/rooms/room-deluxe-2.jpg"
        waMessage={WA_MESSAGE}
      />

      <ProseSection
        title="Welcome to Hamza Residency Plaza – Your Trusted Choice for Adirampattinam Rooms"
        paragraphs={[
          "If you're searching for Adirampattinam rooms that combine comfort, cleanliness, and affordability, welcome to Hamza Residency Plaza. Conveniently located in the heart of Adirampattinam, our hotel offers modern accommodation for business travellers, families, tourists, and guests visiting for weddings, functions, or short trips.",
          "Whether you need a peaceful overnight stay or comfortable accommodation for several days, Hamza Residency Plaza provides well-maintained hotel rooms with modern amenities to ensure a relaxing experience. From the moment you arrive until your departure, our team is committed to making your stay enjoyable with friendly hospitality and quality service.",
          "For guests looking for Adirampattinam room booking, we make the process simple and convenient, helping you reserve the right room for your visit.",
        ]}
      />

      <ProseSection
        alt
        title="Comfortable Hotel Rooms Designed for Every Traveller"
        paragraphs={[
          "Every guest has different travel needs, and Hamza Residency Plaza offers accommodation that suits a variety of visitors. Whether you're travelling alone, with your family, or on a business trip, our rooms provide the comfort and convenience you expect from a quality hotel.",
          "Our Adirampattinam hotel rooms are thoughtfully designed with spacious interiors, comfortable bedding, clean bathrooms, and modern facilities that help you relax after a busy day. We focus on maintaining a peaceful environment so every guest enjoys a restful stay.",
          "Whether you're attending a family celebration, exploring nearby attractions, or visiting for work, you'll find the perfect accommodation at Hamza Residency Plaza.",
        ]}
      />

      <ChecklistSection
        title="Modern Amenities for a Pleasant Stay"
        intro="At Hamza Residency Plaza, we believe that a comfortable stay goes beyond providing a clean room. That's why every guest enjoys access to a range of modern amenities designed to make their visit more enjoyable."
        items={AMENITIES}
        closing="Every room is maintained with attention to cleanliness and comfort, ensuring guests experience quality accommodation throughout their stay."
      />

      <ProseSection
        alt
        title="Family-Friendly Accommodation in Adirampattinam"
        paragraphs={[
          "Families visiting Adirampattinam often look for spacious, comfortable, and safe accommodation. Hamza Residency Plaza is an ideal choice for families attending weddings, religious events, family gatherings, or simply spending time with loved ones.",
          "Our family-friendly rooms provide ample space for parents and children, allowing everyone to enjoy a relaxing stay. The peaceful atmosphere, helpful staff, and convenient location make Hamza Residency Plaza a preferred destination for family accommodation in Adirampattinam.",
          "If you're planning a family visit, our Adirampattinam room booking service ensures you can reserve your accommodation in advance for a hassle-free arrival.",
        ]}
      />

      <ProseSection
        title="Perfect for Business Travellers"
        paragraphs={[
          "Business visitors require accommodation that offers convenience, comfort, and reliable facilities. Hamza Residency Plaza provides a peaceful environment where professionals can relax after meetings or continue working comfortably with access to complimentary Wi-Fi.",
          "Our location allows easy access to commercial areas and nearby towns, making us a convenient choice for corporate travellers. After a productive day, guests can unwind in clean and comfortable surroundings before continuing their journey.",
        ]}
      />

      <ChipSection
        alt
        title="Excellent Location"
        intro="One of the biggest advantages of choosing Hamza Residency Plaza is our convenient location within Adirampattinam. Guests staying with us can easily access:"
        items={NEARBY_PLACES}
        closing="Whether you're visiting for business or leisure, staying at Hamza Residency Plaza makes travelling around the region simple and convenient."
      />

      <ChecklistSection
        title="Why Guests Choose Hamza Residency Plaza"
        intro="Choosing the right accommodation is important, and many guests return to Hamza Residency Plaza because of our commitment to quality and hospitality. Our guests appreciate:"
        items={WHY_CHOOSE_US}
        closing="We continually strive to provide every guest with a comfortable and memorable experience."
      />

      <ProseSection
        alt
        title="Cleanliness & Guest Comfort"
        paragraphs={[
          "Cleanliness is one of the most important aspects of a pleasant hotel stay. Our housekeeping team carefully prepares every room before guest arrival, ensuring fresh linens, sanitised bathrooms, and spotless interiors.",
          "Regular cleaning and maintenance help create a hygienic environment where guests can relax with confidence. At Hamza Residency Plaza, we are committed to maintaining high standards of cleanliness throughout the property.",
        ]}
      />

      <CtaBanner
        title="Easy Adirampattinam Room Booking"
        description="Booking your stay at Hamza Residency Plaza is quick and convenient. Contact us by phone or WhatsApp to check room availability and reserve your preferred accommodation — fast and hassle-free."
        waMessage={WA_MESSAGE}
      />

      <ProseSection
        alt
        title="Affordable Rooms Without Compromising Quality"
        paragraphs={[
          "Quality accommodation doesn't have to be expensive. Hamza Residency Plaza offers affordable hotel rooms that provide excellent value for money while maintaining high standards of comfort and service.",
          "Whether you're staying for a single night, a weekend, or a longer visit, you'll enjoy reliable hospitality and comfortable accommodation at competitive rates.",
        ]}
      />

      <ProseSection
        title="Experience the Best Stay in Adirampattinam"
        paragraphs={[
          "When searching online for Adirampattinam rooms, guests look for more than just a place to stay — they want comfort, convenience, and dependable service. Hamza Residency Plaza delivers all of this with clean hotel rooms, modern amenities, and a welcoming atmosphere.",
          "Whether you're visiting Adirampattinam for business, a family event, or a relaxing getaway, our hotel is ready to make your stay comfortable from the moment you arrive.",
        ]}
      />

      <ClosingCta
        title="Book Your Room Today"
        description="Experience why Hamza Residency Plaza is a preferred choice for visitors looking for quality accommodation in Adirampattinam."
        waMessage={WA_MESSAGE}
      />

      <FaqSection items={FAQ_ITEMS} />
    </>
  );
}
