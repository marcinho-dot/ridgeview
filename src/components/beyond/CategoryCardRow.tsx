"use client";

import { motion } from "framer-motion";
import { categories, articles } from "@/data/articles";
import { basePath } from "@/lib/basePath";

/**
 * Homepage section: horizontal-scrolling row of 7 category cards.
 *
 * Replaces the old per-article `BlogSection`. Each card links to
 * /beyond-the-bottle/#<category-slug> so the hub page auto-opens the
 * matching accordion on landing (handled inside BeyondHubPage's
 * useEffect).
 *
 * Implementation notes:
 *   - Native `overflow-x-auto` + CSS scroll-snap (no carousel lib).
 *     Cards are flex-shrink-0 with explicit widths so the row width
 *     overflows and the user scrolls horizontally with touch / drag /
 *     scrollbar / shift-wheel.
 *   - On mobile, the visible card width is ~78vw so the next card
 *     "peeks" in at the right edge — signals scrollability without a
 *     swipe-hint icon.
 *   - On desktop, fixed 320px cards show ~3-4 at once on a typical
 *     1440px viewport.
 *   - Scrollbar hidden via a small utility class (still scrollable).
 */

export function CategoryCardRow() {
  // Compute article counts per category for the kicker line
  const countByCategory = articles.reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <section
      id="beyond-the-bottle-row"
      className="relative bg-[#010101] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Subtle gold radial — keeps the dark band from feeling flat */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto py-20 md:py-28">
        {/* Header */}
        <div className="px-6 md:px-16 mb-10 md:mb-14">
          <motion.p
            className="font-display italic text-[#C8A96E] tracking-widest mb-4"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            [ Beyond the Bottle ]
          </motion.p>
          <motion.h2
            className="font-display italic text-cream leading-[1.06] max-w-[820px]"
            style={{
              fontSize: "clamp(34px, 5vw, 72px)",
              fontWeight: 400,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Stories from the <span className="text-[#C8A96E]">estate</span>.
          </motion.h2>
        </div>

        {/* Horizontal-scroll row */}
        <div
          className="overflow-x-auto overflow-y-hidden scrollbar-hidden"
          style={{ scrollSnapType: "x proximity", WebkitOverflowScrolling: "touch" }}
        >
          <ul
            className="flex gap-4 md:gap-6 px-6 md:px-16"
            style={{ paddingRight: "max(1.5rem, 6vw)" }}
          >
            {categories.map((cat, i) => {
              const count = countByCategory[cat.slug] || 0;
              return (
                <motion.li
                  key={cat.slug}
                  className="flex-shrink-0 w-[78vw] sm:w-[44vw] md:w-[320px] lg:w-[340px]"
                  style={{ scrollSnapAlign: "start" }}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.05 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={`${basePath}/beyond-the-bottle/#${cat.slug}`}
                    className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]/40 rounded-sm"
                  >
                    {/* Image stage */}
                    <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-[#0a0a0a] rounded-sm">
                      {cat.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${basePath}${cat.image}`}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/15 font-display italic text-[20px]">
                          Ridgeview
                        </div>
                      )}
                      {/* Bottom-up gradient for label readability */}
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                      />
                      {/* Gold hairline on hover */}
                      <div
                        aria-hidden
                        className="absolute inset-x-5 bottom-5 h-px bg-[#C8A96E]/0 group-hover:bg-[#C8A96E]/60 transition-colors duration-500"
                      />

                      {/* Label stack — overlaid in the bottom area */}
                      <div className="absolute inset-x-0 bottom-0 px-5 md:px-6 pb-5 md:pb-6">
                        <p
                          className="font-body text-[#C8A96E]/80 group-hover:text-[#C8A96E] uppercase tracking-[0.24em] mb-2 transition-colors duration-400"
                          style={{ fontSize: "10px" }}
                        >
                          [ {count} {count === 1 ? "story" : "stories"} ]
                        </p>
                        <h3
                          className="font-display italic text-cream group-hover:text-white leading-[1.05] transition-colors duration-400"
                          style={{
                            fontSize: "clamp(24px, 2.2vw, 32px)",
                            fontWeight: 400,
                          }}
                        >
                          {cat.label}
                        </h3>
                      </div>
                    </div>

                    {/* Blurb — sits under the image, not over */}
                    <p
                      className="font-body text-white/55 group-hover:text-white/75 leading-relaxed transition-colors duration-400"
                      style={{
                        fontSize: "clamp(13px, 1.1vw, 14px)",
                        fontWeight: 300,
                      }}
                    >
                      {cat.blurb}
                    </p>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Footer link — central, leads to the hub page (no specific anchor) */}
        <div className="px-6 md:px-16 mt-12 md:mt-16 flex justify-center">
          <a href={`${basePath}/beyond-the-bottle/`} className="btn-cta">
            Read all stories
          </a>
        </div>
      </div>
    </section>
  );
}
