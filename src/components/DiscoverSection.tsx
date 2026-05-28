"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { basePath } from "@/lib/basePath";

export function DiscoverSection() {
  return (
    <section
      id="discover"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Full-bleed background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/terroir-vineyard.jpg`}
        alt="Ridgeview vineyard, Ditchling Common"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 55%" }}
      />

      {/* Gradient overlays - darker at bottom for text legibility */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />

      {/* Content - vertically centred, pushes CTA to bottom */}
      <div className="absolute inset-0 flex flex-col justify-between px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto w-full flex-1 flex flex-col justify-center">

          {/* Kicker */}
          <motion.p
            className="font-display italic text-[#C8A96E] mb-5 tracking-widest"
            style={{ fontSize: "clamp(11px, 1.1vw, 14px)", textShadow: "0 1px 8px rgba(0,0,0,0.9), 0 0px 24px rgba(0,0,0,0.7)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.05 }}
          >
            [ Ditchling Common, East Sussex ]
          </motion.p>

          {/* Catchy headline - replaces DISCOVER / OUR VINEYARD */}
          <div className="overflow-hidden mb-2">
            <motion.h2
              className="font-display italic text-white leading-[1.0]"
              style={{ fontSize: "clamp(38px, 7.5vw, 110px)", fontWeight: 400 }}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              Born from chalk soil.
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              className="font-display italic text-white leading-[1.0]"
              style={{ fontSize: "clamp(38px, 7.5vw, 110px)", fontWeight: 400 }}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.0, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              Poured at the palace.
            </motion.h2>
          </div>

          {/* Description - larger, more legible */}
          <motion.p
            className="font-body text-white/75 leading-relaxed mb-10"
            style={{ fontSize: "clamp(14px, 1.5vw, 18px)", fontWeight: 400, maxWidth: "520px" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
          >
            Walk the rows where English sparkling wine was born - thirty acres of
            chalk and clay beneath the South Downs ridge. Tours and dining
            available year-round.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            <MagneticButton strength={0.04}>
              <a href={`${basePath}/vineyard-booking`} className="btn-cta">
                Discover our Vineyard
              </a>
            </MagneticButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
