"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { RecognitionSection } from "@/components/RecognitionSection";
import { EstatePeopleSection } from "@/components/EstatePeopleSection";
import { ScrollReset } from "@/components/ScrollReset";
import { ScrollRotateReveal } from "@/components/ScrollRotateReveal";
import { BehindTheBottleSection } from "@/components/sku/BehindTheBottleSection";
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
    <section id="top" ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {/* Mobile hero — vineyard rows leading toward the South Downs (portrait-friendly crop) */}
        <img
          src={`${basePath}/images/terroir-hero.jpg`}
          alt="Ridgeview vineyard rows leading toward the South Downs"
          className="absolute inset-0 w-full h-full object-cover sm:hidden"
          style={{ objectPosition: "center 50%" }}
        />
        {/* Desktop hero — drone shot, vineyard rows + cellar buildings */}
        <img
          src={`${basePath}/images/booking-hero-aerial.jpg`}
          alt="Aerial view of Ridgeview Wine Estate — vineyard rows and cellar buildings"
          className="absolute inset-0 w-full h-full object-cover hidden sm:block"
          style={{ objectPosition: "center 50%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010101]/30 via-transparent to-[#010101]/60" />
        {/* Desktop-only: stronger dark fade across the lower 30% so the
            kicker / headline / body copy stay legible against the bright
            aerial drone shot (mobile already has enough contrast from
            the portrait crop + the base gradient above). */}
        <div
          className="hidden sm:block absolute left-0 right-0 bottom-0 bg-gradient-to-t from-[#010101]/97 via-[#010101]/65 to-transparent"
          style={{ height: "30%" }}
        />
        {/* Desktop-only: extra diagonal darkening anchored to the
            bottom-left corner where the text block sits. Strong at the
            bottom-left, fading diagonally toward the top-right so the
            cellar buildings on the right stay visible. */}
        <div
          className="hidden sm:block absolute inset-0 bg-gradient-to-tr from-[#010101]/90 via-[#010101]/22 to-transparent"
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-1 md:pb-9"
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
            Lorem ipsum.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-body text-white/60 max-w-[440px]"
          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.7, textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ── Section: Heritage Part 1 — Terroir ──────────────────────────────────────

function HeritageTerroirSection() {
  return (
    <section className="relative overflow-hidden bg-[#010101]">

      {/* ── Background image — fixed, covers entire section ── */}
      <div className="absolute inset-0">
        <img
          src={`${basePath}/images/terroir-hero.jpg`}
          alt="Ridgeview vineyard rows stretching toward the South Downs"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 35%" }}
        />
        {/* Gold tint */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(200,169,110,0.06), rgba(200,169,110,0.02))" }} />
        {/* Darken for readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Top blend into previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#010101] to-transparent" />
        {/* Bottom blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#010101] to-transparent" />
      </div>

      {/* ── ScrollRotateReveal — vertical title above 3D-rotating card ── */}
      <ScrollRotateReveal
        titleComponent={
          <div className="relative z-10 px-6 md:px-16">
            <FadeUp>
              <p
                className="font-display italic text-[#C8A96E] mb-5 tracking-widest"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 12px rgba(0,0,0,0.8)" }}
              >
                [ Ditchling Common · East Sussex ]
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2
                className="font-display italic text-white leading-[1.05]"
                style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 400, textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
              >
                Two countries.
              </h2>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h2
                className="font-display italic text-white leading-[1.05]"
                style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 400, textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
              >
                One <span className="text-[#C8A96E]">ancient</span> seabed.
              </h2>
            </FadeUp>
            <FadeUp delay={0.26}>
              <h2
                className="font-display italic text-white leading-[1.05]"
                style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 400, textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
              >
                One <span className="text-[#C8A96E]">tradition.</span>
              </h2>
            </FadeUp>
          </div>
        }
      >
        {/* Card content — chalk-soil vineyard image with editorial overlays */}
        <div className="relative h-full w-full overflow-hidden rounded-sm">
          <img
            src={`${basePath}/images/estate-vineyard.jpg`}
            alt="Vineyard rows on Sussex chalk soils at Ridgeview"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Soft inner shading for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/40" />
          {/* Editorial overlay caption (top-left) */}
          <div className="absolute top-5 left-5 md:top-8 md:left-10">
            <p
              className="font-display italic text-[#C8A96E] tracking-widest"
              style={{ fontSize: "clamp(11px, 1vw, 13px)", textShadow: "0 1px 12px rgba(0,0,0,0.8)" }}
            >
              [ Chalk · Ancient Seabed ]
            </p>
          </div>
          {/* Grape labels (bottom strip) */}
          <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-10 md:right-10 flex flex-wrap gap-5">
            {["Chardonnay", "Pinot Noir", "Pinot Meunier"].map((grape) => (
              <p
                key={grape}
                className="font-display italic text-[#C8A96E]"
                style={{
                  fontSize: "clamp(12px, 1.2vw, 15px)",
                  letterSpacing: "0.06em",
                  textShadow: "0 1px 8px rgba(0,0,0,0.7)",
                }}
              >
                {grape}
              </p>
            ))}
          </div>
        </div>
      </ScrollRotateReveal>

      {/* ── Post-card footer — body paragraph + divider + varieties paragraph ── */}
      <div className="relative z-10 max-w-[760px] mx-auto px-6 md:px-16 pb-20 md:pb-32 -mt-32 md:-mt-44 text-center">
        <FadeUp delay={0.35}>
          <p
            className="font-body text-white/70 leading-relaxed mb-8 mx-auto"
            style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, maxWidth: "560px", textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
          >
            It began with a belief: that the chalk soils beneath the South Downs
            — mirroring the geology of Champagne — could produce world-class
            sparkling wine. In 1995, Ridgeview planted its first vines.
          </p>
        </FadeUp>

        <motion.div
          className="mb-8 mx-auto"
          style={{ height: "1px", background: "rgba(200,169,110,0.2)", transformOrigin: "center", maxWidth: "260px" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />

        <FadeUp delay={0.5}>
          <p
            className="font-body text-white/70 leading-relaxed mx-auto"
            style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300, maxWidth: "520px", textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
          >
            Chardonnay, Pinot Noir, and Pinot Meunier — the same varieties
            that define Champagne — rooted in Sussex chalk.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Section: Heritage Part 2 — Merret Quote ─────────────────────────────────

function HeritageDiscoverySection() {
  return (
    <section className="bg-[#010101] relative overflow-hidden">

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] min-h-[75vh]">

          {/* Left — quote.png image with editorial frame */}
          <FadeIn>
            <div className="relative p-4 md:p-8 lg:p-12 flex items-center justify-center">
              <div className="group relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "3/4", maxHeight: "680px" }}>
                <img
                  src={`${basePath}/images/quote.png`}
                  alt="Wine glass raised against Ridgeview vineyard at golden hour"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: "center 40%" }}
                />
                <div className="absolute inset-0 bg-black/15" />
                <div className="absolute inset-0 border border-white/[0.06] rounded-sm" />

                {/* Editorial corner accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#C8A96E]/20" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#C8A96E]/20" />
              </div>
            </div>
          </FadeIn>

          {/* Center — vertical gold divider (desktop only) */}
          <motion.div
            className="hidden md:block self-stretch"
            style={{
              background: "linear-gradient(to bottom, transparent 10%, rgba(200,169,110,0.15) 30%, rgba(200,169,110,0.15) 70%, transparent 90%)",
              transformOrigin: "top",
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Right — quote and context */}
          <div className="relative flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 md:py-24">

            <FadeUp delay={0.1}>
              <p
                className="font-body text-white/50 leading-relaxed mb-10 relative z-10"
                style={{ fontSize: "clamp(14px, 1.35vw, 16px)", fontWeight: 300, maxWidth: "520px" }}
              >
                Before Dom Pérignon began his experiments in Épernay, an English
                scientist documented the method that makes wine sparkle.
              </p>
            </FadeUp>

            {/* Pull-quote */}
            <FadeUp delay={0.2} duration={1.1}>
              <div className="relative mb-8">
                <span
                  className="absolute font-display italic text-[#C8A96E] select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(100px, 16vw, 200px)",
                    lineHeight: 1,
                    top: "-0.35em",
                    left: "-0.08em",
                    opacity: 0.08,
                  }}
                >
                  &ldquo;
                </span>
                <blockquote
                  className="font-display italic text-white relative z-10"
                  style={{
                    fontSize: "clamp(24px, 3.2vw, 48px)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  Our wine coopers of latter times use vast quantities of sugar and
                  molasses to all sorts of wines to make the drink brisk and sparkling
                  —{" "}<span className="text-[#C8A96E]">and to give them spirit.</span>
                </blockquote>
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p
                className="font-body text-white/30 tracking-[0.2em] uppercase mb-8 relative z-10"
                style={{ fontSize: "clamp(9px, 0.9vw, 11px)", fontWeight: 300 }}
              >
                — Christopher Merret · Royal Society · London, 1662
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <p
                className="font-body text-white/45 leading-relaxed mb-10 relative z-10"
                style={{ fontSize: "clamp(13px, 1.3vw, 15px)", fontWeight: 300, maxWidth: "520px" }}
              >
                The English invented secondary fermentation. The coal-fired glass bottle
                strong enough to contain it. The use of cork to seal it. The Champenois
                called the bubbles &lsquo;the devil&apos;s wine&rsquo; and spent decades
                trying to remove them.
              </p>
            </FadeUp>

            {/* Gold divider */}
            <motion.div
              className="relative z-10"
              style={{ height: "1px", background: "rgba(200,169,110,0.15)", maxWidth: "400px", transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Heritage Part 3 — Behind the Bottle (shared with SKU pages) ────
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
              kicker exactly at the navbar's bottom edge — the div's
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
                1.5 hrs · Fri–Sun
              </p>
              <a href="#" className="btn-cta">
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
//     including via the homepage Hero deep-link `/booking#visit`.
//   - Stays visible while the user keeps scrolling DOWN (past Visit,
//     into Practical Info, into Footer).
//   - Hides as soon as the user reverses direction and scrolls UP —
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
  // `show` is the position-based visibility — true when the visit
  // section is in or above the viewport, false when it's below.
  const [show, setShow] = useState(false);

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
  // deep-link-from-Hero user — it gives them a way back to the
  // hero of the page they were sent into. Once they've used the
  // page normally (scrolled back up to / past the hero), the
  // affordance is no longer relevant.
  //
  // Three event sources feed a single rAF-throttled `update()`:
  //   1. `scroll` — catches user scrolling
  //   2. `resize` — catches viewport-height changes
  //   3. `IntersectionObserver` — catches LAYOUT SHIFTS that move
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

  // Inline styles for the V4 etched-crystal look — replicated here
  // rather than via the `.btn-cta` class because `.btn-cta` declares
  // `position: relative` which (in this Tailwind v4 + Next.js setup)
  // wins over Tailwind's `.fixed` utility due to CSS layer ordering.
  // Inline styles bypass that conflict entirely. Tailwind utilities
  // are still used for responsive offsets (md:right-8, md:bottom-8)
  // since those don't conflict with anything when `.btn-cta` is
  // not in the class list.
  return (
    <AnimatePresence>
      {enabled && show && (
        <motion.a
          href="#top"
          aria-label="Back to top of page"
          title="Back to top"
          className="fixed right-6 md:right-8 bottom-20 md:bottom-8 z-50"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
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
  return (
    <section className="bg-[#010101]">
      <div className="max-w-[960px] mx-auto px-6 md:px-16 py-20 md:py-28">

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
            className="font-display italic text-cream leading-[1.08] mb-14 md:mb-20"
            style={{ fontSize: "clamp(32px, 4vw, 58px)", fontWeight: 400 }}
          >
            Find <span className="text-[#C8A96E]">us.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

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
                  { day: "Monday – Thursday", time: "Closed" },
                  { day: "Friday", time: "10:00 – 17:00" },
                  { day: "Saturday", time: "10:00 – 17:00" },
                  { day: "Sunday", time: "10:00 – 16:00" },
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
            <div>
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
              <div className="flex items-center gap-5">
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
        <ScrollReset><HeritageTerroirSection /></ScrollReset>
        <ScrollReset>
          <BehindTheBottleSection
            headline={<>Crafted in the <span className="text-[#C8A96E]">Classic Method</span>.</>}
            intro="For three decades, Ridgeview has crafted English sparkling wines the long way — by hand, on the chalk hills of Sussex, using the same Classic Method as the great houses of Champagne."
            pillars={[
              { label: "Sussex Chalk Soil", detail: "Vines grown on the same Cretaceous chalk that runs beneath the Champagne region — the foundation of every great sparkling wine." },
              { label: "Hand Harvest", detail: "Grapes are picked at first light and sorted by hand to keep only the most balanced bunches." },
              { label: "Méthode Traditionnelle", detail: "Secondary fermentation in bottle — the same Classic Method used in the great houses of Champagne." },
            ]}
          />
        </ScrollReset>
        <ScrollReset><HeritageDiscoverySection /></ScrollReset>
        <ScrollReset><RecognitionSection /></ScrollReset>
        <ScrollReset><VisitPanels /></ScrollReset>
        <ScrollReset><PracticalInfo /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
      <BackToTopFloat />
    </div>
  );
}
