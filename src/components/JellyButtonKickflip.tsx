"use client";

/**
 * JellyButtonKickflip — gold-metaball hover + triple-kickflip click.
 *
 * The hero "Shop" CTA combines two effects:
 *
 *   1) HOVER — gold metaballs fill the pill from the cursor position.
 *      A <canvas> inside the pill renders two metaballs via the
 *      classic blur+contrast goo trick (alpha mask, then source-in
 *      tint to Ridgeview gold). The cursor follower spring-lerps
 *      toward the mouse with viscous mass. The pill itself ALSO
 *      pops forward in 3D (translateZ +12px) so it reads as
 *      "elevated" without any Y motion — stays on the horizontal
 *      page line.
 *
 *   2) CLICK — pill rotates 1080° around its long X-axis (triple
 *      kickflip) over ~1.1 s with a small Z pop at the apex. No Y
 *      motion. Hover canvas freezes during the flip (mouse updates
 *      are ignored) so the metaballs don't spasm under rotation.
 *      Navigation runs on flip completion.
 *
 * The canvas + the kickflip share the same `rAF` loop pattern from
 * the standalone `JellyButtonCanvas` (preserved in
 * `_archive/jelly-2d-gold-fill/`) and the kickflip animation logic
 * lives in this file's own rAF driver. They coordinate through the
 * `flippingRef` flag.
 *
 * Accessibility: `prefers-reduced-motion: reduce` short-circuits the
 * flip entirely — navigation runs immediately on click, and the
 * hover canvas still works (motion-reduced users still get the
 * gentle goo fill, no rotation).
 */

import { MouseEvent, ReactNode, useEffect, useRef } from "react";

interface JellyButtonKickflipProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

