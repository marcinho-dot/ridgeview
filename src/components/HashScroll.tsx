"use client";

import { useEffect } from "react";

/**
 * HashScroll — robust hash-anchor scroller for content-heavy pages.
 *
 * Why this exists: when a user lands on `/vineyard-booking/#nearby-
 * accommodation` (e.g. from the footer link or the Directions-page
 * "View Nearby Accommodation" button), the target sits BELOW very tall
 * sticky sections (HeritageRevealStack is 320vh + a -100vh pull-up),
 * lazy-loaded carousel images, and the Cormorant/Raleway web-font swap.
 * All of those change the document height ABOVE the anchor for up to
 * ~1.5s after first paint, so the anchor's absolute position keeps
 * moving while the layout settles.
 *
 * The old implementation scrolled exactly ONCE (a single 600ms
 * timeout). If layout settling ran past 600ms, that one-shot landed on
 * the WRONG section (it overshot onto the "Find us." / PracticalInfo
 * block that sits just below the accommodation carousel).
 *
 * Fix: re-assert the scroll position several times across the settle
 * window, plus once `document.fonts.ready` resolves and once `window`
 * fires `load` (all images in). Each pass re-measures the target's
 * live position, so the scroll CONVERGES on the correct spot as the
 * page stabilises. We stop the moment the user scrolls (wheel / touch /
 * key) so we never fight them, and re-arm on `hashchange`.
 *
 * Offset = the target's OWN computed scroll-margin-top (80px mobile /
 * 110px desktop via the [id] rule in globals.css, or any inline
 * override) — keeping this JS path in lockstep with the native CSS
 * scroll-margin path.
 *
 * Place once near the top of any page that needs hash-scroll support —
 * typically inside `<main>` directly under the navbar.
 */
export function HashScroll() {
  useEffect(() => {
    let cancelled = false;
    let userInterrupted = false;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const align = () => {
      if (cancelled || userInterrupted) return;
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      // window.scrollTo with an explicit pixel offset (not scrollIntoView,
      // which is unreliable here because globals.css sets overflow: clip on
      // html). behavior:"instant" so the html-level smooth-scroll doesn't
      // swallow the programmatic jump.
      const smt = parseFloat(getComputedStyle(target).scrollMarginTop) || 96;
      const top = Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - smt,
      );
      // Only move if we're meaningfully off — avoids pointless re-jumps once
      // we've already converged.
      if (Math.abs(window.scrollY - top) > 2) {
        window.scrollTo({ top, behavior: "instant" });
      }
    };

    const run = () => {
      // A fresh hashchange is an explicit navigation intent — re-arm.
      userInterrupted = false;
      timers.forEach(clearTimeout);
      timers = [];
      align();
      // Re-assert across the settle window. Capped at ~1.7s so we never
      // yank a user who has started reading/scrolling.
      [80, 200, 400, 650, 950, 1300, 1700].forEach((d) => {
        timers.push(setTimeout(align, d));
      });
    };

    // Any genuine user scroll intent cancels further auto-alignment.
    const interrupt = () => {
      userInterrupted = true;
      timers.forEach(clearTimeout);
      timers = [];
    };
    const interruptOpts = { passive: true } as const;
    window.addEventListener("wheel", interrupt, interruptOpts);
    window.addEventListener("touchstart", interrupt, interruptOpts);
    window.addEventListener("keydown", interrupt, interruptOpts);
    window.addEventListener("hashchange", run);
    window.addEventListener("load", align);
    // Fonts changing metrics is a classic late height-shift above the anchor.
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(align);
    }

    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", interrupt);
      window.removeEventListener("hashchange", run);
      window.removeEventListener("load", align);
    };
  }, []);

  return null;
}
