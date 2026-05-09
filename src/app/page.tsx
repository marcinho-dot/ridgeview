import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HeritageSoilSection } from "@/components/HeritageSoilSection";
import { BlogSection } from "@/components/BlogSection";
import { ImageRevealSection } from "@/components/ImageReveal";

import { WineCollectionSection } from "@/components/WineCollectionSection";
import { OurViewSection } from "@/components/OurViewSection";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ScrollReset><BlogSection /></ScrollReset>
      <ScrollReset><HeritageSoilSection /></ScrollReset>
      {/* ImageRevealSection is intentionally NOT wrapped in ScrollReset —
          it uses once:false so the gallery cards re-animate every time the
          section scrolls into view, regardless of direction. */}
      <ImageRevealSection />
      <ScrollReset><WineCollectionSection /></ScrollReset>
      <ScrollReset><OurViewSection /></ScrollReset>
      <Footer />
      <BottomNav />
    </main>
  );
}
