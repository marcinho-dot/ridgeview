"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { wines } from "@/data/wines";
import { basePath } from "@/lib/basePath";

// ─── Constants ────────────────────────────────────────────────
const INTERVAL   = 12000;
const DESKTOP_H  = 440;
const MOBILE_H   = 520;

// ─── Slide variants ───────────────────────────────────────────
const variants = {
  enter : (d: number) => ({ x: d > 0 ?  72 : -72, opacity: 0, filter: "blur(4px)" }),
  center: {               x: 0,               opacity: 1, filter: "blur(0px)"  },
  exit  : (d: number) => ({ x: d > 0 ? -72 :  72, opacity: 0, filter: "blur(4px)" }),
};
const trans = { duration: 0.44, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] };

// ─── Arrow button ─────────────────────────────────────────────
function ArrowBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/[0.03] flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 flex-shrink-0"
      aria-label={dir === "prev" ? "Previous wine" : "Next wine"}
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

// ─── Main Component ───────────────────────────────────────────
export function WineCollectionSection() {
  const [current, setCurrent] = useState(0);
  const [dir,     setDir]     = useState(0);
  const touchStartX = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  const paginate = useCallback((d: number) => {
    setDir(d);
    setCurrent((c) => (c + d + wines.length) % wines.length);
  }, []);

  const goTo = useCallback((i: number) => {
    setDir(i > current ? 1 : -1);
    setCurrent(i);
  }, [current]);

  // Auto-rotate only when section is in viewport
  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => paginate(1), INTERVAL);
    return () => clearTimeout(t);
  }, [current, paginate, isInView]);

  const wine = wines[current];

  return (
    <section
      ref={sectionRef}
      id="wine-collection"
      data-section="wine-collection"
      className="bg-[#010101] py-20 md:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6">

        {/* ── Header row ────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <motion.p
              className="font-display italic text-[#C8A96E] tracking-widest mb-3"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              [ Explore what Sussex tastes like. ]
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display italic text-cream leading-[1.05]"
              style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}
            >
              Our <span className="text-[#C8A96E]">Wine</span> Collection
            </motion.h2>
          </div>
          {/* Counter + progress — desktop only */}
          <div className="hidden md:flex flex-col items-end gap-2 pb-1">
            <span className="font-body text-white/35 text-xs tracking-[0.22em]">
              {String(current + 1).padStart(2, "0")} &nbsp;/&nbsp; {String(wines.length).padStart(2, "0")}
            </span>
            <ProgressBar key={current} active={true} />
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
              className="absolute inset-0 bg-[#0d0d0d] border border-white/[0.08] hover:border-white/[0.12] transition-colors duration-500"
            >
              <div className="grid grid-cols-[1fr_1px_260px_1px_1fr] h-full">

                {/* Left: name · description · price */}
                <div className="flex flex-col justify-center px-10 py-8">
                  <motion.h3
                    key={`name-${current}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="font-display italic text-cream mb-5 leading-[1.05]"
                    style={{ fontSize: "clamp(24px, 2.4vw, 40px)", fontWeight: 400 }}
                  >
                    {wine.name}
                  </motion.h3>
                  <motion.p
                    key={`desc-${current}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="font-body text-white/65 text-[14px] leading-relaxed mb-8"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      maxWidth: "340px",
                    }}
                  >
                    {wine.description}
                  </motion.p>
                  <motion.p
                    key={`price-${current}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                    className="font-display italic text-cream"
                    style={{ fontSize: "clamp(22px, 2.2vw, 34px)", fontWeight: 400 }}
                  >
                    {wine.price}
                  </motion.p>
                </div>

                {/* Divider */}
                <div className="bg-white/[0.06] self-stretch" />

                {/* Center: bottle */}
                <div className="flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`bottle-${current}`}
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1,    opacity: 1 }}
                      exit   ={{ scale: 0.85, opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      style={{ width: 220, height: 220, position: "relative" }}
                    >
                      {/* Gold ring */}
                      <div style={{
                        position: "absolute", inset: -1, borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.02)",
                      }} />
                      {wine.slug ? (
                        <a
                          href={`${basePath}/wine/${wine.slug}`}
                          aria-label={`Shop ${wine.name}`}
                          className="absolute inset-0 block group cursor-pointer"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`${basePath}${wine.image}`}
                            alt={wine.name}
                            className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            style={{
                              position: "absolute",
                              bottom: "8px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              height: "340px",
                              width: "auto",
                              objectFit: "contain",
                            }}
                          />
                        </a>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${basePath}${wine.image}`}
                          alt={wine.name}
                          style={{
                            position: "absolute",
                            bottom: "8px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            height: "340px",
                            width: "auto",
                            objectFit: "contain",
                          }}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Divider */}
                <div className="bg-white/[0.06] self-stretch" />

                {/* Right: vintage · tasting notes · CTA */}
                <div className="flex flex-col justify-center px-10 py-8">
                  <div className="mb-5">
                    <p className="font-body text-white/35 text-[10px] uppercase tracking-[0.25em] mb-1.5">Vintage</p>
                    <p className="font-body text-white/80 text-sm">{wine.vintage}</p>
                  </div>
                  <div className="mb-9">
                    <p className="font-body text-white/35 text-[10px] uppercase tracking-[0.25em] mb-3">Tasting Notes</p>
                    <ul className="space-y-2.5">
                      {wine.tastingNotes.map((note, i) => (
                        <motion.li
                          key={note}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                          className="font-body text-white/75 text-[13px] flex items-center gap-2.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#C8A96E]/55 flex-shrink-0" />
                          {note}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  {wine.slug ? (
                    <a
                      href={`${basePath}/wine/${wine.slug}`}
                      className="btn-cta w-fit"
                    >
                      Shop Bottle
                    </a>
                  ) : (
                    <button className="btn-cta w-fit">
                      Add to Cart
                    </button>
                  )}
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
              className="absolute inset-0 bg-[#0d0d0d] border border-white/[0.08] flex flex-col items-center justify-between px-6 pt-7 pb-6"
            >
              {/* Bottle */}
              <div className="flex flex-col items-center">
                <motion.div
                  key={`mb-${current}`}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1,    opacity: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{ width: 120, height: 120, position: "relative", flexShrink: 0 }}
                >
                  <div style={{
                    position: "absolute", inset: -1, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.02)",
                  }} />
                  {wine.slug ? (
                    <a
                      href={`${basePath}/wine/${wine.slug}`}
                      aria-label={`Shop ${wine.name}`}
                      className="absolute inset-0 block"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${basePath}${wine.image}`}
                        alt={wine.name}
                        style={{
                          position: "absolute",
                          bottom: "4px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          height: "145px",
                          width: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </a>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`${basePath}${wine.image}`}
                      alt={wine.name}
                      style={{
                        position: "absolute",
                        bottom: "4px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        height: "145px",
                        width: "auto",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Name + price */}
              <div className="text-center">
                <h3
                  className="font-display italic text-cream leading-tight mb-1"
                  style={{ fontSize: "clamp(26px, 7vw, 40px)", fontWeight: 400 }}
                >
                  {wine.name}
                </h3>
                <p
                  className="font-display italic text-cream"
                  style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 400 }}
                >
                  {wine.price}
                </p>
              </div>

              {/* Description */}
              <p
                className="font-body text-white/60 text-[14px] leading-relaxed text-center"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {wine.description}
              </p>

              {/* Tasting notes pills */}
              <div className="text-center">
                <p className="font-body text-white/30 text-[10px] uppercase tracking-[0.22em] mb-2">
                  Tasting Notes &middot; {wine.vintage}
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {wine.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="font-body text-white/60 text-[11px] border border-white/[0.08] px-3 py-1 rounded-full"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {wine.slug ? (
                <a
                  href={`${basePath}/wine/${wine.slug}`}
                  className="btn-cta"
                >
                  Shop Bottle
                </a>
              ) : (
                <button className="btn-cta">
                  Add to Cart
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════════════════════════
            CONTROLS BAR
        ══════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between mt-5 gap-4">
          <div className="flex items-center gap-3">
            <ArrowBtn dir="prev" onClick={() => paginate(-1)} />
            <span className="font-body text-white/35 text-xs tracking-[0.2em] min-w-[38px] text-center select-none">
              {String(current + 1).padStart(2, "0")} / {String(wines.length).padStart(2, "0")}
            </span>
            <ArrowBtn dir="next" onClick={() => paginate(1)} />
          </div>

          <div className="flex items-center gap-1.5">
            {wines.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Wine ${i + 1}`}
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

          {/* TODO: href → /shop when shop page exists */}
          <a
            href="#wine-collection"
            className="font-body text-white/50 hover:text-white text-[10px] uppercase tracking-[0.22em] border border-white/12 hover:border-white/35 px-5 py-2.5 rounded-sm transition-all duration-300"
          >
            View All Wines
          </a>
        </div>

      </div>
    </section>
  );
}
