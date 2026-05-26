"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

const SUSTAINABILITY_EMAIL = "info@ridgeview.co.uk";

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
          src={`${basePath}/images/sustainability/hero-chardonnay-vineyard.webp`}
          alt="Ridgeview Chardonnay vineyard — rooted in the Sussex land"
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
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
          [ SWGB Founder Member · Sussex ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Sustainable &amp; <span className="text-[#C8A96E]">Ethical</span> Practices
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          From vine to glass, from soil to staff. As founder members of Sustainable Wines of
          Great Britain, we work to set new standards for sustainable English winemaking — and
          prove that a force for good and a great glass aren&rsquo;t separate goals.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── 6 Practice tiles — the production-side story ─────────────────────────
const PRACTICES = [
  {
    title: "Sustainable Vineyard Management",
    body: "Cover crop bio-diversity, improving soil structure, and encouraging natural predators of grape pests — practices that reduce reliance on synthetic chemicals and herbicides. Every choice in the rows builds long-term vine health.",
  },
  {
    title: "Waste Reduction and Recycling",
    body: "Our Bio-Bubble system naturally treats all waste water across the estate. As of 2023, that&rsquo;s 22 million litres cleaned — the equivalent of nine Olympic swimming pools.",
  },
  {
    title: "Efficient and Renewable Energy",
    body: "Solar generation, sensor-activated lighting, and underground cellars that need no energy for temperature control. The cellar&rsquo;s ambient cool does what refrigeration does elsewhere.",
  },
  {
    title: "Water Conservation",
    body: "Making great strides in rainwater harvesting for grey water — for onsite bathrooms, vineyard spraying, machinery washing and the diverse plant-life across the estate. A simple but fundamental change in how the estate manages its water.",
  },
  {
    title: "Sustainable Supply Chain",
    body: "Working with growers and suppliers who share our standards — every input reviewed against its environmental footprint, from raw materials through to the journey to your door.",
  },
  {
    title: "Sustainable Packaging",
    body: "Sustainable, recyclable secondary packaging across the range and a continuous review of what we ship — because the bottle in your hand is only one part of the impact.",
  },
];

function PracticesSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}><p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>[ From Vine to Glass ]</p></FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}>
              Sustainable Wine Production <span className="text-[#C8A96E]">Practices</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="subline-section mx-auto">
              Six pillars guide everything from how the vines are tended to how the bottles ship.
              Both our vineyard and winery are SWGB-accredited — our vineyard achieved Gold in
              its recertification.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 md:gap-y-14">
          {PRACTICES.map((p, i) => (
            <FadeUp key={p.title} delay={0.35 + i * 0.05}>
              <div className="border-t border-[#C8A96E]/25 pt-6">
                <h3 className="font-display italic text-cream leading-[1.15] mb-3" style={{ fontSize: "clamp(20px, 1.85vw, 26px)", fontWeight: 400 }}>
                  {p.title}
                </h3>
                <p className="font-body text-white/55 leading-[1.75]" style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: p.body }} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Community / Social Responsibility ─────────────────────────────────────
function CommunitySection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[45fr_55fr] gap-10 md:gap-16 items-center">
          {/* Volunteer image — Chessnut Tree community day */}
          <FadeUp delay={0.15}>
            <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-white/[0.06]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/images/sustainability/community-volunteer-day.webp`}
                alt="Ridgeview team volunteering at Chessnut Tree — community day"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </FadeUp>

          <div>
            <FadeUp delay={0.05}>
              <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
                [ Community & Place ]
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
                Committed to our community and <span className="text-[#C8A96E]">social responsibility</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.25}>
              <p className="font-body text-white/65 leading-[1.85] mb-5" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 400 }}>
                Sussex is home — not just a postcode on the address. Thriving isn&rsquo;t about
                market success alone; it comes from genuinely supporting and uplifting the people
                and place around the estate. Our team embraces a culture where small contributions
                compound — volunteer days, environmental initiatives, and steady commitments to
                the local community add up to the kind of impact we&rsquo;re proud of.
              </p>
            </FadeUp>
            <FadeUp delay={0.35}>
              <p className="font-body text-white/65 leading-[1.85]" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 400 }}>
                Conscious energy and waste practices run across every operation. Solar generation,
                sensor-activated lighting, the Bio-Bubble water treatment system, sustainable
                packaging — every operational decision is weighed against its footprint, and we
                keep pushing for lower.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Progressive Employers — staff practices ──────────────────────────────
const STAFF_PRACTICES = [
  {
    title: "Real Living Wage",
    body: "Proud supporters of the Real Living Wage campaign. Our pay structure recognises ability, experience and commitment — fair, respectful, equal treatment across the team.",
  },
  {
    title: "Diversity & Equality",
    body: "Active gender pay analysis, inclusive employment practices and Disability Confident membership — supporting workplace equality across the team.",
  },
  {
    title: "Health & Wellbeing",
    body: "Annual health and wellbeing check-ups under MSDC guidelines, plus a positive mental health programme.",
  },
  {
    title: "Aligned With the Land",
    body: "Sustainable employment practices that align with our social and environmental goals — reflecting our commitment to the wellbeing of the team.",
  },
];

function ProgressiveEmployersSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}><p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>[ Progressive Employers ]</p></FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              Sustainable <span className="text-[#C8A96E]">Employment</span> Practices
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="subline-section mx-auto">
              Our social responsibility aligns with our environmental goals. The way we hire,
              pay, support and develop our team is part of the same standard we apply to the vines.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {STAFF_PRACTICES.map((p, i) => (
            <FadeUp key={p.title} delay={0.35 + i * 0.06}>
              <div className="bg-[#0d0d0d] border border-white/[0.08] rounded-md p-7 md:p-8 h-full">
                <h3 className="font-display italic text-cream leading-[1.15] mb-3" style={{ fontSize: "clamp(20px, 1.85vw, 26px)", fontWeight: 400 }}>
                  {p.title}
                </h3>
                <p className="font-body text-white/55 leading-[1.75]" style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: p.body }} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stat banner — Bio-Bubble headline number ──────────────────────────────
function StatBanner() {
  return (
    <section className="relative bg-[#010101] py-16 md:py-20 border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,169,110,0.06) 0%, transparent 70%)" }} />
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}><p className="font-display italic text-[#C8A96E] tracking-widest mb-6" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>[ By the Numbers ]</p></FadeUp>
        <FadeUp delay={0.15}>
          <p className="font-display italic text-cream leading-[1.05]" style={{ fontSize: "clamp(48px, 8vw, 120px)", fontWeight: 400 }}>
            22<span className="text-[#C8A96E]">M</span> litres
          </p>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="font-body text-white/65 leading-[1.75] mx-auto mt-6" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 400, maxWidth: "580px" }}>
            of waste water cleaned by our Bio-Bubble system across the estate (as of 2023) —
            roughly the equivalent of nine Olympic swimming pools.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────
function ContactCTA() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}><p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>[ ESG · Reporting · Partnerships ]</p></FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            Talk to us about our <span className="text-[#C8A96E]">sustainability</span> journey
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="subline-section mx-auto mb-10">
            For ESG-aligned procurement, sustainability reporting, or partnerships built around
            shared values — get in touch.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <a href={`mailto:${SUSTAINABILITY_EMAIL}?subject=${encodeURIComponent("Sustainability enquiry — Ridgeview")}`} className="btn-cta">
            Email {SUSTAINABILITY_EMAIL}
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

export default function SustainabilityPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><PracticesSection /></ScrollReset>
        <StatBanner />
        <ScrollReset><CommunitySection /></ScrollReset>
        <ScrollReset><ProgressiveEmployersSection /></ScrollReset>
        <ScrollReset><ContactCTA /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
