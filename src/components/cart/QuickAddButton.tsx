"use client";

/**
 * QuickAddButton - reusable wired Add-to-Basket CTA.
 *
 * Each SKU page renders MULTIPLE Add-to-basket buttons:
 *   1. The PurchaseWidget's main ATB (variant + qty driven; already
 *      wired internally via useCart inside the widget).
 *   2. A "quick add" button anchored next to the bottle in the hero.
 *   3. A "closing CTA" duplicate near the bottom of the page.
 *
 * (2) and (3) historically had no onClick - clicking did nothing.
 * QuickAddButton wires them: it dispatches a one-quantity add of the
 * default 75cl variant to the cart and opens the drawer. Users who
 * want Magnum/Case use the full PurchaseWidget upstream.
 *
 * Marked with `data-atb-trigger` (configurable via prop) so the
 * StickyMobileCTA's IntersectionObserver counts this button as a
 * visible ATB and the sticky bar stays hidden while this one is
 * on screen.
 */

import { ReactNode } from "react";
import { useCart } from "@/lib/cart/CartContext";

interface QuickAddButtonProps {
  /** Wine slug - e.g. "blanc-de-noirs". */
  slug: string;
  /** Display name - e.g. "Blanc de Noirs". */
  productName: string;
  /** Vintage tag - e.g. "2016", "NV". */
  vintage: string;
  /** Bottle thumbnail path - e.g. "/products/blanc-de-noirs.png". */
  image: string;
  /** Default variant added on click - typically the 75cl bottle. */
  defaultVariantId: string;
  defaultVariantLabel: string;
  defaultUnitPricePence: number;
  /** Frozen display label - e.g. "£60". Used as the line's priceLabel. */
  defaultPriceLabel: string;
  /** Visible button copy. Defaults to "Add to basket". */
  children?: ReactNode;
  /** Whether to render the `data-atb-trigger` attribute. The
   *  StickyMobileCTA's observer counts these - set false on
   *  buttons that should NOT keep the sticky bar hidden. Default
   *  true. */
  triggerForSticky?: boolean;
  /** Tailwind / arbitrary classes - passed through to the button. */
  className?: string;
  /** Mark the default variant as out of stock. Button becomes
   *  disabled, label switches to "Out of Stock", and the cart
   *  dispatch short-circuits. Pass-through of the same flag set
   *  on the PurchaseWidget Variant. */
  outOfStock?: boolean;
}

export function QuickAddButton({
  slug,
  productName,
  vintage,
  image,
  defaultVariantId,
  defaultVariantLabel,
  defaultUnitPricePence,
  defaultPriceLabel,
  children = "Add to basket",
  triggerForSticky = true,
  className = "btn-cta",
  outOfStock = false,
}: QuickAddButtonProps) {
  const { add, openDrawer } = useCart();

  return (
    <button
      type="button"
      {...(triggerForSticky ? { "data-atb-trigger": "" } : {})}
      onClick={() => {
        if (outOfStock) return;
        add({
          slug,
          name: productName,
          vintage,
          variantId: defaultVariantId,
          variantLabel: defaultVariantLabel,
          unitPricePence: defaultUnitPricePence,
          priceLabel: defaultPriceLabel,
          image,
          quantity: 1,
        });
        openDrawer();
      }}
      disabled={outOfStock}
      aria-disabled={outOfStock}
      className={`${className} ${outOfStock ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {outOfStock ? "Out of Stock" : children}
    </button>
  );
}
