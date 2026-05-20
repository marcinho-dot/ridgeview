"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { HashScroll } from "@/components/HashScroll";
import { MenuPdfModal, type MenuPdf } from "@/components/MenuPdfModal";
import { basePath } from "@/lib/basePath";

/**
 * /restaurant — The Rows & Vine Restaurant landing page.
 *
 * Top-level URL (not nested under /vineyard-booking) so the
 * restaurant gets its own SEO anchor and a shorter shareable link.
 * The previous "Reserve a Table" CTA on /vineyard-booking points
 * here.
 *
 * Sections (top → bottom):
 *   1. Hero — autoplay drone video + animated headline
 *   2. Welcome — pavilion photo + philosophy intro (2-col on desktop)
 *   3. Atmosphere banner — wide pavilion-at-golden-hour shot
 *   4. Sample Menus — 4 download cards that open a PDF modal
 *      preview with a Download button (MenuPdfModal)
 *   5. Visit info — 4-column hours / party size / dietary / accessibility
 *   6. FAQ — accordion with the verbatim UK FAQ answers
 *   7. Reserve — email + phone CTAs (OpenTable embed Phase 2)
 *   8. Cross-page rail — Tours, directions, Wine Club
 *
 * All imagery sourced from the UK restaurant page (with permission —
 * same brand, same restaurant). The drone video lives in /public/videos.
 */