/** Click flip duration. */
const FLIP_DURATION_MS = 1100;
/** Full turns of the rotateX during the flip (3 = triple kickflip). */
const FLIP_TURNS = 3;
/** Peak translateZ at the apex of the click flip (px). */
const FLIP_Z_PEAK = 36;
/** Hover translateZ — the "rise" with no Y motion. */
const HOVER_Z = 12;
/** Lerp factor for the cursor-following metaballs (0..1). */
const HOVER_LERP = 0.22;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function JellyButtonKickflip({
  href,
  children,
  onClick,
}: JellyButtonKickflipProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** Cached canvas logical dims so the hover tick doesn't read
   *  getBoundingClientRect every frame (which would be misleading
   *  during the 3D flip since the projected bounds shrink as the
   *  pill rotates edge-on). Updated only on resize events. */
  const dims = useRef({ w: 0, h: 0 });
  /** Latest cursor position (relative to pill) + hover flag. */
  const mouse = useRef({ x: 0, y: 0, hover: false });
  /** Spring-lerped follower for the metaballs. */
  const blob = useRef({ x: 0, y: 0, scale: 0 });
  /** Guard against re-trigger while a flip is in flight. */
  const flippingRef = useRef(false);
  /** Active rAF id for the hover canvas loop. */
  const hoverRafRef = useRef<number | null>(null);

  // Hover canvas — gold metaballs that follow the cursor and fuse
  // via the blur+contrast goo trick. rAF auto-halts when at rest.
  useEffect(() => {
    const anchor = anchorRef.current;
    const canvas = canvasRef.current;
    if (!anchor || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = anchor.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dims.current.w = rect.width;
      dims.current.h = rect.height;
      if (blob.current.x === 0 && blob.current.y === 0) {
        blob.current.x = rect.width / 2;
        blob.current.y = rect.height / 2;
      }
    };
    resizeCanvas();

    const tick = () => {
      // Pause spring updates during the click flip — the pill is
      // rotating; the metaballs stay frozen so they don't spasm.
      if (!flippingRef.current) {
        blob.current.x += (mouse.current.x - blob.current.x) * HOVER_LERP;
        blob.current.y += (mouse.current.y - blob.current.y) * HOVER_LERP;
        const targetScale = mouse.current.hover ? 1 : 0;
        blob.current.scale += (targetScale - blob.current.scale) * 0.18;
      }

      const { w, h } = dims.current;
      ctx.clearRect(0, 0, w, h);
      const sc = Math.max(0, blob.current.scale);
      if (sc > 0.01) {
        // Pass 1: white blobs through blur+contrast → crisp alpha
        // mask where two overlapping balls fuse via goo.
        const blurPx = Math.max(3, Math.min(w, h) * 0.12);
        ctx.filter = `blur(${blurPx}px) contrast(22)`;
        ctx.fillStyle = "#ffffff";

        // Main blob — sized so sc=1 fully covers the pill.
        const r1 = Math.max(w, h) * 0.6 * sc;
        ctx.beginPath();
        ctx.arc(blob.current.x, blob.current.y, r1, 0, Math.PI * 2);
        ctx.fill();

        // Trailer biased toward raw cursor — stretches the goo
        // toward the cursor at high mouse velocity.
        const r2 = Math.min(w, h) * 0.65 * sc;
        const tx = blob.current.x + (mouse.current.x - blob.current.x) * 0.45;
        const ty = blob.current.y + (mouse.current.y - blob.current.y) * 0.45;
        ctx.beginPath();
        ctx.arc(tx, ty, r2, 0, Math.PI * 2);
        ctx.fill();

        // Pass 2: re-tint the alpha mask with Ridgeview gold.
        ctx.filter = "none";
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = "#C8A96E";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      } else {
        ctx.filter = "none";
      }

      const stillAnimating =
        flippingRef.current ||
        mouse.current.hover ||
        blob.current.scale > 0.005 ||
        Math.hypot(
          blob.current.x - mouse.current.x,
          blob.current.y - mouse.current.y,
        ) > 0.5;

      if (stillAnimating) {
        hoverRafRef.current = requestAnimationFrame(tick);
      } else {
        hoverRafRef.current = null;
      }
    };

    const startLoop = () => {
      if (hoverRafRef.current == null) {
        hoverRafRef.current = requestAnimationFrame(tick);
      }
    };
    (canvas as HTMLCanvasElement & { __startLoop?: () => void }).__startLoop =
      startLoop;

    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (hoverRafRef.current != null) cancelAnimationFrame(hoverRafRef.current);
      hoverRafRef.current = null;
    };
  }, []);

  const updateMouse = (
    e: MouseEvent<HTMLAnchorElement>,
    hover: boolean,
  ) => {
    if (flippingRef.current) return; // ignore cursor while flipping
    const anchor = anchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
    mouse.current.hover = hover;
    const c = canvasRef.current as
      | (HTMLCanvasElement & { __startLoop?: () => void })
      | null;
    c?.__startLoop?.();
  };

  /** Triple kickflip — owns the pill's transform for the duration. */
  const playFlip = (onComplete: () => void) => {
    const el = anchorRef.current;
    if (!el || flippingRef.current) return;
    flippingRef.current = true;
    el.classList.add("rv-kickflip-pill--active");
    // Suspend CSS transitions on transform; rAF writes per-frame.
    el.style.transition = "none";

    let start: number | null = null;
    const tickFlip = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / FLIP_DURATION_MS, 1);
      const eased = easeInOutCubic(progress);
      const angle = eased * 360 * FLIP_TURNS;
      const z = Math.sin(progress * Math.PI) * FLIP_Z_PEAK;
      el.style.transform = `translateZ(${z}px) rotateX(${angle}deg)`;
      if (progress < 1) {
        requestAnimationFrame(tickFlip);
      } else {
        // Tidy up — let the CSS hover rule (with its translateZ Z-pop)
        // take over again. Removing the `--active` class on the same
        // tick prevents the CSS transition from interpolating
        // backward through 540° on rotation reset.
        el.style.transform = "";
        el.style.transition = "";
        el.classList.remove("rv-kickflip-pill--active");
        flippingRef.current = false;
        onComplete();
      }
    };
    requestAnimationFrame(tickFlip);
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (flippingRef.current) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const navigate = () => {
      if (onClick) onClick();
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
        onMouseEnter={(e) => updateMouse(e, true)}
        onMouseMove={(e) => updateMouse(e, true)}
        onMouseLeave={(e) => updateMouse(e, false)}
        className="btn-cta rv-kickflip-pill"
        style={{ ["--rv-kickflip-hover-z" as string]: `${HOVER_Z}px` }}
      >
        <canvas
          ref={canvasRef}
          className="rv-kickflip-pill__canvas"
          aria-hidden
        />
        <span className="rv-kickflip-label">{children}</span>
      </a>
    </span>
  );
}
