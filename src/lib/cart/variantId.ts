/**
 * Cart-merge ID resolver for SKU variants.
 *
 * Shared across PurchaseWidget, QuickAddButton, and StickyMobileCTA -
 * every ATB on a SKU page MUST route through this so the cart's
 * (slug, variantId) merge key is stable.
 *
 * Preferred path: every variant entry in a SKU page's `_VARIANTS`
 * array sets an explicit canonical `variantId` ("75cl" / "magnum" /
 * "case6"). Fallback: slugify the human label.
 *
 * Why a fallback at all: legacy SKU entries without explicit IDs
 * still work (cart line stays stable as long as the label doesn't
 * change). The fallback path is intended to fade out as all variant
 * arrays get explicit IDs - it exists for safety, not for everyday
 * use.
 */
interface VariantIdInput {
  /** Explicit canonical ID — preferred. */
  variantId?: string;
  /** Human-readable label — slugified if `variantId` is not set. */
  label: string;
}

export function variantIdFor(v: VariantIdInput, fallbackIdx: number = 0): string {
  if (v.variantId) return v.variantId;
  const slug = v.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `variant-${fallbackIdx}`;
}
