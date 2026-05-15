"use client";

/**
 * FlowArt + FlowSection — scroll-pinned story narrative.
 *
 * Integrated 2026-05-15 from the 21st.dev "story-scroll" community
 * component (`boudjadjasamira/story-scroll`). Used on `/people` for
 * the People / Winemaker / Founder narrative.
 *
 * Mechanic:
 *   1. Each `<FlowSection>` pins to the viewport while the *next*
 *      section scrolls in behind it (ScrollTrigger pin, no extra
 *      spacing).
 *   2. As the next section enters, its inner card rotates from 30°
 *      to 0° around its bottom-left corner — gives the "story page
 *      tilting into view" feel.
 *
 * Style passed through `style` on each FlowSection (typically
 * backgroundColor + color) so callers can theme each chapter in
 * the Ridgeview CD (dark surfaces + gold + cream).
 *
 * Respects `prefers-reduced-motion: reduce` — pin + rotate are
 * skipped, the sections scroll normally.
 */

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  "aria-label"?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  "aria-label": ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    className={cx("relative min-h-screen w-full overflow-hidden", className)}
  >
    <div
      data-flow-inner
      className={cx(
        "flow-art-container relative flex min-h-screen w-full flex-col justify-start gap-6 px-[4vw]",
        // pt clears the 80 px fixed navbar (clamp 96-144px);
        // pb clears the ~80 px mobile-only BottomNav bar.
        "pt-[clamp(6rem,10vw,9rem)] pb-[clamp(5.5rem,6vw,7rem)]",
        "will-change-transform",
      )}
      style={{ transformOrigin: "bottom left", ...style }}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

const childCount = (children: React.ReactNode) =>
  React.Children.count(children);

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  "aria-label": ariaLabel = "Story scroll",
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          "[data-flow-section]",
        ),
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });

        const inner = section.querySelector<HTMLElement>(".flow-art-container");
        if (!inner) return;

        if (i > 0) {
          gsap.set(inner, { rotation: 30, transformOrigin: "bottom left" });
          const tween = gsap.to(inner, {
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 25%",
              scrub: true,
            },
          });
          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        if (i < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
            }),
          );
        }
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((t) => t.kill());
      };
    },
    {
      scope: containerRef,
      dependencies: [childCount(children), reducedMotion],
    },
  );

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx("w-full overflow-x-hidden", className)}
    >
      {children}
    </main>
  );
};

export default FlowArt;
