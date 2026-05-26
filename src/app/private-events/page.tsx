"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

const EVENTS_EMAIL = "info@ridgeview.co.uk";
const EVENTS_MAILTO =
  `mailto:${EVENTS_EMAIL}` +
  `?subject=${encodeURIComponent("Private event enquiry — Ridgeview")}` +
  `&body=${encodeURIComponent(
    "Hello,\n\nI'd like to enquire about a private event at Ridgeview.\n\n" +
      "Occasion (birthday / anniversary / corporate / other): \n" +
      "Approx. guest count: \n" +
      "Preferred date(s): \n" +
      "Indoor / outdoor preference: \n" +
      "Catering / wine pairing needs: \n\n" +
      "Contact:\nName: \nPhone: \n\nThank you.\n",
  )}`;

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
          src={`${basePath}/images/private-events/hero.webp`}
          alt="Private events at Ridgeview — Sussex venue hire"
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
          [ Private Events · Venue Hire · Sussex ]
        </motion.p>
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Host your private event <span className="text-[#C8A96E]">at Ridgeview</span>
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          A unique setting for private parties, group celebrations and seasonal venue hire — from
          open-air summer dining beside the Chardonnay vines to intimate winter gatherings inside
          the working winery.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
          className="mt-7 md:mt-9"
        >
          <a href={EVENTS_MAILTO} className="btn-cta">Make an enquiry</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Spaces — Pavilion + Winery ──────────────────────────────────────────
function SpacesSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Spaces · Seasonal ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              From open-air alfresco to <span className="text-[#C8A96E]">winter winery</span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <FadeUp delay={0.3}>
            <div className="h-full bg-[#0d0d0d] border border-white/[0.08] rounded-md overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}/images/private-events/pavilion-summer.webp`}
                  alt="Ridgeview pavilion in summer — alfresco dining beside the vines"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-7 md:p-8">
                <p className="font-display italic text-[#C8A96E] tracking-widest mb-3" style={{ fontSize: "clamp(11px, 1.05vw, 13px)" }}>
                  [ Spring &amp; Summer ]
                </p>
                <h3 className="font-display italic text-cream leading-[1.15] mb-4" style={{ fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 400 }}>
                  The Rows &amp; Vine · up to 150 guests
                </h3>
                <p className="font-body text-white/65 leading-[1.75] mb-5" style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 300 }}>
                  Alfresco beside the Chardonnay vines, seasonal produce, Ridgeview sparkling on
                  the table. Three flexible tiers across spring and summer:
                </p>
                <ul className="space-y-2 font-body text-white/65 leading-[1.65]" style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 300 }}>
                  <li className="flex gap-3">
                    <span className="text-[#C8A96E] flex-shrink-0">·</span>
                    <span><span className="text-cream/80">Group bookings</span> — for parties of 8 or more.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C8A96E] flex-shrink-0">·</span>
                    <span><span className="text-cream/80">Private pavilion hire</span> — each pavilion seats up to 30 guests.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C8A96E] flex-shrink-0">·</span>
                    <span><span className="text-cream/80">Full venue hire</span> — exclusive use of the restaurant for up to 150 guests.</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="h-full bg-[#0d0d0d] border border-white/[0.08] rounded-md overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}/images/cellar-bg.png`}
                  alt="Ridgeview winery — indoor events in the cooler months"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-7 md:p-8">
                <p className="font-display italic text-[#C8A96E] tracking-widest mb-3" style={{ fontSize: "clamp(11px, 1.05vw, 13px)" }}>
                  [ Autumn &amp; Winter ]
                </p>
                <h3 className="font-display italic text-cream leading-[1.15] mb-4" style={{ fontSize: "clamp(22px, 2vw, 28px)", fontWeight: 400 }}>
                  Winery indoor spaces
                </h3>
                <p className="font-body text-white/65 leading-[1.75]" style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 300 }}>
                  In the cooler months we host indoor events in the winery&rsquo;s event spaces —
                  drinks receptions, networking and intimate gatherings. Capacity, layout and
                  catering tailored per event.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Private Tours & Tastings ────────────────────────────────────────────
function PrivateTourSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-10 md:gap-16 items-center">
        <FadeUp delay={0.1}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Private Tours &amp; Tastings ]
          </p>
          <h2 className="font-display italic text-cream leading-[1.1] mb-6" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 400 }}>
            Tailored to <span className="text-[#C8A96E]">your group</span>
          </h2>
          <p className="font-body text-white/65 leading-[1.85] mb-5" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300 }}>
            Exclusive year-round private tour and tasting experiences, built around your group.
            No minimum number — book for two or for a hundred.
          </p>
          <p className="font-body text-white/65 leading-[1.85] mb-7" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300 }}>
            Led by an experienced guide, your party journeys through the estate to discover the
            world behind our English sparkling wines, followed by a tutored tasting overlooking
            the vines. Add Sussex cheese pairing, limited-edition tasting or dining at the
            restaurant.
          </p>
          <Link href="/vineyard-booking" className="btn-cta">View tour options</Link>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-white/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/private-events/private-tour.webp`}
              alt="Private tour and tasting at Ridgeview"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── FAQs ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Do you host birthdays, anniversaries and seasonal gatherings?",
    a: "Yes. From birthdays and anniversaries to summer celebrations and festive gatherings, the estate offers indoor and outdoor spaces for private hire — laid-back afternoons through to milestone occasions.",
  },
  {
    q: "Can we book the restaurant exclusively?",
    a: "Yes — full private use of The Rows &amp; Vine is available during spring and summer, with space for up to 150 guests. Outside that season we host indoors in the winery event spaces. Email for options, pricing and availability.",
  },
  {
    q: "How do we enquire?",
    a: `Email ${EVENTS_EMAIL} with the date, guest count and a short brief. The events team will come back with venue options and a pricing outline.`,
  },
  {
    q: "Are there corporate event options?",
    a: "Yes — see Corporate Hospitality &amp; Events for tasting days, team-building, board meetings, networking and brand activations.",
  },
  {
    q: "Do you host weddings or wedding-related events?",
    a: "We don&rsquo;t currently offer full-service weddings, but Ridgeview is a beautiful setting for engagement parties, rehearsal dinners and wedding-weekend celebrations. Get in touch and we&rsquo;ll see how we can make your moment special.",
  },
  {
    q: "Where is Ridgeview located?",
    a: "Ridgeview is based in Ditchling, Sussex — around a 15-minute drive from Brighton and an hour from London by train. Set in the South Downs National Park, the estate is a peaceful and picturesque location for private events and vineyard experiences.",
  },
];

function FaqSection() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-16">
        <div className="text-center mb-10 md:mb-12">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-4" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Events &amp; Venue Hire FAQs ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 400 }}>
              Common <span className="text-[#C8A96E]">questions</span>
            </h2>
          </FadeUp>
        </div>
        <div className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
          {FAQS.map((f, i) => (
            <FadeUp key={i} delay={0.25 + i * 0.05}>
              <details className="group py-5 md:py-6">
                <summary className="cursor-pointer list-none flex items-start gap-4">
                  <h3
                    className="flex-1 font-display italic text-cream group-hover:text-white transition-colors"
                    style={{ fontSize: "clamp(17px, 1.5vw, 20px)", fontWeight: 400 }}
                  >
                    {f.q}
                  </h3>
                  <span
                    className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 mt-0.5 rounded-sm border border-white/15 group-hover:border-[#C8A96E]/50 text-white/60 group-hover:text-[#C8A96E] transition-all group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p
                  className="font-body text-white/65 leading-[1.85] mt-3 max-w-[720px]"
                  style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 300 }}
                  dangerouslySetInnerHTML={{ __html: f.a }}
                />
              </details>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.6}>
          <p className="font-body text-white/45 leading-relaxed mt-10 text-center mx-auto" style={{ fontSize: "12.5px", fontWeight: 300, letterSpacing: "0.04em", maxWidth: "560px" }}>
            Looking for corporate packages instead? See{" "}
            <Link href="/corporate-services/corporate-hospitality-events" className="text-[#C8A96E] hover:underline">
              Corporate Hospitality &amp; Events
            </Link>
            .
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

export default function PrivateEventsPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><SpacesSection /></ScrollReset>
        <ScrollReset><PrivateTourSection /></ScrollReset>
        <ScrollReset><FaqSection /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
