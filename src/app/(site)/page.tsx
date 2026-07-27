import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AmenitiesGrid } from "@/components/home/AmenitiesGrid";
import { PhotoGallery } from "@/components/home/PhotoGallery";
import { OccasionsSection } from "@/components/home/OccasionsSection";
import { FindUsTeaser } from "@/components/home/FindUsTeaser";

const title = "Hamza Residency Plaza | ECR Road, Adhirampattinam";
const description =
  "Hamza Residency Plaza – premium daily-rental AC & Non-AC rooms on ECR Road, Adhirampattinam. Perfect for weddings, family functions & outstation stays. Call or WhatsApp to book.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    locale: "en_IN",
    images: ["/assets/hero-frontage-day.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/hero-frontage-day.jpg"],
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
