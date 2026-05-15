/**
 * CartIcon — woven basket with bottle + grape cluster.
 *
 * Final hand-designed mark supplied by the user (2026-05-16). The
 * source PNG (`public/icons/cart-basket.png`) is a pre-processed
 * alpha mask: the basket silhouette is opaque white, everything
 * else is transparent. We render it as a CSS `mask-image` on a
 * `background-color: currentColor` span — so the basket inherits
 * the navbar's themed colour exactly like the previous inline SVG
 * did (white/65 at rest, gold on hover, gold-on-cream on press,
 * etc.). No filter hacks, no colour drift.
 *
 * The original PNG aspect ratio (~0.83 w/h) is preserved by the
 * intrinsic mask sizing; the container is square (size × size)
 * with `mask-size: contain` so the basket sits centred with a
 * sliver of whitespace on either side of the handle. This matches
 * how the previous SVG icon laid out and keeps the CartButton's
 * badge anchor (top-0 right-0) reliable.
 */

import { HTMLAttributes } from "react";
import { basePath } from "@/lib/basePath";

interface CartIconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Width / height in pixels of the (square) icon box. Default 22. */
  size?: number;
}

export function CartIcon({ size = 22, style, ...rest }: CartIconProps) {
  const maskUrl = `${basePath}/icons/cart-basket.png`;
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${maskUrl})`,
        maskImage: `url(${maskUrl})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
      {...rest}
    />
  );
}
