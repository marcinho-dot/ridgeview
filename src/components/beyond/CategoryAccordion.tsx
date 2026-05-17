"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArticleCard } from "./ArticleCard";
import { categories, articles, type CategorySlug } from "@/data/articles";
import { basePath } from "@/lib/basePath";

/**
 * Beyond-the-Bottle category accordion - restores the legacy
 * BlogSection look (horizontal flex-panel strip on desktop, vertical
 * collapse rows on mobile) and adapts it to the new content shape:
 * each panel = one category, the active panel reveals the category's
 * full article grid below the strip (desktop) or inline within the
 * expanded row (mobile).
 *
 * Cross-page deep-link: arriving via /beyond-the-bottle/#<slug>
 * auto-activates that panel + smooth-scrolls to it. hashchange
 * listener handles in-page hash updates too.
 */

// Detect pointer:fine devices (mouse / trackpad) so we only enable
// hover-to-expand where it makes sense. Touch screens fall back to
// click-only.
function useCanHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return canHover;
}

// Group articles by category once at module level
const articlesByCategory: Record<CategorySlug, typeof articles> = (() => {
  const grouped: Record<CategorySlug, typeof articles> = {
    wines: [],
    vineyard: [],
    entertaining: [],
    knowledge: [],
    experiences: [],
    sustainability: [],
    "estate-life": [],
  };
  for (const a of articles) grouped[a.category].push(a);
  for (const key of Object.keys(grouped) as CategorySlug[]) {
    grouped[key].sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  return grouped;
})();

// ── DESKTOP STRIP ───────────────────────────────────────────────────────────

function DesktopStrip({
  active,
  setActive,
}: {
  active: CategorySlug | null;
  setActive: (s: CategorySlug | null) => void;
}) {
  const canHover = useCanHover();

  // NOTE: NO `onMouseLeave` collapse on the strip container.
  // The article grid sits BELOW the strip - collapsing on mouse-leave
  // would yank the grid away as the user moves their cursor down to
  // click an article. Active state now persists until the user
  // explicitly clicks the active panel to close it, or clicks/hovers
  // another panel to switch.
  return (
    <div className="hidden md:flex gap-2 h-[420px] lg:h-[460px]">
      {categories.map((cat, i) => {
        const isActive = active === cat.slug;
        const count = articlesByCategory[cat.slug].length;

        return (
          <motion.div
            key={cat.slug}
            id={`panel-${cat.slug}`}
            className="reveal relative overflow-hidden rounded-sm cursor-pointer"
            initial={false}
            animate={{ flex: isActive ? 6 : 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transitionDelay: `${0.05 + i * 0.06}s` }}
            onClick={() => setActive(isActive ? null : cat.slug)}
            onMouseEnter={canHover ? () => setActive(cat.slug) : undefined}
            role="button"
            aria-expanded={isActive}
            aria-label={`${cat.label} - ${count} stories`}
          >
            {/* Background image */}
            {cat.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${basePath}${cat.image}`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Base overlay - darker when collapsed */}
            <div
              className="absolute inset-0 transition-colors duration-500"
              style={{
                backgroundColor: isActive
                  ? "rgba(0,0,0,0.20)"
                  : "rgba(0,0,0,0.45)",
              }}
            />

            {/* Bottom gradient for active panel */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
            )}

            {/* Collapsed: vertical category label + count */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center px-2"
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
                      fontSize: "clamp(13px, 1.1vw, 16px)",
                      fontWeight: 500,
                      letterSpacing: "0.32em",
                      textShadow:
                        "0 1px 12px rgba(0,0,0,0.95), 0 0 24px rgba(0,0,0,0.7)",
                    }}
                  >
                    {cat.label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active: category overview */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end px-8 lg:px-12 pb-9 lg:pb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                >
                  <p
                    className="font-body text-[#E5C896] uppercase mb-3"
                    style={{
                      fontSize: "clamp(11px, 1vw, 13px)",
                      fontWeight: 500,
                      letterSpacing: "0.26em",
                      textShadow: "0 1px 8px rgba(0,0,0,0.85)",
                    }}
                  >
                    {count} {count === 1 ? "story" : "stories"}
                  </p>
                  <h3
                    className="font-display italic text-cream leading-[1.05] mb-4"
                    style={{
                      fontSize: "clamp(36px, 4vw, 64px)",
                      fontWeight: 400,
                      textShadow:
                        "0 2px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.85)",
                    }}
                  >
                    {cat.label}
                  </h3>
                  <p
                    className="font-body text-white/85 leading-relaxed max-w-[480px]"
                    style={{
                      fontSize: "clamp(13px, 1.15vw, 16px)",
                      fontWeight: 300,
                      textShadow:
                        "0 1px 10px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.85)",
                    }}
                  >
                    {cat.blurb}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── DESKTOP ARTICLE GRID - appears below strip when a category is active ────

function DesktopArticleGrid({ active }: { active: CategorySlug | null }) {
  const articles = active ? articlesByCategory[active] : [];

  return (
    <AnimatePresence mode="wait">
      {active && articles.length > 0 && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block pt-12 md:pt-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-12 lg:gap-y-16">
            {articles.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── MOBILE ACCORDION ───────────────────────────────────────────────────────

function MobileAccordion({
  active,
  setActive,
}: {
  active: CategorySlug | null;
  setActive: (s: CategorySlug | null) => void;
}) {
  return (
    <div className="md:hidden flex flex-col gap-1.5">
      {categories.map((cat, i) => {
        const isActive = active === cat.slug;
        const items = articlesByCategory[cat.slug];

        return (
          <motion.div
            key={cat.slug}
            id={`panel-${cat.slug}-mobile`}
            layout
            className="relative overflow-hidden rounded-sm"
            initial={false}
            animate={{ minHeight: isActive ? "auto" : 56 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transitionDelay: `${0.05 + i * 0.06}s` }}
          >
            {/* Background image - full bleed */}
            {cat.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${basePath}${cat.image}`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {/* Base overlay */}
            <div
              className="absolute inset-0 transition-colors duration-500"
              style={{
                backgroundColor: isActive
                  ? "rgba(0,0,0,0.55)"
                  : "rgba(0,0,0,0.45)",
              }}
            />

            {/* Tap target: always-visible header bar */}
            <button
              type="button"
              onClick={() => setActive(isActive ? null : cat.slug)}
              aria-expanded={isActive}
              className="relative z-10 w-full flex items-center px-5 py-4 gap-4 text-left"
            >
              <span
                className="font-body text-[#E5C896] uppercase shrink-0"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textShadow: "0 1px 6px rgba(0,0,0,0.85)",
                }}
              >
                {cat.label}
              </span>
              <span
                className="ml-auto font-body text-white/55 uppercase shrink-0"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textShadow: "0 1px 6px rgba(0,0,0,0.85)",
                }}
              >
                {items.length}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`text-white/45 shrink-0 transition-transform duration-400 ${
                  isActive ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Active: article cards inside the row */}
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 overflow-hidden"
                >
                  <div className="px-5 pb-7 pt-2">
                    <p
                      className="font-body italic text-white/65 leading-relaxed mb-7"
                      style={{
                        fontSize: "13px",
                        fontWeight: 300,
                        textShadow: "0 1px 8px rgba(0,0,0,0.85)",
                      }}
                    >
                      {cat.blurb}
                    </p>
                    <div className="flex flex-col gap-10">
                      {items.map((a, j) => (
                        <ArticleCard key={a.slug} article={a} index={j} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── MAIN ────────────────────────────────────────────────────────────────────

export function CategoryAccordion() {
  const [active, setActive] = useState<CategorySlug | null>(null);

  // Hash → auto-activate matching panel + smooth-scroll
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const match = categories.find((c) => c.slug === hash);
      if (!match) return;
      setActive(match.slug);
      window.setTimeout(() => {
        const el =
          document.getElementById(`panel-${match.slug}`) ||
          document.getElementById(`panel-${match.slug}-mobile`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <>
      <DesktopStrip active={active} setActive={setActive} />
      <DesktopArticleGrid active={active} />
      <MobileAccordion active={active} setActive={setActive} />
    </>
  );
}
