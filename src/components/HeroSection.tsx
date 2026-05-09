"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { basePath } from "@/lib/basePath";

const proofPoints = [
  "Official wine · Queen's Diamond Jubilee",
  "Served at King Charles' first State Banquet",
  "Poured for Barack Obama · Buckingham Palace",
  "UK Government's most-poured sparkling wine 2024",
  "Decanter Best Global Sparkling Wine · 2010",
];

export function HeroSection() {
  const [proofIndex, setProofIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProofIndex((i) => (i + 1) % proofPoints.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    // h-[100svh] uses "small viewport height" so the hero sizes correctly on
    // mobile browsers — h-screen / 100vh would overshoot the visible area
    // when the iOS / Android URL bar is showing.
    <section className="relative h-[100svh] w-full overflow-hidden">

      {/* Background image — Seven Sisters chalk cliffs + vineyard + Ridgeview bottle */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/hero-bg.jpg`}
        alt="Ridgeview vineyard with Seven Sisters chalk cliffs, Sussex"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 60%" }}
      />

      {/* Layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />
      {/* Extra dark layer on bottom third for text readability */}
      <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" style={{ height: "55%" }} />

      {/* Main content — bottom-left aligned (svh-based padding so the headline
          stays in view on mobile when the browser chrome is showing) */}
      <div className="absolute inset-0 flex flex-col justify-end pb-[18svh] md:pb-[11svh] px-6 md:px-16 max-w-[1400px] mx-auto left-0 right-0">

        {/* Kicker */}
        <motion.p
          className="font-display italic text-[#C8A96E] mb-4"
          style={{ fontSize: "clamp(14px, 1.5vw, 18px)", letterSpacing: "0.18em", textShadow: "0 1px 10px rgba(0,0,0,1), 0 0px 30px rgba(0,0,0,0.9)" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          [ Est. 1995 · Ditchling Common, Sussex ]
        </motion.p>

        {/* Headline — staggered line reveal */}
        <div className="relative">
          <h1
            className="relative font-display italic text-cream leading-[1.02] mb-8"
            style={{ fontSize: "clamp(38px, 6.5vw, 102px)", fontWeight: 400 }}
          >
            {[
            <span key="l1">In the chalk hills of Sussex,</span>,
            <span key="l2"><span className="text-[#C8A96E]">something remarkable</span> is made.</span>,
          ].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "102%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.65 + i * 0.18, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Proof point ticker */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.05, duration: 1 }}
        >
          <span className="text-[#C8A96E] flex-shrink-0 text-[8px]">◆</span>
          <div className="overflow-hidden" style={{ height: "1.5em" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={proofIndex}
                className="font-body text-white/45"
                style={{ fontSize: "clamp(10px, 1vw, 12px)", fontWeight: 300, letterSpacing: "0.1em" }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-110%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {proofPoints[proofIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Primary CTA — same gold-tinted high-contrast style as the SKU
            "Add to basket" button for visual consistency across the site. */}
        <motion.div
          className="mt-6 md:mt-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={`${basePath}/#wine-collection`}
            className="group inline-flex items-center font-body text-white text-[10px] md:text-[11px] uppercase tracking-[0.22em] border border-[#C8A96E]/55 hover:border-[#C8A96E] bg-[#C8A96E]/15 hover:bg-[#C8A96E]/25 active:scale-[0.97] px-7 py-4 rounded-sm transition-all duration-300 backdrop-blur-sm"
          >
            View all Wines
            <span className="inline-block ml-2 transition-transform duration-400 ease-out group-hover:translate-x-1">&rarr;</span>
          </a>
        </motion.div>
      </div>

    </section>
  );
}
