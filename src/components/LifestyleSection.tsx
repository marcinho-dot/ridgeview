"use client";

import { motion } from "framer-motion";
import { basePath } from "@/lib/basePath";

export function LifestyleSection() {
  return (
    <section className="relative overflow-hidden" style={{ height: "60vh", minHeight: "380px" }}>
      {/* Background — bottle + glasses at golden hour vineyard */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/lifestyle-bg.png`}
        alt="Ridgeview — enjoyed at golden hour"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 55%" }}
      />

      {/* Layered overlays — no top gradient to avoid seam with slide-in */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#010101]/60" />

      {/* Content — centred quote */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

        <div className="overflow-hidden mb-2">
          <motion.h2
            className="font-display italic text-white leading-[1.05]"
            style={{ fontSize: "clamp(28px, 5vw, 72px)", fontWeight: 400 }}
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            Every occasion deserves
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h2
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(28px, 5vw, 72px)", fontWeight: 400 }}
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            something extraordinary.
          </motion.h2>
        </div>

        <motion.a
          href="#wines"
          className="font-body text-white/70 hover:text-[#C8A96E] text-[10px] uppercase tracking-[0.28em] border-b border-white/25 hover:border-[#C8A96E]/60 pb-0.5 transition-all duration-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
        >
          Explore the collection
        </motion.a>

      </div>
    </section>
  );
}
