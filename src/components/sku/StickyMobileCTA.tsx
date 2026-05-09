"use client";

import { RefObject, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";

/**
 * StickyMobileCTA — Mobile-only sticky bottom bar mit "Add to basket" CTA.
 *
 * - Zeigt sich automatisch, sobald die ursprünglichen Hero-CTAs (referenziert
 *   via `triggerRef`) aus dem Viewport scrollen.
 * - Ersetzt auf SKU-Pages die generische BottomNav, weil hier die wichtigste
 *   mobile Aktion "Add to basket" sein soll, nicht "Home / View All Wines".
 * - Slide-up Animation analog zur BottomNav.
 */

interface Props {
  productName: string;
  price: string;
  /** Pfad zum Flaschen-Thumbnail, RELATIV zu /public/, ohne basePath. */
  thumbnailSrc: string;
  /**
   * Trigger — entweder ein Ref auf das ursprüngliche Hero-CTA-Element ODER
   * eine DOM-id (kein "#"-Präfix). Sobald dieses Element NICHT mehr im
   * Viewport ist, slidet der Sticky-Bar nach oben.
   */
  triggerRef?: RefObject<HTMLElement | null>;
  triggerId?: string;
  onAddToBasket?: () => void;
  /** Optional: Link für den "Back to Shop"-Sekundär-CTA. */
  backHref?: string;
}

export function StickyMobileCTA({
  productName,
  price,
  thumbnailSrc,
  triggerRef,
  triggerId,
  onAddToBasket,
  backHref,
}: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target: HTMLElement | null =
      triggerRef?.current ?? (triggerId ? document.getElementById(triggerId) : null);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTA when the original hero CTA is no longer visible.
        setShow(!entry.isIntersecting);
      },
      {
        // Trigger as soon as the bottom edge of the original CTA leaves the viewport.
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [triggerRef, triggerId]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-xl border-t border-white/[0.08] px-4 py-3 flex items-center gap-3"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}${thumbnailSrc}`}
            alt=""
            aria-hidden
            className="w-11 h-11 object-contain shrink-0 [filter:drop-shadow(0_4px_10px_rgba(0,0,0,0.5))]"
          />

          {/* Name + Price */}
          <div className="flex-1 min-w-0">
            <p
              className="font-display italic text-cream leading-[1.15] truncate"
              style={{ fontSize: "15px", fontWeight: 400 }}
            >
              {productName}
            </p>
            <p className="font-body text-white/55 text-[11px] mt-0.5">{price}</p>
          </div>

          {/* Optional secondary "back to shop" — only icon-style on small screens */}
          {backHref && (
            <a
              href={backHref}
              aria-label="Back to shop"
              className="hidden xs:inline-flex font-body text-white/55 hover:text-[#C8A96E] text-[10px] uppercase tracking-[0.2em] border border-white/15 hover:border-[#C8A96E]/40 px-3 py-2.5 rounded-sm transition-all duration-300 shrink-0"
            >
              Shop
            </a>
          )}

          {/* Primary CTA — Add to basket */}
          <button
            type="button"
            onClick={onAddToBasket}
            className="font-body text-white text-[10px] uppercase tracking-[0.2em] border border-[#C8A96E]/55 hover:border-[#C8A96E] bg-[#C8A96E]/15 hover:bg-[#C8A96E]/25 active:scale-[0.97] px-5 py-3 rounded-sm transition-all duration-300 whitespace-nowrap shrink-0"
          >
            Add to basket
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
