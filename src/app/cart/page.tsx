"use client";

/**
 * /cart — full-page basket overview.
 *
 * Lives alongside the existing right-anchored cart drawer (which is a
 * mini-cart, opened from the navbar). This page is the "expanded" view
 * you reach via the drawer's "View Full Basket" link or directly with
 * the /cart URL — it gives line items more breathing room, exposes
 * delivery + VAT detail inline, and serves as the natural pre-checkout
 * stop where a customer can review everything calmly before hitting
 * Proceed to Checkout.
 *
 * Cart state comes from the same CartContext as the drawer, so any
 * edit here (qty change, remove) is reflected in the drawer and vice
 * versa — single source of truth.
 *
 * Static-export-friendly: no server state. The "Proceed to Checkout"
 * CTA navigates to /checkout (full payment flow placeholder until the
 * Aufsichtsrat provides the payment-provider integration details).
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart/CartContext";
import { formatPence } from "@/lib/cart/types";
import { basePath } from "@/lib/basePath";
import {
  FREE_DELIVERY_THRESHOLD_PENCE,
  STANDARD_SHIPPING_PENCE,
  MAX_BOTTLES_PER_ORDER,
  totalBottleCount,
  exceedsBottleCap,
} from "@/lib/checkout/shipping";

export default function CartPage() {
  const {
    items,
    count,
    subtotalPence,
    subtotalLabel,
    vatLabel,
    vatRateLabel,
    qualifiesForFreeDelivery,
    setQuantity,
    remove,
    clear,
  } = useCart();

  const bottleCount = totalBottleCount(items);
  const overCap = exceedsBottleCap(items);
  const remainingToFree = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD_PENCE - subtotalPence,
  );
  const progressPct = Math.min(
    100,
    (subtotalPence / FREE_DELIVERY_THRESHOLD_PENCE) * 100,
  );

  // Shipping estimate for the order summary (matches checkout default).
  const shippingEstimatePence = qualifiesForFreeDelivery
    ? 0
    : STANDARD_SHIPPING_PENCE;
  const orderTotalPence = subtotalPence + shippingEstimatePence;

  return (
    <>
      <Navbar />
      <main className="bg-[#010101] min-h-screen pt-28 md:pt-32 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* ── Page header ────────────────────────────────────── */}
          <header className="mb-10 md:mb-14">
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-3"
              style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
            >
              [ Your Basket ]
            </p>
            <h1
              className="font-display italic text-cream leading-[1.05]"
              style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
            >
              Review your selection.
            </h1>
            {count > 0 && (
              <p
                className="mt-3 font-body font-light text-white/55"
                style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}
              >
                {count} {count === 1 ? "item" : "items"} · {bottleCount}{" "}
                {bottleCount === 1 ? "bottle" : "bottles"}
              </p>
            )}
          </header>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16">
              {/* ── Line items ──────────────────────────────── */}
              <section aria-label="Basket items">
                <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-5 md:gap-8 py-6 md:py-8"
                    >
                      {/* Thumbnail */}
                      <Link
                        href={`/wine/${item.slug}/`}
                        className="shrink-0 relative w-[90px] md:w-[120px] aspect-[3/4] rounded-sm overflow-hidden bg-white/[0.02]"
                      >
                        <Image
                          src={`${basePath}${item.image}`}
                          alt={`${item.name} ${item.vintage}`.trim()}
                          fill
                          sizes="(max-width: 768px) 90px, 120px"
                          className="object-contain p-2"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <Link
                                href={`/wine/${item.slug}/`}
                                className="block font-display italic text-cream hover:text-[#C8A96E] transition-colors leading-tight"
                                style={{
                                  fontSize: "clamp(18px, 1.8vw, 24px)",
                                }}
                              >
                                {item.name}
                              </Link>
                              <p
                                className="mt-1 font-body font-light text-white/50 uppercase tracking-[0.22em]"
                                style={{ fontSize: "clamp(9px, 0.85vw, 11px)" }}
                              >
                                {item.vintage} · {item.variantLabel}
                              </p>
                            </div>
                            <p
                              className="font-body font-light text-cream tabular-nums whitespace-nowrap"
                              style={{ fontSize: "clamp(14px, 1.3vw, 17px)" }}
                            >
                              {formatPence(
                                item.unitPricePence * item.quantity,
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Qty + remove */}
                        <div className="mt-4 flex items-center justify-between gap-4">
                          <QuantityStepper
                            value={item.quantity}
                            onChange={(q) => setQuantity(item.id, q)}
                          />
                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            className="font-body text-white/45 hover:text-[#C8A96E] uppercase tracking-[0.22em] transition-colors"
                            style={{ fontSize: "clamp(9px, 0.85vw, 11px)" }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Empty basket / continue shopping ----------------- */}
                <div className="mt-8 flex items-center justify-between gap-4">
                  <Link
                    href="/wines"
                    className="font-body text-white/65 hover:text-[#C8A96E] uppercase tracking-[0.22em] transition-colors"
                    style={{ fontSize: "clamp(10px, 0.95vw, 12px)" }}
                  >
                    ← Continue Shopping
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm("Remove every item from your basket?")
                      )
                        clear();
                    }}
                    className="font-body text-white/35 hover:text-[#C8A96E]/80 uppercase tracking-[0.22em] transition-colors"
                    style={{ fontSize: "clamp(9px, 0.85vw, 11px)" }}
                  >
                    Empty basket
                  </button>
                </div>
              </section>

              {/* ── Order summary ───────────────────────────── */}
              <aside aria-label="Order summary" className="lg:sticky lg:top-28 lg:self-start">
                <div className="border border-white/[0.08] bg-[#0a0a0a] p-6 md:p-8 rounded-sm">
                  <p
                    className="font-display italic text-[#C8A96E] tracking-widest mb-4"
                    style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
                  >
                    [ Summary ]
                  </p>
                  <h2
                    className="font-display italic text-cream leading-tight mb-6"
                    style={{ fontSize: "clamp(22px, 2.2vw, 28px)" }}
                  >
                    Order Total
                  </h2>

                  {/* Subtotal */}
                  <div className="flex items-baseline justify-between pb-3 border-b border-white/[0.06]">
                    <span
                      className="font-body font-light text-white/65 uppercase tracking-[0.22em]"
                      style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
                    >
                      Subtotal
                    </span>
                    <span
                      className="font-body font-light text-cream tabular-nums"
                      style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}
                    >
                      {subtotalLabel}
                    </span>
                  </div>

                  {/* Shipping estimate */}
                  <div className="flex items-baseline justify-between pt-3 pb-3 border-b border-white/[0.06]">
                    <span
                      className="font-body font-light text-white/65 uppercase tracking-[0.22em]"
                      style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
                    >
                      Shipping (UK mainland)
                    </span>
                    <span
                      className="font-body font-light text-cream tabular-nums"
                      style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}
                    >
                      {shippingEstimatePence === 0
                        ? "FREE"
                        : formatPence(shippingEstimatePence)}
                    </span>
                  </div>

                  {/* Free-delivery progress */}
                  <div className="pt-4">
                    <div className="relative h-[2px] w-full bg-white/[0.08] overflow-hidden rounded-full">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-[#C8A96E]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </div>
                    <p
                      className="mt-2 font-body font-light text-white/55"
                      style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
                    >
                      {qualifiesForFreeDelivery ? (
                        <span className="text-[#C8A96E]">
                          Free UK delivery unlocked.
                        </span>
                      ) : (
                        <>
                          <span className="text-[#C8A96E]">
                            {formatPence(remainingToFree)}
                          </span>{" "}
                          to free UK delivery.
                        </>
                      )}
                    </p>
                  </div>

                  {/* Total + VAT */}
                  <div className="flex items-baseline justify-between pt-6 mt-4 border-t border-white/[0.06]">
                    <span
                      className="font-body font-light text-cream uppercase tracking-[0.22em]"
                      style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
                    >
                      Total
                    </span>
                    <div className="text-right">
                      <p
                        className="font-display italic text-cream tabular-nums leading-none"
                        style={{ fontSize: "clamp(22px, 2.2vw, 28px)" }}
                      >
                        {formatPence(orderTotalPence)}
                      </p>
                      <p
                        className="mt-1 font-body font-light text-white/45 tabular-nums"
                        style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
                      >
                        (includes {vatLabel} {vatRateLabel} VAT)
                      </p>
                    </div>
                  </div>

                  {/* 36-bottle cap warning */}
                  {overCap && (
                    <div className="mt-5 p-3 border border-[#C8A96E]/40 bg-[#C8A96E]/[0.05] rounded-sm">
                      <p
                        className="font-body font-light text-[#C8A96E]"
                        style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
                      >
                        Orders over {MAX_BOTTLES_PER_ORDER} bottles need to
                        be placed directly with our team. Please email{" "}
                        <a
                          href="mailto:info@ridgeview.co.uk"
                          className="underline hover:text-cream"
                        >
                          info@ridgeview.co.uk
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href="/checkout"
                    aria-disabled={overCap}
                    className={`btn-cta w-full mt-6 ${
                      overCap ? "pointer-events-none opacity-40" : ""
                    }`}
                  >
                    Proceed to Checkout · {formatPence(orderTotalPence)}
                  </Link>

                  <p
                    className="mt-4 font-body font-light text-white/40 text-center"
                    style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
                  >
                    Secure checkout. Prices include UK VAT at 20 %.
                  </p>
                </div>

                {/* Legal mini-links */}
                <ul
                  className="mt-6 flex flex-wrap gap-x-4 gap-y-2 justify-center font-body text-white/35"
                  style={{ fontSize: "clamp(9px, 0.85vw, 11px)" }}
                >
                  <li>
                    <Link
                      href="/legal/delivery"
                      className="hover:text-[#C8A96E] uppercase tracking-[0.22em]"
                    >
                      Delivery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/legal/returns"
                      className="hover:text-[#C8A96E] uppercase tracking-[0.22em]"
                    >
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/legal/terms"
                      className="hover:text-[#C8A96E] uppercase tracking-[0.22em]"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────

function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-white/[0.12] rounded-sm">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
        className="w-9 h-9 flex items-center justify-center text-white/65 hover:text-[#C8A96E] transition-colors"
      >
        −
      </button>
      <span
        className="w-10 text-center font-body text-cream tabular-nums"
        style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className="w-9 h-9 flex items-center justify-center text-white/65 hover:text-[#C8A96E] transition-colors"
      >
        +
      </button>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="border border-white/[0.06] rounded-sm bg-[#0a0a0a] py-16 md:py-24 px-6 text-center">
      <p
        className="font-display italic text-cream mb-3"
        style={{ fontSize: "clamp(22px, 2.4vw, 32px)" }}
      >
        Your basket is empty.
      </p>
      <p
        className="font-body font-light text-white/55 max-w-[42ch] mx-auto mb-8"
        style={{ fontSize: "clamp(13px, 1.1vw, 15px)" }}
      >
        Bring something home from Sussex — bottles to celebrate, gift, or
        simply enjoy.
      </p>
      <Link href="/wines" className="btn-cta">
        Shop All Wines
      </Link>
    </div>
  );
}
