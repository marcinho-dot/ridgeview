"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReset } from "@/components/ScrollReset";
import { TestimonialSection } from "@/components/sku/TestimonialSection";
import { AwardSection } from "@/components/sku/AwardSection";
import { StickyMobileCTA } from "@/components/sku/StickyMobileCTA";
import { getTestimonial } from "@/data/testimonials";
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
  return (
    // min-h-[100svh] ensures the hero fills the full visible viewport on mobile
    // (svh accounts for the iOS / Android URL bar — 100vh would overshoot).
    // On desktop min-h-0 disables the constraint so the natural content height drives.
    <section className="relative bg-[#010101] pt-28 md:pt-32 pb-8 md:pb-12 min-h-[100svh] md:min-h-0 overflow-hidden">
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <FadeUp>
          <p className="font-body text-white/35 text-[10px] uppercase tracking-[0.3em] mb-10 md:mb-14">
            <a href={`${basePath}/`} className="link-underline hover:text-[#C8A96E] transition-colors duration-500">Home</a>
            <span className="mx-3 text-white/20">/</span>
            <a href={`${basePath}/#wine-collection`} className="link-underline hover:text-[#C8A96E] transition-colors duration-500">Shop</a>
            <span className="mx-3 text-white/20">/</span>
            <span className="text-white/55">Bloomsbury</span>
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[58fr_42fr] gap-10 md:gap-12 items-start">
          {/* ── Info column ─────────────────────────────────
              Mobile: flex-col with explicit `order-N` so Price + CTAs
              appear in the initial viewport (right after the subtitle/awards).
              Desktop: `md:block` removes the flex container, source order
              applies → Price + CTAs land back at the end as designed. */}
          <div className="order-2 md:order-1 flex flex-col md:block">
            <FadeUp className="order-1">
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ Non Vintage · House Cuvée ]
              </p>
            </FadeUp>

            <div className="overflow-hidden mb-5 order-2">
              <motion.h1
                className="font-display italic text-cream leading-[1.02]"
                style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400 }}
                initial={{ y: "102%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[#C8A96E]">Bloomsbury</span>
              </motion.h1>
            </div>

            <FadeUp delay={0.3} className="order-3">
              <p
                className="font-display italic text-white/85 mb-3 md:mb-8"
                style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 400, lineHeight: 1.35 }}
              >
                Official wine of the Queen&rsquo;s Diamond Jubilee
              </p>
            </FadeUp>

            {/* Mobile award badges moved INTO the bottle wrapper (left-side overlay)
                so they sit next to the bottle visually and free up vertical space
                for the ATB button to land inside the initial viewport. */}

            {/* Divider — Desktop: between subtitle and description; Mobile: between
                Price/CTAs and the description block (pushed below the fold via order). */}
            <FadeUp delay={0.4} className="order-6">
              <div className="mb-6 md:mb-9">
                <GoldDivider />
              </div>
            </FadeUp>

            <FadeUp delay={0.45} className="order-7">
              <p
                className="font-body text-white/70 mb-10"
                style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.75, maxWidth: "540px" }}
              >
                Bright, fresh and fruit-driven with vibrant citrus aromas and notes of lemon zest,
                green apple and honey. Our bestselling blend epitomises the Classic Method English
                style &mdash; structured and bright, with crisp green apple and citrus layered
                with toasted almond and buttery pastry, finishing fresh and moreish with a touch
                of saline minerality.
              </p>
            </FadeUp>

            {/* Price + Award Badges row.
                Mobile: order-5 → sits BEFORE the divider/description (visible in fold).
                Desktop: source order applies → block is at the end as before. */}
            <FadeUp delay={0.55} className="order-5 mb-6 md:mb-0">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-2">
                <div>
                  <p
                    className="font-display italic text-cream"
                    style={{ fontSize: "clamp(32px, 3.6vw, 48px)", fontWeight: 400 }}
                  >
                    £34.00
                  </p>
                  <p className="font-body text-white/45 text-[12px] mt-1">75cl bottle · 12% ABV</p>
                  {/* Gift-note moved INTO the price column so on desktop the
                      `items-end` alignment puts it at the same vertical level
                      as the badge captions on the right (bottom-aligned). */}
                  <p
                    className="font-body text-white/40 text-[12px] mt-3 leading-relaxed"
                    style={{ maxWidth: "440px" }}
                  >
                    20% off for members. Add a free personalised gift note at checkout.
                  </p>
                </div>
                {/* Award Badges (Desktop only) — staged like AwardSection */}
                <div className="hidden md:flex items-end gap-7" aria-label="Awards">
                  {/* IWSC 93 Points · 2020 */}
                  <div className="flex flex-col items-center gap-2.5">
                    <motion.img
                      src={`${basePath}/images/awards/iwsc-93pts-2020.webp`}
                      alt="IWSC 93 Points — International Wine & Spirit Competition 2020"
                      title="IWSC 93 Points · 2020"
                      className="h-[clamp(104px,9vw,128px)] w-auto [filter:drop-shadow(0_10px_28px_rgba(0,0,0,0.55))] hover:[filter:drop-shadow(0_14px_36px_rgba(0,0,0,0.65))_drop-shadow(0_0_24px_rgba(200,169,110,0.18))] transition-[filter] duration-500"
                      loading="lazy"
                      initial={{ opacity: 0, scale: 0.94, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                      whileHover={{ scale: 1.04 }}
                    />
                    <p className="font-body text-white/50 text-[10px] uppercase tracking-[0.3em] whitespace-nowrap">
                      IWSC <span className="text-[#C8A96E]/70 mx-1">·</span> 2020
                    </p>
                  </div>
                  {/* Decanter Silver · 2018 */}
                  <div className="flex flex-col items-center gap-2.5">
                    <motion.img
                      src={`${basePath}/images/awards/decanter-2018-silver.webp`}
                      alt="Silver — Decanter World Wine Awards 2018"
                      title="Decanter Silver · 2018"
                      className="h-[clamp(104px,9vw,128px)] w-auto [filter:drop-shadow(0_10px_28px_rgba(0,0,0,0.55))] hover:[filter:drop-shadow(0_14px_36px_rgba(0,0,0,0.65))_drop-shadow(0_0_24px_rgba(200,169,110,0.18))] transition-[filter] duration-500"
                      loading="lazy"
                      initial={{ opacity: 0, scale: 0.94, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.74 }}
                      whileHover={{ scale: 1.04 }}
                    />
                    <p className="font-body text-white/50 text-[10px] uppercase tracking-[0.3em] whitespace-nowrap">
                      Decanter <span className="text-[#C8A96E]/70 mx-1">·</span> 2018
                    </p>
                  </div>
                </div>
              </div>
              {/* Add-to-basket CTA moved INTO the bottle wrapper (bottom-right
                  anchor). Same id="hero-mobile-cta" so the StickyMobileCTA
                  IntersectionObserver still triggers when it scrolls out. */}
            </FadeUp>
          </div>

          {/* ── Bottle + Desktop CTAs ──────────────────────── */}
          <FadeUp delay={0.05} className="order-1 md:order-2">
            <div
              className="relative h-[clamp(320px,44svh,420px)] md:h-[clamp(480px,62svh,720px)]"
              style={{ overflow: "visible" }}
            >
              {/* soft halo — absolute centered, no layout impact */}
              <div
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  width: "min(520px, 70vw)",
                  height: "min(520px, 70vw)",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(200,169,110,0.09) 0%, transparent 70%)",
                  filter: "blur(32px)",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Mobile award badges — absolute overlay, vertically stacked
                  on the left side of the bottle wrapper. Hidden on desktop
                  where the badges sit in the price row. */}
              <div className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 pointer-events-none">
                <motion.img
                  src={`${basePath}/images/awards/iwsc-93pts-2020.webp`}
                  alt="IWSC 93 Points — International Wine & Spirit Competition 2020"
                  title="IWSC 93 Points · 2020"
                  className="h-[clamp(60px,16vw,80px)] w-auto [filter:drop-shadow(0_6px_18px_rgba(0,0,0,0.55))]"
                  loading="lazy"
                  initial={{ opacity: 0, x: -8, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                />
                <motion.img
                  src={`${basePath}/images/awards/decanter-2018-silver.webp`}
                  alt="Silver — Decanter World Wine Awards 2018"
                  title="Decanter Silver · 2018"
                  className="h-[clamp(60px,16vw,80px)] w-auto [filter:drop-shadow(0_6px_18px_rgba(0,0,0,0.55))]"
                  loading="lazy"
                  initial={{ opacity: 0, x: -8, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
                />
              </div>

              {/* Bottle wrapper — absolute, doesn't dictate column height */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}/products/bloomsbury.png`}
                  alt="Ridgeview Bloomsbury NV — English Sparkling Wine, 75cl bottle"
                  className="pointer-events-auto w-auto max-w-none object-contain h-[clamp(340px,46svh,440px)] md:h-[clamp(640px,82svh,980px)] [transform:translateX(8%)_translateY(-10px)_rotate(35deg)] md:[transform:translateY(clamp(-110px,-7svh,-60px))_rotate(35deg)] hover:[transform:translateX(8%)_translateY(-10px)_rotate(35deg)_scale(1.015)] md:hover:[transform:translateY(clamp(-110px,-7svh,-60px))_rotate(35deg)_scale(1.015)] [transition:transform_900ms_cubic-bezier(0.16,1,0.3,1),filter_900ms_cubic-bezier(0.16,1,0.3,1)] hover:[filter:drop-shadow(0_40px_80px_rgba(0,0,0,0.7))_drop-shadow(0_0_60px_rgba(200,169,110,0.12))]"
                  style={{
                    transformOrigin: "center",
                    filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
                  }}
                />
              </div>

              {/* Add-to-basket CTA — anchored bottom-right next to the bottle
                  on BOTH mobile and desktop. The id is observed by
                  <StickyMobileCTA />: when this element scrolls out of view,
                  the mobile sticky bar slides up. */}
              <div
                id="hero-mobile-cta"
                className="absolute bottom-0 right-0 flex flex-wrap items-center justify-end gap-3 z-10"
              >
                <button
                  className="group font-body text-white text-[10px] uppercase tracking-[0.22em] border border-[#C8A96E]/55 hover:border-[#C8A96E] bg-[#C8A96E]/15 hover:bg-[#C8A96E]/25 active:scale-[0.97] px-6 md:px-7 py-3.5 md:py-4 rounded-sm transition-all duration-300 backdrop-blur-sm"
                  type="button"
                >
                  Add to basket
                  <span className="inline-block ml-2 transition-transform duration-400 ease-out group-hover:translate-x-1">&rarr;</span>
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ── Tasting Notes & Food Pairing ────────────────────────────────────────────

function TastingPairingSection() {
  const tastingNotes = ["Lemon Zest", "Green Apple", "Toasted Almond"];
  const foodPairings = [
    "Prosciutto di Parma",
    "Smoked Salmon & Cream Cheese Crostini",
    "Houmous & Baba Ganoush with Crudités",
    "Cornish Brie",
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
                Tasting <span className="text-[#C8A96E]">Note</span>
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
                  <li className="group flex items-baseline gap-5 cursor-default">
                    <span className="font-body text-white/30 group-hover:text-[#C8A96E]/85 text-[11px] tracking-[0.25em] transition-colors duration-500">
                      0{i + 1}
                    </span>
                    <span
                      className="font-display italic text-white/90 group-hover:text-cream group-hover:translate-x-1.5 transition-all duration-500 ease-out"
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
                  <li className="group flex items-center gap-3 font-body text-white/75 group-hover:text-white text-[14px] cursor-default transition-colors duration-400">
                    <span className="w-1 h-1 rounded-full bg-[#C8A96E]/55 group-hover:bg-[#C8A96E] group-hover:w-1.5 group-hover:h-1.5 flex-shrink-0 transition-all duration-300 ease-out" />
                    <span className="group-hover:text-white/95 transition-colors duration-400">{item}</span>
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

// ── Blend ───────────────────────────────────────────────────────────────────

function BlendSection() {
  const blend = [
    { percent: "61", grape: "Chardonnay" },
    { percent: "27", grape: "Pinot Noir" },
    { percent: "12", grape: "Pinot Meunier" },
  ];

  return (
    <section className="relative bg-[#010101] border-t border-white/[0.06] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-24 md:py-32">
        <div className="text-center mb-16 md:mb-20">
          <FadeUp>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-4"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
            >
              [ Blend ]
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              className="font-display italic text-white leading-[1.1] mb-5"
              style={{ fontSize: "clamp(30px, 4vw, 56px)", fontWeight: 400 }}
            >
              Fresh and <span className="text-[#C8A96E]">fruit-driven</span>.
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p
              className="font-body text-white/55"
              style={{ fontSize: "clamp(13px, 1.25vw, 15px)", maxWidth: "520px", margin: "0 auto" }}
            >
              Epitomising the Classic Method English style.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-0 mb-20 md:mb-24">
          {blend.map((b, i) => (
            <FadeUp key={b.grape} delay={0.28 + i * 0.1}>
              <div
                className="group text-center md:px-8 cursor-default"
                style={{
                  borderLeft: i > 0 ? "1px solid rgba(200,169,110,0.16)" : "none",
                }}
              >
                <p
                  className="font-display italic text-cream leading-none mb-4 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ fontSize: "clamp(64px, 9vw, 132px)", fontWeight: 400 }}
                >
                  <span className="text-[#C8A96E] transition-[text-shadow] duration-700 ease-out group-hover:[text-shadow:0_0_40px_rgba(200,169,110,0.45)]">{b.percent}</span>
                  <span
                    className="text-white/55 group-hover:text-white/80 transition-colors duration-700"
                    style={{ fontSize: "0.42em", verticalAlign: "super", marginLeft: "0.04em" }}
                  >
                    %
                  </span>
                </p>
                <p
                  className="font-body text-white/70 group-hover:text-cream uppercase tracking-[0.34em] transition-colors duration-500"
                  style={{ fontSize: "clamp(11px, 1.1vw, 13px)" }}
                >
                  {b.grape}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.6}>
          <div className="max-w-[820px] mx-auto text-center">
            <GoldDivider origin="center" />
            <p
              className="font-body text-white/60 mt-10 leading-[1.85]"
              style={{ fontSize: "clamp(14px, 1.35vw, 17px)", fontWeight: 300 }}
            >
              Grapes are sourced from our original estate vines, along with carefully
              selected partner vineyards across southern England &mdash; typically south-facing,
              with free-draining slopes, on varied chalk, clay, gravel and sandstone soils.
              Sites range between 10&ndash;50 metres above sea level, benefitting from a cool,
              maritime climate.
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
    { medal: "Silver", body: "Decanter World Wine Awards", year: "2018" },
    { medal: "Silver Outstanding", body: "International Wine & Spirit Competition", year: "2018" },
    { medal: "Star of England · Star Taste · Star Value", body: "Harpers Wine Star Awards", year: "2021" },
  ];

  const specs = [
    { label: "Vintage", value: "Non Vintage" },
    { label: "Bottle Size", value: "75cl" },
    { label: "ABV", value: "12%" },
    { label: "Acidity", value: "7.7 g/l" },
    { label: "Residual Sugar", value: "6.5 g/l" },
    { label: "pH", value: "3.03" },
    { label: "Lees Ageing", value: "18 months" },
    { label: "Allergens", value: "Contains Sulphites" },
    { label: "Suitable for", value: "Vegans & Vegetarians" },
    { label: "Product Code", value: "R2201" },
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
                <span className="text-[#C8A96E]">Awards</span>
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
                  <li className="group grid grid-cols-[60px_1fr_auto] gap-4 items-baseline border-b border-white/[0.06] hover:border-[#C8A96E]/30 pb-6 last:border-0 last:pb-0 cursor-default transition-colors duration-500">
                    <span className="font-body text-white/30 group-hover:text-[#C8A96E]/85 text-[11px] tracking-[0.25em] transition-colors duration-500">
                      0{i + 1}
                    </span>
                    <div className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                      <p
                        className="font-display italic text-cream mb-1"
                        style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 400 }}
                      >
                        {a.medal}
                      </p>
                      <p className="font-body text-white/55 group-hover:text-white/75 text-[13px] transition-colors duration-500">{a.body}</p>
                    </div>
                    <span className="font-body text-[#C8A96E]/80 group-hover:text-[#C8A96E] text-[11px] tracking-[0.25em] transition-colors duration-500">
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
                [ Information ]
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2
                className="font-display italic text-white leading-[1.05] mb-8"
                style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400 }}
              >
                <span className="text-[#C8A96E]">Information</span>
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
                  <div className="group grid grid-cols-[1fr_1fr] gap-6 border-b border-white/[0.05] hover:border-[#C8A96E]/30 pb-4 cursor-default transition-colors duration-500">
                    <dt className="font-body text-white/40 group-hover:text-[#C8A96E]/85 text-[11px] uppercase tracking-[0.22em] transition-colors duration-500">
                      {s.label}
                    </dt>
                    <dd className="font-body text-white/85 group-hover:text-cream text-[14px] text-right transition-colors duration-500">
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
            A true <span className="text-[#C8A96E]">celebration</span> in a bottle.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="btn-ridge group font-body text-white/85 hover:text-white text-[10px] uppercase tracking-[0.22em] border border-white/30 hover:border-[#C8A96E]/70 px-8 py-4 rounded-sm transition-all duration-300"
            >
              Add to basket · £34.00
              <span className="inline-block ml-2 transition-transform duration-400 ease-out group-hover:translate-x-1">&rarr;</span>
            </button>
            <a
              href={`${basePath}/#wine-collection`}
              className="link-underline font-body text-white/55 hover:text-[#C8A96E] text-[10px] uppercase tracking-[0.22em] border border-white/12 hover:border-[#C8A96E]/40 px-6 py-3.5 rounded-sm transition-all duration-300"
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

export default function BloomsburyPage() {
  const testimonial = getTestimonial("bloomsbury");

  return (
    <main className="bg-[#010101] pb-[80px] md:pb-0">
      <Navbar />
      <ProductHero />
      <ScrollReset><TastingPairingSection /></ScrollReset>
      <ScrollReset><BlendSection /></ScrollReset>
      {testimonial && (
        <ScrollReset><TestimonialSection testimonial={testimonial} /></ScrollReset>
      )}
      {/* PILOT — Award-Trophy-Pseudo-Testimonial.
          Soll als Alternative für SKUs ohne externe Press-Review dienen
          (Still Chardonnay, Still English Rosé). Hier in Bloomsbury als
          Pilot direkt unter dem regulären Testimonial. */}
      <ScrollReset>
        <AwardSection
          data={{
            medal: "Silver",
            body: "Decanter World Wine Awards",
            year: 2018,
            tier: "Highly Recommended",
            badgeSrc: "/images/awards/decanter-2018-silver.webp",
            description: "Recognised among the world's leading sparkling wines by the global Decanter judging panel.",
          }}
        />
      </ScrollReset>
      <ScrollReset><AwardsSpecsSection /></ScrollReset>
      <ScrollReset><ClosingCTA /></ScrollReset>
      <Footer />
      {/* Mobile sticky purchase CTA — replaces the generic BottomNav on SKU pages.
          Shown when #hero-mobile-cta scrolls out of viewport. */}
      <StickyMobileCTA
        productName="Bloomsbury NV"
        price="£34.00 · 75cl"
        thumbnailSrc="/products/bloomsbury.png"
        triggerId="hero-mobile-cta"
      />
    </main>
  );
}
