"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

const EXCLUSIVE_EMAIL = "info@ridgeview.co.uk";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

function PageHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={ref} className="relative h-[70svh] md:h-[70vh] w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ opacity: imgOpacity }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/corporate-services/wine-gifts/limited-edition-collection.webp`}
          alt="Ridgeview Exclusive Range — Limited Edition collection"
          className="absolute inset-0 w-full h-full object-cover object-[center_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/80" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
        >
          [ Limited · Allocation-Released ]
        </motion.p>
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Ridgeview <span className="text-[#C8A96E]">Exclusive Range</span>
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Distinctive in style, produced in very small parcels. Limited-edition releases from our
          finest grapes, each a single-vintage expression. Historic Magnums aged over a decade in
          our underground cellars sit alongside our newest experimental wines.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Two real exclusive SKUs ──────────────────────────────────────────────
type ExclusiveSku = {
  kicker: string;
  name: string;
  body: string;
  href: string;
  image: string;
};

const EXCLUSIVES: ExclusiveSku[] = [
  {
    kicker: "[ Sparkling Red ]",
    name: "Sparkling Red Reserve",
    body: "A love-letter to England's finest Pinot grapes — highly aromatic with vanilla, cherry and forest fruits, finished by a twist of pomegranate and sweet, peppery spice.",
    href: "/wine/sparkling-red-reserve",
    // Was /images/gift-sets/sparkling-red-gift.webp — that file actually
    // contains a Blanc de Blancs 2010 bottle (misnamed), so the card
    // showed the wrong wine with jagged composite edges. Now uses the
    // correct transparent Sparkling Red Reserve product shot.
    image: "/products/sparkling-red-reserve.png",
  },
  {
    kicker: "[ Magnum · 2010 ]",
    name: "Blanc de Blancs Magnum",
    body: "Made exclusively from the estate's finest Chardonnay grapes. Aged on lees for over twelve years — rich layers of lemon blossom, honeyed orchard fruit, spiced baked apple and biscotti.",
    href: "/wine/blanc-de-blancs",
    // Was /images/press/king-charles-banquet.webp (a press still, not a
    // clean product shot). Now uses the proper transparent magnum image.
    image: "/products/blanc-de-blancs-magnum.png",
  },
];

function ExclusiveGrid() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Shop Exclusive Range ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              The <span className="text-[#C8A96E]">scarce</span> end of the cellar
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {EXCLUSIVES.map((s, i) => (
            <FadeUp key={s.name} delay={0.3 + i * 0.08}>
              <Link href={s.href} className="group block h-full bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md overflow-hidden transition-all duration-400">
                {/* Bottle stage — object-contain on a dark plate so the
                    transparent product shots show in full without cropping.
                    Was object-cover on aspect-[4/3], which cropped the
                    bottles and (combined with the wrong source images)
                    produced the jagged mid-bottle render. */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a]">
                  {/* Concentrated gold halo behind the bottle */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 55% at 50% 62%, rgba(200,169,110,0.08) 0%, transparent 65%)",
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${s.image}`}
                    alt={s.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain p-5 md:p-8 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04] [filter:drop-shadow(0_14px_24px_rgba(0,0,0,0.55))]"
                  />
                </div>
                <div className="p-7 md:p-8">
                  <p
                    className="font-display italic text-[#C8A96E] tracking-widest mb-3"
                    style={{ fontSize: "clamp(11px, 1.05vw, 13px)" }}
                  >
                    {s.kicker}
                  </p>
                  <h3
                    className="font-display italic text-cream group-hover:text-white leading-[1.15] mb-4 transition-colors duration-400"
                    style={{ fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 400 }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className="font-body text-white/65 leading-[1.75] mb-5"
                    style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 400 }}
                  >
                    {s.body}
                  </p>
                  <span
                    className="font-body text-[#C8A96E]/80 group-hover:text-[#C8A96E] uppercase tracking-[0.22em] transition-colors"
                    style={{ fontSize: "11px", fontWeight: 400 }}
                  >
                    Discover the wine →
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnquiriesCTA() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Enquiries ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400 }}>
            Allocation, archive &amp; <span className="text-[#C8A96E]">trade requests</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="subline-section mx-auto mb-10">
            For allocation enquiries, future-release waitlists, sommelier samples or wholesale of
            the exclusive range — email the team.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a href={`mailto:${EXCLUSIVE_EMAIL}?subject=Exclusive%20range%20enquiry%20%E2%80%94%20Ridgeview`} className="btn-cta">
              Email {EXCLUSIVE_EMAIL}
            </a>
            <Link href="/wine-technical-sheets" className="btn-cta">
              View technical sheets
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function ExclusiveRangePage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><ExclusiveGrid /></ScrollReset>
        <ScrollReset><EnquiriesCTA /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
