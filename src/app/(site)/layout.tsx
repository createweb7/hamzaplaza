import { GoogleAnalytics } from "@next/third-parties/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="top">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
      <GoogleAnalytics gaId="G-81F89VBCXF" />
    </>
  );
}
