"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

const CORPORATE_EMAIL = "info@ridgeview.co.uk";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
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
          src={`${basePath}/images/corporate-services/wine-gifts/hero.webp`}
          alt="Corporate wine services at Ridgeview — gifts and hospitality for business"
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-9">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
        >
          [ For Business · For Procurement · For Hospitality ]
        </motion.p>
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Corporate <span className="text-[#C8A96E]">Wine Services</span>
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Two routes for business: branded wine gifts that arrive ready to send, or corporate
          hospitality at the estate in Sussex. Both run by the same Corporate Services team.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
          className="mt-7 md:mt-9"
        >
          <a href="#routes" className="btn-cta">Explore the two routes</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Two routes panels ────────────────────────────────────────────────────
const ROUTES = [
  {
    kicker: "[ Route 1 · Wine & Gifts ]",
    title: "Corporate Wine Gifts",
    body: "Branded engraving, bulk orders, single bottles and curated sets for clients, partners and employees. Industry-tailored solutions across luxury, property, automotive and professional services.",
    href: "/corporate-services/corporate-wine-gifts",
    image: "/images/corporate-services/wine-gifts/branded-gifts.webp",
    cta: "Wine & Gifts",
  },
  {
    kicker: "[ Route 2 · Hospitality at the Estate ]",
    title: "Corporate Hospitality & Events",
    body: "Tastings, vineyard tours, dining at The Rows & Vine, board meetings with vineyard views, brand activations and team-building days. Half-day to full-day formats across the estate.",
    href: "/corporate-services/corporate-hospitality-events",
    image: "/images/corporate-services/hospitality-events/client-entertainment.webp",
    cta: "Hospitality & Events",
  },
];

function RoutesGrid() {
  return (
    <section id="routes" className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06] scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Two Routes ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              Explore our Corporate <span className="text-[#C8A96E]">Wine Solutions</span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {ROUTES.map((r, i) => (
            <FadeUp key={r.title} delay={0.3 + i * 0.08}>
              <Link href={r.href} className="group block h-full bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md overflow-hidden transition-all duration-400">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${r.image}`}
                    alt={r.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                </div>
                <div className="p-8 md:p-10">
                  <p className="font-display italic text-[#C8A96E] tracking-widest mb-3" style={{ fontSize: "clamp(11px, 1.05vw, 13px)" }}>
                    {r.kicker}
                  </p>
                  <h3 className="font-display italic text-cream group-hover:text-white leading-[1.15] mb-4 transition-colors duration-400" style={{ fontSize: "clamp(24px, 2.2vw, 32px)", fontWeight: 400 }}>
                    {r.title}
                  </h3>
                  <p className="font-body text-white/55 leading-[1.75] mb-6" style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 300 }}>
                    {r.body}
                  </p>
                  <span className="font-body text-[#C8A96E]/80 group-hover:text-[#C8A96E] uppercase tracking-[0.22em] transition-colors" style={{ fontSize: "11px", fontWeight: 400 }}>
                    Explore {r.cta} →
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Brief the Team ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            Not sure which route <span className="text-[#C8A96E]">fits</span>?
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="font-body text-white/65 leading-[1.85] mx-auto mb-10" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300, maxWidth: "560px" }}>
            Tell us what you have in mind — a brand activation, a team day, a year of client
            gifts, or all three. The Corporate Services team will route the right resources.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <a href={`mailto:${CORPORATE_EMAIL}?subject=Corporate%20enquiry%20%E2%80%94%20Ridgeview`} className="btn-cta">
            Email {CORPORATE_EMAIL}
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

export default function CorporateServicesHubPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><RoutesGrid /></ScrollReset>
        <ScrollReset><ContactCTA /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
