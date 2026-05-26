"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   RecognitionSection
   Social proof - typography-only, milestone timeline with luxury design.
───────────────────────────────────────────────────────────────────────── */

// Milestone copy. `text` is ReactNode so individual entries can embed
// links (e.g. the 1995 entry linking to founder Mike Roberts's page).
const milestones: { year: string; text: ReactNode }[] = [
  {
    year: "1995",
    text: (
      <>
        Founder{" "}
        <Link
          href="/mike-roberts"
          className="text-[#C8A96E] hover:text-[#C8A96E]/75 underline decoration-[#C8A96E]/40 hover:decoration-[#C8A96E]/70 underline-offset-2 transition-colors duration-300"
        >
          Mike Roberts
        </Link>{" "}
        plants Ridgeview&rsquo;s first vines beneath the South Downs ridge.
      </>
    ),
  },
  { year: "2000", text: "First vintage released - English Wine of the Year." },
  { year: "2010", text: "Blanc de Blancs crowned Best Global Sparkling Wine at Decanter." },
  { year: "2012", text: "Official wine of the Queen's Diamond Jubilee celebrations." },
  { year: "2024", text: "UK Government's most-poured sparkling wine of the year." },
];

export function RecognitionSection() {
  const ref = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.3 });
  const [activeYear, setActiveYear] = useState<string | null>("2010");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-[#010101] overflow-hidden px-6 md:px-16 lg:px-24 py-20 md:py-24"

    >
      <div className="max-w-[960px] mx-auto relative z-10">

        {/* Kicker */}
        <motion.p
          className="font-display italic text-[#C8A96E] tracking-widest text-center mb-6"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          [ Recognition · Heritage ]
        </motion.p>

        {/* Headline */}
        <div className="text-center mb-8 md:mb-10">
          {[
            <span key="r1">Served at <span className="text-[#C8A96E]">State Banquets.</span></span>,
            <span key="r2">Chosen by <span className="text-[#C8A96E]">10 Downing Street.</span></span>,
          ].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                className="font-display italic text-white leading-[1.08] block"
                style={{ fontSize: "clamp(36px, 5.5vw, 86px)", fontWeight: 400 }}
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 1.0, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Body copy */}
        <motion.p
          className="font-body text-white/60 leading-relaxed text-center mb-10 md:mb-12 mx-auto"
          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 400, maxWidth: "720px" }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
        >
          Ridgeview sparkling wines have been served at State Banquets at Buckingham Palace and as
          the official sparkling wine of 10 Downing Street. In over two decades of
          production, the estate has become one of the most consistently decorated
          producers of English sparkling wine - poured in the finest restaurants across
          the United Kingdom, the United States, Scandinavia, and Japan.
        </motion.p>

        {/* ── Milestone timeline - own viewport trigger ── */}
        <div ref={timelineRef}>

          {/* Thin gold divider */}
          <motion.div
            className="mx-auto mb-10 md:mb-12"
            style={{
              height: "1px",
              background: "rgba(200,169,110,0.2)",
              maxWidth: "480px",
              transformOrigin: "center",
            }}
            initial={{ scaleX: 0 }}
            animate={timelineInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Desktop: horizontal row */}
          <div className="hidden md:grid grid-cols-5 gap-0">
            {milestones.map((m, i) => {
              const isActive = activeYear === m.year;
              return (
                <motion.div
                  key={m.year}
                  className="group relative flex flex-col items-center text-center px-3 py-6 cursor-default border-r border-white/[0.07] last:border-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setActiveYear(m.year)}
                  onMouseLeave={() => setActiveYear("2010")}
                >
                  <span
                    className="font-display italic transition-colors duration-300"
                    style={{
                      fontSize: "clamp(20px, 2.2vw, 32px)",
                      fontWeight: 400,
                      color: isActive ? "#C8A96E" : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {m.year}
                  </span>
                  <motion.p
                    className="font-body text-white/45 text-[12px] leading-relaxed mt-3"
                    style={{ fontWeight: 400, maxWidth: "130px" }}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {m.text}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: vertical timeline with luxury design */}
          <div className="md:hidden relative">
            {/* Vertical timeline line */}
            <motion.div
              className="absolute left-4 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.15) 10%, rgba(200,169,110,0.15) 90%, transparent)" }}
              initial={{ scaleY: 0, transformOrigin: "top" }}
              animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="relative flex items-start gap-5 pl-10 py-5"
                initial={{ opacity: 0, x: -16 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[11px] top-[26px] w-[7px] h-[7px] rounded-full border border-[#C8A96E]/40"
                  style={{ background: "rgba(200,169,110,0.2)" }}
                />

                {/* Content */}
                <div>
                  <span
                    className="font-display italic text-[#C8A96E] block mb-1"
                    style={{ fontSize: "22px", fontWeight: 400 }}
                  >
                    {m.year}
                  </span>
                  <p
                    className="font-body text-white/50 text-[13px] leading-relaxed"
                    style={{ fontWeight: 400 }}
                  >
                    {m.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ridgeview closing line */}
          <motion.p
            className="font-body text-white/30 text-center mt-10 tracking-[0.2em] uppercase"
            style={{ fontSize: "clamp(10px, 1vw, 12px)", fontWeight: 400 }}
            initial={{ opacity: 0 }}
            animate={timelineInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Ridgeview Wine Estate · Est. 1995 · Ditchling Common, East Sussex
          </motion.p>

        </div>
      </div>
    </section>
  );
}
