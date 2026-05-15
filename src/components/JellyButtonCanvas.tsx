"use client";

/**
 * JellyButtonCanvas — 3D lift + cursor-driven tilt, JS spring physics.
 *
 * Same visual goal as `JellyButtonCss` (3D pill that lifts + tilts
 * toward the cursor) but the tilt + lift values are driven by an
 * rAF spring-lerp loop instead of CSS transitions. The lerp gives a
 * more "viscous" rebound — the pill drifts toward its target with
 * mass, overshoots slightly when the cursor stops moving, then
 * settles. Feels more "alive" than the CSS-transition variant.
 *
 * (Despite the historical filename `…Canvas.tsx`, no <canvas> element
 * is involved anymore — this used to host a Canvas-2D-metaballs
 * goo render before the 2026-05-15 rewrite. The filename stays so the
 * import in HeroSection doesn't churn; the "Canvas / Spring" label in
 * the hero tells the user which physics flavour they're hovering.)
 *
 * Universal browser support: CSS 3D transforms + rAF work everywhere.
 */

import {
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
} from "react";

interface JellyButtonCanvasProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

/** Max tilt angle (deg) when the cursor is at the extreme edge. */
const MAX_TILT = 34;
/** How much the button rises (px) on hover. */
const LIFT_Y = 12;
/** How much it pops toward the camera (px). */
const LIFT_Z = 56;
/** Lerp factor — 0..1, how fast the live values close on the target.
 *  Lower = more inertia / overshoot. 0.18 ≈ 5–6 frames to 70% close. */
const LERP = 0.18;

export function JellyButtonCanvas({ href, children, onClick }: JellyButtonCanvasProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  /** Target tilt + lift values, written by event handlers. */
  const target = useRef({ rx: 0, ry: 0, ty: 0, tz: 0 });
  /** Current animated values (spring-lerped toward target each frame). */
  const live = useRef({ rx: 0, ry: 0, ty: 0, tz: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const tick = () => {
      // Spring-lerp each axis toward its target.
      live.current.rx += (target.current.rx - live.current.rx) * LERP;
      live.current.ry += (target.current.ry - live.current.ry) * LERP;
      live.current.ty += (target.current.ty - live.current.ty) * LERP;
      live.current.tz += (target.current.tz - live.current.tz) * LERP;

      anchor.style.transform =
        `translate3d(0, ${live.current.ty}px, ${live.current.tz}px) ` +
        `rotateX(${live.current.rx}deg) rotateY(${live.current.ry}deg)`;

      // Halt the loop when both target and live values are at rest at 0
      // (cursor has left + spring has fully settled). Small epsilon to
      // avoid micro-jitter forever.
      const isResting =
        Math.abs(target.current.rx) < 0.001 &&
        Math.abs(target.current.ry) < 0.001 &&
        Math.abs(target.current.ty) < 0.001 &&
        Math.abs(target.current.tz) < 0.001 &&
        Math.abs(live.current.rx) < 0.05 &&
        Math.abs(live.current.ry) < 0.05 &&
        Math.abs(live.current.ty) < 0.05 &&
        Math.abs(live.current.tz) < 0.05;

      if (isResting) {
        // Snap to clean zeros so transform doesn't leave a hair of
        // residual rotation on the DOM node.
        live.current.rx = 0;
        live.current.ry = 0;
        live.current.ty = 0;
        live.current.tz = 0;
        anchor.style.transform = "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)";
        rafRef.current = null;
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    // Expose a start-loop hook for event handlers via a ref-attached fn.
    (anchor as HTMLAnchorElement & { __startSpring?: () => void }).__startSpring = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    };

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  const update = (e: MouseEvent<HTMLAnchorElement>, hover: boolean) => {
    const anchor = anchorRef.current as
      | (HTMLAnchorElement & { __startSpring?: () => void })
      | null;
    if (!anchor) return;
    if (!hover) {
      target.current.rx = 0;
      target.current.ry = 0;
      target.current.ty = 0;
      target.current.tz = 0;
    } else {
      const rect = anchor.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width - 0.5;
      const dy = (e.clientY - rect.top) / rect.height - 0.5;
      target.current.rx = -dy * MAX_TILT * 2;
      target.current.ry = dx * MAX_TILT * 2;
      target.current.ty = -LIFT_Y;
      target.current.tz = LIFT_Z;
    }
    anchor.__startSpring?.();
  };

  return (
    <span className="rv-jelly3d-stage">
      <a
        ref={anchorRef}
        href={href}
        onClick={onClick}
        onMouseEnter={(e) => update(e, true)}
        onMouseMove={(e) => update(e, true)}
        onMouseLeave={(e) => update(e, false)}
        className="btn-cta rv-jelly3d-pill rv-jelly3d-pill--spring"
      >
        <span className="rv-jelly3d-label">{children}</span>
      </a>
    </span>
  );
}
