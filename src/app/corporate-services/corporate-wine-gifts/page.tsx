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
// B2B Procurement / Corporate-Gifting enquiries route through the general
// info inbox until a dedicated corporate@ address is confirmed by Ridgeview.
const CORPORATE_EMAIL = "info@ridgeview.co.uk";

const CORPORATE_GIFTS_MAILTO =
  `mailto:${CORPORATE_EMAIL}` +
  `?subject=${encodeURIComponent("Corporate wine & gifting enquiry — Ridgeview")}` +
  `&body=${encodeURIComponent(
    "Hello,\n\n" +
      "I'd like to enquire about corporate wine gifts / branded engraving from Ridgeview.\n\n" +
      "Company: \n" +
      "Industry / sector: \n" +
      "Approx. quantity: \n" +
      "Desired delivery window: \n" +
      "Branding / engraving requirements: \n" +
      "Budget guidance: \n\n" +
      "Contact:\nName: \nRole: \nPhone: \n\n" +
      "Thank you.\n",
  )}`;

// ─── Helpers ────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// ─── Section: Hero ─────────────────────────────────────────────────────────
function PageHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="top" ref={ref} className="relative h-svh md:h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale, opacity: imgOpacity }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/corporate-services/wine-gifts/hero.webp`}
          alt="Ridgeview corporate wine gifting — branded engraved sparkling wine bottles for business clients"
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-9"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1), 0 0px 30px rgba(0,0,0,0.9)" }}
        >
          [ Corporate Services · For Business ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Corporate Wine <span className="text-[#C8A96E]">and Gift</span> Services
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Premium English sparkling wine for brand experiences, client gifting and corporate
          partnerships. Flexible, scalable and impactful solutions for every sector — from a
          single thank-you to a thousand-bottle activation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
          className="mt-7 md:mt-9 flex flex-wrap gap-3 md:gap-4"
        >
          <a href={CORPORATE_GIFTS_MAILTO} className="btn-cta">
            Enquire about your project
          </a>
          <a href="#industries" className="btn-cta">
            Explore industries
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Section: Industry Grid — "Corporate Wine Solutions for Every Industry" ─
type Industry = { title: string; body: string; image: string };

const INDUSTRIES: Industry[] = [
  {
    title: "Luxury Brand Partnerships",
    body: "Sophisticated wine offerings for high-profile events and private client experiences — partnership pairings that elevate every brand moment.",
    image: "luxury-brand-partnerships.webp",
  },
  {
    title: "Retail & In-Store Experiences",
    body: "Transform product launches, VIP evenings and brand activations into memorable experiences for your guests, with sparkling that opens conversations.",
    image: "retail-in-store.webp",
  },
  {
    title: "Branded Corporate Gifts & Engraving",
    body: "Bespoke wine solutions tailored to your business — branded labels, custom engraving and personalised gift notes that align with your brand voice.",
    image: "branded-gifts.webp",
  },
  {
    title: "Property, Real Estate & Construction",
    body: "From exchange of contracts to new-home handovers, we help estate agents, property developers and construction companies delight clients and enhance brand reputation.",
    image: "property-real-estate.webp",
  },
  {
    title: "Motor & Automotive Industry Gifts & Events",
    body: "From high-profile automotive events to rewarding new car owners, we help dealerships and manufacturers nurture customer loyalty and create memorable client experiences.",
    image: "motor-automotive.webp",
  },
  {
    title: "Prospect & Partner Appreciation Gifts",
    body: "Build trust, secure new partnerships and drive commercial success — from legal and financial services to marketing, advertising and creative agencies.",
    image: "prospect-appreciation.webp",
  },
];

function IndustryGrid() {
  return (
    <section id="industries" className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06] scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ For Every Sector ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}>
              Corporate Wine Solutions for Every <span className="text-[#C8A96E]">Industry</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p
              className="subline-section mx-auto"
            >
              Ridgeview is a leading corporate wine supplier across the UK, working with businesses
              of every shape and scale. Find the sector that fits and start the conversation.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {INDUSTRIES.map((item, i) => (
            <FadeUp key={item.title} delay={0.35 + i * 0.06}>
              <div className="group h-full bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md overflow-hidden transition-all duration-400">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}/images/corporate-services/wine-gifts/${item.image}`}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition-colors duration-700 group-hover:from-black/40" />
                </div>
                <div className="p-7 md:p-8">
                  <h3
                    className="font-display italic text-cream leading-[1.18] mb-3"
                    style={{ fontSize: "clamp(20px, 1.9vw, 26px)", fontWeight: 400 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-body text-white/55 leading-[1.7]"
                    style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", fontWeight: 400 }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Bridge banner — "Unforgettable Impressions" ──────────────────
function BridgeBanner() {
  return (
    <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden border-t border-white/[0.06]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/corporate-services/wine-gifts/limited-edition-collection.webp`}
        alt="Ridgeview corporate limited-edition wine collection"
        className="absolute inset-0 w-full h-full object-cover object-[center_55%]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(0,0,0,0.5) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-16">
        <div className="text-center max-w-[820px]">
          <FadeUp delay={0.1}>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-5"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
            >
              [ Brand Moments ]
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2
              className="font-display italic text-cream leading-[1.15]"
              style={{
                fontSize: "clamp(28px, 3.8vw, 56px)",
                fontWeight: 400,
                textShadow: "0 2px 12px rgba(0,0,0,0.9)",
              }}
            >
              Unforgettable Impressions, <span className="text-[#C8A96E]">Effortlessly Delivered</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p
              className="font-body text-white/70 leading-[1.85] mx-auto mt-6"
              style={{
                fontSize: "clamp(14px, 1.3vw, 16px)",
                fontWeight: 400,
                maxWidth: "620px",
                textShadow: "0 1px 8px rgba(0,0,0,0.8)",
              }}
            >
              Reward employees, strengthen client relationships, host a company celebration. Every
              bottle is a brand moment — Méthode Traditionnelle sparkling, made in Sussex, served
              wherever you need it.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Benefits — "Corporate Services That Work for Your Business" ──
const BENEFITS = [
  {
    title: "Flexible & Scalable",
    body: "From a single bottle to a multi-thousand activation, our team handles orders of every size, year-round.",
  },
  {
    title: "Seamless Logistics",
    body: "We manage delivery and fulfilment end-to-end so your team can stay focused on the relationships that matter.",
  },
  {
    title: "Award-winning wines",
    body: "Globally recognised English sparkling — quality that reflects the standards of the brand giving them.",
  },
  {
    title: "Branding & Personalisation",
    body: "Custom gift messages, branded literature, bespoke bottle engraving — every detail matches your voice.",
  },
  {
    title: "Dedicated Support",
    body: "A named account manager handles your orders, briefs and post-event follow-ups from start to finish.",
  },
  {
    title: "Sustainability First",
    body: "Founder member of Sustainable Wines of Great Britain — gift responsibly, in line with your ESG commitments.",
  },
];

function BenefitsSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Why Ridgeview ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}>
              Corporate Services That <span className="text-[#C8A96E]">Work</span> for Your Business
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p
              className="subline-section mx-auto mt-6"
            >
              Six reasons procurement teams and event leads come back to us — the things that make
              corporate wine services with Ridgeview hit differently.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 md:gap-y-14">
          {BENEFITS.map((b, i) => (
            <FadeUp key={b.title} delay={0.35 + i * 0.05}>
              <div className="border-t border-[#C8A96E]/25 pt-6">
                <h3
                  className="font-display italic text-cream leading-[1.15] mb-3"
                  style={{ fontSize: "clamp(20px, 1.85vw, 24px)", fontWeight: 400 }}
                >
                  {b.title}
                </h3>
                <p
                  className="font-body text-white/55 leading-[1.75]"
                  style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", fontWeight: 400 }}
                >
                  {b.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Testimonials — "Heard on the Grapevine" ──────────────────────
const TESTIMONIALS = [
  {
    quote:
      "The team makes us feel like they really value our business and nothing is ever too much trouble for them. The whole customer experience when dealing with Ridgeview is great as they are a joy to work with.",
    attribution: "Corporate client",
  },
  {
    quote:
      "We have been giving clients and buyers the Ridgeview bubbly for a while now and it is always very well received on completion day! The ordering and delivery process is seamless and extremely quick — such a wonderful service.",
    attribution: "Estate agency partner",
  },
  {
    quote:
      "We chose Ridgeview's Blanc de Noirs following a taste test by our Senior Management Team. The bottles were individually boxed giving a real wow factor and we received excellent customer service.",
    attribution: "Corporate buyer",
  },
];

function TestimonialsSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Heard on the Grapevine ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              What our partners <span className="text-[#C8A96E]">say</span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={0.3 + i * 0.08}>
              <blockquote className="h-full bg-[#010101] border border-white/[0.08] rounded-md p-7 md:p-8 relative">
                <span
                  aria-hidden
                  className="absolute -top-1 left-6 font-display italic text-[#C8A96E]/15 select-none"
                  style={{ fontSize: "84px", lineHeight: 1 }}
                >
                  &ldquo;
                </span>
                <p
                  className="font-display italic text-cream/85 leading-[1.55] relative z-10"
                  style={{ fontSize: "clamp(15px, 1.3vw, 17px)", fontWeight: 400 }}
                >
                  {t.quote}
                </p>
                <footer
                  className="font-body text-[#C8A96E]/70 tracking-[0.25em] uppercase mt-6"
                  style={{ fontSize: "11px", fontWeight: 400 }}
                >
                  — {t.attribution}
                </footer>
              </blockquote>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: CTA — "Your Corporate Wine Solution Starts Here" ─────────────
// ─── Brochure Download — dedicated B2B conversion asset ────────────────────
// Two PDFs from the legacy Ridgeview corporate hub (mirrored locally):
// the main 2025 corporate brochure (year-round reference) + the Christmas
// brochure (seasonal). Renders as an editorial download card with a clear
// file-size note so procurement leads know what they're committing to.
function BrochureDownloadSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[45fr_55fr] gap-10 md:gap-14 items-center">
          <FadeUp delay={0.1}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Download · 2025 Corporate Brochure ]
            </p>
            <h2 className="font-display italic text-cream leading-[1.1] mb-5" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 400 }}>
              Full catalogue, <span className="text-[#C8A96E]">in your inbox</span>
            </h2>
            <p className="font-body text-white/65 leading-[1.85] mb-7" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 400 }}>
              Our full corporate brochure — every wine, every gift format, every personalisation
              option. Designed for procurement teams to share internally and use as a year-round
              reference.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <a
                href={`${basePath}/pdfs/corporate-services/corporate-brochure-2025.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta inline-flex items-center gap-2.5"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download brochure · PDF</span>
              </a>
            </div>
            <p
              className="font-body text-white/40 mt-4"
              style={{ fontSize: "11.5px", fontWeight: 400, letterSpacing: "0.04em" }}
            >
              PDF · 8.5 MB · opens in new tab
            </p>
            <p
              className="font-body text-white/45 mt-6 leading-relaxed"
              style={{ fontSize: "12.5px", fontWeight: 400, letterSpacing: "0.04em" }}
            >
              Seasonal offer? See our{" "}
              <a
                href={`${basePath}/pdfs/corporate-services/corporate-christmas-brochure-2025.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C8A96E] hover:underline"
              >
                2025 Christmas Brochure
              </a>{" "}
              (12.5 MB).
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-white/[0.06]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/images/corporate-services/wine-gifts/limited-edition-collection.webp`}
                alt="Ridgeview Corporate Brochure 2025 — preview"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-display italic text-cream/85 tracking-widest"
                  style={{ fontSize: "clamp(20px, 2.4vw, 32px)", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
                >
                  2025 Corporate Brochure
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function StartHereCTA() {
  return (
    <section id="enquire" className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06] overflow-hidden scroll-mt-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Start the Conversation ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(32px, 4.2vw, 58px)", fontWeight: 400 }}>
            Your Corporate Wine Solution <span className="text-[#C8A96E]">Starts Here</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p
            className="subline-section mx-auto mb-10"
          >
            Whether you&rsquo;re briefing a one-off project or planning a year&rsquo;s gifting calendar,
            we&rsquo;d love to hear from you. Tell us what you have in mind.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a href={CORPORATE_GIFTS_MAILTO} className="btn-cta">
              Email {CORPORATE_EMAIL}
            </a>
            <a href="tel:+441444242040" className="btn-cta">
              Call 01444 242040
            </a>
          </div>
        </FadeUp>
        <FadeUp delay={0.45}>
          <p
            className="font-body text-white/45 leading-relaxed mt-10 mx-auto"
            style={{ fontSize: "12.5px", fontWeight: 400, letterSpacing: "0.04em", maxWidth: "520px" }}
          >
            Looking for hospitality at the estate instead? See{" "}
            <Link href="/corporate-services/corporate-hospitality-events" className="text-[#C8A96E] hover:underline">
              Corporate Hospitality & Events
            </Link>
            .
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section: FAQs ─────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What kind of corporate gifts do you offer?",
    a: "Award-winning English sparkling wine, presented in single-bottle gift boxes, cases, or fully branded sets with custom engraving and personalised gift notes. From employee thank-yous to client celebration packages and bespoke runs for activations — we tailor every order to the moment.",
  },
  {
    q: "Which wines are best for corporate events?",
    a: "The right wine depends on the occasion, guest list and style of event. Our team will recommend the ideal selection from our corporate packages — Bloomsbury NV is the most-poured house style for receptions, Blanc de Noirs lifts dinners, and Magnums are ideal for large-format moments.",
  },
  {
    q: "Do you supply branded wine for housewarmings and property handovers?",
    a: "Yes — premium wines with personalised engraving and custom gift notes for estate agents, property developers and homebuilders. Build a year-round gifting calendar around exchanges, completions and post-move milestones.",
  },
  {
    q: "How do you handle delivery for corporate orders?",
    a: "We take care of everything — order, packing, and delivery straight to the recipient. Orders can typically be set up the day of your enquiry, with next-working-day delivery available for a swift and efficient gifting experience.",
  },
  {
    q: "Can I add my company logo to the bottles?",
    a: `Yes — we offer custom engraving with your brand logo and/or a personalised message. We also include branded gift notes or company literature to complement the gift and align with your brand. Bespoke runs are arranged case-by-case — email ${CORPORATE_EMAIL} to start.`,
  },
];

function FaqSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ FAQs ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400 }}>
              Corporate Wine &amp; <span className="text-[#C8A96E]">Gifting</span> FAQs
            </h2>
          </FadeUp>
        </div>

        <div className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
          {FAQS.map((f, i) => (
            <FadeUp key={i} delay={0.25 + i * 0.05}>
              <details className="group py-6 md:py-7">
                <summary className="cursor-pointer list-none flex items-center gap-4">
                  <h3
                    className="flex-1 font-display italic text-cream group-hover:text-white transition-colors duration-300"
                    style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 400 }}
                  >
                    {f.q}
                  </h3>
                  <span
                    className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-sm border border-white/15 group-hover:border-[#C8A96E]/50 text-white/60 group-hover:text-[#C8A96E] transition-all duration-300 group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p
                  className="font-body text-white/65 leading-[1.85] mt-4 max-w-[760px]"
                  style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 400 }}
                >
                  {f.a}
                </p>
              </details>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function CorporateWineGiftsPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><IndustryGrid /></ScrollReset>
        <BridgeBanner />
        <ScrollReset><BenefitsSection /></ScrollReset>
        <ScrollReset><TestimonialsSection /></ScrollReset>
        <ScrollReset><BrochureDownloadSection /></ScrollReset>
        <ScrollReset><StartHereCTA /></ScrollReset>
        <ScrollReset><FaqSection /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
