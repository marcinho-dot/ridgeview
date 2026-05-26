"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";

interface BottomNavProps {
  /**
   * Optional - when set, the BottomNav is shown only when NONE of the
   * matched ATB elements are in viewport (typical pattern: pass
   * "[data-atb-trigger]" on SKU pages so the nav appears only when
   * every Add-to-Basket button is off-screen).
   *
   * If omitted, falls back to the legacy scrollY > 0.85 viewport behaviour.
   */
  hideWhileVisibleSelector?: string;
  /**
   * Optional - when set, the BottomNav is shown ONLY when at least one
   * matched element is in viewport. Used on `/vineyard-booking` where
   * the nav should appear once the user reaches the footer and
   * symmetrically disappear when they scroll back up past it. Takes
   * precedence over the legacy scrollY behaviour when set.
   */
  showWhenVisibleSelector?: string;
}

export function BottomNav({ hideWhileVisibleSelector, showWhenVisibleSelector }: BottomNavProps = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // showWhenVisibleSelector mode: show ONLY when matched elements are
    // intersecting the viewport. Symmetric — hides again when user
    // scrolls back up past the trigger.
    if (showWhenVisibleSelector) {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(showWhenVisibleSelector),
      );
      if (!targets.length) {
        // Nothing to observe — leave nav hidden.
        setVisible(false);
        return;
      }
      const visibleSet = new Set<Element>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visibleSet.add(entry.target);
            else visibleSet.delete(entry.target);
          }
          setVisible(visibleSet.size > 0);
        },
        { rootMargin: "0px 0px 0px 0px", threshold: 0 },
      );
      targets.forEach((t) => observer.observe(t));
      return () => observer.disconnect();
    }

    // Multi-element ATB-aware mode: only show when NONE of the trigger
    // elements are intersecting the viewport.
    if (hideWhileVisibleSelector) {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(hideWhileVisibleSelector),
      );
      if (!targets.length) {
        // No triggers on the page - fall back to legacy scroll behaviour.
        const onScroll = () =>
          setVisible(window.scrollY > window.innerHeight * 0.85);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
      }
      const visibleSet = new Set<Element>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visibleSet.add(entry.target);
            else visibleSet.delete(entry.target);
          }
          setVisible(visibleSet.size === 0);
        },
        { rootMargin: "0px 0px 0px 0px", threshold: 0 },
      );
      targets.forEach((t) => observer.observe(t));
      return () => observer.disconnect();
    }

    // Legacy mode - show after scrolling past 85vh.
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideWhileVisibleSelector, showWhenVisibleSelector]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 w-full z-40 lg:hidden bg-black/60 backdrop-blur-xl border-t border-white/[0.06] py-4 px-6 flex items-center justify-between"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Both links share .btn-cta (Etched Crystal · Dual-Layer)
              so the mobile bottom nav matches every other CTA on the
              site - backdrop-blur milk glass + layered gold edge. */}
          <a href={`${basePath}/`} className="btn-cta">
            Home
          </a>

          <a href={`${basePath}/wines`} className="btn-cta">
            Shop all Wines
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
