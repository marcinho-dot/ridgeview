"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

const GENERAL_EMAIL = "info@ridgeview.co.uk";
const TOURS_EMAIL = "tours@ridgeview.co.uk";

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
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={ref} className="relative h-[70svh] md:h-[75vh] w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale, opacity: imgOpacity }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/hero-bg.jpg`}
          alt="Ridgeview Wine Estate, Sussex"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/75" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
        >
          [ Get in Touch ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#C8A96E]">Contact</span> Ridgeview
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          General enquiries, visits, press, partnerships — find the right inbox below or call us
          directly. Office hours Monday to Friday, 8am to 4.30pm.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Channels grid — route by intent ───────────────────────────────────────
type Channel = { kicker: string; title: string; body: string; email: string; href?: string };

const CHANNELS: Channel[] = [
  {
    kicker: "[ General Enquiries ]",
    title: "Anything else",
    body: "Office, orders, deliveries, account questions, partnerships. The default inbox for anything that doesn't fit a specific channel below.",
    email: GENERAL_EMAIL,
  },
  {
    kicker: "[ Vineyard Tours ]",
    title: "Tour bookings & enquiries",
    body: "Public tour dates, private group bookings (8+), bespoke vineyard experiences — book directly or send a short brief.",
    email: TOURS_EMAIL,
    href: "/vineyard-booking",
  },
  {
    kicker: "[ Restaurant ]",
    title: "The Rows & Vine reservations",
    body: "Tables 1–7 via our online widget. Groups of 8+, weddings and private events by email — we&rsquo;ll plan around your party.",
    email: GENERAL_EMAIL,
    href: "/restaurant#reserve",
  },
  {
    kicker: "[ Corporate ]",
    title: "B2B gifting & events",
    body: "Branded engraving, bulk orders, corporate hospitality at the estate — tailored proposals from a named account manager.",
    email: GENERAL_EMAIL,
    href: "/corporate-services/corporate-wine-gifts",
  },
  {
    kicker: "[ Press & Media ]",
    title: "Media requests",
    body: "Press releases, image library, interviews and statements. Brief us and we&rsquo;ll route it to the right voice.",
    email: GENERAL_EMAIL,
    href: "/press",
  },
  {
    kicker: "[ Careers ]",
    title: "Speculative applications",
    body: "We keep an active talent pool. Send a short note about your background and where you&rsquo;d like to fit.",
    email: GENERAL_EMAIL,
    href: "/careers",
  },
];

function ChannelsSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}><p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>[ Right Inbox, First Time ]</p></FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              How can we <span className="text-[#C8A96E]">help</span>?
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {CHANNELS.map((c, i) => (
            <FadeUp key={c.title} delay={0.3 + i * 0.05}>
              <div className="bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md p-7 md:p-8 h-full transition-colors duration-400 flex flex-col">
                <p className="font-display italic text-[#C8A96E] tracking-widest mb-3" style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}>
                  {c.kicker}
                </p>
                <h3 className="font-display italic text-cream leading-[1.15] mb-3" style={{ fontSize: "clamp(20px, 1.85vw, 26px)", fontWeight: 400 }}>
                  {c.title}
                </h3>
                <p className="font-body text-white/55 leading-[1.75] flex-1 mb-5" style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: c.body }} />
                <div className="flex flex-wrap items-center gap-3">
                  <a href={`mailto:${c.email}`} className="font-body text-[#C8A96E] hover:text-cream transition-colors duration-300" style={{ fontSize: "13px", fontWeight: 400 }}>
                    {c.email}
                  </a>
                  {c.href && (
                    <Link href={c.href} className="font-body text-white/45 hover:text-white/80 transition-colors duration-300 uppercase tracking-[0.2em]" style={{ fontSize: "11px", fontWeight: 400 }}>
                      Visit page →
                    </Link>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Address + phone block ─────────────────────────────────────────────────
function AddressSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <FadeUp delay={0.1}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Visit · Estate ]
          </p>
          <h2 className="font-display italic text-cream leading-[1.1] mb-6" style={{ fontSize: "clamp(28px, 3.2vw, 42px)", fontWeight: 400 }}>
            Find us in Sussex
          </h2>
          <address className="font-body text-white/65 not-italic leading-[1.85]" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 400 }}>
            Ridgeview Wine Estate<br />
            Fragbarrow Lane<br />
            Ditchling Common<br />
            East Sussex<br />
            BN6 8TP
          </address>
          <div className="mt-6">
            <Link href="/directions" className="btn-cta">How to get here</Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Phone · Hours ]
          </p>
          <h2 className="font-display italic text-cream leading-[1.1] mb-6" style={{ fontSize: "clamp(28px, 3.2vw, 42px)", fontWeight: 400 }}>
            Call the office
          </h2>
          <a href="tel:+441444242040" className="font-display italic text-cream/90 hover:text-[#C8A96E] transition-colors duration-300 block mb-4" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 400 }}>
            01444 242040
          </a>
          <p className="font-body text-white/55 leading-[1.85]" style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 400 }}>
            Monday to Friday<br />
            8:00 — 16:30 GMT
          </p>
          <p className="font-body text-white/45 mt-6 leading-[1.85]" style={{ fontSize: "12.5px", fontWeight: 400 }}>
            Restaurant and tour hours differ — see{" "}
            <Link href="/directions#hours" className="text-[#C8A96E] hover:underline">opening times</Link>.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><ChannelsSection /></ScrollReset>
        <ScrollReset><AddressSection /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
