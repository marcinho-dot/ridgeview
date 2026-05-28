"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

// Page added 2026-05-27 in response to Salvatore audit pass.
// Mirrors the UK Wine Bar & Shop standalone page
// (ridgeview.co.uk/visit/visiting-us/wine-bar-shop/). All body
// copy verified against UK source; hero image is the UK product
// page OG image (vineyard pour shot) saved as
// public/images/wine-bar-shop-hero.webp.
//
// Footer link previously pointed to `/restaurant#reserve` and the
// directions venue card to `/vineyard-booking` — both fixed in
// the same commit to point here.

const WINEBAR_EMAIL = "info@ridgeview.co.uk";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

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
          src={`${basePath}/images/wine-bar-shop-hero.webp`}
          alt="Pouring Ridgeview English sparkling at the Wine Bar — vineyard view"
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
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
          [ Meet · Taste · Shop · Unwind ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Ridgeview <span className="text-[#C8A96E]">Wine Bar &amp; Shop</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Overlooking the vines and set within our working winery — a relaxed space dedicated to
          exceptional English wine. Join us for a guided tasting or a glass while discovering
          your next favourite bottle.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ── Intro section (UK body verbatim) ──────────────────────────────────────
function IntroSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Visit ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.1] mb-8" style={{ fontSize: "clamp(28px, 3.4vw, 48px)", fontWeight: 400 }}>
            Visit the Ridgeview <span className="text-[#C8A96E]">Wine Bar &amp; Shop</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="font-body text-white/70 leading-[1.85] mb-5" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 400 }}>
            Overlooking the vines and set within our working winery, the Ridgeview Wine Bar &amp; Shop
            is a relaxed space dedicated to exceptional English wine. Join us for a guided tasting
            or enjoy a glass while discovering your next favourite bottle. You can also pick up
            wines to take home, along with a small selection of wine gifts and accessories.
          </p>
          <p className="font-body text-white/65 leading-[1.85] mb-5" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 400 }}>
            Whether you&rsquo;re visiting with friends or pausing after a countryside walk, it&rsquo;s
            a place to slow down, savour and enjoy good company.
          </p>
          <p className="font-body text-white/65 leading-[1.85]" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 400 }}>
            Our team are always on hand to guide your tasting, share recommendations, and help you
            choose the perfect bottle.
          </p>
        </FadeUp>

        <FadeUp delay={0.35}>
          <div className="mt-10 pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-x-8 gap-y-3">
            <p className="font-body text-white/45 uppercase tracking-[0.2em]" style={{ fontSize: "11px", fontWeight: 400 }}>
              Opening Hours
            </p>
            <p className="font-body text-white/85" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 400 }}>
              Thursday – Monday · 10:30 – 16:00
            </p>
            <Link
              href="/directions#hours"
              className="link-underline font-body text-[#C8A96E]/90 hover:text-[#C8A96E] uppercase tracking-[0.18em]"
              style={{ fontSize: "11px", fontWeight: 400 }}
            >
              All venue hours →
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── A Taste of Ridgeview (guided tasting offer) ───────────────────────────
function TastingSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10 md:gap-16 items-center">
        <FadeUp delay={0.1}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ A Taste of Ridgeview ]
          </p>
          <h2 className="font-display italic text-cream leading-[1.1] mb-6" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 400 }}>
            Book a guided <span className="text-[#C8A96E]">tasting</span>.
          </h2>
          <p className="font-body text-white/70 leading-[1.85] mb-6" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 400, maxWidth: "480px" }}>
            Take a seat overlooking our Chardonnay vineyard and taste the craft and character of
            our world-class English sparkling wine. Led by a Ridgeview guide, you&rsquo;ll sample
            the full line-up of our Signature and Limited Release wines.
          </p>
          <p className="font-body text-white/55 leading-[1.85]" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 400, maxWidth: "480px" }}>
            A relaxed, flavour-focused tasting to discover your favourites for every season and
            celebration, with the option to add limited-edition pours, local cheese or light bites
            along the way.
          </p>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="bg-[#010101] border border-white/[0.08] rounded-md p-7 md:p-9">
            <p className="font-display italic text-[#C8A96E]/80 tracking-widest mb-5" style={{ fontSize: "clamp(12px, 1.15vw, 14px)" }}>
              [ The Format ]
            </p>
            <ul className="space-y-3 mb-7">
              {[
                ["Wines tasted", "6"],
                ["Duration", "30 minutes"],
                ["Price", "£20 per person"],
                ["Eligibility", "Over 18s only"],
                ["Times", "On the hour, 11am – 3pm"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-baseline gap-3 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                  <span className="font-body text-white/35 uppercase tracking-[0.22em] flex-shrink-0" style={{ fontSize: "10.5px", fontWeight: 500, minWidth: "110px" }}>
                    {k}
                  </span>
                  <span className="font-body text-cream" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 400 }}>
                    {v}
                  </span>
                </li>
              ))}
            </ul>
            <p className="font-body text-white/55 mb-7 leading-[1.7]" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 400 }}>
              Advanced booking is recommended; walk-ins are welcome subject to availability.
              Select <em className="not-italic text-cream/90">&ldquo;A Taste of Ridgeview&rdquo;</em>{" "}
              on our booking calendar.
            </p>
            <Link href="/vineyard-booking" className="btn-cta">Book a Tasting</Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── FAQ section (UK FAQs verbatim) ────────────────────────────────────────
