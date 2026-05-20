"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { HashScroll } from "@/components/HashScroll";
import { basePath } from "@/lib/basePath";

/**
 * /restaurant — The Rows & Vine Restaurant landing page.
 *
 * Top-level URL (not /vineyard-booking/restaurant) so the restaurant
 * gets its own SEO anchor and shorter shareable link. The previous
 * "Reserve a Table" CTA on /vineyard-booking now points here.
 *
 * Page covers the full restaurant story:
 *   - Hero (drone video loop of the pavilion + vineyard)
 *   - Welcome / philosophy intro
 *   - Sample Menus download grid (4 PDFs)
 *   - Practical info (hours, party size, dietary, accessibility)
 *   - Reservation CTA (email + phone — OpenTable embed deferred to
 *     Phase 2 of the roadmap)
 *
 * Footer links across the site now route to anchors on this page
 * (#menus, #reserve, #visit) so the wayfinding is consistent.
 */

// ── Section: Hero with autoplay drone video ────────────────────────────────
function RestaurantHero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Background video — drone shot of The Rows & Vine pavilion.
          Muted + autoPlay + loop + playsInline so it works on mobile
          (Safari/iOS) without user interaction. Poster falls back to
          a still frame while the video downloads. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={`${basePath}/images/booking/7.jpg`}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${basePath}/videos/rows-vine-hero.mp4`} type="video/mp4" />
      </video>

      {/* Three-layer overlay stack — matches the Vineyard Hero
          treatment so the two booking-adjacent pages feel like one
          family. Top gradient is darker (text legibility), bottom
          lighter (let the pavilion read), centre fades through black
          for the CTA area. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/55 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent pointer-events-none" />

      {/* Hero copy — anchored bottom-left on desktop, bottom-centre
          on mobile. Editorial line-reveal animation. */}
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

// ── Section: Welcome / philosophy intro ────────────────────────────────────
function WelcomeSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16 text-center">
        <div className="reveal" style={{ transitionDelay: "0.05s" }}>
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-5"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            [ Vineyard Restaurant · Sussex ]
          </p>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.15s" }}>
          <h2
            className="font-display italic text-cream leading-[1.08] mb-7"
            style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}
          >
            A playground for <span className="text-[#C8A96E]">celebration</span>.
          </h2>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.25s" }}>
          <p
            className="font-body text-white/65 leading-[1.85] mx-auto mb-5"
            style={{
              fontSize: "clamp(15px, 1.4vw, 18px)",
              fontWeight: 300,
              maxWidth: "640px",
            }}
          >
            Our vineyard restaurant is made for celebration. Dine alfresco
            through spring and summer, with soaring vineyard views.
          </p>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.35s" }}>
          <p
            className="font-body text-white/55 leading-[1.85] mx-auto"
            style={{
              fontSize: "clamp(14px, 1.3vw, 16px)",
              fontWeight: 300,
              maxWidth: "640px",
            }}
          >
            A wine-inspired menu journeys through seasonal flavours and
            sensational wines, while palate-tingling plates share the stories
            of the places, producers and people behind Ridgeview&rsquo;s
            award-winning wines.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section: Sample Menus download grid ────────────────────────────────────
const MENUS = [
  {
    label: "Food Menu",
    detail: "Seasonal sharing plates · Spring 2026",
    href: "/docs/restaurant/food-menu.pdf",
  },
  {
    label: "Sunday Menu",
    detail: "Sunday roast & seasonal feast",
    href: "/docs/restaurant/sunday-menu.pdf",
  },
  {
    label: "Wine List",
    detail: "Ridgeview cellar + global selection",
    href: "/docs/restaurant/wine-list.pdf",
  },
  {
    label: "Drinks List",
    detail: "Cocktails, soft drinks &amp; spirits",
    href: "/docs/restaurant/drinks-list.pdf",
  },
] as const;

function MenuDownloadIcon() {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function MenusSection() {
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
              sparkling wines at the heart of every dish. Sample menus shown —
              subject to change with the season.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7 max-w-[960px] mx-auto">
          {MENUS.map((m, i) => (
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
              <a
                href={`${basePath}${m.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 md:gap-6 p-6 md:p-7 bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 hover:bg-[#C8A96E]/[0.03] rounded-md transition-all duration-400"
              >
                <span className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-sm border border-[#C8A96E]/30 group-hover:border-[#C8A96E]/70 bg-[#C8A96E]/[0.04] group-hover:bg-[#C8A96E]/[0.10] flex items-center justify-center text-[#C8A96E]/80 group-hover:text-[#C8A96E] transition-colors duration-400">
                  <MenuDownloadIcon />
                </span>
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
                    dangerouslySetInnerHTML={{ __html: m.detail }}
                  />
                </div>
                <span
                  aria-hidden
                  className="font-body text-[#C8A96E]/60 group-hover:text-[#C8A96E] uppercase tracking-[0.2em] transition-colors duration-400"
                  style={{ fontSize: "10px" }}
                >
                  PDF
                </span>
              </a>
            </motion.li>
          ))}
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

// ── Section: Reservation CTA ───────────────────────────────────────────────
function ReserveSection() {
  return (
    <section
      id="reserve"
      className="relative bg-[#010101] py-24 md:py-32 border-t border-white/[0.06] overflow-hidden scroll-mt-24"
    >
      {/* Atmospheric gold radial */}
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

        {/* Two contact methods — email + phone — laid out side by side
            on desktop, stacked on mobile. Same `.btn-cta` etched-crystal
            treatment as every other CTA on the site. */}
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

// ── Section: Cross-page links — Tours, Wine Bar, Directions ───────────────
function ContextLinksSection() {
  const links = [
    {
      label: "Vineyard Tours & Tastings",
      blurb: "Walk the rows. Taste the cellar.",
      href: "/vineyard-booking",
    },
    {
      label: "Opening Times & Directions",
      blurb: "How to find us across all of Ridgeview.",
      href: "/vineyard-booking#practical",
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
  const _scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={_scrollRef} className="bg-[#010101] min-h-screen">
      {/* Grain noise overlay — visual continuity with other non-home routes */}
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
        <ScrollReset>
          <WelcomeSection />
        </ScrollReset>
        <ScrollReset>
          <MenusSection />
        </ScrollReset>
        <ScrollReset>
          <VisitInfoSection />
        </ScrollReset>
        <ScrollReset>
          <ReserveSection />
        </ScrollReset>
        <ScrollReset>
          <ContextLinksSection />
        </ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
