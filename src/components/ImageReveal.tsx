"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";
import { SubstackForm } from "@/components/SubstackForm";

/* ── SVG Icons ─────────────────────────────────────────────────────── */

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── Gallery images data ───────────────────────────────────────────── */

const galleryImages = [
  { src: "gallery-2.jpg", alt: "Ridgeview vineyard rows stretching to the South Downs" },
  { src: "gallery-4.jpg", alt: "A walk through the Ridgeview vineyard, South Downs in the distance" },
  { src: "gallery-1.jpg", alt: "Ridgeview restaurant pavilion seen from the garden with vineyard backdrop" },
  { src: "gallery-5.jpg", alt: "Ridgeview restaurant pavilion and covered terrace seating" },
  // 2026-05-18 (later): user swapped the last two slots — wide
  // aerial overview now lands at slot 5 (z-20), golden-hour
  // pavilion-interior closer to the right edge (slot 6, z-10).
  { src: "gallery-6.jpg", alt: "Aerial overview of the Ridgeview pavilion with vineyard and South Downs beyond" },
  { src: "gallery-3.jpg", alt: "Ridgeview Estate restaurant pavilion overlooking the vineyard at golden hour" },
];

/* ── Social links ──────────────────────────────────────────────────── */

// Social profile URLs verified against the live UK site
// (ridgeview.co.uk footer, 2026-05-26). All four UK handles use
// the `ridgeviewwineuk` suffix — the older un-suffixed handles we
// were pointing to previously were inactive accounts, which CEO
// feedback flagged as "Social links not active" (Gregg, item Home
// #5, 2026-05-18). LinkedIn was even returning 404.
//
// X (Twitter) added 2026-05-26 per Salvatore — UK has the profile
// (@RidgeviewWineUK, 9.9k followers, joined Jan 2012, active).
const socials = [
  { name: "Instagram", icon: IconInstagram, href: "https://www.instagram.com/ridgeviewwineuk/" },
  { name: "LinkedIn", icon: IconLinkedIn, href: "https://www.linkedin.com/company/ridgeviewwineuk" },
  { name: "Facebook", icon: IconFacebook, href: "https://www.facebook.com/Ridgeviewwineuk" },
  { name: "X", icon: IconX, href: "https://x.com/RidgeviewWineUK" },
];

/* ── Lightbox ──────────────────────────────────────────────────────── */

