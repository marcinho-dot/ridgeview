"use client";

/**
 * JellyButtonCss — 3D lift + cursor-driven tilt, pure CSS transitions.
 *
 * Heritage: inspired by the Software-Mansion TypeGPU "jelly slider"
 * Instagram demo. We can't do real WebGPU SDF raymarching for the
 * actual liquid jelly slider deformation, but the visible *button*
 * behaviour — pill lifts off the surface and tilts in 3D toward the
 * cursor — is fully reproducible with CSS 3D transforms:
 *
 *   1. The wrapper has `perspective` so child 3D transforms have depth.
 *   2. On hover, the pill: translateY (lifts upward), translateZ
 *      (comes toward camera), rotateX/Y (tilts based on cursor offset
 *      from button centre), and box-shadow grows (suggests elevation).
 *   3. A cubic-bezier overshoot easing gives the spring-back rebound
 *      from `RIDGEVIEW/.claude/CLAUDE.md` — same curve as `.btn-cta`
 *      release animation.
 *
 * This variant uses pure CSS transitions (no rAF loop). Movement
 * follows the cursor with a fixed transition duration — fast and
 * predictable, but less elastic than the spring-physics variant.
 *
 * Universal browser support: CSS perspective + 3D transforms work in
 * Safari 9+, all Chromium, all Firefox.
 */

import { MouseEvent, ReactNode, useRef, useState } from "react";

interface JellyButtonCssProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

/** Max tilt angle (deg) when the cursor is at the extreme edge of the
 *  button. Higher = more dramatic flip; lower = more reserved.
 *  Tuned to feel like the Instagram video without overshooting the
 *  scholarly Ridgeview voice. */
const MAX_TILT = 22;
/** How much the button rises (px) on hover — the "lift". */
const LIFT_Y = 8;
/** How much it pops toward the camera (px) on hover. */
const LIFT_Z = 36;

export function JellyButtonCss({ href, children, onClick }: JellyButtonCssProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  /** Tilt is stored as raw rotation degrees + a `hover` flag so the
   *  spring-rest position is just `{ rx: 0, ry: 0, hover: false }`. */
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, hover: false });

  const update = (e: MouseEvent<HTMLAnchorElement>, hover: boolean) => {
    if (!ref.current) {
      setTilt((t) => ({ ...t, hover }));
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    // Cursor position normalised to [-0.5, 0.5] around button centre.
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      // rotateX: positive value pushes the TOP edge toward camera, so
      // we invert dy so that cursor-on-top tilts the front toward the
      // cursor (i.e. front lifts toward the cursor). Standard 3D-card
      // hover convention.
      rx: -dy * MAX_TILT * 2,
      ry: dx * MAX_TILT * 2,
      hover,
    });
  };

  const onLeave = () => setTilt({ rx: 0, ry: 0, hover: false });

  const transform = tilt.hover
    ? `translate3d(0, ${-LIFT_Y}px, ${LIFT_Z}px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
    : "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)";

  return (
    <span className="rv-jelly3d-stage">
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseEnter={(e) => update(e, true)}
        onMouseMove={(e) => update(e, true)}
        onMouseLeave={onLeave}
        className="btn-cta rv-jelly3d-pill"
        style={{ transform }}
      >
        <span className="rv-jelly3d-label">{children}</span>
      </a>
    </span>
  );
}
