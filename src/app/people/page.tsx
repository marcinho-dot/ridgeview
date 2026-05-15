"use client";

/**
 * /people — the people behind Ridgeview.
 *
 * Three-chapter scroll narrative driven by the 21st.dev
 * `story-scroll` component (FlowArt + FlowSection). Each chapter
 * pins to the viewport while the next slides up and rotates from
 * 30° → 0° as it locks in — same mechanic as the reference demo,
 * themed in Ridgeview's CD (dark surfaces + gold + cream).
 *
 *   01 · The People       — the team behind the estate
 *   02 · The Winemaker    — Simon Roberts (head winemaker)
 *   03 · The Founder      — Mike Roberts (in memoriam)
 *
 * Reading order inside each chapter (top → bottom):
 *   kicker → divider → headline → divider → body → divider → images
 *
 * Editorial copy is brand-voice-clean (verifiable facts only,
 * pulled from the migrated "Remembering Mike Roberts" tribute
 * article in `content/articles/`).
 */

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { basePath } from "@/lib/basePath";

export default function PeoplePage() {
  return (
    <>
      <Navbar />

      <FlowArt aria-label="The people behind Ridgeview Wine Estate">
        {/* ───────── 01 · The People ─────────────────────────────── */}
        <FlowSection
          aria-label="The People"
          style={{ backgroundColor: "#0a0a0a", color: "#f5f0e8" }}
        >
          <p
            className="font-display italic text-[#C8A96E] uppercase"
            style={{
              fontSize: "clamp(11px, 1vw, 13px)",
              letterSpacing: "0.25em",
            }}
          >
            01 — The People
          </p>
          <hr className="my-[0.4vw] border-none border-t border-[#C8A96E]/30" />

          <div>
            <h1
              className="font-display italic font-normal text-cream"
              style={{
                fontSize: "clamp(2.75rem, 8vw, 8rem)",
                lineHeight: 0.95,
              }}
            >
              Tended
              <br />
              by hand.
            </h1>
          </div>

          <hr className="my-[0.4vw] border-none border-t border-[#C8A96E]/30" />

          <p
            className="max-w-[60ch] font-body font-light text-white/70 leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}
          >
            A dedicated team of viticulturists, winemakers, and hospitality
            professionals — working together to shape the future of English
            sparkling wine. Across the vineyard, the cellar, and the
            restaurant, every hand plays a part.
          </p>

          <hr className="my-[0.4vw] border-none border-t border-[#C8A96E]/30" />

          {/* 2-photo grid (first image removed per user direction) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={`${basePath}/images/people/people-harvest-walk.jpg`}
                alt="Walking the harvest at Ridgeview"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={`${basePath}/images/people/people-harvest-54.jpg`}
                alt="Harvest at Ridgeview — picking by hand"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </FlowSection>

        {/* ───────── 02 · The Winemaker · Simon Roberts ──────────── */}
        <FlowSection
          aria-label="Simon Roberts — Head Winemaker"
          style={{ backgroundColor: "#080808", color: "#f5f0e8" }}
        >
          <p
            className="font-display italic text-[#C8A96E] uppercase"
            style={{
              fontSize: "clamp(11px, 1vw, 13px)",
              letterSpacing: "0.25em",
            }}
          >
            02 — The Winemaker
          </p>
          <hr className="my-[0.4vw] border-none border-t border-[#C8A96E]/30" />

          <div>
            <h2
              className="font-display italic font-normal text-cream"
              style={{
                fontSize: "clamp(2.75rem, 8vw, 8rem)",
                lineHeight: 0.95,
              }}
            >
              Simon
              <br />
              Roberts.
            </h2>
            <p
              className="mt-4 font-body font-light text-white/55 uppercase"
              style={{
                fontSize: "clamp(11px, 1vw, 12px)",
                letterSpacing: "0.3em",
              }}
            >
              Head Winemaker · Second Generation
            </p>
          </div>

          <hr className="my-[0.4vw] border-none border-t border-[#C8A96E]/30" />

          <p
            className="max-w-[60ch] font-body font-light text-white/70 leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}
          >
            Head Winemaker at Ridgeview and son of founder Mike Roberts.
            Simon carries the{" "}
            <span className="text-[#C8A96E]">Classic Method</span> forward on
            Sussex chalk — every cuvée passes through his hands from press to
            dégorgement, guided by the same conviction his father planted in
            1995.
          </p>

          <hr className="my-[0.4vw] border-none border-t border-[#C8A96E]/30" />

          {/* 2-photo grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={`${basePath}/images/people/simon-barrels.jpg`}
                alt="Simon Roberts among the oak barrels at Ridgeview's cellar"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={`${basePath}/images/people/simon-tasting.jpg`}
                alt="Simon Roberts tank-tasting at Ridgeview"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </FlowSection>

        {/* ───────── 03 · The Founder · Mike Roberts (In Memoriam) ── */}
        <FlowSection
          aria-label="Mike Roberts — Founder, in memoriam"
          style={{ backgroundColor: "#010101", color: "#f5f0e8" }}
        >
          <p
            className="font-display italic text-[#C8A96E] uppercase"
            style={{
              fontSize: "clamp(11px, 1vw, 13px)",
              letterSpacing: "0.25em",
            }}
          >
            03 — The Founder · In Memoriam
          </p>
          <hr className="my-[2vw] border-none border-t border-[#C8A96E]/40" />

          <div>
            <h2
              className="font-display italic font-normal text-cream"
              style={{
                fontSize: "clamp(2.75rem, 8vw, 8rem)",
                lineHeight: 0.95,
              }}
            >
              Mike
              <br />
              Roberts.
            </h2>
            <p
              className="mt-4 font-body font-light text-[#C8A96E]/85 uppercase"
              style={{
                fontSize: "clamp(11px, 1vw, 12px)",
                letterSpacing: "0.3em",
              }}
            >
              Co-Founder · MBE
            </p>
          </div>

          <hr className="my-[2vw] border-none border-t border-[#C8A96E]/40" />

          <p
            className="max-w-[60ch] font-body font-light text-white/75 leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}
          >
            Co-founded Ridgeview with his wife Chris in{" "}
            <span className="text-[#C8A96E]">1995</span>, planting the first
            vines when few in England dared. Awarded an{" "}
            <span className="text-[#C8A96E]">MBE</span> in 2011 for his
            services to the English wine industry. His guiding motto —
            &ldquo;life is for celebrating&rdquo; — still shapes every bottle
            Ridgeview makes today.
          </p>

          <hr className="my-[2vw] border-none border-t border-[#C8A96E]/40" />

          {/* 3-photo grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={`${basePath}/images/people/mike-hero.png`}
                alt="Mike Roberts, founder of Ridgeview Wine Estate"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={`${basePath}/images/people/mike-1.webp`}
                alt="Mike Roberts in the early years of Ridgeview"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={`${basePath}/images/people/mike-dogs.jpg`}
                alt="Mike Roberts at the estate with his dogs"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* "life is for celebrating" — Mike Roberts's guiding
                  motto, also Ridgeview's house motto. Sits as a
                  typographic lock-up at the bottom of his last
                  portrait. Gradient softens the photo behind so the
                  cream italic stays readable on any image content. */}
              <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-12 md:px-7 md:pb-7 md:pt-16 bg-gradient-to-t from-black/92 via-black/55 to-transparent">
                <p
                  className="font-display italic text-cream text-center leading-tight"
                  style={{ fontSize: "clamp(15px, 1.9vw, 24px)" }}
                >
                  &ldquo;life is for{" "}
                  <span className="text-[#C8A96E]">celebrating</span>
                  &rdquo;
                </p>
                <p
                  className="mt-2 font-body font-light text-white/55 uppercase text-center"
                  style={{
                    fontSize: "clamp(9px, 0.85vw, 11px)",
                    letterSpacing: "0.3em",
                  }}
                >
                  Mike Roberts
                </p>
              </div>
            </div>
          </div>
        </FlowSection>
      </FlowArt>

      <Footer />
      <BottomNav />
    </>
  );
}
