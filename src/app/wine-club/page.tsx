"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

/**
 * /wine-club/ — dedicated OurView Wine Club page.
 *
 * Content sourced from the legacy ridgeview.co.uk/wine-club-membership/
 * (1:1 perks list, pricing structure, FAQ) plus the four
 * Aufsichtsrat-agreed editorial benefits already shown in the
 * OurViewSection on the homepage:
 *   - Gift scheduling
 *   - Bottle customization
 *   - Exclusive event invitations
 *   - Rare cellar access
 *
 * Replaces the previous /#ourview anchor target for every Wine Club
 * CTA across the site (Navbar, BottomNav, Footer, SKU upsell, etc.).
 */

const PERKS = [
  "Gift scheduling — surprise loved ones with a future-dated case",
  "Bespoke bottle customization for milestone moments",
  "Exclusive invitations to member-only experiences and events",
  "Rare cellar access — archive wines not available elsewhere",
  "20% off Ridgeview sparkling wines all year round",
  "Two curated 6-bottle cases delivered each year (May + November)",
  "Welcome gift set: Bloomsbury NV, two Ridgeview flutes, bespoke bottle stopper",
  "Complimentary tour and tasting voucher for two at the estate",
  "10% off food at The Rows & Vine, our vineyard restaurant",
  "Members pricing on gift sets and limited editions",
  "Exclusive partner-brand offers",
  "Behind-the-scenes insight articles and winemaker notes",
  "Complimentary next-day delivery on every order",
];

const STEPS = [
  {
    n: "01",
    title: "Sign up",
    body:
      "Enter your contact details and set up a Direct Debit mandate to begin your membership.",
  },
  {
    n: "02",
    title: "Your welcome case",
    body:
      "We send a welcome gift box direct to your door: a bottle of Bloomsbury NV, two Ridgeview flutes and a bespoke bottle stopper.",
  },
  {
    n: "03",
    title: "Unlock your benefits",
    body:
      "From the moment you join, every member perk — 20% off wines, archive access, events and more — is yours to enjoy.",
  },
];

const FAQS = [
  {
    q: "What are the payment options and membership fees?",
    a: "Two options, both via GoCardless: Annual payment of £580 upfront (reducing to £530 in your second year) and you'll receive a complimentary bottle of Fitzrovia Rosé in your welcome set. Or biannual payment — £50 upfront, then £265 every May and November before each twice-yearly shipment.",
  },
  {
    q: "Can I purchase a wine club membership as a gift?",
    a: "Yes — an OurView Wine Club membership makes an extraordinary gift that sparkles all year round. Use the Join button below and select the gift option at checkout.",
  },
  {
    q: "Where is membership available?",
    a: "Across the entire UK. Member cases and online purchases can be shipped anywhere in the U.K. — London, Kent, Sussex and beyond. All digital member benefits are available wherever you are.",
  },
  {
    q: "When do I receive my welcome gift set?",
    a: "Within two weeks of joining. The biannual welcome set includes a bottle of Bloomsbury NV, two Ridgeview flutes and a bespoke bottle stopper. Annual members additionally receive a complimentary bottle of Fitzrovia Rosé.",
  },
  {
    q: "What is in my biannual cases?",
    a: "Six specially selected bottles handpicked by our Head Winemaker, showcasing the breadth and beauty of our award-winning English sparkling wine. You receive an email with the case contents before each shipment in May and November.",
  },
  {
    q: "How fast is delivery?",
    a: "Next-working-day delivery is included on every order, and free on orders over £45.",
  },
  {
    q: "How do I track my wine?",
    a: "You receive a tracking email directly from DHL (our courier) for every shipment, so you can follow its journey and request leave-with-neighbour or safe-place arrangements as needed.",
  },
  {
    q: "Managing my membership",
    a: "Address details, card information and shipment preferences can all be managed through your OurView portal. For anything else, the team is reachable at memberships@ridgeview.co.uk or 01444 242 040.",
  },
];

