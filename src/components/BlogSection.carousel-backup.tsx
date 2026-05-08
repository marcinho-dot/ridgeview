"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";

/* ─────────────────────────────────────────────────────────────────────────
   Blog data — all content verified from ridgeview.co.uk
   Sorted newest-first by sitemap lastmod date
───────────────────────────────────────────────────────────────────────── */

const posts = [
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
    title: "South Lodge\u2019s Maiden Vintage",
    date: "Sep 2025",
    excerpt:
      "Clusters of grapes, now ripe for the picking, hang on the vines at South Lodge \u2013 Sussex\u2019s renowned luxury country house hotel.",
    image: `${basePath}/images/blog/south-lodge.jpg`,
    href: "https://www.ridgeview.co.uk/news/south-lodge-vineyard-harvest-2025/",
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
   Mobile: Horizontal Scroll Carousel
───────────────────────────────────────────────────────────────────────── */

function MobileCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth =
      el.querySelector("article")?.parentElement?.offsetWidth || 300;
    const gap = 20;
    el.scrollBy({
      left: dir === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <div className="md:hidden">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {posts.map((post) => (
          <div
            key={post.title}
            className="snap-start shrink-0"
            style={{ width: "clamp(280px, 78vw, 340px)" }}
          >
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <article className="group cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden mb-4 relative rounded-lg">
                  {/* Date badge */}
                  <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-sm">
                    <span
                      className="font-body text-white/60 uppercase"
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.12em",
                        fontWeight: 300,
                      }}
                    >
                      {post.date}
                    </span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Category */}
                <p
                  className="font-body text-[#C8A96E] uppercase mb-2"
                  style={{
                    fontSize: "10px",
                    fontWeight: 400,
                    letterSpacing: "0.2em",
                  }}
                >
                  {post.category}
                </p>

                {/* Title */}
                <h3
                  className="font-display italic text-cream mb-2 group-hover:text-[#C8A96E] transition-colors duration-300"
                  style={{
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: 1.25,
                  }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p
                  className="font-body text-white/45 leading-relaxed mb-4 flex-1"
                  style={{ fontSize: "12px", fontWeight: 300 }}
                >
                  {post.excerpt}
                </p>

                {/* Read More */}
                <div className="mt-auto">
                  <span
                    className="font-body text-[#C8A96E]/70 uppercase inline-flex items-center gap-2 group-hover:text-[#C8A96E] transition-colors duration-300"
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
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </article>
            </a>
          </div>
        ))}
      </div>

      {/* Arrow Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
            !canScrollLeft
              ? "border-white/[0.06] text-white/15 cursor-default"
              : "border-white/20 text-white/60 hover:border-[#C8A96E]/50 hover:text-[#C8A96E] cursor-pointer"
          }`}
          aria-label="Previous"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
            !canScrollRight
              ? "border-white/[0.06] text-white/15 cursor-default"
              : "border-white/20 text-white/60 hover:border-[#C8A96E]/50 hover:text-[#C8A96E] cursor-pointer"
          }`}
          aria-label="Next"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BlogSection — main export
───────────────────────────────────────────────────────────────────────── */

export function BlogSection() {
  return (
    <section id="journal" className="bg-[#010101] py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-4"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            [ From the Estate ]
          </p>
          <h2
            className="font-display italic text-cream"
            style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            The Journal
          </h2>
        </motion.div>

        {/* Desktop: Accordion Panels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <AccordionPanels />
        </motion.div>

        {/* Mobile: Horizontal Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <MobileCarousel />
        </motion.div>
      </div>
    </section>
  );
}
