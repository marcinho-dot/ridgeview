"use client";

/**
 * /checkout - single-page multi-section checkout flow.
 *
 * Sections (top to bottom, scroll-anchored):
 *   1. Contact         - email, age confirmation (Challenge 25 / 18+)
 *   2. Delivery        - recipient name + UK address + phone
 *   3. Shipping method - radio list from getShippingOptions()
 *   4. Payment         - PLACEHOLDER until Aufsichtsrat provides the
 *                        payment provider integration (Stripe / Adyen /
 *                        Worldpay etc.). For now: a non-functional card
 *                        form with a clearly marked TODO; the "Place
 *                        Order" CTA writes the order intent into
 *                        sessionStorage and routes to /checkout/confirmation.
 *   5. Review          - terms acceptance, marketing opt-in (NOT pre-
 *                        ticked per UK Consumer Contracts Regulations),
 *                        right-of-cancellation notice, "Place Order".
 *
 * Right rail: sticky OrderSummary with line items, shipping, VAT,
 * total. Mirrors the /cart page totals exactly.
 *
 * Static-export-friendly: pure client state, no server-side processing.
 * When the payment provider lands, swap the placeholder card form for
 * the provider's SDK; the "Place Order" handler is the single
 * integration point.
 *
 * Legal compliance notes (UK, verified against ridgeview.co.uk + UK
 * Consumer Contracts Regulations 2013 + UK GDPR):
 *   - Age verification gate (alcohol is age-restricted; Licensing Act
 *     2003 + Challenge 25 policy).
 *   - Terms acceptance NOT pre-ticked (required by CCR 2013).
 *   - Marketing opt-in NOT pre-ticked (PECR + UK GDPR).
 *   - Total price (incl. VAT + shipping) shown BEFORE the Place Order
 *     button (CCR 2013 art 8(1)).
 *   - Right-to-cancel summary visible (CCR 2013 art 13 + 14, although
 *     sealed-wine exemption applies once unsealed - see /legal/returns).
 *   - 36-bottle cap enforced (matches the live ridgeview.co.uk policy).
 */

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart/CartContext";
import { formatPence } from "@/lib/cart/types";
import {
  getShippingOptions,
  MAX_BOTTLES_PER_ORDER,
  totalBottleCount,
  exceedsBottleCap,
} from "@/lib/checkout/shipping";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotalPence,
    vatLabel,
    vatRateLabel,
    qualifiesForFreeDelivery,
    clear,
  } = useCart();

  // ── Form state ───────────────────────────────────────────
  const [email, setEmail] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const shippingOptions = getShippingOptions(subtotalPence);
  const [shippingId, setShippingId] = useState(
    shippingOptions.find((o) => o.isDefault)?.id ?? shippingOptions[0]?.id ?? "",
  );
  const selectedShipping = shippingOptions.find((o) => o.id === shippingId);
  const shippingPence = selectedShipping?.pricePence ?? 0;

  // Payment placeholder ----------------------------------------------
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // Review acceptances
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orderTotalPence = subtotalPence + shippingPence;
  const overCap = exceedsBottleCap(items);

  // ── Submit handler ───────────────────────────────────────
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Your basket is empty.");
      return;
    }
    if (overCap) {
      setError(
        `Orders over ${MAX_BOTTLES_PER_ORDER} bottles need to be placed directly with our team - please email info@ridgeview.co.uk.`,
      );
      return;
    }
    if (!ageConfirmed) {
      setError("Please confirm you are 18 or over.");
      return;
    }
    if (!termsAccepted) {
      setError(
        "Please accept the Terms & Conditions and Privacy Policy to place the order.",
      );
      return;
    }

    setSubmitting(true);

    // ────────────────────────────────────────────────────────
    // TODO (payment provider integration):
    // Replace the block below with a real payment-provider call once
    // the Aufsichtsrat confirms the provider (Stripe, Adyen, Worldpay,
    // etc.). Today this is a placeholder that:
    //   1. Generates a pseudo order-reference,
    //   2. Stashes a minimal "intent" record in sessionStorage so the
    //      confirmation page can render order details after navigation,
    //   3. Clears the cart,
    //   4. Routes to /checkout/confirmation.
    // No real payment is taken, no order is persisted. This is a
    // deliberate, well-marked dummy.
    // ────────────────────────────────────────────────────────

    const orderRef = `RV-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      Math.random() * 1000,
    )
      .toString(36)
      .toUpperCase()
      .padStart(3, "0")}`;

    try {
      sessionStorage.setItem(
        "rv-last-order",
        JSON.stringify({
          ref: orderRef,
          placedAt: new Date().toISOString(),
          email,
          name: `${firstName} ${lastName}`.trim(),
          shippingLabel: selectedShipping?.label ?? "",
          subtotalPence,
          shippingPence,
          totalPence: orderTotalPence,
          itemCount: items.reduce((s, i) => s + i.quantity, 0),
          bottleCount: totalBottleCount(items),
          marketingOptIn,
          // Full line items — including each line's `note` (e.g. the gift-
          // membership recipient's name, birthday, delivery address and gift
          // message) — so the details captured in the basket travel WITH the
          // order record and are ready to hand straight to the payment /
          // fulfilment provider once that backend is wired.
          items,
        }),
      );
    } catch {
      /* sessionStorage blocked → confirmation page will fall back */
    }

    // Clear cart so the drawer + /cart show empty after successful order.
    clear();

    // Small delay to feel like a network call (UX-only - replace with
    // real spinner during the provider call when integrated).
    setTimeout(() => {
      router.push("/checkout/confirmation");
    }, 600);
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="bg-[#010101] min-h-screen pt-28 md:pt-32 pb-20 md:pb-32">
          <div className="max-w-[800px] mx-auto px-6 md:px-12 text-center">
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-4"
              style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
            >
              [ Checkout ]
            </p>
            <h1
              className="font-display italic text-cream leading-[1.05] mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
            >
              Your basket is empty.
            </h1>
            <p
              className="font-body font-light text-white/55 mb-8"
              style={{ fontSize: "clamp(13px, 1.2vw, 16px)" }}
            >
              You need wines in your basket before you can check out.
            </p>
            <Link href="/wines" className="btn-cta">
              Shop All Wines
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#010101] min-h-screen pt-28 md:pt-32 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <header className="mb-10 md:mb-14">
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-3"
              style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
            >
              [ Secure Checkout ]
            </p>
            <h1
              className="font-display italic text-cream leading-[1.05]"
              style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
            >
              Complete your order.
            </h1>
          </header>

          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16"
            noValidate
          >
            {/* ────────────────────── LEFT: form sections */}
            <div className="space-y-12 md:space-y-16">
              {/* 1 - Contact */}
              <Section
                step="01"
                title="Contact"
                subtitle="We'll send your order confirmation and delivery updates here."
              >
                <Field label="Email" htmlFor="email" required>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={INPUT_CLS}
                  />
                </Field>

                <label className="flex items-start gap-3 mt-6 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="mt-1 accent-[#C8A96E] shrink-0"
                  />
                  <span
                    className="font-body text-white/75 leading-relaxed"
                    style={{ fontSize: "clamp(12px, 1.05vw, 14px)" }}
                  >
                    I confirm that I am{" "}
                    <strong className="text-cream">18 years or over</strong>.
                    Ridgeview operates a{" "}
                    <strong className="text-cream">
                      Challenge 25
                    </strong>{" "}
                    policy - our courier may ask the recipient for
                    photographic ID on delivery (UK Licensing Act 2003).
                  </span>
                </label>
              </Section>

              {/* 2 - Delivery address */}
              <Section
                step="02"
                title="Delivery Address"
                subtitle="UK mainland addresses only. Scotland and Northern Ireland +1 working day."
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="First name" htmlFor="firstName" required>
                    <input
                      id="firstName"
                      required
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={INPUT_CLS}
                    />
                  </Field>
                  <Field label="Last name" htmlFor="lastName" required>
                    <input
                      id="lastName"
                      required
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={INPUT_CLS}
                    />
                  </Field>
                </div>

                <Field label="Address line 1" htmlFor="address1" required>
                  <input
                    id="address1"
                    required
                    autoComplete="address-line1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className={INPUT_CLS}
                  />
                </Field>
                <Field
                  label="Address line 2 (optional)"
                  htmlFor="address2"
                >
                  <input
                    id="address2"
                    autoComplete="address-line2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className={INPUT_CLS}
                  />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                  <Field label="Town / City" htmlFor="city" required>
                    <input
                      id="city"
                      required
                      autoComplete="address-level2"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={INPUT_CLS}
                    />
                  </Field>
                  <Field label="Postcode" htmlFor="postcode" required>
                    <input
                      id="postcode"
                      required
                      autoComplete="postal-code"
                      value={postcode}
                      onChange={(e) =>
                        setPostcode(e.target.value.toUpperCase())
                      }
                      placeholder="BN6 8TP"
                      className={INPUT_CLS}
                    />
                  </Field>
                </div>

                <Field label="Phone (for courier updates)" htmlFor="phone" required>
                  <input
                    id="phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7XXX XXX XXX"
                    className={INPUT_CLS}
                  />
                </Field>

                <Field
                  label="Delivery notes (optional)"
                  htmlFor="deliveryNotes"
                >
                  <textarea
                    id="deliveryNotes"
                    rows={3}
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Gate code, safe place, preferred delivery day, etc."
                    className={INPUT_CLS}
                  />
                </Field>
              </Section>

              {/* 3 - Shipping method */}
              <Section
                step="03"
                title="Shipping Method"
                subtitle={
                  qualifiesForFreeDelivery
                    ? "Your order qualifies for free UK delivery."
                    : `Orders over £45 ship free. Standard rate £${(
                        550 / 100
                      ).toFixed(2)} below that.`
                }
              >
                <fieldset className="space-y-3">
                  <legend className="sr-only">Shipping options</legend>
                  {shippingOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`block border rounded-sm p-4 md:p-5 cursor-pointer transition-colors ${
                        shippingId === opt.id
                          ? "border-[#C8A96E] bg-[#C8A96E]/[0.04]"
                          : "border-white/[0.08] hover:border-white/[0.18]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={opt.id}
                          checked={shippingId === opt.id}
                          onChange={() => setShippingId(opt.id)}
                          className="mt-1 accent-[#C8A96E] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-body text-cream"
                            style={{ fontSize: "clamp(13px, 1.15vw, 15px)" }}
                          >
                            {opt.label}
                          </p>
                          <p
                            className="mt-1 font-body font-light text-white/55 leading-relaxed"
                            style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
                          >
                            {opt.description}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </fieldset>
              </Section>

              {/* 4 - Payment placeholder */}
              <Section
                step="04"
                title="Payment"
                subtitle="Card details are encrypted in transit. We do not store full card numbers."
              >
                <div className="p-4 mb-5 border border-[#C8A96E]/30 bg-[#C8A96E]/[0.04] rounded-sm">
                  <p
                    className="font-body font-light text-[#C8A96E]"
                    style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
                  >
                    ⓘ Payment integration pending. The fields below are a
                    placeholder; no card is charged in this build. The
                    payment provider (Stripe / Worldpay / etc.) will be
                    configured shortly - your order intent will be
                    captured but no money will move.
                  </p>
                </div>

                <Field label="Name on card" htmlFor="cardName" required>
                  <input
                    id="cardName"
                    required
                    autoComplete="cc-name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className={INPUT_CLS}
                  />
                </Field>
                <Field label="Card number" htmlFor="cardNumber" required>
                  <input
                    id="cardNumber"
                    required
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className={INPUT_CLS}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry (MM / YY)" htmlFor="cardExpiry" required>
                    <input
                      id="cardExpiry"
                      required
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className={INPUT_CLS}
                    />
                  </Field>
                  <Field label="CVC" htmlFor="cardCvc" required>
                    <input
                      id="cardCvc"
                      required
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className={INPUT_CLS}
                    />
                  </Field>
                </div>
              </Section>

              {/* 5 - Review */}
              <Section
                step="05"
                title="Review & Place Order"
                subtitle="Final check before we send your wine on its way."
              >
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 accent-[#C8A96E] shrink-0"
                    />
                    <span
                      className="font-body text-white/75 leading-relaxed"
                      style={{ fontSize: "clamp(12px, 1.05vw, 14px)" }}
                    >
                      I have read and accept the{" "}
                      <Link
                        href="/legal/terms"
                        target="_blank"
                        className="text-[#C8A96E] underline hover:text-cream"
                      >
                        Terms &amp; Conditions
                      </Link>
                      , the{" "}
                      <Link
                        href="/legal/privacy"
                        target="_blank"
                        className="text-[#C8A96E] underline hover:text-cream"
                      >
                        Privacy Policy
                      </Link>
                      , and the{" "}
                      <Link
                        href="/legal/returns"
                        target="_blank"
                        className="text-[#C8A96E] underline hover:text-cream"
                      >
                        Returns &amp; Cancellation Policy
                      </Link>
                      .
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                      className="mt-1 accent-[#C8A96E] shrink-0"
                    />
                    <span
                      className="font-body text-white/65 leading-relaxed"
                      style={{ fontSize: "clamp(12px, 1.05vw, 14px)" }}
                    >
                      Send me Ridgeview cellar updates, harvest dispatches
                      and member experiences by email. You can unsubscribe
                      at any time - see our Privacy Policy.
                    </span>
                  </label>
                </div>

                <div className="mt-6 p-4 border border-white/[0.08] rounded-sm bg-[#0a0a0a]">
                  <p
                    className="font-body font-light text-white/55 leading-relaxed"
                    style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
                  >
                    <strong className="text-cream">Right to cancel.</strong>{" "}
                    Under the Consumer Contracts Regulations 2013, you have
                    14 days from delivery to cancel your order - provided
                    the seal on the bottle is intact. Full details +
                    model cancellation form on our{" "}
                    <Link
                      href="/legal/returns"
                      target="_blank"
                      className="text-[#C8A96E] underline hover:text-cream"
                    >
                      Returns page
                    </Link>
                    .
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="mt-6 p-4 border border-red-500/40 bg-red-500/[0.06] rounded-sm"
                  >
                    <p
                      className="font-body text-red-300"
                      style={{ fontSize: "clamp(12px, 1.05vw, 14px)" }}
                    >
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-cta w-full mt-8"
                >
                  {submitting
                    ? "Placing order…"
                    : `Place Order · ${formatPence(orderTotalPence)}`}
                </button>

                <p
                  className="mt-4 font-body font-light text-white/40 text-center"
                  style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
                >
                  Prices include UK VAT at {vatRateLabel}. By placing this
                  order you authorise Ridgeview (QBRidge Limited) to charge
                  the card above for the total shown.
                </p>
              </Section>
            </div>

            {/* ────────────────────── RIGHT: order summary */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <OrderSummary
                items={items}
                subtotalPence={subtotalPence}
                shippingPence={shippingPence}
                shippingLabel={selectedShipping?.label ?? "Standard"}
                vatLabel={vatLabel}
                vatRateLabel={vatRateLabel}
                totalPence={orderTotalPence}
              />
            </aside>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Tiny presentational helpers ──────────────────────────────────────

const INPUT_CLS =
  "w-full bg-[#0a0a0a] border border-white/[0.10] rounded-sm px-4 py-3 font-body text-cream placeholder-white/30 focus:outline-none focus:border-[#C8A96E]/60 transition-colors";

function Section({
  step,
  title,
  subtitle,
  children,
}: {
  step: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-4 mb-2">
        <span
          className="font-display italic text-[#C8A96E] tracking-widest"
          style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
        >
          [ {step} ]
        </span>
        <h2
          className="font-display italic text-cream leading-tight"
          style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          className="font-body font-light text-white/55 mb-6 max-w-[60ch]"
          style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
        >
          {subtitle}
        </p>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block font-body text-white/65 mb-2 uppercase tracking-[0.18em]"
        style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
      >
        {label}
        {required && <span className="text-[#C8A96E]">*</span>}
      </label>
      {children}
    </div>
  );
}
