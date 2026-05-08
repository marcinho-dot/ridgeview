import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HeritageSoilSection } from "@/components/HeritageSoilSection";
import { BlogSection } from "@/components/BlogSection";
import { ImageRevealSection } from "@/components/ImageReveal";

import { WineCollectionSection } from "@/components/WineCollectionSection";
import { OurViewSection } from "@/components/OurViewSection";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BlogSection />
      <HeritageSoilSection />
      <ImageRevealSection />
      <WineCollectionSection />
      <OurViewSection />
      <Footer />
      <BottomNav />
    </main>
  );
}
