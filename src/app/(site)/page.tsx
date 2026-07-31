import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AmenitiesGrid } from "@/components/home/AmenitiesGrid";
import { PhotoGallery } from "@/components/home/PhotoGallery";
import { OccasionsSection } from "@/components/home/OccasionsSection";
import { FindUsTeaser } from "@/components/home/FindUsTeaser";

const title = "Rooms in Adirampattinam | Best Hotel";
// og:title/twitter:title aren't run through the root layout's title template
// (that only applies to the <title> tag), so they need the brand name spelled
// out explicitly to match what the <title> tag ends up as.
const socialTitle = `${title} | Hamza Residency Plaza`;
const description =
  "Looking for rooms in Adirampattinam? Hamza Residency Plaza offers clean AC & Non-AC rooms, free WiFi and secure parking for an affordable stay. Call or WhatsApp to book.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: socialTitle,
    description,
    url: "/",
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <AmenitiesGrid />
      <PhotoGallery />
      <OccasionsSection />
      <FindUsTeaser />
    </>
  );
}
