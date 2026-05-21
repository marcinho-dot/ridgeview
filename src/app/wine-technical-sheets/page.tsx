"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

// ─── Wine technical sheet data ────────────────────────────────────────────
// Twelve PDFs mirrored locally from the legacy ridgeview.co.uk
// /wine-technical-sheets/ page. Categories preserved verbatim from
// the UK source's H2 structure.
type Sheet = { name: string; vintage?: string; pdf: string; slug?: string };
type Category = { kicker: string; title: string; sheets: Sheet[] };

const CATEGORIES: Category[] = [
  {
    kicker: "[ Signature Sparkling Wines ]",
    title: "Signature Sparkling Wines",
    sheets: [
      { name: "Bloomsbury", vintage: "NV", pdf: "/pdfs/tech-sheets/bloomsbury-nv.pdf", slug: "/wine/bloomsbury" },
      { name: "Cavendish", vintage: "NV", pdf: "/pdfs/tech-sheets/cavendish-nv.pdf", slug: "/wine/cavendish" },
      { name: "Fitzrovia Rosé", pdf: "/pdfs/tech-sheets/fitzrovia-rose.pdf", slug: "/wine/fitzrovia" },
    ],
  },
  {
    kicker: "[ Limited Release Vintage ]",
    title: "Limited Release Vintage Sparkling Wines",
    sheets: [
      { name: "Blanc de Blancs", vintage: "2020", pdf: "/pdfs/tech-sheets/blanc-de-blancs-2020.pdf", slug: "/wine/blanc-de-blancs" },
      { name: "Blanc de Noirs", vintage: "2016", pdf: "/pdfs/tech-sheets/blanc-de-noirs-2016.pdf", slug: "/wine/blanc-de-noirs" },
      { name: "Rosé de Noirs", vintage: "2020", pdf: "/pdfs/tech-sheets/rose-de-noirs-2020.pdf", slug: "/wine/rose-de-noirs" },
    ],
  },
  {
    kicker: "[ Limited Edition · Magnums ]",
    title: "Limited Edition Bottles and Magnums",
    sheets: [
      { name: "Blanc de Blancs Magnum", vintage: "2010", pdf: "/pdfs/tech-sheets/blanc-de-blancs-2010-magnum.pdf", slug: "/wine/blanc-de-blancs" },
      { name: "Bloomsbury Magnum", pdf: "/pdfs/tech-sheets/bloomsbury-magnum.pdf", slug: "/wine/bloomsbury" },
      { name: "Oak Reserve", pdf: "/pdfs/tech-sheets/oak-reserve.pdf", slug: "/wine/oak-reserve" },
      { name: "Sparkling Red Reserve", pdf: "/pdfs/tech-sheets/sparkling-red-reserve.pdf", slug: "/wine/sparkling-red-reserve" },
    ],
  },
  {
    kicker: "[ Still Wines ]",
    title: "Still Wines",
    sheets: [
      { name: "Still Chardonnay", vintage: "2023", pdf: "/pdfs/tech-sheets/still-chardonnay.pdf", slug: "/wine/still-chardonnay" },
      { name: "Still English Rosé", pdf: "/pdfs/tech-sheets/still-english-rose.pdf", slug: "/wine/still-english-rose" },
    ],
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────
function PageHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={ref} className="relative h-[60svh] md:h-[60vh] w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ opacity: imgOpacity }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/cellar-detail.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-black/80" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
        >
          [ For Sommeliers · Trade · Wine Enthusiasts ]
        </motion.p>
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Wine <span className="text-[#C8A96E]">Technical Sheets</span>
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          In-depth technical information on each of our wines — grape variety, vintage,
          winemaking methods, tasting notes and analysis. One PDF per wine, downloadable below.
        </motion.p>
      </motion.div>
    </section>
  );
}

function CategorySection({ category }: { category: Category }) {
  return (
    <section className="relative bg-[#010101] py-16 md:py-20 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-4" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            {category.kicker}
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-10" style={{ fontSize: "clamp(26px, 3.2vw, 42px)", fontWeight: 400 }}>
            {category.title}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {category.sheets.map((s, i) => (
            <FadeUp key={s.name + (s.vintage || '')} delay={0.25 + i * 0.04}>
              <a
                href={`${basePath}${s.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md px-5 py-5 md:px-6 md:py-6 transition-all duration-400"
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="font-display italic text-cream group-hover:text-white leading-[1.18] transition-colors duration-400"
                    style={{ fontSize: "clamp(17px, 1.5vw, 20px)", fontWeight: 400 }}
                  >
                    {s.name}
                    {s.vintage && <span className="text-[#C8A96E]/70 ml-2" style={{ fontSize: "0.75em" }}>· {s.vintage}</span>}
                  </p>
                  <p
                    className="font-body text-white/45 mt-1 uppercase tracking-[0.2em]"
                    style={{ fontSize: "10.5px", fontWeight: 400 }}
                  >
                    Technical Notes · PDF
                  </p>
                </div>
                <span
                  className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-sm border border-white/15 group-hover:border-[#C8A96E]/50 text-white/60 group-hover:text-[#C8A96E] transition-all duration-300"
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </span>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function TradeCTA() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Trade · Sommeliers · Wholesale ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400 }}>
            Need more <span className="text-[#C8A96E]">depth</span>?
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="subline-section mx-auto mb-10">
            For wholesale enquiries, allocation requests, vintage availability or sommelier
            sample sets — email the team.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <a href="mailto:info@ridgeview.co.uk?subject=Trade%20enquiry%20%E2%80%94%20Ridgeview" className="btn-cta">
            Email info@ridgeview.co.uk
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

export default function WineTechSheetsPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        {CATEGORIES.map((cat) => (
          <ScrollReset key={cat.title}>
            <CategorySection category={cat} />
          </ScrollReset>
        ))}
        <ScrollReset><TradeCTA /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
