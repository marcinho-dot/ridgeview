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
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          Press releases, image library, interview requests. Browse recent stories below or send
          a brief — we&rsquo;ll route it to the right voice on the team.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Press releases archive (recent stories, our prose) ───────────────────
// Each release has an image (downloaded from the legacy ridgeview.co.uk
// press archive 2026-05-21, stored locally in /public/images/press/) and
// an optional downloadable PDF (mirrored to /public/pdfs/press/). PDFs
// open in a new tab; cards without a PDF show a "By email" fallback
// that opens the press mailto template.
type Release = {
  date: string;
  title: string;
  summary: string;
  image: string;
  alt: string;
  pdf?: string;
};

const RELEASES: Release[] = [
  {
    date: "2026",
    title: "Quantum Beverage Company leads investor consortium to acquire Ridgeview Wine Estate",
    summary:
      "Announcement of the change in ownership of Ridgeview Wine Estate. See the full release for the consortium structure and next steps.",
    image: "/images/press/quantum-acquisition.webp",
    alt: "Ridgeview press release announcement square",
    pdf: "/pdfs/press/quantum-beverage-acquisition.pdf",
  },
  {
    date: "2024",
    title: "Official English Sparkling Wine supplier of the Goodwood Estate",
    summary:
      "Partnership announcement: Ridgeview becomes the Official English Sparkling Wine supplier of the Goodwood Estate.",
    image: "/images/press/goodwood-partnership.webp",
    alt: "Ridgeview x Goodwood Estate partnership",
    pdf: "/pdfs/press/goodwood-partnership.pdf",
  },
  {
    date: "2024",
    title: "Ridgeview takes off with Gatwick Airport",
    summary:
      "Ridgeview becomes available at London Gatwick. See the full release for retail locations and the partnership context.",
    image: "/images/press/gatwick-takeoff.webp",
    alt: "Two bottles of Ridgeview Wine in Duty Free at Gatwick Airport",
    pdf: "/pdfs/press/gatwick-airport.pdf",
  },
  {
    date: "2024",
    title: "The Rows &amp; Vine takes residence in the winery",
    summary:
      "Ridgeview&rsquo;s restaurant, The Rows &amp; Vine, takes residency in the winery for a new chapter of dining at the estate.",
    image: "/images/press/rows-vine-winery.webp",
    alt: "The Rows & Vine restaurant indoor — dining and tasting in Sussex",
    pdf: "/pdfs/press/rows-vine-residence.pdf",
  },
  {
    date: "2024",
    title: "Featured in the London Gatwick Northern Runway Campaign",
    summary:
      "Ridgeview featured in the London Gatwick Northern Runway campaign.",
    image: "/images/press/gatwick-northern-runway.webp",
    alt: "Ridgeview featured in Gatwick Northern Runway campaign visual",
  },
  {
    date: "2024",
    title: "Ridgeview wins at WineGB and Decanter World Wine Awards",
    summary:
      "Ridgeview wins at both WineGB and the Decanter World Wine Awards.",
    image: "/images/press/winegb-decanter-awards.webp",
    alt: "Ridgeview wins at WineGB and Decanter World Wine Awards",
  },
  {
    date: "2023",
    title: "Ridgeview Blanc de Blancs served at King Charles&rsquo; first state banquet",
    summary:
      "Ridgeview Blanc de Blancs served at King Charles&rsquo; first state banquet at Buckingham Palace.",
    image: "/images/press/king-charles-banquet.webp",
    alt: "Ridgeview Blanc de Blancs bottle",
    pdf: "/pdfs/press/king-charles-banquet.pdf",
  },
  {
    date: "2023",
    title: "Ridgefest is back for 2023",
    summary:
      "Announcement of Ridgefest 2023 — Ridgeview&rsquo;s vineyard festival at the estate.",
    image: "/images/press/ridgefest-2023.webp",
    alt: "Ridgefest 2023 — Ridgeview Wine Estate Festival in Sussex",
    pdf: "/pdfs/press/ridgefest-2023.pdf",
  },
  {
    date: "2023",
    title: "Launch of our new Sparkling Red Reserve",
    summary:
      "Launch announcement for Ridgeview&rsquo;s new Sparkling Red Reserve.",
    image: "/images/press/sparkling-red-launch.webp",
    alt: "Ridgeview Sparkling Red Reserve launch",
    pdf: "/pdfs/press/sparkling-red-launch.pdf",
  },
  {
    date: "2022",
    title: "Unveiling our new hospitality project",
    summary:
      "Announcement of Ridgeview&rsquo;s new hospitality project at the estate.",
    image: "/images/press/hospitality-unveil.webp",
    alt: "Ridgeview hospitality project unveiling",
    pdf: "/pdfs/press/hospitality-unveil.pdf",
  },
  {
    date: "2021",
    title: "Ridgeview served at COP26 Global Leaders Reception",
    summary:
      "Ridgeview served at the COP26 Global Leaders Reception.",
    image: "/images/press/cop26.webp",
    alt: "Ridgeview bottle in the Chardonnay vineyard at sunset",
    pdf: "/pdfs/press/cop26-leaders.pdf",
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
            <p className="subline-section mx-auto mt-6">
              For full text, imagery or additional context on any of the stories below, email the
              press team — we keep press packs current.
            </p>
          </FadeUp>
        </div>

        {/* News-card grid — image + date + headline + summary + PDF download.
            Designed to look distinct from /heritage timeline: no rail, no
            year column, images dominant. Layout: 1 col mobile, 2 cols tablet,
            3 cols desktop. PDF cards get a download button; year-only cards
            get an "Enquire by email" fallback. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {RELEASES.map((r, i) => (
            <FadeUp key={i} delay={0.3 + Math.min(i, 8) * 0.05}>
              <article className="group h-full bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md overflow-hidden flex flex-col transition-all duration-400">
                {/* Image — 16:10 aspect, hover scale */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${r.image}`}
                    alt={r.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent transition-colors duration-700 group-hover:from-black/25" />
                  {/* Year chip top-left */}
                  <span
                    className="absolute top-4 left-4 font-body text-[#C8A96E] uppercase tracking-[0.25em] border border-[#C8A96E]/40 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-sm"
                    style={{ fontSize: "10px", fontWeight: 500 }}
                  >
                    {r.date}
                  </span>
                  {r.pdf && (
                    <span
                      className="absolute top-4 right-4 font-body text-white/75 uppercase tracking-[0.22em] border border-white/25 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-sm"
                      style={{ fontSize: "9.5px", fontWeight: 400 }}
                    >
                      PDF
                    </span>
                  )}
                </div>

                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h3
                    className="font-display italic text-cream group-hover:text-white leading-[1.18] mb-3 transition-colors duration-400"
                    style={{ fontSize: "clamp(19px, 1.65vw, 24px)", fontWeight: 400 }}
                    dangerouslySetInnerHTML={{ __html: r.title }}
                  />
                  <p
                    className="font-body text-white/55 leading-[1.75] mb-6 flex-1"
                    style={{ fontSize: "clamp(13px, 1.1vw, 14.5px)", fontWeight: 300 }}
                    dangerouslySetInnerHTML={{ __html: r.summary }}
                  />

                  {/* Action row — download PDF (primary) or enquire by email */}
                  {r.pdf ? (
                    <a
                      href={`${basePath}${r.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-body text-[#C8A96E] hover:text-cream uppercase tracking-[0.22em] transition-colors duration-300 self-start"
                      style={{ fontSize: "11px", fontWeight: 500 }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Download press release</span>
                    </a>
                  ) : (
                    <a
                      href={PRESS_MAILTO}
                      className="inline-flex items-center gap-2 font-body text-white/55 hover:text-[#C8A96E] uppercase tracking-[0.22em] transition-colors duration-300 self-start"
                      style={{ fontSize: "11px", fontWeight: 500 }}
                    >
                      <span>Request by email</span>
                      <span aria-hidden>→</span>
                    </a>
                  )}
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
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
