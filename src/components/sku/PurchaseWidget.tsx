"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart/CartContext";
import { variantIdFor } from "@/lib/cart/variantId";
import { basePath } from "@/lib/basePath";

/**
 * PurchaseWidget - composable purchase block for SKU pages.
 * Bundles: Variant-Selector + Quantity-Selector + Free-Shipping-Bar + ATB Button.
 *
 * The ATB button dispatches to the global cart (CartContext) using
 * the (slug, variantId) merge key - same wine + same variant
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
  /** Stable id for cart merging. Defaults to a slug of `label` -
   *  e.g. "75cl Bottle" → "75cl-bottle". Set explicitly for the
   *  3 canonical variants: "75cl", "magnum", "case6". */
  variantId?: string;
  /** Optional format-specific bottle/case shot. When the parent
   *  page lifts variant state via `variantIdx` + `onVariantChange`,
   *  it can swap the hero image to match (e.g. show the Magnum
   *  bottle when the Magnum variant is clicked). Falls back to
   *  the page's default 75cl bottle image when undefined. */
  image?: string;
  /** Optional pre-discount price (GBP). Set on bundle variants that
   *  ship at a saving - typically a Case of 6 (= 6× single-bottle
   *  list price). When present, the widget renders a strikethrough
   *  next to the actual price so the saving is visually concrete:
   *  "£183.60  ~~£204.00~~". The "Save 10%" badge on the variant
   *  detail line then has a £-amount the eye can anchor to. Leave
   *  undefined for full-price variants (75cl, magnums). */
  originalPrice?: number;
  /** Mark the variant as out of stock. The ATB button switches to a
   *  disabled "Out of Stock" state, the free-shipping bar hides,
   *  and the cart dispatch is short-circuited. Format selector
   *  stays interactive so the user can flip to other variants. */
  outOfStock?: boolean;
}

interface Props {
  variants: Variant[];
  /** Free-shipping threshold in GBP. Default £45. */
  freeShippingThreshold?: number;
  /** Member-price discount note shown under price. */
  memberNote?: string;
  /** Optional path to this wine's technical sheet PDF (relative to /public,
   *  e.g. "/pdfs/tech-sheets/bloomsbury-nv.pdf"). When set, renders a
   *  compact download chip directly below the member-note — same
   *  hero-screen as the price + ATB, ideal for sommeliers/trade. */
  techSheetPdf?: string;
  /** When true AND every variant is out of stock, the ATB button is
   *  replaced with a Notify-Me email-capture form. Visitors leave their
   *  address so they can be told when the wine returns. Drives interest
   *  on rare/late-disgorged releases instead of a dead-end disabled CTA. */
  notifyMeOnOOS?: boolean;
  /** id on the ATB-button for the StickyMobileCTA IntersectionObserver. */
  ctaId?: string;
  /** Wine identity - required for cart line items. */
  slug: string;
  productName: string;
  vintage: string;
  /** Bottle thumbnail path (will be served via basePath at render). */
  image: string;
  /** Optional callback fired AFTER the cart add (e.g. for analytics). */
  onAddToBasket?: (selection: { variant: Variant; quantity: number; total: number }) => void;
  /** Controlled variant index. When set together with `onVariantChange`
   *  the widget becomes fully controlled - the parent owns variant
   *  state and can wire the hero bottle image to track variant clicks
   *  (Magnum / Case-of-6 image swap). Leave both undefined for the
   *  default self-contained behaviour. */
  variantIdx?: number;
  onVariantChange?: (idx: number, variant: Variant) => void;
}

export const formatGBP = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 }).format(n);

