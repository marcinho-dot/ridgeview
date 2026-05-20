"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

/**
 * /directions — "How to Get to Ridgeview" deep-dive landing.
 *
 * The Footer's "How to get to Ridgeview" link previously routed to
 * a 4-column block on /vineyard-booking that only fit an address +
 * one sentence. This dedicated page hosts the full UK travel guide:
 * Train + walking route, Bus, Taxi, Cycling, Car (+ EV chargers),
 * Coach, Car Share, and full accessibility detail.
 *
 * Page structure:
 *   1. Hero — minimal, fast read
 *   2. Address card with Google Maps link
 *   3. Transport mode grid — 6 cards in 2/3-col grid
 *   4. Detailed walking route from Burgess Hill station (5 steps)
 *   5. Accessibility & step-free access detail
 *   6. Return rail to Vineyard Booking + Restaurant
 *
 * Content sourced verbatim from
 * ridgeview.co.uk/visit/visiting-us/how-to-get-to-ridgeview/.
 */

// ── Section: Hero ───────────────────────────────────────────────────────────
function DirectionsHero() {
  return (
    <section className="relative bg-[#010101] overflow-hidden pt-28 md:pt-32 pb-14 md:pb-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 30%, rgba(200,169,110,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-5"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
        >
          [ How to Find Us · South Downs ]
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-cream leading-[1.06] mb-6"
          style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400 }}
        >
          Getting to <span className="text-[#C8A96E]">Ridgeview</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="font-body text-white/65 leading-[1.75] mx-auto"
          style={{
            fontSize: "clamp(14px, 1.4vw, 17px)",
            fontWeight: 300,
            maxWidth: "560px",
          }}
        >
          Under an hour from London Bridge, fifteen minutes from Brighton.
          Train, bus, bike, car or coach — every route to the South Downs.
        </motion.p>
      </div>
    </section>
  );
}

// ── Section: Address card with Maps link ───────────────────────────────────
function AddressSection() {
  return (
    <section className="relative bg-[#010101] py-10 md:py-12 border-t border-white/[0.06]">
      <div className="max-w-[960px] mx-auto px-6 md:px-16">
        <div className="reveal flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-10 bg-[#0d0d0d] border border-white/[0.08] rounded-md p-6 md:p-8">
          <div className="flex-1">
            <p
              className="font-body text-[#C8A96E] uppercase tracking-[0.24em] mb-2"
              style={{ fontSize: "10.5px", fontWeight: 400 }}
            >
              Visit
            </p>
            <p
              className="font-display italic text-cream leading-[1.3]"
              style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 400 }}
            >
              Ridgeview Wine Estate
            </p>
            <p
              className="font-body text-white/65 leading-[1.55] mt-1"
              style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 300 }}
            >
              Fragbarrow Lane, Ditchling Common, East Sussex, BN6 8TP
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://g.page/RidgeviewWineUK?share"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
            >
              Open in Maps
            </a>
            <a href="tel:+441444242040" className="btn-cta">
              01444 242040
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Transport modes grid ──────────────────────────────────────────
const TRANSPORT_MODES = [
  {
    label: "By Train",
    headline: "Burgess Hill Station",
    body: "Regular Thameslink and Southern Rail service — under an hour from London Bridge, fifteen minutes from Brighton. From the station the estate is a 10-minute cycle, 40-minute walk, or short taxi ride.",
    detail: "Book via National Rail Enquiries or Trainline",
  },
  {
    label: "By Bus",
    headline: "Route 167",
    body: "Compass Travel's Village Rider 167 runs between Lewes, Burgess Hill and Ditchling. Folders Lane Roundabout stop is a 10-minute walk (under 0.5 miles) from the estate. Contactless payment.",
    detail: "Check times: compass-travel.co.uk",
  },
  {
    label: "By Taxi",
    headline: "Station Taxis",
    body: "Local provider with a rank outside Burgess Hill station. Approximately 10 minutes to the estate. Recommended for guests with accessibility requirements. Advance booking available.",
    detail: "Station Taxis, Burgess Hill",
  },
  {
    label: "By Bike",
    headline: "South Downs Welcome Scheme",
    body: "Secure cycle parking on site with helmet/bag storage and free water refills. A short ride from the South Downs Way National Trail. Plan your route via Cycle Street or Sustrans.",
    detail: "Part of the Cyclists & Walkers Welcome Scheme",
  },
  {
    label: "By Car",
    headline: "Visitor Parking + EV",
    body: "Dedicated visitor parking. Three electric charging points in our car park (Porsche partnership; Podpoint and ChargeYourCar networks). Dedicated disabled spaces close to the entrance.",
    detail: "Free parking. EV charging available on arrival",
  },
  {
    label: "By Coach",
    headline: "Group Travel",
    body: "Cost-effective for larger parties and corporate events. RDH Coaches (eco-friendly) and CT Sussex Transport (community charity offering private fleet hire) operate locally.",
    detail: "Email [email protected] for group arrangements",
  },
];

