"use client";

import { motion } from "framer-motion";

import { basePath } from "@/lib/basePath";

const benefits = [
  "GIFT SCHEDULING",
  "BOTTLE CUSTOMIZATION",
  "EXCLUSIVE EVENT INVITATIONS",
  "RARE CELLAR ACCESS",
];

export function OurViewSection() {

  return (
    <section id="ourview" className="relative overflow-hidden">
      {/* Full-bleed background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/cellar-bg.png`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center center" }}
      />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-20 px-6 md:px-16 py-20 md:py-28">

        {/* ── Left: Subscribe ── */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-4"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            [ OurView · Wine Club ]
          </p>

          <h2
            className="font-display text-cream mb-5 leading-tight"
            style={{ fontSize: "clamp(32px, 4vw, 60px)", fontStyle: "italic", fontWeight: 400 }}
          >
            GAIN ACCESS TO OUR <span className="text-[#C8A96E]">CELLAR</span> BY JOINING OURVIEW.
          </h2>

          {/* Draw-line divider */}
          <motion.div
            className="h-px bg-white/20 mb-6"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.7, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ maxWidth: "460px" }}
          />

          <p
            className="font-body text-white/60 text-sm leading-relaxed mb-8"
            style={{ fontWeight: 300, maxWidth: "460px" }}
          >
            Become a member of OurView to enjoy exclusive access to our private
            cellar, limited releases, and curated selections reserved for our
            community.
          </p>

          {/* Primary CTA - leads to the dedicated /wine-club/ landing
              page where the full pricing + member benefits live. The
              newsletter signup that used to sit below this has moved to
              the Footer ("Stay in the loop" column). */}
          <div>
            <a href={`${basePath}/wine-club/`} className="btn-cta">
              Discover Membership
            </a>
          </div>
        </motion.div>

        {/* ── Right: Benefits ── all four equally prominent (cream +
            arrow visible). Hover-only animation: the arrow slides
            forward, the text shifts to the brand gold, and a thin
            hairline draws underneath. */}
        <div className="flex flex-col justify-center gap-1">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              className="group relative flex items-center gap-4 py-3.5 cursor-default"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Arrow - always cream, slides 4px on hover */}
              <span
                aria-hidden
                className="font-body text-cream flex-shrink-0 transition-transform duration-400 ease-out group-hover:translate-x-1 group-hover:text-[#C8A96E]"
                style={{ minWidth: "24px", fontSize: "16px" }}
              >
                →
              </span>

              {/* Text - cream by default, gold on hover */}
              <span
                className="font-display transition-colors duration-400 text-cream group-hover:text-[#C8A96E]"
                style={{
                  fontSize: "clamp(20px, 2.8vw, 44px)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                }}
              >
                {benefit}
              </span>

              {/* Hover-drawn hairline underneath */}
              <span
                aria-hidden
                className="absolute bottom-0 left-10 right-0 h-px bg-[#C8A96E]/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
