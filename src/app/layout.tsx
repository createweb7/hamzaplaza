import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import {
  ADDRESS_COUNTRY,
  ADDRESS_LOCALITY,
  ADDRESS_POSTAL_CODE,
  ADDRESS_REGION_SHORT,
  ADDRESS_STREET,
  EMAIL,
  GEO,
  MAP_DIRECTIONS_URL,
  PRIMARY_PHONE_DISPLAY,
  SITE_NAME,
} from "@/lib/business-info";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif-override",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-override",
  display: "swap",
});

const DEFAULT_DESCRIPTION =
  "Hamza Residency Plaza – premium daily-rental AC & Non-AC rooms in Adirampattinam, on ECR Road. Perfect for weddings, family functions & outstation stays. Call or WhatsApp to book.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hamzaplaza.com"),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/assets/og-home.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/og-home.jpg"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
    shortcut: "/assets/favicon.ico",
  },
};

// Runs before hydration so a saved "light" preference applies before first
// paint — default (no attribute) is the dark theme, so there's nothing to do
// unless the user has explicitly switched to light before.
const THEME_INIT_SCRIPT = `
try {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
} catch (e) {}
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: SITE_NAME,
  url: "https://www.hamzaplaza.com",
  image: "https://www.hamzaplaza.com/assets/frontage-day-card.jpg",
  telephone: PRIMARY_PHONE_DISPLAY,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_STREET,
    addressLocality: ADDRESS_LOCALITY,
    postalCode: ADDRESS_POSTAL_CODE,
    addressRegion: ADDRESS_REGION_SHORT,
    addressCountry: ADDRESS_COUNTRY,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  hasMap: MAP_DIRECTIONS_URL,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
