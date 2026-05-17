"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { RecognitionSection } from "@/components/RecognitionSection";
import { EstatePeopleSection } from "@/components/EstatePeopleSection";
import { ScrollReset } from "@/components/ScrollReset";
import { BehindTheBottleSection } from "@/components/sku/BehindTheBottleSection";
import { NearbyAccommodationSection } from "@/components/NearbyAccommodationSection";
import { basePath } from "@/lib/basePath";

// ── Animation Helpers ────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: {
  children: ReactNode; delay?: number; duration?: number; className?: string;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: {
  children: ReactNode; delay?: number; duration?: number; className?: string;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// ── Section: Page Header ────────────────────────────────────────────────────

function PageHeader() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    // `id="top"` lets in-page CTAs (e.g. the Back-to-Top button inside
    // VisitPanels) anchor reliably to the hero on this page.
    <section id="top" ref={ref} className="relative h-svh md:h-screen w-full overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {/* Hero image - uses <picture> with media sources so the browser
            fetches EXACTLY ONE asset based on viewport width, instead of
            the old setup where both <img>s loaded and only one rendered
            (the other was display:hidden, but already downloaded - a 11.5MB
            penalty on Mobile that was the #1 cause of /vineyard-booking/
            jank on Huawei P30 Lite-class devices).
              Mobile  ≤ 640px → terroir-hero-1080.jpg  (265 KB)
              Tablet  ≤ 1280  → terroir-hero.jpg       (908 KB)
              Desktop > 1280  → booking-hero-aerial.jpg (2.24 MB, was 11.56MB)
            fetchpriority="high" because the hero is above-the-fold. */}
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet={`${basePath}/images/terroir-hero-1080.jpg`}
          />
          <source
            media="(max-width: 1280px)"
            srcSet={`${basePath}/images/terroir-hero.jpg`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/images/booking-hero-aerial.jpg`}
            alt="Aerial view of Ridgeview Wine Estate - vineyard rows and cellar buildings"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 50%" }}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[#010101]/30 via-transparent to-[#010101]/60" />
        {/* Stronger dark fade across the lower 30% so the kicker /
            headline / body copy stay legible against the bright
            background image. Enabled on ALL viewports 2026-05-17 —
            mobile previously relied on the portrait crop for contrast
            but the user reported the text was still hard to read on
            phones. */}
        <div
          className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-[#010101]/97 via-[#010101]/65 to-transparent"
          style={{ height: "30%" }}
        />
        {/* Extra diagonal darkening anchored to the bottom-left corner
            where the text block sits. Strong at the bottom-left, fading
            diagonally toward the top-right so the upper-right portion
            of the image breathes. Also enabled on mobile (was
            desktop-only) for the same readability reason. */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-[#010101]/90 via-[#010101]/22 to-transparent"
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-9"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1), 0 0px 30px rgba(0,0,0,0.9)" }}
        >
          [ Ditchling Common · East Sussex ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Vine. Chalk. Table.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-body text-white/60 max-w-[640px]"
          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.7, textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Visit the estate that established English sparkling in the méthode traditionnelle. Planted 1995. An hour from London, twenty minutes from Brighton.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ── Section: Heritage Reveal Stack ──────────────────────────────────────────
// Apple "Powerful connections"-style LAYERED REVEAL (cf.
// apple.com/mac-studio). The chalk vineyard image acts as a FIXED
// background frame; the Terroir text overlay sits ON TOP of it and
// scrolls upward NATURALLY (no transform animation, just normal-flow
// scroll). As Terroir rises off the viewport top, the pinned chalk
// image is revealed beneath it like a curtain being drawn upward.
//
// Layout (single 300vh container):
//   ┌─ section ref={ref} h-[300vh] bg-#010101 ──────────────────┐
//   │   z-0  CHALK IMAGE  (sticky top-0 h-screen, pinned)       │
//   │        - motion.img with scale + translateY animations    │
//   │        - readability gradients top + bottom               │
//   │        - on-image kicker + grape names (fade in AFTER     │
//   │          Terroir clears)                                  │
//   │                                                            │
//   │   z-10 TERROIR TEXT (-mt-[100vh] min-h-screen, solid bg)  │
//   │        - overlaps chalk's sticky pin via -mt              │
//   │        - normal-flow scroll, no transform                 │
//   │        - covers chalk initially, reveals it as it scrolls │
//   │          off the top of the viewport                      │
//   └────────────────────────────────────────────────────────────┘
//
// Scroll choreography (useScroll offset "start end"→"end start",
// 400vh total range across the section's life):
//   progress 0.00 - section just enters viewport from below
//   progress 0.25 - sticky engages (section_top reaches viewport top);
//                   Terroir covers the full viewport
//   progress 0.50 - Terroir fully scrolled off the top;
//                   chalk image fully revealed at viewport [0, 100vh]
//   progress 0.75 - sticky range ends; chalk starts to release upward
//   progress 1.00 - chalk fully off the top of the viewport

function HeritageRevealStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // CHALK IMAGE motion - restored 2026-05-17 to the user-confirmed
  // "Beste Version bis lang" state from commit 1d79237. Both
  // transforms span the FULL visibility window [0, 1]:
  //   scale 1.55 → 1.28   (continuous zoom-out / camera pull-back)
  //   y     0vh  → -13vh  (gentle upward pan / camera tilt down)
  //
  // The CSS scale > 1 makes the image larger than the 100vh frame;
  // the sticky parent's overflow-hidden clips the excess; the
  // translateY moves the image upward within that overflow envelope.
  // Scale ends at 1.28 (not 1.0) so 28vh of overflow always remains,
  // leaving safe headroom for the 13vh upward pan with no bg leak.
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.55, 1.28]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0vh", "-13vh"]);

  // BOTTOM block (kicker + grape names + Champagne caption) - the
  // kicker [ Chalk · Ancient Seabed ] lives INSIDE this block as its
  // first child. The whole composition reads as a single editorial
  // unit and shares one motion envelope:
  //
  //   y       - CONTINUOUS linear drift +20vh → -30vh across the
  //             visibility window. Total travel: 50vh - moderate
  //             upward drift through the middle of the image, not
  //             the full-frame traversal we briefly tried at ±120vh.
  //   opacity - early fade-in (0.25 → 0.38) · plateau (0.38 → 0.7) ·
  //             gradual fade-out (0.7 → 0.97).
  //
  // The fade-out starts at p=0.7 while the block is still clearly
  // visible inside the frame, and gradually carries it through the
  // upper third of the image as it fades.
  const bottomY = useTransform(scrollYProgress, [0.25, 0.97], ["20vh", "-30vh"]);
  const bottomOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.38, 0.7, 0.97],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={ref}
      className="relative bg-[#010101] h-[160vh] md:h-[220vh]"
    >
      {/* Mobile height tightened from 300vh → 220vh (2026-05-17 after
          user feedback "Scroll-Effekt im Chalk-Abschnitt viel zu lang").
          Sticky pin range scales proportionally - the editorial choreography
          stays intact, just compressed into a shorter scroll path that
          doesn't make Mobile users feel the page is "stuck". Desktop keeps
          300vh because larger viewports tolerate the cinematic pacing. */}

      {/* ── LAYER 0 (BEHIND) - Chalk image sticky-pinned ── */}
      <div className="sticky top-0 h-[700px] md:h-screen overflow-hidden z-0 bg-[#010101]">
        {/* Asset: terroir-vineyard.jpg (684 KB desktop) + new
            terroir-vineyard-1280.jpg (239 KB mobile srcset). Mobile gets
            the smaller variant so the decode doesn't compete with the
            scroll-driven scale/y transforms on the same image. */}
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={`${basePath}/images/terroir-vineyard-1280.jpg`}
          />
          <motion.img
            src={`${basePath}/images/terroir-vineyard.jpg`}
            alt="Vineyard rows on the chalk soils of Ditchling Common, East Sussex"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover motion-reduce:!scale-100 motion-reduce:![transform:none]"
            style={{ scale: imageScale, y: imageY, willChange: "transform" }}
          />
        </picture>
        {/* Readability layers - refined 2026-05-16 after the radial
            halos were rendering as visible dark "blobs" rather than
            blending smoothly. Stripped back to just two soft linear
            gradients (top + bottom) plus a subtle base darken. The
            text legibility now comes from multi-layer text-shadows
            on the on-image texts themselves, not from heavy halos. */}

        {/* Base darken - 12% black across the entire image so the
            brightest highlights never fight with gold/cream text */}
        <div className="absolute inset-0 pointer-events-none bg-black/[0.12]" />

        {/* Top readability gradient - smooth fade, no hard color stops */}
        <div
          className="absolute inset-x-0 top-0 h-[40%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Bottom readability gradient - smooth fade, no hard color stops */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* BOTTOM: Kicker + Grape varieties + Champagne caption.
            The [ Chalk · Ancient Seabed ] kicker now sits directly
            above the grape names as part of the same editorial unit,
            sharing the same y + opacity animation. */}
        <motion.div
          className="absolute inset-x-0 bottom-[14vh] px-6 md:px-10 text-center"
          style={{ y: bottomY, opacity: bottomOpacity }}
        >
          {/* Kicker - sits directly above the grape names */}
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-4 md:mb-5"
            style={{
              fontSize: "clamp(15px, 1.6vw, 22px)",
              textShadow:
                "0 2px 6px rgba(0,0,0,0.95), 0 4px 22px rgba(0,0,0,0.85), 0 0 60px rgba(0,0,0,0.5)",
            }}
          >
            [ Chalk · Ancient Seabed ]
          </p>

          {/* Grape varieties - single line with brand "·" middle-dot
              separator (Ridgeview CD pattern, same as the kicker
              "[ Chalk · Ancient Seabed ]"). Non-breaking space inside
              "Pinot Noir" + "Pinot Meunier" so those two-word names
              never wrap mid-name; line-breaks happen only at the
              breakable spaces around the dots. */}
          <p
            className="font-display italic text-[#C8A96E] mb-7 md:mb-9"
            style={{
              fontSize: "clamp(32px, 4.5vw, 64px)",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              textShadow:
                "0 3px 8px rgba(0,0,0,0.98), 0 6px 28px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.6)",
            }}
          >
            Chardonnay · Pinot{" "}Noir · Pinot{" "}Meunier
          </p>
          <p
            className="font-body text-white leading-snug mx-auto"
            style={{
              fontSize: "clamp(18px, 1.8vw, 26px)",
              fontWeight: 300,
              maxWidth: "680px",
              textShadow:
                "0 2px 8px rgba(0,0,0,0.95), 0 4px 24px rgba(0,0,0,0.85), 0 0 60px rgba(0,0,0,0.55)",
            }}
          >
            The same varieties, grown across the Channel -{" "}
            <br className="hidden md:block" />
            rooted in Sussex chalk.
          </p>
        </motion.div>
      </div>

      {/* ── LAYER 10 (ON TOP) - Terroir text overlay ── */}
      {/* The chalk above takes 100vh in normal flow (its h-screen
          sticky div); -mt-[100vh] pulls this Terroir block UP by
          exactly that amount so it overlaps the chalk's pin area.
          Solid #010101 bg covers the image while in place.
          Pure normal-flow scroll - no transform - so as the user
          scrolls, Terroir naturally rises off the top of the
          viewport, revealing the pinned chalk image behind it like
          a curtain. */}
      <div className="relative z-10 -mt-[700px] md:-mt-[100vh] min-h-[700px] md:min-h-screen bg-[#010101] flex items-center justify-center">
        <div className="max-w-[920px] mx-auto px-6 md:px-16 text-center w-full pt-2 pb-2 md:py-4">
          {/* FadeUp wrappers were stripped here 2026-05-17 per user
              direction: the curtain reveal itself already provides
              the editorial entrance — adding the .reveal fade + 28px
              slide + 6px blur on top muddied the moment. Texts now
              render directly (still benefit from the IntersectionObserver
              re-show-reset by virtue of the surrounding ScrollReset
              wrapper, but no per-line stagger fade). */}
          <p
            className="font-display italic text-[#C8A96E] mb-2 tracking-widest"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            [ Ditchling Common · East Sussex ]
          </p>

          <h2
            className="font-display italic text-white leading-[1.05]"
            style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 400 }}
          >
            Two countries.
          </h2>
          <h2
            className="font-display italic text-white leading-[1.05]"
            style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 400 }}
          >
            One <span className="text-[#C8A96E]">ancient</span> seabed.
          </h2>
          <h2
            className="font-display italic text-white leading-[1.05]"
            style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 400 }}
          >
            One <span className="text-[#C8A96E]">tradition.</span>
          </h2>

          <p
            className="font-body text-white/70 leading-relaxed mx-auto mt-12 md:mt-16"
            style={{
              fontSize: "clamp(14px, 1.4vw, 17px)",
              fontWeight: 300,
              // 700px (was 560px) gives the paragraph room to settle into
              // 3 lines on desktop instead of breaking onto 4 with a
              // word orphan on the last line. text-wrap:balance lets the
              // browser distribute words evenly across the 3 lines.
              maxWidth: "700px",
              textWrap: "balance",
            }}
          >
            It began with a belief: that the chalk soils beneath the South Downs
            - the same Cretaceous seabed that surfaces across the Channel - could produce world-class
            sparkling wine. In 1995, Ridgeview planted its first vines.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section: Heritage Part 2 - Merret Quote ─────────────────────────────────

function HeritageDiscoverySection() {
  // Reverted 2026-05-17 (user direction): the full-bleed background
  // image was removed - section now sits on a solid #010101 plate
  // so the Merret pull-quote reads as pure editorial typography
  // without the bottle-line-up image behind it. Text stack (intro ·
  // pull-quote · attribution · body · gold divider) anchored left,
  // vertically centered. The drop-shadows on each text element are
  // intentionally KEPT - harmless on solid black and easier to
  // re-introduce a bg image later if needed.
  return (
    <section className="relative overflow-hidden bg-[#010101] min-h-[68vh] md:min-h-[92vh]">

      {/* ── Text overlay ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 min-h-[68vh] md:min-h-[92vh] flex items-center">
        <div className="max-w-[640px]">

          <FadeUp delay={0.1}>
            <p
              className="font-body text-white/75 leading-relaxed mb-10"
              style={{
                fontSize: "clamp(14px, 1.35vw, 16px)",
                fontWeight: 300,
                maxWidth: "520px",
                textShadow: "0 2px 14px rgba(0,0,0,0.85)",
              }}
            >
              Before it became a French treasure, an English physician wrote it down.
            </p>
          </FadeUp>

          {/* Pull-quote - large decorative open-quote sits behind the text */}
          <FadeUp delay={0.2} duration={1.1}>
            <div className="relative mb-8">
              <span
                className="absolute font-display italic text-[#C8A96E] select-none pointer-events-none"
                style={{
                  fontSize: "clamp(100px, 16vw, 200px)",
                  lineHeight: 1,
                  top: "-0.35em",
                  left: "-0.08em",
                  opacity: 0.18,
                  textShadow: "0 2px 24px rgba(0,0,0,0.6)",
                }}
              >
                &ldquo;
              </span>
              <blockquote
                className="font-display italic text-cream relative z-10"
                style={{
                  fontSize: "clamp(24px, 3.2vw, 48px)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  textShadow: "0 2px 20px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                Some Observations concerning the Ordering of Wines.
              </blockquote>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p
              className="font-body text-white/55 tracking-[0.2em] uppercase mb-10"
              style={{
                fontSize: "clamp(9px, 0.9vw, 11px)",
                fontWeight: 400,
                textShadow: "0 1px 8px rgba(0,0,0,0.7)",
              }}
            >
              - Christopher Merret · Royal Society · London, 17 December 1662
            </p>
          </FadeUp>

          <FadeUp delay={0.5}>
            <p
              className="font-body text-white/70 leading-relaxed mb-10"
              style={{
                fontSize: "clamp(13px, 1.3vw, 15px)",
                fontWeight: 300,
                maxWidth: "520px",
                textShadow: "0 2px 14px rgba(0,0,0,0.85)",
              }}
            >
              The English invented secondary fermentation. The coal-fired glass bottle
              strong enough to contain it. The use of cork to seal it. For decades, the
              Champenois called the bubbles &lsquo;the devil&apos;s wine&rsquo; and tried
              to remove them. Today, Champagne is one of France&rsquo;s greatest cultural
              treasures - while the method, like the chalk beneath it, a shared European
              heritage.
            </p>
          </FadeUp>

          {/* Gold divider - anchored left, brighter than the off-image
              version because the photo behind would otherwise eat it. */}
          <motion.div
            style={{
              height: "1px",
              background: "rgba(200,169,110,0.45)",
              maxWidth: "320px",
              transformOrigin: "left",
              boxShadow: "0 0 8px rgba(200,169,110,0.25)",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Section: Heritage Part 3 - Behind the Bottle (shared with SKU pages) ────
// The legacy HeritageMethodSection lived here. Replaced by the shared
// BehindTheBottleSection component used on the SKU pages, so the same
// four craft pillars (Soil → Harvest → Method → Lees) tell the same
// story everywhere on the site.

// ── Section: Visit Panels ───────────────────────────────────────────────────

function VisitPanels() {
  return (
    <section className="bg-[#010101]">

      {/* Full-width cinematic image banner */}
      <FadeIn>
        <div className="group relative w-full overflow-hidden" style={{ height: "clamp(280px, 45vw, 520px)" }}>
          <img
            src={`${basePath}/images/cellar-hands.webp`}
            alt="Hands carefully turning a bottle in Ridgeview's underground cellar"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.02]"
            style={{ objectPosition: "center 35%" }}
          />
          {/* Gold-tinted overlay for CD consistency */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(200,169,110,0.12), rgba(200,169,110,0.04))" }} />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-transparent to-[#010101]" style={{ opacity: 0.6 }} />
        </div>
      </FadeIn>

      <div className="max-w-[960px] mx-auto px-6 md:px-16 pt-10 pb-10 md:pt-16 md:pb-12 text-center">
        <FadeUp>
          {/* Anchor `#visit` sits directly on the kicker <p> (not the
              wrapping div) so the browser scrolls to position the
              kicker exactly at the navbar's bottom edge - the div's
              pt-10/16 padding above no longer adds to the landing
              offset. `scroll-margin-top: 80px` ≈ navbar height (≈70px)
              + a small breath, so the kicker sits cleanly under the
              milk-glass navbar without overlap. */}
          <p
            id="visit"
            className="font-display italic text-[#C8A96E] tracking-widest mb-5"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)", scrollMarginTop: "110px" }}
          >
            [ Book Your Experience ]
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            className="font-display italic text-cream leading-[1.08]"
            style={{ fontSize: "clamp(34px, 4.5vw, 68px)", fontWeight: 400 }}
          >
            Choose your <span className="text-[#C8A96E]">visit.</span>
          </h2>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "85vh" }}>

        {/* ── Panel: Vineyard Tour ── */}
        <FadeUp delay={0.15}>
          <div className="group relative overflow-hidden flex flex-col justify-end" style={{ minHeight: "70vh" }}>
            <img
              src={`${basePath}/images/booking/6.jpg`}
              alt="Ridgeview vineyard at sunset with sparkling wine"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: "center 55%" }}
            />
            <div className="absolute inset-0 bg-black/45 transition-colors duration-700 group-hover:bg-black/58" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute top-0 right-0 bottom-0 w-px bg-white/[0.08] hidden md:block" />

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
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)", fontWeight: 300, maxWidth: "380px" }}
              >
                Walk the estate with our team, from vine to cellar. Understand what
                English chalk does to a sparkling wine. Taste directly from the cellar.
              </p>
              <p
                className="font-body text-[#C8A96E] tracking-[0.18em] uppercase mb-8"
                style={{ fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 400 }}
              >
                1.5 hrs · Fri-Sun
              </p>
              {/* `data-back-to-top-anchor` marks this CTA as the
                  vertical reference for the floating BackToTopFloat -
                  the arrow measures this element's position at runtime
                  and aligns its centre with it. Picking the Vineyard
                  Tour CTA (LEFT panel) is arbitrary since both visit
                  CTAs share the same baseline; either would do. */}
              <a href="#" className="btn-cta" data-back-to-top-anchor>
                Book a Vineyard Tour
              </a>
            </div>
          </div>
        </FadeUp>

        {/* ── Panel: Restaurant ── */}
        <FadeUp delay={0.3}>
          <div className="group relative overflow-hidden flex flex-col justify-end" style={{ minHeight: "70vh" }}>
            <img
              src={`${basePath}/images/booking/7.jpg`}
              alt="The Rows & Vine restaurant with vineyard views"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: "center 40%" }}
            />
            <div className="absolute inset-0 bg-black/45 transition-colors duration-700 group-hover:bg-black/58" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

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
              <p
                className="font-display italic text-white/45 mb-5"
                style={{ fontSize: "clamp(14px, 1.5vw, 18px)", fontWeight: 400 }}
              >
                Every occasion deserves something extraordinary.
              </p>
              <p
                className="font-body text-white/65 leading-relaxed mb-5"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)", fontWeight: 300, maxWidth: "380px" }}
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
              <a href="#" className="btn-cta">
                Reserve a Table
              </a>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

