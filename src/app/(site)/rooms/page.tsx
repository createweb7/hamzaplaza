import type { Metadata } from "next";
import { RoomsHero } from "@/components/rooms/RoomsHero";
import { RoomTypeSection } from "@/components/rooms/RoomTypeSection";
import { RoomsClosing } from "@/components/rooms/RoomsClosing";
import { LightboxProvider } from "@/components/gallery/LightboxProvider";
import { ROOM_TYPES } from "@/lib/room-types";

const title = "Room Types & Details | Hamza Residency Plaza";
const description =
  "Explore all room types at Hamza Residency Plaza — Single Rooms, Kitchen-Attached Rooms, 1BHK, 2BHK Suites and Twin Bedrooms. Daily rental, AC & Non-AC. Call or WhatsApp to book.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/rooms" },
  openGraph: {
    title,
    description,
    url: "/rooms",
    type: "website",
    locale: "en_IN",
    images: ["/assets/rooms-hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/rooms-hero.jpg"],
  },
};

const allImages = ROOM_TYPES.flatMap((roomType) => roomType.images);

const roomTypesWithStartIndex = ROOM_TYPES.reduce<Array<{ roomType: (typeof ROOM_TYPES)[number]; startIndex: number }>>(
  (acc, roomType) => {
    const previous = acc[acc.length - 1];
    const startIndex = previous ? previous.startIndex + previous.roomType.images.length : 0;
    acc.push({ roomType, startIndex });
    return acc;
  },
  [],
);

export default function RoomsPage() {
  return (
    <>
      <RoomsHero />
      <LightboxProvider items={allImages}>
        {roomTypesWithStartIndex.map(({ roomType, startIndex }) => (
          <RoomTypeSection key={roomType.slug} roomType={roomType} startIndex={startIndex} />
        ))}
      </LightboxProvider>
      <RoomsClosing />
    </>
  );
}