// ── Section: Hero with autoplay drone video ────────────────────────────────
function RestaurantHero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#010101]">
      {/* No poster image — flashed visibly between paint and video
          autoplay (jarring on slow connections). Solid black bg
          stays under the video; the video fades in via autoplay
          once it has decoded enough frames. Looks cleaner than a
          poster→video swap. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${basePath}/videos/rows-vine-hero.mp4`} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/55 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex flex-col justify-end pb-[14vh] md:pb-[10vh] px-6 md:px-16 max-w-[1600px] mx-auto left-0 right-0">
        <motion.p
          className="font-display italic text-[#C8A96E] mb-4"
          style={{
            fontSize: "clamp(14px, 1.5vw, 18px)",
            letterSpacing: "0.18em",
            textShadow: "0 1px 10px rgba(0,0,0,1), 0 0px 30px rgba(0,0,0,0.9)",
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          [ The Rows &amp; Vine · Spring &amp; Summer ]
        </motion.p>

        <div className="relative">
          <h1
            className="relative font-display italic text-cream leading-[1.05] mb-5"
            style={{
              fontSize: "clamp(38px, 6.5vw, 102px)",
              fontWeight: 400,
              textShadow: "0 2px 22px rgba(0,0,0,0.9), 0 1px 6px rgba(0,0,0,0.95)",
              maxWidth: "16ch",
            }}
          >
            {[
              <span key="l1">Dine alfresco,</span>,
              <span key="l2">
                <span className="text-[#C8A96E]">among the vines</span>.
              </span>,
            ].map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.55 + i * 0.18,
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.div
          className="mt-3 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#reserve" className="btn-cta">
            Reserve a Table
          </a>
          <a href="#menus" className="btn-cta">
            View Menus
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section: Welcome — 2-col image + philosophy text ──────────────────────
function WelcomeSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-10 md:gap-16 items-center">
          {/* Image — pavilion in summer light, slight cinematic crop */}
          <div className="reveal" style={{ transitionDelay: "0.05s" }}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/images/restaurant/pavilion-summer.webp`}
                alt="The Rows & Vine alfresco pavilion in summer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/15 transition-colors duration-700 group-hover:bg-black/5" />
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="reveal" style={{ transitionDelay: "0.15s" }}>
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ Vineyard Restaurant · Sussex ]
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.25s" }}>
              <h2
                className="font-display italic text-cream leading-[1.08] mb-6"
                style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}
              >
                A playground for{" "}
                <span className="text-[#C8A96E]">celebration</span>.
              </h2>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.35s" }}>
              <p
                className="font-body text-white/65 leading-[1.85] mb-5"
                style={{
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  fontWeight: 300,
                  maxWidth: "560px",
                }}
              >
                Our vineyard restaurant is made for celebration. Dine alfresco
                through spring and summer, with soaring vineyard views.
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.45s" }}>
              <p
                className="font-body text-white/55 leading-[1.85]"
                style={{
                  fontSize: "clamp(14px, 1.3vw, 16px)",
                  fontWeight: 300,
                  maxWidth: "560px",
                }}
              >
                A wine-inspired menu journeys through seasonal flavours and
                sensational wines, while palate-tingling plates share the
                stories of the places, producers and people behind
                Ridgeview&rsquo;s award-winning wines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Atmosphere banner — full-bleed cinematic shot ─────────────────
function AtmosphereBanner() {
  return (
    <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden border-t border-white/[0.06]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/restaurant/restaurant-interior.webp`}
        alt="The Rows & Vine interior — warm cellar dining"
        className="absolute inset-0 w-full h-full object-cover"
        // Anchor the crop to the upper third — image's top section
        // (vineyard rows beyond the tables) is the more cinematic
        // half. Default centre-cover hid most of the vineyard.
        style={{ objectPosition: "center 20%" }}
      />

      {/* Overlay stack tuned 2026-05-20 for text legibility.
          - Base vertical gradient: heavier at top + bottom, lets the
            middle of the image breathe.
          - Center radial darken: a focused vignette under the pull-
            quote that pulls the bright green vines back into shadow
            so the cream + gold typography reads clearly without
            losing the vineyard backdrop. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65 pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-cream text-center leading-[1.25]"
          style={{
            fontSize: "clamp(22px, 2.8vw, 40px)",
            fontWeight: 400,
            maxWidth: "780px",
            // Triple-layered text shadow — heavy inner core for
            // contrast, soft outer halo for atmosphere, far blur
            // glow for any remaining bright image patches.
            textShadow:
              "0 2px 4px rgba(0,0,0,0.95), 0 4px 18px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.7)",
          }}
        >
          Every occasion deserves something{" "}
          <span className="text-[#C8A96E]">extraordinary</span>.
        </motion.p>
      </div>
    </section>
  );
}

// ── Section: Sample Menus — opens MenuPdfModal on click ───────────────────
const MENUS: MenuPdf[] = [
  { label: "Food Menu", href: "/docs/restaurant/food-menu.pdf" },
  { label: "Sunday Menu", href: "/docs/restaurant/sunday-menu.pdf" },
  { label: "Wine List", href: "/docs/restaurant/wine-list.pdf" },
  { label: "Drinks List", href: "/docs/restaurant/drinks-list.pdf" },
];

// Menu card images — the EXACT same shots the UK restaurant page
// shows next to each menu link (verified 2026-05-20 via the
// `data-src` attributes inside the "Explore our sample menus"
// section of the page HTML). Stored locally under /images/restaurant/
// with semantic names (the UK filenames were generic numerics —
// "10.png.webp" etc. — which break the asset-folder readability).
const MENU_DETAILS: Record<string, { detail: string; image: string }> = {
  "Food Menu": {
    detail: "Seasonal sharing plates · Spring 2026",
    image: "/images/restaurant/menu-food.webp",
  },
  "Sunday Menu": {
    detail: "Sunday roast & seasonal feast",
    image: "/images/restaurant/menu-sunday.webp",
  },
  "Wine List": {
    detail: "Ridgeview cellar + global selection",
    image: "/images/restaurant/menu-wine.webp",
  },
  "Drinks List": {
    detail: "Cocktails, soft drinks & spirits",
    image: "/images/restaurant/menu-drinks.webp",
  },
};

function MenuViewIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function MenusSection({ onOpen }: { onOpen: (m: MenuPdf) => void }) {
  return (
    <section id="menus" className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06] scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16 max-w-[760px] mx-auto">
          <div className="reveal" style={{ transitionDelay: "0.05s" }}>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-5"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
            >
              [ Sample Menus ]
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <h2
              className="font-display italic text-cream leading-[1.08] mb-6"
              style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}
            >
              Explore our <span className="text-[#C8A96E]">menus</span>.
            </h2>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.25s" }}>
            <p
              className="font-body text-white/55 leading-relaxed mx-auto"
              style={{
                fontSize: "clamp(14px, 1.3vw, 16px)",
                fontWeight: 300,
                maxWidth: "560px",
              }}
            >
              Our wine-inspired menu places Ridgeview&rsquo;s award-winning
              sparkling wines at the heart of every dish. Click any menu to
              preview — download for offline reading.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-[1100px] mx-auto">
          {MENUS.map((m, i) => {
            const info = MENU_DETAILS[m.label];
            return (
              <motion.li
                key={m.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: 0.05 + (i % 2) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  type="button"
                  onClick={() => onOpen(m)}
                  className="group w-full bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md transition-all duration-400 text-left overflow-hidden"
                >
                  {/* Image-first layout — atmospheric food/wine
                      photography sets the tone for each menu. Aspect
                      16:9 reads as a magazine plate. */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#0a0a0a]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${basePath}${info.image}`}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition-colors duration-700 group-hover:from-black/40" />
                  </div>

                  {/* Caption row */}
                  <div className="flex items-center gap-4 md:gap-5 p-5 md:p-6">
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-display italic text-cream group-hover:text-white transition-colors duration-400 leading-[1.15] mb-1"
                        style={{ fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 400 }}
                      >
                        {m.label}
                      </p>
                      <p
                        className="font-body text-white/45 group-hover:text-white/65 transition-colors duration-400"
                        style={{ fontSize: "13px", fontWeight: 300 }}
                      >
                        {info.detail}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="flex-shrink-0 inline-flex items-center gap-1.5 font-body text-[#C8A96E]/70 group-hover:text-[#C8A96E] uppercase tracking-[0.2em] transition-colors duration-400"
                      style={{ fontSize: "10px" }}
                    >
                      <MenuViewIcon />
                      View
                    </span>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// ── Section: Practical info — hours, party size, dietary, accessibility ─
function VisitInfoSection() {
  const blocks = [
    {
      label: "Hours",
      anchor: "hours",
      lines: [
        "Thursday to Monday",
        "11am – 6:30pm",
        "Kitchen 11am – 4:30pm",
        "Last booking 4pm",
        "Spring & Summer only",
      ],
    },
    {
      label: "Party Size",
      lines: [
        "Walk-ins welcome subject to availability",
        "Tables for 8+ guests: book by email",
        "Private hire up to 150 guests in our pavilions or stretch tent (excluding weekends & bank holidays)",
      ],
    },
    {
      label: "Dietary",
      lines: [
        "Vegan and vegetarian options available",
        "Allergens and intolerances accommodated",
        "Please inform your server on arrival",
      ],
    },
    {
      label: "Accessibility",
      lines: [
        "Step-free access from car park across the estate",
        "Dedicated disabled parking",
        "Children welcome — under-18s must be supervised",
        "Only guide & assistance dogs",
      ],
    },
  ];

  return (
    <section
      id="visit"
      className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06] scroll-mt-24"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16 max-w-[760px] mx-auto">
          <div className="reveal" style={{ transitionDelay: "0.05s" }}>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-5"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
            >
              [ Plan Your Visit ]
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <h2
              className="font-display italic text-cream leading-[1.08] mb-6"
              style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}
            >
              Before you <span className="text-[#C8A96E]">arrive</span>.
            </h2>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {blocks.map((b, i) => (
            <motion.li
              key={b.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              {...(b.anchor ? { id: b.anchor } : {})}
              className="scroll-mt-24"
            >
              <p
                className="font-body text-[#C8A96E] uppercase tracking-[0.25em] mb-4"
                style={{ fontSize: "11px", fontWeight: 400 }}
              >
                {b.label}
              </p>
              <ul className="space-y-2">
                {b.lines.map((line, j) => (
                  <li
                    key={j}
                    className="font-body text-white/65 leading-relaxed"
                    style={{ fontSize: "14px", fontWeight: 300 }}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section: FAQ accordion — verbatim from UK FAQ ──────────────────────────
const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "Do I need to make a reservation?",
    a: "Advance reservations are recommended to secure your table and avoid disappointment, especially during busy periods. Walk-ins are welcome subject to availability.",
  },
  {
    q: "What if my party is larger than 8 guests?",
    a: "Tables for 8 or more guests need to be booked by email at [email protected] — we'll plan around your group size and the season.",
  },
  {
    q: "Are children welcome?",
    a: "Yes, under-18s are welcome at our restaurant. Children must be supervised by an adult at all times during the visit. We operate a Challenge 25 policy when serving alcohol.",
  },
  {
    q: "What about dogs?",
    a: "Only guide dogs and assistance dogs are allowed at The Rows & Vine.",
  },
  {
    q: "Is there a dress code?",
    a: "Casual dress and footwear is recommended for comfort. The Rows & Vine is an alfresco setting in spring and summer — dress appropriately for the weather. Our pavilions are heated and have retractable roofs and sides to protect from wind and rain.",
  },
  {
    q: "What allergies / intolerances can you accommodate?",
    a: "Vegan and vegetarian options are available. For other allergies or intolerances, please let your server know on arrival and we'll work with you.",
  },
  {
    q: "Can you host private events or weddings?",
    a: "We host private dining for up to 150 guests in our pavilions or stretch tent (excluding weekends and bank holidays). We don't hold a wedding ceremony licence, but we love hosting pre- and post-wedding dining and drinks. Email [email protected].",
  },
  {
    q: "How do I get there?",
    a: "We're at Fragbarrow Lane, Ditchling Common, BN6 8TP — under an hour from London Bridge by train, 15 minutes from Brighton. Step-free access across the estate, dedicated disabled parking, EV chargers available.",
  },
];

function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.03 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-white/[0.08]"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center gap-4 py-5 md:py-6 text-left group"
      >
        <span
          className="flex-1 font-display italic text-cream group-hover:text-white transition-colors duration-300"
          style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 400 }}
        >
          {q}
        </span>
        <span
          aria-hidden
          className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-sm border border-white/15 group-hover:border-[#C8A96E]/50 text-white/60 group-hover:text-[#C8A96E] transition-all duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p
            className="font-body text-white/65 leading-[1.85] pb-6 md:pb-7 pr-10"
            style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 300 }}
          >
            {a}
          </p>
        </motion.div>
      )}
    </motion.li>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06] scroll-mt-24">
      <div className="max-w-[960px] mx-auto px-6 md:px-16">
        <div className="text-center mb-10 md:mb-14">
          <div className="reveal" style={{ transitionDelay: "0.05s" }}>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-5"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
            >
              [ Frequently Asked ]
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <h2
              className="font-display italic text-cream leading-[1.08] mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400 }}
            >
              Visiting <span className="text-[#C8A96E]">The Rows &amp; Vine</span>.
            </h2>
          </div>
        </div>

        <ul className="border-t border-white/[0.08]">
          {FAQ_ITEMS.map((it, i) => (
            <FaqItem key={it.q} q={it.q} a={it.a} idx={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section: Reservation CTA ───────────────────────────────────────────────
function ReserveSection() {
  return (
    <section
      id="reserve"
      className="relative bg-[#010101] py-24 md:py-32 border-t border-white/[0.06] overflow-hidden scroll-mt-24"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1000px] mx-auto px-6 md:px-16 text-center">
        <div className="reveal" style={{ transitionDelay: "0.05s" }}>
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-5"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            [ Reservations ]
          </p>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.15s" }}>
          <h2
            className="font-display italic text-cream leading-[1.08] mb-7"
            style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}
          >
            Reserve your <span className="text-[#C8A96E]">table</span>.
          </h2>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.25s" }}>
          <p
            className="font-body text-white/65 leading-[1.85] mx-auto mb-10"
            style={{
              fontSize: "clamp(14px, 1.3vw, 16px)",
              fontWeight: 300,
              maxWidth: "560px",
            }}
          >
            Advance reservations are recommended, especially during busy
            periods. Walk-ins welcome subject to availability.
          </p>
        </div>

        <div className="reveal flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12" style={{ transitionDelay: "0.35s" }}>
          <a href="mailto:[email protected]" className="btn-cta">
            Email to Reserve
          </a>
          <a href="tel:+441444242040" className="btn-cta">
            Call 01444 242040
          </a>
        </div>

        <div className="reveal" style={{ transitionDelay: "0.45s" }}>
          <p
            className="font-body text-white/45 leading-relaxed"
            style={{ fontSize: "12.5px", fontWeight: 300, letterSpacing: "0.04em" }}
          >
            For tables of 8 or more, weddings and private events please email
            us — we&rsquo;ll plan around your group size and the season.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section: Cross-page links ──────────────────────────────────────────────
function ContextLinksSection() {
  const links = [
    {
      label: "Vineyard Tours & Tastings",
      blurb: "Walk the rows. Taste the cellar.",
      href: "/vineyard-booking",
    },
    {
      label: "How to Find Us",
      blurb: "Train, bus, bike, car — every way to reach Ridgeview.",
      href: "/directions",
    },
    {
      label: "OurView Wine Club",
      blurb: "10% off food at The Rows & Vine for members.",
      href: "/wine-club",
    },
  ];
  return (
    <section className="relative bg-[#010101] py-16 md:py-20 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={`${basePath}${l.href}`}
                className="group block bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 hover:bg-[#C8A96E]/[0.03] rounded-md p-7 md:p-8 transition-all duration-400"
              >
                <p
                  className="font-display italic text-cream group-hover:text-white transition-colors duration-400 leading-[1.15] mb-3"
                  style={{ fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 400 }}
                >
                  {l.label}
                </p>
                <p
                  className="font-body text-white/55 group-hover:text-white/75 transition-colors duration-400 mb-5"
                  style={{ fontSize: "13.5px", fontWeight: 300 }}
                >
                  {l.blurb}
                </p>
                <span
                  className="inline-flex font-body text-cream uppercase tracking-[0.22em] pb-1 relative"
                  style={{ fontSize: "10.5px", fontWeight: 400 }}
                >
                  Discover
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 bottom-0 h-px bg-[#C8A96E] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function RestaurantPage() {
  const [openMenu, setOpenMenu] = useState<MenuPdf | null>(null);
  return (
    <div className="bg-[#010101] min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <Navbar />
      <HashScroll />
      <main>
        <RestaurantHero />
        <ScrollReset><WelcomeSection /></ScrollReset>
        <AtmosphereBanner />
        <ScrollReset><MenusSection onOpen={setOpenMenu} /></ScrollReset>
        <ScrollReset><VisitInfoSection /></ScrollReset>
        <ScrollReset><FaqSection /></ScrollReset>
        <ScrollReset><ReserveSection /></ScrollReset>
        <ScrollReset><ContextLinksSection /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />

      <MenuPdfModal pdf={openMenu} onClose={() => setOpenMenu(null)} />
    </div>
  );
}