function PricingCard({
  variant,
  badge,
  title,
  price,
  cadence,
  highlights,
  recommended,
}: {
  variant: "annual" | "biannual";
  badge: string;
  title: string;
  price: string;
  cadence: string;
  highlights: string[];
  recommended?: boolean;
}) {
  return (
    <div
      className={`relative h-full flex flex-col p-8 md:p-10 rounded-sm border ${
        recommended
          ? "border-[#C8A96E]/60 bg-[rgba(200,169,110,0.04)]"
          : "border-white/12 bg-[#0a0a0a]"
      }`}
    >
      {recommended && (
        <p
          className="absolute -top-3 left-8 px-3 py-1 rounded-sm bg-[#C8A96E] text-[#010101] font-body uppercase tracking-[0.22em]"
          style={{ fontSize: "10px", fontWeight: 500 }}
        >
          Most chosen
        </p>
      )}
      <p
        className="font-body text-[#C8A96E] uppercase tracking-[0.22em] mb-5"
        style={{ fontSize: "11px" }}
      >
        [ {badge} ]
      </p>
      <h3
        className="font-display italic text-cream leading-[1.1] mb-3"
        style={{ fontSize: "clamp(26px, 2.4vw, 32px)", fontWeight: 400 }}
      >
        {title}
      </h3>
      <div className="mb-8">
        <p
          className="font-display italic text-cream leading-none"
          style={{ fontSize: "clamp(40px, 4.6vw, 64px)", fontWeight: 400 }}
        >
          {price}
        </p>
        <p
          className="font-body text-white/55 mt-2"
          style={{ fontSize: "13px", fontWeight: 300 }}
        >
          {cadence}
        </p>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {highlights.map((h, i) => (
          <li
            key={i}
            className="flex items-start gap-3 font-body text-white/70 leading-[1.6]"
            style={{ fontSize: "14px", fontWeight: 300 }}
          >
            <span
              aria-hidden
              className="text-[#C8A96E] flex-shrink-0 mt-1"
              style={{ fontSize: "10px" }}
            >
              ◆
            </span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <a href="#join" className="btn-cta w-full text-center">
        Choose {variant === "annual" ? "annual" : "biannual"}
      </a>
    </div>
  );
}

export default function WineClubPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#010101] min-h-screen">
      {/* Noise overlay matching other premium routes */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <ScrollReset>
          <section className="relative bg-[#010101] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/cellar-bg.png`}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-[0.35]"
              style={{ objectPosition: "center 35%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-[#010101]" />

            <div className="relative max-w-[1600px] mx-auto px-6 md:px-16 pt-32 md:pt-40 pb-8 md:pb-10 text-center">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ OurView · Wine Club ]
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-display italic text-cream leading-[1.06] mb-8 mx-auto"
                style={{
                  fontSize: "clamp(40px, 6vw, 88px)",
                  fontWeight: 400,
                  maxWidth: "920px",
                }}
              >
                Find your <span className="text-[#C8A96E]">sparkle</span>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18 }}
                className="font-body text-white/70 leading-[1.75] mx-auto"
                style={{
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  fontWeight: 300,
                  maxWidth: "640px",
                }}
              >
                Enjoy Ridgeview&rsquo;s award-winning English sparkling wines,
                bespoke member experiences and rare-cellar access when you
                join OurView.
              </motion.p>
            </div>
          </section>
        </ScrollReset>

        {/* ── Pricing ──────────────────────────────────────────────── */}
        {/* border-t removed + top padding reduced 2026-05-17 so the
            hero flows directly into the membership cards without a
            visible cut + so more of the first card is in the initial
            viewport. */}
        <ScrollReset>
          <section className="relative bg-[#010101]">
            <div className="max-w-[1600px] mx-auto px-6 md:px-16 pt-8 md:pt-10 pb-20 md:pb-28">
              <div className="mb-6 md:mb-8 max-w-[820px]">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7 }}
                  className="font-display italic text-[#C8A96E] tracking-widest mb-4"
                  style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
                >
                  [ Membership ]
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display italic text-cream leading-[1.08]"
                  style={{ fontSize: "clamp(32px, 4.6vw, 64px)", fontWeight: 400 }}
                >
                  Two ways to <span className="text-[#C8A96E]">join</span>.
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <PricingCard
                  variant="annual"
                  badge="Annual"
                  title="Annual Membership"
                  price="£580"
                  cadence="Year one · reduces to £530 from year two onward"
                  recommended
                  highlights={[
                    "Twelve bottles a year across two curated shipments",
                    "Welcome gift set + complimentary Fitzrovia Rosé bottle",
                    "All member benefits unlocked from day one",
                    "Single annual payment via GoCardless Direct Debit",
                  ]}
                />
                <PricingCard
                  variant="biannual"
                  badge="Biannual"
                  title="Biannual Plan"
                  price="£50 + £265 ×2"
                  cadence="£50 upfront, then £265 every May and November"
                  highlights={[
                    "Twelve bottles a year, split between two shipments",
                    "Welcome gift set: Bloomsbury NV, two flutes, bottle stopper",
                    "All member benefits unlocked from day one",
                    "Payments aligned with each shipment via GoCardless",
                  ]}
                />
              </div>
            </div>
          </section>
        </ScrollReset>

        {/* ── How it works ─────────────────────────────────────────── */}
        <ScrollReset>
          <section className="relative bg-[#010101] border-t border-white/[0.06]">
            <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-20 md:py-28">
              <div className="mb-14 md:mb-20 max-w-[820px]">
                <p
                  className="font-display italic text-[#C8A96E] tracking-widest mb-4"
                  style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
                >
                  [ How it works ]
                </p>
                <h2
                  className="font-display italic text-cream leading-[1.08]"
                  style={{ fontSize: "clamp(32px, 4.6vw, 64px)", fontWeight: 400 }}
                >
                  Three steps to your first <span className="text-[#C8A96E]">case</span>.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.n}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 md:p-10 border border-white/8 rounded-sm bg-[#0a0a0a]"
                  >
                    <p
                      className="font-display italic text-[#C8A96E]/70 mb-5"
                      style={{ fontSize: "clamp(36px, 3.4vw, 48px)", fontWeight: 400 }}
                    >
                      {step.n}
                    </p>
                    <h3
                      className="font-display italic text-cream leading-[1.15] mb-4"
                      style={{ fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 400 }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-body text-white/65 leading-[1.7]"
                      style={{ fontSize: "14px", fontWeight: 300 }}
                    >
                      {step.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReset>

        {/* ── Member benefits ──────────────────────────────────────── */}
        <ScrollReset>
          <section className="relative bg-[#010101] border-t border-white/[0.06]">
            <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-20 md:py-28">
              <div className="mb-14 md:mb-20 max-w-[820px]">
                <p
                  className="font-display italic text-[#C8A96E] tracking-widest mb-4"
                  style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
                >
                  [ Member benefits ]
                </p>
                <h2
                  className="font-display italic text-cream leading-[1.08]"
                  style={{ fontSize: "clamp(32px, 4.6vw, 64px)", fontWeight: 400 }}
                >
                  Everything <span className="text-[#C8A96E]">included</span>.
                </h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                {PERKS.map((perk, i) => (
                  <motion.li
                    key={perk}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: (i % 7) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-4 py-3 border-b border-white/[0.06]"
                  >
                    <span
                      aria-hidden
                      className="text-[#C8A96E] flex-shrink-0 mt-1.5"
                      style={{ fontSize: "11px" }}
                    >
                      ◆
                    </span>
                    <p
                      className="font-body text-white/75 leading-[1.6]"
                      style={{ fontSize: "15px", fontWeight: 300 }}
                    >
                      {perk}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>
        </ScrollReset>

        {/* ── Testimonials ─────────────────────────────────────────── */}
        {/* Three verbatim quotes pulled from the live legacy
            /wine-club-membership/ page — two member testimonials and a
            Decanter press citation. Nothing rephrased or composited. */}
        <ScrollReset>
          <section className="relative bg-[#010101] border-t border-white/[0.06] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/cellar-detail.png`}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-[0.18]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-black/55 to-[#010101]" />
            <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-32">
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-12 md:mb-16 text-center"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ From our members ]
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                <motion.figure
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="border-l border-[#C8A96E]/30 pl-6 md:pl-8"
                >
                  <blockquote
                    className="font-display italic text-cream leading-[1.45] mb-6"
                    style={{ fontSize: "clamp(16px, 1.5vw, 19px)", fontWeight: 400 }}
                  >
                    &ldquo;I have been a member of OurView since inception and
                    what a wonderful treat it is to receive delicious Ridgeview
                    twice a year. The selections available provide vintages
                    before they are available elsewhere and at a discounted
                    price. Access to exclusive events throughout the year is
                    another great benefit of membership. OurView makes you feel
                    connected to a brilliant local product on our doorstep that
                    knocks the socks off anything French!&rdquo;
                  </blockquote>
                  <figcaption
                    className="font-body text-[#C8A96E]/85 uppercase tracking-[0.22em]"
                    style={{ fontSize: "10px" }}
                  >
                    — OurView member
                  </figcaption>
                </motion.figure>

                <motion.figure
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="border-l border-[#C8A96E]/30 pl-6 md:pl-8"
                >
                  <blockquote
                    className="font-display italic text-cream leading-[1.45] mb-6"
                    style={{ fontSize: "clamp(16px, 1.5vw, 19px)", fontWeight: 400 }}
                  >
                    &ldquo;One of the benefits I most value being part of the
                    OurView wine club is the access to the special archive
                    wines not available to the general public. It is always a
                    pleasure opening the surprise case twice a year and
                    refilling my wine rack which is always being depleted!
                    It&rsquo;s a pleasure to be part of a unique family run
                    business.&rdquo;
                  </blockquote>
                  <figcaption
                    className="font-body text-[#C8A96E]/85 uppercase tracking-[0.22em]"
                    style={{ fontSize: "10px" }}
                  >
                    — OurView member
                  </figcaption>
                </motion.figure>

                <motion.figure
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="border-l border-[#C8A96E]/30 pl-6 md:pl-8"
                >
                  <blockquote
                    className="font-display italic text-cream leading-[1.45] mb-6"
                    style={{ fontSize: "clamp(16px, 1.5vw, 19px)", fontWeight: 400 }}
                  >
                    &ldquo;Ridgeview&rsquo;s OurView wine club is simple,
                    accessible and engaging, encouraging its members to
                    experiment, visit and generally get involved in English
                    wine.&rdquo;
                  </blockquote>
                  <figcaption
                    className="font-body text-[#C8A96E]/85 uppercase tracking-[0.22em]"
                    style={{ fontSize: "10px" }}
                  >
                    — Decanter, 2023
                  </figcaption>
                </motion.figure>
              </div>
            </div>
          </section>
        </ScrollReset>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <ScrollReset>
          <section className="relative bg-[#010101] border-t border-white/[0.06]">
            <div className="max-w-[1100px] mx-auto px-6 md:px-16 py-20 md:py-28">
              <div className="mb-14 md:mb-20">
                <p
                  className="font-display italic text-[#C8A96E] tracking-widest mb-4"
                  style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
                >
                  [ FAQ ]
                </p>
                <h2
                  className="font-display italic text-cream leading-[1.08]"
                  style={{ fontSize: "clamp(32px, 4.6vw, 64px)", fontWeight: 400 }}
                >
                  Good <span className="text-[#C8A96E]">questions</span>.
                </h2>
              </div>
              <div className="border-t border-white/[0.06]">
                {FAQS.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={faq.q} className="border-b border-white/[0.06]">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]/40"
                      >
                        <span
                          className="font-display italic text-cream leading-[1.3]"
                          style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 400 }}
                        >
                          {faq.q}
                        </span>
                        <span
                          aria-hidden
                          className={`flex-shrink-0 w-8 h-8 border border-[#C8A96E]/55 rounded-full flex items-center justify-center transition-transform duration-400 ${
                            isOpen ? "rotate-45 border-[#C8A96E] bg-[#C8A96E]/10" : ""
                          }`}
                        >
                          <span className="text-[#C8A96E]" style={{ fontSize: "14px" }}>+</span>
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p
                              className="font-body text-white/70 leading-[1.75] pb-7 pr-12"
                              style={{ fontSize: "15px", fontWeight: 300 }}
                            >
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReset>

        {/* ── Join CTA ─────────────────────────────────────────────── */}
        <ScrollReset>
          <section
            id="join"
            className="relative bg-[#010101] border-t border-white/[0.06]"
          >
            <div className="max-w-[820px] mx-auto px-6 md:px-16 py-24 md:py-32 text-center">
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ Join us ]
              </p>
              <h2
                className="font-display italic text-cream leading-[1.08] mb-7"
                style={{ fontSize: "clamp(34px, 5vw, 68px)", fontWeight: 400 }}
              >
                Begin your <span className="text-[#C8A96E]">membership</span>.
              </h2>
              <p
                className="font-body text-white/65 leading-[1.7] mb-10 mx-auto"
                style={{
                  fontSize: "clamp(15px, 1.3vw, 17px)",
                  fontWeight: 300,
                  maxWidth: "520px",
                }}
              >
                Sign up takes a few minutes, your welcome gift set arrives
                within two weeks, and every benefit is yours from the moment
                you join.
              </p>
              <a href="#" className="btn-cta">
                Join the Wine Club
              </a>
              <p
                className="font-body text-white/35 mt-8"
                style={{ fontSize: "12px", fontWeight: 300 }}
              >
                Questions? memberships@ridgeview.co.uk · 01444 242 040
              </p>
            </div>
          </section>
        </ScrollReset>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
