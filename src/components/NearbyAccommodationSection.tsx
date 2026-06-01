"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { basePath } from "@/lib/basePath";

/**
 * NearbyAccommodationSection
 *
 * Sister carousel to WineCollectionSection - same primitives, same
 * animation grammar, same controls bar. Surfaces the six curated
 * stays from ridgeview.co.uk/visit/visiting-us/nearby-accommodation/
 * directly on /vineyard-booking, above the PracticalInfo block, so a
 * visitor who's just decided to come has "where do I stay?" answered
 * without leaving the page.
 *
 * Mechanics copied 1:1 from WineCollectionSection (2026-05-17):
 *   - 12s auto-rotation, paused via useInView when section is <15% in view
 *   - AnimatePresence + custom dir variants (blur-slide, 0.44s)
 *   - Mobile swipe (>45px delta) → paginate
 *   - Controls bar: prev/counter/next | center CTA | dots
 *
 * Layout differences from WineCollection:
 *   - Desktop: 2-column split (text | image) instead of 5-column
 *     (wine has bottle PNG + vintage + tasting notes - hotels just
 *     have name/description/CTA + a hero shot)
 *   - Mobile: image at top, content stacked below (wine puts the
 *     bottle PNG in the middle vertically)
 *   - CTAs are EXTERNAL with target="_blank" rel="noopener noreferrer"
 *     (wines link to internal /wine/<slug> pages; hotels link to
 *     each hotel's own booking site)
 *   - No center CTA in the controls bar. WineCollection has
 *     "Shop all Wines" pointing to the /wines catalog (true
 *     outbound, different page). The accommodation equivalent
 *     would have been a same-page anchor to PracticalInfo right
 *     below — wrong hierarchy for a primary btn-cta. Section ends
 *     on dots; natural scroll handles the handoff.
 *
 * Source images: live at /public/images/accommodation/<slug>.webp,
 * downloaded verbatim from the ridgeview.co.uk WP uploads (real
 * data-src URLs recovered via curl - the page lazy-loads so WebFetch
 * only saw placeholder.svg).
 */

// ─── Data ─────────────────────────────────────────────────────
interface Accommodation {
  slug: string;
  name: string;
  /** Type-only kicker, e.g. "Pub with Rooms" - shown as `[ kicker ]`. */
  kicker: string;
  /** Verbatim from the UK source page. */
  description: string;
  /** Relative to /public, used as `${basePath}${image}`. */
  image: string;
  /** External booking URL — opens in new tab. */
  link: string;
  /** Optional award / recognition badge (e.g. "Great British Pub of the Year 2016"). */
  badge?: string;
}

