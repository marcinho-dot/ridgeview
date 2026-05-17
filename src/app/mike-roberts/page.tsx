"use client";

/**
 * /mike-roberts - dedicated tribute page for Ridgeview's founder.
 *
 * Split out from the People page (2026-05-17) so Mike has his own
 * editorial home. Content + images verified against the migrated
 * "Remembering Mike Roberts" article and the legacy ridgeview.co.uk.
 *
 * Linked FROM:
 *   - RecognitionSection timeline · 1995 entry mentions him as founder
 *   - People page · Simon Roberts paragraph mentions him as father
 *
 * Names policy (per tasks/lessons.md):
 *   ✅ Mike Roberts (founder) - fully named
 *   ✅ Simon Roberts (Head Winemaker, adoptive son) - referenced
 *      generically as "Head Winemaker", not by name on this page
 *   ❌ Mike's wife / biological children / "Roberts family" - never
 *      mentioned. Family-language uses "Ridgeview" / "the team".
 */

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

export default function MikeRobertsPage() {
  return (
    <div className="bg-[#010101] min-h-screen">
      {/* Grain noise overlay - matches other premium routes */}
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
        {/* ── Hero ───────────────────────────────────────────────── */}
        <ScrollReset>
          <section className="relative bg-[#010101] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/people/mike-hero.png`}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-[0.55]"
              style={{ objectPosition: "center 30%" }}
            />
            {/* Dark gradient ensures the title lock-up reads cleanly
                over any portrait composition. */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-[#010101]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#010101]/85 via-[#010101]/30 to-transparent" />

            <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 pt-36 md:pt-44 pb-20 md:pb-28">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                style={{
                  fontSize: "clamp(13px, 1.3vw, 16px)",
                  textShadow: "0 1px 10px rgba(0,0,0,0.95)",
                }}
              >
                [ Founder · Est. 1995 ]
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display italic text-cream leading-[1.04] mb-6"
                style={{
                  fontSize: "clamp(42px, 7vw, 102px)",
                  fontWeight: 400,
                  textShadow: "0 2px 22px rgba(0,0,0,0.9)",
                }}
              >
                Mike <span className="text-[#C8A96E]">Roberts</span>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display italic text-[#C8A96E] mb-3"
                style={{
                  fontSize: "clamp(15px, 1.4vw, 20px)",
                  textShadow: "0 1px 10px rgba(0,0,0,0.95)",
                }}
              >
                In Memoriam
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.28 }}
                className="font-body uppercase text-white/70 tracking-[0.3em]"
                style={{
                  fontSize: "11px",
                  fontWeight: 300,
                  textShadow: "0 1px 10px rgba(0,0,0,0.95)",
                }}
              >
                Founder · Member of the Order of the British Empire
              </motion.p>
            </div>
          </section>
        </ScrollReset>

        {/* ── The Vision (1995) ──────────────────────────────────── */}
        <ScrollReset>
          <section className="relative bg-[#010101] border-t border-white/[0.06]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 md:py-28 grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-20 items-start">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7 }}
                  className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                  style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
                >
                  [ The Vision ]
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display italic text-cream leading-[1.08]"
                  style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 400 }}
                >
                  When few in England <span className="text-[#C8A96E]">dared</span>.
                </motion.h2>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="max-w-[620px]"
              >
                <p
                  className="font-body text-white/75 leading-[1.85] mb-6"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 300 }}
                >
                  Mike planted Ridgeview&rsquo;s first vines in 1995 on the chalk
                  soils beneath the South Downs - convinced that the same
                  Cretaceous seabed that surfaces across the Channel could grow
                  world-class English sparkling wine.
                </p>
                <p
                  className="font-body text-white/55 leading-[1.85]"
                  style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300 }}
                >
                  His daring dream - to produce sparkling wine in England
                  that would stand shoulder to shoulder with the world&rsquo;s
                  best - became the foundation of an industry. Three
                  decades later, the conviction he planted still shapes every
                  cuvée Ridgeview makes.
                </p>
              </motion.div>
            </div>
          </section>
        </ScrollReset>

        {/* ── A Pioneer (MBE 2011) ───────────────────────────────── */}
        <ScrollReset>
          <section className="relative bg-[#010101] border-t border-white/[0.06]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 md:py-28 grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-12 md:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="max-w-[640px]"
              >
                <p
                  className="font-display italic text-[#C8A96E] tracking-widest mb-5"
                  style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
                >
                  [ MBE · 2011 ]
                </p>
                <h2
                  className="font-display italic text-cream leading-[1.08] mb-8"
                  style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 400 }}
                >
                  A generous <span className="text-[#C8A96E]">pioneer</span>.
                </h2>
                <p
                  className="font-body text-white/75 leading-[1.85] mb-6"
                  style={{ fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 300 }}
                >
                  Awarded an MBE in 2011 for services to the English sparkling
                  wine industry. Mike&rsquo;s commitment went far beyond
                  Ridgeview - he was tireless in championing English wine
                  itself.
                </p>
                <p
                  className="font-body text-white/55 leading-[1.85]"
                  style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300 }}
                >
                  Generous with his knowledge from the start, he shared what he
                  had learned from French winemaking colleagues with a new
                  generation of English producers - laying the groundwork
                  for the industry as we know it today.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] overflow-hidden rounded-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}/images/people/mike-1.webp`}
                  alt="Mike Roberts in the early years of Ridgeview"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 border border-white/[0.06] rounded-sm" />
              </motion.div>
            </div>
          </section>
        </ScrollReset>

        {/* ── Life is for Celebrating ────────────────────────────── */}
        <ScrollReset>
          <section className="relative bg-[#010101] border-t border-white/[0.06] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/people/mike-dogs.jpg`}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-[0.18]"
              style={{ objectPosition: "center 40%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-black/55 to-[#010101]" />
            <div className="relative max-w-[960px] mx-auto px-6 md:px-16 py-28 md:py-40 text-center">
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-10"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ The Motto ]
              </p>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display italic text-cream leading-[1.1] mb-8"
                style={{
                  fontSize: "clamp(36px, 5.5vw, 80px)",
                  fontWeight: 400,
                  textShadow: "0 2px 18px rgba(0,0,0,0.7)",
                }}
              >
                &ldquo;Life is for <span className="text-[#C8A96E]">celebrating</span>.&rdquo;
              </motion.p>
              <p
                className="font-body uppercase text-white/55 tracking-[0.3em] mb-12"
                style={{ fontSize: "11px", fontWeight: 300 }}
              >
                - Mike Roberts
              </p>
              <p
                className="font-body text-white/70 leading-[1.85] max-w-[560px] mx-auto"
                style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300 }}
              >
                Mike&rsquo;s guiding motto - now the house motto at
                Ridgeview. Every bottle is shaped by the same conviction: that
                wine exists for the moments worth raising a glass to.
              </p>
            </div>
          </section>
        </ScrollReset>

        {/* ── Image Gallery ──────────────────────────────────────── */}
        <ScrollReset>
          <section className="relative bg-[#010101] border-t border-white/[0.06]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 md:py-28">
              <p
                className="font-display italic text-[#C8A96E] tracking-widest mb-10 text-center"
                style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
              >
                [ In the Vineyard ]
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {[
                  {
                    src: "/images/people/mike-hero.png",
                    alt: "Mike Roberts, founder of Ridgeview Wine Estate",
                  },
                  {
                    src: "/images/people/mike-1.webp",
                    alt: "Mike Roberts in the early years of Ridgeview",
                  },
                  {
                    src: "/images/people/mike-dogs.jpg",
                    alt: "Mike Roberts at the estate with his dogs",
                  },
                ].map((img, i) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-[4/5] overflow-hidden rounded-sm"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${basePath}${img.src}`}
                      alt={img.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 border border-white/[0.06] rounded-sm" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReset>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
