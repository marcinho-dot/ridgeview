"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function PageHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="top" ref={ref} className="relative h-svh md:h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale, opacity: imgOpacity }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/estate-vineyard.jpg`}
          alt="Ridgeview vineyards on the South Downs — Sussex chalk soil since 1995"
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-9">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
        >
          [ Since 1995 · Ditchling Common · East Sussex ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Our <span className="text-[#C8A96E]">Story</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Three decades of producing world-class English sparkling wine on Sussex chalk —
          specialists in cool-climate viticulture and Méthode Traditionnelle. From vine to glass,
          our philosophy has stayed the same since 1995: exceptional quality, sustainably made.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Founding narrative ────────────────────────────────────────────────────
function FoundingSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <FadeUp delay={0.1}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ The Founding ]
          </p>
          <h2 className="font-display italic text-cream leading-[1.1] mb-6" style={{ fontSize: "clamp(28px, 3.4vw, 48px)", fontWeight: 400 }}>
            A Sussex estate, a long view, and <span className="text-[#C8A96E]">a leap of faith</span>
          </h2>
          <p className="font-body text-white/65 leading-[1.85] mb-5" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 400 }}>
            Ridgeview was founded in 1995 by Mike Roberts — a pioneer of English sparkling
            wine who recognised, decades before the rest of the industry caught on, that
            Sussex chalk could rival Champagne&rsquo;s greatest terroir.
          </p>
          <p className="font-body text-white/65 leading-[1.85]" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 400 }}>
            What started with the planting of traditional Champagne varieties on a single
            estate at Ditchling Common has become a benchmark in English winemaking — and
            the standard against which others are measured.
          </p>
          <div className="mt-7">
            <Link href="/mike-roberts" className="btn-cta">
              The Mike Roberts story
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-white/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/vineyard-bg.png`}
              alt="Ridgeview vineyards in spring — Ditchling Common, East Sussex"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── From Grape to Glass ──────────────────────────────────────────────────
function GrapeToGlassSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <FadeUp delay={0.2}>
          <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-white/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/heritage/chardonnay-grapes.webp`}
              alt="Hand-picked Chardonnay grapes at Ridgeview — the start of every bottle"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ From Grape to Glass ]
          </p>
          <h2 className="font-display italic text-cream leading-[1.1] mb-6" style={{ fontSize: "clamp(28px, 3.4vw, 48px)", fontWeight: 400 }}>
            Tradition meets <span className="text-[#C8A96E]">contemporary expertise</span>
          </h2>
          <p className="font-body text-white/65 leading-[1.85] mb-5" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 400 }}>
            We use only the finest, perfectly balanced grapes — handpicked in bunches and
            gently pressed. From fermentation through ageing on lees, blending and bottling,
            the winemaking team combines traditional Méthode Traditionnelle technique with
            modern, data-led understanding.
          </p>
          <p className="font-body text-white/65 leading-[1.85]" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 400 }}>
            The wines that emerge are distinctive — purity, elegance, complexity. A memorable
            moment in every glass, by design and by patience.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── A Passion for Good Business ──────────────────────────────────────────
function GoodBusinessSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ A Passion for Good Business ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.1] mb-6" style={{ fontSize: "clamp(28px, 3.6vw, 50px)", fontWeight: 400 }}>
            Purpose-driven, planet-positive — <span className="text-[#C8A96E]">a force for good</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="subline-section mx-auto mb-6">
            From the health of the planet to the customers and community around us, we strive
            to make the business a force for good. Our ambition: leading sustainable and
            ethical practice in the English wine industry, with every step of production made
            as efficient, ethical and ecologically positive as possible.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <p className="subline-section mx-auto mb-8">
            As founder members of Sustainable Wines GB, we&rsquo;re committed to continuous
            improvement — for a better Sussex, a better wine industry, and a better future.
          </p>
        </FadeUp>
        <FadeUp delay={0.45}>
          <Link href="/sustainability" className="btn-cta">
            Sustainability &amp; ethics
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Our Grape Growers ────────────────────────────────────────────────────
function GrapeGrowersSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-14">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Our Grape Growers ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 400 }}>
              Heritage vines, <span className="text-[#C8A96E]">premier partners</span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <FadeUp delay={0.25}>
            <p className="font-body text-white/65 leading-[1.85]" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 400 }}>
              Alongside hand-picked grapes from the heritage vines on our home estate in Sussex,
              we partner with premier vineyards across Southern England to source superior
              fruit from some of the greatest growers in the country.
            </p>
          </FadeUp>
          <FadeUp delay={0.35}>
            <p className="font-body text-white/65 leading-[1.85]" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 400 }}>
              Each vineyard is dedicated to its land and the grapes it grows. Diversifying our
              sources is key to the wines we produce — every site contributes a different
              character, terroir and structural note, all of which find their way into the
              final blend.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.5}>
          <blockquote
            className="font-display italic text-cream/85 leading-[1.45] mx-auto mt-14 md:mt-16 text-center relative"
            style={{ fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 400, maxWidth: "780px" }}
          >
            <span
              aria-hidden
              className="absolute -top-6 left-1/2 -translate-x-1/2 font-display italic text-[#C8A96E]/15 select-none"
              style={{ fontSize: "120px", lineHeight: 1 }}
            >
              &ldquo;
            </span>
            Diversifying our grape sources from select vineyards is key to the quality of wine
            we produce. All have very different characteristics and contribute something
            special to our English sparkling wine.
            <footer className="font-body text-[#C8A96E]/70 tracking-[0.25em] uppercase mt-6" style={{ fontSize: "11px", fontWeight: 400 }}>
              — The Ridgeview Cellar
            </footer>
          </blockquote>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Timeline ──────────────────────────────────────────────────────────────
type Milestone = { year: string; title: string; body: string };

const TIMELINE: Milestone[] = [
  { year: "1995", title: "Founded", body: "Mike Roberts establishes Ridgeview, planting the first vines at Ditchling Common, East Sussex — a bet that Sussex chalk could rival Champagne." },
  { year: "1999", title: "Underground cellars &amp; winery operational", body: "Ridgeview builds England&rsquo;s first underground wine cellars and the estate winery becomes operational." },
  { year: "2000", title: "English Wine of the Year", body: "The first bottling is released and wins English Wine of the Year — the vision starts to be vindicated by the industry." },
  { year: "2005", title: "IWSC Best International Sparkling Wine", body: "Ridgeview Bloomsbury 2002 wins the IWSC Best International Sparkling Wine trophy." },
  { year: "2006", title: "Queen Elizabeth II&rsquo;s 80th Birthday", body: "Ridgeview Blanc de Blancs 2004 served at the banquet celebrating Queen Elizabeth II&rsquo;s 80th birthday." },
  { year: "2008", title: "International export begins", body: "First export cases ship to Norway, Finland and Japan — Sussex sparkling on the world map." },
  { year: "2010", title: "Decanter Trophy · Best Global Sparkling Wine", body: "Ridgeview Blanc de Blancs 2006 wins the Decanter Trophy for Best Global Sparkling Wine — landmark recognition for English sparkling." },
  { year: "2011", title: "Mike Roberts MBE", body: "Founder Mike Roberts is awarded an MBE for services to the English wine industry." },
  { year: "2011", title: "State Banquet for President Obama", body: "Ridgeview Rosé poured at the State Banquet hosted by Queen Elizabeth II for President Obama at Buckingham Palace." },
  { year: "2012", title: "Queen&rsquo;s Diamond Jubilee Celebrations", body: "Ridgeview Bloomsbury 2009 selected as the official sparkling wine for the Queen&rsquo;s Diamond Jubilee Celebrations." },
  { year: "2014", title: "Remembering Mike Roberts MBE", body: "The estate marks the passing of founder Mike Roberts MBE — a life well lived, and a legacy carried forward." },
  { year: "2014", title: "Simon Roberts · Head Winemaker", body: "Simon Roberts moves into the role of Head Winemaker, leading Ridgeview into its next chapter." },
  { year: "2015", title: "State Banquet for President Xi Jinping", body: "Ridgeview Blanc de Blancs 2009 poured at the State Banquet hosted by Queen Elizabeth II for President Xi Jinping at Buckingham Palace." },
  { year: "2016", title: "Official sparkling of 10 Downing Street", body: "Ridgeview becomes the official English sparkling wine of 10 Downing Street." },
  { year: "2018", title: "IWSC International Winemaker of the Year", body: "Ridgeview is awarded International Winemaker of the Year by the IWSC — a first for English wine." },
  { year: "2018", title: "New identity &amp; first Ridgefest", body: "Launch of the new identity and label design — and the first Ridgefest within the grounds of the estate." },
  { year: "2020", title: "25th anniversary &amp; new winery", body: "Ridgeview celebrates 25 years with the opening of a new winery, expanding cellar capacity to one million bottles." },
  { year: "2024", title: "SWGB Gold Award · Vineyard", body: "The vineyard achieves a Gold Award from Sustainable Wines of Great Britain." },
  { year: "2025", title: "SWGB Gold Award · Winery", body: "The winery achieves a Gold Award from Sustainable Wines of Great Britain." },
];

function TimelineSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16">
        <div className="text-center mb-14 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Our Journey in Time ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              Three decades, <span className="text-[#C8A96E]">milestone by milestone</span>
            </h2>
          </FadeUp>
        </div>

        <div className="relative">
          {/* Vertical gold hairline - hidden on mobile */}
          <div
            aria-hidden
            className="hidden md:block absolute left-[120px] top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-[#C8A96E]/25 to-transparent"
          />

          <ol className="space-y-10 md:space-y-12">
            {TIMELINE.map((m, i) => (
              <FadeUp key={i} delay={0.2 + Math.min(i, 8) * 0.05}>
                {/* Hover micro: dot scales + gets a gold halo, year brightens,
                    title shifts to white, body text lightens. Subtle but
                    rewards scanning the timeline. */}
                <li className="group grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-12 relative">
                  <div className="md:text-right md:pr-2 relative">
                    <p
                      className="font-display italic text-[#C8A96E] group-hover:text-[#e0c08a] leading-none transition-colors duration-400"
                      style={{ fontSize: "clamp(32px, 3vw, 44px)", fontWeight: 400 }}
                    >
                      {m.year}
                    </p>
                    {/* Dot on the rail (desktop only) — scales with a halo on hover */}
                    <span
                      aria-hidden
                      className="hidden md:block absolute right-[-7px] top-3 w-[13px] h-[13px] rounded-full bg-[#010101] border border-[#C8A96E] group-hover:scale-125 group-hover:shadow-[0_0_0_4px_rgba(200,169,110,0.18)] transition-all duration-400 ease-out"
                    />
                  </div>
                  <div className="md:pl-2">
                    <h3
                      className="font-display italic text-cream group-hover:text-white leading-[1.18] mb-3 transition-colors duration-400"
                      style={{ fontSize: "clamp(20px, 1.85vw, 26px)", fontWeight: 400 }}
                      dangerouslySetInnerHTML={{ __html: m.title }}
                    />
                    <p
                      className="font-body text-white/55 group-hover:text-white/75 leading-[1.75] max-w-[640px] transition-colors duration-400"
                      style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 400 }}
                      dangerouslySetInnerHTML={{ __html: m.body }}
                    />
                  </div>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────
function HeritageCTA() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ The Next Chapter ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            Visit the estate. Taste the <span className="text-[#C8A96E]">story</span>.
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="subline-section mx-auto mb-10">
            The best way to understand Ridgeview is to walk the vines and pour the wine.
            Vineyard tours run year-round; the restaurant and pavilions open through spring
            and summer.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link href="/vineyard-booking" className="btn-cta">Book a tour</Link>
            <Link href="/restaurant" className="btn-cta">Reserve a table</Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function HeritagePage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><FoundingSection /></ScrollReset>
        <ScrollReset><GrapeToGlassSection /></ScrollReset>
        <ScrollReset><GoodBusinessSection /></ScrollReset>
        <ScrollReset><GrapeGrowersSection /></ScrollReset>
        <ScrollReset><TimelineSection /></ScrollReset>
        <ScrollReset><HeritageCTA /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
