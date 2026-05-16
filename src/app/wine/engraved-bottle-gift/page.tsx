"use client";

import { ReactNode, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReset } from "@/components/ScrollReset";
import { TestimonialSection } from "@/components/sku/TestimonialSection";
import { StickyMobileCTA } from "@/components/sku/StickyMobileCTA";
import { PurchaseWidget, type Variant } from "@/components/sku/PurchaseWidget";
import { BottleStage } from "@/components/sku/BottleStage";
import { QuickAddButton } from "@/components/cart/QuickAddButton";
import { BehindTheBottleSection } from "@/components/sku/BehindTheBottleSection";
import { WineClubUpsellSection } from "@/components/sku/WineClubUpsellSection";
import { RelatedWinesSection } from "@/components/sku/RelatedWinesSection";
import { FAQSection } from "@/components/sku/FAQSection";
import { getTestimonial } from "@/data/testimonials";
import { basePath } from "@/lib/basePath";

// Engraved Bottle Gift variants — synced 2026-05-12 with ridgeview.co.uk
// (/product/personalised-engraved-wine-bottle-gift/). Bespoke gift
// service: three of Ridgeview's sparkling wines available with custom
// engraving on the bottle. Fulfilled by a third-party engraver in up
// to 5 working days. Live shop shows "Out of Stock" on the variant
// dropdown — Ridgeview is handling these orders personally via email
// (info@ridgeview.co.uk) for now.
//
// Variant prices below are estimates extracted from the £50-£90 range
// shown on the live shop page (verified) + the underlying wine prices.
// Refine if Marc shares the exact dropdown values.
//
// Order = ascending price (cheapest entry-point as default), since these
// are different wines, not formats of the same wine — the FINAL Variant-
// Ordering rule (75cl/Magnum/Case) doesn't apply here.
const ENGRAVED_BOTTLE_VARIANTS: Variant[] = [
  { label: "Bloomsbury NV", detail: "75cl · Custom Engraving · Made-to-Order", price: 50, image: "/products/bloomsbury.png" },
  { label: "Fitzrovia Rosé", detail: "75cl · Custom Engraving · Made-to-Order", price: 60, image: "/products/fitzrovia.png" },
  { label: "Blanc de Blancs", detail: "75cl · Custom Engraving · Made-to-Order", price: 90, badge: "Vintage", image: "/products/blanc-de-blancs.png" },
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

  // The engraved-bottle gift has 3 variants that are 3 DIFFERENT wines —
  // not formats of the same wine. Lifting variant state here lets the
  // hero bottle swap to Bloomsbury / Fitzrovia / BdB as the user clicks,
  // which is the biggest visual win of the whole format-swap feature.
  const [variantIdx, setVariantIdx] = useState(0);
  const activeVariant = ENGRAVED_BOTTLE_VARIANTS[variantIdx];
  const heroBottleSrc = activeVariant.image ?? "/products/engraved-bottle-gift.png";
  const heroBottleAlt = `Ridgeview Engraved Bottle Gift — ${activeVariant.label}`;

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
            <a href={`${basePath}/wines`} className="link-underline hover:text-[#C8A96E] transition-colors duration-500">Shop</a>
            <span className="mx-3 text-white/20">/</span>
            <span className="text-white/55">Engraved Bottle Gift</span>
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
                [ Just Launched · Bespoke Gift ]
              </p>
            </FadeUp>

            <div className="overflow-hidden pb-3 md:pb-5 mb-2 md:mb-5 order-2">
              <motion.h1
                className="font-display italic text-cream leading-[1.02]"
                style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400 }}
                initial={{ y: "102%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[#C8A96E]">Engraved Bottle Gift</span>
              </motion.h1>
            </div>

            <FadeUp delay={0.3} className="order-3">
              <p
                className="font-display italic text-white/85 mb-3 md:mb-5"
                style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 400, lineHeight: 1.35 }}
              >
                Three wines · Bespoke message
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
                A milestone, a thank-you, a corporate gesture &mdash; each
                bottle is engraved by hand with the message you choose, on
                one of three of Ridgeview&rsquo;s award-winning sparkling
                wines. Made-to-order, fulfilled in up to five working days
                by our specialist engraver. For larger orders or bespoke
                arrangements, please get in touch.
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
                    slug="engraved-bottle-gift"
                    productName={"Engraved Bottle Gift"}
                    vintage={"Bespoke Gift"}
                    image="/products/engraved-bottle-gift.png"
                    variants={ENGRAVED_BOTTLE_VARIANTS}
                    freeShippingThreshold={45}
                    ctaId="hero-mobile-cta"
                    memberNote="Each engraved bottle is handled personally — to arrange your order, confirm the engraving text and discuss larger or corporate gifts, please email info@ridgeview.co.uk. Fulfilment in up to 5 working days."
                    variantIdx={variantIdx}
                    onVariantChange={setVariantIdx}
                  />
                </div>

                {/* No hero badges — this is a gifting service, not a wine
                    being judged. The 3 underlying wines have their own
                    awards on their respective SKU pages. */}
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
              {/* No mobile award badges for the Engraved Bottle Gift —
                  gifting service rather than wine judged on its merits. */}

              {/* Bottle wrapper — absolute, doesn't dictate column height.
                  Wrapped in motion.div so the bottle drifts upward via the
                  scroll-driven parallax (subtle 80px range). */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ y: bottleY }}
              >
                {/* Bottle keyed on heroBottleSrc → AnimatePresence crossfades
                    when the user picks a different wine for engraving. */}
                <BottleStage src={heroBottleSrc} alt={heroBottleAlt} />
              </motion.div>

              {/* Quick "Add to basket" — anchored bottom-right next to the bottle
                  on every breakpoint. Marked with data-atb-trigger so the
                  StickyMobileCTA only appears when this AND every other ATB
                  on the page is out of view. The widget ATB in the info
                  column has the dynamic price (variant × quantity); this
                  one is the quick-action visual anchor. */}
              <div className="absolute bottom-2 md:bottom-[40px] right-0 z-10">
                <QuickAddButton
                  slug="engraved-bottle-gift"
                  productName={"Engraved Bottle Gift"}
                  vintage={"Bespoke Gift"}
                  image="/products/engraved-bottle-gift.png"
                  defaultVariantId="75cl"
                  defaultVariantLabel="75cl Bottle"
                  defaultUnitPricePence={5000}
                  defaultPriceLabel="£50"
                />
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
  const tastingNotes = ["Watermelon & Grapefruit", "Peach & Cranberry", "Strawberries & Cream"];
  const foodPairings = [
    "Fresh Goat's Cheese & Honey",
    "Saucisson Sec",
    "Salt Cod Fritters",
    "Summer Pudding",
    "Charcuterie & Olives",
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

// ── Varietal (100% Pinot Précoce still rosé) ──────────────────────────────

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
              [ Varietal ]
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              className="font-display italic text-white leading-[1.1] mb-5"
              style={{ fontSize: "clamp(30px, 4vw, 56px)", fontWeight: 400 }}
            >
              One grape, <span className="text-[#C8A96E]">pink &amp; still</span>.
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p
              className="font-body text-white/55"
              style={{ fontSize: "clamp(13px, 1.25vw, 15px)", maxWidth: "520px", margin: "0 auto" }}
            >
              A still rosé from 100% Pinot Précoce &mdash; an early-ripening
              variety of Pinot Noir grown across Suffolk and Essex.
            </p>
          </FadeUp>
        </div>

        {/* Single big percentage — 100% Pinot Précoce, centered */}
        <div className="flex justify-center mb-20 md:mb-24">
          <FadeUp delay={0.28}>
            <div className="group text-center cursor-default px-8">
              <p
                className="font-display italic text-cream leading-none mb-4 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                style={{ fontSize: "clamp(80px, 12vw, 180px)", fontWeight: 400 }}
              >
                <span className="text-[#C8A96E] transition-[text-shadow] duration-700 ease-out group-hover:[text-shadow:0_0_40px_rgba(200,169,110,0.45)]">
                  100
                </span>
                <span
                  className="text-white/55 group-hover:text-white/80 transition-colors duration-700"
                  style={{ fontSize: "0.42em", verticalAlign: "super", marginLeft: "0.04em" }}
                >
                  %
                </span>
              </p>
              <p
                className="font-body text-white/70 group-hover:text-cream uppercase tracking-[0.34em] transition-colors duration-500"
                style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}
              >
                Pinot Précoce
              </p>
            </div>
          </FadeUp>
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
              Hand-picked Pinot Précoce from Suffolk and Essex partner
              vineyards &mdash; an early-ripening variety of Pinot Noir
              that delivers ripe red-berry fruit at lower English
              latitudes. Vinified still rather than sparkling, with brief
              skin contact for the rose-petal hue. A new direction for
              the estate, made for sharing.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Awards & Specs ──────────────────────────────────────────────────────────

