"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";

/* ─────────────────────────────────────────────────────────────────────────
   Hook: useCanHover() — true on devices with a real pointer (mouse/trackpad).
   False on touch-only devices, so hover-to-open won't fire on tap.
───────────────────────────────────────────────────────────────────────── */
function useCanHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover)");
    setCanHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return canHover;
}

/* ─────────────────────────────────────────────────────────────────────────
   Blog data — all content verified from ridgeview.co.uk
   Sorted newest-first by sitemap lastmod date
───────────────────────────────────────────────────────────────────────── */

const posts = [
  {
    category: "Vineyard",
    title: "South Lodge\u2019s Maiden Vintage",
    date: "Sep 2025",
    excerpt:
      "Clusters of grapes, now ripe for the picking, hang on the vines at South Lodge \u2013 Sussex\u2019s renowned luxury country house hotel.",
    image: `${basePath}/images/blog/south-lodge.jpg`,
    href: "https://www.ridgeview.co.uk/news/south-lodge-vineyard-harvest-2025/",
  },
  {
    category: "Sustainability",
    title: "Ridgeview\u2019s 2025 B Corp Impact Report",
    date: "Nov 2025",
    excerpt:
      "Now in our third year as a certified B Corporation, we\u2019re proud of our progress and clear-eyed about the sustainability challenges that remain.",
    image: `${basePath}/images/blog/b-corp-2025.jpg`,
    href: "https://www.ridgeview.co.uk/news/b-corp-impact-report-2025/",
  },
  {
    category: "Vineyard",
    title: "Harvest 2025: A Dream Year in the Vines",
    date: "Sep 2025",
    excerpt:
      "There\u2019s a unique energy in the vineyard as harvest draws near. The rows are heavy with fruit, the air alive with anticipation.",
    image: `${basePath}/images/blog/harvest-2025.jpg`,
    href: "https://www.ridgeview.co.uk/news/harvest-vintage-2025/",
  },
  {
    category: "Experiences",
    title: "Your Guide to Visiting an English Vineyard",
    date: "Jul 2025",
    excerpt:
      "World-class wine experiences are now much closer to home. England\u2019s thriving wine scene is full of beautiful vineyards, award-winning wines, and welcoming experiences.",
    image: `${basePath}/images/blog/visiting-vineyard.jpg`,
    href: "https://www.ridgeview.co.uk/news/vineyard-experiences-a-place-for-everyone/",
  },
  {
    category: "Knowledge",
    title: "Wine Wisdom",
    date: "Feb 2025",
    excerpt:
      "Whether you\u2019re just getting started on your wine journey or looking to learn more, our engaging wine guides are designed to deepen your personal wine wisdom.",
    image: `${basePath}/images/blog/wine-wisdom.jpg`,
    href: "https://www.ridgeview.co.uk/news/wine-wisdom/",
  },
  {
    category: "Entertaining",
    title: "Wine for the Moments That Make Christmas Yours",
    date: "Nov 2025",
    excerpt:
      "Christmas lives in the small, special moments \u2013 the little habits that became rituals we return to year after year.",
    image: `${basePath}/images/blog/christmas-pairings.jpg`,
    href: "https://www.ridgeview.co.uk/news/christmas-sparkling-wine-pairings/",
  },
  {
    category: "Estate Life",
    title: "Winter in the Vineyard",
    date: "Jan 2026",
    excerpt:
      "As we settle into a new year, the exciting possibilities of fresh beginnings, change and growth are all around us. Nowhere is this felt more keenly than in the vineyard.",
    image: `${basePath}/images/blog/winter-vineyard.jpg`,
    href: "https://www.ridgeview.co.uk/news/winter-in-the-vineyard/",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Desktop: Interactive Accordion Panels
───────────────────────────────────────────────────────────────────────── */

function AccordionPanels() {
  // Initial null → every panel collapsed (equal width). Click toggles.
  // Hover still opens on devices that support it; leaving the strip
  // collapses everything back so we don't leave a panel stuck open
  // after the cursor has moved away.
  const [active, setActive] = useState<number | null>(null);
  const canHover = useCanHover();

  return (
    <div
      className="hidden md:flex gap-2 h-[480px] lg:h-[540px]"
      onMouseLeave={canHover ? () => setActive(null) : undefined}
    >
      {posts.map((post, i) => {
        const isActive = active === i;

        return (
          <motion.div
            key={post.title}
            className="reveal relative overflow-hidden rounded-lg cursor-pointer"
            initial={false}
            animate={{ flex: isActive ? 6 : 1 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ transitionDelay: `${0.05 + i * 0.10}s` }}
            onClick={() => setActive((prev) => (prev === i ? null : i))}
            onMouseEnter={canHover ? () => setActive(i) : undefined}
          >
            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Base overlay — darker when collapsed */}
            <div
              className="absolute inset-0 transition-colors duration-500"
              style={{
                backgroundColor: isActive
                  ? "rgba(0,0,0,0.05)"
                  : "rgba(0,0,0,0.25)",
              }}
            />

            {/* Gradient overlay — active panel only */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            )}

            {/* Collapsed: vertical category label */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className="font-body uppercase text-[#E5C896] whitespace-nowrap"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      fontSize: "clamp(14px, 1.25vw, 18px)",
                      fontWeight: 500,
                      letterSpacing: "0.32em",
                      textShadow:
                        "0 1px 12px rgba(0,0,0,0.95), 0 0 24px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.9)",
                    }}
                  >
                    {post.category}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active: full content overlay */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end px-8 lg:px-10 pb-8 lg:pb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  {/* Category */}
                  <p
                    className="font-body text-[#E5C896] uppercase mb-3"
                    style={{
                      fontSize: "clamp(11px, 1vw, 13px)",
                      fontWeight: 500,
                      letterSpacing: "0.24em",
                      textShadow: "0 1px 8px rgba(0,0,0,0.85)",
                    }}
                  >
                    {post.category}
                  </p>

                  {/* Date */}
                  <p
                    className="font-body text-white/55 uppercase mb-2"
                    style={{
                      fontSize: "clamp(10px, 0.9vw, 12px)",
                      letterSpacing: "0.18em",
                      fontWeight: 400,
                      textShadow: "0 1px 6px rgba(0,0,0,0.85)",
                    }}
                  >
                    {post.date}
                  </p>

                  {/* Title */}
                  <h3
                    className="font-display italic text-cream mb-4"
                    style={{
                      fontSize: "clamp(22px, 2.4vw, 34px)",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      maxWidth: "520px",
                      textShadow:
                        "0 2px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.85)",
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className="font-body text-white/80 leading-relaxed mb-6"
                    style={{
                      fontSize: "clamp(13px, 1.15vw, 16px)",
                      fontWeight: 400,
                      maxWidth: "480px",
                      textShadow:
                        "0 1px 10px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.85)",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 font-body text-[#E5C896] uppercase hover:text-cream transition-colors duration-300"
                    style={{
                      fontSize: "clamp(11px, 1vw, 13px)",
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      textShadow: "0 1px 8px rgba(0,0,0,0.85)",
                    }}
                  >
                    Read More
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Mobile: Vertical Accordion
───────────────────────────────────────────────────────────────────────── */

function MobileAccordion() {
  // Initial null → every row collapsed. Click on a header toggles open/close.
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visiblePosts = showAll ? posts : posts.slice(0, 4);

  return (
    <div className="md:hidden flex flex-col gap-1.5">
      {visiblePosts.map((post, i) => {
        const isActive = active === i;

        return (
          <motion.div
            key={post.title}
            layout
            className="reveal relative overflow-hidden rounded-lg cursor-pointer"
            initial={false}
            animate={{ height: isActive ? 320 : 52 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ transitionDelay: `${0.05 + i * 0.10}s` }}
            onClick={() => setActive((prev) => (prev === i ? null : i))}
          >
            {/* Image — always present */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 transition-colors duration-500"
              style={{
                backgroundColor: isActive
                  ? "rgba(0,0,0,0.05)"
                  : "rgba(0,0,0,0.25)",
              }}
            />

            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            )}

            {/* Collapsed: horizontal bar with category + title */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  className="absolute inset-0 flex items-center px-5 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <span
                    className="font-body text-[#E5C896] uppercase shrink-0"
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      minWidth: "92px",
                      textShadow: "0 1px 6px rgba(0,0,0,0.85)",
                    }}
                  >
                    {post.category}
                  </span>
                  <span
                    className="font-display italic text-white/85 truncate"
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      textShadow: "0 1px 8px rgba(0,0,0,0.85)",
                    }}
                  >
                    {post.title}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-white/25 shrink-0 ml-auto"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active: full content overlay */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end px-5 pb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  {/* Category */}
                  <p
                    className="font-body text-[#E5C896] uppercase mb-2"
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.24em",
                      textShadow: "0 1px 8px rgba(0,0,0,0.85)",
                    }}
                  >
                    {post.category}
                  </p>

                  {/* Date */}
                  <p
                    className="font-body text-white/55 uppercase mb-2"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      fontWeight: 400,
                      textShadow: "0 1px 6px rgba(0,0,0,0.85)",
                    }}
                  >
                    {post.date}
                  </p>

                  {/* Title */}
                  <h3
                    className="font-display italic text-cream mb-3"
                    style={{
                      fontSize: "24px",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      textShadow:
                        "0 2px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.85)",
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className="font-body text-white/80 leading-relaxed mb-4"
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      textShadow:
                        "0 1px 10px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.85)",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 font-body text-[#E5C896] uppercase"
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      textShadow: "0 1px 8px rgba(0,0,0,0.85)",
                    }}
                  >
                    Read More
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Elegant expand/collapse toggle */}
      <motion.button
        className="group mt-6 w-full flex items-center gap-4 cursor-pointer"
        onClick={() => {
          if (showAll) setActive(null);
          setShowAll(!showAll);
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Left line */}
        <div className="flex-1 h-px bg-white/[0.06] group-hover:bg-[#C8A96E]/20 transition-colors duration-500" />

        {/* Label + chevron */}
        <span className="flex items-center gap-2 font-body text-white/30 group-hover:text-[#C8A96E]/70 transition-colors duration-300 uppercase tracking-[0.25em]"
          style={{ fontSize: "9px", fontWeight: 400 }}
        >
          {showAll ? "Less" : "More Stories"}
          <motion.svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-40 group-hover:opacity-70 transition-opacity duration-300"
            animate={{ rotate: showAll ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </span>

        {/* Right line */}
        <div className="flex-1 h-px bg-white/[0.06] group-hover:bg-[#C8A96E]/20 transition-colors duration-500" />
      </motion.button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BlogSection — main export
───────────────────────────────────────────────────────────────────────── */

export function BlogSection() {
  return (
    <section id="journal" className="relative z-[1] bg-[#010101] py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Section Header — uses .reveal (mn-fx-style: fade + 28px slide + blur 6px, 0.9s cubic-bezier(.2,.7,.2,1)) */}
        <div className="reveal mb-6 md:mb-8">
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-4"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            [ News from the Estate ]
          </p>
          <h2
            className="font-display italic text-cream"
            style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Beyond the Bottle
          </h2>
        </div>

        {/* Desktop: Accordion Panels — each panel reveals individually with stagger */}
        <AccordionPanels />

        {/* Mobile: Vertical Accordion — each item reveals individually with stagger */}
        <MobileAccordion />
      </div>
    </section>
  );
}
