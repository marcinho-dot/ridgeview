/**
 * RvGooDefs — singleton SVG <defs> mounted once in the document body.
 *
 * Provides the `#rv-goo-filter` SVG filter that any client component
 * (e.g. `JellyButtonCss`) can reference via `filter: url(#rv-goo-filter)`.
 *
 * Mechanic:
 *   1. `feGaussianBlur stdDeviation="6"` — softens shape edges.
 *   2. `feColorMatrix` with high alpha multiplier (22) and negative
 *      offset (-10) — thresholds the blurred alpha back to crisp edges.
 *      Where two blurred shapes overlap, the combined alpha exceeds
 *      threshold and they fuse into a single goo blob. Classic
 *      Lucas-Bebber goo recipe.
 *   3. `feBlend` — composites the goo'd shape back on top of the
 *      original colours so the inner blob colour is preserved.
 */
export function RvGooDefs() {
  return (
    <svg
      aria-hidden
      width={0}
      height={0}
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <defs>
        <filter id="rv-goo-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 22 -10
            "
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
}