// ── Component: Floating Back-to-Top ──────────────────────────────────────────
// Smart UX behaviour (locked 2026-05-12):
//   - Appears when the user reaches the Visit section (`#visit`),
//     including via the homepage Hero deep-link `/vineyard-booking#visit`.
//   - Stays visible while the user keeps scrolling DOWN (past Visit,
//     into Practical Info, into Footer).
//   - Hides as soon as the user reverses direction and scrolls UP -
//     because they're already moving toward the top naturally, the
//     affordance is redundant and would just be visual clutter.
//   - Hides again if the user scrolls back above the Visit section.
//
// Fixed-position bottom-right. On mobile sits above the BottomNav.

function BackToTopFloat() {
  // `enabled` gates everything else. It's set on mount ONLY if the user
  // arrived via the homepage Hero "Vineyard Booking" button (which
  // writes a timestamped sessionStorage flag right before navigation).
  // Direct URL navigation, refresh, browser-back-into-page, or visits
  // from other routes all leave `enabled` false → button never appears.
  const [enabled, setEnabled] = useState(false);
  // `show` is the position-based visibility - true when the visit
  // section is in or above the viewport, false when it's below.
  const [show, setShow] = useState(false);
  // Dynamic `bottom: Npx` value. Computed at runtime by measuring the
  // visit-section CTA marked with `data-back-to-top-anchor` and
  // aligning the arrow's centre with the CTA's centre.
  //
  // Initial value is `null` - the arrow is NOT rendered until this
  // has been set to a real measured value. That way we never paint a
  // fallback position first and then jump to the measured one (the
  // "vertical zucken" the user kept seeing).
  const [bottomPx, setBottomPx] = useState<number | null>(null);

  // Consume the one-time "from hero" flag on mount.
  useEffect(() => {
    try {
      const ts = sessionStorage.getItem("rv-back-to-top-from-hero");
      if (ts) {
        const age = Date.now() - parseInt(ts, 10);
        // Fresh flag (<10s old) = real navigation from hero → enable.
        // Stale flag = leftover from a cancelled navigation → ignore.
        if (Number.isFinite(age) && age >= 0 && age < 10_000) {
          setEnabled(true);
        }
        // One-time-use: clear so a later refresh doesn't re-trigger.
        sessionStorage.removeItem("rv-back-to-top-from-hero");
      }
    } catch {
      /* sessionStorage blocked → button stays disabled. Fine. */
    }
  }, []);

  // Position-based visibility with PERMANENT-DISARM behaviour.
  //
  // Rules:
  //   - Show whenever visit kicker is IN or ABOVE the viewport.
  //   - Hide once kicker is BELOW the viewport (user is above visit).
  //   - ONE-WAY: once the user has reached visit AND then scrolled
  //     above it, the button is PERMANENTLY hidden for the rest of
  //     the session. Scrolling back down past visit will NOT
  //     re-show it.
  //
  // Why disarm: the button is a one-time courtesy for the
  // deep-link-from-Hero user - it gives them a way back to the
  // hero of the page they were sent into. Once they've used the
  // page normally (scrolled back up to / past the hero), the
  // affordance is no longer relevant.
  //
  // Three event sources feed a single rAF-throttled `update()`:
  //   1. `scroll` - catches user scrolling
  //   2. `resize` - catches viewport-height changes
  //   3. `IntersectionObserver` - catches LAYOUT SHIFTS that move
  //      the kicker without user scrolling (lazy images / font swaps)
  useEffect(() => {
    if (!enabled) return;

    const visitEl = document.getElementById("visit");
    if (!visitEl) return;

    let hasReachedVisit = false;
    let permanentlyHidden = false;
    let rafScheduled = false;

    const update = () => {
      rafScheduled = false;
      if (permanentlyHidden) {
        setShow(false);
        return;
      }
      const rect = visitEl.getBoundingClientRect();
      const vpH = window.innerHeight;
      const visitInOrAbove = rect.top < vpH;

      if (visitInOrAbove) {
        // Kicker visible OR scrolled past upward → user has reached it.
        hasReachedVisit = true;
        setShow(true);
      } else {
        // Kicker fully below viewport → user is above visit.
        if (hasReachedVisit) {
          // They reached visit earlier, now they're above → DISARM
          // the button for the rest of the session.
          permanentlyHidden = true;
        }
        setShow(false);
      }
    };

    const schedule = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    const observer = new IntersectionObserver(schedule, { threshold: 0 });
    observer.observe(visitEl);

    // Initial check (covers the post-deep-link-scroll state).
    update();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [enabled]);

  // ── Position alignment (one-shot, then frozen) ───────────────────────
  // Measure the visit-section CTA's vertical position ONCE - the first
  // moment the CTA is intersecting the viewport - set the arrow's
  // bottom from that measurement, and never touch it again on scroll.
  // The arrow stays exactly where it was first painted; it does NOT
  // track the CTA when the user scrolls down into other sections.
  //
  // We use an IntersectionObserver instead of a scroll listener so we
  // get a guaranteed callback the moment the CTA enters the viewport
  // - including the initial paint, where the observer fires once
  // synchronously with the current intersection state. No polling,
  // no rAF throttling needed.
  //
  // The arrow is NOT rendered until `bottomPx` is non-null (see the
  // conditional in the return below). That eliminates the previous
  // "paint at fallback then jump to measured" flicker - there's
  // simply nothing on screen until we have the right value.
  //
  // Re-measures on resize (the layout changed → the previously-locked
  // bottom would be wrong on the new viewport).
  useEffect(() => {
    if (!enabled) return;

    const cta = document.querySelector<HTMLElement>(
      "[data-back-to-top-anchor]",
    );
    if (!cta) return;

    let measured = false;

    const measure = () => {
      if (measured) return;
      const rect = cta.getBoundingClientRect();
      const vh = window.innerHeight;
      // The CTA must be FULLY inside the viewport - not just barely
      // intersecting. The previous "any intersection" check captured
      // the moment the CTA first peeked in from the bottom, when its
      // centre was still below the fold. The resulting bottom was
      // negative, got clamped to minBottom (16 px), and locked there.
      if (rect.top < 0 || rect.bottom > vh) return;

      const ARROW_HEIGHT = 40;
      const isMobile = window.innerWidth < 768;
      const minBottom = isMobile ? 80 : 16; // mobile keeps BottomNav clearance.

      // Align centres: arrow centre = CTA centre.
      const ctaCenter = (rect.top + rect.bottom) / 2;
      const computedBottom = vh - ctaCenter - ARROW_HEIGHT / 2;
      const clamped = Math.max(
        minBottom,
        Math.min(vh - ARROW_HEIGHT - 16, computedBottom),
      );
      setBottomPx(clamped);
      measured = true;
    };

    // Multi-threshold IntersectionObserver: fires every time the CTA's
    // intersection ratio crosses 0.25 / 0.5 / 0.75 / 1.0. By the time
    // we hit 1.0, the CTA is fully inside the viewport - that's the
    // first scroll moment where measure() actually has a usable rect.
    // Single-threshold-0 wouldn't work here: it only fires twice (on
    // enter and on exit) and the enter-fire happens at the worst
    // possible moment (barely visible, centre below the fold).
    const observer = new IntersectionObserver(
      (entries) => {
        if (!measured && (entries[0]?.intersectionRatio ?? 0) >= 1) {
          measure();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    observer.observe(cta);

    // Resize: the locked value is wrong on a new viewport, so reset
    // and re-measure. The observer will refire and call measure()
    // again because the CTA's intersection state hasn't changed
    // (it's still in viewport), so we trigger it manually here.
    const onResize = () => {
      measured = false;
      setBottomPx(null); // hide briefly while we re-measure
      measure();
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [enabled]);

  // Inline styles for the V4 etched-crystal look - replicated here
  // rather than via the `.btn-cta` class because `.btn-cta` declares
  // `position: relative` which (in this Tailwind v4 + Next.js setup)
  // wins over Tailwind's `.fixed` utility due to CSS layer ordering.
  // Inline styles bypass that conflict entirely. Tailwind utilities
  // are still used for the right offset; `bottom` is set dynamically
  // via the inline `style` from the useEffect above.
  return (
    <AnimatePresence>
      {enabled && show && bottomPx !== null && (
        <motion.a
          href="#top"
          aria-label="Back to top of page"
          title="Back to top"
          className="fixed right-6 md:right-8 z-50"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            // `bottom` is set once at mount via the measurement effect
            // above (matching the visit-section CTA's vertical
            // centre), then frozen - the arrow does NOT track the CTA
            // as the user scrolls. Re-measures only on resize.
            bottom: `${bottomPx}px`,
            // 40 px square - matches the computed height of a `.btn-cta`
            // (font-size 10-11 px · padding 13 px vertical = ~40 px),
            // so the floating arrow visually aligns with the "Reserve a
            // Table" CTA when both are on screen.
            width: "40px",
            height: "40px",
            background: "rgba(245, 240, 232, 0.04)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            border: "1px solid rgba(200, 169, 110, 0.70)",
            boxShadow:
              "inset 0 0 0 1px rgba(200, 169, 110, 0.18), inset 0 1px 0 rgba(245, 240, 232, 0.10), 0 0 0 1px rgba(200, 169, 110, 0.06), 0 8px 24px -4px rgba(0, 0, 0, 0.4)",
            color: "#f5f0e8",
            fontFamily: "'Raleway', system-ui, sans-serif",
            fontSize: "20px",
            lineHeight: 1,
            borderRadius: "4px",
            textDecoration: "none",
            cursor: "pointer",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            background: "rgba(245, 240, 232, 0.08)",
            borderColor: "#C8A96E",
          }}
        >
          <span aria-hidden>&uarr;</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// ── Section: Practical Info ─────────────────────────────────────────────────

function PracticalInfo() {
  // Layout 2026-05-17: title block (kicker + headline) sits LEFT on
  // desktop next to the 3 info columns - was stacked above before.
  // Outer container expanded from max-w-[960px] to max-w-[1400px] to
  // match the rest of /vineyard-booking (VisitPanels, Heritage,
  // NearbyAccommodation all use 1400px).
  //
  // Grid is FLAT (4 equal cols × gap-20) rather than nested
  // ([1fr_2fr] outer × cols-3 inner) so all four blocks - title,
  // Opening Times, Getting Here, Contact - share the same 80px
  // horizontal rhythm. The nested variant gave title-to-OT 80px
  // but OT-to-GH only 40px, breaking the visual cadence.
  return (
    <section className="bg-[#010101]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 items-start">

          {/* LEFT — title block */}
          <div>
            <FadeUp>
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ Practical Information ]
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-display italic text-cream leading-[1.08]"
                style={{ fontSize: "clamp(32px, 4vw, 58px)", fontWeight: 400 }}
              >
                Find <span className="text-[#C8A96E]">us.</span>
              </h2>
            </FadeUp>
          </div>

          {/* RIGHT rail — 3 info blocks, siblings in the outer 4-col grid */}
          <FadeUp delay={0.1}>
            <div>
              <h3
                className="font-body text-cream uppercase mb-6"
                style={{ fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 500, letterSpacing: "0.18em" }}
              >
                OPENING TIMES
              </h3>
              <div className="space-y-3">
                {[
                  { day: "Monday - Thursday", time: "Closed" },
                  { day: "Friday", time: "10:00 - 17:00" },
                  { day: "Saturday", time: "10:00 - 17:00" },
                  { day: "Sunday", time: "10:00 - 16:00" },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between items-baseline border-b border-white/[0.06] pb-3">
                    <span className="font-body text-white/65" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 300 }}>{item.day}</span>
                    <span className={`font-body ${item.time === "Closed" ? "text-white/35" : "text-white/65"}`} style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 300 }}>{item.time}</span>
                  </div>
                ))}
              </div>
              <p className="font-body text-white/35 mt-4" style={{ fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 300 }}>
                Wine Bar &amp; Shop · Vineyard Tours by appointment
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div>
              <h3
                className="font-body text-cream uppercase mb-6"
                style={{ fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 500, letterSpacing: "0.18em" }}
              >
                GETTING HERE
              </h3>
              <address className="font-body text-white/65 not-italic leading-relaxed mb-6" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 300 }}>
                Ridgeview Wine Estate<br />
                Fragbarrow Lane<br />
                Ditchling Common<br />
                East Sussex<br />
                BN6 8TP
              </address>
              <p className="font-body text-white/45 leading-relaxed" style={{ fontSize: "clamp(12px, 1.1vw, 14px)", fontWeight: 300 }}>
                Located at the foot of the South Downs, 10 minutes north of Brighton. Free parking available on site.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            {/* Right-anchored on desktop (md:text-right + md:justify-end on
                the icon row) so the column's visible content reaches the
                section's right edge — aligning with the NearbyAccommodation
                carousel pagination dots above. Without this anchor the
                Contact values floated mid-column and left a visible gap on
                the right that broke the section-to-section width rhythm
                with the carousel. (2026-05-17) */}
            <div className="md:text-right">
              <h3
                className="font-body text-cream uppercase mb-6"
                style={{ fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 500, letterSpacing: "0.18em" }}
              >
                CONTACT
              </h3>
              <div className="space-y-3 mb-8">
                <a href="tel:01444242040" className="link-underline font-body text-white/65 block hover:text-white/80 transition-colors duration-300" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 300 }}>01444 242040</a>
                <a href="mailto:info@ridgeview.co.uk" className="link-underline font-body text-white/65 block hover:text-white/80 transition-colors duration-300" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 300 }}>info@ridgeview.co.uk</a>
              </div>
              <div className="flex items-center gap-5 md:justify-end">
                <a href="https://www.instagram.com/ridgeviewwine/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/45 hover:text-[#C8A96E] transition-colors duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="https://www.facebook.com/RidgeviewWineEstate/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/45 hover:text-[#C8A96E] transition-colors duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/ridgeview-wine-estate/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/45 hover:text-[#C8A96E] transition-colors duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
              </div>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BookingPage() {
  return (
    <div className="bg-[#010101] min-h-screen">
      <div
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><EstatePeopleSection /></ScrollReset>
        {/* Terroir Statement + Chalk Image - merged into a single
            LAYERED REVEAL section. The chalk image is sticky-pinned
            in the background; the Terroir text overlay sits on top
            (with solid bg) and scrolls upward naturally, revealing
            the pinned image as it goes - Apple "Powerful connections"
            pattern. */}
        <ScrollReset><HeritageRevealStack /></ScrollReset>
        {/* ── Heritage Sticky Stack (2 cards) ──
            Behind the Bottle (compact) → Discovery. The
            deck-of-cards behaviour kicks in here: as the user
            scrolls, Discovery rises from below and covers
            Behind the Bottle. */}
        <div className="relative">
          <div className="sticky top-0 min-h-svh md:min-h-screen bg-[#0a0a0a]">
            <ScrollReset>
              <BehindTheBottleSection
                compact
                headline={<>Crafted in the <span className="text-[#C8A96E]">Méthode Traditionnelle</span>.</>}
                intro="For three decades, Ridgeview has crafted English sparkling wines the long way - by hand, on the chalk hills of Sussex, using the Méthode Traditionnelle."
                pillars={[
                  { label: "Sussex Chalk Soil", detail: "Vines grown on Cretaceous chalk that runs from the South Downs, beneath the Channel, into northern France - the foundation of great sparkling wine." },
                  { label: "Hand Harvest", detail: "Grapes are picked at first light and sorted by hand to keep only the most balanced bunches." },
                  { label: "Méthode Traditionnelle", detail: "An English invention - coal-fired bottles strong enough to hold the bubbles, the cork to seal them in, deliberate secondary fermentation." },
                ]}
              />
            </ScrollReset>
          </div>
          <div className="sticky top-0 min-h-svh md:min-h-screen bg-[#010101]">
            <ScrollReset><HeritageDiscoverySection /></ScrollReset>
          </div>
        </div>
        <ScrollReset><RecognitionSection /></ScrollReset>
        <ScrollReset><VisitPanels /></ScrollReset>
        <ScrollReset><NearbyAccommodationSection /></ScrollReset>
        <ScrollReset><PracticalInfo /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
      <BackToTopFloat />
    </div>
  );
}