function AwardsSpecsSection() {
  // No awards yet — new launch (2026). Section gracefully renders empty
  // awards list; the Specs column below carries the wine's info.
  const awards: { medal: string; body: string; year: string }[] = [];

  const specs = [
    { label: "Service", value: "Bespoke Engraving · Made-to-Order" },
    { label: "Wine Options", value: "Bloomsbury NV · Fitzrovia Rosé · Blanc de Blancs" },
    { label: "Bottle Size", value: "75cl (all options)" },
    { label: "Lead Time", value: "Up to 5 working days (third-party engraver)" },
    { label: "Min. Order", value: "Single bottle" },
    { label: "Larger Orders", value: "Yes — please email info@ridgeview.co.uk" },
    { label: "Corporate Use", value: "Available · contact for branded engraving" },
    { label: "Allergens", value: "Contains Sulphites (underlying wines)" },
  ];

  // If awards is empty, render only the Specs column (centered, single-
  // column) — no orphaned "Awards" headline above an empty list.
  const hasAwards = awards.length > 0;

  return (
    <section className="bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 md:py-28">
        <div className={hasAwards
          ? "grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-16 md:gap-24"
          : "max-w-[640px] mx-auto"
        }>
          {/* Awards — rendered only when there are awards to list */}
          {hasAwards && (
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
          )}

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
            A gift, made <span className="text-[#C8A96E]">memorable</span>.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* No data-atb-trigger here — this is a duplicate CTA, not the
                primary purchase action. StickyMobileCTA should stay visible
                when ClosingCTA enters the viewport. */}
            <button
              type="button"
              className="btn-cta"
            >
              Add to basket · from £50.00
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
  name: "Ridgeview Engraved Bottle Gift",
  description:
    "Bespoke engraving on Ridgeview's award-winning English Sparkling Wines. Choose Bloomsbury NV, Fitzrovia Rosé or Blanc de Blancs, and have a custom message engraved on the bottle. Made-to-order, fulfilled in up to 5 working days. Perfect for milestones, thank-yous and corporate gifts.",
  image: "https://ridgeview.vercel.app/products/engraved-bottle-gift.png",
  brand: { "@type": "Brand", name: "Ridgeview Wine Estate" },
  category: "Personalised Wine Gift",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "GBP",
    lowPrice: "50.00",
    highPrice: "90.00",
    offerCount: "3",
    availability: "https://schema.org/InStock",
    url: "https://ridgeview.vercel.app/wine/engraved-bottle-gift/",
  },
};

