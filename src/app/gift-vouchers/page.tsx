"use client";

import { useRef, useState, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

const VOUCHER_EMAIL = "info@ridgeview.co.uk";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function PageHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="top" ref={ref} className="relative h-svh md:h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale, opacity: imgOpacity }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/restaurant/garden-toast.webp`}
          alt="A Ridgeview toast in the vineyard — gift voucher for English sparkling wine"
          className="absolute inset-0 w-full h-full object-cover object-[center_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-9"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
        >
          [ The Gift of Sussex Sparkling ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Gift <span className="text-[#C8A96E]">Vouchers</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-body text-white/65 max-w-[680px]"
          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.7, textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          The gift that opens — at the table, on the estate, in the cellar. Redeemable across
          wine, tours, restaurant and OurView membership. Choose an amount, add a personal note,
          and we&rsquo;ll handle the rest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
          className="mt-7 md:mt-9"
        >
          <a href="#denominations" className="btn-cta">Choose an amount</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Denominations grid with selectable cards ──────────────────────────────
type Denomination = {
  amount: number;
  label: string;
  suggestion: string;
  popular?: boolean;
};

const DENOMINATIONS: Denomination[] = [
  { amount: 25, label: "Twenty-five", suggestion: "A thoughtful thank-you — covers a bottle of NV or a Sunday tasting flight." },
  { amount: 50, label: "Fifty", suggestion: "The signature gift — Bloomsbury or Cavendish NV plus shipping to anywhere in the UK." },
  { amount: 100, label: "One hundred", suggestion: "Tour-and-tasting for two, or a Magnum of Bloomsbury for a milestone moment.", popular: true },
  { amount: 200, label: "Two hundred", suggestion: "A weekend at the estate — tour, lunch at The Rows & Vine and a vintage bottle home." },
];

function DenominationGrid() {
  const [selected, setSelected] = useState<number>(100);
  const [custom, setCustom] = useState<string>("");

  const finalAmount = custom ? Number(custom) : selected;
  const mailto =
    `mailto:${VOUCHER_EMAIL}` +
    `?subject=${encodeURIComponent(`Gift Voucher Order — £${finalAmount}`)}` +
    `&body=${encodeURIComponent(
      `Hello,\n\nI'd like to order a Ridgeview gift voucher.\n\n` +
        `Voucher amount: £${finalAmount}\n` +
        `Recipient name: \n` +
        `Recipient email (for digital delivery): \n` +
        `Personal message (optional): \n` +
        `Send on (date — leave blank for immediate): \n\n` +
        `Buyer details:\nName: \nEmail: \nPhone: \n\n` +
        `Thank you.\n`,
    )}`;

  return (
    <section id="denominations" className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06] scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Choose Your Amount ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              Four amounts, <span className="text-[#C8A96E]">or your own</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="font-body text-white/65 leading-[1.85] mx-auto mt-6" style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300, maxWidth: "560px" }}>
              Pre-set denominations cover most occasions. For bespoke or higher amounts, use the
              custom field — we&rsquo;ll arrange it personally.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10">
          {DENOMINATIONS.map((d, i) => {
            const isSelected = !custom && selected === d.amount;
            return (
              <FadeUp key={d.amount} delay={0.3 + i * 0.06}>
                <button
                  onClick={() => { setSelected(d.amount); setCustom(""); }}
                  className={`relative w-full h-full text-left rounded-md border p-7 md:p-8 transition-all duration-300 ${
                    isSelected
                      ? "border-[#C8A96E] bg-[#1a1612]"
                      : "border-white/[0.10] bg-[#0d0d0d] hover:border-[#C8A96E]/40"
                  }`}
                  aria-pressed={isSelected}
                >
                  {d.popular && (
                    <span
                      className="absolute top-4 right-4 font-body text-[#C8A96E] uppercase tracking-[0.25em] border border-[#C8A96E]/40 px-2 py-1 rounded-sm"
                      style={{ fontSize: "9px", fontWeight: 400 }}
                    >
                      Popular
                    </span>
                  )}
                  <p
                    className="font-display italic text-[#C8A96E]/70 mb-2"
                    style={{ fontSize: "13px", fontWeight: 400 }}
                  >
                    {d.label}
                  </p>
                  <p
                    className="font-display italic text-cream leading-none mb-4"
                    style={{ fontSize: "clamp(40px, 4vw, 56px)", fontWeight: 400 }}
                  >
                    £{d.amount}
                  </p>
                  <p
                    className="font-body text-white/55 leading-[1.7]"
                    style={{ fontSize: "13px", fontWeight: 300 }}
                  >
                    {d.suggestion}
                  </p>
                </button>
              </FadeUp>
            );
          })}
        </div>

        {/* Custom amount input */}
        <FadeUp delay={0.6}>
          <div className="max-w-[680px] mx-auto bg-[#0d0d0d] border border-white/[0.08] rounded-md p-6 md:p-8 mb-10">
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-3"
              style={{ fontSize: "12px", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase" }}
            >
              Or a Custom Amount
            </p>
            <div className="flex items-center gap-3">
              <span className="font-display italic text-cream" style={{ fontSize: "32px", fontWeight: 400 }}>£</span>
              <input
                type="number"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="Enter amount"
                min="10"
                max="5000"
                className="flex-1 bg-transparent border-b border-white/15 focus:border-[#C8A96E] outline-none font-display italic text-cream py-2 transition-colors"
                style={{ fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 400 }}
              />
            </div>
            <p
              className="font-body text-white/45 mt-3"
              style={{ fontSize: "12px", fontWeight: 300 }}
            >
              From £10 upwards. We&rsquo;ll confirm the order by email before charging.
            </p>
          </div>
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={0.7}>
          <div className="text-center">
            <a href={mailto} className="btn-cta inline-flex items-center gap-3">
              <span>Order — £{finalAmount || 0}</span>
            </a>
            <p
              className="font-body text-white/45 mt-5 mx-auto"
              style={{ fontSize: "12.5px", fontWeight: 300, letterSpacing: "0.04em", maxWidth: "520px" }}
            >
              Vouchers are issued digitally within one working day. Physical gift cards available
              on request — add a note when ordering.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── How it works ──────────────────────────────────────────────────────────
const STEPS = [
  { n: "01", title: "Choose & order", body: "Pick a denomination (or set your own), add a personal note, and email your order. We confirm within one working day." },
  { n: "02", title: "Delivered digitally", body: "Vouchers arrive as a beautifully designed PDF with a unique code — sent direct to the recipient on the date you choose." },
  { n: "03", title: "Redeemable anywhere", body: "Across our wine, vineyard tours, The Rows & Vine restaurant and OurView membership. Valid 12 months from issue." },
];

function HowItWorks() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}><p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>[ How It Works ]</p></FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
              Three steps to <span className="text-[#C8A96E]">gifted</span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {STEPS.map((s, i) => (
            <FadeUp key={s.n} delay={0.3 + i * 0.1}>
              <div>
                <p
                  className="font-display italic text-[#C8A96E]/40 mb-4 leading-none"
                  style={{ fontSize: "clamp(56px, 6vw, 80px)", fontWeight: 400 }}
                >
                  {s.n}
                </p>
                <h3
                  className="font-display italic text-cream leading-[1.15] mb-3"
                  style={{ fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 400 }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-body text-white/55 leading-[1.75]"
                  style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 300 }}
                >
                  {s.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Redeemable across ─────────────────────────────────────────────────────
const REDEEM_TARGETS = [
  { label: "Wine", href: "/wines", body: "Across the full catalogue — from Bloomsbury NV to vintage Magnums." },
  { label: "Vineyard Tours", href: "/vineyard-booking", body: "Public dates, private experiences, and bespoke vineyard programmes." },
  { label: "The Rows & Vine", href: "/restaurant", body: "Seasonal dining at our restaurant in the vines (spring–summer)." },
  { label: "OurView Membership", href: "/wine-club", body: "Apply against the cost of your first year of OurView wine club." },
];

function RedeemSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}><p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>[ Redeemable Across ]</p></FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
              One voucher, <span className="text-[#C8A96E]">four ways</span> to enjoy it
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {REDEEM_TARGETS.map((r, i) => (
            <FadeUp key={r.label} delay={0.3 + i * 0.05}>
              <Link
                href={r.href}
                className="group block bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md p-6 md:p-7 h-full transition-colors duration-400"
              >
                <h3
                  className="font-display italic text-cream group-hover:text-white leading-[1.18] mb-3 transition-colors"
                  style={{ fontSize: "clamp(20px, 1.8vw, 24px)", fontWeight: 400 }}
                >
                  {r.label}
                </h3>
                <p
                  className="font-body text-white/55 leading-[1.7] mb-4"
                  style={{ fontSize: "13px", fontWeight: 300 }}
                >
                  {r.body}
                </p>
                <span
                  className="font-body text-[#C8A96E]/70 group-hover:text-[#C8A96E] uppercase tracking-[0.2em] transition-colors"
                  style={{ fontSize: "10px", fontWeight: 400 }}
                >
                  Explore →
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── T&Cs / FAQs ───────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How long is the voucher valid?",
    a: "12 months from the date of issue. We&rsquo;ll send a friendly reminder one month before expiry.",
  },
  {
    q: "Can the voucher be used in multiple visits?",
    a: "Yes — vouchers can be redeemed across multiple orders or visits until the full balance is used.",
  },
  {
    q: "Is the voucher refundable?",
    a: "Vouchers are non-refundable but can be transferred to another recipient up to seven days from issue. Email us with the new recipient&rsquo;s details.",
  },
  {
    q: "Do you offer physical gift cards?",
    a: "Yes — for higher-value gifts we can post a printed card to the recipient (UK only). Mention this in your order note.",
  },
];

function FaqSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-24 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16">
        <div className="text-center mb-10 md:mb-12">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-4" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Voucher FAQs ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 400 }}>
              Good to <span className="text-[#C8A96E]">know</span>
            </h2>
          </FadeUp>
        </div>
        <div className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
          {FAQS.map((f, i) => (
            <FadeUp key={i} delay={0.25 + i * 0.05}>
              <details className="group py-5 md:py-6">
                <summary className="cursor-pointer list-none flex items-start gap-4">
                  <h3
                    className="flex-1 font-display italic text-cream group-hover:text-white transition-colors"
                    style={{ fontSize: "clamp(17px, 1.5vw, 20px)", fontWeight: 400 }}
                  >
                    {f.q}
                  </h3>
                  <span
                    className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 mt-0.5 rounded-sm border border-white/15 group-hover:border-[#C8A96E]/50 text-white/60 group-hover:text-[#C8A96E] transition-all group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p
                  className="font-body text-white/65 leading-[1.85] mt-3 max-w-[720px]"
                  style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 300 }}
                  dangerouslySetInnerHTML={{ __html: f.a }}
                />
              </details>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function GiftVouchersPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><DenominationGrid /></ScrollReset>
        <ScrollReset><HowItWorks /></ScrollReset>
        <ScrollReset><RedeemSection /></ScrollReset>
        <ScrollReset><FaqSection /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
