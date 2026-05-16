"use client";

/**
 * EstatePeopleSection — adapted from 21st.dev's
 * parallax-scroll-feature-section to Ridgeview's dark editorial
 * language.
 *
 * Each row pins as the user scrolls into it:
 *   - the text block translates downward (subtle 50px settle)
 *   - the image fades in AND wipes in from the left via
 *     animated `clip-path: inset()`
 *
 * Rows alternate (Estate: image left / text right;
 * People: text left / image right) on desktop. Mobile stacks
 * text-then-image regardless of `reverse`.
 *
 * Hooks-in-loop note: the 21st.dev source instantiates useRef +
 * useScroll inside `.map()` which violates the Rules of Hooks.
 * We extract each row to its own component (ParallaxRow) so the
 * hooks are top-level per row.
 */

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { basePath } from "@/lib/basePath";

interface ParallaxRowProps {
  kicker: string;
  headline: ReactNode;
  bodies: ReactNode[];
  imageSrc: string;
  imageAlt: string;
  /** Tailwind aspect class used on MOBILE only (e.g.
   *  "aspect-[3/4]" for portrait, "aspect-[4/3]" for landscape).
   *  On desktop the image drops its aspect constraint and stretches
   *  to match the text column's height via `items-stretch` on the
   *  parent flex. */
  imageAspect: string;
  /** When true, image sits on the LEFT on desktop (text right). */
  reverse?: boolean;
}

function ParallaxRow({
  kicker,
  headline,
  bodies,
  imageSrc,
  imageAlt,
  imageAspect,
  reverse = false,
}: ParallaxRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  // Text settles into place (-50px above natural → 0).
  const textY = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  // Image fades in across the first 70% of progress.
  const imageOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  // Image clip-path wipes in from the LEFT — start fully clipped
  // from the right (right edge hides the whole image), end fully
  // revealed.
  const imageClip = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  return (
    // OUTER stage: min-h-screen gives the parallax effect scroll
    // room. items-center vertically centers the inner row inside
    // that stage.
    <div ref={ref} className="min-h-screen flex items-center py-20 md:py-28">
      {/* INNER row: on mobile flex-col with the image at its
          natural aspect ratio. On desktop flex-row with
          `items-stretch` so the image column stretches to MATCH
          the text column's natural height (per user direction:
          image should track text height on desktop). */}
      <div
        className={`w-full flex flex-col items-center gap-10 md:gap-20 lg:gap-28 md:items-stretch ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Text column */}
        <motion.div
          style={{ y: textY }}
          className="flex-1 w-full max-w-[520px]"
        >
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-5"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            {kicker}
          </p>

          <h2
            className="font-display italic text-white leading-[1.08] mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)", fontWeight: 400 }}
          >
            {headline}
          </h2>

          {bodies.map((body, i) => (
            <p
              key={i}
              className={`font-body leading-relaxed ${
                i === 0 ? "text-white/60" : "text-white/45"
              } ${i < bodies.length - 1 ? "mb-5" : ""}`}
              style={{
                fontSize:
                  i === 0
                    ? "clamp(14px, 1.4vw, 17px)"
                    : "clamp(13px, 1.25vw, 15px)",
                fontWeight: 300,
                maxWidth: "480px",
              }}
            >
              {body}
            </p>
          ))}
        </motion.div>

        {/* Image column — mobile keeps its aspect ratio; desktop
            drops it and stretches to the text height (items-stretch
            on parent + md:aspect-auto here) */}
        <motion.div
          style={{ opacity: imageOpacity, clipPath: imageClip }}
          className={`group relative overflow-hidden rounded-sm w-full max-w-[420px] md:max-w-[520px] mx-auto md:mx-0 md:flex-1 ${imageAspect} md:aspect-auto`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}${imageSrc}`}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 border border-white/[0.06] rounded-sm" />
        </motion.div>
      </div>
    </div>
  );
}

export function EstatePeopleSection() {
  return (
    <section className="bg-[#010101]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">

        {/* Row 1 — The Estate: image left / text right on desktop */}
        <ParallaxRow
          kicker="[ The Estate ]"
          headline={
            <>
              Beneath the <span className="text-[#C8A96E]">South Downs</span>{" "}
              ridge.
            </>
          }
          bodies={[
            "Over 17,000 vines on the home estate at Ditchling Common, East Sussex — perfectly positioned to grow Chardonnay, Pinot Noir and Pinot Meunier on the same ancient chalk that defines Champagne.",
            "England’s first underground wine cellars, built in 1999, require no energy — relying on natural ambient temperature. Expanded in 2020 to store one million bottles. Rainwater harvesting, solar energy, and a Bio-Bubble system that has naturally cleaned over 22 million litres of waste water since inception.",
          ]}
          imageSrc="/images/estate-vineyard.jpg"
          imageAlt="Ridgeview vineyard with the South Downs ridge in the distance"
          imageAspect="aspect-[4/3]"
          reverse
        />

        {/* Row 2 — The People: text left / image right on desktop */}
        <ParallaxRow
          kicker="[ The People ]"
          headline={
            <>
              Passionate.{" "}
              <span className="text-[#C8A96E]">Purpose-driven.</span>
            </>
          }
          bodies={[
            "A dedicated team of viticulturists, winemakers and hospitality professionals — working together to shape the future of English sparkling wine. From vineyard management to cellar craft, every hand plays a part.",
            "Ridgeview believes in passion, purpose and a commitment to excellence. The team includes second-generation members who grew up among the vines — alongside specialist winemakers and a hospitality crew devoted to making every visit memorable.",
          ]}
          imageSrc="/images/harvest-walk.jpg"
          imageAlt="Ridgeview team member walking through the vineyard during harvest, carrying picking buckets"
          imageAspect="aspect-[3/4]"
        />

      </div>
    </section>
  );
}
