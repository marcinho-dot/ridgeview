"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ArticleAccordion } from "@/components/beyond/ArticleAccordion";
import { categories, articles, type CategorySlug } from "@/data/articles";

/**
 * Beyond the Bottle — articles hub page.
 *
 * Renders all 7 category accordions in a single-open arrangement.
 * Deep-link support: arriving via /beyond-the-bottle/#wines (e.g. from
 * the homepage CategoryCardRow) opens that accordion on mount and
 * smooth-scrolls to it. Navigating directly to /beyond-the-bottle/ with
 * no hash → all accordions closed.
 */

// Group articles by category once at module level. Newest first inside
// each bucket so the most recent stories land at the top of every
// open accordion.
const articlesByCategory = (() => {
  const grouped: Record<CategorySlug, typeof articles> = {
    wines: [],
    vineyard: [],
    entertaining: [],
    knowledge: [],
    experiences: [],
    sustainability: [],
    "estate-life": [],
  };
  for (const article of articles) {
    grouped[article.category].push(article);
  }
  // Sort each bucket newest first
  for (const key of Object.keys(grouped) as CategorySlug[]) {
    grouped[key].sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  return grouped;
})();

function PageHero() {
  return (
    <section className="relative bg-[#010101] overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 30%, rgba(200,169,110,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-5"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
        >
          [ Beyond the Bottle ]
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-cream leading-[1.06] mb-6"
          style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400 }}
        >
          Stories from the <span className="text-[#C8A96E]">estate</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="font-body text-white/65 leading-[1.75] mx-auto"
          style={{
            fontSize: "clamp(14px, 1.4vw, 17px)",
            fontWeight: 300,
            maxWidth: "560px",
          }}
        >
          {articles.length} articles across seven facets of life at Ridgeview &mdash;
          from the cellar to the South Downs, harvest to hospitality.
        </motion.p>
      </div>
    </section>
  );
}

export default function BeyondHubPage() {
  // Single-open accordion state. `null` = all closed.
  const [openCategory, setOpenCategory] = useState<CategorySlug | null>(null);

  // Hash → auto-open + smooth-scroll. Handles:
  //   (1) Mount with a hash in the URL (deep-link from homepage card,
  //       browser refresh on /beyond-the-bottle/#wines, etc.)
  //   (2) In-page hash changes (clicking a #-link without a page
  //       reload — e.g. the user already on /beyond-the-bottle/
  //       clicks a CategoryCardRow link from the homepage open in
  //       another tab / back-button history).
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const match = categories.find((c) => c.slug === hash);
      if (!match) return;
      setOpenCategory(match.slug);
      // Slight delay so the accordion exists in the DOM after the
      // re-render and the smooth-scroll lands on its expanded
      // final position.
      window.setTimeout(() => {
        const el = document.getElementById(match.slug);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const toggle = (slug: CategorySlug) => {
    setOpenCategory((current) => (current === slug ? null : slug));
  };

  return (
    <div className="bg-[#010101] min-h-screen">
      {/* Noise overlay — matches /booking and /wines for visual continuity */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <Navbar />
      <main>
        <PageHero />

        {/* Accordions */}
        <section className="relative bg-[#010101] border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-6 md:py-10">
            {categories.map((cat) => (
              <ArticleAccordion
                key={cat.slug}
                category={cat}
                articles={articlesByCategory[cat.slug]}
                isOpen={openCategory === cat.slug}
                onToggle={() => toggle(cat.slug)}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
