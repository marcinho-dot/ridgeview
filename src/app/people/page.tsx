"use client";

/**
 * /people — the people behind Ridgeview.
 *
 * Two-chapter scroll narrative driven by the 21st.dev
 * `story-scroll` component (FlowArt + FlowSection). Each chapter
 * pins to the viewport while the next slides up and rotates from
 * 30° → 0° as it locks in — same mechanic as the reference demo,
 * themed in Ridgeview's CD (dark surfaces + gold + cream).
 *
 *   01 · The People       — the team behind the estate
 *   02 · The Winemaker    — Simon Roberts (head winemaker)
 *
 * Mike Roberts (founder, in memoriam) used to live here as chapter
 * 03. He's been moved to his own dedicated page at /mike-roberts
 * (2026-05-17). The Winemaker chapter below links to that page
 * from his name in the body copy.
 *
 * Reading order inside each chapter (top → bottom):
 *   kicker → divider → headline → divider → body → divider → images
 */

import Link from "next/link";
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
              fontSize: "clamp(13px, 1.2vw, 15px)",
              letterSpacing: "0.25em",
            }}
          >
            The People
          </p>
          <hr className="my-[0.15vw] border-none border-t border-[#C8A96E]/30" />

          <div>
            <h1
              className="font-display italic font-normal text-cream"
              style={{
                fontSize: "clamp(2.5rem, 7.5vw, 7.5rem)",
                lineHeight: 1.02,
              }}
            >
              Tended by hand.
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

          {/* HR + image grid flow directly after the body paragraph
              with the FlowSection's gap-3 (12 px) spacing. Previously
              wrapped in mt-auto to pin to the section bottom, but that
              opened a large empty band between text and images — user
              prefers the compact stack with the empty band below the
              images instead (2026-05-15). */}
          <div>
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
              fontSize: "clamp(13px, 1.2vw, 15px)",
              letterSpacing: "0.25em",
            }}
          >
            The Winemaker
          </p>
          <hr className="my-[0.15vw] border-none border-t border-[#C8A96E]/30" />

          <div>
            <h2
              className="font-display italic font-normal text-cream"
              style={{
                fontSize: "clamp(2.5rem, 7.5vw, 7.5rem)",
                lineHeight: 1.02,
              }}
            >
              Simon Roberts.
            </h2>
            <p
              className="mt-2 md:mt-3 font-body font-light text-white/55 uppercase"
              style={{
                fontSize: "clamp(11px, 1vw, 12px)",
                letterSpacing: "0.3em",
              }}
            >
              Head Winemaker
            </p>
          </div>

          <hr className="my-[0.4vw] border-none border-t border-[#C8A96E]/30" />

          <p
            className="max-w-[60ch] font-body font-light text-white/70 leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}
          >
            Head Winemaker at Ridgeview and son of founder{" "}
            <Link
              href="/mike-roberts"
              className="text-[#C8A96E] hover:text-[#C8A96E]/75 underline decoration-[#C8A96E]/40 hover:decoration-[#C8A96E]/70 underline-offset-4 transition-colors duration-300"
            >
              Mike Roberts
            </Link>
            . Simon carries the{" "}
            <span className="text-[#C8A96E]">Méthode Traditionnelle</span> forward on
            Sussex chalk — every cuvée passes through his hands from press to
            dégorgement, guided by the same conviction his father planted in
            1995.
          </p>

          {/* HR + image grid flow directly after the body paragraph
              with the FlowSection's gap-3 (12 px) spacing — compact
              stack at the top, empty band below the images instead
              (2026-05-15 user direction). */}
          <div>
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
          </div>
        </FlowSection>

        {/* Mike Roberts's tribute section (formerly chapter 03) has
            been moved to its own dedicated page at /mike-roberts
            (2026-05-17). Linked from the Winemaker paragraph above. */}
      </FlowArt>

      <Footer />
      <BottomNav />
    </>
  );
}
