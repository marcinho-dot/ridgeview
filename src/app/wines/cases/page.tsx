"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReset } from "@/components/ScrollReset";
import { cases } from "@/data/cases";
import { basePath } from "@/lib/basePath";

/**
 * /wines/cases — SEO + bulk-purchase landing for Case-of-6 offerings.
 *
 * Architecture: cases live as variants on the parent wine's SKU page
 * (variantId: "case6"). This listing page does NOT create separate
 * /wine/<slug>-case URLs; each card links to /wine/<slug>#case6 and
 * the SKU page reads the hash on mount to pre-select the Case variant
 * in its PurchaseWidget. Single source of truth, no content
 * duplication, and Google sees one canonical product page per wine
 * with Schema.org Product Variants exposing all 3 SKUs.
 *
 * SEO purpose: ranks for "english sparkling wine case", "wine case
 * gift", "case of 6 sparkling wine", etc. Conversion purpose: bulk
 * buyers (gifting, weddings, corporate, wine-club-curious) land
 * directly on the bulk option without navigating through a single-
 * bottle product page first.
 */

const formatGBP = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(n);

function PageHero() {
  return (
    <section className="relative bg-[#010101] overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20">
      <div
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
          [ Cases of Wine · Six bottles, ten percent off ]
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-cream leading-[1.06] mb-6"
          style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400 }}
        >
          Buy by the <span className="text-[#C8A96E]">six</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="font-body text-white/65 leading-[1.75] mx-auto"
          style={{
            fontSize: "clamp(14px, 1.4vw, 17px)",
            fontWeight: 400,
            maxWidth: "580px",
          }}
        >
          Bulk pricing for gifting, hosting, or building a personal cellar.
          Every case ships in our signature dark-glass box — ten percent
          off the single-bottle price across the collection.
        </motion.p>
      </div>
    </section>
  );
}

function CasesGrid() {
  return (
    <section className="relative bg-[#010101] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-14 md:py-20">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-14 md:gap-y-20">
          {cases.map((entry, i) => {
            const savings = entry.originalPrice - entry.casePrice;
            const isOOS = !!entry.outOfStock;
            return (
              <motion.li
                key={entry.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  // Stagger by row (3 cols) — same row reveals together,
                  // next row 0.08s later. Mirrors /wines WineGrid rhythm.
                  delay: 0.05 + (i % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative ${isOOS ? "opacity-70" : ""}`}
              >
                <a
                  href={entry.href ? `${basePath}${entry.href}` : `${basePath}/wine/${entry.slug}#case6`}
                  aria-label={`View ${entry.name} case of 6`}
                  aria-disabled={isOOS}
                  className="block text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]/40 rounded-sm"
                >
                  {/* Case-shot stage — same dark frame + gold radial as
                      the /wines WineGrid bottle stage, so the two pages
                      read as a coherent collection treatment. */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-5 md:mb-6 bg-[#0a0a0a] rounded-sm">
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 70% 60% at 50% 65%, rgba(200,169,110,0.06) 0%, transparent 70%)",
                      }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${basePath}${entry.image}`}
                      alt={`${entry.name} case of 6 bottles`}
                      className="absolute inset-0 w-full h-full object-contain p-7 md:p-10 transition-transform duration-700 ease-out group-hover:scale-[1.04] [filter:drop-shadow(0_18px_28px_rgba(0,0,0,0.5))]"
                    />
                    {/* Discount badge — top-right corner, gold pill */}
                    {!isOOS && (
                      <div className="absolute top-3 right-3 md:top-4 md:right-4 px-2.5 py-1 rounded-full bg-[#C8A96E]/15 border border-[#C8A96E]/30 backdrop-blur-sm">
                        <span
                          className="font-body text-[#C8A96E] uppercase tracking-[0.18em]"
                          style={{ fontSize: "9.5px", fontWeight: 500 }}
                        >
                          {entry.badge}
                        </span>
                      </div>
                    )}
                    {isOOS && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                        <span
                          className="font-body text-white/85 uppercase tracking-[0.28em] border border-white/30 px-4 py-2 rounded-sm"
                          style={{ fontSize: "11px" }}
                        >
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-x-7 bottom-3 md:inset-x-10 md:bottom-5 h-px bg-[#C8A96E]/0 group-hover:bg-[#C8A96E]/50 transition-colors duration-500"
                    />
                  </div>

                  {/* Vintage kicker */}
                  <p
                    className="font-body text-[#C8A96E]/75 group-hover:text-[#C8A96E] uppercase tracking-[0.24em] mb-2 transition-colors duration-400"
                    style={{ fontSize: "10px" }}
                  >
                    Case of 6 · {entry.vintage}
                  </p>

                  {/* Wine name */}
                  <h2
                    className="font-display italic text-cream group-hover:text-white leading-[1.1] mb-2 transition-colors duration-400"
                    style={{
                      fontSize: "clamp(22px, 2.2vw, 30px)",
                      fontWeight: 400,
                    }}
                  >
                    {entry.name}
                  </h2>

                  {/* Price block — case price + crossed-out original */}
                  <div className="flex items-baseline justify-center gap-2.5 mb-1">
                    <p
                      className="font-body text-cream tracking-wider"
                      style={{
                        fontSize: "clamp(15px, 1.4vw, 18px)",
                        fontWeight: 400,
                      }}
                    >
                      {formatGBP(entry.casePrice)}
                    </p>
                    <p
                      className="font-body text-white/40 line-through tabular-nums"
                      style={{
                        fontSize: "clamp(12px, 1.1vw, 14px)",
                        fontWeight: 400,
                      }}
                    >
                      {formatGBP(entry.originalPrice)}
                    </p>
                  </div>

                  {/* Per-bottle equivalent + savings */}
                  <p
                    className="font-body text-white/45 mb-5"
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 400,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {formatGBP(entry.casePrice / 6)} per bottle ·{" "}
                    <span className="text-[#C8A96E]/75">
                      save {formatGBP(savings)}
                    </span>
                  </p>

                  {/* Tasting notes as pill chips */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                    {entry.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="font-body text-white/55 group-hover:text-white/75 text-[11px] border border-white/[0.08] group-hover:border-[#C8A96E]/25 px-3 py-1 rounded-full transition-colors duration-400"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* CTA — same magazine-underline pattern as WineGrid */}
                  <span
                    className="inline-flex font-body text-cream uppercase tracking-[0.22em] pb-1 relative"
                    style={{ fontSize: "11px", fontWeight: 400 }}
                  >
                    {isOOS ? "Notify When Back" : "View Case"}
                    <span
                      aria-hidden
                      className="absolute left-0 right-0 bottom-0 h-px bg-[#C8A96E] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                    />
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function BackToCollection() {
  return (
    <section className="relative bg-[#010101] border-t border-white/[0.06]">
      <div className="max-w-[960px] mx-auto px-6 md:px-16 py-14 md:py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-4"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
        >
          [ Single Bottles ]
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-display italic text-cream leading-[1.1] mb-5"
          style={{ fontSize: "clamp(28px, 3.6vw, 52px)", fontWeight: 400 }}
        >
          Browse the full <span className="text-[#C8A96E]">collection</span>.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.16 }}
        >
          <a href={`${basePath}/wines`} className="btn-cta">
            View All Wines
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function CasesPage() {
  return (
    <div className="bg-[#010101] min-h-screen">
      {/* Grain noise overlay — site-wide visual continuity */}
      <div
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
        <ScrollReset>
          <CasesGrid />
        </ScrollReset>
        <ScrollReset>
          <BackToCollection />
        </ScrollReset>
      </main>
      <Footer />
    </div>
  );
}
