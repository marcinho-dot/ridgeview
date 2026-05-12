"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * FAQSection — Accordion of common buyer questions.
 *
 * Categories typical for an English Sparkling Wine SKU:
 * Shipping · Returns · Storage · Gifting · Service.
 *
 * Pure presentational component — answers belong to the page that mounts
 * the section so each SKU can override gift-specific or shipping-specific
 * details where needed.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  kicker?: string;
  headline?: string;
  items: FAQItem[];
}

export function FAQSection({ kicker = "[ Good to know ]", headline = "Questions, answered.", items }: Props) {
  // All accordions closed by default — user opens any item by clicking.
  // (Was previously `useState(0)` which auto-opened the first FAQ.)
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative bg-[#0a0a0a] border-t border-white/[0.06] overflow-hidden">
      {/* Subtle gold ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[920px] mx-auto px-6 md:px-16 py-24 md:py-32">
        <div className="text-center mb-12 md:mb-16">
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

        <ul className="space-y-3">
          {items.map((item, i) => {
            const open = i === openIdx;
            return (
              <motion.li
                key={item.question}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="border border-white/[0.08] rounded-md overflow-hidden bg-white/[0.015] backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-5 px-5 md:px-7 py-5 md:py-6 text-left group hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <span
                    className={`font-display italic transition-colors duration-300 ${
                      open ? "text-[#C8A96E]" : "text-cream group-hover:text-[#C8A96E]/85"
                    }`}
                    style={{ fontSize: "clamp(17px, 1.7vw, 22px)", fontWeight: 400 }}
                  >
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className={`flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-400 ${
                      open
                        ? "border-[#C8A96E]/70 bg-[#C8A96E]/[0.12] rotate-45"
                        : "border-white/20 group-hover:border-[#C8A96E]/40"
                    }`}
                  >
                    <span className={`text-[14px] leading-none transition-colors duration-300 ${open ? "text-[#C8A96E]" : "text-white/55"}`}>
                      +
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-7 pb-6 md:pb-7">
                        <div
                          aria-hidden
                          className="h-px mb-5"
                          style={{ background: "rgba(200,169,110,0.15)" }}
                        />
                        <p
                          className="font-body text-white/65 leading-[1.85]"
                          style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300 }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
