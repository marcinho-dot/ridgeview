"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ─────────────────────────────────────────────────────────────────────────
   Button Showcase v4 — 20 underline-frame variants.

   All buttons share:
     - Transparent background before hover
     - White OR gold border (1px, sometimes 2px)
     - 4px corner radius (architectural, matches .btn-line family)
     - Gold slide-underline on hover

   Variation matrix:
     - Border: white / gold / heavy gold / hairline / flip on hover
     - Underline direction: L→R / R→L / center-out
     - Underline thickness: thin (1px) / thick (2px) / double-line
     - Arrow: yes / no / diagonal ↗ / long-track
     - Extras: letter-spacing tracker, border pulse, color flip

   Patterns drawn from the ui-ux-pro-max + frontend-design skills:
     - Micro-interactions (scale on active, easing tracked)
     - Editorial typography rhythm (Raleway uppercase, 0.22em tracking)
     - Touch targets ≥44px (padding 13/24 hits min height ~46px)
     - Visible focus states inherited from a:focus default
───────────────────────────────────────────────────────────────────────── */

const GOLD = "#C8A96E";

type Variant = {
  n: number;
  name: string;
  desc: string;
  /** Tailwind classes for border + text colors (combined with .btn-uframe) */
  base: string;
  /** Extra .btn-uframe modifier classes */
  mods?: string;
  /** Optional arrow */
  arrow?: boolean;
  /** Border thickness override */
  borderClass?: string;
};

const V: Variant[] = [
  {
    n: 1,
    name: "White Frame · Underline L→R",
    desc: "Transparent. White border, cream text. Gold underline slides from left to right on hover. No arrow.",
    base: "border-white/70 hover:border-white text-[#f5f0e8]",
  },
  {
    n: 2,
    name: "Gold Frame · Underline L→R",
    desc: "Transparent. Thin gold border, gold text. Gold underline slides from left on hover. No arrow.",
    base: `border-[${GOLD}]/70 hover:border-[${GOLD}] text-[${GOLD}]`,
  },
  {
    n: 3,
    name: "White Frame · Underline L→R · Arrow",
    desc: "Same as #1 with a magnetic arrow that slides 5px right on hover.",
    base: "border-white/70 hover:border-white text-[#f5f0e8]",
    arrow: true,
  },
  {
    n: 4,
    name: "Gold Frame · Underline L→R · Arrow",
    desc: "Same as #2 with a magnetic arrow that slides 5px right on hover.",
    base: `border-[${GOLD}]/70 hover:border-[${GOLD}] text-[${GOLD}]`,
    arrow: true,
  },
  {
    n: 5,
    name: "White Frame · Underline R→L",
    desc: "Underline slides in from the right instead of the left — quieter, more editorial.",
    base: "border-white/70 hover:border-white text-[#f5f0e8]",
    mods: "from-right",
  },
  {
    n: 6,
    name: "Gold Frame · Underline R→L · Arrow",
    desc: "Right-anchored underline + arrow. The right side of the button feels active.",
    base: `border-[${GOLD}]/70 hover:border-[${GOLD}] text-[${GOLD}]`,
    mods: "from-right",
    arrow: true,
  },
  {
    n: 7,
    name: "White Frame · Underline Center-out",
    desc: "Underline grows from the center outward on hover — symmetrical, theatrical.",
    base: "border-white/70 hover:border-white text-[#f5f0e8]",
    mods: "from-center",
  },
  {
    n: 8,
    name: "Gold Frame · Underline Center-out · Arrow",
    desc: "Center-anchored underline + arrow. Bold middle, balanced framing.",
    base: `border-[${GOLD}]/70 hover:border-[${GOLD}] text-[${GOLD}]`,
    mods: "from-center",
    arrow: true,
  },
  {
    n: 9,
    name: "White Frame · Thick Underline",
    desc: "2px-thick gold underline. The hover feels more emphatic; good for primary CTAs.",
    base: "border-white/70 hover:border-white text-[#f5f0e8]",
    mods: "thick",
  },
  {
    n: 10,
    name: "Gold Frame · Thick Underline · Arrow",
    desc: "Heavy gold underline + arrow. Maximum hover signal while staying transparent at rest.",
    base: `border-[${GOLD}]/70 hover:border-[${GOLD}] text-[${GOLD}]`,
    mods: "thick",
    arrow: true,
  },
  {
    n: 11,
    name: "White Frame · Double-Line Underline",
    desc: "Two staggered gold lines slide in (1st L→R then 2nd 80ms later). Editorial flourish.",
    base: "border-white/70 hover:border-white text-[#f5f0e8]",
    mods: "double",
  },
  {
    n: 12,
    name: "Gold Frame · Double-Line · Arrow",
    desc: "Double underline + arrow. Layered, refined — feels like a press/print headline.",
    base: `border-[${GOLD}]/70 hover:border-[${GOLD}] text-[${GOLD}]`,
    mods: "double",
    arrow: true,
  },
  {
    n: 13,
    name: "Hairline White · Soft Underline",
    desc: "Lower border opacity. The button reads more like a frame than a button until hover.",
    base: "border-white/40 hover:border-white/85 text-[#f5f0e8]",
    mods: "hairline",
  },
  {
    n: 14,
    name: "Hairline Gold · Soft Underline · Arrow",
    desc: "Whispered gold border + arrow. For secondary CTAs that should not shout.",
    base: `border-[${GOLD}]/40 hover:border-[${GOLD}]/90 text-[${GOLD}]`,
    mods: "hairline",
    arrow: true,
  },
  {
    n: 15,
    name: "White → Gold Frame Flip",
    desc: "Starts white. On hover the border + text both flip to gold AND the underline slides. Two-stage feedback.",
    base: "", // .flip-border class handles colors
    mods: "flip-border",
  },
  {
    n: 16,
    name: "Heavy Gold Frame · Thick Underline · Arrow",
    desc: "2px gold border + 2px gold underline + arrow. The boldest variant — primary action surface.",
    base: `border-[${GOLD}] text-[${GOLD}]`,
    borderClass: "border-2",
    mods: "thick",
    arrow: true,
  },
  {
    n: 17,
    name: "White Frame · Diagonal Arrow ↗",
    desc: "Same slide underline, but the arrow points diagonally up-right (external/explore feel).",
    base: "border-white/70 hover:border-white text-[#f5f0e8]",
    mods: "diag-arrow",
    arrow: true,
  },
  {
    n: 18,
    name: "Gold Frame · Diagonal Arrow ↗",
    desc: "Gold variant of the diagonal arrow — couture / brand-link aesthetic.",
    base: `border-[${GOLD}]/70 hover:border-[${GOLD}] text-[${GOLD}]`,
    mods: "diag-arrow",
    arrow: true,
  },
  {
    n: 19,
    name: "White Frame · Long-Track Arrow",
    desc: "Arrow slides further (10px) on hover, leaving more visual travel. Adds momentum.",
    base: "border-white/70 hover:border-white text-[#f5f0e8]",
    mods: "long-arrow",
    arrow: true,
  },
  {
    n: 20,
    name: "Gold Frame · Tracker · Pulse · Arrow",
    desc: "Letter-spacing expands on hover, underline slides, border pulses gently. Maximum animated polish.",
    base: `border-[${GOLD}]/70 text-[${GOLD}]`,
    mods: "tracker pulse",
    arrow: true,
  },
];

