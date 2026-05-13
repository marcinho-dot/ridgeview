"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReset } from "@/components/ScrollReset";
import { wines as allWines } from "@/data/wines";
import { basePath } from "@/lib/basePath";

// ── Data ────────────────────────────────────────────────────────────────────
// Same filter as the homepage carousel: exclude the bespoke engraving
// service (it's a gift product, not a wine). Sorted price-desc to mirror
// the carousel's editorial pacing (flagship first, entry-level last).
const priceValue = (p: string): number =>
  parseFloat(p.replace(/[^0-9.]/g, "")) || 0;

const wines = allWines
  .filter((w) => w.slug !== "engraved-bottle-gift")
  .sort((a, b) => {
    // Membership entries (the OurView Wine Club) always come last —
    // they aren't bottles, so they shouldn't intrude on the price-
    // descending bottle ranking.
    if (a.kind === "membership" && b.kind !== "membership") return 1;
    if (b.kind === "membership" && a.kind !== "membership") return -1;
    return priceValue(b.price) - priceValue(a.price);
  });

// ── Section: Page Hero ──────────────────────────────────────────────────────

function PageHero() {
  return (
    <section className="relative bg-[#010101] overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20">
      {/* Atmospheric gold radial — keeps the dark page from feeling flat */}
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
          [ The Collection ]
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-cream leading-[1.06] mb-6"
          style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400 }}
        >
          Ten wines from <span className="text-[#C8A96E]">Sussex chalk</span>.
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
          Three decades of English sparkling and still wines, classic-method
          and hand-harvested at our estate on Ditchling Common.
        </motion.p>
      </div>
    </section>
  );
}

// ── Section: Wine Grid ──────────────────────────────────────────────────────

function WineGrid() {
  return (
    <section className="relative bg-[#010101] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-14 md:py-20">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-14 md:gap-y-20">
          {wines.map((wine, i) => (
            <motion.li
              key={wine.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                // Stagger across rows (3 cols) — items in same row reveal
                // together, next row 0.08s later.
                delay: 0.05 + (i % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <a
                href={wine.customUrl
                  ? `${basePath}${wine.customUrl}`
                  : wine.slug ? `${basePath}/wine/${wine.slug}` : "#"}
                className="block text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]/40 rounded-sm"
              >
                {/* Bottle stage — dark frame + gold radial atmosphere */}
                <div className="relative aspect-[3/4] overflow-hidden mb-5 md:mb-6 bg-[#0a0a0a] rounded-sm">
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 60% at 50% 65%, rgba(200,169,110,0.06) 0%, transparent 70%)",
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${wine.image}`}
                    alt={`${wine.name} bottle`}
                    className="absolute inset-0 w-full h-full object-contain p-7 md:p-10 transition-transform duration-700 ease-out group-hover:scale-[1.04] [filter:drop-shadow(0_18px_28px_rgba(0,0,0,0.5))]"
                  />
                  {/* Subtle gold hairline that appears on hover */}
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
                  {wine.vintage}
                </p>

                {/* Wine name */}
                <h2
                  className="font-display italic text-cream group-hover:text-white leading-[1.1] mb-2 transition-colors duration-400"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 30px)",
                    fontWeight: 400,
                  }}
                >
                  {wine.name}
                </h2>

                {/* Price */}
                <p
                  className="font-body text-white/55 group-hover:text-white/80 tracking-wider transition-colors duration-400"
                  style={{
                    fontSize: "clamp(13px, 1.2vw, 15px)",
                    fontWeight: 300,
                  }}
                >
                  {wine.price}
                </p>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section: Bespoke Gifting CTA ────────────────────────────────────────────
// Engraved Bottle Gift is intentionally excluded from the wine grid (it's a
// service, not a wine). This section keeps it discoverable without diluting
// the catalog.

function GiftCTA() {
  return (
    <section className="relative bg-[#010101] border-t border-white/[0.06]">
      <div className="max-w-[960px] mx-auto px-6 md:px-16 py-16 md:py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-4"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
        >
          [ Bespoke Gifting ]
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-display italic text-cream leading-[1.1] mb-5"
          style={{ fontSize: "clamp(28px, 3.6vw, 52px)", fontWeight: 400 }}
        >
          Looking for a <span className="text-[#C8A96E]">gift</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="font-body text-white/65 leading-[1.8] mx-auto mb-9"
          style={{
            fontSize: "clamp(14px, 1.4vw, 17px)",
            fontWeight: 300,
            maxWidth: "520px",
          }}
        >
          Engrave a message on Bloomsbury, Fitzrovia Rosé or Blanc de Blancs &mdash;
          made-to-order in our cellar within five working days.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.24 }}
        >
          <a
            href={`${basePath}/wine/engraved-bottle-gift`}
            className="btn-cta"
          >
            Discover the Engraved Bottle
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function WinesPage() {
  return (
    <div className="bg-[#010101] min-h-screen">
      {/* Grain noise overlay — same value used on /booking for visual
          continuity across non-homepage routes. Sits above content
          (z-100) but pointer-events:none so it never blocks clicks. */}
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
        <ScrollReset><WineGrid /></ScrollReset>
        <ScrollReset><GiftCTA /></ScrollReset>
      </main>
      <Footer />
      {/* No <BottomNav /> on /wines — the catalog cards themselves
          are the primary navigation on this page; a sticky bottom
          bar would just add mobile clutter without a relevant
          destination (Home is one tap away in the hamburger menu,
          and "View All Wines" pointing back at the page the user
          is already on is tautological). */}
    </div>
  );
}