const ACCOMMODATIONS: Accommodation[] = [
  {
    slug: "south-lodge",
    name: "South Lodge Hotel",
    kicker: "Luxury Hotel",
    description:
      "South Lodge is a luxury hotel in Sussex offering the best in relaxation. Flawless attention to detail and homely charm in bucket loads is provided, with breath-taking views of the South Downs together with award-winning dining and the most amazing state-of-the-art spa.",
    image: "/images/accommodation/south-lodge.webp",
    link: "https://www.exclusive.co.uk/south-lodge/",
  },
  {
    slug: "the-bull-ditchling",
    name: "The Bull in Ditchling",
    kicker: "Pub with Rooms",
    description:
      "Modern Pub, Centuries of Tradition. Based in the picturesque village of Ditchling with great views of the South Downs. Chic, individually decorated rooms feature designer wall coverings, en suite bathrooms, flat-screen TVs, free Wi-Fi, and tea and coffee-making facilities.",
    image: "/images/accommodation/the-bull-ditchling.webp",
    link: "https://www.thebullditchling.com/",
    badge: "Great British Pub of the Year 2016",
  },
  // The Ginger Pig (Brighton) removed 2026-05-18 — thegingerpigpub.com
  // now returns 404, so the "View Hotel" CTA would be dead. The asset
  // file gallery accommodation/ginger-pig.webp is kept in /public for
  // now in case the venue reappears at a new URL.
  {
    slug: "hotel-du-vin-brighton",
    name: "Hotel Du Vin Brighton",
    kicker: "Boutique Hotel",
    description:
      "This luxury Brighton hotel is nestled in the iconic cobbled alleyways of The Lanes. With 49 distinctive rooms and suites — some offering spectacular sea views — you'll find super-soft Egyptian cotton linen, fluffy towels, roll top baths and drenching monsoon showers.",
    image: "/images/accommodation/hotel-du-vin-brighton.webp",
    link: "https://www.hotelduvin.com/locations/brighton/",
  },
  {
    slug: "the-grand-brighton",
    name: "The Grand Brighton",
    kicker: "Seaside Hotel",
    description:
      "Write your Grand story on Brighton's beautiful coastline. Indulge in fresh seafood and local produce at the restaurant Cyan, or finish a sunset stroll with a cocktail in the stunning Victoria Bar. Simply step out of their historic doors onto Brighton's iconic seafront.",
    image: "/images/accommodation/the-grand-brighton.webp",
    link: "https://www.grandbrighton.co.uk/",
  },
  {
    slug: "ockenden-manor",
    name: "Ockenden Manor",
    kicker: "Country Manor",
    description:
      "A fine Elizabethan manor house with 28 lavishly decorated rooms set in eight acres of beautiful grounds. The perfect country retreat — luxurious, tranquil, with an outstanding restaurant and exceptional spa. With its history and character, elegant sitting room warmed by a roaring log fire and cosy, wood-panelled bar, Ockenden Manor is a wonderful place to escape.",
    image: "/images/accommodation/ockenden-manor.webp",
    link: "https://www.hshotels.co.uk/ockenden-manor",
  },
];

// ─── Constants ────────────────────────────────────────────────
const INTERVAL  = 12000;
const DESKTOP_H = 440;
// MOBILE_H trimmed 2026-05-17 (was 620) to remove the dead band
// below the CTA. Calibrated to fit the tallest card (The Bull —
// 2-line name on ~320px viewports + badge + 4-line description),
// so shorter cards keep ~20-30px breathing at the bottom and
// taller cards still fit within the absolute-positioned slide.
const MOBILE_H  = 540;

// ─── Slide variants ───────────────────────────────────────────
const variants = {
  enter : (d: number) => ({ x: d > 0 ?  72 : -72, opacity: 0, filter: "blur(4px)" }),
  center: {               x: 0,               opacity: 1, filter: "blur(0px)"  },
  exit  : (d: number) => ({ x: d > 0 ? -72 :  72, opacity: 0, filter: "blur(4px)" }),
};
const trans = { duration: 0.44, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] };

// ─── Arrow button ─────────────────────────────────────────────
function ArrowBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/[0.03] flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 flex-shrink-0"
      aria-label={dir === "prev" ? "Previous accommodation" : "Next accommodation"}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {dir === "prev"
          ? <path d="M8.5 1.5 L3.5 6.5 L8.5 11.5" />
          : <path d="M4.5 1.5 L9.5 6.5 L4.5 11.5" />
        }
      </svg>
    </button>
  );
}

