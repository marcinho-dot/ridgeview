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
    // Height is set with 100lvh (largest-viewport-height), NOT 100vh/100dvh.
    // lvh = the height WITH the mobile URL bar hidden, and it stays CONSTANT
    // as the bar shows/hides. That avoids the notorious mobile "zoom jump"
    // where a vh/dvh-sized full-bleed video resizes (and visibly re-scales)
    // the instant the address bar collapses on first scroll. The h-screen
    // Tailwind class (= 100vh) stays as a fallback floor for the handful of
    // ancient browsers without lvh support: the inline 100lvh wins where
    // supported, and is dropped (falling back to the class) where it isn't.
    // bg-[#010101] is fallback stage 1 — the brand-dark fill painted
    // instantly, before the poster (stage 2) or the video (stage 3) arrive.
    <section
      className="relative h-screen w-full overflow-hidden bg-[#010101]"
      style={{ height: "100lvh" }}
    >
      {/* Stage-2 fallback hint: tell the browser to fetch the poster at high
          priority the moment the HTML lands, so the first paint after the
          black fill is the real opening frame — not a blank hero. React 19
          hoists this <link> into <head> and dedupes it. */}
      <link
        rel="preload"
        as="image"
        href={`${basePath}/videos/hero-poster.jpg`}
        fetchPriority="high"
      />

      {/* Hero video — 3-scene estate montage (Rows & Vine terrace → aerial
          vineyard → the estate at golden hour). 21:9 ultrawide (2520×1080)
          with all subjects centred, so object-cover + object-center fills
          the viewport edge-to-edge with no letterbox and crops symmetrically
          on narrower / portrait viewports.
            • poster  → stage-2 fallback (154 KB first frame) shown until the
                        video has decoded enough to play.
            • mobile  → a 1280-wide / 5 MB cut served under 768px so phones
                        don't pull the 20 MB desktop master.
            • desktop → the full 2520×1080 master (faststart, audio stripped).
          Muted + playsInline + autoplay is what unlocks inline autoplay on
          iOS; loop keeps the montage running. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={`${basePath}/videos/hero-poster.jpg`}
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source
          src={`${basePath}/videos/hero-mobile.mp4`}
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source src={`${basePath}/videos/hero-desktop.mp4`} type="video/mp4" />
      </video>

      {/* Single bottom-anchored legibility gradient — NO full-frame overlay,
          so the video stays clean and bright across its top ~70%. Dark at
          the very bottom (where the mobile text sits, justify-end) and faded
          out by ~72% up. The mid stop also lends the vertically-centred
          desktop text some backing in the lower-middle band; the heavy
          per-element text-shadows below carry the rest. */}
      <div
        className="absolute inset-x-0 bottom-0 top-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0) 72%)",
        }}
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
          {/* Diamond icon STAYS STATIC across proof-point rotations
              (lives OUTSIDE the AnimatePresence). The mt offsets put
              the icon's geometric centre on the cap-height middle of
              the first text line — recalibrated 2026-05-18 for the
              new font size (clamp(13px, 1.3vw, 16px)):
                - Mobile: 13px font, line-height 18.2px, cap-middle
                  at ~10px from line top → icon top at ~4px (mt-[4px])
                - Desktop: 16px font, line-height 22.4px, cap-middle
                  at ~12.3px from line top → icon top at ~6.3px
                  (md:mt-[6px], rounded down for crispness). */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            aria-hidden
            className="flex-shrink-0"
            style={{
              filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.8))",
              // Icon centre on the cap-middle of the text (the
              // conventional alignment for body-text icons). Formula:
              // mt = 0.69em − 6px, where 0.69 is the Raleway 300
              // cap-center position relative to its line-top and 6px
              // is half the icon height.
              // Live values (empirically verified via Canvas
              // TextMetrics):
              //   - 13px font: mt ≈ 2.97px, cap-center at 8.99px
              //     from line-top, icon centre at 8.97px (Δ 0.02px).
              //   - 16px font: mt ≈ 5.04px, cap-center at 11.02px,
              //     icon centre at 11.04px (Δ 0.02px).
              marginTop:
                "calc(0.69 * clamp(13px, 1.3vw, 16px) - 6px)",
            }}
          >
            <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="#C8A96E" />
          </svg>
          {/* Rotating text container - the AnimatePresence + slide
              animation only affects the text now, never the diamond. */}
          <div className="overflow-hidden h-[40px] md:h-[24px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={proofIndex}
                className="font-body text-white/80"
                style={{
                  fontSize: "clamp(13px, 1.3vw, 16px)",
                  fontWeight: 400,
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