function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef<number | null>(null);
  const touchDelta = useRef(0);

  const goNext = () => {
    if (current < images.length - 1) {
      setDirection(1);
      setCurrent((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((i) => i - 1);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, current]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    touchDelta.current = e.touches[0].clientX - touchStart.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) {
      if (touchDelta.current < 0) goNext();
      else goPrev();
    }
    touchStart.current = null;
    touchDelta.current = 0;
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Prev arrow */}
      <button
        className={`absolute left-3 md:left-6 z-20 w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-300 ${
          current > 0
            ? "border-white/25 text-white/60 hover:text-white hover:border-white/50 cursor-pointer"
            : "border-white/10 text-white/15 cursor-default"
        }`}
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        aria-label="Previous"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        className={`absolute right-3 md:right-6 z-20 w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-300 ${
          current < images.length - 1
            ? "border-white/25 text-white/60 hover:text-white hover:border-white/50 cursor-pointer"
            : "border-white/10 text-white/15 cursor-default"
        }`}
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        aria-label="Next"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image with slide animation */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          className="relative max-w-[85vw] md:max-w-[75vw] max-h-[80vh]"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[current].src}
            alt={images[current].alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-[#C8A96E] w-4" : "bg-white/25"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main Component ────────────────────────────────────────────────── */

export function ImageRevealSection() {
  const ref = useRef<HTMLDivElement>(null);
  // Exception: this section animates EVERY time the user scrolls into it
  // (egal ob von oben oder unten). once:false + higher amount delays the
  // trigger until the section is more visible.
  // margin: shrinks the viewport bottom by 100px so the cards have to clear
  // the mobile BottomNav (≈80px tall) before the entrance animation fires -
  // otherwise the cards would appear behind the sticky bar.
  const inView = useInView(ref, {
    once: false,
    amount: 0.55,
    margin: "0px 0px -100px 0px",
  });
  const [mobile, setMobile] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxImages = galleryImages.map((img) => ({
    src: `${basePath}/images/${img.src}`,
    alt: img.alt,
  }));

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const imgSize = mobile ? 155 : 300;
  // 6-card fan layout (2026-05-18 — was 5 cards). Symmetric — three
  // cards on each side, no centre slot.
  //
  // Mobile outer spread further reduced (was ±125, now ±95) — user
  // reported the cards still clipped past the viewport edge on
  // 375px phones because the bounding box of an 11°-rotated 155px
  // card is ~180px wide, so 125 + 90 = 215 from centre easily
  // overshoots a 187.5px half-viewport. At ±95 + ~90 rotation
  // extent = ~185 from centre, leaving ~2-5px breathing on each
  // side at 375vw. Inner cards scaled down proportionally.
  // Desktop spread unchanged.
  const xL3 = mobile ? -95 : -440;
  const xL2 = mobile ? -58 : -260;
  const xL1 = mobile ? -20 : -90;
  const xR1 = mobile ? 20  : 90;
  const xR2 = mobile ? 58  : 260;
  const xR3 = mobile ? 95  : 440;

  const spring = { type: "spring" as const, stiffness: 120, damping: 12 };

  const positions = [
    { rotate: -11, x: xL3, y: 18, z: 60, delay: 0,    hoverRotate: -3, hoverX: xL3 - 8, hoverY: 6 },
    { rotate: -6,  x: xL2, y: -4, z: 50, delay: 0.08, hoverRotate: -1, hoverX: xL2,     hoverY: -14 },
    { rotate: -2,  x: xL1, y:  2, z: 40, delay: 0.16, hoverRotate: 0,  hoverX: xL1,     hoverY: -10 },
    { rotate:  3,  x: xR1, y: -2, z: 30, delay: 0.24, hoverRotate: 0,  hoverX: xR1,     hoverY: -12 },
    { rotate:  7,  x: xR2, y:  6, z: 20, delay: 0.32, hoverRotate: 2,  hoverX: xR2,     hoverY: -6 },
    { rotate: -5,  x: xR3, y: 22, z: 10, delay: 0.40, hoverRotate: 1,  hoverX: xR3 + 8, hoverY: 10 },
  ];

  return (
    <>
      <section className="relative z-10 overflow-visible">
        {/* ── Image Gallery ─────────────────────────────────────── */}
        <div
          ref={ref}
          className="relative mx-auto flex items-center justify-center"
          style={{ height: mobile ? 230 : 500, marginTop: mobile ? -40 : -60 }}
        >
          {galleryImages.map((img, i) => {
            const pos = positions[i];
            return (
              <motion.div
                key={img.src}
                className="group absolute overflow-hidden rounded-xl shadow-lg cursor-pointer"
                style={{
                  width: imgSize,
                  height: imgSize,
                  zIndex: pos.z,
                  background: "#1a1a1a",
                }}
                initial={{ rotate: 0, x: 0, y: 0, opacity: 0 }}
                animate={
                  inView
                    ? { rotate: pos.rotate, x: pos.x, y: pos.y, opacity: 1 }
                    : {}
                }
                whileHover={{
                  rotate: pos.hoverRotate,
                  x: pos.hoverX,
                  y: pos.hoverY,
                  scale: 1.05,
                }}
                transition={{ ...spring, delay: pos.delay }}
                onClick={() => setLightboxIndex(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}/images/${img.src}`}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
                {/* Subtle darkening layer */}
                <div className="absolute inset-0 bg-black/15" />
              </motion.div>
            );
          })}
        </div>

        {/* ── Social & Newsletter ───────────────────────────────── */}
        <div className="max-w-[520px] mx-auto px-6 pb-16 md:pb-20">
          {/* Social Icons — clickable links to Ridgeview's social
              profiles. Previously these were `<div>` elements with
              cursor-pointer but no href (the visual cue suggested
              they were links but clicking did nothing). Fixed
              2026-05-26 per CEO approval feedback (Gregg, item
              Home #5: "Social links not active"). */}
          <div className="flex items-center justify-center gap-5 mb-6">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ridgeview on ${s.name}`}
                className="group/icon relative w-12 h-12 flex items-center justify-center rounded-full border border-white/15 hover:border-[#C8A96E]/40 transition-all duration-300"
              >
                <s.icon className="w-[22px] h-[22px] text-white/45 group-hover/icon:text-[#C8A96E] transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* Substack Email Input - extracted to <SubstackForm /> 2026-05-17
              so the same form (with bumped contrast) can be reused on
              the /beyond-the-bottle PageHero. */}
          <SubstackForm />
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={lightboxImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
