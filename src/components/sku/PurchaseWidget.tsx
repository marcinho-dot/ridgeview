"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart/CartContext";

/**
 * PurchaseWidget — composable purchase block for SKU pages.
 * Bundles: Variant-Selector + Quantity-Selector + Free-Shipping-Bar + ATB Button.
 *
 * The ATB button dispatches to the global cart (CartContext) using
 * the (slug, variantId) merge key — same wine + same variant
 * increments the existing line; magnums/cases stay as separate
 * lines. After dispatch the cart drawer auto-opens so the user
 * gets visual confirmation.
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
  /** Stable id for cart merging. Defaults to a slug of `label` —
   *  e.g. "75cl Bottle" → "75cl-bottle". Set explicitly for the
   *  3 canonical variants: "75cl", "magnum", "case6". */
  variantId?: string;
  /** Optional format-specific bottle/case shot. When the parent
   *  page lifts variant state via `variantIdx` + `onVariantChange`,
   *  it can swap the hero image to match (e.g. show the Magnum
   *  bottle when the Magnum variant is clicked). Falls back to
   *  the page's default 75cl bottle image when undefined. */
  image?: string;
}

interface Props {
  variants: Variant[];
  /** Free-shipping threshold in GBP. Default £45. */
  freeShippingThreshold?: number;
  /** Member-price discount note shown under price. */
  memberNote?: string;
  /** id on the ATB-button for the StickyMobileCTA IntersectionObserver. */
  ctaId?: string;
  /** Wine identity — required for cart line items. */
  slug: string;
  productName: string;
  vintage: string;
  /** Bottle thumbnail path (will be served via basePath at render). */
  image: string;
  /** Optional callback fired AFTER the cart add (e.g. for analytics). */
  onAddToBasket?: (selection: { variant: Variant; quantity: number; total: number }) => void;
  /** Controlled variant index. When set together with `onVariantChange`
   *  the widget becomes fully controlled — the parent owns variant
   *  state and can wire the hero bottle image to track variant clicks
   *  (Magnum / Case-of-6 image swap). Leave both undefined for the
   *  default self-contained behaviour. */
  variantIdx?: number;
  onVariantChange?: (idx: number, variant: Variant) => void;
}

const formatGBP = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 }).format(n);

/** Slugify a variant label when the SKU page didn't set an explicit
 *  variantId — "75cl Bottle" → "75cl-bottle". Keeps cart lines stable
 *  across re-renders. */
function variantIdFor(v: Variant, fallbackIdx: number): string {
  if (v.variantId) return v.variantId;
  const slug = v.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `variant-${fallbackIdx}`;
}

export function PurchaseWidget({
  variants,
  freeShippingThreshold = 45,
  memberNote = "20% off for members. Add a free personalised gift note at checkout.",
  ctaId,
  slug,
  productName,
  vintage,
  image,
  onAddToBasket,
  variantIdx: controlledIdx,
  onVariantChange,
}: Props) {
  const [internalIdx, setInternalIdx] = useState(0);
  // Controlled mode kicks in as soon as the parent passes a numeric
  // `variantIdx`. The change handler still runs in uncontrolled mode
  // too, so analytics / parent reactions work in either pattern.
  const isControlled = typeof controlledIdx === "number";
  const variantIdx = isControlled ? controlledIdx : internalIdx;
  const setVariantIdx = (idx: number) => {
    if (!isControlled) setInternalIdx(idx);
    onVariantChange?.(idx, variants[idx]);
  };

  const [quantity, setQuantity] = useState(1);
  const { add, openDrawer } = useCart();

  const variant = variants[variantIdx];
  const total = variant.price * quantity;
  const remaining = Math.max(0, freeShippingThreshold - total);
  const freeShippingMet = remaining === 0;
  const progressPct = Math.min(100, (total / freeShippingThreshold) * 100);

  const handleAdd = () => {
    add({
      slug,
      name: productName,
      vintage,
      variantId: variantIdFor(variant, variantIdx),
      variantLabel: variant.label,
      unitPricePence: Math.round(variant.price * 100),
      priceLabel: formatGBP(variant.price),
      image,
      quantity,
    });
    openDrawer();
    onAddToBasket?.({ variant, quantity, total });
  };

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

        {/* ATB Button — data-atb-trigger ties into the StickyMobileCTA
            observer. Dispatches to the cart + auto-opens the drawer. */}
        <button
          id={ctaId}
          data-atb-trigger
          type="button"
          onClick={handleAdd}
          className="btn-cta"
        >
          Add to basket · {formatGBP(total)}
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

      {/* ── Member Note ──────────────────────────────────────────────
          !mt-2 md:!mt-1 overrides the parent space-y-4/5 for this last
          fine-print caption — it visually belongs as a tail to the
          free-shipping bar above it, so 8/4px reads almost like a
          continuation of the same block. Tuned 2026-05-12. */}
      {memberNote && (
        <p
          className="font-body text-white/40 text-[12px] leading-relaxed !mt-2 md:!mt-0"
          style={{ maxWidth: "440px" }}
        >
          {memberNote}
        </p>
      )}
    </div>
  );
}
