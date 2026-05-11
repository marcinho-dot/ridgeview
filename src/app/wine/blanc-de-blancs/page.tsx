"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

// ── Animation Helpers ────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: {
  children: ReactNode; delay?: number; duration?: number; className?: string;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function GoldDivider({ origin = "left" as "left" | "center" }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: "1px",
        background: "rgba(200,169,110,0.18)",
        transformOrigin: origin,
      }}
    />
  );
}

// ── Hero / Product Showcase ─────────────────────────────────────────────────

function ProductHero() {
  // min-h-[100svh] on every breakpoint — hero always fills full viewport.
  return (
    <section className="relative bg-[#010101] pt-32 md:pt-36 pb-20 md:pb-28 min-h-[100svh] overflow-hidden">
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Breadcrumb */}
        <FadeUp>
          <p className="font-body text-white/35 text-[10px] uppercase tracking-[0.3em] mb-10 md:mb-14">
            <a href={`${basePath}/`} className="hover:text-[#C8A96E] transition-colors">Home</a>
            <span className="mx-3 text-white/20">/</span>
            <a href={`${basePath}/#wine-collection`} className="hover:text-[#C8A96E] transition-colors">Shop</a>
            <span className="mx-3 text-white/20">/</span>
            <span className="text-white/55">SKU v1 · Blanc de Blancs</span>
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[45fr_55fr] gap-10 md:gap-20 items-center">
          {/* ── Bottle ─────────────────────────────────────── */}
          <FadeUp delay={0.05}>
            <div className="relative flex items-center justify-center min-h-[480px] md:min-h-[640px]">
              {/* soft halo */}
              <div
                className="absolute"
                style={{
                  width: 360,
                  height: 360,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/products/blanc-de-blancs.webp`}
                alt="Ridgeview Blanc de Blancs 2020 — English Sparkling Wine, 75cl bottle"
                style={{
                  position: "relative",
                  height: "min(72vh, 640px)",
                  width: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
                }}
              />
            </div>
          </FadeUp>

          {/* ── Info column ───────────────────────────────── */}
          <div>
            <FadeUp>
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ Limited Edition · Vintage 2020 ]
              </p>
            </FadeUp>

            <div className="overflow-hidden mb-5">
              <motion.h1
                className="font-display italic text-cream leading-[1.02]"
                style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400 }}
                initial={{ y: "102%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Blanc de <span className="text-[#C8A96E]">Blancs</span>
              </motion.h1>
            </div>

            <FadeUp delay={0.3}>
              <p
                className="font-display italic text-white/85 mb-8"
                style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 400, lineHeight: 1.35 }}
              >
                Served at King Charles&rsquo; first State Banquet
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="mb-9">
                <GoldDivider />
              </div>
            </FadeUp>

            <FadeUp delay={0.45}>
              <p
                className="font-body text-white/70 mb-10"
                style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.75, maxWidth: "540px" }}
              >
                Crafted solely from the finest Chardonnay grapes from our heritage English vineyard,
                it captures the purest expression of Ridgeview&rsquo;s Sussex terroir in one exceptional
                vintage year. Bright orchard fruit and warm honeyed apricots lead the palate, with
                hints of savoury coastal salinity unfolding. Layers of apple tarte tatin and spiced
                peaches meet a luxurious mousse and a tantalising streak of acidity, delivering
                complexity that lingers long on the finish.
              </p>
            </FadeUp>

            {/* Price + CTA row */}
            <FadeUp delay={0.55}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-2">
                <div>
                  <p className="font-body text-white/35 text-[10px] uppercase tracking-[0.25em] mb-2">
                    From
                  </p>
                  <p
                    className="font-display italic text-cream"
                    style={{ fontSize: "clamp(32px, 3.6vw, 48px)", fontWeight: 400 }}
                  >
                    £75.00
                  </p>
                  <p className="font-body text-white/45 text-[12px] mt-1">75cl bottle · 12% ABV</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="btn-cta" type="button">
                    Add to basket
                  </button>
                </div>
              </div>
              <p className="font-body text-white/40 text-[12px] mt-4 leading-relaxed" style={{ maxWidth: "440px" }}>
                Members save 20%. Complimentary gift box and personalised gift note with
                free next-working-day delivery.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Tasting Notes & Food Pairing ────────────────────────────────────────────

function TastingPairingSection() {
  const tastingNotes = ["Honey", "Orchard Fruit", "Saline Minerality"];
  const foodPairings = [
    "Oysters",
    "Lemon butter",
    "Scallops",
    "Monkfish in Lemon Butter",
    "Fried Chicken with Miso Mayo",
    "All Things Tempura",
    "Lemon Posset",
  ];

  return (
    <section className="bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Tasting Notes */}
          <div>
            <FadeUp>
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-4"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ On the Palate ]
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2
                className="font-display italic text-white leading-[1.05] mb-8"
                style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400 }}
              >
                Tasting <span className="text-[#C8A96E]">Notes</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div className="mb-8">
                <GoldDivider />
              </div>
            </FadeUp>
            <ul className="space-y-5">
              {tastingNotes.map((note, i) => (
                <FadeUp key={note} delay={0.2 + i * 0.08}>
                  <li className="flex items-baseline gap-5">
                    <span className="font-body text-white/30 text-[11px] tracking-[0.25em]">
                      0{i + 1}
                    </span>
                    <span
                      className="font-display italic text-white/90"
                      style={{ fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 400 }}
                    >
                      {note}
                    </span>
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>

          {/* Food Pairing */}
          <div>
            <FadeUp>
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-4"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ At the Table ]
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2
                className="font-display italic text-white leading-[1.05] mb-8"
                style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400 }}
              >
                Food <span className="text-[#C8A96E]">Pairing</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div className="mb-8">
                <GoldDivider />
              </div>
            </FadeUp>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {foodPairings.map((item, i) => (
                <FadeUp key={item} delay={0.2 + i * 0.05}>
                  <li className="flex items-center gap-3 font-body text-white/75 text-[14px]">
                    <span className="w-1 h-1 rounded-full bg-[#C8A96E]/55 flex-shrink-0" />
                    {item}
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Cellar Notes (Winemaker Quote) ──────────────────────────────────────────

function CellarNotesSection() {
  return (
    <section className="bg-[#010101] border-t border-white/[0.06] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[960px] mx-auto px-6 md:px-16 py-24 md:py-36 text-center">
        <FadeUp>
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-8"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            [ Cellar Notes ]
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p
            className="font-display italic text-white leading-[1.18]"
            style={{ fontSize: "clamp(26px, 3.6vw, 48px)", fontWeight: 400 }}
          >
            <span className="text-[#C8A96E]/30 mr-1" style={{ fontSize: "1.5em", lineHeight: 0 }}>&ldquo;</span>
            I think this might be my favourite vintage yet. Full of flavour and
            complexity, refined and elegant, with lots of citrus and tropical fruit
            notes. It&rsquo;s not showy &ndash; just super pure and well-balanced. A wine
            that really speaks for itself.
            <span className="text-[#C8A96E]/30 ml-1" style={{ fontSize: "1.5em", lineHeight: 0 }}>&rdquo;</span>
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <div style={{ width: 40, height: 1, background: "rgba(200,169,110,0.4)" }} />
            <p className="font-body text-white/60 text-[13px] uppercase tracking-[0.3em]">
              Head Winemaker
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Awards & Specs ──────────────────────────────────────────────────────────

function AwardsSpecsSection() {
  const awards = [
    { medal: "Gold", body: "International Wine & Spirit Competition", year: "2020" },
    { medal: "Best Global Sparkling Wine Trophy", body: "Decanter (2006 vintage)", year: "2010" },
    { medal: "Gold Medal", body: "IWSC (2015 vintage)", year: "2020" },
  ];

  const specs = [
    { label: "Grape Varieties", value: "Chardonnay" },
    { label: "Vintage", value: "2020" },
    { label: "Bottle Size", value: "75cl" },
    { label: "ABV", value: "12%" },
    { label: "Allergens", value: "Contains Sulphites" },
    { label: "Product Code", value: "R2004" },
  ];

  return (
    <section className="bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-16 md:gap-24">
          {/* Awards */}
          <div>
            <FadeUp>
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-4"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ Recognition ]
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2
                className="font-display italic text-white leading-[1.05] mb-8"
                style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400 }}
              >
                Awards &amp; <span className="text-[#C8A96E]">Accolades</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div className="mb-10">
                <GoldDivider />
              </div>
            </FadeUp>
            <ul className="space-y-7">
              {awards.map((a, i) => (
                <FadeUp key={`${a.medal}-${i}`} delay={0.2 + i * 0.08}>
                  <li className="grid grid-cols-[60px_1fr_auto] gap-4 items-baseline border-b border-white/[0.06] pb-6 last:border-0 last:pb-0">
                    <span className="font-body text-white/30 text-[11px] tracking-[0.25em]">
                      0{i + 1}
                    </span>
                    <div>
                      <p
                        className="font-display italic text-cream mb-1"
                        style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 400 }}
                      >
                        {a.medal}
                      </p>
                      <p className="font-body text-white/55 text-[13px]">{a.body}</p>
                    </div>
                    <span className="font-body text-[#C8A96E]/80 text-[11px] tracking-[0.25em]">
                      {a.year}
                    </span>
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>

          {/* Specs */}
          <div>
            <FadeUp>
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-4"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ Specifications ]
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2
                className="font-display italic text-white leading-[1.05] mb-8"
                style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400 }}
              >
                Technical <span className="text-[#C8A96E]">Detail</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div className="mb-10">
                <GoldDivider />
              </div>
            </FadeUp>
            <dl className="space-y-5">
              {specs.map((s, i) => (
                <FadeUp key={s.label} delay={0.18 + i * 0.05}>
                  <div className="grid grid-cols-[1fr_1fr] gap-6 border-b border-white/[0.05] pb-4">
                    <dt className="font-body text-white/40 text-[11px] uppercase tracking-[0.22em]">
                      {s.label}
                    </dt>
                    <dd className="font-body text-white/85 text-[14px] text-right">
                      {s.value}
                    </dd>
                  </div>
                </FadeUp>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Closing CTA ─────────────────────────────────────────────────────────────

function ClosingCTA() {
  return (
    <section className="bg-[#010101] border-t border-white/[0.06]">
      <div className="max-w-[960px] mx-auto px-6 md:px-16 py-20 md:py-28 text-center">
        <FadeUp>
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-6"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            [ Add to your collection ]
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            className="font-display italic text-cream leading-[1.05] mb-10"
            style={{ fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 400 }}
          >
            A vintage that <span className="text-[#C8A96E]">speaks</span> for itself.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" className="btn-cta">
              Add to basket · £75.00
            </button>
            <a
              href={`${basePath}/#wine-collection`}
              className="btn-cta"
            >
              Explore the Collection
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function BlancDeBlancsPage() {
  return (
    <main className="bg-[#010101]">
      <Navbar />
      <ProductHero />
      <ScrollReset><TastingPairingSection /></ScrollReset>
      <ScrollReset><CellarNotesSection /></ScrollReset>
      <ScrollReset><AwardsSpecsSection /></ScrollReset>
      <ScrollReset><ClosingCTA /></ScrollReset>
      <Footer />
      <BottomNav />
    </main>
  );
}