const FAQS = [
  {
    q: "What are your opening times?",
    a: "Wine Bar &amp; Shop: Thursday to Monday, 10:30 – 16:00 (closed Tuesday &amp; Wednesday). For office, winery and restaurant hours see /directions#hours.",
  },
  {
    q: "How do I get to Ridgeview?",
    a: "We are about a 30-minute walk or a five-minute car / taxi journey from Burgess Hill station, with regular direct trains from London and Brighton. There is onsite visitor parking available (with EV chargers); vehicles can be left throughout your visit at your own risk. See /directions for full travel details.",
  },
  {
    q: "Can I enhance my visit with a tour or tasting?",
    a: "Yes. Make the most of your visit by booking one of our vineyard and winery tours and tastings — see /vineyard-booking for the calendar and to choose your tour type.",
  },
  {
    q: "How accessible is Ridgeview to visit?",
    a: `Dedicated disabled parking spaces and step-free access from the car park, across the entire estate including the vineyard, winery shop, tasting rooms, restaurant, bar and bathrooms. If anyone in your party has additional access or mobility requirements, please let us know in advance — email ${WINEBAR_EMAIL} or call 01444 242040.`,
  },
  {
    q: "Is the Ridgeview Wine Bar & Shop child-friendly?",
    a: "Yes, under-18s are welcome to visit the Wine Bar &amp; Shop. Children must be supervised by an adult at all times during the visit. We operate a Challenge 25 policy when serving alcohol.",
  },
  {
    q: "How do I get in touch?",
    a: `Email ${WINEBAR_EMAIL} for any enquiries about visiting the Wine Bar &amp; Shop, tours, tastings or visiting in general.`,
  },
];

function FaqSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-4" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Wine Bar &amp; Shop FAQs ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
              Everything you need to <span className="text-[#C8A96E]">know</span>
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
                    style={{ fontSize: "clamp(17px, 1.55vw, 21px)", fontWeight: 400 }}
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
                  className="font-body text-white/65 leading-[1.85] mt-4 max-w-[720px]"
                  style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 400 }}
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

// ── CTA strip ─────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Plan Your Visit ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            Slow down, savour, <span className="text-[#C8A96E]">stay a while</span>.
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="subline-section mx-auto mb-10">
            Walk in for a glass, book a guided tasting, or pair your visit with a vineyard tour
            and dinner at The Rows &amp; Vine.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link href="/vineyard-booking" className="btn-cta">Book a Tasting</Link>
            <Link href="/directions" className="btn-cta">How to Get Here</Link>
            <a href={`mailto:${WINEBAR_EMAIL}?subject=Wine%20Bar%20%26%20Shop%20enquiry`} className="btn-cta">
              Email {WINEBAR_EMAIL}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function WineBarShopPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><IntroSection /></ScrollReset>
        <ScrollReset><TastingSection /></ScrollReset>
        <ScrollReset><FaqSection /></ScrollReset>
        <ScrollReset><CtaSection /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
