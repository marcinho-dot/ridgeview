"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { basePath } from "@/lib/basePath";

/**
 * AwardSection - Award-Trophy-Pseudo-Testimonial.
 *
 * Verwendung:
 * - Als Recognition-Element für SKUs ohne externe Press-Review
 *   (z.B. Still Chardonnay, Still English Rosé).
 * - Auch als zusätzliches Award-Highlight für SKUs mit prestigereichen
 *   Auszeichnungen (z.B. Bloomsbury · Decanter Silver 2018).
 *
 * Layout-Logik:
 * - Visuelles Echo zur TestimonialSection (gleicher Editorial-Rhythmus),
 *   aber Award-Badge tritt an die Stelle des Pull-Quote-Anführungszeichens.
 * - Medal-Name in Display-Italic-Gold als Hero-Element.
 * - Tier-Label (z.B. "Highly Recommended") und optional kurzer Award-Statement-Text.
 */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export interface AwardSectionData {
  /** Award-Stufe (z.B. "Silver", "Gold", "Platinum", "Trophy Winner"). */
  medal: string;
  /** Wettbewerb / Awards-Body (z.B. "Decanter World Wine Awards"). */
  body: string;
  /** Jahr der Verleihung (z.B. "2018"). */
  year: string | number;
  /** Optionales Tier-Label aus dem Wettbewerb (z.B. "Highly Recommended"). */
  tier?: string;
  /**
   * Pfad zum Badge-Bild - RELATIV zu /public/, ohne basePath.
   * (z.B. "/images/awards/decanter-2018-silver.webp")
   */
  badgeSrc: string;
  /** Optionales kurzes Award-Statement (1 Satz, ergänzt das Badge). */
  description?: string;
  /** Optionaler Score (z.B. 93 Punkte) wenn der Award damit verbunden ist. */
  score?: number;
  /** Maximaler Skala-Wert. Default 100. */
  maxScore?: number;
}

interface Props {
  data: AwardSectionData;
  /** Optional kicker text override (default: "[ Award · Distinction ]") */
  kicker?: string;
}

export function AwardSection({ data, kicker = "[ Award · Distinction ]" }: Props) {
  const { medal, body, year, tier, badgeSrc, description, score, maxScore = 100 } = data;

  return (
    <section className="relative bg-[#0a0a0a] border-t border-white/[0.06] overflow-hidden">
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 45%, rgba(200,169,110,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-16 py-10 md:py-14 text-center">
        {/* Kicker */}
        <FadeUp>
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-3 md:mb-4"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            {kicker}
          </p>
        </FadeUp>

        {/* Award Badge - Hero-Bild, ersetzt das Anführungszeichen aus der TestimonialSection */}
        <FadeUp delay={0.1}>
          <div
            className="mx-auto mb-3 md:mb-5 flex items-center justify-center"
            style={{
              height: "clamp(96px, 12vw, 160px)",
            }}
          >
            <motion.img
              src={`${basePath}${badgeSrc}`}
              alt={`${medal} - ${body} ${year}`}
              className="h-full w-auto object-contain [filter:drop-shadow(0_8px_24px_rgba(0,0,0,0.5))]"
              loading="lazy"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>
        </FadeUp>

        {/* Medal Name - Pull-Quote-Style Hero-Text */}
        <FadeUp delay={0.18}>
          <p
            className="font-display italic text-cream"
            style={{
              fontSize: "clamp(40px, 5.6vw, 76px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.005em",
              marginBottom: "clamp(12px, 1.4vw, 20px)",
            }}
          >
            <span className="text-[#C8A96E]">{medal}</span>
          </p>
        </FadeUp>

        {/* Award-Body + Year */}
        <FadeUp delay={0.26}>
          <p
            className="font-body text-white/85 uppercase tracking-[0.32em]"
            style={{
              fontSize: "clamp(11px, 1.1vw, 14px)",
              marginBottom: "clamp(20px, 2.4vw, 32px)",
            }}
          >
            {body}
            <span className="text-white/35 mx-3">·</span>
            <span className="text-[#C8A96E]/85">{year}</span>
          </p>
        </FadeUp>

        {/* Tier Label (with score, optional) */}
        {(tier || typeof score === "number") && (
          <FadeUp delay={0.32}>
            <div className="flex flex-col items-center gap-2 mb-4 md:mb-5">
              {typeof score === "number" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="inline-flex items-baseline gap-2 px-5 py-2.5 border border-[#C8A96E]/35 rounded-full bg-black/30 backdrop-blur-sm"
                >
                  <span
                    className="font-display italic text-[#C8A96E] leading-none"
                    style={{ fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 400 }}
                  >
                    {score}
                  </span>
                  <span className="font-body text-white/40 text-[11px] uppercase tracking-[0.25em]">
                    / {maxScore} Rating
                  </span>
                </motion.div>
              )}

              {tier && (
                <div className="flex items-center gap-3">
                  <span aria-hidden className="block w-6 h-px bg-[#C8A96E]/35" />
                  <span
                    className="font-body uppercase tracking-[0.32em] text-[#C8A96E]"
                    style={{ fontSize: "clamp(10px, 0.95vw, 12px)" }}
                  >
                    {tier}
                  </span>
                  <span aria-hidden className="block w-6 h-px bg-[#C8A96E]/35" />
                </div>
              )}
            </div>
          </FadeUp>
        )}

        {/* Optional Description Statement */}
        {description && (
          <FadeUp delay={0.38}>
            <p
              className="font-display italic text-white/75 mx-auto"
              style={{
                fontSize: "clamp(18px, 2vw, 26px)",
                fontWeight: 400,
                lineHeight: 1.4,
                maxWidth: "640px",
                marginTop: "clamp(8px, 1vw, 14px)",
              }}
            >
              {description}
            </p>
          </FadeUp>
        )}

        {/* Disclaimer - klar machen, dass Trophy-Artwork den Awarding-Bodies gehört */}
        <FadeUp delay={0.46}>
          <div className="mt-6 md:mt-8 max-w-[640px] mx-auto">
            <div
              className="h-px mb-3 md:mb-4"
              style={{ background: "rgba(200,169,110,0.15)" }}
              aria-hidden
            />
            <p className="font-body text-white/35 text-[11px] leading-snug">
              Awarded by {body} ({year}).
              <br />
              Trophy artwork remains the property of {body}.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
