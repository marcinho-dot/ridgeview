"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

function PageHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="top" ref={ref} className="relative h-svh md:h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale, opacity: imgOpacity }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/cellar-bg.png`}
          alt="OurView wine club — Ridgeview member benefits"
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-9">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
        >
          [ OurView · Member Privileges ]
        </motion.p>
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Membership <span className="text-[#C8A96E]">Benefits</span>
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          The curated perks, estate access and personal touches that make OurView more than just
          a wine club. From the welcome case to the rarity of archive releases — every benefit
          is designed to deepen your connection with our craft.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Benefits grid ─────────────────────────────────────────────────────────
const BENEFITS = [
  {
    title: "Welcome Tour & Tasting Voucher",
    body: "A complimentary Tour & Tasting voucher for two arrives in your welcome case, valid 12 months — an invitation to go behind the scenes of vineyard and winery.",
  },
  {
    title: "20% Off Future Orders",
    body: "Members enjoy an ongoing 20% discount on all future classic-tour and classic-tasting bookings, plus member pricing on wine.",
  },
  {
    title: "Two Curated Cases a Year",
    body: "In May and November you receive a six-bottle case hand-picked by the Head Winemaker — a curated exploration of the Ridgeview portfolio, vintage classics and new releases.",
  },
  {
    title: "Complimentary Next-Working-Day Delivery",
    body: "Free next-working-day delivery on all orders — whether you're restocking your collection or sending a gift with a personalised note.",
  },
  {
    title: "Limited-Edition Member Wines",
    body: "Step inside the archive. Limited-edition wines crafted exclusively for the wine club — unique expressions never released to the public.",
  },
  {
    title: "Archive Releases",
    body: "Access to the historic wine archive, featuring some of the oldest and rarest vintages in English sparkling wine history.",
  },
  {
    title: "Priority Invitations to Estate Events",
    body: "A calendar of exclusive estate events — Winemaker blending masterclasses, Riedel glass experiences, vertical archive tastings, artisanal cheese pairings and seasonal celebrations.",
  },
  {
    title: "Dedicated Concierge",
    body: "A dedicated Ridgeview concierge to plan visits, perfect table at The Rows & Vine, wine pairing tips and recommendations for curated local hotel partners.",
  },
  {
    title: "Member Surprises",
    body: "Joyful surprises throughout the year — a complimentary gift tucked into a wine shipment, a 'secret pour' at the cellar door, birthday bubbles on a visit, renewal rewards.",
  },
];

function BenefitsGrid() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Your Member Privileges ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              Nine reasons to <span className="text-[#C8A96E]">join</span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 md:gap-y-14">
          {BENEFITS.map((b, i) => (
            <FadeUp key={b.title} delay={0.3 + i * 0.04}>
              <div className="border-t border-[#C8A96E]/25 pt-6">
                <h3 className="font-display italic text-cream leading-[1.15] mb-3" style={{ fontSize: "clamp(20px, 1.85vw, 26px)", fontWeight: 400 }}>
                  {b.title}
                </h3>
                <p className="font-body text-white/55 leading-[1.75]" style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", fontWeight: 300 }}>
                  {b.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinCTA() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Join OurView ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
            Ready to <span className="text-[#C8A96E]">become a member</span>?
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="subline-section mx-auto mb-10">
            See the full OurView wine club page for membership tiers and pricing, or read the
            terms before signing up.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link href="/wine-club" className="btn-cta">View membership</Link>
            <Link href="/legal/wine-club-terms" className="btn-cta">Read the terms</Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function WineClubBenefitsPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><BenefitsGrid /></ScrollReset>
        <ScrollReset><JoinCTA /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