function ModeIcon({ label }: { label: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (label === "By Train")
    return (
      <svg {...common}>
        <rect x="4" y="3" width="16" height="16" rx="2" />
        <path d="M4 11h16" />
        <circle cx="8.5" cy="15" r="1" />
        <circle cx="15.5" cy="15" r="1" />
        <path d="M9 19l-2 3M15 19l2 3" />
      </svg>
    );
  if (label === "By Bus")
    return (
      <svg {...common}>
        <path d="M8 6v6" />
        <path d="M15 6v6" />
        <path d="M2 12h19.6" />
        <path d="M18 18h2a2 2 0 0 0 2-2v-7c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v7c0 1.1.9 2 2 2h2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    );
  if (label === "By Taxi")
    return (
      <svg {...common}>
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    );
  if (label === "By Bike")
    return (
      <svg {...common}>
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M15 6h2l3 11.5" />
        <path d="M9 18h-3l3-9 6 9" />
        <path d="M12 9l3 0" />
      </svg>
    );
  if (label === "By Car")
    return (
      <svg {...common}>
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    );
  if (label === "By Coach")
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="13" rx="2" />
        <path d="M3 9h18" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="17" cy="19" r="2" />
      </svg>
    );
  return null;
}

function TransportSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16 max-w-[680px] mx-auto">
          <div className="reveal" style={{ transitionDelay: "0.05s" }}>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-5"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
            >
              [ Travel Options ]
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <h2
              className="font-display italic text-cream leading-[1.08]"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400 }}
            >
              Choose your <span className="text-[#C8A96E]">route</span>.
            </h2>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {TRANSPORT_MODES.map((m, i) => (
            <motion.li
              key={m.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: 0.05 + (i % 3) * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/30 rounded-md p-6 md:p-7 transition-colors duration-400"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-sm border border-[#C8A96E]/25 group-hover:border-[#C8A96E]/55 bg-[#C8A96E]/[0.04] text-[#C8A96E]/85 group-hover:text-[#C8A96E] transition-colors duration-400">
                  <ModeIcon label={m.label} />
                </span>
                <span
                  className="font-body text-[#C8A96E] uppercase tracking-[0.22em]"
                  style={{ fontSize: "10.5px", fontWeight: 400 }}
                >
                  {m.label}
                </span>
              </div>
              <p
                className="font-display italic text-cream leading-[1.2] mb-3"
                style={{ fontSize: "clamp(18px, 1.7vw, 22px)", fontWeight: 400 }}
              >
                {m.headline}
              </p>
              <p
                className="font-body text-white/65 leading-[1.7] mb-3"
                style={{ fontSize: "13.5px", fontWeight: 300 }}
              >
                {m.body}
              </p>
              <p
                className="font-body text-white/40"
                style={{ fontSize: "11.5px", fontWeight: 300, letterSpacing: "0.04em" }}
              >
                {m.detail}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section: Walking route from Burgess Hill station ───────────────────────
function WalkingRouteSection() {
  const steps = [
    "Exit the station and turn right onto Station Road.",
    "Continue uphill toward the roundabout. Stay right onto Keymer Road.",
    "Pass Burgess Hill School for Girls (about 0.3 miles). Turn left at the mini-roundabout onto Folders Lane.",
    "Continue 0.8 miles along Folders Lane. Turn right into Stroudley Drive.",
    "Follow the path to the stile entering the Ridgeview estate.",
  ];

  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10 md:gap-16">
          <div>
            <div className="reveal" style={{ transitionDelay: "0.05s" }}>
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ The Walking Route ]
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.15s" }}>
              <h2
                className="font-display italic text-cream leading-[1.08] mb-5"
                style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 400 }}
              >
                Thirty minutes from the <span className="text-[#C8A96E]">station</span>.
              </h2>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.25s" }}>
              <p
                className="font-body text-white/55 leading-[1.85] mb-2"
                style={{ fontSize: "clamp(13.5px, 1.25vw, 15px)", fontWeight: 300 }}
              >
                Allow about 30 minutes from Burgess Hill station. The
                footpath can get muddy — wear appropriate footwear,
                especially after rain.
              </p>
            </div>
          </div>

          <ol className="space-y-5">
            {steps.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 md:gap-5"
              >
                <span
                  className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#C8A96E]/40 text-[#C8A96E] font-display italic"
                  style={{ fontSize: "15px", fontWeight: 400 }}
                >
                  {i + 1}
                </span>
                <p
                  className="font-body text-white/75 leading-[1.7] pt-1.5"
                  style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 300 }}
                >
                  {s}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ── Section: Accessibility ────────────────────────────────────────────────
function AccessibilitySection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-24 border-t border-white/[0.06]">
      <div className="max-w-[960px] mx-auto px-6 md:px-16 text-center">
        <div className="reveal" style={{ transitionDelay: "0.05s" }}>
          <p
            className="font-display italic text-[#C8A96E] tracking-widest mb-5"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
          >
            [ Accessibility ]
          </p>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.15s" }}>
          <h2
            className="font-display italic text-cream leading-[1.08] mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 400 }}
          >
            Step-free across the <span className="text-[#C8A96E]">entire estate</span>.
          </h2>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.25s" }}>
          <p
            className="font-body text-white/65 leading-[1.85] mx-auto mb-6"
            style={{
              fontSize: "clamp(14.5px, 1.35vw, 17px)",
              fontWeight: 300,
              maxWidth: "640px",
            }}
          >
            Step-free access runs from our car park across the entire estate,
            including the vineyard, winery shop, tasting rooms, restaurant,
            bar and bathrooms. Dedicated disabled parking close to the
            entrance.
          </p>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.35s" }}>
          <p
            className="font-body text-white/55 leading-[1.85] mx-auto"
            style={{
              fontSize: "clamp(13px, 1.2vw, 15px)",
              fontWeight: 300,
              maxWidth: "640px",
            }}
          >
            For additional mobility or access requirements, please get in touch in
            advance — tours{" "}
            <a
              href="mailto:[email protected]"
              className="link-underline text-cream hover:text-[#C8A96E] transition-colors"
            >
              [email protected]
            </a>
            , restaurant{" "}
            <a
              href="mailto:[email protected]"
              className="link-underline text-cream hover:text-[#C8A96E] transition-colors"
            >
              [email protected]
            </a>
            , or call{" "}
            <a
              href="tel:+441444242040"
              className="link-underline text-cream hover:text-[#C8A96E] transition-colors"
            >
              01444 242040
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section: Return rail ───────────────────────────────────────────────────
function ReturnRailSection() {
  const links = [
    {
      label: "Book a Tour or Tasting",
      blurb: "Walk the rows. Taste the cellar.",
      href: "/vineyard-booking",
    },
    {
      label: "The Rows & Vine Restaurant",
      blurb: "Alfresco dining among the vines.",
      href: "/restaurant",
    },
  ];
  return (
    <section className="relative bg-[#010101] py-16 md:py-20 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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

export default function DirectionsPage() {
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
      <main>
        <DirectionsHero />
        <ScrollReset><AddressSection /></ScrollReset>
        <ScrollReset><TransportSection /></ScrollReset>
        <ScrollReset><WalkingRouteSection /></ScrollReset>
        <ScrollReset><AccessibilitySection /></ScrollReset>
        <ScrollReset><ReturnRailSection /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
