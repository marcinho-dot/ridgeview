"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { basePath } from "@/lib/basePath";

export function BottleRevealSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax - image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#010101]" style={{ minHeight: "100vh" }}>

      {/* Full-bleed cellar image with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/vineceller.png`}
          alt="Ridgeview wine cellar - bottles ageing in the estate cellar"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ objectPosition: "center center" }}
        />
      </motion.div>

      {/* Gradient fade into WineCollection below */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#010101]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-transparent" style={{ height: "30%", top: "auto" }} />

      {/* Minimal label */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="font-display italic text-[#C8A96E] tracking-widest text-center" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
          [ Estate Crafted · Every Bottle ]
        </p>
      </motion.div>

    </section>
  );
}
