"use client";

/**
 * BottleStage — hero product imagery for an SKU page.
 *
 * Wraps an <img> in AnimatePresence so the bottle/case PNG crossfades
 * when the user picks a different Format in the PurchaseWidget.
 *
 * Two display modes, picked by sniffing the filename:
 *   - bottle / magnum (default): tall slim PNG, displayed large, with
 *     the editorial 28-35° rotation + 8% translate that anchors the
 *     hero. Designed for an aspect ≈ 0.667-0.800 (portrait bottle).
 *   - case (filename includes "-case"): square PNG showing 6 bottles
 *     side-by-side. Aspect ≈ 1.0 so the bottle-mode height makes the
 *     image ~25% wider AND the 35° rotation flares the diagonal out
 *     of the viewport. Solution: half-height, minimal rotation (4-5°),
 *     no translate-X. The result reads as a clean product shot
 *     centered in the column, not a sprawling-off-screen photo.
 *
 * Toggle is automatic via the src filename. No prop drilling needed —
 * adding a new case shot to a SKU's variant list is enough.
 */

import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";

interface Props {
  /** Path relative to the basePath, e.g. "/products/bloomsbury.png" or
   *  "/products/bloomsbury-case.png". The "-case" infix in the
   *  filename switches the stage into compact case-display mode. */
  src: string;
  alt: string;
}

const BOTTLE_STAGE_CLASS =
  "pointer-events-auto w-auto max-w-none object-contain " +
  "h-[clamp(376px,51svh,484px)] md:h-[clamp(704px,90svh,1078px)] " +
  "[transform:translateX(8%)_translateY(-30px)_rotate(28deg)] " +
  "md:[transform:translateY(clamp(-110px,-7svh,-60px))_rotate(35deg)] " +
  "hover:[transform:translateX(8%)_translateY(-30px)_rotate(28deg)_scale(1.015)] " +
  "md:hover:[transform:translateY(clamp(-110px,-7svh,-60px))_rotate(35deg)_scale(1.015)] " +
  "[transition:transform_900ms_cubic-bezier(0.16,1,0.3,1),filter_900ms_cubic-bezier(0.16,1,0.3,1)] " +
  "hover:[filter:drop-shadow(0_40px_80px_rgba(0,0,0,0.7))_drop-shadow(0_0_60px_rgba(200,169,110,0.12))]";

const CASE_STAGE_CLASS =
  "pointer-events-auto w-auto max-w-none object-contain " +
  "h-[clamp(240px,34svh,340px)] md:h-[clamp(420px,55svh,640px)] " +
  "[transform:rotate(4deg)] " +
  "md:[transform:translateY(clamp(-40px,-2.5svh,-20px))_rotate(5deg)] " +
  "hover:[transform:rotate(4deg)_scale(1.015)] " +
  "md:hover:[transform:translateY(clamp(-40px,-2.5svh,-20px))_rotate(5deg)_scale(1.015)] " +
  "[transition:transform_900ms_cubic-bezier(0.16,1,0.3,1),filter_900ms_cubic-bezier(0.16,1,0.3,1)] " +
  "hover:[filter:drop-shadow(0_40px_80px_rgba(0,0,0,0.7))_drop-shadow(0_0_60px_rgba(200,169,110,0.12))]";

export function BottleStage({ src, alt }: Props) {
  const isCase = src.includes("-case");
  const className = isCase ? CASE_STAGE_CLASS : BOTTLE_STAGE_CLASS;
  return (
    <AnimatePresence mode="wait">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        key={src}
        src={`${basePath}${src}`}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        style={{
          transformOrigin: "center",
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
        }}
      />
    </AnimatePresence>
  );
}
