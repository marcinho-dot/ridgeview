"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ─────────────────────────────────────────────────────────────────────────
   Button Showcase v2 — 10 CTA variants, all with a subtle 4px radius
   (matching the existing .btn-line frame). Less rounded than v1, more
   editorial / architectural feel.

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
    name: "Edge Frame + Gold Underline (current btn-line)",
    desc: "3-sided gold frame + persistent gold underline. Hover thickens the underline + flips top/sides to white. Reference style.",
    render: () => (
      <a href="#" className="btn-line backdrop-blur-md backdrop-saturate-125">
        Explore the Collection
      </a>
    ),
  },
  {
    n: 2,
    name: "Solid Gold Block",
    desc: "Solid gold fill, near-black text. Maximum contrast. Hover lifts 1px with deeper gold shadow.",
    render: () => (
      <a
        href="#"
        className="inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[4px] transition-all duration-300 ease-out hover:-translate-y-[1px]"
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
        Explore the Collection
      </a>
    ),
  },
  {
    n: 3,
    name: "Dark + Sharp Gold Border (subtle)",
    desc: "Dark fill with a thin gold border, cream text. Hover brightens border + adds soft gold glow.",
    render: () => (
      <a
        href="#"
        className="inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[4px] border border-[#C8A96E]/65 hover:border-[#C8A96E] text-[#f5f0e8] hover:text-[#C8A96E] transition-all duration-400"
        style={{
          background: "rgba(0,0,0,0.55)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 22px rgba(200,169,110,0.25), inset 0 0 14px rgba(200,169,110,0.06)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        Explore the Collection
      </a>
    ),
  },
  {
    n: 4,
    name: "Solid Cream Block",
    desc: "Solid cream fill, dark text. Hover slightly warms (cream → gold tint).",
    render: () => (
      <a
        href="#"
        className="inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[4px] transition-all duration-400"
        style={{
          background: "#f5f0e8",
          color: "#0a0a0a",
          boxShadow:
            "0 4px 14px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#E5C896";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#f5f0e8";
        }}
      >
        Explore the Collection
      </a>
    ),
  },
  {
    n: 5,
    name: "Gold Outline → Slide Fill",
    desc: "Gold outline. Hover: gold slides in from left, text flips to dark. Theatrical.",
    render: () => (
      <a
        href="#"
        className="btn-fill-slide inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[4px] relative overflow-hidden transition-colors duration-500 border border-[#C8A96E] text-[#C8A96E] hover:text-[#0a0a0a]"
      >
        <span className="relative z-10">Explore the Collection</span>
      </a>
    ),
  },
  {
    n: 6,
    name: "Subtle Dark Gradient + Gold Border",
    desc: "Gradient from near-black to deep gold tint, gold border. Editorial, restrained.",
    render: () => (
      <a
        href="#"
        className="inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[4px] border border-[#C8A96E]/55 hover:border-[#C8A96E] text-[#C8A96E] hover:text-[#f5f0e8] transition-all duration-400"
        style={{
          background:
            "linear-gradient(180deg, rgba(200,169,110,0.10) 0%, rgba(0,0,0,0.65) 100%)",
        }}
      >
        Explore the Collection
      </a>
    ),
  },
  {
    n: 7,
    name: "Frame + Underline Slide (from left)",
    desc: "Cream border 3 sides, gold underline that slides in from left under text on hover.",
    render: () => (
      <a
        href="#"
        className="btn-underline-slide inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[4px] border border-white/55 hover:border-white text-[#f5f0e8] transition-colors duration-300 relative"
      >
        Explore the Collection
      </a>
    ),
  },
  {
    n: 8,
    name: "White Frame → Gold Frame",
    desc: "Crisp white border. Hover: border + text both flip to gold + subtle background warm-up.",
    render: () => (
      <a
        href="#"
        className="inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[4px] border border-white/75 hover:border-[#C8A96E] text-[#f5f0e8] hover:text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all duration-400"
      >
        Explore the Collection
      </a>
    ),
  },
  {
    n: 9,
    name: "Gold Glow Frame",
    desc: "Dark fill + gold border. Hover triggers a soft gold halo around the button.",
    render: () => (
      <a
        href="#"
        className="inline-flex items-center justify-center font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[4px] border border-[#C8A96E]/70 hover:border-[#C8A96E] text-[#f5f0e8] hover:text-[#C8A96E] transition-all duration-500"
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
        Explore the Collection
      </a>
    ),
  },
  {
    n: 10,
    name: "Frame + Magnetic Arrow",
    desc: "Gold border, cream text + arrow. Hover: text turns gold, arrow slides 6px to the right.",
    render: () => (
      <a
        href="#"
        className="btn-magnetic inline-flex items-center gap-3 font-body uppercase tracking-[0.22em] text-[10px] md:text-[11px] font-medium px-7 py-3.5 rounded-[4px] border border-[#C8A96E]/70 hover:border-[#C8A96E] text-[#f5f0e8] hover:text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-all duration-400"
      >
        <span>Explore the Collection</span>
        <span className="btn-magnetic-arrow inline-block">&rarr;</span>
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
              [ CTA Showcase &middot; v2 ]
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
              Ten CTA variants, all with the same subtle 4px corner radius
              (matching the reference frame style — less rounded, more
              architectural). Each carries a distinct hover behavior. Tell
              me the number and I&rsquo;ll replace every CTA on the site
              with that style.
            </p>
          </div>

          {/* Grid of variants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {VARIANTS.map((v) => (
              <div
                key={v.n}
                className="relative border border-white/[0.08] hover:border-[#C8A96E]/30 transition-colors duration-500 rounded-[4px] p-7 md:p-10 bg-[#0a0a0a]"
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
                <div className="flex items-center justify-center min-h-[80px] py-6 px-4 rounded-[4px] border border-white/[0.04] bg-black/40">
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
