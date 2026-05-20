"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

const PRESS_EMAIL = "info@ridgeview.co.uk";
const PRESS_MAILTO =
  `mailto:${PRESS_EMAIL}` +
  `?subject=${encodeURIComponent("Media enquiry — Ridgeview")}` +
  `&body=${encodeURIComponent(
    "Hello,\n\nI'd like to make a media enquiry.\n\n" +
      "Publication / outlet: \n" +
      "Story angle: \n" +
      "Specific requests (interview / imagery / quote / fact-check): \n" +
      "Deadline: \n\n" +
      "Contact:\nName: \nRole: \nPhone: \n\nThank you.\n",
  )}`;

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function PageHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={ref} className="relative h-[60svh] md:h-[60vh] w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ opacity: imgOpacity }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/images/cellar-detail.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-black/80" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 md:px-16 pb-8 md:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-3"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)", textShadow: "0 1px 10px rgba(0,0,0,1)" }}
        >
          [ Media Area ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Press &amp; <span className="text-[#C8A96E]">Media</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-body text-white/65 max-w-[680px]"
          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.7, textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Press releases, image library, interview requests. Browse recent stories below or send
          a brief — we&rsquo;ll route it to the right voice on the team.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Press releases archive (recent stories, our prose) ───────────────────
type Release = { date: string; title: string; summary: string };

const RELEASES: Release[] = [
  {
    date: "2026",
    title: "Ridgeview enters its next chapter under new ownership",
    summary:
      "Following the change of ownership, Ridgeview continues as a leading English sparkling wine producer with a renewed focus on quality, sustainability and the Sussex estate.",
  },
  {
    date: "2024",
    title: "Official English Sparkling Wine supplier of the Goodwood Estate",
    summary:
      "A partnership with the historic Goodwood Estate sees Ridgeview&rsquo;s award-winning sparkling poured across motorsport, racing and hospitality experiences.",
  },
  {
    date: "2024",
    title: "Ridgeview takes off with Gatwick Airport",
    summary:
      "Selected as the official English sparkling at London Gatwick — bringing Sussex&rsquo;s flagship pour to international travellers.",
  },
  {
    date: "2024",
    title: "Featured in the London Gatwick Northern Runway Campaign",
    summary:
      "Ridgeview featured as part of the regional showcase for the Northern Runway proposal — celebrating Sussex producers on the international stage.",
  },
  {
    date: "2024",
    title: "Wins at WineGB and Decanter World Wine Awards",
    summary:
      "Another medal-strong season — silverware across multiple categories at WineGB and Decanter, reinforcing Ridgeview&rsquo;s position among the world&rsquo;s best sparkling.",
  },
  {
    date: "2023",
    title: "Ridgeview achieves B Corp certification",
    summary:
      "Independent certification of our environmental and social performance — formally recognising what we&rsquo;ve always tried to be: a business as a force for good.",
  },
  {
    date: "2023",
    title: "Blanc de Blancs served at King Charles&rsquo; first state banquet",
    summary:
      "Ridgeview Blanc de Blancs poured at the State Banquet at Buckingham Palace — the second time our wines have been chosen for the most formal of occasions.",
  },
  {
    date: "2023",
    title: "Launch of our new Sparkling Red Reserve",
    summary:
      "A bold, distinctively English Sparkling Red — pressed from Sussex Pinot Noir, aged on lees, made for slow winter evenings and richer pairings.",
  },
  {
    date: "2022",
    title: "Unveiling our new hospitality project",
    summary:
      "The Rows &amp; Vine — a seasonal restaurant in the vines, alongside expanded pavilions and a redesigned tour experience for visiting guests.",
  },
  {
    date: "2021",
    title: "Ridgeview served at COP26 Global Leaders Reception",
    summary:
      "Selected as the English sparkling poured at the COP26 Leaders Reception — a flag for British sustainable winemaking on the world climate stage.",
  },
];

function ReleasesSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Press Releases ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              Recent <span className="text-[#C8A96E]">stories</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="font-body text-white/65 leading-[1.85] mx-auto mt-6" style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300, maxWidth: "560px" }}>
              For full text, imagery or additional context on any of the stories below, email the
              press team — we keep press packs current.
            </p>
          </FadeUp>
        </div>

        <ol className="space-y-0">
          {RELEASES.map((r, i) => (
            <FadeUp key={i} delay={0.3 + Math.min(i, 6) * 0.04}>
              {/* Hover microinteraction: row picks up gold-accent border on hover,
                  date glows brighter, title shifts to white, summary lightens. */}
              <li className="group grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-8 md:py-10 border-t border-white/[0.08] first:border-t-0 hover:border-t-[#C8A96E]/30 transition-colors duration-500 relative">
                {/* Subtle gold accent stripe that grows in on hover from the left */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-0 bg-[#C8A96E]/70 group-hover:w-12 transition-[width] duration-700 ease-out"
                />
                <div>
                  <p
                    className="font-body text-[#C8A96E]/70 group-hover:text-[#C8A96E] tracking-[0.25em] uppercase transition-colors duration-400"
                    style={{ fontSize: "12px", fontWeight: 400 }}
                  >
                    {r.date}
                  </p>
                </div>
                <div>
                  <h3
                    className="font-display italic text-cream group-hover:text-white leading-[1.18] mb-3 transition-colors duration-400"
                    style={{ fontSize: "clamp(20px, 1.85vw, 28px)", fontWeight: 400 }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="font-body text-white/55 group-hover:text-white/75 leading-[1.75] max-w-[640px] transition-colors duration-400"
                    style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 300 }}
                    dangerouslySetInnerHTML={{ __html: r.summary }}
                  />
                </div>
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── Press kit + media contact ─────────────────────────────────────────────
function PressKitSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <FadeUp delay={0.1}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Press Kit ]
          </p>
          <h2 className="font-display italic text-cream leading-[1.1] mb-5" style={{ fontSize: "clamp(28px, 3.2vw, 42px)", fontWeight: 400 }}>
            Imagery &amp; assets
          </h2>
          <p className="font-body text-white/65 leading-[1.85] mb-6" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300 }}>
            High-resolution vineyard, cellar, bottle and lifestyle imagery available on request.
            Send the context — publication, deadline and intended use — and we&rsquo;ll share the
            appropriate assets along with our usage terms.
          </p>
          <a href={PRESS_MAILTO} className="btn-cta">Request press pack</a>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Media Contact ]
          </p>
          <h2 className="font-display italic text-cream leading-[1.1] mb-5" style={{ fontSize: "clamp(28px, 3.2vw, 42px)", fontWeight: 400 }}>
            Speak to the team
          </h2>
          <p className="font-body text-white/65 leading-[1.85] mb-3" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300 }}>
            For interviews, statements, fact-checks and image requests:
          </p>
          <a href={`mailto:${PRESS_EMAIL}`} className="font-display italic text-cream hover:text-[#C8A96E] transition-colors block mb-3" style={{ fontSize: "clamp(18px, 1.7vw, 22px)", fontWeight: 400 }}>
            {PRESS_EMAIL}
          </a>
          <a href="tel:+441444242040" className="font-body text-white/55 hover:text-white/80 transition-colors block mb-6" style={{ fontSize: "14px", fontWeight: 300 }}>
            01444 242040 — Mon–Fri, 8:00–16:30
          </a>
          <p className="font-body text-white/45 leading-[1.75] mt-4" style={{ fontSize: "12.5px", fontWeight: 300 }}>
            Looking for company &amp; founding history? See{" "}
            <Link href="/sustainability" className="text-[#C8A96E] hover:underline">Sustainability &amp; Ethics</Link>{" "}
            and{" "}
            <Link href="/mike-roberts" className="text-[#C8A96E] hover:underline">Mike Roberts · founder</Link>.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

export default function PressPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><ReleasesSection /></ScrollReset>
        <ScrollReset><PressKitSection /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
