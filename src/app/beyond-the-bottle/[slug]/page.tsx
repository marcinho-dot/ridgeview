"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ArticleBodyRenderer } from "@/components/beyond/ArticleBodyRenderer";
import { ArticleCard } from "@/components/beyond/ArticleCard";
import { articles, categories } from "@/data/articles";
import { basePath } from "@/lib/basePath";

/**
 * Article detail page at /beyond-the-bottle/<slug>/.
 *
 * Three render states:
 *   1. Slug not found in articles.ts  → 404-ish "not found" view with
 *      a link back to the hub.
 *   2. Slug found, body empty/undefined  →  "Coming Soon" stub:
 *      hero + title + date + category backlink + a polite holding
 *      paragraph. SEO-stable, no broken-page feel.
 *   3. Slug found, body populated  →  full editorial render via
 *      ArticleBodyRenderer + Related-Articles section at the bottom.
 */

const RELATED_COUNT = 3;

function NotFound() {
  return (
    <div className="bg-[#010101] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-[520px]">
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-5"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            [ Not Found ]
          </p>
          <h1
            className="font-display italic text-cream leading-[1.1] mb-6"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 400 }}
          >
            This story doesn&rsquo;t live here.
          </h1>
          <p
            className="font-body text-white/65 leading-[1.7] mb-9"
            style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300 }}
          >
            The article you were looking for has moved or never existed under
            this slug. Browse all our stories below.
          </p>
          <a href={`${basePath}/beyond-the-bottle/`} className="btn-cta">
            Back to all stories
          </a>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

function formatDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  const [, y, mo, d] = m;
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${parseInt(d, 10)} ${months[parseInt(mo, 10) - 1]} ${y}`;
}

export default function ArticleDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  // Drafts: article exists in articles.ts but flagged unpublished
  // (archived editorial that's temporarily withheld from public).
  // Treat as not-found at the route level so direct URLs 404.
  const articleRaw = articles.find((a) => a.slug === slug);
  const article = articleRaw && !articleRaw.draft ? articleRaw : undefined;
  const category = useMemo(
    () => (article ? categories.find((c) => c.slug === article.category) : null),
    [article],
  );

  const related = useMemo(() => {
    if (!article) return [];
    return articles
      .filter(
        (a) =>
          !a.draft &&
          a.category === article.category &&
          a.slug !== article.slug,
      )
      .slice(0, RELATED_COUNT);
  }, [article]);

  if (!article) return <NotFound />;

  const hasBody = Array.isArray(article.body) && article.body.length > 0;
  const dateLong = formatDate(article.date);

  return (
    <div className="bg-[#010101] min-h-screen">
      {/* Noise overlay - matches other non-homepage routes */}
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
        {/* ─── Article Hero ──────────────────────────────────────────── */}
        <section className="relative bg-[#010101] overflow-hidden pt-28 md:pt-32 pb-0">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 50% 30%, rgba(200,169,110,0.04) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 text-center">
            {/* Breadcrumb-style category backlink - mirrors the legacy
                site's "Home | News | <listing title>" pattern. */}
            {category && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-body text-white/45 uppercase tracking-[0.28em] mb-5"
                style={{ fontSize: "11px" }}
              >
                <a
                  href={`${basePath}/beyond-the-bottle/#${category.slug}`}
                  className="underline underline-offset-4 decoration-white/30 hover:text-[#C8A96E] hover:decoration-[#C8A96E] transition-colors duration-400"
                >
                  Beyond the Bottle &nbsp;·&nbsp; {category.label}
                </a>
                <span className="text-white/35">&nbsp;·&nbsp;</span>
                <span className="text-white/70">{article.title}</span>
              </motion.p>
            )}

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="font-display italic text-[#C8A96E] tracking-widest mb-5"
              style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}
            >
              [ {dateLong} ]
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-display italic text-cream leading-[1.08] mb-2"
              style={{ fontSize: "clamp(34px, 5.2vw, 72px)", fontWeight: 400 }}
            >
              {article.displayTitle ?? article.title}
            </motion.h1>

            {article.excerpt && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="font-display italic text-white/65 leading-[1.4] mx-auto mt-6"
                style={{
                  fontSize: "clamp(16px, 1.7vw, 22px)",
                  fontWeight: 400,
                  maxWidth: "640px",
                }}
              >
                {article.excerpt}
              </motion.p>
            )}
          </div>
        </section>

        {/* Hero image used to render here in a separate full-width section,
            but the live legacy layout puts the first image inside the
            first body module (side-by-side with intro text). Rendering it
            twice - once as hero, once as the first body module's image -
            caused the duplicate-image stack on the detail page. The body
            now opens with the proper side-by-side layout via
            ArticleBodyRenderer; heroImage is still on the article card
            in the listing/accordion. */}

        {/* ─── Body or Coming-Soon stub ─────────────────────────────── */}
        <section className="relative bg-[#010101]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-20">
            {hasBody ? (
              <ArticleBodyRenderer blocks={article.body!} />
            ) : (
              <ComingSoonStub categoryLabel={category?.label} />
            )}
          </div>
        </section>

        {/* ─── Related articles ─────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="relative bg-[#010101] border-t border-white/[0.06]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-16 md:py-20">
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-3 text-center"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ More in {category?.label ?? "this category"} ]
              </p>
              <h2
                className="font-display italic text-cream leading-[1.1] text-center mb-12 md:mb-16"
                style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 400 }}
              >
                Keep <span className="text-[#C8A96E]">reading</span>.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-14">
                {related.map((a, i) => (
                  <ArticleCard key={a.slug} article={a} index={i} />
                ))}
              </div>
              <div className="mt-12 md:mt-14 flex justify-center">
                <a
                  href={`${basePath}/beyond-the-bottle/#${article.category}`}
                  className="btn-cta"
                >
                  All {category?.label.toLowerCase()} stories
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

function ComingSoonStub({ categoryLabel }: { categoryLabel?: string }) {
  return (
    <div className="max-w-[640px] mx-auto text-center py-12 md:py-16">
      <div
        aria-hidden
        className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#C8A96E]/35 mb-8"
        style={{
          background: "rgba(245, 240, 232, 0.03)",
          backdropFilter: "blur(8px) saturate(140%)",
          WebkitBackdropFilter: "blur(8px) saturate(140%)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path d="M7 0 L14 7 L7 14 L0 7 Z" fill="#C8A96E" />
        </svg>
      </div>
      <h2
        className="font-display italic text-cream leading-[1.15] mb-5"
        style={{ fontSize: "clamp(24px, 2.8vw, 36px)", fontWeight: 400 }}
      >
        This story is being prepared for the relaunch.
      </h2>
      <p
        className="font-body text-white/55 leading-[1.8]"
        style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 300 }}
      >
        We&rsquo;re moving our editorial archive across as the new estate site
        comes together. Check back soon - in the meantime, browse
        {categoryLabel ? ` more ${categoryLabel.toLowerCase()} stories` : " our other stories"} on the hub.
      </p>
    </div>
  );
}