export function PurchaseWidget({
  variants,
  freeShippingThreshold = 45,
  memberNote = "20% off for members. Add a free personalised gift note at checkout.",
  techSheetPdf,
  notifyMeOnOOS = false,
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

  // Notify-Me form state — only used when every variant is OOS and the
  // parent SKU page opted in via notifyMeOnOOS.
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  const variant = variants[variantIdx];
  const total = variant.price * quantity;
  const remaining = Math.max(0, freeShippingThreshold - total);
  const freeShippingMet = remaining === 0;
  const progressPct = Math.min(100, (total / freeShippingThreshold) * 100);
  const isOOS = !!variant.outOfStock;
  const allVariantsOOS = variants.every((v) => v.outOfStock);
  const showNotifyMe = notifyMeOnOOS && allVariantsOOS;

  // On submit: open the user's mail client with a pre-filled message to
  // the Ridgeview team. No backend needed — the team receives a real
  // email from the visitor's own address, which they can reply to once
  // the wine is back in stock. Flips local state to a "thank you"
  // confirmation either way so the form doesn't look broken if the
  // mail client doesn't open.
  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail.trim()) return;
    const subject = `Notify me when ${productName} is back in stock`;
    const body =
      `Hello,\n\n` +
      `Please add my email to the notify list for ${productName}` +
      (vintage ? ` (${vintage})` : "") +
      `. I'd like to be contacted when this wine returns to stock.\n\n` +
      `Email: ${notifyEmail}\n\n` +
      `Thank you.\n`;
    window.location.href = `mailto:info@ridgeview.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotifySubmitted(true);
  };

  const handleAdd = () => {
    if (isOOS) return;
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
        <div className="flex items-baseline gap-3 flex-wrap">
          <p
            className="font-display italic text-cream"
            style={{ fontSize: "clamp(32px, 3.6vw, 48px)", fontWeight: 400 }}
          >
            {formatGBP(total)}
          </p>
          {variant.originalPrice && variant.originalPrice > variant.price && (
            <p
              className="font-body text-white/40 line-through tabular-nums"
              style={{ fontSize: "clamp(16px, 1.7vw, 20px)", fontWeight: 400 }}
              aria-label="Original price"
            >
              {formatGBP(variant.originalPrice * quantity)}
            </p>
          )}
        </div>
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

        {/* ATB Button vs Notify-Me Form. data-atb-trigger ties into the
            StickyMobileCTA observer. When the active variant is OOS the
            button is disabled and short-circuits. When EVERY variant is
            OOS AND notifyMeOnOOS is set, the button is replaced entirely
            with an email-capture form so visitors can register interest. */}
        {showNotifyMe ? (
          notifySubmitted ? (
            <p
              className="font-body text-[#C8A96E] leading-relaxed flex-1 self-center"
              style={{ fontSize: "13px", fontWeight: 400 }}
              role="status"
              aria-live="polite"
            >
              ✓ Thank you — we&rsquo;ll be in touch when {productName} returns.
            </p>
          ) : (
            <form
              onSubmit={handleNotifySubmit}
              className="flex items-stretch border border-[#C8A96E]/40 hover:border-[#C8A96E]/70 focus-within:border-[#C8A96E] rounded-sm bg-white/[0.03] transition-colors duration-300 flex-1 max-w-[420px]"
              aria-label={`Notify me when ${productName} is back in stock`}
            >
              <input
                type="email"
                inputMode="email"
                required
                placeholder="Your email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                className="flex-1 bg-transparent border-0 px-4 py-3 font-body text-cream text-[13px] tracking-wide placeholder:text-white/45 focus:outline-none"
                style={{ fontWeight: 300 }}
              />
              <button
                id={ctaId}
                type="submit"
                className="font-body text-[#C8A96E] hover:text-cream uppercase tracking-[0.22em] border-l border-[#C8A96E]/40 hover:bg-[#C8A96E]/[0.08] px-4 py-3 transition-all duration-300 whitespace-nowrap"
                style={{ fontSize: "10px", fontWeight: 500 }}
              >
                Notify Me
              </button>
            </form>
          )
        ) : (
          <button
            id={ctaId}
            data-atb-trigger
            type="button"
            onClick={handleAdd}
            disabled={isOOS}
            aria-disabled={isOOS}
            className={`btn-cta ${isOOS ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {isOOS ? "Out of Stock" : `Add to basket · ${formatGBP(total)}`}
          </button>
        )}
      </div>

      {/* ── Free Shipping Bar ──────────────────────────────────────
          Hidden when the active variant is out of stock - no point
          dangling a free-shipping promise on an un-buyable item. */}
      <div aria-live="polite" className={`space-y-1.5 ${isOOS ? "hidden" : ""}`}>
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
          fine-print caption - it visually belongs as a tail to the
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

      {/* ── Technical Sheet download — chip directly under the member note.
          Compact gold-accent affordance for sommeliers, trade and curious
          enthusiasts. Sits inside the hero screen so it doesn't compete
          with the ATB button but is still discoverable above the fold. */}
      {techSheetPdf && (
        <a
          href={`${basePath}${techSheetPdf}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 self-start !mt-3 md:!mt-2 border border-[#C8A96E]/30 hover:border-[#C8A96E]/70 hover:bg-[#C8A96E]/[0.06] rounded-sm px-3 py-2 transition-all duration-400"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#C8A96E] group-hover:text-cream transition-colors"
            aria-hidden
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span
            className="font-body text-[#C8A96E] group-hover:text-cream uppercase tracking-[0.22em] transition-colors"
            style={{ fontSize: "10px", fontWeight: 500 }}
          >
            Technical Sheet
          </span>
          <span
            aria-hidden
            className="font-body text-white/40 group-hover:text-white/60 tracking-[0.1em] transition-colors"
            style={{ fontSize: "10px", fontWeight: 300 }}
          >
            · PDF
          </span>
        </a>
      )}
    </div>
  );
}