const FAQ_ITEMS = [
  {
    question: "When will my order arrive?",
    answer:
      "Standard UK delivery is 2–4 working days. Order before noon for next-working-day dispatch. Free UK delivery on orders over £45.",
  },
  {
    question: "How does the engraving work?",
    answer:
      "Each bottle is engraved by hand by our specialist engraver after you place the order. You'll confirm the engraving text by email (info@ridgeview.co.uk) — name, dates, short messages and corporate logos are all supported. Fulfilment takes up to 5 working days from confirmation.",
  },
  {
    question: "Can I order larger or corporate quantities?",
    answer:
      "Yes — for case orders, branded corporate gifts or events, please email info@ridgeview.co.uk with quantity and engraving brief. We arrange bespoke runs on a case-by-case basis.",
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

// The three wines available for engraving — each linked to its own SKU
// page so visitors can read the full tasting story before customising.
const RELATED_WINES = [
  {
    slug: "bloomsbury",
    name: "Bloomsbury NV",
    style: "House Cuvée · Sparkling Wine of the Year 2024",
    price: 34,
    image: "/products/bloomsbury.png",
    note: "The bestselling Méthode Traditionnelle blend — Sommelier Awards 2024 Wine of the Year.",
  },
  {
    slug: "fitzrovia",
    name: "Fitzrovia Rosé",
    style: "Sparkling Rosé · Non Vintage",
    price: 40,
    image: "/products/fitzrovia.png",
    note: "Wild raspberry and summer fruit — a celebratory rosé in fine bubbles.",
  },
  {
    slug: "blanc-de-blancs",
    name: "Blanc de Blancs",
    style: "Vintage · Single-Vineyard Chardonnay",
    price: 75,
    image: "/products/blanc-de-blancs.png",
    note: "Pure Chardonnay from the 1995 plantings — Decanter Platinum 2023.",
  },
];

export default function EngravedBottleGiftPage() {
  // No press testimonial for the engraved-bottle gift service.
  // getTestimonial returns undefined → TestimonialSection skipped.
  const testimonial = getTestimonial("engraved-bottle-gift");

  return (
    <main className="bg-[#010101] pb-[80px] md:pb-0">
      {/* Schema.org JSON-LD — Google Rich Snippets (product, aggregate rating, reviews) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_LD) }}
      />

      <Navbar />
      <ProductHero />
      {/* TastingPairingSection + BlendSection removed for the gifting
          service — those sections describe wine character, but here the
          underlying wine is chosen at order time (3 options), so the page
          surfaces the gifting story instead. The local component definitions
          remain in this file but are not rendered. */}

      {/* A) Behind the Bottle — production craft pillars shared across every
          Ridgeview SKU (Soil → Harvest → Winemaking). SKU-specific details
          like single-vineyard / lees duration / palate live in the Specs
          section and the Varietal section above. */}
      <ScrollReset>
        <BehindTheBottleSection
          headline={<>Crafted in the <span className="text-[#C8A96E]">Méthode Traditionnelle</span>.</>}
          intro="For three decades, Ridgeview has crafted English sparkling wines the long way — by hand, on the chalk hills of Sussex, using the same Traditional Method as the great houses of Champagne."
          pillars={[
            { label: "Sussex Chalk Soil", detail: "Vines grown on the same Cretaceous chalk that runs beneath the Champagne region — the foundation of every great sparkling wine." },
            { label: "Hand Harvest", detail: "Grapes are picked at first light and sorted by hand to keep only the most balanced bunches." },
            { label: "Méthode Traditionnelle", detail: "An English invention — coal-fired bottles strong enough to hold the bubbles, the cork to seal them in, deliberate secondary fermentation." },
          ]}
        />
      </ScrollReset>

      {testimonial && (
        <ScrollReset><TestimonialSection testimonial={testimonial} /></ScrollReset>
      )}

      {/* AwardSection omitted — gifting service, no awards. AwardsSpecsSection
          below conditionally hides the empty Awards column and just shows
          the gifting-service specs (lead time, min order, corporate options). */}
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
        productName="Engraved Bottle Gift"
        price="From £50.00 · 75cl"
        thumbnailSrc="/products/engraved-bottle-gift.png"
        slug="engraved-bottle-gift"
        vintage={"Bespoke Gift"}
        defaultVariantId="75cl"
        defaultVariantLabel="75cl Bottle"
        defaultUnitPricePence={5000}
        triggerSelector="[data-atb-trigger]"
      />
    </main>
  );
}
