import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HeritageSoilSection } from "@/components/HeritageSoilSection";
import { CategoryCardRow } from "@/components/beyond/CategoryCardRow";
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
      {/* Beyond-the-Bottle category cards — replaces the legacy
          BlogSection. 7 horizontally-scrollable cards, each linking
          to /beyond-the-bottle/#<category-slug>. */}
      <ScrollReset><CategoryCardRow /></ScrollReset>
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
