"use client";

import { useRef, useState, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

const HELP_EMAIL = "info@ridgeview.co.uk";

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
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={ref} className="relative h-[60svh] md:h-[60vh] w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ opacity: imgOpacity }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/cellar-bg.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-black/80" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
        >
          [ Help &amp; FAQs ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            How can we <span className="text-[#C8A96E]">help</span>?
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-body text-white/65 max-w-[680px]"
          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.7, textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Browse the topics below. If your question isn&rsquo;t covered, reach the team directly
          at the bottom of the page — we reply inside one working day.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── FAQ data ──────────────────────────────────────────────────────────────
type Faq = { q: string; a: string };
type Category = { id: string; label: string; kicker: string; faqs: Faq[] };

const CATEGORIES: Category[] = [
  {
    id: "delivery",
    label: "Delivery",
    kicker: "[ Shipping · Tracking · Damages ]",
    faqs: [
      {
        q: "Do you ship overseas?",
        a: `Not directly via the website. Please email ${HELP_EMAIL} for a shipping quote or a list of overseas distributors and we&rsquo;ll route you to the right partner.`,
      },
      {
        q: "When will my order arrive?",
        a: "Orders confirmed by 12 noon are dispatched the same day via DHL Next Working Day. Orders placed after 12 noon dispatch the next working day; Friday orders arrive on Monday (or the next working day if Monday is a bank holiday).",
      },
      {
        q: "Will I receive a tracking notification?",
        a: "Yes — once your order ships, you&rsquo;ll receive a notification with tracking information so you can follow the parcel through to your door.",
      },
      {
        q: "What if my order arrives damaged?",
        a: `Accidents happen occasionally. Photograph the parcel and email ${HELP_EMAIL} within 24 hours of receipt with your order details, a description of the damage and the photo. We&rsquo;ll put it right.`,
      },
      {
        q: "Can I include a gift message?",
        a: "Yes — easy to do. Complete the message section in the online order flow and we&rsquo;ll include your chosen note with the gift.",
      },
      {
        q: "Can I collect my order from the estate?",
        a: "We offer Click &amp; Collect for online orders. Add a note to your order and we&rsquo;ll send confirmation when it&rsquo;s ready to collect from our Winery Shop.",
      },
    ],
  },
  {
    id: "general",
    label: "General & Visit",
    kicker: "[ Site · Access · Conditions ]",
    faqs: [
      {
        q: "Can under-18s order from the website?",
        a: "No. As required by UK law, ridgeview.co.uk and online ordering are open only to those 18 and over.",
      },
      {
        q: "Are your terms and conditions available?",
        a: "Yes — our full T&Cs cover orders, deliveries, returns, vouchers and visits. See the link in the footer for the current version.",
      },
      {
        q: "What are your opening hours?",
        a: "Office, Winery Shop and The Rows & Vine restaurant each have their own hours. The full breakdown sits on the restaurant page — visit /restaurant#hours for the current schedule across seasons.",
      },
      {
        q: "What about accessibility?",
        a: `Step-free access runs across the estate — vineyard, winery shop, tasting rooms, restaurant, bar and bathrooms. We also have dedicated disabled parking. If anyone in your party has additional access or mobility requirements, email ${HELP_EMAIL} or call 01444 242040 ahead of your visit so we can prepare.`,
      },
    ],
  },
  {
    id: "tours",
    label: "Tours & Tastings",
    kicker: "[ Visits · Groups · Restaurant ]",
    faqs: [
      {
        q: "How do I book a vineyard tour?",
        a: "Public tour dates and private experiences run year-round via our booking partner. See /vineyard-booking for the calendar and to choose your tour type.",
      },
      {
        q: "Can I book a private group tour?",
        a: "Yes — groups of 8 or more book directly with us by email so we can plan around your party size, dietary needs and the season.",
      },
      {
        q: "How do I reserve a table at The Rows & Vine?",
        a: "Tables for parties of 1–7 via the live ResDiary widget on /restaurant. Groups of 8+, weddings and private events by email — we&rsquo;ll plan around the date and the season.",
      },
      {
        q: "Are children welcome?",
        a: "Yes, under-18s are welcome at our restaurant. They must be supervised by an adult during the visit. We operate a Challenge 25 policy when serving alcohol.",
      },
      {
        q: "Are dogs allowed?",
        a: "Only guide and assistance dogs are allowed at The Rows & Vine.",
      },
    ],
  },
  {
    id: "press",
    label: "Media & Press",
    kicker: "[ Journalists · PR · Imagery ]",
    faqs: [
      {
        q: "Where can I find press releases?",
        a: "Visit /press for our current press archive — recent launches, partnerships, awards and corporate milestones.",
      },
      {
        q: "Who handles media enquiries?",
        a: `Media requests, images and interviews go through our Marketing &amp; Communications team. Email ${HELP_EMAIL} with your brief and timeline and we&rsquo;ll route it to the right voice.`,
      },
      {
        q: "Can I request high-resolution imagery?",
        a: "Yes — we maintain a media library of vineyard, cellar, bottle and lifestyle imagery. Send us the context (publication, deadline, intended use) and we&rsquo;ll share the appropriate assets.",
      },
    ],
  },
];

function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
      {items.map((f, i) => (
        <div key={i} className="py-5 md:py-6">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-start gap-4 text-left group"
            aria-expanded={openIdx === i}
          >
            <h4
              className="flex-1 font-display italic text-cream group-hover:text-white transition-colors duration-300 leading-[1.25]"
              style={{ fontSize: "clamp(17px, 1.55vw, 21px)", fontWeight: 400 }}
            >
              {f.q}
            </h4>
            <span
              className={`flex-shrink-0 inline-flex items-center justify-center w-7 h-7 mt-1 rounded-sm border border-white/15 group-hover:border-[#C8A96E]/50 text-white/60 group-hover:text-[#C8A96E] transition-all duration-300 ${openIdx === i ? "rotate-45" : ""}`}
              aria-hidden
            >
              +
            </span>
          </button>
          <div
            className={`grid transition-[grid-template-rows] duration-400 ease-out ${openIdx === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          >
            <div className="overflow-hidden">
              <p
                className="font-body text-white/65 leading-[1.85] mt-4 max-w-[760px]"
                style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 300 }}
                dangerouslySetInnerHTML={{ __html: f.a }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CategoryNav() {
  return (
    <section className="relative bg-[#010101] py-10 md:py-14 border-t border-white/[0.06] sticky top-0 z-30">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16">
        <FadeUp delay={0.05}>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="font-body text-white/60 hover:text-[#C8A96E] border border-white/15 hover:border-[#C8A96E]/50 px-5 py-2.5 rounded-sm uppercase tracking-[0.2em] transition-all duration-300"
                style={{ fontSize: "11px", fontWeight: 400 }}
              >
                {c.label}
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function CategorySection({ category }: { category: Category }) {
  return (
    <section id={category.id} className="relative bg-[#010101] py-16 md:py-24 border-t border-white/[0.06] scroll-mt-24">
      <div className="max-w-[1000px] mx-auto px-6 md:px-16">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-4" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            {category.kicker}
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-10" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            {category.label}
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <FaqAccordion items={category.faqs} />
        </FadeUp>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}><p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>[ Still Need Help? ]</p></FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            Ask us <span className="text-[#C8A96E]">directly</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="font-body text-white/65 leading-[1.85] mx-auto mb-10" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300, maxWidth: "520px" }}>
            One working day or sooner. For visit-day questions, calling is fastest.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a href={`mailto:${HELP_EMAIL}`} className="btn-cta">Email {HELP_EMAIL}</a>
            <a href="tel:+441444242040" className="btn-cta">Call 01444 242040</a>
          </div>
        </FadeUp>
        <FadeUp delay={0.45}>
          <p className="font-body text-white/45 leading-relaxed mt-10 mx-auto" style={{ fontSize: "12.5px", fontWeight: 300, letterSpacing: "0.04em", maxWidth: "520px" }}>
            Visit-day question? See the{" "}
            <Link href="/contact" className="text-[#C8A96E] hover:underline">contact hub</Link>{" "}
            for the right inbox.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

export default function HelpPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <CategoryNav />
        {CATEGORIES.map((cat) => (
          <ScrollReset key={cat.id}>
            <CategorySection category={cat} />
          </ScrollReset>
        ))}
        <ScrollReset><ContactCTA /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
