"use client";

/**
 * JellyButtonKickflip — single-shot 3D kickflip on hover.
 *
 * Behaviour (matches the TypeGPU jelly-slider reference video):
 *   1. On `mouseenter`, the pill rises off the surface (translateY)
 *      and rotates a full 360° around its long horizontal axis
 *      (rotateX) — visually identical to a skateboard kickflip.
 *   2. The flip is one-shot, ~800 ms, then the pill settles back at
 *      rest. Hovering again replays the flip.
 *   3. The flip is driven by a CSS `@keyframes` animation (defined in
 *      `globals.css`) toggled via a `.rv-kickflip-pill--active` class
 *      so re-entry mid-animation doesn't cut the rotation short — the
 *      class is cleared on `animationend`.
 *
 * Why CSS, not WebGPU: the TypeGPU jelly-slider source is a deformable
 * Bezier-track slider, *not* a kickflipping button. A faithful port
 * would give a different widget (and require WebGPU, which ~10–15% of
 * UK mobile users still don't have). CSS 3D transforms reproduce the
 * visible kickflip behaviour pixel-faithfully and run everywhere.
 *
 * Accessibility: respects `prefers-reduced-motion` — when the user has
 * that preference enabled, the keyframe animation is suppressed and
 * the button stays at rest (still clickable, still styled the same).
 */

import { ReactNode, useState } from "react";

interface JellyButtonKickflipProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

export function JellyButtonKickflip({
  href,
  children,
  onClick,
}: JellyButtonKickflipProps) {
  /** True while the kickflip animation is running. Toggled on by
   *  mouse-enter (only when the flip isn't already in flight) and off
   *  on `animationend`. Letting the animation complete before the next
   *  trigger avoids jarring mid-rotation restarts. */
  const [flipping, setFlipping] = useState(false);

  return (
    <span className="rv-kickflip-stage">
      <a
        href={href}
        onClick={onClick}
        onMouseEnter={() => {
          if (!flipping) setFlipping(true);
        }}
        onAnimationEnd={() => setFlipping(false)}
        className={
          "btn-cta rv-kickflip-pill" +
          (flipping ? " rv-kickflip-pill--active" : "")
        }
      >
        <span className="rv-kickflip-label">{children}</span>
      </a>
    </span>
  );
}