function ButtonPreview({ v }: { v: Variant }) {
  const cls = ["btn-uframe", v.mods ?? "", v.base, v.borderClass ?? ""]
    .filter(Boolean)
    .join(" ");
  return (
    <a href="#" className={cls}>
      <span>Explore the Collection</span>
      {v.arrow ? (
        <span className="btn-uframe-arrow" aria-hidden>
          &rarr;
        </span>
      ) : null}
    </a>
  );
}

export default function ButtonShowcase() {
  return (
    <main className="bg-[#010101] min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-16 md:mb-20">
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-4"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
            >
              [ CTA Showcase &middot; v4 &middot; Underline Frame Family ]
            </p>
            <h1
              className="font-display italic text-cream mb-5"
              style={{
                fontSize: "clamp(32px, 4.5vw, 60px)",
                fontWeight: 400,
                lineHeight: 1.05,
              }}
            >
              Pick a button — we&rsquo;ll roll it out across the site.
            </h1>
            <p
              className="font-body text-white/65 max-w-[720px] leading-relaxed"
              style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}
            >
              Twenty variants, one family. All transparent at rest, all with a
              4px corner radius, all framed by a white or gold border, and all
              animating a gold slide-underline on hover. Mixed with and
              without arrows. Patterns from the ui-ux-pro-max +
              frontend-design skills. Tell me the number and I&rsquo;ll
              replace every CTA on the site with that style.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {V.map((v) => (
              <div
                key={v.n}
                className="relative border border-white/[0.08] hover:border-[#C8A96E]/30 transition-colors duration-500 rounded-[4px] p-7 md:p-10 bg-[#0a0a0a]"
              >
                {/* Number + Name */}
                <div className="flex items-baseline gap-4 mb-5">
                  <span
                    className="font-display italic text-[#C8A96E] leading-none"
                    style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
                  >
                    {String(v.n).padStart(2, "0")}
                  </span>
                  <h2
                    className="font-display italic text-cream"
                    style={{
                      fontSize: "clamp(17px, 1.7vw, 21px)",
                      fontWeight: 400,
                      lineHeight: 1.2,
                    }}
                  >
                    {v.name}
                  </h2>
                </div>

                {/* Description */}
                <p
                  className="font-body text-white/55 leading-relaxed mb-8"
                  style={{ fontSize: "clamp(12px, 1vw, 14px)" }}
                >
                  {v.desc}
                </p>

                {/* Button stage */}
                <div className="flex items-center justify-center min-h-[88px] py-7 px-4 rounded-[4px] border border-white/[0.04] bg-black/40">
                  <ButtonPreview v={v} />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 md:mt-20 pt-10 border-t border-white/[0.06] text-center">
            <p
              className="font-body text-white/45 italic"
              style={{ fontSize: "clamp(12px, 1vw, 14px)" }}
            >
              Hover each button to see the underline animation. Pick by number.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
