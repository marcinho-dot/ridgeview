"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Testimonial } from "@/data/testimonials";

/**
 * TestimonialSection — Press-Review Pull-Quote für SKU-Pages.
 *
 * Voraussetzungen:
 * - Quelle, Reviewer und Score MÜSSEN sichtbar sein (Brand-Voice-Vorgabe).
 * - Disclaimer-Zeile am Fuß macht klar, dass das ein externes, ungekürztes Zitat ist.
 *
 * Wrap-Pattern auf der Page:
 *   <ScrollReset><TestimonialSection testimonial={getTestimonial("bloomsbury")} /></ScrollReset>
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

interface Props {
  testimonial: Testimonial;
  /** Optional kicker text override (default: [ Press · Recognition ]) */
  kicker?: string;
}

export function TestimonialSection({ testimonial, kicker = "[ Press · Recognition ]" }: Props) {
  const { quote, author, publication, score, maxScore = 100, tier, date, url } = testimonial;

  return (
    <section className="relative bg-[#010101] border-t border-white/[0.06] overflow-hidden">
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)",
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

        {/* Decorative opening quote mark — oversized for proportional impact,
            but height-clamped to the glyph's visible extent so it doesn't push
            the quote down with empty line-box space below */}
        <FadeUp delay={0.1}>
          <div
            aria-hidden
            className="mx-auto font-display italic select-none flex items-start justify-center overflow-visible"
            style={{
              fontSize: "clamp(80px, 11vw, 160px)",
              color: "rgba(200,169,110,0.20)",
              height: "clamp(36px, 4.8vw, 64px)",
              lineHeight: 1,
              marginBottom: "clamp(4px, 0.6vw, 10px)",
            }}
          >
            &ldquo;
          </div>
        </FadeUp>

        {/* The Quote — Pull-Quote in Cormorant Garamond italic */}
        <FadeUp delay={0.18}>
          <blockquote
            cite={url}
            className="font-display italic text-cream"
            style={{
              fontSize: "clamp(22px, 3vw, 42px)",
              fontWeight: 400,
              lineHeight: 1.22,
              letterSpacing: "-0.005em",
              maxWidth: "920px",
              margin: "0 auto",
              marginBottom: "clamp(32px, 3.6vw, 48px)",
            }}
          >
            {quote}
          </blockquote>
        </FadeUp>

        {/* Score Badge + Tier Label (if available) */}
        {typeof score === "number" && (
          <FadeUp delay={0.28}>
            <div className="flex flex-col items-center gap-2 mb-4 md:mb-5">
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

        {/* Attribution */}
        <FadeUp delay={0.32}>
          <div className="flex flex-col items-center gap-1">
            <div
              className="font-body uppercase tracking-[0.32em] text-white/85"
              style={{ fontSize: "clamp(11px, 1.05vw, 13px)" }}
            >
              {author}
            </div>
            <div className="font-display italic text-[#C8A96E]/85" style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}>
              {publication}
              {date ? <span className="text-white/35 not-italic font-body ml-2 tracking-wide">· {date}</span> : null}
            </div>
          </div>
        </FadeUp>

        {/* Disclaimer — verpflichtend, damit Quelle klar erkennbar ist */}
        <FadeUp delay={0.42}>
          <div className="mt-6 md:mt-8 max-w-[640px] mx-auto">
            <div
              className="h-px mb-3 md:mb-4"
              style={{ background: "rgba(200,169,110,0.15)" }}
              aria-hidden
            />
            <p className="font-body text-white/35 text-[11px] leading-snug">
              Excerpt reproduced from an independent press review.
              {url ? (
                <>
                  {" "}
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline decoration-[#C8A96E]/40 underline-offset-4 hover:text-[#C8A96E] hover:decoration-[#C8A96E] transition-colors duration-300"
                  >
                    Read full review &rarr;
                  </a>
                </>
              ) : null}
              <br />
              Original copyright remains with {publication}.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
