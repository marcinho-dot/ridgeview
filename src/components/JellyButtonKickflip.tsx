"use client";

/**
 * JellyButtonKickflip — click-triggered 3D triple kickflip.
 *
 * Behaviour (2026-05-15 rev):
 *   - Hover only LIFTS the pill (translateY upward via CSS, no flip).
 *   - Click triggers the kickflip: pill rotates 1080° around its long
 *     X-axis while STAYING on the horizontal page line (no Y motion;
 *     a small Z pop adds depth toward the camera at the apex).
 *   - The flip is JS-rAF driven so we can:
 *       a) clear the inline transform cleanly at the end (no backward
 *          interpolation through 540° on transition cleanup),
 *       b) sequence navigation right after the flip completes,
 *       c) match exactly the duration the visual demands.
 *   - On click navigation: link default is prevented, flip plays,
 *     then `window.location.href` is set on completion. Hash-anchor
 *     hrefs (`/#wine-collection`) update via hash-change (no reload);
 *     full-page hrefs trigger a normal navigation.
 *   - `prefers-reduced-motion: reduce`: flip is skipped entirely and
 *     navigation happens immediately, just like a plain `.btn-cta`.
 */

import { MouseEvent, ReactNode, useRef } from "react";

interface JellyButtonKickflipProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

/** Total flip duration in ms. ~700 = ~233 ms per full rotation across
 *  the triple flip — snappy but each rotation is still readable. */
const FLIP_DURATION_MS = 700;
/** Number of full rotations. 3 = triple kickflip. */
const FLIP_TURNS = 3;
/** Peak Z translation (px) at the apex of the flip — small enough to
 *  read as "depth pop" without breaking the horizontal-line rule. */
const FLIP_Z_PEAK = 36;

/** Cubic ease-in-out (Material-ish). Used over the flip duration so
 *  the rotation accelerates into the middle and decelerates out. */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function JellyButtonKickflip({
  href,
  children,
  onClick,
}: JellyButtonKickflipProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  /** Guard against re-triggering the flip while one is in flight. */
  const flippingRef = useRef(false);

  /** Runs the JS-driven rAF animation. Resolves once the pill has
   *  fully settled back to its resting state (transform cleared). */
  const playFlip = (onComplete: () => void) => {
    const el = anchorRef.current;
    if (!el || flippingRef.current) return;
    flippingRef.current = true;
    el.classList.add("rv-kickflip-pill--active");
    // Suspend the CSS transition so the per-frame inline transform
    // updates aren't smoothed by it (the easing is in our rAF loop).
    el.style.transition = "none";

    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / FLIP_DURATION_MS, 1);
      const eased = easeInOutCubic(progress);
      const angle = eased * 360 * FLIP_TURNS;
      // Z follows a half-sine — 0 at start/end, peaks mid-flip.
      const z = Math.sin(progress * Math.PI) * FLIP_Z_PEAK;
      el.style.transform = `translateZ(${z}px) rotateX(${angle}deg)`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Tidy up: clear inline transform + transition so the CSS
        // hover/rest rules take over again. Removing the `--active`
        // class on the same tick avoids transition-driven backward
        // interpolation through 540° (which would visually rewind
        // the rotation).
        el.style.transform = "";
        el.style.transition = "";
        el.classList.remove("rv-kickflip-pill--active");
        flippingRef.current = false;
        onComplete();
      }
    };
    requestAnimationFrame(tick);
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (flippingRef.current) return;

    // Honour the user's reduced-motion preference — skip the flip
    // entirely and navigate immediately. The pill still works.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const navigate = () => {
      if (onClick) onClick();
      // Set href via window.location so hash-anchor hrefs work too.
      window.location.href = href;
    };

    if (reduce) {
      navigate();
      return;
    }
    playFlip(navigate);
  };

  return (
    <span className="rv-kickflip-stage">
      <a
        ref={anchorRef}
        href={href}
        onClick={handleClick}
        className="btn-cta rv-kickflip-pill"
      >
        <span className="rv-kickflip-label">{children}</span>
      </a>
    </span>
  );
}
