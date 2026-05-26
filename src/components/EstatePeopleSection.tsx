"use client";

/**
 * EstatePeopleSection - adapted from 21st.dev's
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

  // Image clip-path wipes in from the LEFT - start fully clipped
  // from the right (right edge hides the whole image), end fully
  // revealed.
  const imageClip = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  return (
    // OUTER row stage. Padding only - no `min-h-screen` (it was
    // creating a 100vh empty band between The Estate and The People
    // sections). The parallax animation still completes naturally
    // as the user scrolls past the row.
    <div ref={ref} className="py-16 md:py-24">
      {/* INNER row: flex-col on mobile, flex-row on desktop with
          items-STRETCH so the image column matches the text column's
          height (per-row alignment). The aspect ratio applies on
          mobile (flex-col, no stretch context) but is dropped on
          desktop so the image can fill the text-driven height.
          min-h enforced (2026-05-18) so both rows share the same
          row height — image + text columns lock to a single visual
          rhythm whether the text is shorter or longer. */}
      <div
        className={`w-full flex flex-col items-center gap-10 md:gap-16 lg:gap-20 md:items-stretch min-h-[480px] md:min-h-[600px] ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Text column - vertically centred inside the locked
            row height so shorter copy (The People) doesn't hug
            the top while the image fills the full panel. */}
        <motion.div
          style={{ y: textY }}
          className="flex-1 w-full max-w-[520px] md:flex md:flex-col md:justify-center"
        >
          {/* Bumped 2026-05-18 so the text block reaches ≥80% of the
              image height on desktop (image is locked to 600px via the
              row min-h). Headline larger + bodies slightly bigger +
              loose line-leading on bodies + bigger inter-paragraph
              margins — together adds ~150px to the natural text
              height, bringing it to ~490-520px on desktop. */}
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-6"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            {kicker}
          </p>

          <h2
            className="font-display italic text-white leading-[1.08] mb-8"
            style={{ fontSize: "clamp(32px, 4vw, 60px)", fontWeight: 400 }}
          >
            {headline}
          </h2>

          {bodies.map((body, i) => (
            <p
              key={i}
              className={`font-body leading-[1.85] ${
                i === 0 ? "text-white/65" : "text-white/50"
              } ${i < bodies.length - 1 ? "mb-7" : ""}`}
              style={{
                fontSize:
                  i === 0
                    ? "clamp(15px, 1.5vw, 18px)"
                    : "clamp(14px, 1.3vw, 16px)",
                fontWeight: 400,
                maxWidth: "480px",
              }}
            >
              {body}
            </p>
          ))}
        </motion.div>

        {/* Image column - aspect ratio applies on mobile (when
            flex-col, with a 420px width cap). On desktop, both the
            aspect ratio AND the width cap are dropped (md:aspect-auto
            + md:max-w-none) so the image stretches to match the text
            column's height via items-stretch on the parent. */}
        <motion.div
          style={{ opacity: imageOpacity, clipPath: imageClip }}
          className={`group relative overflow-hidden rounded-sm w-full max-w-[420px] md:max-w-none mx-auto md:mx-0 md:flex-1 ${imageAspect} md:aspect-auto`}
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
    <section className="bg-[#010101] pt-16 md:pt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">

        {/* Row 1 - The Estate: image left / text right on desktop */}
        <ParallaxRow
          kicker="[ The Estate ]"
          headline={
            <>
              Beneath the <span className="text-[#C8A96E]">South Downs</span>{" "}
              ridge.
            </>
          }
          bodies={[
            "Over 17,000 vines on the home estate at Ditchling Common, East Sussex - perfectly positioned to grow Chardonnay, Pinot Noir and Pinot Meunier on chalk that runs from the South Downs, beneath the Channel, into northern France.",
            "England’s first underground wine cellars, built in 1999, require no energy - relying on natural ambient temperature. Expanded in 2020 to store one million bottles. Rainwater harvesting, solar energy, and a Bio-Bubble system that has naturally cleaned over 22 million litres of waste water since inception.",
          ]}
          imageSrc="/images/estate-vineyard.jpg"
          imageAlt="Ridgeview vineyard with the South Downs ridge in the distance"
          imageAspect="aspect-[4/5]"
          reverse
        />

        {/* Row 2 - The People: text left / image right on desktop */}
        <ParallaxRow
          kicker="[ The People ]"
          headline={
            <>
              Passionate.{" "}
              <span className="text-[#C8A96E]">Purpose-driven.</span>
            </>
          }
          bodies={[
            "A dedicated team of viticulturists, winemakers and hospitality professionals - working together to shape the future of English sparkling wine. From vineyard management to cellar craft, every hand plays a part.",
            "Ridgeview believes in passion, purpose and a commitment to excellence. The team includes second-generation family members who grew up among the vines - alongside specialist winemakers and a hospitality crew devoted to making every visit memorable.",
          ]}
          imageSrc="/images/harvest-walk.jpg"
          imageAlt="Ridgeview team member walking through the vineyard during harvest, carrying picking buckets"
          imageAspect="aspect-[4/5]"
        />

      </div>
    </section>
  );
}
