"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReset } from "@/components/ScrollReset";
import { TestimonialSection } from "@/components/sku/TestimonialSection";
import { AwardSection } from "@/components/sku/AwardSection";
import { StickyMobileCTA } from "@/components/sku/StickyMobileCTA";
import { PurchaseWidget, type Variant } from "@/components/sku/PurchaseWidget";
import { BehindTheBottleSection } from "@/components/sku/BehindTheBottleSection";
import { WineClubUpsellSection } from "@/components/sku/WineClubUpsellSection";
import { RelatedWinesSection } from "@/components/sku/RelatedWinesSection";
import { FAQSection } from "@/components/sku/FAQSection";
import { getTestimonial } from "@/data/testimonials";
import { basePath } from "@/lib/basePath";

// Oak Reserve variants — synced 2026-05-12 with ridgeview.co.uk.
// Limited Edition NV, late-disgorged oak-barrel-fermented 100%
// Chardonnay from a trio of vintages (2015 / 2016 / 2017). Case of 6
// sold separately (£510 list / £459 with 10% off). Single SKU R1723.
// **NOTE:** Both 75cl and Case were explicitly flagged "Out of stock"
// on ridgeview.co.uk at sync time. Variants stay listed (Limited
// Release inherently has long OOS windows; better UX to show the
// wine + style + cellar story than to hide the SKU entirely).
const OAK_RESERVE_VARIANTS: Variant[] = [
  { label: "75cl Bottle", detail: "75cl · 12% ABV · Limited Edition", price: 85 },
  { label: "Case of 6", detail: "6 × 75cl · Save 10%", price: 459, badge: "Best value" },
];

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
  // Parallax: bottle drifts upward 80px as the hero scrolls out of view.
  // Subtle premium effect — Apple product pages use this exact pattern.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    // Section sizes to its natural content height (no min-h constraint).
    // Goal "alles fits in einen viewport und adapts" — by dropping
    // min-h-[100svh] the hero never pads itself with empty space on
    // tall monitors, and the next section follows immediately. Atmospheric
    // weight is carried by the typography, the oversized bottle (90svh)
    // and the gold accents, not by a forced viewport height. Tuned
    // 2026-05-12.
    <section ref={heroRef} className="relative bg-[#010101] pt-28 md:pt-24 pb-8 md:pb-12 overflow-hidden">
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
          <p className="font-body text-white/35 text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-6">
            <a href={`${basePath}/`} className="link-underline hover:text-[#C8A96E] transition-colors duration-500">Home</a>
            <span className="mx-3 text-white/20">/</span>
            <a href={`${basePath}/#wine-collection`} className="link-underline hover:text-[#C8A96E] transition-colors duration-500">Shop</a>
            <span className="mx-3 text-white/20">/</span>
            <span className="text-white/55">Oak Reserve</span>
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[58fr_42fr] gap-3 md:gap-12 items-start">
          {/* ── Info column ─────────────────────────────────
              Mobile: flex-col with explicit `order-N` so Price + CTAs
              appear in the initial viewport (right after the subtitle/awards).
              Desktop: `md:block` removes the flex container, source order
              applies → Price + CTAs land back at the end as designed. */}
          <div className="order-2 md:order-1 flex flex-col md:block">
            <FadeUp className="order-1">
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-2 md:mb-5"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ Limited Edition · Oak-Fermented Chardonnay ]
              </p>
            </FadeUp>

            <div className="overflow-hidden mb-2 md:mb-5 order-2">
              <motion.h1
                className="font-display italic text-cream leading-[1.02]"
                style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400 }}
                initial={{ y: "102%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[#C8A96E]">Oak Reserve</span>
              </motion.h1>
            </div>

            <FadeUp delay={0.3} className="order-3">
              <p
                className="font-display italic text-white/85 mb-3 md:mb-5"
                style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 400, lineHeight: 1.35 }}
              >
                Late-disgorged · oak-barrel fermented
              </p>
            </FadeUp>

            {/* Mobile award badges moved INTO the bottle wrapper (left-side overlay)
                so they sit next to the bottle visually and free up vertical space
                for the ATB button to land inside the initial viewport. */}

            {/* Divider — Desktop: between subtitle and description; Mobile: between
                Price/CTAs and the description block (pushed below the fold via order). */}
            <FadeUp delay={0.4} className="order-6">
              <div className="mb-3 md:mb-5">
                <GoldDivider />
              </div>
            </FadeUp>

            <FadeUp delay={0.45} className="order-7">
              <p
                className="font-body text-white/70 mb-4 md:mb-6"
                style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.75, maxWidth: "540px" }}
              >
                A rare special cuvée celebrating our quarter-century &mdash;
                100% Chardonnay from the original 1995 plantings, drawn from
                a trio of consecutive vintages (2015, 2016, 2017) and matured
                in a mix of aged and new oak. The nose carries candied citrus
                peel and caramelised butter; the palate unfolds with vanilla,
                mace and spiced fruit over a smoky, complex finish. Late-
                disgorged, in tiny quantity.
              </p>
            </FadeUp>

            {/* Purchase Widget + Award Badges row.
                Mobile: order-5 → sits BEFORE the divider/description (visible in fold).
                Desktop: source order applies → block is at the end as before. */}
            <FadeUp delay={0.55} className="order-5 mb-6 md:mb-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
                {/* Stateful purchase block — variant + qty + free-shipping bar + ATB */}
                <div className="flex-1 max-w-[480px]">
                  <PurchaseWidget
                    variants={OAK_RESERVE_VARIANTS}
                    freeShippingThreshold={45}
                    ctaId="hero-mobile-cta"
                  />
                </div>

                {/* Award Badges (Desktop only) — top-aligned next to widget */}
                <div className="hidden md:flex items-start gap-6 pt-1" aria-label="Awards">
                  {/* Decanter Silver · 2022 */}
                  <div className="flex flex-col items-center gap-2.5">
                    <motion.img
                      src={`${basePath}/images/awards/decanter-2018-silver.webp`}
                      alt="Silver — Decanter World Wine Awards 2022"
                      title="Decanter Silver · 2022"
                      className="h-[clamp(86px,7.5vw,108px)] w-auto [filter:drop-shadow(0_10px_28px_rgba(0,0,0,0.55))] hover:[filter:drop-shadow(0_14px_36px_rgba(0,0,0,0.65))_drop-shadow(0_0_24px_rgba(200,169,110,0.18))] transition-[filter] duration-500"
                      loading="lazy"
                      initial={{ opacity: 0, scale: 0.94, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                      whileHover={{ scale: 1.04 }}
                    />
                    {/* NOTE: Re-using decanter-2018-silver.webp as a stand-in
                        for the 2022 Silver — visually identical Silver tier,
                        just earlier year. Swap to a 2022-dated badge when
                        Ridgeview provides one. */}
                    <p className="font-body text-white/50 text-[10px] uppercase tracking-[0.3em] whitespace-nowrap">
                      Decanter <span className="text-[#C8A96E]/70 mx-1">·</span> 2022
                    </p>
                  </div>
                  {/* "25-Year Anniversary Release" typographic accolade —
                      authentic descriptor (Oak Reserve was crafted to mark
                      Ridgeview's quarter-century in 2020), not a fabricated
                      second medal. */}
                  <div className="flex flex-col items-center justify-center gap-2.5 h-[clamp(86px,7.5vw,108px)] px-4 border border-[#C8A96E]/35 rounded-md backdrop-blur-md bg-[#C8A96E]/[0.04]">
                    <p className="font-display italic text-cream text-[clamp(13px,1.1vw,15px)] leading-none whitespace-nowrap">
                      25-Year Cuvée
                    </p>
                    <p className="font-body text-white/55 text-[9px] uppercase tracking-[0.22em] whitespace-nowrap">
                      Late Disgorged <span className="text-[#C8A96E]/70 mx-1">·</span> 1995–2020
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ── Bottle + Desktop CTAs ──────────────────────── */}
          {/* md:mt-20 drops the bottle column ~80px on desktop so the
              foil cap sits around the H1 title baseline (instead of
              crowding the breadcrumb/navbar). Info column stays tight
              against the breadcrumb — the offset only applies to the
              bottle so the two columns get an editorial "stagger".
              Mobile keeps the bottle at the top of the stack (no mt). */}
          <FadeUp delay={0.05} className="order-1 md:order-2 md:mt-20">
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
                  on the left side of the bottle wrapper. Each badge has
                  a micro-caption (year only) underneath. Anchored 30px
                  higher than the bottle midpoint so it sits in the upper
                  half of the wrapper, where the eye lands first. */}
              <div className="md:hidden absolute left-0 top-[calc(50%-30px)] -translate-y-1/2 flex flex-col gap-4 z-10 pointer-events-none">
                <div className="flex flex-col items-center gap-1.5">
                  <motion.img
                    src={`${basePath}/images/awards/decanter-2018-silver.webp`}
                    alt="Silver — Decanter World Wine Awards 2022"
                    title="Decanter Silver · 2022"
                    className="h-[clamp(60px,16vw,80px)] w-auto [filter:drop-shadow(0_6px_18px_rgba(0,0,0,0.55))]"
                    loading="lazy"
                    initial={{ opacity: 0, x: -8, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  />
                  <p className="font-body text-white/45 text-[8px] uppercase tracking-[0.28em] whitespace-nowrap">
                    2022
                  </p>
                </div>
                {/* 25-Year Cuvée · typographic */}
                <div className="flex flex-col items-center justify-center gap-1 h-[clamp(60px,16vw,80px)] px-2.5 border border-[#C8A96E]/35 rounded-md backdrop-blur-md bg-[#C8A96E]/[0.04]">
                  <p className="font-display italic text-cream text-[10px] leading-none">
                    25 Years
                  </p>
                  <p className="font-body text-white/55 text-[7px] uppercase tracking-[0.2em] whitespace-nowrap">
                    1995–2020
                  </p>
                </div>
              </div>

              {/* Bottle wrapper — absolute, doesn't dictate column height.
                  Wrapped in motion.div so the bottle drifts upward via the
                  scroll-driven parallax (subtle 80px range). */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ y: bottleY }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}/products/oak-reserve.png`}
                  alt="Ridgeview Oak Reserve — Late-Disgorged oak-fermented 100% Chardonnay, 75cl bottle"
                  className="pointer-events-auto w-auto max-w-none object-contain h-[clamp(376px,51svh,484px)] md:h-[clamp(704px,90svh,1078px)] [transform:translateX(8%)_translateY(-30px)_rotate(28deg)] md:[transform:translateY(clamp(-110px,-7svh,-60px))_rotate(35deg)] hover:[transform:translateX(8%)_translateY(-30px)_rotate(28deg)_scale(1.015)] md:hover:[transform:translateY(clamp(-110px,-7svh,-60px))_rotate(35deg)_scale(1.015)] [transition:transform_900ms_cubic-bezier(0.16,1,0.3,1),filter_900ms_cubic-bezier(0.16,1,0.3,1)] hover:[filter:drop-shadow(0_40px_80px_rgba(0,0,0,0.7))_drop-shadow(0_0_60px_rgba(200,169,110,0.12))]"
                  style={{
                    transformOrigin: "center",
                    filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
                  }}
                />
              </motion.div>

              {/* Quick "Add to basket" — anchored bottom-right next to the bottle
                  on every breakpoint. Marked with data-atb-trigger so the
                  StickyMobileCTA only appears when this AND every other ATB
                  on the page is out of view. The widget ATB in the info
                  column has the dynamic price (variant × quantity); this
                  one is the quick-action visual anchor. */}
              <div className="absolute bottom-2 md:bottom-[40px] right-0 z-10">
                <button
                  data-atb-trigger
                  type="button"
                  className="btn-cta"
                >
                  Add to basket
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
  const tastingNotes = ["Vanilla Oak & Caramelised Butter", "Candied Citrus & Mace", "Toasted Brioche"];
  const foodPairings = [
    "Butter-Basted Roast Chicken",
    "Poached Lobster",
    "Truffle Risotto",
    "Braised Fennel & Onion Gratin",
    "Caramelised Tarte Tatin",
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

// ── Varietal (100% oak-fermented Chardonnay) ──────────────────────────────

function BlendSection() {
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
        <div className="text-center mb-12 md:mb-16">
          <FadeUp>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-4"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
            >
              [ Composition ]
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              className="font-display italic text-white leading-[1.1] mb-5"
              style={{ fontSize: "clamp(30px, 4vw, 56px)", fontWeight: 400 }}
            >
              One grape, <span className="text-[#C8A96E]">three vintages</span>.
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p
              className="font-body text-white/55"
              style={{ fontSize: "clamp(13px, 1.25vw, 15px)", maxWidth: "520px", margin: "0 auto" }}
            >
              Pure Chardonnay from 1995&rsquo;s first plantings, fermented
              in oak and matured across three vintages.
            </p>
          </FadeUp>
        </div>

        {/* Three-grape stack — typographic blend display
            (no specific % numbers on the live shop; the proportions
            are blended each year and not publicly disclosed). */}
        <div className="flex flex-col items-center gap-6 md:gap-8 mb-20 md:mb-24">
          {[
            { grape: "Chardonnay",     role: "Oak-fermented · 100% · 1995 plantings" },
          ].map((g, i) => (
            <FadeUp key={g.grape} delay={0.28 + i * 0.12}>
              <div className="group text-center cursor-default px-8">
                <p
                  className="font-display italic text-cream leading-none mb-2 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ fontSize: "clamp(40px, 6vw, 88px)", fontWeight: 400 }}
                >
                  <span className="text-[#C8A96E] transition-[text-shadow] duration-700 ease-out group-hover:[text-shadow:0_0_40px_rgba(200,169,110,0.45)]">
                    {g.grape}
                  </span>
                </p>
                <p
                  className="font-body text-white/55 group-hover:text-cream uppercase tracking-[0.32em] transition-colors duration-500"
                  style={{ fontSize: "clamp(11px, 1.1vw, 13px)" }}
                >
                  {g.role}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.7}>
          <div className="max-w-[920px] mx-auto text-center">
            <GoldDivider origin="center" />
            <p
              className="font-body text-white/60 mt-10 leading-[1.85]"
              style={{
                fontSize: "clamp(14px, 1.35vw, 17px)",
                fontWeight: 300,
                textWrap: "balance",
              }}
            >
              A celebration of our quarter-century &mdash; Chardonnay
              hand-picked from the very first vines planted on the
              Ditchling Common estate in 1995, fermented in a mix of
              aged and new oak barrels and blended across three
              consecutive vintages (2015, 2016, 2017). Late-disgorged
              after extended lees ageing, the cuvée carries the
              brioche-rich depth of Sussex chalk with the spiced-vanilla
              warmth of barrel fermentation. Decanter Silver 2022.
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
    { medal: "Silver", body: "Decanter World Wine Awards", year: "2022" },
  ];

  const specs = [
    { label: "Vintage", value: "Multi-Vintage · 2015 / 2016 / 2017" },
    { label: "Grape", value: "100% Chardonnay" },
    { label: "Style", value: "Brut · Oak-Fermented · Late Disgorged" },
    { label: "Bottle Size", value: "75cl" },
    { label: "ABV", value: "12%" },
    { label: "Allergens", value: "Contains Sulphites" },
    { label: "Suitable for", value: "Vegans & Vegetarians" },
    { label: "Product Code", value: "R1723" },
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
            A quarter-century in <span className="text-[#C8A96E]">a glass</span>.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              data-atb-trigger
              type="button"
              className="btn-cta"
            >
              Add to basket · £85.00
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

// ── Schema.org JSON-LD ─────────────────────────────────────────────────────
// Provides Google Rich Snippets: product, aggregate rating, individual reviews.
// Aggregate rating reflects the press-quote scores on this page.
const SCHEMA_LD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Ridgeview Oak Reserve",
  description:
    "Limited Edition late-disgorged English sparkling wine. 100% Chardonnay from Ridgeview's original 1995 plantings, oak-fermented and blended across three consecutive vintages (2015–2017). Vanilla, caramelised butter and toasted brioche over a smoky, complex finish. Silver — Decanter World Wine Awards 2022.",
  image: "https://ridgeview.vercel.app/products/oak-reserve.png",
  brand: { "@type": "Brand", name: "Ridgeview Wine Estate" },
  sku: "R1723",
  category: "English Sparkling Wine",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "GBP",
    lowPrice: "85.00",
    highPrice: "459.00",
    offerCount: "2",
    // Both 75cl + Case were flagged "Out of stock" on ridgeview.co.uk at sync;
    // schema set to OutOfStock to match. Restore InStock when restocked.
    availability: "https://schema.org/OutOfStock",
    url: "https://ridgeview.vercel.app/wine/oak-reserve/",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "1",
    bestRating: "5",
  },
  award: [
    "Silver — Decanter World Wine Awards 2022",
  ],
};

const FAQ_ITEMS = [
  {
    question: "When will my order arrive?",
    answer:
      "Standard UK delivery is 2–4 working days. Order before noon for next-working-day dispatch. Free UK delivery on orders over £45.",
  },
  {
    question: "How should I store Oak Reserve?",
    answer:
      "Lay bottles flat in a cool, dark place between 8–12°C. Late-disgorged and already cellar-aged on release, Oak Reserve drinks beautifully now and will continue to evolve for 6–10 years from disgorgement, deepening into richer caramelised-butter and toasted-nut notes. Serve at 8–10°C in a Burgundy-shaped glass to let the oak and brioche aromatics open.",
  },
  {
    question: "Can I add a personalised gift note?",
    answer:
      "Yes — every order includes a complimentary handwritten gift note option at checkout. Add the recipient's address and we'll ship directly to them, with no prices on the packing slip.",
  },
  {
    question: "Do you ship outside the UK?",
    answer:
      "International shipping is available to most of Europe and selected destinations. Customs and duties may apply at the destination — please contact our team for a tailored quote.",
  },
  {
    question: "What if I'm not happy with the wine?",
    answer:
      "We stand behind every bottle. If a wine is faulty or damaged in transit, contact us within 14 days and we'll replace or refund without question.",
  },
];

const RELATED_WINES = [
  {
    slug: "blanc-de-blancs",
    name: "Blanc de Blancs",
    style: "Vintage · Single-Vineyard Chardonnay",
    price: 75,
    image: "/products/blanc-de-blancs.png",
    note: "Pure Chardonnay from the same 1995 plantings — without the oak.",
  },
  {
    slug: "blanc-de-noirs",
    name: "Blanc de Noirs",
    style: "Vintage · 100% Pinot Cuvée",
    price: 60,
    image: "/products/blanc-de-noirs.png",
    note: "The red-grape counterpart — vinified white with structural depth.",
  },
  {
    slug: "bloomsbury",
    name: "Bloomsbury NV",
    style: "House Cuvée · Non Vintage",
    price: 34,
    image: "/products/bloomsbury.png",
    note: "Chardonnay-led everyday blend — bright and steel-fermented.",
  },
];

export default function OakReservePage() {
  const testimonial = getTestimonial("oak-reserve");

  return (
    <main className="bg-[#010101] pb-[80px] md:pb-0">
      {/* Schema.org JSON-LD — Google Rich Snippets (product, aggregate rating, reviews) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_LD) }}
      />

      <Navbar />
      <ProductHero />
      <ScrollReset><TastingPairingSection /></ScrollReset>
      <ScrollReset><BlendSection /></ScrollReset>

      {/* A) Behind the Bottle — production craft pillars shared across every
          Ridgeview SKU (Soil → Harvest → Winemaking). SKU-specific details
          like single-vineyard / lees duration / palate live in the Specs
          section and the Varietal section above. */}
      <ScrollReset>
        <BehindTheBottleSection
          headline={<>Crafted in the <span className="text-[#C8A96E]">Classic Method</span>.</>}
          intro="For three decades, Ridgeview has crafted English sparkling wines the long way — by hand, on the chalk hills of Sussex, using the same Classic Method as the great houses of Champagne."
          pillars={[
            { label: "Sussex Chalk Soil", detail: "Vines grown on the same Cretaceous chalk that runs beneath the Champagne region — the foundation of every great sparkling wine." },
            { label: "Hand Harvest", detail: "Grapes are picked at first light and sorted by hand to keep only the most balanced bunches." },
            { label: "Méthode Traditionnelle", detail: "Secondary fermentation in bottle — the same Classic Method used in the great houses of Champagne." },
          ]}
        />
      </ScrollReset>

      {testimonial && (
        <ScrollReset><TestimonialSection testimonial={testimonial} /></ScrollReset>
      )}

      <ScrollReset>
        <AwardSection
          data={{
            medal: "Silver",
            body: "Decanter World Wine Awards",
            year: 2022,
            tier: "Recommended",
            badgeSrc: "/images/awards/decanter-2018-silver.webp",
            description: "Awarded Silver by the global Decanter judging panel — confirming Oak Reserve as a benchmark for late-disgorged, oak-fermented English Chardonnay. A quarter-century cuvée from the original 1995 plantings.",
          }}
        />
      </ScrollReset>

      <ScrollReset><AwardsSpecsSection /></ScrollReset>

      {/* C) Wine Club Upsell */}
      <ScrollReset><WineClubUpsellSection /></ScrollReset>

      {/* D) Related Wines */}
      <ScrollReset>
        <RelatedWinesSection wines={RELATED_WINES} />
      </ScrollReset>

      {/* N) FAQ */}
      <ScrollReset>
        <FAQSection items={FAQ_ITEMS} />
      </ScrollReset>

      <ScrollReset><ClosingCTA /></ScrollReset>
      <Footer />
      {/* Sticky mobile purchase bar (Mini-Flasche + Preis + ATB) appears only
          when EVERY ATB on the page (hero bottle-side, widget, ClosingCTA —
          all marked with data-atb-trigger) is out of viewport. As soon as
          any ATB scrolls back in, the bar hides. */}
      <StickyMobileCTA
        productName="Oak Reserve"
        price="£85.00 · 75cl"
        thumbnailSrc="/products/oak-reserve.png"
        triggerSelector="[data-atb-trigger]"
      />
    </main>
  );
}
