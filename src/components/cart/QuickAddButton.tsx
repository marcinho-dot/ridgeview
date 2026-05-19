"use client";

/**
 * QuickAddButton — variant-aware Add-to-Basket CTA.
 *
 * Each SKU page renders MULTIPLE Add-to-basket buttons:
 *   1. The PurchaseWidget's main ATB (variant + qty driven; wired
 *      internally via useCart inside the widget).
 *   2. A "quick add" button anchored next to the bottle in the hero.
 *   3. Optional "closing CTA" duplicates further down the page.
 *
 * (2) and (3) used to be hard-pinned to the 75cl variant via static
 * `default*` props — which created cart splits whenever the user
 * picked Magnum/Case in the PurchaseWidget then clicked one of these.
 * They are now CONTROLLED by the parent: the SKU page lifts
 * `variantIdx` state (it already does this for the hero bottle
 * image swap) and passes the live `variant` here. Every ATB on the
 * page therefore routes through the same active selection - one
 * cart line, correct merging.
 *
 * Marked with `data-atb-trigger` (configurable via prop) so the
 * StickyMobileCTA's IntersectionObserver counts this button as a
 * visible ATB and the sticky bar stays hidden while this one is
 * on screen.
 */

import { ReactNode } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { variantIdFor } from "@/lib/cart/variantId";
import { formatGBP, type Variant } from "@/components/sku/PurchaseWidget";

interface QuickAddButtonProps {
  /** Wine slug - e.g. "blanc-de-noirs". */
  slug: string;
  /** Display name - e.g. "Blanc de Noirs". */
  productName: string;
  /** Vintage tag - e.g. "2016", "NV". */
  vintage: string;
  /** Live variant from the parent's `variantIdx` state. Required —
   *  this is what makes the button respect the format selector. */
  variant: Variant;
  /** Index of the active variant (passed for `variantIdFor()`
   *  fallback when the variant has no explicit `variantId`).
   *  Defaults to 0. */
  variantIdx?: number;
  /** Optional image override for the cart line thumbnail. When
   *  undefined we fall back to `variant.image`, then to an empty
   *  string. Typically the parent passes the same dynamic
   *  `activeVariant.image` it uses to swap the hero bottle. */
  image?: string;
  /** Visible button copy. Defaults to "Add to basket". */
  children?: ReactNode;
  /** Whether to render the `data-atb-trigger` attribute. The
   *  StickyMobileCTA's observer counts these - set false on
   *  buttons that should NOT keep the sticky bar hidden. Default
   *  true. */
  triggerForSticky?: boolean;
  /** Tailwind / arbitrary classes - passed through to the button. */
  className?: string;
  /** Force the button into the disabled out-of-stock state. When
   *  undefined we read `variant.outOfStock`. */
  outOfStock?: boolean;
}

export function QuickAddButton({
  slug,
  productName,
  vintage,
  variant,
  variantIdx = 0,
  image,
  children = "Add to basket",
  triggerForSticky = true,
  className = "btn-cta",
  outOfStock,
}: QuickAddButtonProps) {
  const { add, openDrawer } = useCart();
  const oos = outOfStock ?? variant.outOfStock ?? false;

  return (
    <button
      type="button"
      {...(triggerForSticky ? { "data-atb-trigger": "" } : {})}
      onClick={() => {
        if (oos) return;
        add({
          slug,
          name: productName,
          vintage,
          variantId: variantIdFor(variant, variantIdx),
          variantLabel: variant.label,
          unitPricePence: Math.round(variant.price * 100),
          priceLabel: formatGBP(variant.price),
          image: image ?? variant.image ?? "",
          quantity: 1,
        });
        openDrawer();
      }}
      disabled={oos}
      aria-disabled={oos}
      className={`${className} ${oos ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {oos ? "Out of Stock" : children}
    </button>
  );
}
