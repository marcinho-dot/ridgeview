"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArticleCard } from "./ArticleCard";
import type { Article, CategoryMeta } from "@/data/articles";

/**
 * Single category accordion entry on the /beyond-the-bottle/ hub.
 *
 * Controlled component: the parent (`BeyondHubPage`) owns the
 * "which one is open" state so we get a clean single-open behaviour
 * across all 7 accordions. When `isOpen` flips true, the article-grid
 * expands with a height: 0 → auto transition; when false, it collapses
 * back. Same easing curve as the SKU page FAQ accordion for site-wide
 * consistency.
 *
 * Wrapper section carries `id={category.slug}` so a deep-link such as
 * /beyond-the-bottle/#wines anchors to the right accordion. The
 * `scrollMarginTop` matches the value used by /booking#visit so the
 * fixed milk-glass navbar never overlaps the accordion title on land.
 */

interface Props {
  category: CategoryMeta;
  articles: Article[];           // already pre-filtered for this category
  isOpen: boolean;
  onToggle: () => void;
}

export function ArticleAccordion({ category, articles, isOpen, onToggle }: Props) {
  return (
    <section
      id={category.slug}
      className="border-b border-white/[0.07] last:border-0"
      style={{ scrollMarginTop: "110px" }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${category.slug}-panel`}
        className="w-full flex items-center justify-between gap-6 py-7 md:py-9 group text-left"
      >
        {/* Left: kicker + label */}
        <div className="flex-1 min-w-0">
          <p
            className="font-body text-[#C8A96E]/70 group-hover:text-[#C8A96E] uppercase tracking-[0.24em] mb-2 transition-colors duration-400"
            style={{ fontSize: "10px" }}
          >
            [ {articles.length} {articles.length === 1 ? "story" : "stories"} ]
          </p>
          <h2
            className={`font-display italic transition-colors duration-400 leading-[1.05] ${
              isOpen ? "text-[#C8A96E]" : "text-cream group-hover:text-white"
            }`}
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 400,
            }}
          >
            {category.label}
          </h2>
        </div>

        {/* Right: rotating "+" indicator — gold etched-crystal circle */}
        <span
          aria-hidden
          className={`flex-shrink-0 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border transition-all duration-500 ${
            isOpen
              ? "border-[#C8A96E]/80 bg-[#C8A96E]/[0.12] rotate-45"
              : "border-white/20 group-hover:border-[#C8A96E]/50"
          }`}
        >
          <span
            className={`text-[20px] md:text-[22px] leading-none transition-colors duration-400 ${
              isOpen ? "text-[#C8A96E]" : "text-white/55"
            }`}
          >
            +
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${category.slug}-panel`}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-12 md:pb-16">
              {/* Optional category blurb above the grid */}
              <p
                className="font-body italic text-white/55 leading-relaxed mb-10 md:mb-14 max-w-[640px]"
                style={{
                  fontSize: "clamp(14px, 1.3vw, 16px)",
                  fontWeight: 300,
                }}
              >
                {category.blurb}
              </p>

              {/* Article grid — newest first */}
              {articles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-14">
                  {articles.map((article, i) => (
                    <ArticleCard key={article.slug} article={article} index={i} />
                  ))}
                </div>
              ) : (
                <p
                  className="font-body italic text-white/40"
                  style={{ fontSize: "14px" }}
                >
                  No stories in this category yet — check back soon.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
