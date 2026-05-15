"use client";

/**
 * CartDrawer — slide-in basket panel.
 *
 * Sits on top of the page as a right-anchored drawer. Closed by
 * default; opened by:
 *   - clicking the CartButton in the Navbar,
 *   - clicking any "Add to basket" CTA on a SKU page (auto-open),
 *   - hitting `Esc` (close).
 *
 * Layout (top → bottom):
 *   [Header]  "Your Basket" + item count + close button
 *   [Free-delivery progress bar]
 *   [Line items / empty state]
 *   [Footer]  subtotal + "Proceed to Checkout" CTA + VAT note
 *
 * Static-export friendly — everything client-side. Checkout is a
 * placeholder for now (cart-state is real but there's no payment
 * backend wired up). When you bolt on Stripe/Shopify, the CTA's
 * onClick is the single integration point.
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { formatPence } from "@/lib/cart/types";
import { CartEmpty } from "./CartEmpty";
import { CartLineItem } from "./CartLineItem";

export function CartDrawer() {
  const {
    items,
    count,
    subtotalPence,
    subtotalLabel,
    freeDeliveryThresholdPence,
    qualifiesForFreeDelivery,
    isDrawerOpen,
    closeDrawer,
    clear,
  } = useCart();

  // Close on Esc.
  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll while drawer is open.
  useEffect(() => {
    if (!isDrawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isDrawerOpen]);

  const remainingToFreeDelivery = Math.max(
    0,
    freeDeliveryThresholdPence - subtotalPence,
  );
  const progressPct = Math.min(
    100,
    (subtotalPence / freeDeliveryThresholdPence) * 100,
  );

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeDrawer}
            aria-hidden
            className="fixed inset-0 z-[120] bg-black/65 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.aside
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Cart"
            className="fixed top-0 right-0 bottom-0 z-[121] w-full sm:w-[480px] md:w-[520px] flex flex-col bg-[#080808] border-l border-white/[0.08] shadow-[0_0_60px_-10px_rgba(0,0,0,0.85)]"
          >
            {/* ── Header ───────────────────────────────────────── */}
            <header className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-white/[0.08]">
              <div>
                <p
                  className="font-display italic text-[#C8A96E] tracking-widest uppercase"
                  style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
                >
                  [ Basket ]
                </p>
                <h2
                  className="font-display italic text-cream leading-tight mt-1"
                  style={{ fontSize: "clamp(22px, 2.4vw, 32px)" }}
                >
                  Your Selection
                </h2>
                {count > 0 && (
                  <p
                    className="font-body font-light text-white/55 mt-0.5"
                    style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
                  >
                    {count} {count === 1 ? "item" : "items"}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="text-white/65 hover:text-[#C8A96E] transition-colors p-1"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M18 6 L 6 18" />
                  <path d="M6 6 L 18 18" />
                </svg>
              </button>
            </header>

            {/* ── Free-delivery progress (only shown when basket isn't empty) ── */}
            {items.length > 0 && (
              <div className="px-6 md:px-8 pt-4 pb-2 border-b border-white/[0.06]">
                <p
                  className="font-body font-light text-white/60 mb-2"
                  style={{ fontSize: "clamp(11px, 1vw, 12px)" }}
                >
                  {qualifiesForFreeDelivery ? (
                    <>
                      <span className="text-[#C8A96E]">
                        Free UK delivery
                      </span>{" "}
                      unlocked.
                    </>
                  ) : (
                    <>
                      Add{" "}
                      <span className="text-[#C8A96E]">
                        {formatPence(remainingToFreeDelivery)}
                      </span>{" "}
                      more for free UK delivery.
                    </>
                  )}
                </p>
                <div className="relative h-[2px] w-full bg-white/[0.08] overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#C8A96E]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            )}

            {/* ── Items / Empty ────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8">
              {items.length === 0 ? (
                <CartEmpty />
              ) : (
                <ul className="divide-y-0">
                  {items.map((item) => (
                    <CartLineItem key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </div>

            {/* ── Footer ───────────────────────────────────────── */}
            {items.length > 0 && (
              <footer className="border-t border-white/[0.08] px-6 md:px-8 py-5 md:py-6 bg-[#0a0a0a]">
                <div className="flex items-baseline justify-between mb-1">
                  <p
                    className="font-body font-light text-white/60 uppercase tracking-[0.22em]"
                    style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
                  >
                    Subtotal
                  </p>
                  <p
                    className="font-display italic text-cream tabular-nums"
                    style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
                  >
                    {subtotalLabel}
                  </p>
                </div>
                <p
                  className="font-body font-light text-white/40 mb-5"
                  style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
                >
                  Prices include UK VAT. Shipping calculated at checkout.
                </p>

                {/* Primary CTA — placeholder until a payment backend
                    (Stripe / Shopify / etc.) is wired up. Reaching
                    this CTA means cart-state is fully populated and
                    valid; the integration is "swap the onClick". */}
                <button
                  type="button"
                  onClick={() => {
                    // TODO: route to /checkout once payment backend
                    // is wired. For now, surface the placeholder.
                    window.alert(
                      "Checkout coming soon. Your basket is saved.",
                    );
                  }}
                  className="btn-cta w-full"
                >
                  Proceed to Checkout · {subtotalLabel}
                </button>

                <div className="flex items-center justify-between gap-4 mt-4">
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="font-body text-white/55 hover:text-[#C8A96E] uppercase tracking-[0.22em] transition-colors"
                    style={{ fontSize: "clamp(9px, 0.85vw, 11px)" }}
                  >
                    Continue Shopping
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm("Empty your entire basket?")
                      )
                        clear();
                    }}
                    className="font-body text-white/35 hover:text-[#C8A96E]/80 uppercase tracking-[0.22em] transition-colors"
                    style={{ fontSize: "clamp(9px, 0.85vw, 11px)" }}
                  >
                    Empty basket
                  </button>
                </div>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
