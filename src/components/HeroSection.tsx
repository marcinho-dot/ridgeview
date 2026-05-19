"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { basePath } from "@/lib/basePath";

const proofPoints = [
  "Official sparkling wine · Queen's Diamond Jubilee",
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
    // mobile (where the lower edge may sit under the URL bar - that's
    // fine because all our content is top-aligned, the unused bottom
    // of the image is just decorative).
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background image - vineyard hero at Ridgeview, Sussex.
          Source is 2560×1440 (16:9). object-cover lands edge-to-edge with
          no crop on 16:9 desktop viewports; on shorter / portrait viewports
          (16:10 macs, mobile) it crops the BOTTOM only - objectPosition
          "center top" anchors the upper half of the image so sky, horizon
          and the headline-overlay zone are always preserved. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/vineyardhero.jpg`}
        alt="Sunlight breaking through mist over the Ridgeview vineyard, Sussex"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center top" }}
      />

      {/* Three-layer overlay stack (mobile + desktop):
          1) Full-frame vertical gradient - TOP boosted to compensate
             for the brighter sky in the new 16:9 image, so the upper
             zone reads as dark as on the old crop.
          2) Left-side fade - original strength.
          3) Bottom dark band on lower 55% - reduced to 25% of
             original (95/70 → 24/18) so the lower image breathes. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/15 to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/24 via-black/[0.18] to-transparent pointer-events-none"
        style={{ height: "55%" }}
      />

      {/* Mobile: text anchored to bottom (justify-end + pb-[14vh]) -
          the undimmed upper half of the misty-morning image carries
          the atmospheric weight that sits above the text.
          Desktop (2026-05-18 revert): text vertically centered in the
          hero (justify-center), with the same max-w-[1600px] +
          md:px-16 inset as the section below (CategoryCardRow). The
          kicker therefore aligns visually with the CategoryCardRow's
          kicker — one consistent left rail down the page. */}
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center pb-[14vh] md:pb-0 px-6 md:px-16 max-w-[1600px] mx-auto left-0 right-0">

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

        {/* Headline - staggered line reveal */}
        <div className="relative">
          <h1
            className="relative font-display italic text-cream leading-[1.05] mb-5"
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
              // Animation: fade + small upward translate, no overflow-hidden
              // wrapper. The original slide-up-from-below clipped the
              // textShadow blur and forced loose leading; this approach
              // keeps the editorial tight line-spacing and lets the
              // shadow render freely.
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.18, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Proof point ticker - sits in a stack with the same baseline
            spacing rhythm as the kicker/headline (mb-5). Text bumped to
            white/80 + larger font size so it stays legible against the
            misty background; icon enlarged so it reads as a proper bullet. */}
        {/* `items-start` so the diamond glyph anchors to the FIRST line
            of the proof-point text, not the vertical centre of the
            (potentially wrapping) content. Container height accommodates
            two lines on mobile (where the longest proof points wrap)
            and one line on desktop (plenty of horizontal room). */}
        <motion.div
          className="flex items-start gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          {/* Inline SVG diamond - perfect geometric control over size +
              alignment. mt offsets shift the glyph's geometric centre
              down to sit on the text's x-height middle for the first
              line (mobile 12px font / desktop 14px font). */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            aria-hidden
            className="flex-shrink-0 mt-[3px] md:mt-[5px]"
            style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.8))" }}
          >
            <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="#C8A96E" />
          </svg>
          {/* md:mt-px shifts the text 1px DOWN on desktop so the
              diamond icon's geometric centre lands on the cap-height
              middle of the first text line (with Raleway 14px Light,
              cap middle sits ~1px below the bare top of the line-box).
              Tuned 2026-05-18. */}
          <div className="overflow-hidden h-[36px] md:h-[20px] md:mt-px">
            <AnimatePresence mode="wait">
              <motion.p
                key={proofIndex}
                className="font-body text-white/80"
                style={{
                  fontSize: "clamp(12px, 1.15vw, 14px)",
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                  lineHeight: 1.4,
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

        {/* Primary CTAs - two equal-weight buttons sharing the
            etched-crystal .btn-cta style. The labels map 1:1 onto the
            new four-item header menu (Shop · Vineyard) so the hero
            entry-points and the navbar tell the same story. On
            narrow screens they wrap to a stack via flex-wrap so the
            second button never overflows. */}
        {/* Hero CTAs - plain `.btn-cta` (etched-crystal frosted-glass +
            gold border + cream text), matching every other CTA on the
            site (Reserve a Table, Book a Vineyard Tour, Shop Bottle,
            etc.). The previous Canvas 2D gold-metaball "jelly" effect
            (JellyButtonCanvas) was rolled back 2026-05-16 per user
            direction - it visually competed with the rest of the
            site's editorial chrome. The component still lives at
            src/components/JellyButtonCanvas.tsx if we ever want to
            bring it back, and the kickflip variant is in
            src/components/_archive/jelly-3d-tilt/. */}
        <motion.div
          className="mt-5 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href={`${basePath}/#wine-collection`} className="btn-cta">
            Shop
          </a>
          <a
            href={`${basePath}/vineyard-booking#visit`}
            className="btn-cta"
            onClick={() => {
              // Mark this navigation as coming from the homepage Hero
              // so the booking page's floating Back-to-Top button knows
              // to enable itself. Timestamped + one-time-use; the booking
              // page consumes & deletes this on mount. Stale flag (>10s)
              // is ignored, so click-but-don't-navigate edge cases don't
              // accidentally activate the button later.
              try {
                sessionStorage.setItem(
                  "rv-back-to-top-from-hero",
                  String(Date.now()),
                );
              } catch {
                /* sessionStorage unavailable (private mode etc.) - fine */
              }
            }}
          >
            Vineyard Booking
          </a>
        </motion.div>
      </div>

    </section>
  );
}
