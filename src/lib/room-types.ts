export type RoomTypeImage = { src: string; alt: string; caption: string };

export type RoomType = {
  slug: string;
  jumpLabel: string;
  tag: string;
  name: string;
  nameSub?: string;
  tagline: string;
  description: string;
  features: string[];
  images: RoomTypeImage[];
  waMessage: string;
  altBackground?: boolean;
  reverse?: boolean;
};

export const ROOM_TYPES: RoomType[] = [
  {
    slug: "single-room",
    jumpLabel: "Single Room",
    tag: "Room Type 01",
    name: "Single Room",
    tagline: "Cozy & budget-friendly",
    description:
      "A comfortable single-occupancy room, perfect for solo travellers or a short overnight stop on ECR Road. Simple, clean and quiet — with everything you need for a restful stay.",
    features: [
      "AC & Non-AC options",
      "Attached bathroom",
      "Wardrobe & curtains",
      "Free Wi-Fi",
      "24-hour power & water",
      "Daily-rental basis",
    ],
    images: [
      { src: "/assets/room-types/single-room/bed.jpg", alt: "Single room with bed and wardrobe", caption: "Single Room — Bed & Wardrobe" },
      { src: "/assets/room-types/single-room/bath.jpg", alt: "Single room attached bathroom", caption: "Single Room — Attached Bathroom" },
      { src: "/assets/room-types/single-room/bed2.jpg", alt: "Second single room bed", caption: "Single Room — Alternate Unit" },
      { src: "/assets/room-types/single-room/door.jpg", alt: "Single room entrance door", caption: "Single Room — Entrance" },
    ],
    waMessage: "Assalamu Alaikum, I'd like to check availability for a Single Room.",
  },
  {
    slug: "kitchen-room",
    jumpLabel: "Kitchen-Attached",
    tag: "Room Type 02",
    name: "Kitchen-Attached Room",
    tagline: "Your own kitchenette",
    description:
      "A private room with an attached kitchen space — ideal if you'd like to cook your own meals during a longer stay, without giving up the privacy of your own room.",
    features: [
      "Attached kitchenette",
      "Attached bathroom",
      "AC available",
      "Free Wi-Fi",
      "Ample storage space",
      "Great for extended stays",
    ],
    images: [
      { src: "/assets/room-types/kitchen-room/bed.jpg", alt: "Kitchen-attached room bed", caption: "Kitchen-Attached Room — Bed" },
      { src: "/assets/room-types/kitchen-room/kitchen.jpg", alt: "Attached kitchenette with counter and sink", caption: "Kitchen-Attached Room — Kitchenette" },
      { src: "/assets/room-types/kitchen-room/bath.jpg", alt: "Kitchen-attached room bathroom", caption: "Kitchen-Attached Room — Bathroom" },
      { src: "/assets/room-types/kitchen-room/door.jpg", alt: "Kitchen-attached room entrance door", caption: "Kitchen-Attached Room — Entrance" },
    ],
    waMessage: "Assalamu Alaikum, I'd like to check availability for a Kitchen-Attached Room.",
    altBackground: true,
    reverse: true,
  },
  {
    slug: "1bhk-room",
    jumpLabel: "1 BHK Room",
    tag: "Room Type 03",
    name: "1 BHK Room",
    tagline: "Bedroom + living space",
    description:
      "A self-contained one-bedroom set-up with its own sitting area — comfortable for small families, couples or anyone who'd like a little extra room to relax.",
    features: ["Separate bedroom & living area", "Sofa seating", "AC available", "Attached bathroom", "Free Wi-Fi", "Daily-rental basis"],
    images: [
      { src: "/assets/room-types/1bhk-room/bed.jpg", alt: "1BHK room bedroom", caption: "1 BHK Room — Bedroom" },
      { src: "/assets/room-types/1bhk-room/living.jpg", alt: "1BHK room living area with sofa", caption: "1 BHK Room — Living Area" },
      { src: "/assets/room-types/1bhk-room/bath.jpg", alt: "1BHK room bathroom", caption: "1 BHK Room — Bathroom" },
      { src: "/assets/room-types/1bhk-room/door.jpg", alt: "1BHK room entrance door", caption: "1 BHK Room — Entrance" },
    ],
    waMessage: "Assalamu Alaikum, I'd like to check availability for a 1 BHK Room.",
  },
  {
    slug: "suite-2bhk",
    jumpLabel: "2 BHK Suite",
    tag: "Room Type 04",
    name: "2 BHK Suite Room",
    tagline: "Our most spacious option",
    description:
      "Two private bedrooms sharing a common living area — perfect for families or groups travelling together who'd like their own space while staying under one roof.",
    features: ["2 private bedrooms", "Shared living area", "AC in both bedrooms", "Attached bathroom(s)", "Ideal for families & groups", "Free Wi-Fi"],
    images: [
      { src: "/assets/room-types/suite-2bhk/bed1.jpg", alt: "2BHK suite first bedroom", caption: "2 BHK Suite — Bedroom One" },
      { src: "/assets/room-types/suite-2bhk/bed2.jpg", alt: "2BHK suite second bedroom", caption: "2 BHK Suite — Bedroom Two" },
      { src: "/assets/room-types/suite-2bhk/living.jpg", alt: "2BHK suite shared living area with sofa", caption: "2 BHK Suite — Living Area" },
      { src: "/assets/room-types/suite-2bhk/door.jpg", alt: "2BHK suite entrance doors", caption: "2 BHK Suite — Entrance" },
    ],
    waMessage: "Assalamu Alaikum, I'd like to check availability for the 2 BHK Suite Room.",
    altBackground: true,
    reverse: true,
  },
  {
    slug: "twin-bedroom",
    jumpLabel: "Twin Bedroom",
    tag: "Room Type 05",
    name: "Twin Bedroom",
    nameSub: "— Three Types",
    tagline: "Multiple configurations available",
    description:
      "Available in three different room configurations to suit your group size and budget. Let us know your headcount when you call or WhatsApp, and we'll point you to the best fit.",
    features: ["Three configurations to choose from", "AC & Non-AC options", "Attached bathroom", "Free Wi-Fi", "Flexible for groups", "Daily-rental basis"],
    images: [
      { src: "/assets/room-types/twin-bedroom/bed1.jpg", alt: "Twin bedroom type A", caption: "Twin Bedroom — Type A" },
      { src: "/assets/room-types/twin-bedroom/bed2.jpg", alt: "Twin bedroom type B", caption: "Twin Bedroom — Type B" },
      { src: "/assets/room-types/twin-bedroom/door.jpg", alt: "Twin bedroom entrance door", caption: "Twin Bedroom — Entrance A" },
      { src: "/assets/room-types/twin-bedroom/door2.jpg", alt: "Second twin bedroom entrance door", caption: "Twin Bedroom — Entrance B" },
    ],
    waMessage: "Assalamu Alaikum, I'd like to check availability for a Twin Bedroom.",
  },
];
