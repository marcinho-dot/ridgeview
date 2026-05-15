/**
 * CartIcon — woven basket with a grape cluster sitting in it.
 *
 * Custom SVG built from scratch in the Lucide line-icon style:
 *   - 24×24 viewBox, no fill, `currentColor` stroke
 *   - 1.5 px stroke with round caps + joins
 *   - Reads clearly down to 18 px (navbar size)
 *
 * Why a custom mark: Lucide ships a `Grape` and a `ShoppingBasket`
 * icon separately, but neither captures Ridgeview's "estate-grown
 * grapes in a wine-country wicker basket" association. Combined
 * mark says "wine cart" in one glance.
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
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {/* Tiny stem + leaf at the very top of the cluster */}
      <path d="M13 4 L 14 2.8" />
      <path d="M14.2 2.5 C 15.2 2.2, 16 2.6, 15.6 3.6 C 15.2 4.1, 14.5 4.1, 14 3.9" />

      {/* Grape cluster — 6 circles in an inverted-triangle pyramid */}
      <circle cx="9.5" cy="5" r="1.1" />
      <circle cx="12" cy="5" r="1.1" />
      <circle cx="14.5" cy="5" r="1.1" />
      <circle cx="10.75" cy="7" r="1.1" />
      <circle cx="13.25" cy="7" r="1.1" />
      <circle cx="12" cy="9" r="1.1" />

      {/* Basket rim — flat top edge with subtle ellipse cap */}
      <path d="M3.5 11.5 Q 12 12.8, 20.5 11.5" />
      <path d="M3.5 11.5 L 20.5 11.5" />

      {/* Basket body — trapezoidal, narrowing toward the base */}
      <path d="M3.5 11.5 L 5.7 21 L 18.3 21 L 20.5 11.5" />

      {/* Weave — three vertical staves angled with the basket walls */}
      <path d="M7.5 11.7 L 8 21" />
      <path d="M12 11.7 L 12 21" />
      <path d="M16.5 11.7 L 16 21" />

      {/* Weave — two horizontal bands that follow the trapezoidal curve */}
      <path d="M4.8 14.8 Q 12 16, 19.2 14.8" />
      <path d="M5.4 18 Q 12 19.1, 18.6 18" />
    </svg>
  );
}
