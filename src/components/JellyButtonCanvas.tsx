"use client";

/**
 * JellyButtonCanvas - Canvas 2D metaballs jelly button.
 *
 * Variant of `JellyButtonCss` that renders the liquid follower on a
 * `<canvas>` instead of using an SVG goo filter. Two gold "metaballs"
 * are drawn each frame with `ctx.filter = "blur(...) contrast(...)"`,
 * which softens then re-thresholds the alpha so overlapping balls fuse
 * into a single smooth blob - same trick as the SVG goo, in canvas-land.
 *
 * Key difference vs. the CSS/SVG variant: blob position is updated by
 * JS spring-lerp inside requestAnimationFrame, so the blob trails the
 * cursor with adjustable inertia (lerp factor 0.22 below). This gives
 * a more "viscous fluid" feel - the blob feels like it has mass.
 *
 * Universal browser support: Canvas 2D + `ctx.filter` work in Safari 14+,
 * all Chromium, all Firefox. No WebGPU.
 *
 * Animation loop is GC-friendly: the rAF runs only while the cursor is
 * inside OR the blob hasn't fully shrunk back to zero (so the exit
 * animation completes), then halts itself.
 */

import { MouseEvent, ReactNode, useEffect, useRef } from "react";

interface JellyButtonCanvasProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

export function JellyButtonCanvas({ href, children, onClick }: JellyButtonCanvasProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** Latest mouse position + hover flag, written in event handlers. */
  const mouse = useRef({ x: 0, y: 0, hover: false });
  /** Animated blob state (lerp targets toward mouse). */
  const blob = useRef({ x: 0, y: 0, scale: 0 });
  const rafRef = useRef<number | null>(null);

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
      // Centre the blob on first sizing - so hover starts from middle.
      if (blob.current.x === 0 && blob.current.y === 0) {
        blob.current.x = rect.width / 2;
        blob.current.y = rect.height / 2;
      }
    };
    resizeCanvas();

    const tick = () => {
      const rect = anchor.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Spring-lerp blob position toward mouse + target scale toward
      // hover flag. Lerp factor 0.22 = ~5 frames to ~70% close.
      blob.current.x += (mouse.current.x - blob.current.x) * 0.22;
      blob.current.y += (mouse.current.y - blob.current.y) * 0.22;
      const targetScale = mouse.current.hover ? 1 : 0;
      blob.current.scale += (targetScale - blob.current.scale) * 0.18;

      ctx.clearRect(0, 0, w, h);

      const sc = Math.max(0, blob.current.scale);
      if (sc > 0.01) {
        // ── Two-pass goo render ────────────────────────────────────
        // Pass 1: draw the blobs in WHITE through a blur+contrast
        // filter. The high contrast clips the blurred edges back to
        // a crisp alpha mask where overlapping blobs fuse into one
        // shape. We use white (not gold) here because the contrast
        // filter would over-saturate the gold into yellow.
        //
        // Blur radius is scaled to the smaller canvas dimension so
        // the goo effect stays proportional on tall/short buttons -
        // a fixed 8px blur eats the alpha center on a 44px-tall
        // button. Radii are bumped beyond `min(w,h)*0.5` so the
        // shapes definitely overlap the button bounds when fully
        // expanded (sc=1).
        const blurPx = Math.max(3, Math.min(w, h) * 0.12);
        ctx.filter = `blur(${blurPx}px) contrast(22)`;
        ctx.fillStyle = "#ffffff";

        // Main blob sized to fill the full button at sc=1 (matches the
        // CSS variant's "gold pill filled" hover look). Uses the wider
        // dimension so wide-short pill buttons get full coverage.
        const r1 = Math.max(w, h) * 0.6 * sc;
        ctx.beginPath();
        ctx.arc(blob.current.x, blob.current.y, r1, 0, Math.PI * 2);
        ctx.fill();

        // Smaller trailer biased toward raw cursor position - creates
        // a subtle "drip" / stretch at the cursor side when the user
        // moves quickly across the button.
        const r2 = Math.min(w, h) * 0.65 * sc;
        const tx = blob.current.x + (mouse.current.x - blob.current.x) * 0.45;
        const ty = blob.current.y + (mouse.current.y - blob.current.y) * 0.45;
        ctx.beginPath();
        ctx.arc(tx, ty, r2, 0, Math.PI * 2);
        ctx.fill();

        // Pass 2: re-tint the goo'd alpha mask with Ridgeview gold
        // using source-in composite. The white from pass 1 is
        // replaced with #C8A96E in exactly the masked region - no
        // saturation artefacts.
        ctx.filter = "none";
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = "#C8A96E";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      } else {
        ctx.filter = "none";
      }

      // Stop rAF when fully exited (scale ≈ 0) - saves cycles.
      const stillAnimating =
        mouse.current.hover ||
        blob.current.scale > 0.005 ||
        Math.hypot(blob.current.x - mouse.current.x, blob.current.y - mouse.current.y) > 0.5;

      if (stillAnimating) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    const startLoop = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize);

    // Expose start hook via ref for event handlers below.
    (canvas as HTMLCanvasElement & { __startJellyLoop?: () => void }).__startJellyLoop = startLoop;

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  const updateMouse = (e: MouseEvent<HTMLAnchorElement>, hover: boolean) => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
    mouse.current.hover = hover;
    // Kick the rAF loop if currently halted (e.g. first hover).
    const c = canvasRef.current as
      | (HTMLCanvasElement & { __startJellyLoop?: () => void })
      | null;
    c?.__startJellyLoop?.();
  };

  return (
    <a
      ref={anchorRef}
      href={href}
      onClick={onClick}
      onMouseEnter={(e) => updateMouse(e, true)}
      onMouseMove={(e) => updateMouse(e, true)}
      onMouseLeave={(e) => updateMouse(e, false)}
      className="btn-cta rv-jelly-canvas"
    >
      <canvas ref={canvasRef} className="rv-jelly-canvas__canvas" aria-hidden />
      <span className="rv-jelly-canvas__label">{children}</span>
    </a>
  );
}
