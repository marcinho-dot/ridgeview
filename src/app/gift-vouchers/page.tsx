"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

// ─── Email constants ────────────────────────────────────────────────────────
// All voucher enquiries route through the general info inbox. Content on
// this page is derived from the legacy ridgeview.co.uk Voucher T&Cs page
// (/voucher-ts-and-cs/) — the two voucher products that actually exist
// in the Ridgeview catalogue are restaurant-specific and tour-specific,
// NOT a generic gift card across the whole site.
const VOUCHER_EMAIL = "info@ridgeview.co.uk";

const TOUR_VOUCHER_MAILTO =
  `mailto:${VOUCHER_EMAIL}` +
  `?subject=${encodeURIComponent("Tour & Tasting voucher enquiry — Ridgeview")}` +
  `&body=${encodeURIComponent(
    "Hello,\n\nI'd like to enquire about a Tour & Tasting voucher.\n\n" +
      "Recipient name: \n" +
      "Recipient email (for digital delivery): \n" +
      "Personal message (optional): \n" +
      "Postal delivery instead of email? Y/N: \n\n" +
      "Buyer:\nName: \nPhone: \n\nThank you.\n",
  )}`;

const ROWS_VINE_VOUCHER_MAILTO =
  `mailto:${VOUCHER_EMAIL}` +
  `?subject=${encodeURIComponent("The Rows & Vine voucher enquiry — Ridgeview")}` +
  `&body=${encodeURIComponent(
    "Hello,\n\nI'd like to enquire about a The Rows & Vine restaurant voucher.\n\n" +
      "Recipient name: \n" +
      "Recipient email (for digital delivery): \n" +
      "Personal message (optional): \n" +
      "Postal delivery instead of email? Y/N: \n\n" +
      "Buyer:\nName: \nPhone: \n\nThank you.\n",
  )}`;

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
          alt="A Ridgeview toast in the vineyard — vouchers for tours and the restaurant"
          className="absolute inset-0 w-full h-full object-cover object-[center_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-9">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
        >
          [ Experience Vouchers · Sussex ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Gift the <span className="text-[#C8A96E]">experience</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Two experience vouchers, redeemable at the estate — a Tour &amp; Tasting for two, or a
          meal at The Rows &amp; Vine. Valid for 12 months from purchase, delivered by email or post.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
          className="mt-7 md:mt-9"
        >
          <a href="#vouchers" className="btn-cta">Compare vouchers</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Status banner — sales currently on hold ──────────────────────────────
// Per ridgeview.co.uk/gift-vouchers/ (May 2026 check): voucher sale has
// been paused while existing voucher holders redeem. The page on UK
// signals a reopening but no firm date — we mirror that honestly
// here rather than implying a working cart on our side.
function StatusBanner() {
  return (
    <section className="relative bg-[#0a0a0a] border-t border-[#C8A96E]/20 py-6 md:py-7">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
        <p
          className="font-display italic text-[#C8A96E] tracking-[0.25em] uppercase shrink-0"
          style={{ fontSize: "11px", fontWeight: 500 }}
        >
          [ Status ]
        </p>
        <p
          className="font-body text-white/65 leading-[1.7] text-center md:text-left"
          style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", fontWeight: 400 }}
        >
          New voucher sales are paused while existing voucher holders redeem.
          If you already hold a voucher you can still redeem it online or onsite as usual.
          For any voucher query, email{" "}
          <a href={`mailto:${VOUCHER_EMAIL}`} className="text-[#C8A96E] hover:underline">
            {VOUCHER_EMAIL}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

// ─── Two voucher products ──────────────────────────────────────────────────
type VoucherProduct = {
  kicker: string;
  title: string;
  intro: string;
  terms: string[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
};

const VOUCHERS: VoucherProduct[] = [
  {
    kicker: "[ For Two · Onsite ]",
    title: "Tour & Tasting Voucher",
    intro:
      "A guided vineyard tour and tasting for two — booked through our online system at a date that works for the recipient.",
    terms: [
      "Valid 12 months from the date of purchase",
      "Redeems against a Tour & Tasting for two via the online booking system",
      "Non-refundable and not redeemable for cash",
      "Cannot be extended past the expiration date",
    ],
    ctaLabel: "Enquire about a Tour voucher",
    ctaHref: TOUR_VOUCHER_MAILTO,
    image: "/images/articles/luxury-sparkling-wine-gift-guide/inline-3.webp",
    imageAlt: "Ridgeview Tour & Tasting voucher — vineyard experience for two",
  },
  {
    kicker: "[ Restaurant · Onsite ]",
    title: "The Rows & Vine Voucher",
    intro:
      "A meal voucher redeemable in The Rows & Vine restaurant on the estate — seasonal plates, vineyard view, sparkling on the table.",
    terms: [
      "Valid 12 months from the date of purchase",
      "Redeemable only in The Rows & Vine restaurant, onsite at Ridgeview",
      "Gratuity is not included",
      "Non-refundable and not redeemable for cash",
      "Cannot be extended past the expiration date",
    ],
    ctaLabel: "Enquire about a Restaurant voucher",
    ctaHref: ROWS_VINE_VOUCHER_MAILTO,
    image: "/images/restaurant/garden-toast.webp",
    imageAlt: "The Rows & Vine voucher — vineyard dining experience",
  },
];

function VoucherProducts() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <div id="vouchers" className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Two Vouchers ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              Pick the <span className="text-[#C8A96E]">experience</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="subline-section mx-auto mt-6">
              Both vouchers are valid for 12 months from purchase. Both can be delivered
              digitally by email or posted via Royal Mail first class.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {VOUCHERS.map((v, i) => (
            <FadeUp key={v.title} delay={0.3 + i * 0.08}>
              <div className="group h-full bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md overflow-hidden flex flex-col transition-all duration-400">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${v.image}`}
                    alt={v.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                </div>
                <div className="p-7 md:p-8 flex flex-col flex-1">
                  <p
                    className="font-display italic text-[#C8A96E] tracking-widest mb-3"
                    style={{ fontSize: "clamp(11px, 1.05vw, 13px)" }}
                  >
                    {v.kicker}
                  </p>
                  <h3
                    className="font-display italic text-cream group-hover:text-white leading-[1.15] mb-4 transition-colors duration-400"
                    style={{ fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 400 }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="font-body text-white/65 leading-[1.75] mb-6"
                    style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 400 }}
                  >
                    {v.intro}
                  </p>

                  <ul className="space-y-2.5 mb-7">
                    {v.terms.map((t) => (
                      <li
                        key={t}
                        className="flex items-start gap-2.5 font-body text-white/55 leading-[1.6]"
                        style={{ fontSize: "12.5px", fontWeight: 400 }}
                      >
                        <span aria-hidden className="text-[#C8A96E] leading-none pt-1">·</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <a href={v.ctaHref} className="btn-cta">
                      {v.ctaLabel}
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── General T&Cs (verbatim-pattern from UK voucher-ts-and-cs page) ───────
function GeneralTermsSection() {
  // These items mirror the GENERAL TERMS section from ridgeview.co.uk's
  // /voucher-ts-and-cs/ page, kept short and informative.
  const items = [
    "Gift vouchers are sold via our smart-gift partner — orders are confirmed on their platform.",
    "Vouchers arrive either by email to the address provided at order, or by Royal Mail first-class post.",
    "Each voucher carries a unique number and printed pattern for verification.",
    "Vouchers can be redeemed as full or part payment on this site or onsite at Ridgeview Wine Estate.",
    "A gift voucher cannot be used to purchase another gift voucher.",
    "Please double-check the recipient email when ordering — once issued, we can't recover a voucher sent to the wrong address.",
    "Site offers and promotions (including gifts with purchase and discounts) do not apply to voucher purchases.",
  ];
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-16">
        <div className="text-center mb-10 md:mb-12">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-4" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ General Terms ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 400 }}>
              The fine print, in <span className="text-[#C8A96E]">plain English</span>
            </h2>
          </FadeUp>
        </div>
        <FadeUp delay={0.25}>
          <ul className="space-y-4 max-w-[760px] mx-auto">
            {items.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-4 border-t border-white/[0.06] pt-4 first:border-t-0 first:pt-0"
              >
                <span
                  aria-hidden
                  className="font-display italic text-[#C8A96E]/70 leading-none mt-0.5"
                  style={{ fontSize: "18px", fontWeight: 400 }}
                >
                  ·
                </span>
                <p
                  className="font-body text-white/65 leading-[1.85]"
                  style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 400 }}
                >
                  {t}
                </p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── CTA — Hold an existing voucher? ───────────────────────────────────────
function RedeemCTA() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Already Hold a Voucher? ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            Redeem at the <span className="text-[#C8A96E]">estate</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="subline-section mx-auto mb-10">
            Tour vouchers redeem against our online tour booking system. Restaurant vouchers
            redeem onsite at The Rows &amp; Vine. Bring the voucher reference with you.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link href="/vineyard-booking" className="btn-cta">Book a tour</Link>
            <Link href="/restaurant" className="btn-cta">Reserve a table</Link>
          </div>
        </FadeUp>
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
        <StatusBanner />
        <ScrollReset><VoucherProducts /></ScrollReset>
        <ScrollReset><GeneralTermsSection /></ScrollReset>
        <ScrollReset><RedeemCTA /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
