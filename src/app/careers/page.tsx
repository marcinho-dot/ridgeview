"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

const CAREERS_EMAIL = "info@ridgeview.co.uk";
const CAREERS_MAILTO =
  `mailto:${CAREERS_EMAIL}` +
  `?subject=${encodeURIComponent("Speculative career enquiry — Ridgeview")}` +
  `&body=${encodeURIComponent(
    "Hello,\n\nI'd like to register interest in joining the Ridgeview team.\n\n" +
      "Area of interest (vineyard / winery / hospitality / sales / marketing / operations / other): \n" +
      "Current role / experience summary: \n" +
      "Preferred working pattern (full time / part time / flexible): \n" +
      "Any other context: \n\n" +
      "Contact:\nName: \nPhone: \n\nThank you.\n",
  )}`;

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
          src={`${basePath}/images/hero-v2.jpg`}
          alt="Ridgeview team in the vines at Ditchling Common"
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
          [ Join the Team · Ditchling Common ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Careers at <span className="text-[#C8A96E]">Ridgeview</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-body text-white/65 max-w-[680px]"
          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.7, textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Pioneers of the English wine industry, with roots as strong as our future is bright.
          We&rsquo;re on a journey of growth — passionate, purpose-driven people from every part
          of the business, shaping the next chapter of award-winning English sparkling wine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
          className="mt-7 md:mt-9"
        >
          <a href="#get-in-touch" className="btn-cta">Get in touch</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Values ────────────────────────────────────────────────────────────────
function ValuesSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-6" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Our Company Values ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.15] mx-auto" style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 400, maxWidth: "820px" }}>
            Passion, purpose and a commitment to <span className="text-[#C8A96E]">excellence</span> — we work as a team, and we never stand still.
          </h2>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Benefits Grid ─────────────────────────────────────────────────────────
const BENEFITS = [
  { title: "Staff Discounts", body: "Generous staff pricing on Ridgeview wine, dining discounts and seasonal offers from partner brands." },
  { title: "Career Growth", body: "Broad training access and collaborative personal development plans, mapped to where you want your career to go." },
  { title: "Health Cash Plan", body: "Employee cashback on everyday healthcare, gym membership discounts and digital wellbeing tools." },
  { title: "Charitable Giving", body: "Volunteering days, local-charity support and a payroll giving scheme for tax-free donations to causes that matter to you." },
  { title: "Staff Celebrations", body: "A full social calendar — team events, seasonal experiences and the steady rhythm of celebrating well." },
  { title: "Employee Rewards", body: "Loyalty bonus scheme, generous holiday allowance and performance-based incentives that reward excellence." },
  { title: "Flexible Working Patterns", body: "From hybrid working to individual patterns, we support team needs where possible. 40% of our team work part time." },
  { title: "Employee Assistance Programme", body: "Confidential support for life&rsquo;s harder moments — counselling, advice and resources, when you need them." },
];

function BenefitsSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}><p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>[ Beyond the Pay Slip ]</p></FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              Benefits That <span className="text-[#C8A96E]">Go Beyond</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="font-body text-white/65 leading-[1.85] mx-auto mt-6" style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300, maxWidth: "560px" }}>
              When you join the team, you unlock staff benefits designed to support professional
              and personal wellbeing, at work and beyond.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {BENEFITS.map((b, i) => (
            <FadeUp key={b.title} delay={0.3 + i * 0.04}>
              <div className="border-t border-[#C8A96E]/25 pt-5">
                <h3 className="font-display italic text-cream leading-[1.15] mb-3" style={{ fontSize: "clamp(18px, 1.55vw, 22px)", fontWeight: 400 }}>
                  {b.title}
                </h3>
                <p className="font-body text-white/55 leading-[1.75]" style={{ fontSize: "clamp(13px, 1.1vw, 14px)", fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: b.body }} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Open positions / pipeline ─────────────────────────────────────────────
// Vacancy status is intentionally non-committal: we don't have a live
// feed against UK's careers page, so claiming "no vacancies" or
// counting roles would be fabricated. Visitors are pointed to UK's
// canonical careers page for current openings, with the speculative
// channel kept open for off-cycle interest.
function OpenPositionsSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}><p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>[ Open Positions ]</p></FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            Roles, briefs &amp; <span className="text-[#C8A96E]">speculative interest</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="font-body text-white/65 leading-[1.85] mx-auto" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300, maxWidth: "580px" }}>
            New roles open across the year as the estate grows — vineyard, winery,
            hospitality, retail, marketing and operations. If you see yourself at Ridgeview,
            send a short note about the area you&rsquo;d like to fit. We keep an active talent
            pool and reach out as roles open.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── CTA — Get in touch ────────────────────────────────────────────────────
function GetInTouchCTA() {
  return (
    <section id="get-in-touch" className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06] scroll-mt-24">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}><p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>[ Get in Touch ]</p></FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            Step into the next <span className="text-[#C8A96E]">chapter</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="font-body text-white/65 leading-[1.85] mx-auto mb-10" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300, maxWidth: "560px" }}>
            A short note about your background and the area you&rsquo;d love to work in goes
            further than a polished CV alone. Tell us where you&rsquo;d fit.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <a href={CAREERS_MAILTO} className="btn-cta">
            Send a speculative application
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

export default function CareersPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><ValuesSection /></ScrollReset>
        <ScrollReset><BenefitsSection /></ScrollReset>
        <ScrollReset><OpenPositionsSection /></ScrollReset>
        <ScrollReset><GetInTouchCTA /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
