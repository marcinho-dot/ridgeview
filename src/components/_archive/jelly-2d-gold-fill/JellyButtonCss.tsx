"use client";

/**
 * JellyButtonCss — SVG-goo-filter jelly button.
 *
 * Reuses the existing `.btn-cta` look (frosted glass + gold border) for
 * the resting state, then overlays a goo-filtered gold blob layer that
 * follows the cursor with elastic spring physics.
 *
 * Two blobs (main + small trailer) inside the same goo container fuse
 * via the global `#rv-goo-filter` filter, giving the cursor follower a
 * "liquid drag" feel — the trailer lags slightly behind the main blob
 * and merges with it through the goo when they're close.
 *
 * Universal browser support: SVG goo filter works in Safari 9+, all
 * Chromium, all Firefox. No WebGPU dependency.
 *
 * Spring-back press feedback is identical to `.btn-cta` (inherited from
 * that class), preserving the dual-transition press/release rhythm
 * documented in `RIDGEVIEW/.claude/CLAUDE.md`.
 */

import { MouseEvent, ReactNode, useRef, useState } from "react";

interface JellyButtonCssProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

export function JellyButtonCss({ href, children, onClick }: JellyButtonCssProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, hover: false });

  const update = (e: MouseEvent<HTMLAnchorElement>, hover: boolean) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      hover,
    });
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseEnter={(e) => update(e, true)}
      onMouseMove={(e) => update(e, true)}
      onMouseLeave={(e) => update(e, false)}
      className="btn-cta rv-jelly-css"
    >
      <span className="rv-jelly-css__goo" aria-hidden>
        <span
          className="rv-jelly-css__blob rv-jelly-css__blob--main"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: `translate(-50%, -50%) scale(${pos.hover ? 1 : 0})`,
          }}
        />
        <span
          className="rv-jelly-css__blob rv-jelly-css__blob--trail"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: `translate(-50%, -50%) scale(${pos.hover ? 0.55 : 0})`,
          }}
        />
      </span>
      <span className="rv-jelly-css__label">{children}</span>
    </a>
  );
}
