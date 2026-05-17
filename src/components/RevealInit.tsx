"use client";

import { useEffect } from "react";

/**
 * Globaler Scroll-Reveal-Controller mit Re-Show-Reset.
 *
 * Verhalten:
 *  1. IntersectionObserver beobachtet alle .reveal Elemente. Sobald ein
 *     Element deutlich im Viewport ist (rootMargin -12% top/bottom), wird
 *     .reveal-in hinzugefügt → Element fadet/sliced/sharpens rein.
 *     Wichtig: Klasse wird NUR hinzugefügt, nie entfernt vom Observer.
 *
 *  2. Scroll-Listener: Sobald scrollY von >=5 auf <5 wechselt (User gerade
 *     ganz oben angekommen, Flanken-getriggert), entfernt er .reveal-in
 *     von allen Elementen, die unterhalb des Viewports liegen
 *     (rect.top > innerHeight). Diese Elemente animieren beim nächsten
 *     Runterscrollen frisch rein.
 *     Sichtbare Elemente bleiben sichtbar - kein Flackern mid-page.
 *
 * Performance: Single passive scroll listener mit Flanken-Logik (kein
 * State-Loop). IntersectionObserver ist nativ.
 *
 * In layout.tsx einmalig eingebunden → wirkt auf allen Pages.
 */
export function RevealInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion - CSS handles visibility, observer not needed
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const REVEAL_CLASS = "reveal-in";
    const TARGET_SELECTOR = ".reveal";
    const SCROLL_TOP_THRESHOLD = 5;

    // ── IntersectionObserver: fade-in on enter ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(REVEAL_CLASS);
          }
          // Note: nur ADD, nie REMOVE - Reset passiert nur via scroll-listener
        });
      },
      {
        rootMargin: "-12% 0px -12% 0px",
        threshold: 0,
      }
    );

    // Initial register all existing .reveal elements
    const registerElements = () => {
      const elements = document.querySelectorAll<HTMLElement>(TARGET_SELECTOR);
      elements.forEach((el) => observer.observe(el));
    };
    registerElements();

    // MutationObserver: catch new .reveal elements (z.B. Route changes,
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

    // ── Scroll-listener: reset elements below viewport ON EDGE
    //    (only when scrollY transitions from >=5 down to <5)
    let wasTop = window.scrollY < SCROLL_TOP_THRESHOLD;
    let ticking = false;
    const onScroll = () => {
      const isTop = window.scrollY < SCROLL_TOP_THRESHOLD;
      if (!isTop) {
        wasTop = false;
        return;
      }
      // We are at the top now. If we *just* reached it, fire the reset once.
      if (wasTop) return; // already handled this top-session
      wasTop = true;

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
