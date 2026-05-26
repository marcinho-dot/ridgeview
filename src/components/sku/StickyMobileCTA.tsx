"use client";

import { RefObject, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";
import { useCart } from "@/lib/cart/CartContext";
import { variantIdFor } from "@/lib/cart/variantId";
import { formatGBP, type Variant } from "@/components/sku/PurchaseWidget";

/**
 * StickyMobileCTA — Mobile-only sticky bottom bar mit "Add to basket" CTA.
 *
 * - Zeigt sich automatisch, sobald die ursprünglichen Hero-CTAs (referenziert
 *   via `triggerRef`) aus dem Viewport scrollen.
 * - Ersetzt auf SKU-Pages die generische BottomNav, weil hier die wichtigste
 *   mobile Aktion "Add to basket" sein soll, nicht "Home / View All Wines".
 * - Slide-up Animation analog zur BottomNav.
 *
 * Cart-Integration: the ATB on this sticky bar is CONTROLLED by the
 * parent's `variantIdx` state — exactly the same active variant that
 * the PurchaseWidget and QuickAddButton operate on. Every ATB on the
 * page therefore routes through one selection. The displayed price
 * label updates live when the user picks Magnum or Case in the
 * PurchaseWidget upstream.
 */

interface Props {
  productName: string;
  /** Pfad zum Flaschen-Thumbnail, RELATIV zu /public/, ohne basePath.
   *  Typically the parent passes `activeVariant.image` so the
   *  thumbnail matches the selected format. */
  thumbnailSrc: string;
  /** Wine slug + vintage for cart line identity. */
  slug: string;
  vintage: string;
  /** Live variant from the parent's `variantIdx` state — drives both
   *  the visible price label AND the cart dispatch. */
  variant: Variant;
  /** Index of the active variant (used by `variantIdFor()` fallback
   *  when the variant has no explicit `variantId`). Defaults to 0. */
  variantIdx?: number;
  /**
   * Trigger - entweder ein Ref auf EIN spezifisches Element ODER eine
   * DOM-id (kein "#"-Präfix) für SINGLE-element observation, ODER
   * `triggerSelector` für MULTI-element observation: der Sticky erscheint
   * dann nur, wenn KEINER der gematchten Elemente im Viewport ist
   * (typischer Use-Case: alle Add-to-Basket-Buttons gleichzeitig
   * beobachten, sodass die Bar verschwindet sobald irgendein ATB sichtbar
   * wird).
   */
  triggerRef?: RefObject<HTMLElement | null>;
  triggerId?: string;
  triggerSelector?: string;
  onAddToBasket?: () => void;
  /** Optional: Link für den "Back to Shop"-Sekundär-CTA. */
  backHref?: string;
  /** Force the disabled out-of-stock state. When undefined we read
   *  `variant.outOfStock`. Sticky ATB switches to "Out of Stock"
   *  label and cart dispatch is short-circuited. */
  outOfStock?: boolean;
}

export function StickyMobileCTA({
  productName,
  thumbnailSrc,
  slug,
  vintage,
  variant,
  variantIdx = 0,
  triggerRef,
  triggerId,
  triggerSelector,
  onAddToBasket,
  backHref,
  outOfStock,
}: Props) {
  const { add, openDrawer } = useCart();
  const [show, setShow] = useState(false);
  const oos = outOfStock ?? variant.outOfStock ?? false;
  const priceLabel = formatGBP(variant.price);

  useEffect(() => {
    // Multi-element mode: show sticky only when NONE of the targets are visible.
    if (triggerSelector) {
      const targets = Array.from(document.querySelectorAll<HTMLElement>(triggerSelector));
      if (!targets.length) return;
      const visible = new Set<Element>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target);
            else visible.delete(entry.target);
          }
          setShow(visible.size === 0);
        },
        { rootMargin: "0px 0px 0px 0px", threshold: 0 },
      );
      targets.forEach((t) => observer.observe(t));
      return () => observer.disconnect();
    }

    // Single-element mode (legacy)
    const target: HTMLElement | null =
      triggerRef?.current ?? (triggerId ? document.getElementById(triggerId) : null);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { rootMargin: "0px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [triggerRef, triggerId, triggerSelector]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-xl border-t border-white/[0.08] px-4 py-3 flex items-center gap-3"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}${thumbnailSrc}`}
            alt=""
            aria-hidden
            className="w-11 h-11 object-contain shrink-0 [filter:drop-shadow(0_4px_10px_rgba(0,0,0,0.5))]"
          />

          {/* Name + Price */}
          <div className="flex-1 min-w-0">
            <p
              className="font-display italic text-cream leading-[1.15] truncate"
              style={{ fontSize: "15px", fontWeight: 400 }}
            >
              {productName}
            </p>
            <p className="font-body text-white/55 text-[11px] mt-0.5">{priceLabel}</p>
          </div>

          {/* Optional secondary "back to shop" - only icon-style on small screens */}
          {backHref && (
            <a
              href={backHref}
              aria-label="Back to shop"
              className="hidden xs:inline-flex font-body text-white/55 hover:text-[#C8A96E] text-[10px] uppercase tracking-[0.2em] border border-white/15 hover:border-[#C8A96E]/40 px-3 py-2.5 rounded-sm transition-all duration-300 shrink-0"
            >
              Shop
            </a>
          )}

          {/* Primary CTA - Add to basket (shared .btn-cta so every CTA on
              the site is visually identical). Dispatches the *active*
              variant (from parent state) so all ATBs on the page merge
              into one cart line per format. */}
          <button
            type="button"
            onClick={() => {
              if (oos) return;
              add({
                slug,
                name: productName,
                vintage,
                variantId: variantIdFor(variant, variantIdx),
                variantLabel: variant.label,
                unitPricePence: Math.round(variant.price * 100),
                priceLabel,
                image: thumbnailSrc,
                quantity: 1,
              });
              openDrawer();
              onAddToBasket?.();
            }}
            disabled={oos}
            aria-disabled={oos}
            className={`btn-cta shrink-0 ${oos ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {oos ? "Out of Stock" : "Add to basket"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
