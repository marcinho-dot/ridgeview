"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

// ─── Email constants ────────────────────────────────────────────────────────
const CORPORATE_EMAIL = "info@ridgeview.co.uk";

const CORPORATE_EVENTS_MAILTO =
  `mailto:${CORPORATE_EMAIL}` +
  `?subject=${encodeURIComponent("Corporate hospitality / event enquiry — Ridgeview")}` +
  `&body=${encodeURIComponent(
    "Hello,\n\n" +
      "I'd like to enquire about hosting a corporate event at Ridgeview.\n\n" +
      "Company: \n" +
      "Event type (client entertainment / team building / board day / launch / party / other): \n" +
      "Approximate guest count: \n" +
      "Preferred date(s): \n" +
      "Duration (half day / full day / evening): \n" +
      "Catering / wine pairing needs: \n" +
      "Any other requirements (AV, accessibility, accommodation): \n\n" +
      "Contact:\nName: \nRole: \nPhone: \n\n" +
      "Thank you.\n",
  )}`;

// ─── Helpers ────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// ─── Section: Hero ─────────────────────────────────────────────────────────
function PageHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="top" ref={ref} className="relative h-svh md:h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale, opacity: imgOpacity }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/corporate-services/hospitality-events/hero.webp`}
          alt="Corporate hospitality at Ridgeview — vineyard dining and tasting in Sussex"
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-9"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1), 0 0px 30px rgba(0,0,0,0.9)" }}
        >
          [ Corporate Services · At the Estate ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Corporate <span className="text-[#C8A96E]">Hospitality</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-body text-white/65 max-w-[680px]"
          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.7, textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Set in the heart of the Sussex countryside, an hour from London. A unique setting for
          corporate events — where award-winning English sparkling meets outstanding hospitality.
          Team-building, client entertainment, leadership retreats and company celebrations,
          tailored to your objectives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
          className="mt-7 md:mt-9 flex flex-wrap gap-3 md:gap-4"
        >
          <a href={CORPORATE_EVENTS_MAILTO} className="btn-cta">
            Plan your event
          </a>
          <a href="#events" className="btn-cta">
            Explore experiences
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Section: Event Grid — "Corporate Events & Experiences with Impact" ───
type EventType = { title: string; body: string; image: string };

const EVENTS: EventType[] = [
  {
    title: "Client Entertainment & Hospitality",
    body: "Impress key clients with exclusive corporate wine tastings and vineyard dining experiences — quiet luxury, served at your pace.",
    image: "client-entertainment.webp",
  },
  {
    title: "Company Team Building with Impact",
    body: "Strengthen teams with inspiring tastings, vineyard tours and outdoor moments that connect people to one another and to the land.",
    image: "team-building.webp",
  },
  {
    title: "Board Meetings & Strategy Days",
    body: "A focused space with vineyard views, HD smart screen, fast Wi-Fi, free parking and refreshments — everything you need to think clearly.",
    image: "board-meetings.webp",
  },
  {
    title: "Business Networking & Industry Events",
    body: "Host impactful receptions in a setting where exceptional hospitality fosters valuable connections and conversations that matter.",
    image: "networking.webp",
  },
  {
    title: "Product Launches & Brand Activations",
    body: "Showcase your brand in a venue designed to impress — creating lasting impact and engagement around the launch moment.",
    image: "product-launches.webp",
  },
  {
    title: "Company Parties & Celebrations",
    body: "Unforgettable celebrations that bring together your team, partners and stakeholders for a truly memorable experience.",
    image: "company-parties.webp",
  },
];

function EventGrid() {
  return (
    <section id="events" className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06] scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Six Ways to Gather ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}>
              Corporate Events &amp; Experiences with <span className="text-[#C8A96E]">Impact</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p
              className="font-body text-white/65 leading-[1.85] mx-auto"
              style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 300, maxWidth: "640px" }}
            >
              Six event archetypes we host most often — each tailored end-to-end. From half-day
              board meetings to thousand-guest activations, the estate flexes to fit.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {EVENTS.map((item, i) => (
            <FadeUp key={item.title} delay={0.35 + i * 0.06}>
              <div className="group h-full bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md overflow-hidden transition-all duration-400">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}/images/corporate-services/hospitality-events/${item.image}`}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition-colors duration-700 group-hover:from-black/40" />
                </div>
                <div className="p-7 md:p-8">
                  <h3
                    className="font-display italic text-cream leading-[1.18] mb-3"
                    style={{ fontSize: "clamp(20px, 1.9vw, 26px)", fontWeight: 400 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-body text-white/55 leading-[1.7]"
                    style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", fontWeight: 300 }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Bridge banner — "Escape the office" ──────────────────────────
function EscapeBanner() {
  return (
    <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden border-t border-white/[0.06]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/corporate-services/hospitality-events/vineyard-tour.webp`}
        alt="Ridgeview vineyard — corporate days away from the office"
        className="absolute inset-0 w-full h-full object-cover object-[center_55%]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(0,0,0,0.5) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-16">
        <div className="text-center max-w-[820px]">
          <FadeUp delay={0.1}>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-5"
              style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
            >
              [ Out of the Office ]
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2
              className="font-display italic text-cream leading-[1.15]"
              style={{
                fontSize: "clamp(28px, 3.8vw, 56px)",
                fontWeight: 400,
                textShadow: "0 2px 12px rgba(0,0,0,0.9)",
              }}
            >
              Escape the office. Step <span className="text-[#C8A96E]">into the vines</span>.
            </h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p
              className="font-body text-white/70 leading-[1.85] mx-auto mt-6"
              style={{
                fontSize: "clamp(14px, 1.3vw, 16px)",
                fontWeight: 300,
                maxWidth: "620px",
                textShadow: "0 1px 8px rgba(0,0,0,0.8)",
              }}
            >
              Guided tastings. Seasonal dining. Private vineyard tours. The perfect balance of
              inspiration, connection and celebration — designed for teams who deserve more than
              a conference-centre coffee break.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section: What We Offer ────────────────────────────────────────────────
const OFFERS = [
  {
    kicker: "[ Tour & Tasting ]",
    title: "Vineyard Tour & Tasting",
    body:
      "Go behind the scenes of our winery and vineyard to discover the craft behind our award-winning English sparkling wine. A dedicated Ridgeview wine guide takes your group on an immersive journey from grape to glass, finishing with a guided tasting of our exceptional wines.",
    image: "vineyard-tour.webp",
    href: "/vineyard-booking",
  },
  {
    kicker: "[ The Rows & Vine ]",
    title: "Seasonal Vineyard Dining",
    body:
      "The Rows & Vine (open spring and summer) offers a dynamic dining experience tailored for corporate groups. Seasonal, locally sourced ingredients and expert wine pairings — every meal designed to impress, from client lunches to networking dinners and full team celebrations.",
    image: "restaurant-banner.webp",
    href: "/restaurant",
  },
  {
    kicker: "[ Flexible Venue ]",
    title: "Pavilions, Restaurant Hire & Receptions",
    body:
      "From small company gatherings to large-scale events, our flexible venue spaces adapt to your needs. Alfresco dining in our pavilions by the vines in season, or drinks receptions and networking in our covered spaces during cooler months.",
    image: "networking.webp",
    href: null,
  },
  {
    kicker: "[ Meeting Room ]",
    title: "Board Meetings & Strategy Days",
    body:
      "Host your next board meeting or strategy day in our elegant meeting room, set against the backdrop of our stunning vineyard. Modern AV, high-speed Wi-Fi, tailored catering — everything you need for a productive and inspiring session.",
    image: "board-meetings.webp",
    href: null,
  },
];

function WhatWeOfferSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ What We Offer ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(34px, 4.5vw, 64px)", fontWeight: 400 }}>
              Build a day that <span className="text-[#C8A96E]">fits you</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p
              className="font-body text-white/65 leading-[1.85] mx-auto mt-6"
              style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300, maxWidth: "580px" }}
            >
              Choose a tour, a meal, a venue or a meeting space — or combine all four into a
              tailored corporate package designed around your business objectives.
            </p>
          </FadeUp>
        </div>

        <div className="space-y-12 md:space-y-16">
          {OFFERS.map((offer, i) => {
            const reverse = i % 2 === 1;
            return (
              <FadeUp key={offer.title} delay={0.3 + i * 0.05}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-8 md:gap-12 items-center ${
                    reverse ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-md overflow-hidden border border-white/[0.06]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${basePath}/images/corporate-services/hospitality-events/${offer.image}`}
                      alt={offer.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-display italic text-[#C8A96E] tracking-widest mb-4" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
                      {offer.kicker}
                    </p>
                    <h3
                      className="font-display italic text-cream leading-[1.1] mb-5"
                      style={{ fontSize: "clamp(26px, 2.6vw, 38px)", fontWeight: 400 }}
                    >
                      {offer.title}
                    </h3>
                    <p
                      className="font-body text-white/65 leading-[1.85] mb-6"
                      style={{ fontSize: "clamp(13px, 1.2vw, 15.5px)", fontWeight: 300, maxWidth: "520px" }}
                    >
                      {offer.body}
                    </p>
                    {offer.href ? (
                      <Link href={offer.href} className="btn-cta">
                        Learn more
                      </Link>
                    ) : (
                      <a href={CORPORATE_EVENTS_MAILTO} className="btn-cta">
                        Enquire
                      </a>
                    )}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Tailored Package callout ────────────────────────────────────
function TailoredPackageCallout() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-24 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Tailored Packages ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            One package, your <span className="text-[#C8A96E]">objectives</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p
            className="font-body text-white/65 leading-[1.85] mx-auto"
            style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300, maxWidth: "580px" }}
          >
            Create a standout event with a tailored corporate package at Ridgeview — expert-led
            tastings, exclusive dining, seasonal activities. Combined into one programme that
            aligns with your business needs and the outcome you&rsquo;re aiming for.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section: Plan Your Corporate Event CTA ────────────────────────────────
function PlanEventCTA() {
  return (
    <section id="enquire" className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06] overflow-hidden scroll-mt-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Start the Conversation ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(32px, 4.2vw, 58px)", fontWeight: 400 }}>
            Plan Your <span className="text-[#C8A96E]">Corporate Event</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p
            className="font-body text-white/65 leading-[1.85] mx-auto mb-10"
            style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 300, maxWidth: "580px" }}
          >
            Whether you&rsquo;re looking for a vineyard experience, a private sparkling wine
            tasting or a professional yet relaxed meeting space — Ridgeview offers everything for
            a successful and memorable event. Send a short brief and we&rsquo;ll come back with a
            tailored plan.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a href={CORPORATE_EVENTS_MAILTO} className="btn-cta">
              Email {CORPORATE_EMAIL}
            </a>
            <a href="tel:+441444242040" className="btn-cta">
              Call 01444 242040
            </a>
          </div>
        </FadeUp>
        <FadeUp delay={0.45}>
          <p
            className="font-body text-white/45 leading-relaxed mt-10 mx-auto"
            style={{ fontSize: "12.5px", fontWeight: 300, letterSpacing: "0.04em", maxWidth: "520px" }}
          >
            Looking for branded gifts or wine for activations instead? See{" "}
            <Link href="/corporate-services/corporate-wine-gifts" className="text-[#C8A96E] hover:underline">
              Corporate Wine &amp; Gift Services
            </Link>
            .
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function CorporateHospitalityEventsPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><EventGrid /></ScrollReset>
        <EscapeBanner />
        <ScrollReset><WhatWeOfferSection /></ScrollReset>
        <ScrollReset><TailoredPackageCallout /></ScrollReset>
        <ScrollReset><PlanEventCTA /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
