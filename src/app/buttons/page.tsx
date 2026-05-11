"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ─────────────────────────────────────────────────────────────────────────
   Button Showcase — 10 CTA variants in the Ridgeview CD.
   Pick one, then we roll it out across the site.

   CD colors:
     Gold   = #C8A96E
     Cream  = #f5f0e8
     BG     = #010101 / #0a0a0a
───────────────────────────────────────────────────────────────────────── */

type Variant = {
  n: number;
  name: string;
  desc: string;
  render: () => React.ReactNode;
};

const VARIANTS: Variant[] = [
  {
    n: 1,
    name: "Liquid Glass (current btn-atb)",
    desc: "Gold-tinted milk-glass with backdrop-blur. Hover deepens the gold + arrow slides.",
    render: () => (
      <a href="#" className="btn-atb backdrop-blur-2xl backdrop-saturate-150">
        View all Wines
        <span className="btn-atb-arrow">&rarr;</span>
      </a>
    ),
  },
  {
    n: 2,
    name: "Gold Solid",
    desc: "Solid gold fill, black text. Maximum contrast, hover lifts slightly with shadow.",
    render: () => (
      <a
        href="#"
        className="inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[6px] transition-all duration-300 ease-out hover:-translate-y-[1px]"
        style={{
          background: "#C8A96E",
          color: "#0a0a0a",
          boxShadow:
            "0 4px 14px rgba(200,169,110,0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 8px 28px rgba(200,169,110,0.55), inset 0 1px 0 rgba(255,255,255,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 4px 14px rgba(200,169,110,0.35), inset 0 1px 0 rgba(255,255,255,0.4)";
        }}
      >
        View all Wines
      </a>
    ),
  },
  {
    n: 3,
    name: "Gold Outline → Fill",
    desc: "Transparent with gold border. Hover fills with gold from left to right, text flips to dark.",
    render: () => (
      <a
        href="#"
        className="btn-fill-slide inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] px-7 py-3.5 relative overflow-hidden transition-colors duration-500 border border-[#C8A96E] text-[#C8A96E] hover:text-[#0a0a0a] rounded-[6px]"
      >
        <span className="relative z-10">View all Wines</span>
      </a>
    ),
  },
  {
    n: 4,
    name: "Cream Underline Slide",
    desc: "No box, just cream text with a gold underline that slides in from left on hover.",
    render: () => (
      <a
        href="#"
        className="btn-underline-slide inline-flex items-center gap-2 font-body uppercase tracking-[0.24em] text-[11px] md:text-[12px] text-[#f5f0e8] hover:text-[#C8A96E] transition-colors duration-300 relative pb-1"
      >
        <span>View all Wines</span>
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </a>
    ),
  },
  {
    n: 5,
    name: "Strong Gradient (gold→cream)",
    desc: "Bold gradient from gold to cream, dark text. Hover shifts the gradient + brightens.",
    render: () => (
      <a
        href="#"
        className="inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[6px] transition-all duration-500 ease-out hover:brightness-110 hover:-translate-y-[1px] text-[#0a0a0a]"
        style={{
          background:
            "linear-gradient(135deg, #C8A96E 0%, #E5C896 50%, #f5f0e8 100%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "0% 50%",
          boxShadow:
            "0 6px 20px rgba(200,169,110,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundPosition =
            "100% 50%";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundPosition = "0% 50%";
        }}
      >
        View all Wines
      </a>
    ),
  },
  {
    n: 6,
    name: "Subtle Dark Gradient",
    desc: "Dark gradient (almost black), gold border + gold text. Hover lifts gold tone subtly.",
    render: () => (
      <a
        href="#"
        className="inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[6px] border border-[#C8A96E]/60 hover:border-[#C8A96E] text-[#C8A96E] hover:text-[#f5f0e8] transition-all duration-400"
        style={{
          background:
            "linear-gradient(180deg, rgba(200,169,110,0.08) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      >
        View all Wines
      </a>
    ),
  },
  {
    n: 7,
    name: "Edge Frame + Underline Slide (current btn-line)",
    desc: "3-sided gold frame + persistent gold underline. Hover thickens the underline + flips top/sides to white.",
    render: () => (
      <a href="#" className="btn-line backdrop-blur-md backdrop-saturate-125">
        View all Wines
      </a>
    ),
  },
  {
    n: 8,
    name: "Gold Glow Box",
    desc: "Dark fill with gold border. Hover pulses a soft gold halo around the button.",
    render: () => (
      <a
        href="#"
        className="inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[6px] border border-[#C8A96E]/70 hover:border-[#C8A96E] text-[#f5f0e8] hover:text-[#C8A96E] transition-all duration-500"
        style={{
          background: "rgba(0,0,0,0.55)",
          boxShadow: "0 0 0 rgba(200,169,110,0)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 24px rgba(200,169,110,0.4), 0 0 50px rgba(200,169,110,0.18)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 0 rgba(200,169,110,0)";
        }}
      >
        View all Wines
      </a>
    ),
  },
  {
    n: 9,
    name: "Slide-Fill (current btn-ridge)",
    desc: "Cream/gold text on a subtle gold-tinted slide-fill on hover.",
    render: () => (
      <button className="btn-ridge font-body text-white/80 hover:text-white text-[10px] uppercase tracking-[0.22em] border border-[#C8A96E]/40 hover:border-[#C8A96E]/80 px-7 py-3.5 rounded-[6px] transition-all duration-300">
        View all Wines
      </button>
    ),
  },
  {
    n: 10,
    name: "Magnetic Arrow",
    desc: "White border, cream text. Hover: gold-tinted background + arrow slides 8px to the right.",
    render: () => (
      <a
        href="#"
        className="btn-magnetic group inline-flex items-center gap-3 font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[6px] border border-white/70 hover:border-[#C8A96E] text-[#f5f0e8] hover:text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all duration-400"
      >
        <span>View all Wines</span>
        <span className="btn-magnetic-arrow inline-block transition-transform duration-400">
          &rarr;
        </span>
      </a>
    ),
  },
];

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
              [ CTA Showcase ]
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
              className="font-body text-white/65 max-w-[680px] leading-relaxed"
              style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}
            >
              Ten CTA variants in the Ridgeview CD (gold #C8A96E, cream
              #f5f0e8, dark surfaces). Each has a distinct hover behavior.
              Tell me the number — I&rsquo;ll replace every CTA on the site
              with that style.
            </p>
          </div>

          {/* Grid of variants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {VARIANTS.map((v) => (
              <div
                key={v.n}
                className="relative border border-white/[0.08] hover:border-[#C8A96E]/30 transition-colors duration-500 rounded-lg p-7 md:p-10 bg-[#0a0a0a]"
              >
                {/* Number */}
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
                      fontSize: "clamp(18px, 1.8vw, 22px)",
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
                <div className="flex items-center justify-center min-h-[80px] py-6 px-4 rounded border border-white/[0.04] bg-black/40">
                  {v.render()}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-16 md:mt-20 pt-10 border-t border-white/[0.06] text-center">
            <p
              className="font-body text-white/45 italic"
              style={{ fontSize: "clamp(12px, 1vw, 14px)" }}
            >
              Hover each button to see its full state. Pick by number.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
