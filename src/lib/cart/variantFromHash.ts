import type { Variant } from "@/components/sku/PurchaseWidget";

/**
 * Read the current URL hash and return the matching variant index in
 * the given variants array, or 0 if no match.
 *
 * Used by every SKU page's `useState(() => …)` initializer so that
 * deep links like `/wine/bloomsbury#case6` arrive with the Case
 * variant pre-selected in the PurchaseWidget (and the hero bottle
 * already swapped to the case shot).
 *
 * Why an initializer instead of useEffect: setting the variant via
 * useEffect would cause a flicker — first the 75cl bottle paints,
 * then case-of-6 swaps in. The initializer runs synchronously on
 * first render so the page hydrates with the correct variant from
 * the start.
 */
export function initialVariantIdxFromHash(variants: Variant[]): number {
  if (typeof window === "undefined") return 0;
  const hash = window.location.hash.slice(1);
  if (!hash) return 0;
  const idx = variants.findIndex((v) => v.variantId === hash);
  return idx >= 0 ? idx : 0;
}
