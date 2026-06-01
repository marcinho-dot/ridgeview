"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { basePath } from "@/lib/basePath";
import { PurchaseWidget, type Variant } from "@/components/sku/PurchaseWidget";
import { initialVariantIdxFromHash } from "@/lib/cart/variantFromHash";

/**
 * /gift-sets/the-ridgeview-gift-set — configurable gift-set SKU.
 *
 * Mirrors the legacy ridgeview.co.uk "The Ridgeview Gift Set" product:
 * a luxury box that pairs ONE wine of the buyer's choice with two
 * branded flutes, a bottle stopper and a personalised note. The
 * "variant" here is the chosen wine — prices are the verbatim UK
 * per-wine prices (£64–£105), not invented.
 *
 * Reuses the wine-SKU PurchaseWidget (variant selector + qty +
 * free-shipping bar + add-to-basket). selectorLabel is overridden to
 * "Choose your wine" since the variants are wines, not bottle formats.
 */

// Verbatim UK variation prices (the-ridgeview-gift-set, fetched 2026-05-30).
// Ordered cheapest-first so the page anchors on the £64 entry price.
const GIFT_SET_VARIANTS: Variant[] = [
  { variantId: "bloomsbury",     label: "Bloomsbury NV",     detail: "Signature · citrus & brioche",       price: 64,  image: "/products/bloomsbury.png" },
  { variantId: "cavendish",      label: "Cavendish NV",      detail: "Signature · rich red-berry depth",   price: 66,  image: "/products/cavendish.png" },
  { variantId: "fitzrovia",      label: "Fitzrovia Rosé NV", detail: "Signature · vibrant fruit purity",   price: 70,  image: "/products/fitzrovia-rose.png" },
  { variantId: "blanc-de-noirs", label: "Blanc de Noirs",    detail: "Limited · red fruit & gentle spice", price: 90,  image: "/products/blanc-de-noirs.png" },
  { variantId: "rose-de-noirs",  label: "Rosé de Noirs",     detail: "Limited · peach, cherry & almond",   price: 95,  image: "/products/rose-de-noirs.png" },
  { variantId: "blanc-de-blancs",label: "Blanc de Blancs",   detail: "Limited · 100% Chardonnay, vintage", price: 105, image: "/products/blanc-de-blancs.png" },
];

const INCLUDED = [
  "Your choice of Ridgeview sparkling wine — 75cl",
  "Two Ridgeview branded opale flutes",
  "A Ridgeview sparkling bottle stopper",
  "A personalised gift note",
  "Free next-working-day delivery",
];

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

function GiftSetHero() {
  const [variantIdx, setVariantIdx] = useState(() => initialVariantIdxFromHash(GIFT_SET_VARIANTS));

  return (
    <section className="relative bg-[#010101] pt-28 md:pt-24 pb-12 md:pb-16 overflow-hidden">
      {/* Ambient gold glow — house SKU treatment */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <FadeUp>
          <p className="font-body text-white/35 text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-6">
            <a href={`${basePath}/`} className="link-underline hover:text-[#C8A96E] transition-colors duration-500">Home</a>
            <span className="mx-3 text-white/20">/</span>
            <a href={`${basePath}/gift-sets`} className="link-underline hover:text-[#C8A96E] transition-colors duration-500">Gift Sets</a>
            <span className="mx-3 text-white/20">/</span>
            <span className="text-white/55">The Ridgeview Gift Set</span>
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[52fr_48fr] gap-8 md:gap-14 items-center">
          {/* ── Info column ── */}
          <div className="order-2 md:order-1">
            <FadeUp delay={0.05}>
              <p className="font-display italic text-[#C8A96E] tracking-widest mb-2 md:mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
                [ Wine Gift · Curated &amp; Boxed ]
              </p>
            </FadeUp>

            <div className="overflow-hidden pb-2 md:pb-4 mb-3 md:mb-5">
              <motion.h1
                className="font-display italic text-cream leading-[1.04]"
                style={{ fontSize: "clamp(36px, 5.2vw, 76px)", fontWeight: 400 }}
                initial={{ y: "102%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                The Ridgeview <span className="text-[#C8A96E]">Gift Set</span>
              </motion.h1>
            </div>

            <FadeUp delay={0.3}>
              <p className="font-display italic text-white/85 mb-4 md:mb-6" style={{ fontSize: "clamp(17px, 1.9vw, 24px)", fontWeight: 400, lineHeight: 1.35 }}>
                Choose your wine — we&rsquo;ll make it a gift.
              </p>
            </FadeUp>

            <FadeUp delay={0.38}>
              <div className="mb-5 md:mb-6" style={{ height: "1px", maxWidth: "440px", background: "rgba(200,169,110,0.18)" }} />
            </FadeUp>

            <FadeUp delay={0.42}>
              <p className="font-body text-white/70 mb-5 md:mb-7" style={{ fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 400, lineHeight: 1.75, maxWidth: "500px" }}>
                A beautifully presented gift set to delight the most discerning of
                recipients. Select your favourite Ridgeview sparkling wine, paired with
                a matching bottle stopper and two opale flutes — all housed in an
                elegant gift box for that extra-special touch.
              </p>
            </FadeUp>

            {/* What's included */}
            <FadeUp delay={0.48}>
              <ul className="mb-7 md:mb-8 space-y-2.5" style={{ maxWidth: "480px" }}>
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-white/65" style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", lineHeight: 1.6 }}>
                    <span aria-hidden className="text-[#C8A96E]/80 flex-shrink-0 mt-1.5" style={{ fontSize: "7px" }}>◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* Purchase widget — variants are the wine choices */}
            <FadeUp delay={0.55}>
              <div className="max-w-[480px]">
                <PurchaseWidget
                  slug="the-ridgeview-gift-set"
                  productName="The Ridgeview Gift Set"
                  vintage="Gift Set"
                  image="/images/gift-sets/gift-set.webp"
                  variants={GIFT_SET_VARIANTS}
                  selectorLabel="Choose your wine"
                  freeShippingThreshold={45}
                  memberNote="20% off for members. Add your personalised gift note at checkout."
                  ctaId="gift-set-cta"
                  variantIdx={variantIdx}
                  onVariantChange={(idx) => setVariantIdx(idx)}
                />
              </div>
            </FadeUp>
          </div>

          {/* ── Image column ── */}
          <FadeUp delay={0.2} className="order-1 md:order-2">
            <div className="relative aspect-[4/5] md:aspect-square w-full rounded-md overflow-hidden bg-[#0d0d0d] border border-white/[0.06]">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 60% at 50% 45%, rgba(200,169,110,0.07) 0%, transparent 70%)" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/images/gift-sets/gift-set.webp`}
                alt="The Ridgeview Gift Set — sparkling wine, two branded flutes and a bottle stopper in a gift box"
                className="absolute inset-0 w-full h-full object-contain p-6 md:p-10"
              />
            </div>
            <p className="mt-3 font-body text-white/30 text-center" style={{ fontSize: "11px" }}>
              Shown with Bloomsbury NV · your chosen wine is included
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[820px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ More ways to gift ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-8" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            Duos, trios &amp; <span className="text-[#C8A96E]">vouchers</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a href={`${basePath}/gift-sets`} className="btn-cta">All gift sets</a>
            <a href={`${basePath}/gift-vouchers`} className="btn-cta">Gift vouchers</a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function RidgeviewGiftSetPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <GiftSetHero />
        <ClosingCTA />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
