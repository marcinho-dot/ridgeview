"use client";

import { useEffect } from "react";

/**
 * Globaler Scroll-Reveal-Controller mit Re-Show-Reset.
 *
 * Verhalten:
 *  1. IntersectionObserver beobachtet alle .mn-fx Elemente. Sobald ein Element
 *     deutlich im Viewport ist (rootMargin -12% top/bottom), wird .mn-fx-in
 *     hinzugefügt → Element fadet/sliced/sharpens rein.
 *     Wichtig: Klasse wird NUR hinzugefügt, nie entfernt vom Observer.
 *
 *  2. Scroll-Listener: Sobald scrollY < 5 (User ganz oben), entfernt er
 *     .mn-fx-in von allen Elementen, die unterhalb des Viewports liegen
 *     (rect.top > innerHeight). Diese Elemente animieren beim nächsten
 *     Runterscrollen frisch rein.
 *     Sichtbare Elemente bleiben sichtbar — kein Flackern mid-page.
 *
 * Performance: Single passive scroll listener, getBoundingClientRect
 * nur bei scrollY-near-top getriggert. IntersectionObserver ist nativ.
 *
 * In layout.tsx einmalig eingebunden → wirkt auf allen Pages.
 */
export function MnRevealInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion — CSS handles visibility, observer not needed
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const REVEAL_CLASS = "mn-fx-in";
    const TARGET_SELECTOR = ".mn-fx";
    const SCROLL_TOP_THRESHOLD = 5;

    // ── IntersectionObserver: fade-in on enter ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(REVEAL_CLASS);
          }
          // Note: nur ADD, nie REMOVE — Reset passiert nur via scroll-listener
        });
      },
      {
        rootMargin: "-12% 0px -12% 0px",
        threshold: 0,
      }
    );

    // Initial register all existing .mn-fx elements
    const registerElements = () => {
      const elements = document.querySelectorAll<HTMLElement>(TARGET_SELECTOR);
      elements.forEach((el) => observer.observe(el));
    };
    registerElements();

    // MutationObserver: catch new .mn-fx elements (z.B. Route changes,
    // dynamisch eingefügte Sections) und registriere sie
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches?.(TARGET_SELECTOR)) {
            observer.observe(node);
          }
          node.querySelectorAll?.<HTMLElement>(TARGET_SELECTOR).forEach((el) =>
            observer.observe(el)
          );
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // ── Scroll-listener: reset elements below viewport when at top ──
    let ticking = false;
    const onScroll = () => {
      if (window.scrollY >= SCROLL_TOP_THRESHOLD) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        document.querySelectorAll<HTMLElement>(`.${REVEAL_CLASS}`).forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top > vh) {
            el.classList.remove(REVEAL_CLASS);
          }
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
