"use client";

import { useEffect } from "react";

/**
 * HashScroll — robust hash-anchor scroller for content-heavy pages.
 *
 * Why this exists: when a user lands on `/vineyard-booking/#nearby-
 * accommodation` (e.g. from the footer link), the browser's native
 * scroll-to-hash fires once on initial paint — but at that moment
 * the page is mid-render: `.reveal` elements still have opacity 0,
 * `<ScrollReset>` wrappers haven't laid out their children yet, and
 * the section's position is still settling. By the time everything
 * stabilises, the browser has already moved on and the page sits
 * at scrollY=0 with no anchor scroll.
 *
 * This component listens for `hashchange` AND runs on mount, then
 * resolves the target element and scrolls to it after the layout
 * has had a chance to settle (two rAFs + a short timeout). The
 * `scroll-mt-24` Tailwind class on the target sections compensates
 * for the fixed navbar height.
 *
 * Place once near the top of any page that needs hash-scroll
 * support — typically inside `<main>` directly under the navbar.
 */
export function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.slice(1);
      // Wait 600ms for the vineyard-booking page to fully lay out
      // (it has multiple sticky-scroll sections, ScrollReset
      // wrappers, and reveal animations that all affect final
      // positions). Re-resolve the target inside the timer so we
      // pick up the post-layout DOM position.
      setTimeout(() => {
        const target = document.getElementById(id);
        if (!target) return;
        // Use window.scrollTo with an explicit pixel offset rather than
        // scrollIntoView, because globals.css sets `overflow: clip visible`
        // on html/body which makes scrollIntoView unreliable on long pages.
        // behavior: "instant" — the html-level `scroll-behavior: smooth`
        // would otherwise leave the JS scroll un-executed in some browsers
        // / dev environments.
        //
        // Offset = the target's OWN computed scroll-margin-top (set globally
        // to 80px mobile / 110px desktop by the [id] rule in globals.css, or
        // any inline override). Reading it here keeps this JS path in lockstep
        // with the native CSS scroll-margin path — otherwise a hardcoded value
        // (was 96px) lands the anchor too tight against the ~91px desktop navbar.
        const smt = parseFloat(getComputedStyle(target).scrollMarginTop) || 96;
        const top = target.getBoundingClientRect().top + window.scrollY - smt;
        window.scrollTo({ top, behavior: "instant" });
      }, 600);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}
