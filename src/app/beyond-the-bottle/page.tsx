"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { CategoryAccordion } from "@/components/beyond/CategoryAccordion";
import { SubstackForm } from "@/components/SubstackForm";
import { articles } from "@/data/articles";

/**
 * CountUp — small inline counter that animates from 0 to a target
 * number when the element enters the viewport. Used in the PageHero
 * subtitle so the "83 articles" line has a tactile moment when the
 * user lands on the page. Uses requestAnimationFrame + an ease-out
 * cubic curve for a 1.8 s settle. tabular-nums keeps the digit
 * column from jiggling as the number grows.
 *
 * once:false on the IntersectionObserver — the counter re-runs
 * every time the user scrolls back into the hero (per user
 * direction 2026-05-18). setN(0) at the start of each run resets
 * the digit immediately so there's no flash of the previous value.
 */
function CountUp({ to, duration = 1800 }: { to: number; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.6 });

  useEffect(() => {
    if (!inView) return;
    setN(0);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span
      ref={ref}
      className="font-display italic text-cream"
      style={{
        fontSize: "1.4em",
        fontWeight: 400,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {n}
    </span>
  );
}

/**
 * Beyond the Bottle - articles hub.
 *
 * Renders the BlogSection-style interactive category accordion:
 *   - Desktop: horizontal flex-panel strip (7 panels), active one
 *     expands and reveals the category article-grid below the strip.
 *   - Mobile: vertical accordion rows, each row's expansion shows
 *     the article cards inline.
 *
 * Deep-link support is handled inside `CategoryAccordion` - arriving
 * via /beyond-the-bottle/#wines auto-activates that panel and
 * smooth-scrolls to it.
 */

function PageHero() {
  return (
    <section className="relative bg-[#010101] overflow-hidden pt-28 md:pt-32 pb-6 md:pb-8">
      <div
        aria-hidden
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
          [ Beyond the Bottle ]
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-cream leading-[1.06] mb-6"
          style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400 }}
        >
          Stories from the <span className="text-[#C8A96E]">estate</span>.
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
          <CountUp to={articles.length} /> articles across seven facets of life at Ridgeview -
          from the cellar to the South Downs, harvest to hospitality.
        </motion.p>

        {/* Substack signup - added 2026-05-17 per user direction:
            same form as the homepage ImageReveal section, mounted
            here below the subtitle. (Social icons intentionally
            not added - only the email-capture pill.) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-8 md:mt-10 mx-auto"
          style={{ maxWidth: "440px" }}
        >
          <SubstackForm />
          {/* Editorial claim under the form (2026-05-18) — picks up
              the "Stories from the estate" headline and frames the
              Substack as the next chapter rather than a generic
              newsletter. */}
          <p
            className="font-display italic text-white/45 mt-4 tracking-wide"
            style={{ fontSize: "clamp(12px, 1.05vw, 14px)" }}
          >
            The next chapter, in your inbox.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function BeyondHubPage() {
  return (
    <div className="bg-[#010101] min-h-screen">
      {/* Noise overlay - matches /vineyard-booking and /wines for visual continuity */}
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
        <PageHero />

        {/* Border-t removed 2026-05-18 and top padding tightened so
            the accordion strip rides up into the hero's lower region —
            keeps the kicker + headline + accordion in a single
            compact above-the-fold view. Bottom padding kept generous
            so the section closes cleanly into the footer. */}
        <section className="relative bg-[#010101]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 pt-2 pb-12 md:pt-4 md:pb-16">
            <CategoryAccordion />
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
