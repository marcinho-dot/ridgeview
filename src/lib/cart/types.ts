/**
 * Cart data model.
 *
 * A `CartItem` represents one *line* in the basket — a wine + variant +
 * quantity. Two items with the same `slug` but different variants
 * (e.g. 75cl Bottle vs. Magnum) live as separate lines. Adding the
 * same (slug, variantId) again increments the quantity of the
 * existing line instead of creating a duplicate.
 *
 * Prices are stored as `pence` integers throughout — float arithmetic
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
  /** Wine slug — e.g. "bloomsbury". Links the line back to the SKU
   *  detail page (`/wine/<slug>/`). */
  slug: string;
  /** Display name — e.g. "Bloomsbury". */
  name: string;
  /** Vintage tag — e.g. "NV", "2020", "Late-Disgorged". */
  vintage: string;
  /** Stable variant identifier (e.g. "75cl", "magnum", "case6").
   *  Different variants of the same wine are separate lines. */
  variantId: string;
  /** Human variant label — e.g. "75cl Bottle", "Magnum · 1.5L". */
  variantLabel: string;
  /** Unit price in pence (£34 → 3400). */
  unitPricePence: number;
  /** Frozen display label — e.g. "£34". Captured at add-to-cart
   *  time to avoid stale-label issues if the upstream price changes. */
  priceLabel: string;
  /** Bottle PNG / thumbnail — e.g. "/products/bloomsbury.png". */
  image: string;
  /** Number of this variant in the basket. */
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

/** Public API surfaced by `useCart()`. */
export interface CartContextValue {
  items: CartItem[];
  /** Sum of quantities across all lines — used by the navbar badge. */
  count: number;
  /** Subtotal in pence (still pre-shipping, pre-discount). */
  subtotalPence: number;
  /** Subtotal formatted for display — e.g. "£234.00". */
  subtotalLabel: string;
  /** Free-delivery threshold (pence). Cart UI surfaces the gap if
   *  the basket sits below this. Default: 10 000 (£100). */
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
  /** Set to a line id briefly after a successful add — the line item
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
}

/** Build the canonical line id from (slug, variantId). Exposed for
 *  scenarios where you need to query an existing line without first
 *  calling `add` (e.g. checking "is this variant already in basket?"). */
export const lineId = (slug: string, variantId: string): string =>
  `${slug}::${variantId}`;

/** Format pence as a GBP label — "£34", "£183.60", etc. Drops the
 *  decimal when zero. Used by the cart subtotal + line subtotal. */
export function formatPence(pence: number): string {
  const pounds = pence / 100;
  if (Number.isInteger(pounds)) return `£${pounds}`;
  return `£${pounds.toFixed(2)}`;
}
