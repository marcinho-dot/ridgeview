"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { basePath } from "@/lib/basePath";

export function EstatePeopleSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="bg-[#010101] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">

        {/* ── Row 1: Estate — Image left, Text right ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-28">

          {/* Image */}
          <motion.div
            className="group relative overflow-hidden rounded-sm"
            style={{ aspectRatio: "4/3" }}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/estate-vineyard.jpg`}
              alt="Ridgeview vineyard with the South Downs ridge in the distance"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: "center center" }}
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-sm" />
          </motion.div>

          {/* Text */}
          <div>
            <motion.p
              className="font-display italic text-[#C8A96E] tracking-widest mb-5"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              [ The Estate ]
            </motion.p>

            <motion.h2
              className="font-display italic text-white leading-[1.08] mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 52px)", fontWeight: 400 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Beneath the <span className="text-[#C8A96E]">South Downs</span> ridge.
            </motion.h2>

            <motion.p
              className="font-body text-white/60 leading-relaxed mb-5"
              style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, maxWidth: "480px" }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            >
              Over 17,000 vines on the home estate at Ditchling Common, East Sussex — perfectly
              positioned to grow Chardonnay, Pinot Noir and Pinot Meunier on the same ancient
              chalk that defines Champagne.
            </motion.p>

            <motion.p
              className="font-body text-white/45 leading-relaxed"
              style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300, maxWidth: "480px" }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            >
              England&apos;s first underground wine cellars, built in 1999, require no energy —
              relying on natural ambient temperature. Expanded in 2020 to store one million bottles.
              Rainwater harvesting, solar energy, and a Bio-Bubble system that has naturally cleaned
              over 22 million litres of waste water since inception.
            </motion.p>
          </div>
        </div>


        {/* ── Row 2: People — Text left, Image right ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Text — on mobile shows after image, on desktop shows left */}
          <div className="order-2 md:order-1">
            <motion.p
              className="font-display italic text-[#C8A96E] tracking-widest mb-5"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              [ The People ]
            </motion.p>

            <motion.h2
              className="font-display italic text-white leading-[1.08] mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 52px)", fontWeight: 400 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              Passionate. <span className="text-[#C8A96E]">Purpose-driven.</span>
            </motion.h2>

            <motion.p
              className="font-body text-white/60 leading-relaxed mb-5"
              style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, maxWidth: "480px" }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
            >
              A dedicated team of viticulturists, winemakers and hospitality professionals —
              working together to shape the future of English sparkling wine. From vineyard
              management to cellar craft, every hand plays a part.
            </motion.p>

            <motion.p
              className="font-body text-white/45 leading-relaxed mb-8"
              style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300, maxWidth: "480px" }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
            >
              Ridgeview believes in passion, purpose and a commitment to excellence. The team
              includes second-generation members who grew up among the vines — alongside
              specialist winemakers and a hospitality crew devoted to making every visit memorable.
            </motion.p>

          </div>

          {/* Image — portrait format */}
          <motion.div
            className="group relative overflow-hidden rounded-sm order-1 md:order-2 mx-auto md:mx-0"
            style={{ aspectRatio: "3/4", maxWidth: "420px", width: "100%" }}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/people.webp`}
              alt="Ridgeview team harvesting grapes in the vineyard"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: "center 30%" }}
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-sm" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
