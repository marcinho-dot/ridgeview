"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * PurchaseWidget — composable purchase block for SKU pages.
 * Bundles: Variant-Selector + Quantity-Selector + Free-Shipping-Bar + ATB Button.
 * Pure client-side UI (no cart integration yet) — the ATB just signals interest.
 */

export interface Variant {
  /** Display label e.g. "75cl Bottle" */
  label: string;
  /** Detail line e.g. "75cl · 12% ABV" */
  detail: string;
  /** Unit price in GBP */
  price: number;
  /** Optional savings badge e.g. "Save 15%" */
  badge?: string;
}

interface Props {
  variants: Variant[];
  /** Free-shipping threshold in GBP. Default £45. */
  freeShippingThreshold?: number;
  /** Member-price discount note shown under price. */
  memberNote?: string;
  /** id on the ATB-button for the StickyMobileCTA IntersectionObserver. */
  ctaId?: string;
  /** Optional callback invoked with the current selection on ATB-click. */
  onAddToBasket?: (selection: { variant: Variant; quantity: number; total: number }) => void;
}

const formatGBP = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 }).format(n);

export function PurchaseWidget({
  variants,
  freeShippingThreshold = 45,
  memberNote = "20% off for members. Add a free personalised gift note at checkout.",
  ctaId,
  onAddToBasket,
}: Props) {
  const [variantIdx, setVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const variant = variants[variantIdx];
  const total = variant.price * quantity;
  const remaining = Math.max(0, freeShippingThreshold - total);
  const freeShippingMet = remaining === 0;
  const progressPct = Math.min(100, (total / freeShippingThreshold) * 100);

  return (
    <div className="space-y-4 md:space-y-5">
      {/* ── Variant Selector ────────────────────────────────────── */}
      {variants.length > 1 && (
        <div>
          <p className="font-body text-white/40 text-[10px] uppercase tracking-[0.25em] mb-2.5">
            Format
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v, i) => {
              const active = i === variantIdx;
              return (
                <button
                  key={v.label}
                  type="button"
                  onClick={() => setVariantIdx(i)}
                  className={`group px-3.5 py-2.5 rounded-md border text-left transition-all duration-300 backdrop-blur-md ${
                    active
                      ? "border-[#C8A96E]/80 bg-[#C8A96E]/[0.18]"
                      : "border-white/15 bg-white/[0.03] hover:border-[#C8A96E]/40 hover:bg-[#C8A96E]/[0.08]"
                  }`}
                >
                  <p
                    className={`font-body text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                      active ? "text-cream" : "text-white/65 group-hover:text-white/85"
                    }`}
                  >
                    {v.label}
                  </p>
                  <p className={`font-body text-[10px] mt-0.5 transition-colors duration-300 ${active ? "text-[#C8A96E]" : "text-white/35"}`}>
                    {formatGBP(v.price)}
                    {v.badge ? <span className="ml-2 text-[#C8A96E]/85">· {v.badge}</span> : null}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Price + Detail ──────────────────────────────────────── */}
      <div>
        <p
          className="font-display italic text-cream"
          style={{ fontSize: "clamp(32px, 3.6vw, 48px)", fontWeight: 400 }}
        >
          {formatGBP(total)}
        </p>
        <p className="font-body text-white/45 text-[12px] mt-1">{variant.detail}</p>
      </div>

      {/* ── Quantity + ATB ───────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Quantity Selector */}
        <div className="inline-flex items-center border border-white/20 rounded-md overflow-hidden backdrop-blur-md bg-white/[0.03]">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-9 h-[44px] flex items-center justify-center text-white/65 hover:text-cream hover:bg-white/[0.08] active:scale-[0.95] transition-all duration-200 text-base"
          >
            &minus;
          </button>
          <div
            aria-live="polite"
            className="w-9 text-center font-body text-cream text-[13px] tabular-nums"
          >
            {quantity}
          </div>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            aria-label="Increase quantity"
            className="w-9 h-[44px] flex items-center justify-center text-white/65 hover:text-cream hover:bg-white/[0.08] active:scale-[0.95] transition-all duration-200 text-base"
          >
            +
          </button>
        </div>

        {/* ATB Button */}
        <button
          id={ctaId}
          type="button"
          onClick={() => onAddToBasket?.({ variant, quantity, total })}
          className="btn-atb backdrop-blur-2xl backdrop-saturate-150"
        >
          Add to basket · {formatGBP(total)}
          <span className="btn-atb-arrow">&rarr;</span>
        </button>
      </div>

      {/* ── Free Shipping Bar ────────────────────────────────────── */}
      <div aria-live="polite" className="space-y-1.5">
        <div className="relative h-[3px] rounded-full overflow-hidden bg-white/[0.08]">
          <motion.div
            className={`absolute inset-y-0 left-0 rounded-full ${
              freeShippingMet ? "bg-[#C8A96E]" : "bg-[#C8A96E]/55"
            }`}
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <p className="font-body text-[11px] leading-relaxed">
          {freeShippingMet ? (
            <span className="text-[#C8A96E]">
              <span className="mr-1.5">&#10003;</span>
              Free UK delivery unlocked
            </span>
          ) : (
            <span className="text-white/55">
              <span className="text-white/40">Free UK delivery from {formatGBP(freeShippingThreshold)}</span>
              <span className="mx-2 text-white/20">·</span>
              <span className="text-[#C8A96E]/85">{formatGBP(remaining)} to go</span>
            </span>
          )}
        </p>
      </div>

      {/* ── Member Note ──────────────────────────────────────────── */}
      {memberNote && (
        <p
          className="font-body text-white/40 text-[12px] leading-relaxed"
          style={{ maxWidth: "440px" }}
        >
          {memberNote}
        </p>
      )}
    </div>
  );
}
