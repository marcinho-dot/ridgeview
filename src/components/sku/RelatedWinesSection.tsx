"use client";

import { motion } from "framer-motion";
import { basePath } from "@/lib/basePath";

/**
 * RelatedWinesSection — Cross-sell adjacent SKUs.
 *
 * Shows 2-3 related bottles as compact cards. Each card has a small bottle
 * image (rotated subtly), name, short style descriptor, price, and a Shop
 * Bottle link. Editorial layout — generous whitespace, gold dividers.
 */

export interface RelatedWine {
  /** SKU slug (used to build the /wine/<slug> link) */
  slug: string;
  name: string;
  /** One-line style descriptor e.g. "House Cuvée · Non Vintage" */
  style: string;
  price: number;
  /** Bottle image src (without basePath) */
  image: string;
  /** Optional one-liner that explains why it's related */
  note?: string;
}

interface Props {
  kicker?: string;
  headline?: string;
  wines: RelatedWine[];
}

const formatGBP = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 }).format(n);

export function RelatedWinesSection({
  kicker = "[ You may also enjoy ]",
  headline = "More from the cellar.",
  wines,
}: Props) {
  return (
    <section className="relative bg-[#010101] border-t border-white/[0.06] overflow-hidden">
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(200,169,110,0.045) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-32">
        <div className="text-center mb-16 md:mb-20">
          <div className="reveal" style={{ transitionDelay: "0s" }}>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-4"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
            >
              {kicker}
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <h2
              className="font-display italic text-white leading-[1.1]"
              style={{ fontSize: "clamp(30px, 4vw, 56px)", fontWeight: 400 }}
            >
              {headline}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {wines.map((w, i) => (
            <motion.a
              key={w.slug}
              href={`${basePath}/wine/${w.slug}`}
              className="group relative flex flex-col items-center text-center cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, delay: 0.2 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Bottle */}
              <div
                className="relative h-[260px] md:h-[320px] flex items-end justify-center mb-6 overflow-visible"
                style={{ width: "100%" }}
              >
                {/* halo */}
                <div
                  aria-hidden
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(200,169,110,0.10) 0%, transparent 70%)",
                    filter: "blur(28px)",
                    transform: "translate(-50%, -50%)",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}${w.image}`}
                  alt={w.name}
                  className="relative w-auto max-w-none object-contain h-full transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:-translate-y-2"
                  style={{
                    transform: "rotate(-6deg)",
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
                  }}
                />
              </div>

              {/* Meta */}
              <p
                className="font-body text-white/40 text-[10px] uppercase tracking-[0.28em] mb-2"
              >
                {w.style}
              </p>
              <h3
                className="font-display italic text-cream group-hover:text-[#C8A96E] mb-3 transition-colors duration-500"
                style={{ fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 400 }}
              >
                {w.name}
              </h3>
              {w.note && (
                <p className="font-body text-white/50 text-[12px] leading-relaxed mb-4 max-w-[260px]">
                  {w.note}
                </p>
              )}
              <p className="font-display italic text-[#C8A96E] mb-5" style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}>
                From {formatGBP(w.price)}
              </p>

              {/* CTA — text link, gold underline grows on hover */}
              <span className="relative inline-flex items-center gap-2 font-body text-white/75 group-hover:text-[#C8A96E] text-[10px] uppercase tracking-[0.22em] transition-colors duration-300">
                Discover
                <span className="inline-block transition-transform duration-400 ease-out group-hover:translate-x-1">&rarr;</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-0 bg-[#C8A96E] group-hover:w-full transition-all duration-500 ease-out"
                />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
