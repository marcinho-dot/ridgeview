"use client";

/**
 * /checkout/confirmation - order success page.
 *
 * Reached via router.push() from /checkout after the (currently
 * placeholder) Place Order action. Pulls the last order's summary
 * details out of sessionStorage and renders a calm thank-you screen.
 *
 * If a user navigates here directly without an order intent in
 * sessionStorage, we render a graceful fallback that links them back
 * to the shop instead of showing blank fields.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { formatPence } from "@/lib/cart/types";

interface LastOrder {
  ref: string;
  placedAt: string;
  email: string;
  name: string;
  shippingLabel: string;
  subtotalPence: number;
  shippingPence: number;
  totalPence: number;
  itemCount: number;
  bottleCount: number;
  marketingOptIn: boolean;
}

export default function ConfirmationPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const raw = sessionStorage.getItem("rv-last-order");
      if (raw) setOrder(JSON.parse(raw) as LastOrder);
    } catch {
      /* sessionStorage unavailable → render fallback */
    }
  }, []);

  // Avoid hydration mismatch - render the fallback shell on first
  // render, swap to real data after effect.
  if (!hydrated) return null;

  return (
    <>
      <Navbar />
      <main className="bg-[#010101] min-h-screen pt-28 md:pt-32 pb-20 md:pb-32">
        <div className="max-w-[760px] mx-auto px-6 md:px-12 text-center">
          {/* Gold tick mark */}
          <div className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-full border border-[#C8A96E]/40">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C8A96E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="4 12 10 18 20 6" />
            </svg>
          </div>

          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-4"
            style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
          >
            [ Order Received ]
          </p>
          <h1
            className="font-display italic text-cream leading-[1.05] mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Thank you{order?.name ? `, ${order.name.split(" ")[0]}` : ""}.
          </h1>

          {order ? (
            <>
              <p
                className="font-body font-light text-white/70 leading-relaxed max-w-[52ch] mx-auto mb-10"
                style={{ fontSize: "clamp(14px, 1.3vw, 17px)" }}
              >
                Your order is in. We&rsquo;ve sent a confirmation to{" "}
                <strong className="text-cream">{order.email}</strong> and
                will follow up with tracking once your wine leaves the
                cellar - usually within one working day for UK mainland
                addresses.
              </p>

              <div className="border border-white/[0.08] bg-[#0a0a0a] rounded-sm p-6 md:p-8 text-left mb-10">
                <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-white/[0.06]">
                  <span
                    className="font-body font-light text-white/55 uppercase tracking-[0.22em]"
                    style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
                  >
                    Order reference
                  </span>
                  <span
                    className="font-display italic text-cream tabular-nums"
                    style={{ fontSize: "clamp(16px, 1.6vw, 22px)" }}
                  >
                    {order.ref}
                  </span>
                </div>

                <SummaryRow label="Placed" value={formatDate(order.placedAt)} />
                <SummaryRow
                  label="Items"
                  value={`${order.itemCount} (${order.bottleCount} bottles)`}
                />
                <SummaryRow label="Shipping" value={shortenShipping(order.shippingLabel)} />
                <SummaryRow label="Subtotal" value={formatPence(order.subtotalPence)} />
                <SummaryRow
                  label="Shipping cost"
                  value={
                    order.shippingPence === 0
                      ? "FREE"
                      : formatPence(order.shippingPence)
                  }
                />
                <div className="flex items-baseline justify-between pt-4 mt-4 border-t border-white/[0.06]">
                  <span
                    className="font-body font-light text-cream uppercase tracking-[0.22em]"
                    style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
                  >
                    Total charged
                  </span>
                  <span
                    className="font-display italic text-cream tabular-nums"
                    style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
                  >
                    {formatPence(order.totalPence)}
                  </span>
                </div>
              </div>

              <div className="border border-white/[0.06] rounded-sm p-6 md:p-8 text-left mb-10 bg-[#080808]">
                <h2
                  className="font-display italic text-cream mb-4"
                  style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
                >
                  What happens next
                </h2>
                <ol className="space-y-3 font-body font-light text-white/65 leading-relaxed list-decimal pl-5">
                  <Step>
                    Confirmation email is on its way to{" "}
                    <strong className="text-cream">{order.email}</strong>.
                  </Step>
                  <Step>
                    Your bottles are hand-picked from the cellar and packed
                    for safe transit. Orders placed before 12 pm on a
                    working day ship the same day.
                  </Step>
                  <Step>
                    A tracking link will follow by email once the courier
                    collects. The recipient may be asked for photographic
                    ID on delivery - UK Licensing Act 2003 / Challenge 25.
                  </Step>
                  <Step>
                    You have 14 days from delivery to cancel any unopened
                    bottles under the Consumer Contracts Regulations 2013.
                    Full details on our{" "}
                    <Link
                      href="/legal/returns"
                      className="text-[#C8A96E] underline hover:text-cream"
                    >
                      Returns page
                    </Link>
                    .
                  </Step>
                </ol>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/wines" className="btn-cta">
                  Continue Shopping
                </Link>
                <Link
                  href="/"
                  className="font-body text-white/65 hover:text-[#C8A96E] uppercase tracking-[0.22em] px-4 py-3 transition-colors"
                  style={{ fontSize: "clamp(10px, 0.95vw, 12px)" }}
                >
                  Back to Home
                </Link>
              </div>
            </>
          ) : (
            <>
              <p
                className="font-body font-light text-white/70 leading-relaxed max-w-[52ch] mx-auto mb-10"
                style={{ fontSize: "clamp(14px, 1.3vw, 17px)" }}
              >
                We couldn&rsquo;t locate the details of a recent order in this
                session. If you&rsquo;ve just placed an order, please check your
                email for the confirmation. Otherwise, head back to the
                shop and pick out your sparkling wines.
              </p>
              <Link href="/wines" className="btn-cta">
                Shop All Wines
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-2">
      <span
        className="font-body font-light text-white/55 uppercase tracking-[0.18em]"
        style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
      >
        {label}
      </span>
      <span
        className="font-body font-light text-cream tabular-nums"
        style={{ fontSize: "clamp(13px, 1.15vw, 15px)" }}
      >
        {value}
      </span>
    </div>
  );
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{ fontSize: "clamp(13px, 1.15vw, 15px)" }}
      className="leading-relaxed"
    >
      {children}
    </li>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function shortenShipping(label: string): string {
  // The full shipping label includes price; for the confirmation we
  // only want the method name. Strip everything after the first " · ".
  return label.split(" · ")[0] ?? label;
}
