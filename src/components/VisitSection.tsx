"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { basePath } from "@/lib/basePath";

/* ─────────────────────────────────────────────────────────────────────────
   VisitSection - Primary Conversion
   Two equal panels: Vineyard Tour (left) + Restaurant (right)
   Absorbs former DiscoverSection + LifestyleSection content.
───────────────────────────────────────────────────────────────────────── */

export function VisitSection() {
  const refHeader = useRef<HTMLDivElement>(null);
  const refPanels = useRef<HTMLDivElement>(null);
  const headerInView = useInView(refHeader, { once: true, amount: 0.2 });
  const panelsInView = useInView(refPanels, { once: true, amount: 0.1 });

  return (
    <section
      className="bg-[#010101] overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >

      {/* Section header */}
      <div
        ref={refHeader}
        className="text-center px-6 py-16 md:py-20"
      >
        <motion.p
          className="font-display italic text-[#C8A96E] mb-4 tracking-widest"
          style={{ fontSize: "clamp(11px, 1.1vw, 14px)" }}
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          [ The Estate · East Sussex ]
        </motion.p>
        <div className="overflow-hidden">
          <motion.h2
            className="font-display italic text-white leading-[1.05]"
            style={{ fontSize: "clamp(34px, 4.5vw, 68px)", fontWeight: 400 }}
            initial={{ y: "100%", opacity: 0 }}
            animate={headerInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Come and see for yourself.
          </motion.h2>
        </div>
      </div>

      {/* Two panels */}
      <div
        ref={refPanels}
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ minHeight: "85vh" }}
      >

        {/* ── Panel Left: Vineyard Tour ── */}
        <motion.div
          className="group relative overflow-hidden flex flex-col justify-end"
          style={{ minHeight: "70vh" }}
          initial={{ opacity: 0, y: 30 }}
          animate={panelsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/images/vineyard-bg.png`}
            alt="Ridgeview vineyard rows at Ditchling Common"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
            style={{ objectPosition: "center 55%" }}
          />

          {/* Base overlay */}
          <div className="absolute inset-0 bg-black/45 transition-colors duration-700 group-hover:bg-black/58" />
          {/* Bottom gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          {/* Right border - separates panels on desktop */}
          <div className="absolute top-0 right-0 bottom-0 w-px bg-white/[0.08] hidden md:block" />

          {/* Content */}
          <div className="relative z-10 px-8 md:px-10 lg:px-14 pb-12 md:pb-16">
            <p
              className="font-display italic text-[#C8A96E] mb-4 tracking-widest"
              style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
            >
              [ Vineyard Tour ]
            </p>

            <h3
              className="font-display italic text-white leading-[1.05] mb-5"
              style={{ fontSize: "clamp(28px, 3.2vw, 52px)", fontWeight: 400 }}
            >
              Walk the vine rows.
            </h3>

            <p
              className="font-body text-white/65 leading-relaxed mb-5"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)", fontWeight: 400, maxWidth: "380px" }}
            >
              Walk the estate with our team, from vine to cellar. Understand what
              English chalk does to a sparkling wine. Taste directly from the cellar.
            </p>

            <p
              className="font-body text-[#C8A96E] tracking-[0.18em] uppercase mb-8"
              style={{ fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 400 }}
            >
              1.5 hrs · From £20pp · Fri-Sun
            </p>

            <a href={`${basePath}/vineyard-booking`} className="btn-cta">
              Book a Vineyard Tour
            </a>
          </div>
        </motion.div>

        {/* ── Panel Right: Restaurant ── */}
        <motion.div
          className="group relative overflow-hidden flex flex-col justify-end"
          style={{ minHeight: "70vh" }}
          initial={{ opacity: 0, y: 30 }}
          animate={panelsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/images/footer-bg.png`}
            alt="The Rows & Vine restaurant at Ridgeview Estate"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
            style={{ objectPosition: "center 40%" }}
          />

          {/* Base overlay */}
          <div className="absolute inset-0 bg-black/45 transition-colors duration-700 group-hover:bg-black/58" />
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Content */}
          <div className="relative z-10 px-8 md:px-10 lg:px-14 pb-12 md:pb-16">
            <p
              className="font-display italic text-[#C8A96E] mb-4 tracking-widest"
              style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
            >
              [ The Rows &amp; Vine ]
            </p>

            <h3
              className="font-display italic text-white leading-[1.05] mb-3"
              style={{ fontSize: "clamp(28px, 3.2vw, 52px)", fontWeight: 400 }}
            >
              Dine among the vines.
            </h3>

            {/* Quote absorbed from LifestyleSection */}
            <p
              className="font-display italic text-white/45 mb-5"
              style={{ fontSize: "clamp(14px, 1.5vw, 18px)", fontWeight: 400 }}
            >
              Every occasion deserves something extraordinary.
            </p>

            <p
              className="font-body text-white/65 leading-relaxed mb-5"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)", fontWeight: 400, maxWidth: "380px" }}
            >
              A seasonal menu designed around the wines of the estate. Reserve a
              table with views across the Sussex vineyard.
            </p>

            <p
              className="font-body text-[#C8A96E] tracking-[0.18em] uppercase mb-8"
              style={{ fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 400 }}
            >
              Spring &amp; Summer · Open Daily
            </p>

            <a href={`${basePath}/vineyard-booking`} className="btn-cta">
              Reserve a Table
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
