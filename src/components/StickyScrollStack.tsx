"use client";

/**
 * Sticky Scroll Stack - pure CSS, kein JavaScript
 *
 * Technik: Jede Section nimmt 100vh im normalen Layout-Flow.
 * position: sticky; top: 0 lässt sie am oberen Rand "pinnen",
 * während die nächste Section von unten darüber scrollt.
 * Höhere z-index → spätere Sections überdecken frühere.
 * Nach allen 3 Sections (300vh) scrollt WineCollection normal weiter.
 */

import { DiscoverSection } from "./DiscoverSection";
import { LifestyleSection } from "./LifestyleSection";
import { BottleRevealSection } from "./BottleRevealSection";

export function StickyScrollStack() {
  return (
    /*
     * paddingBottom: "100vh" gibt BottleRevealSection Dwell-Zeit,
     * bevor WineCollection von unten einrollt.
     * Container-Höhe = 300vh (3 × 100vh) + 100vh Pause = 400vh.
     */
    <div style={{ paddingBottom: "100vh" }}>

      {/* Ebene 1 - DiscoverSection: pinnt sofort */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <DiscoverSection />
      </div>

      {/* Ebene 2 - LifestyleSection: scrollt von unten auf Discover */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ zIndex: 20 }}
      >
        <LifestyleSection />
      </div>

      {/* Ebene 3 - BottleRevealSection: scrollt von unten auf Lifestyle */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ zIndex: 30 }}
      >
        <BottleRevealSection />
      </div>

    </div>
  );
}
