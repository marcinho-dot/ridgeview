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
    // h-screen (= 100vh) gives the section the FULL viewport height in
    // every context: DevTools mobile simulation, desktop, and real
    // mobile (where the lower edge may sit under the URL bar — that's
    // fine because all our content is top-aligned, the unused bottom
    // of the image is just decorative).
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background image — misty autumn morning at Ridgeview vineyard, Sussex.
          Source is now 2560×1440 (16:9), which matches the aspect of most
          desktop viewports — object-cover lands edge-to-edge with no
          visible crop on landscape screens. On mobile (portrait) the
          cover still crops left/right; the key motif (vineyard path,
          trees, light beam) is centered so the crop is graceful. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/hero-bg.jpg`}
        alt="Misty autumn morning at Ridgeview vineyard, Sussex"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 50%" }}
      />

      {/* Soft dark layer fading down across the top ~55% — gives the
          upper text block (kicker / headline / proof / CTA) a quiet
          backdrop while leaving the lower 45% of the misty image
          completely undimmed. Long, gentle fade (max 70% black at the
          very top → transparent at the midpoint) so the navbar zone
          never feels like a hard band. */}
      <div
        className="absolute left-0 right-0 top-0 bg-gradient-to-b from-black/70 via-black/28 to-transparent pointer-events-none"
        style={{ height: "55%" }}
      />

      {/* Main content — top-left aligned. Sits in the upper third of the
          hero, comfortably clear of the navbar (mobile ~70px, desktop ~95px)
          and inside the soft dark fade. The big undimmed lower half of
          the image then carries the misty-morning atmosphere. */}
      <div className="absolute inset-0 flex flex-col justify-start pt-[14vh] md:pt-[18vh] px-6 md:px-16 max-w-[1400px] mx-auto left-0 right-0">

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
            className="relative font-display italic text-cream leading-[1.12] mb-8"
            style={{
              fontSize: "clamp(38px, 6.5vw, 102px)",
              fontWeight: 400,
              textShadow:
                "0 2px 22px rgba(0,0,0,0.9), 0 1px 6px rgba(0,0,0,0.95)",
            }}
          >
            {[
            <span key="l1">In the chalk hills of Sussex,</span>,
            <span key="l2"><span className="text-[#C8A96E]">something remarkable</span> is made.</span>,
          ].map((line, i) => (
              // Padding + negative margin: the overflow-hidden line-box
              // was clipping the textShadow blur at its hard edges
              // (visible as a sharp "stroke" around the letters). The
              // padding gives the 22px blur room to fade naturally; the
              // matching negative margin keeps the headline visually
              // anchored at its original position.
              <span
                key={i}
                className="block overflow-hidden"
                style={{
                  paddingBlock: "0.35em",
                  paddingInline: "0.5em",
                  marginBlock: "-0.35em",
                  marginInline: "-0.5em",
                }}
              >
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
                className="font-body text-white/55"
                style={{
                  fontSize: "clamp(10px, 1vw, 12px)",
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                  textShadow: "0 1px 8px rgba(0,0,0,0.95)",
                }}
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
            className="btn-atb backdrop-blur-2xl backdrop-saturate-150"
          >
            View all Wines
            <span className="btn-atb-arrow">&rarr;</span>
          </a>
        </motion.div>
      </div>

    </section>
  );
}
