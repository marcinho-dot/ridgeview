/**
 * CartIcon — woven basket with a bottle + grape cluster sitting in it.
 *
 * Hand-designed mark, redrawn 2026-05-15 to match the user's second
 * reference screenshot. 100×100 viewBox; everything uses `currentColor`
 * so the icon inherits the navbar colour (white at rest, gold on hover).
 *
 * Composition (back to front, draw order matters):
 *   1. Slim handle hoop arching from rim to rim.
 *   2. Wine bottle standing upright on the LEFT inside the basket —
 *      visible cap, narrow neck, broader body.
 *   3. Small grape cluster (3 berries + tiny stem) on the RIGHT,
 *      tucked against the bottle.
 *   4. Solid horizontal basket rim — long pill across the middle.
 *   5. TWO rows of chunky weave staves forming a trapezoidal body
 *      (row 1: 3 wide staves at the rim, row 2: 2 inset staves at
 *      the base — gives the basket its inward taper).
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
      {/* Handle / hoop arc — drawn first so bottle + grapes sit on top.
          Slimmer stroke (4) than before; the bottle is now upright and
          its neck sits in plane with the handle peak, so they no longer
          fight each other for the same pixel band. */}
      <path
        d="M 22 56 C 22 22 78 22 78 56"
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* Wine bottle — upright, left side of the basket.
          Built top-down: cap (tiny rect on top), neck (4 wide), shoulder
          (curve out), body (12 wide) sitting in the basket. */}
      {/* Cap */}
      <rect
        x="34"
        y="20"
        width="6"
        height="5"
        rx="1"
        fill="currentColor"
        stroke="none"
      />
      {/* Body — single path: neck → shoulder → body, mirrored left/right */}
      <path
        d="M 33 25
           L 33 35
           C 33 38 30 40 30 45
           L 30 58
           L 44 58
           L 44 45
           C 44 40 41 38 41 35
           L 41 25
           Z"
        fill="currentColor"
        stroke="none"
      />

      {/* Grape cluster — 3 berries on the right, tucked into the basket.
          Smaller than before; the previous 8-berry cluster overwhelmed
          the bottle. A 3-berry triangle reads as "grapes" instantly. */}
      {/* Stem */}
      <path
        d="M 62 30 L 62 35"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx="58" cy="42" r="4.5" fill="currentColor" stroke="none" />
      <circle cx="67" cy="42" r="4.5" fill="currentColor" stroke="none" />
      <circle cx="62" cy="50" r="4.5" fill="currentColor" stroke="none" />

      {/* Basket rim — long horizontal pill, full width across.
          Sits at the visual midline of the icon. */}
      <rect
        x="13"
        y="56"
        width="74"
        height="10"
        rx="5"
        fill="currentColor"
        stroke="none"
      />

      {/* Basket weave — row 1: 3 wide staves directly under the rim. */}
      <rect x="16" y="69" width="20" height="11" rx="3" fill="currentColor" stroke="none" />
      <rect x="40" y="69" width="20" height="11" rx="3" fill="currentColor" stroke="none" />
      <rect x="64" y="69" width="20" height="11" rx="3" fill="currentColor" stroke="none" />

      {/* Basket weave — row 2: 2 staves, inset so the basket bottom
          tapers visually (trapezoidal silhouette). */}
      <rect x="26" y="83" width="20" height="11" rx="3" fill="currentColor" stroke="none" />
      <rect x="54" y="83" width="20" height="11" rx="3" fill="currentColor" stroke="none" />
    </svg>
  );
}
