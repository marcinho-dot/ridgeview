"use client";

import { motion } from "framer-motion";
import { basePath } from "@/lib/basePath";

/**
 * WineClubUpsellSection — Conversion block linking to OurView Wine Club.
 *
 * Background: lifestyle-bg.png (warm tasting / pour scene from existing assets).
 * Two-column on desktop: left = pitch + CTA, right = perks list.
 * Stacked on mobile.
 *
 * Brand-Voice compliance: only verifiable perks. The OurView club perks
 * sourced from ridgeview.co.uk/ourview/ as of Apr 2026 + the 20% wine
 * discount verified via every SKU-page PurchaseWidget memberNote
 * ("20% off for members") on ridgeview.co.uk (2026-05-12):
 * - 20% off every bottle, case and gift across the range
 * - Complimentary glass at Gingerman Group restaurants (Member + 3 guests)
 * - Complimentary glass at Royal Opera House (seasonal)
 * - 15% off Dr. Wills Natural Condiments
 * - 20% off Piglets Pantry
 */

const PERKS = [
  {
    label: "20% off every wine",
    detail: "Members save 20% on every bottle, case and gift across the Ridgeview range — applied automatically at checkout.",
  },
  {
    label: "First access",
    detail: "Members receive priority release of new vintages and limited editions before public launch.",
  },
  {
    label: "Vineyard partner-perks",
    detail: "Complimentary glasses of Bloomsbury at the Royal Opera House and Gingerman Group restaurants — member plus up to three guests.",
  },
  {
    label: "Curated Sussex partners",
    detail: "Member-only discounts at Dr. Wills Natural Condiments and Piglets Pantry.",
  },
  {
    label: "Cellar visits",
    detail: "Invitations to seasonal estate tastings and behind-the-scenes harvest experiences.",
  },
];

export function WineClubUpsellSection() {
  return (
    <section className="relative bg-[#0a0a0a] border-t border-white/[0.06] overflow-hidden">
      {/* Background image — lifestyle pour */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/lifestyle-bg.png`}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        style={{ objectPosition: "center 30%" }}
      />
      {/* Gradient overlay — left side darker for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-12 md:gap-20 items-center">
          {/* Left — pitch */}
          <div>
            <div className="reveal" style={{ transitionDelay: "0s" }}>
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ OurView Wine Club ]
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.1s" }}>
              <h2
                className="font-display italic text-cream leading-[1.05] mb-6"
                style={{ fontSize: "clamp(34px, 4.8vw, 68px)", fontWeight: 400 }}
              >
                For those who&rsquo;d rather <span className="text-[#C8A96E]">pour by the case</span>.
              </h2>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.2s" }}>
              <p
                className="font-body text-white/70 leading-[1.85] mb-9"
                style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, maxWidth: "440px" }}
              >
                Membership opens a quieter door to the estate &mdash; with vineyard
                partner-perks, first access to new releases, and seasonal cellar
                invitations woven through the year.
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.3s" }}>
              <a href={`${basePath}/#ourview`} className="btn-cta">
                Discover Membership
              </a>
            </div>
          </div>

          {/* Right — perks list */}
          <ul className="space-y-7 md:space-y-8">
            {PERKS.map((p, i) => (
              <motion.li
                key={p.label}
                className="group flex items-start gap-4 md:gap-5 border-b border-white/[0.06] pb-7 last:border-0 last:pb-0 cursor-default"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  aria-hidden
                  className="block w-1.5 h-1.5 rounded-full bg-[#C8A96E]/55 group-hover:bg-[#C8A96E] flex-shrink-0 mt-2.5 transition-colors duration-300"
                />
                <div className="flex-1 transition-transform duration-500 ease-out group-hover:translate-x-1">
                  <p
                    className="font-body text-cream uppercase tracking-[0.22em] mb-1.5"
                    style={{ fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 400 }}
                  >
                    {p.label}
                  </p>
                  <p
                    className="font-body text-white/55 group-hover:text-white/75 leading-relaxed transition-colors duration-500"
                    style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300 }}
                  >
                    {p.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
