/**
 * CartIcon — woven basket with a bottle + grape cluster sitting in it.
 *
 * Hand-designed mark provided by the user (2026-05-15). 100×100
 * viewBox; all strokes / fills use `currentColor` so the icon
 * inherits the Navbar's themed colour (white/65 → gold on hover).
 *
 * Composition (back to front):
 *   1. Curved bottle handle / hoop arching over the basket top.
 *   2. Wine bottle tilted -15°, leaning into the basket.
 *   3. Grape cluster with a small stem, sitting on the basket's
 *      right rim.
 *   4. Basket rim — flat rounded bar across the middle.
 *   5. Three horizontal rows of weave rectangles forming the
 *      trapezoidal body, narrowing toward the base.
 */

import { SVGProps } from "react";

export function CartIcon({
  size = 22,
  ...rest
}: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      aria-hidden
      {...rest}
    >
      {/* Handle / hoop arc — stroke kept slim (was 8, retuned 2026-05-15
          to 5) so the bottle neck + grape cluster silhouettes still read
          as separate shapes at navbar render size. With strokeWidth 8 on
          a 30-36 px icon, the handle's 2.4 px stroke merged with the
          bottle's narrow neck (~1.2 px) into a single white blob. */}
      <path
        d="M 22 50 C 22 5 78 5 78 50"
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
      />

      {/* Wine bottle (tilted -15° in the basket) */}
      <g transform="rotate(-15 35 45)">
        <path
          d="M 26 55 L 26 30 C 26 23 30 20 30 14 L 30 8 C 30 6 32 5 34 5 C 36 5 38 6 38 8 L 38 14 C 38 20 42 23 42 30 L 42 55 Z"
          fill="currentColor"
          stroke="none"
        />
      </g>

      {/* Grape cluster stem */}
      <path
        d="M 66 30 Q 70 24 78 26"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* Grape cluster (8 berries) */}
      <circle cx="62" cy="35" r="5" fill="currentColor" stroke="none" />
      <circle cx="72" cy="36" r="5" fill="currentColor" stroke="none" />
      <circle cx="58" cy="44" r="5" fill="currentColor" stroke="none" />
      <circle cx="68" cy="45" r="5" fill="currentColor" stroke="none" />
      <circle cx="76" cy="42" r="5" fill="currentColor" stroke="none" />
      <circle cx="63" cy="52" r="5" fill="currentColor" stroke="none" />
      <circle cx="72" cy="51" r="5" fill="currentColor" stroke="none" />
      <circle cx="68" cy="58" r="5" fill="currentColor" stroke="none" />

      {/* Basket rim */}
      <rect
        x="12"
        y="48"
        width="76"
        height="10"
        rx="5"
        fill="currentColor"
        stroke="none"
      />

      {/* Basket weave — row 1 (3 staves) */}
      <rect x="18" y="62" width="18" height="9" rx="3" fill="currentColor" stroke="none" />
      <rect x="41" y="62" width="18" height="9" rx="3" fill="currentColor" stroke="none" />
      <rect x="64" y="62" width="18" height="9" rx="3" fill="currentColor" stroke="none" />

      {/* Basket weave — row 2 (3 staves, slightly narrower / offset) */}
      <rect x="25" y="75" width="14" height="8" rx="3" fill="currentColor" stroke="none" />
      <rect x="43" y="75" width="14" height="8" rx="3" fill="currentColor" stroke="none" />
      <rect x="61" y="75" width="14" height="8" rx="3" fill="currentColor" stroke="none" />

      {/* Basket weave — row 3 (2 staves at the base) */}
      <rect x="34" y="87" width="14" height="7" rx="3" fill="currentColor" stroke="none" />
      <rect x="52" y="87" width="14" height="7" rx="3" fill="currentColor" stroke="none" />
    </svg>
  );
}
