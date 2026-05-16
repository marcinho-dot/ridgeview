"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * BehindTheBottleSection — Production / craftsmanship story for an SKU.
 *
 * Layout: Asymmetric two-column grid on desktop (kicker/headline left,
 * pillars right), stacked on mobile. Solid #0a0a0a background — no
 * imagery — so the gold accent rings on the pillar numbers stay crisp.
 *
 * The four "craft pillars" follow the production chronology:
 * Soil → Harvest → Winemaking → Maturation. Universal to every
 * Ridgeview wine, this section is shared SKU-wide with per-SKU
 * pillar tweaks via props.
 */

export interface CraftPillar {
  /** Short label e.g. "Hand Harvest" */
  label: string;
  /** One-liner detail e.g. "Picked at first light, sorted by hand" */
  detail: string;
}

interface Props {
  kicker?: string;
  headline: ReactNode;
  intro?: string;
  pillars: CraftPillar[];
  /** Compact layout for sticky-card-stack contexts where the section
   *  must fit inside one viewport (≤667px on mobile minus the
   *  floating BottomNav). Tightens padding, gaps and pillar spacing;
   *  centers the content vertically in a `min-h-screen` flex shell. */
  compact?: boolean;
}

export function BehindTheBottleSection({
  kicker = "[ Behind the Bottle ]",
  headline,
  intro,
  pillars,
  compact = false,
}: Props) {
  return (
    <section
      className={`relative bg-[#0a0a0a] border-t border-white/[0.06] overflow-hidden ${
        compact ? "min-h-screen flex items-center" : ""
      }`}
    >
      {/* Subtle ambient gold glow keeps the section editorial — no background image */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 30% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)",
        }}
      />

      <div
        className={`relative max-w-[1400px] mx-auto px-6 md:px-16 w-full ${
          compact ? "py-10 md:py-16" : "py-24 md:py-36"
        }`}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-[5fr_7fr] items-center ${
            compact ? "gap-6 md:gap-16" : "gap-12 md:gap-20"
          }`}
        >
          {/* Left column — kicker + headline + intro */}
          <div>
            <div className="reveal" style={{ transitionDelay: "0s" }}>
              <p
                className={`font-display italic text-[#C8A96E] tracking-widest ${
                  compact ? "mb-3" : "mb-5"
                }`}
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                {kicker}
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.1s" }}>
              <h2
                className={`font-display italic text-cream leading-[1.05] ${
                  compact ? "mb-4" : "mb-6"
                }`}
                style={{
                  fontSize: compact ? "clamp(28px, 4vw, 56px)" : "clamp(34px, 4.5vw, 64px)",
                  fontWeight: 400,
                }}
              >
                {headline}
              </h2>
            </div>
            {intro && (
              <div className="reveal" style={{ transitionDelay: "0.2s" }}>
                <p
                  className={`font-body text-white/70 ${compact ? "leading-relaxed" : "leading-[1.85]"}`}
                  style={{
                    fontSize: compact ? "clamp(13px, 1.3vw, 15px)" : "clamp(14px, 1.4vw, 17px)",
                    fontWeight: 300,
                    maxWidth: "440px",
                  }}
                >
                  {intro}
                </p>
              </div>
            )}
          </div>

          {/* Right column — craft pillars list */}
          <div>
            <ul className={compact ? "space-y-3 md:space-y-6" : "space-y-7 md:space-y-8"}>
              {pillars.map((p, i) => (
                <motion.li
                  key={p.label}
                  className={`group flex items-start border-b border-white/[0.06] last:border-0 last:pb-0 cursor-default ${
                    compact
                      ? "gap-4 md:gap-6 pb-3 md:pb-6"
                      : "gap-5 md:gap-7 pb-7 md:pb-8"
                  }`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.18 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Number badge */}
                  <span
                    className={`flex-shrink-0 inline-flex items-center justify-center rounded-full border border-[#C8A96E]/30 group-hover:border-[#C8A96E]/70 group-hover:bg-[#C8A96E]/[0.08] transition-all duration-500 ${
                      compact ? "w-8 h-8 md:w-10 md:h-10" : "w-10 h-10 md:w-12 md:h-12"
                    }`}
                    aria-hidden
                  >
                    <span
                      className="font-display italic text-[#C8A96E]"
                      style={{
                        fontSize: compact ? "clamp(11px, 1vw, 13px)" : "clamp(13px, 1.2vw, 16px)",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </span>
                  <div className="flex-1 transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                    <p
                      className={`font-display italic text-cream ${compact ? "mb-1" : "mb-2"}`}
                      style={{
                        fontSize: compact ? "clamp(17px, 1.7vw, 22px)" : "clamp(20px, 2vw, 28px)",
                        fontWeight: 400,
                      }}
                    >
                      {p.label}
                    </p>
                    <p
                      className="font-body text-white/55 group-hover:text-white/75 leading-relaxed transition-colors duration-500"
                      style={{
                        fontSize: compact ? "clamp(12px, 1.1vw, 14px)" : "clamp(13px, 1.25vw, 15px)",
                        fontWeight: 300,
                      }}
                    >
                      {p.detail}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
