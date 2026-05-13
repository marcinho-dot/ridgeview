"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { basePath } from "@/lib/basePath";

// Substack publication slug — swap to the real Ridgeview Substack
// once it's set up. The embed URL is `https://<slug>.substack.com/embed`.
const SUBSTACK_SLUG = "ridgeview";

const benefits = [
  "GIFT SCHEDULING",
  "BOTTLE CUSTOMIZATION",
  "EXCLUSIVE EVENT INVITATIONS",
  "RARE CELLAR ACCESS",
];

export function OurViewSection() {
  const [email, setEmail] = useState("");
  const [activeBenefit, setActiveBenefit] = useState(0);

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

          {/* Primary CTA — leads to the dedicated /wine-club/ landing
              page where the full pricing + member benefits live. */}
          <div className="mb-10">
            <a href={`${basePath}/wine-club/`} className="btn-cta">
              Discover Membership
            </a>
          </div>

          {/* Secondary newsletter signup — styled to match the rest of
              the dark editorial theme. Posts to the Substack publication
              endpoint so subscribers land in the real list, without the
              white-bordered Substack iframe's visual clash. */}
          <div style={{ maxWidth: "460px" }} className="w-full">
            <p
              className="font-body text-white/45 uppercase tracking-[0.22em] mb-3"
              style={{ fontSize: "10px", fontWeight: 400 }}
            >
              Stay in the loop
            </p>
            <form
              action={`https://${SUBSTACK_SLUG}.substack.com/api/v1/free?nojs=true`}
              method="post"
              target="_blank"
              className="flex items-center gap-2 border-b border-white/22 w-full"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address for newsletter"
                required
                className="flex-1 bg-transparent font-body text-cream text-sm py-3 outline-none placeholder:text-white/30 focus:placeholder:text-white/50 transition-colors"
                style={{ fontWeight: 300 }}
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="group relative w-9 h-9 rounded-full border border-[#C8A96E]/55 hover:border-[#C8A96E] flex items-center justify-center transition-all duration-300 hover:bg-[#C8A96E]/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]/50"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#C8A96E] transition-transform duration-300 group-hover:translate-x-[2px]"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </form>
            <p
              className="font-body text-white/35 mt-3"
              style={{ fontSize: "11px", fontWeight: 300 }}
            >
              Cellar updates and seasonal releases. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>

        {/* ── Right: Benefits ── */}
        <div className="flex flex-col justify-center gap-1">
          {benefits.map((benefit, i) => (
            <motion.button
              key={benefit}
              onClick={() => setActiveBenefit(i)}
              className="flex items-center gap-4 py-3.5 text-left group"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Arrow indicator */}
              <motion.span
                className="font-body text-cream flex-shrink-0"
                animate={{
                  opacity: activeBenefit === i ? 1 : 0,
                  x: activeBenefit === i ? 0 : -10,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ minWidth: "24px", fontSize: "16px" }}
              >
                →
              </motion.span>

              {/* Text */}
              <span
                className="font-display transition-all duration-300"
                style={{
                  fontSize: "clamp(20px, 2.8vw, 44px)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: activeBenefit === i ? "#f5f0e8" : "rgba(245,240,232,0.30)",
                  letterSpacing: "0.02em",
                }}
              >
                {benefit}
              </span>

              {/* Draw-line under active */}
              {activeBenefit === i && (
                <motion.div
                  className="absolute h-px bg-white/20"
                  layoutId="benefit-line"
                  style={{ bottom: 0, left: "40px", right: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
