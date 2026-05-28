"use client";

import { motion } from "framer-motion";

type Benefit = { title: string; body: string };

/**
 * Consolidated OurView member benefits.
 *
 * Merged + de-duplicated from two former sources:
 *   - the flat 11-item perks list that used to live on this page
 *   - the detailed 9-card /wine-club/benefits page (now removed —
 *     ~90% redundant, UX-overkill as a separate route).
 *
 * De-duplication: the three discount lines collapse into one
 * "Member Discounts" card; "limited-edition" + "archive" wines
 * collapse into one. All copy is verified against the live
 * ridgeview.co.uk/ourview-wine-club page — nothing fabricated.
 */
const BENEFITS: Benefit[] = [
  {
    title: "Luxury Welcome Case",
    body: "A luxury Welcome Case worth £134 arrives at your door — a Bloomsbury NV gift set with two Ridgeview flutes, a bespoke stopper, your membership card and a complimentary Tour & Tasting voucher for two, valid 12 months.",
  },
  {
    title: "Member Discounts",
    body: "20% off Ridgeview wine all year round, 20% off classic tour and tasting bookings, plus 10% off food and 20% off wine when you dine at The Rows & Vine — applied automatically from the moment you join.",
  },
  {
    title: "Two Curated Cases a Year",
    body: "Each May and November a six-bottle case hand-picked by our Head Winemaker — twelve bottles annually across the Ridgeview portfolio, blending new discoveries with vintage classics.",
  },
  {
    title: "Next-Day Delivery, On Us",
    body: "Complimentary next-working-day delivery on every order — whether you're restocking your collection or sending a gift with a personalised note.",
  },
  {
    title: "Rare & Limited-Edition Wines",
    body: "Step inside the archive — limited-edition wines made exclusively for members, alongside some of the oldest and rarest vintages in English sparkling wine history, never released to the public.",
  },
  {
    title: "Priority Estate Invitations",
    body: "First access to a calendar of member-only experiences — Winemaker blending masterclasses, Riedel glass tastings, vertical archive flights, cheese pairings and seasonal celebrations.",
  },
  {
    title: "Dedicated OurView Concierge",
    body: "A dedicated Ridgeview concierge to plan your visits, secure the perfect table at The Rows & Vine, and recommend curated local hotel partners.",
  },
  {
    title: "The Joy of the Unexpected",
    body: "Spontaneous delights through the year — a gift tucked into a shipment, a ‘secret pour’ at the cellar door, birthday bubbles on a visit, rewards when you renew.",
  },
  {
    title: "Insight & Partner Privileges",
    body: "Exclusive behind-the-scenes articles and news from the vineyard, plus members-only offers with our luxury partner brands.",
  },
];

export function MemberBenefitsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {BENEFITS.map((b, i) => (
        // Outer wrapper owns the staggered scroll-reveal (Framer sets an
        // inline transform here). The inner <article> owns the hover-lift
        // via CSS — kept on a separate element so Framer's inline
        // transform can't override the Tailwind hover translate.
        <motion.div
          key={b.title}
          className="h-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: (i % 3) * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <article className="group relative h-full overflow-hidden rounded-sm border border-white/[0.08] bg-[#0a0a0a] p-7 md:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C8A96E]/45 hover:bg-[#0d0d0d]">
            {/* Soft gold radial that warms in from the top-left on hover */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 0% 0%, rgba(200,169,110,0.08) 0%, transparent 70%)",
              }}
            />

            <div className="relative flex items-center justify-between mb-5">
              <span
                className="font-display italic text-[#C8A96E]/70 group-hover:text-[#C8A96E] transition-all duration-500 group-hover:-translate-y-0.5"
                style={{ fontSize: "clamp(28px, 2.6vw, 38px)", fontWeight: 400 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="text-[#C8A96E]/40 group-hover:text-[#C8A96E]/80 transition-all duration-500 group-hover:scale-125"
                style={{ fontSize: "9px" }}
              >
                ◆
              </span>
            </div>

            <h3
              className="relative font-display italic text-cream leading-[1.15] mb-3"
              style={{ fontSize: "clamp(20px, 1.9vw, 26px)", fontWeight: 400 }}
            >
              {b.title}
            </h3>
            <p
              className="relative font-body text-white/55 group-hover:text-white/70 leading-[1.7] transition-colors duration-500"
              style={{ fontSize: "clamp(13px, 1.1vw, 14.5px)", fontWeight: 400 }}
            >
              {b.body}
            </p>

            {/* Gold hairline grows from the left on hover */}
            <span
              aria-hidden
              className="absolute left-7 md:left-8 bottom-0 h-px w-0 bg-[#C8A96E]/60 group-hover:w-12 transition-[width] duration-700 ease-out"
            />
          </article>
        </motion.div>
      ))}
    </div>
  );
}
