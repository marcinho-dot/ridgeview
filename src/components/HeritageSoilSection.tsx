"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { basePath } from "@/lib/basePath";

/* ─────────────────────────────────────────────────────────────────────────
   HeritageSoilSection
   Immersive editorial panel — estate image with text overlay + CTA
───────────────────────────────────────────────────────────────────────── */

export function HeritageSoilSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="heritage" ref={ref} className="bg-[#010101]">
      <div>
        {/* Immersive Full-Width Panel */}
        <div className="group relative overflow-hidden cursor-pointer">
          {/* Image */}
          <div className="aspect-[9/11] sm:aspect-[16/9] md:aspect-[2.4/1]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/vineyard-og.png`}
              alt="The Ridgeview Estate — vineyard rows leading to the South Downs ridge"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: "center 45%" }}
            />

            {/* Lighter on mobile so the image breathes — slightly stronger
                on desktop where the wider crop tolerates more weight. */}
            <div className="absolute inset-0 bg-black/20 sm:bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent sm:from-black/82 sm:via-black/35 sm:to-transparent" />
          </div>

          {/* Content overlay — bottom-aligned, content constrained to the
              same 1600px width as the Beyond the Bottle row above. */}
          <div className="absolute inset-0 flex flex-col justify-end pb-10 sm:pb-12 md:pb-16">
            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-16">
            {/* Kicker */}
            <motion.p
              className="font-display italic text-[#C8A96E] tracking-widest mb-4"
              style={{
                fontSize: "clamp(12px, 1.2vw, 15px)",
                textShadow: "0 1px 8px rgba(0,0,0,0.8)",
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              [ Where It All Begins ]
            </motion.p>

            {/* Headline */}
            <div className="overflow-hidden mb-5">
              <motion.h2
                className="font-display italic text-white"
                style={{
                  fontSize: "clamp(26px, 4vw, 58px)",
                  fontWeight: 400,
                  lineHeight: 1.08,
                  textShadow: "0 2px 16px rgba(0,0,0,0.9)",
                  maxWidth: "700px",
                }}
                initial={{ y: "100%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 1.0,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Chalk, Climate &{" "}
                <span className="text-[#C8A96E]">Craft</span>
              </motion.h2>
            </div>

            {/* Supporting text */}
            <motion.p
              className="font-body text-white/80 leading-relaxed mb-6 sm:mb-8"
              style={{
                fontSize: "clamp(13px, 1.2vw, 16px)",
                fontWeight: 300,
                maxWidth: "520px",
                textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              On the ancient chalk of the South Downs, where soil and
              microclimate mirror the finest terroirs of Champagne —
              visionary winemakers have been crafting award-winning English
              sparkling wine since 1995.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
            >
              <Link href="/vineyard-booking" className="btn-cta">
                Discover the Vineyard
              </Link>
            </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
