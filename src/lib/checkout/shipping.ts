/**
 * Shipping.ts - UK mainland shipping options for the checkout flow.
 *
 * Modelled on the policy live on ridgeview.co.uk (verified 2026-05-16):
 *   - UK Mainland only (Scotland + NI +1 day, no international shipping)
 *   - Standard delivery £5.50, FREE over £45 (matches cart drawer)
 *   - Next working day if ordered before noon
 *   - Max 36 bottles per order
 *
 * Pricing in pence (matches CartContext convention so totals never drift
 * via floating-point arithmetic).
 */

import type { CartItem } from "@/lib/cart/types";

export interface ShippingOption {
  /** Internal id used by the checkout form selection. */
  id: string;
  /** Label shown in the radio list. */
  label: string;
  /** Subtext (e.g. delivery time, conditions). */
  description: string;
  /** Cost in pence at this tier. */
  pricePence: number;
  /** Whether this option is the default selection. */
  isDefault?: boolean;
}

export const FREE_DELIVERY_THRESHOLD_PENCE = 4_500; // £45
export const STANDARD_SHIPPING_PENCE = 550; // £5.50
export const MAX_BOTTLES_PER_ORDER = 36;

/**
 * Compute available shipping options given the cart subtotal.
 * Standard tier prices to £0 once the subtotal crosses £45 (matches the
 * drawer's free-delivery progress bar).
 */
export function getShippingOptions(subtotalPence: number): ShippingOption[] {
  const qualifiesForFree = subtotalPence >= FREE_DELIVERY_THRESHOLD_PENCE;
  return [
    {
      id: "standard",
      label: qualifiesForFree
        ? "Standard UK Next-Working-Day · FREE"
        : `Standard UK Next-Working-Day · £${(STANDARD_SHIPPING_PENCE / 100).toFixed(2)}`,
      description:
        "Order before 12 pm on a working day for next-working-day delivery to UK mainland. Scotland and Northern Ireland +1 working day.",
      pricePence: qualifiesForFree ? 0 : STANDARD_SHIPPING_PENCE,
      isDefault: true,
    },
    {
      id: "nominated-day",
      label: "Nominated-Day Delivery · POA",
      description:
        "Choose a specific delivery date (subject to availability). Final cost confirmed after order placement by our customer team.",
      pricePence: 0, // Quoted post-order, not charged at checkout.
    },
    {
      id: "click-collect",
      label: "Click & Collect at the Estate · FREE",
      description:
        "Collect from Ridgeview Wine Estate, Fragbarrow Lane, Ditchling Common (Wine Bar & Shop opening hours). We'll email when your order is ready.",
      pricePence: 0,
    },
  ];
}

/** Total bottle count across the cart (for the 36-bottle cap). */
export function totalBottleCount(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    // "case6" variants count as 6 bottles; otherwise 1 bottle × quantity.
    const perUnit = /case/i.test(item.variantId) ? 6 : 1;
    return sum + perUnit * item.quantity;
  }, 0);
}

export function exceedsBottleCap(items: CartItem[]): boolean {
  return totalBottleCount(items) > MAX_BOTTLES_PER_ORDER;
}
