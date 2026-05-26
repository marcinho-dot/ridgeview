"use client";

import { motion } from "framer-motion";
import { basePath } from "@/lib/basePath";
import type { Article } from "@/data/articles";

/**
 * Single article preview card. Used inside category accordions on the
 * /beyond-the-bottle/ hub and (Phase 4) on article detail pages as a
 * "related articles" tile.
 *
 * Click → /beyond-the-bottle/<slug>/  (Phase 4 route - for now a 404
 * placeholder is acceptable since Phase 2 is skeleton only).
 */

interface Props {
  article: Article;
  /** Stagger index inside the parent grid for entrance animation. */
  index?: number;
}

export function ArticleCard({ article, index = 0 }: Props) {
  const dateLabel = formatDate(article.date);

  return (
    <motion.a
      href={`${basePath}/beyond-the-bottle/${article.slug}/`}
      className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]/40 rounded-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: 0.05 + (index % 3) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Image stage - dark frame, subtle gold radial atmosphere */}
      <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-[#0a0a0a] rounded-sm">
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 70%)",
          }}
        />
        {article.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${basePath}${article.heroImage}`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20 font-display italic text-[18px]">
            Ridgeview
          </div>
        )}
        {/* Gold hairline that fades in on hover */}
        <div
          aria-hidden
          className="absolute inset-x-4 bottom-3 h-px bg-[#C8A96E]/0 group-hover:bg-[#C8A96E]/60 transition-colors duration-500 z-10"
        />
      </div>

      {/* Date label */}
      <p
        className="font-body text-[#C8A96E]/70 group-hover:text-[#C8A96E] uppercase tracking-[0.24em] mb-2 transition-colors duration-400"
        style={{ fontSize: "10px" }}
      >
        {dateLabel}
      </p>

      {/* Title */}
      <h3
        className="font-display italic text-cream group-hover:text-white leading-[1.15] mb-2 transition-colors duration-400"
        style={{
          fontSize: "clamp(18px, 1.6vw, 22px)",
          fontWeight: 400,
        }}
      >
        {article.title}
      </h3>

      {/* Excerpt - truncated to 2 lines */}
      {article.excerpt && (
        <p
          className="font-body text-white/55 group-hover:text-white/75 leading-relaxed transition-colors duration-400"
          style={{
            fontSize: "clamp(13px, 1.1vw, 14px)",
            fontWeight: 400,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.excerpt}
        </p>
      )}
    </motion.a>
  );
}

// "2025-09-07" → "07 Sep 2025"
function formatDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  const [, y, mo, d] = m;
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${d} ${months[parseInt(mo, 10) - 1]} ${y}`;
}