// ─── Progress bar ─────────────────────────────────────────────
function ProgressBar({ active }: { active: boolean }) {
  return (
    <div className="w-28 h-px bg-white/10 overflow-hidden rounded-full">
      <motion.div
        className="h-full bg-[#C8A96E] rounded-full origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: active ? INTERVAL / 1000 : 0, ease: "linear" }}
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}

// ─── Gold corner brackets (purely decorative editorial accent) ─
function GoldCorners() {
  const base = "absolute w-4 h-4 pointer-events-none";
  const goldBorder = "border-[#C8A96E]/35";
  return (
    <>
      <span aria-hidden className={`${base} ${goldBorder} top-3 right-3 border-t border-r`} />
      <span aria-hidden className={`${base} ${goldBorder} bottom-3 left-3 border-b border-l`} />
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────
export function NearbyAccommodationSection() {
  const [current, setCurrent] = useState(0);
  const [dir,     setDir]     = useState(0);
  const touchStartX = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  const paginate = useCallback((d: number) => {
    setDir(d);
    setCurrent((c) => (c + d + ACCOMMODATIONS.length) % ACCOMMODATIONS.length);
  }, []);

  const goTo = useCallback((i: number) => {
    setDir(i > current ? 1 : -1);
    setCurrent(i);
  }, [current]);

  // Auto-rotate only when section is in viewport — same rule as
  // WineCollection. Pauses cleanly when user scrolls away.
  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => paginate(1), INTERVAL);
    return () => clearTimeout(t);
  }, [current, paginate, isInView]);

  const a = ACCOMMODATIONS[current];

  return (
    <section
      ref={sectionRef}
      className="bg-[#010101] py-20 md:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">

        {/* ── Header — kicker + headline + body intro ─────────
            Uses the global .reveal class (managed by <RevealInit />
            in layout.tsx) for stagger fade-ups — same pattern as
            the rest of /vineyard-booking.

            `id="nearby-accommodation"` sits HERE on the header wrapper,
            NOT on the <section> — the section's py-28 (112px) top padding
            would otherwise push this kicker ~145px below the fixed navbar
            on landing (see globals.css [id] comment). With the id on the
            header, the global [id] scroll-margin-top (80/110px) lands the
            "Where to Stay" kicker compactly just under the navbar. */}
        <div id="nearby-accommodation" className="mb-12 md:mb-16 max-w-[760px]">
          <div className="reveal" style={{ transitionDelay: "0.05s" }}>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-5"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
            >
              [ Where to Stay &middot; South Downs ]
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <h2
              className="font-display italic text-white leading-[1.08] mb-6"
              style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}
            >
              Linger in the <span className="text-[#C8A96E]">South Downs.</span>
            </h2>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.25s" }}>
            <p
              className="font-body text-white/60 leading-relaxed"
              style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 400 }}
            >
              Six places to rest your head within a short drive of the estate &mdash;
              from luxury spa hotels and historic seafront landmarks to
              award-winning pubs with rooms.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            DESKTOP CAROUSEL
        ══════════════════════════════════════════════════════ */}
        <div
          className="hidden md:block relative rounded-xl overflow-hidden"
          style={{ height: DESKTOP_H }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={trans}
              className="absolute inset-0 bg-[#0d0d0d] border border-white/[0.08] hover:border-white/[0.12] transition-colors duration-500 group"
            >
              <div className="grid grid-cols-[6fr_6fr] h-full">

                {/* Left: kicker · name · description · badge · CTA */}
                <div className="flex flex-col justify-center px-10 lg:px-14 py-10">
                  <motion.p
                    key={`kicker-${current}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="font-display italic text-[#C8A96E] tracking-widest mb-4"
                    style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
                  >
                    [ {a.kicker} ]
                  </motion.p>
                  <motion.h3
                    key={`name-${current}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="font-display italic text-cream mb-6 leading-[1.05]"
                    style={{ fontSize: "clamp(24px, 2.4vw, 40px)", fontWeight: 400 }}
                  >
                    {a.name}
                  </motion.h3>
                  <motion.p
                    key={`desc-${current}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="font-body text-white/65 leading-relaxed mb-4"
                    style={{
                      fontSize: "clamp(13px, 1.3vw, 15px)",
                      fontWeight: 400,
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      maxWidth: "440px",
                    }}
                  >
                    {a.description}
                  </motion.p>
                  {a.badge && (
                    <motion.p
                      key={`badge-${current}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="font-body text-[#C8A96E] tracking-[0.18em] uppercase mb-4"
                      style={{ fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 400 }}
                    >
                      &mdash; {a.badge}
                    </motion.p>
                  )}
                  <motion.div
                    key={`cta-${current}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.25 }}
                  >
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cta w-fit"
                      aria-label={`Visit ${a.name} (opens in new tab)`}
                    >
                      View Hotel
                    </a>
                  </motion.div>
                </div>

                {/* Right: hero image with gold corner accents */}
                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`img-${current}`}
                      initial={{ scale: 1.04, opacity: 0 }}
                      animate={{ scale: 1,    opacity: 1 }}
                      exit   ={{ scale: 1,    opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute inset-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${basePath}${a.image}`}
                        alt={`${a.name} — exterior`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                      />
                      {/* Subtle bottom-fade so any future caption stays readable */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>
                  <GoldCorners />
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════════════════════════
            MOBILE CAROUSEL
        ══════════════════════════════════════════════════════ */}
        <div
          className="md:hidden relative rounded-xl overflow-hidden"
          style={{ height: MOBILE_H }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const delta = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 45) paginate(delta > 0 ? 1 : -1);
          }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`m-${current}`}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={trans}
              className="absolute inset-0 bg-[#0d0d0d] border border-white/[0.08] flex flex-col overflow-hidden"
            >
              {/* Image (top, fixed height) */}
              <div className="relative w-full h-[240px] flex-shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}${a.image}`}
                  alt={`${a.name} — exterior`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <GoldCorners />
              </div>

              {/* Content stack */}
              <div className="flex-1 flex flex-col px-6 pt-5 pb-5">
                <p
                  className="font-display italic text-[#C8A96E] tracking-widest mb-2"
                  style={{ fontSize: "12px" }}
                >
                  [ {a.kicker} ]
                </p>
                <h3
                  className="font-display italic text-cream leading-tight mb-3"
                  style={{ fontSize: "clamp(24px, 6.5vw, 30px)", fontWeight: 400 }}
                >
                  {a.name}
                </h3>
                <p
                  className="font-body text-white/65 leading-relaxed mb-3"
                  style={{
                    fontSize: "13px",
                    fontWeight: 400,
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {a.description}
                </p>
                {a.badge && (
                  <p
                    className="font-body text-[#C8A96E] tracking-[0.18em] uppercase mb-3"
                    style={{ fontSize: "10px", fontWeight: 400 }}
                  >
                    &mdash; {a.badge}
                  </p>
                )}
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta self-start text-center"
                  aria-label={`Visit ${a.name} (opens in new tab)`}
                >
                  View Hotel
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════════════════════════
            CONTROLS BAR — prev/counter/next | dots
            The center "Plan your visit" CTA was removed 2026-05-17.
            It was a primary-weight btn-cta pointing to a same-page
            anchor immediately below — wrong hierarchy (competed with
            the per-card "View Hotel" external CTAs and inflated the
            visual weight of a 50px scroll). Section now ends cleanly
            on dots; natural scroll handles the PracticalInfo handoff.
        ══════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between mt-5 gap-4">
          <div className="flex items-center gap-3">
            <ArrowBtn dir="prev" onClick={() => paginate(-1)} />
            <span className="font-body text-white/35 text-xs tracking-[0.2em] min-w-[38px] text-center select-none">
              {String(current + 1).padStart(2, "0")} / {String(ACCOMMODATIONS.length).padStart(2, "0")}
            </span>
            <ArrowBtn dir="next" onClick={() => paginate(1)} />
          </div>

          <div className="flex items-center gap-1.5">
            {ACCOMMODATIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Accommodation ${i + 1}`}
                className="rounded-full transition-all duration-300 flex-shrink-0"
                style={{
                  width : i === current ? 20 : 5,
                  height: 5,
                  backgroundColor: i === current
                    ? "#C8A96E"
                    : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Desktop-only progress bar (under the carousel, far right) */}
        <div className="hidden md:flex justify-end mt-3">
          <ProgressBar key={current} active={isInView} />
        </div>

      </div>
    </section>
  );
}
