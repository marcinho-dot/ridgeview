"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { basePath } from "@/lib/basePath";

/**
 * BehindTheBottleSection — Production / craftsmanship story for an SKU.
 *
 * Layout: Asymmetric two-column grid on desktop (image left, story right),
 * stacked on mobile. Background image (chalk soil or cellar) sits behind
 * the column with a tonal overlay for legibility.
 *
 * The four "craft pillars" use small icons + caption — Hand Harvest /
 * Méthode Traditionnelle / Lees Ageing / Sussex Chalk Soil are universal
 * to every Ridgeview wine, so this section can be shared SKU-wide with
 * minor pillar tweaks via props.
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
  /** Background image src (without basePath) — defaults to chalk-soil.jpg */
  backgroundSrc?: string;
}

export function BehindTheBottleSection({
  kicker = "[ Behind the Bottle ]",
  headline,
  intro,
  pillars,
  backgroundSrc = "/images/chalk-soil.jpg",
}: Props) {
  return (
    <section className="relative bg-[#0a0a0a] border-t border-white/[0.06] overflow-hidden">
      {/* Background image — chalk soil / cellar atmosphere */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}${backgroundSrc}`}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      {/* Tonal overlay so the text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-20 items-center">
          {/* Left column — kicker + headline + intro */}
          <div>
            <div className="reveal" style={{ transitionDelay: "0s" }}>
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                {kicker}
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.1s" }}>
              <h2
                className="font-display italic text-cream leading-[1.05] mb-6"
                style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}
              >
                {headline}
              </h2>
            </div>
            {intro && (
              <div className="reveal" style={{ transitionDelay: "0.2s" }}>
                <p
                  className="font-body text-white/70 leading-[1.85]"
                  style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, maxWidth: "440px" }}
                >
                  {intro}
                </p>
              </div>
            )}
          </div>

          {/* Right column — craft pillars list */}
          <div>
            <ul className="space-y-7 md:space-y-8">
              {pillars.map((p, i) => (
                <motion.li
                  key={p.label}
                  className="group flex items-start gap-5 md:gap-7 border-b border-white/[0.06] pb-7 md:pb-8 last:border-0 last:pb-0 cursor-default"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.18 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Number badge */}
                  <span
                    className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#C8A96E]/30 group-hover:border-[#C8A96E]/70 group-hover:bg-[#C8A96E]/[0.08] transition-all duration-500"
                    aria-hidden
                  >
                    <span
                      className="font-display italic text-[#C8A96E]"
                      style={{ fontSize: "clamp(13px, 1.2vw, 16px)" }}
                    >
                      0{i + 1}
                    </span>
                  </span>
                  <div className="flex-1 transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                    <p
                      className="font-display italic text-cream mb-2"
                      style={{ fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 400 }}
                    >
                      {p.label}
                    </p>
                    <p
                      className="font-body text-white/55 group-hover:text-white/75 leading-relaxed transition-colors duration-500"
                      style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300 }}
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
