"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { basePath } from "@/lib/basePath";

const milestones = [
  { year: "1995", text: "Ridgeview plants first vines beneath the South Downs ridge." },
  { year: "2000", text: "First commercial vintage - English sparkling wine comes of age." },
  { year: "2010", text: "Blanc de Blancs crowned Best Global Sparkling Wine at Decanter." },
  { year: "2012", text: "Official sparkling wine of the Queen's Diamond Jubilee celebrations." },
  { year: "2024", text: "UK Government's most-poured sparkling wine of the year." },
];

export function CellarSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#010101]">

      {/* ── Full-bleed hero image ── */}
      <div className="relative overflow-hidden" style={{ height: "75vh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/cellar-bg.png`}
          alt="Ridgeview wine cellar"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "20% 40%" }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#010101]" />

        {/* Taglines */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-12">
          <motion.p
            className="font-display italic text-[#C8A96E] mb-5 tracking-widest"
            style={{ fontSize: "clamp(12px, 1.2vw, 15px)", textShadow: "0 1px 8px rgba(0,0,0,0.9), 0 0px 24px rgba(0,0,0,0.7)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            [ Our Story ]
          </motion.p>
          {["CELEBRATE LIFE.", "ESTATE CRAFTED.", "SINCE 1995."].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h2
                className="font-display italic text-white text-center leading-tight"
                style={{ fontSize: "clamp(30px, 6vw, 86px)", fontWeight: 400 }}
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>
      </div>

      {/* ── Brand story + timeline ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">

          {/* Left: text + cellar detail image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3
              className="font-display italic text-cream mb-6 leading-[1.1]"
              style={{ fontSize: "clamp(24px, 3vw, 46px)", fontWeight: 400 }}
            >
              From a pioneering vision to the world stage.
            </h3>
            <p className="font-body text-white/60 text-[14px] leading-relaxed mb-5" style={{ fontWeight: 300 }}>
              It began with a belief: that the chalk soils beneath the South Downs - mirroring Champagne&apos;s
              geology - could produce world-class sparkling wine. In 1995, Ridgeview planted its
              first vines at a time when many said it simply couldn&apos;t be done.
            </p>
            <p className="font-body text-white/60 text-[14px] leading-relaxed mb-8" style={{ fontWeight: 300 }}>
              Today, Ridgeview is one of the most decorated English sparkling wine producers in the world. Poured at
              State Banquets, served to heads of state, and awarded at the finest competitions globally.
              The family is still here. The commitment to quality unchanged.
            </p>

            {/* Cellar detail image */}
            <motion.div
              className="relative overflow-hidden rounded-lg"
              style={{ height: "260px" }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/images/cellar-detail.png`}
                alt="Ridgeview cellar - selecting bottles by hand"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 30%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-4 left-5 font-display italic text-white/85 tracking-widest" style={{ fontSize: "13px", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
                Hand-selected. Every vintage.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: milestone timeline */}
          <div>
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="flex gap-6 py-5 border-b border-white/[0.07] last:border-0 group"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="font-display italic text-[#C8A96E] flex-shrink-0 leading-none"
                  style={{ fontSize: "clamp(17px, 1.8vw, 24px)", fontWeight: 400, minWidth: "52px" }}
                >
                  {m.year}
                </span>
                <p className="font-body text-white/50 text-[13px] leading-relaxed group-hover:text-white/70 transition-colors duration-300" style={{ fontWeight: 300 }}>
                  {m.text}
                </p>
              </motion.div>
            ))}

            {/* Lifestyle image below timeline */}
            <motion.div
              className="relative overflow-hidden rounded-lg mt-8"
              style={{ height: "200px" }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/images/lifestyle-bg.png`}
                alt="Ridgeview - enjoyed at sunset"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 60%" }}
              />
              <div className="absolute inset-0 bg-black/25" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
