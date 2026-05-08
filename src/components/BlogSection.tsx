"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";

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
  const [active, setActive] = useState(0);

  return (
    <div className="hidden md:flex gap-2 h-[480px] lg:h-[540px]">
      {posts.map((post, i) => {
        const isActive = active === i;

        return (
          <motion.div
            key={post.title}
            className="relative overflow-hidden rounded-lg cursor-pointer"
            animate={{ flex: isActive ? 6 : 1 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            onClick={() => setActive(i)}
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
                  ? "rgba(0,0,0,0.35)"
                  : "rgba(0,0,0,0.75)",
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
                    className="font-display italic text-[#C8A96E] tracking-widest whitespace-nowrap"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      fontSize: "clamp(12px, 1.1vw, 15px)",
                      textShadow: "0 1px 8px rgba(0,0,0,0.9)",
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
                    className="font-body text-[#C8A96E] uppercase mb-3"
                    style={{
                      fontSize: "clamp(9px, 0.85vw, 11px)",
                      fontWeight: 400,
                      letterSpacing: "0.2em",
                    }}
                  >
                    {post.category}
                  </p>

                  {/* Date */}
                  <p
                    className="font-body text-white/35 uppercase mb-2"
                    style={{
                      fontSize: "clamp(9px, 0.8vw, 10px)",
                      letterSpacing: "0.15em",
                      fontWeight: 300,
                    }}
                  >
                    {post.date}
                  </p>

                  {/* Title */}
                  <h3
                    className="font-display italic text-cream mb-3"
                    style={{
                      fontSize: "clamp(20px, 2vw, 28px)",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      maxWidth: "480px",
                      textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className="font-body text-white/55 leading-relaxed mb-5"
                    style={{
                      fontSize: "clamp(12px, 1vw, 14px)",
                      fontWeight: 300,
                      maxWidth: "440px",
                      textShadow: "0 1px 6px rgba(0,0,0,0.6)",
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
                    className="inline-flex items-center gap-2 font-body text-[#C8A96E]/70 uppercase hover:text-[#C8A96E] transition-colors duration-300"
                    style={{
                      fontSize: "clamp(9px, 0.85vw, 11px)",
                      fontWeight: 400,
                      letterSpacing: "0.18em",
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
  const [active, setActive] = useState(0);
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
            className="relative overflow-hidden rounded-lg cursor-pointer"
            animate={{ height: isActive ? 320 : 52 }}
            initial={{ height: 52, opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            onClick={() => setActive(i)}
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
                  ? "rgba(0,0,0,0.35)"
                  : "rgba(0,0,0,0.82)",
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
                    className="font-body text-[#C8A96E] uppercase shrink-0"
                    style={{
                      fontSize: "9px",
                      fontWeight: 400,
                      letterSpacing: "0.18em",
                      minWidth: "80px",
                    }}
                  >
                    {post.category}
                  </span>
                  <span
                    className="font-display italic text-white/60 truncate"
                    style={{ fontSize: "15px", fontWeight: 400 }}
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
                    className="font-body text-[#C8A96E] uppercase mb-1.5"
                    style={{
                      fontSize: "9px",
                      fontWeight: 400,
                      letterSpacing: "0.2em",
                    }}
                  >
                    {post.category}
                  </p>

                  {/* Date */}
                  <p
                    className="font-body text-white/35 uppercase mb-1.5"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      fontWeight: 300,
                    }}
                  >
                    {post.date}
                  </p>

                  {/* Title */}
                  <h3
                    className="font-display italic text-cream mb-2"
                    style={{
                      fontSize: "20px",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className="font-body text-white/55 leading-relaxed mb-4"
                    style={{
                      fontSize: "12px",
                      fontWeight: 300,
                      textShadow: "0 1px 6px rgba(0,0,0,0.6)",
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
                    className="inline-flex items-center gap-2 font-body text-[#C8A96E]/70 uppercase"
                    style={{
                      fontSize: "10px",
                      fontWeight: 400,
                      letterSpacing: "0.18em",
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
          if (showAll) setActive(0);
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
    <section id="journal" className="relative z-[1] bg-[#010101] -mt-[8vh] md:mt-0 pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
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
        </motion.div>

        {/* Desktop: Accordion Panels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <AccordionPanels />
        </motion.div>

        {/* Mobile: Vertical Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <MobileAccordion />
        </motion.div>
      </div>
    </section>
  );
}
