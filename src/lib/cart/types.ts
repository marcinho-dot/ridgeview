/**
 * Cart data model.
 *
 * A `CartItem` represents one *line* in the basket - a wine + variant +
 * quantity. Two items with the same `slug` but different variants
 * (e.g. 75cl Bottle vs. Magnum) live as separate lines. Adding the
 * same (slug, variantId) again increments the quantity of the
 * existing line instead of creating a duplicate.
 *
 * Prices are stored as `pence` integers throughout - float arithmetic
 * on £36.00 + £85.00 has rounding traps that show up at the £000s
 * subtotal level. The display formatter converts to "£X.YY" only at
 * render time. (`priceLabel` is the human label like "£34" and is
 * frozen at add-to-cart time so subsequent price changes upstream
 * don't silently re-label an existing line.)
 */

export interface CartItem {
  /** Canonical line id: `<slug>::<variantId>`. Used as React key + as
   *  the merge key when adding "the same thing" twice. */
  id: string;
  /** Wine slug - e.g. "bloomsbury". Links the line back to the SKU
   *  detail page (`/wine/<slug>/`). */
  slug: string;
  /** Display name - e.g. "Bloomsbury". */
  name: string;
  /** Vintage tag - e.g. "NV", "2020", "Late-Disgorged". */
  vintage: string;
  /** Stable variant identifier (e.g. "75cl", "magnum", "case6").
   *  Different variants of the same wine are separate lines. */
  variantId: string;
  /** Human variant label - e.g. "75cl Bottle", "Magnum · 1.5L". */
  variantLabel: string;
  /** Unit price in pence (£34 → 3400). */
  unitPricePence: number;
  /** Frozen display label - e.g. "£34". Captured at add-to-cart
   *  time to avoid stale-label issues if the upstream price changes. */
  priceLabel: string;
  /** Bottle PNG / thumbnail - e.g. "/products/bloomsbury.png". */
  image: string;
  /** Number of this variant in the basket. */
  quantity: number;
  /** Optional free-text note shown under the line — e.g. gift-membership
   *  recipient details. Carries through cart → checkout → order. */
  note?: string;
}

export interface CartState {
  items: CartItem[];
}

/** Public API surfaced by `useCart()`. */
export interface CartContextValue {
  items: CartItem[];
  /** Sum of quantities across all lines - used by the navbar badge. */
  count: number;
  /** Gross subtotal in pence (includes VAT, pre-shipping). The
   *  unit prices in `wines.ts` are UK-retail-style gross prices -
   *  VAT is already baked in. */
  subtotalPence: number;
  /** Gross subtotal formatted for display - e.g. "£234.00". */
  subtotalLabel: string;
  /** Net portion (ex-VAT) of the subtotal, in pence. */
  netPence: number;
  /** Net subtotal formatted - e.g. "£195.00". */
  netLabel: string;
  /** VAT portion of the subtotal, in pence. UK rate is 20 % on
   *  alcohol → VAT = gross × (rate / (1 + rate)) = gross / 6. */
  vatPence: number;
  /** VAT formatted - e.g. "£39.00". */
  vatLabel: string;
  /** Display percentage for the VAT line - "20%" today. */
  vatRateLabel: string;
  /** Free-delivery threshold (pence). Cart UI surfaces the gap if
   *  the basket sits below this. Default: 4 500 (£45) - matches
   *  the PurchaseWidget's `freeShippingThreshold` default. */
  freeDeliveryThresholdPence: number;
  /** Whether the basket has crossed the free-delivery line. */
  qualifiesForFreeDelivery: boolean;

  /** Add or merge a line. If a line with the same `(slug, variantId)`
   *  already exists, its quantity is increased by `input.quantity`
   *  (default 1). Returns the resulting line id so callers can scroll
   *  to it / animate it. */
  add: (input: AddInput) => string;
  /** Set the quantity of a line. Quantity ≤ 0 removes it. */
  setQuantity: (id: string, quantity: number) => void;
  /** Remove a line entirely. */
  remove: (id: string) => void;
  /** Empty the basket (e.g. after a successful checkout). */
  clear: () => void;

  /** Open / close the cart drawer. Buttons that add to the basket
   *  call `open()` so the user gets a visual confirmation. */
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  /** Set to a line id briefly after a successful add - the line item
   *  in the drawer + the navbar badge can read this and play a
   *  micro pulse. Auto-clears after ~1.2 s. */
  recentlyAddedId: string | null;
}

/** Input shape for `cart.add(...)`. */
export interface AddInput {
  slug: string;
  name: string;
  vintage: string;
  variantId: string;
  variantLabel: string;
  unitPricePence: number;
  priceLabel: string;
  image: string;
  quantity?: number;
  note?: string;
}

/** Build the canonical line id from (slug, variantId). Exposed for
 *  scenarios where you need to query an existing line without first
 *  calling `add` (e.g. checking "is this variant already in basket?"). */
export const lineId = (slug: string, variantId: string): string =>
  `${slug}::${variantId}`;

/** Format pence as a GBP label - "£34", "£183.60", etc. Drops the
 *  decimal when zero. Used by the cart subtotal + line subtotal. */
export function formatPence(pence: number): string {
  const pounds = pence / 100;
  if (Number.isInteger(pounds)) return `£${pounds}`;
  return `£${pounds.toFixed(2)}`;
}

/** UK standard VAT rate on wine + sparkling wine (since 2011). */
export const UK_VAT_RATE = 0.2;

/** Split a gross (VAT-inclusive) pence amount into net + VAT pence.
 *  Math is exact at integer pence - `net + vat === gross`. UK retail
 *  pricing is gross-inclusive, so the unit prices already contain
 *  the VAT; this function just exposes the split for display. */
export function vatBreakdown(grossPence: number): {
  netPence: number;
  vatPence: number;
} {
  // gross = net × (1 + r)  →  vat = gross × r / (1 + r)
  // For r = 0.20 that's gross / 6 - clean, round-to-nearest pence.
  const vatPence = Math.round(grossPence * UK_VAT_RATE / (1 + UK_VAT_RATE));
  const netPence = grossPence - vatPence;
  return { netPence, vatPence };
}
