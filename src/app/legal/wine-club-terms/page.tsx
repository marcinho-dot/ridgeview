"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

const MEMBERSHIP_EMAIL = "info@ridgeview.co.uk";

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

function PageHeader() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={ref} className="relative h-[55svh] md:h-[55vh] w-full overflow-hidden">
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
          [ Legal · OurView ]
        </motion.p>
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(34px, 5vw, 72px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            OurView Annual Membership <span className="text-[#C8A96E]">Terms &amp; Conditions</span>
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-body text-white/65 max-w-[680px]"
          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.7, textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          These terms govern your OurView Wine Club membership. Plain-English overview below —
          for the full binding document or specific clauses, email the membership team.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── The Operator (verified entity info) ─────────────────────────────────
function OperatorSection() {
  return (
    <section className="relative bg-[#010101] py-16 md:py-20 border-t border-white/[0.06]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-16">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ The Operator ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 400 }}>
            Who you&rsquo;re entering an agreement with
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-6">
            <div>
              <p
                className="font-body text-white/45 uppercase tracking-[0.22em] mb-2"
                style={{ fontSize: "10.5px", fontWeight: 500 }}
              >
                Legal Entity
              </p>
              <p className="font-body text-white/75 leading-[1.85]" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300 }}>
                QBRidge Limited<br />
                trading as Ridgeview Wine Estate<br />
                Company registration: <span className="text-cream">16702308</span><br />
                Registered in England &amp; Wales
              </p>
            </div>
            <div>
              <p
                className="font-body text-white/45 uppercase tracking-[0.22em] mb-2"
                style={{ fontSize: "10.5px", fontWeight: 500 }}
              >
                Registered Office
              </p>
              <p className="font-body text-white/75 leading-[1.85]" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300 }}>
                Ridgeview Wine Estate<br />
                Fragbarrow Lane<br />
                Ditchling Common<br />
                Hassocks, Sussex<br />
                BN6 8TP, England
              </p>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <p className="font-body text-white/65 leading-[1.85]" style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 300 }}>
              Contact the membership team:{" "}
              <a href={`mailto:${MEMBERSHIP_EMAIL}`} className="text-[#C8A96E] hover:underline">
                {MEMBERSHIP_EMAIL}
              </a>{" "}
              · <a href="tel:+441444242040" className="text-[#C8A96E] hover:underline">01444 242040</a>
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Plain-English overview ───────────────────────────────────────────────
const OVERVIEW = [
  {
    title: "1 · Scope of these terms",
    body: "These terms set out the agreement between you (the member) and us (QBRidge Limited trading as Ridgeview Wine Estate) for your OurView Wine Club membership.",
  },
  {
    title: "2 · How the agreement starts",
    body: "Your membership comes into effect when we confirm acceptance of your completed application by email. If you don&rsquo;t receive the confirmation email, please get in touch with the membership team. We reserve the right to decline applications at our discretion.",
  },
  {
    title: "3 · Definitions",
    body: "Standard legal definitions cover terms used through the document — Application Form, Business Day (Monday–Friday excluding English bank holidays), Membership Agreement, Welcome Case, Annual Case, and so on.",
  },
  {
    title: "4 · Your benefits",
    body: "What you receive as a member — welcome Tour & Tasting voucher, twice-yearly curated cases, member pricing, archive access, dedicated concierge support and event invitations. Full benefits listed on the OurView Benefits page.",
  },
  {
    title: "5 · Fees, payment and renewal",
    body: "Membership fees, payment schedule, when payments fall due, and how renewal is handled. For current pricing see the OurView membership page; payments are processed on a recurring annual basis unless cancelled.",
  },
  {
    title: "6 · Cancellation and refunds",
    body: "Your statutory rights as a UK consumer, our cancellation window, and how to cancel future renewals. Cancellations don&rsquo;t affect the benefits already delivered during the membership year.",
  },
  {
    title: "7 · Changes to these terms",
    body: "We may update these terms occasionally. Material changes will be notified to active members by email before they take effect.",
  },
  {
    title: "8 · Our liability",
    body: "Standard liability provisions for a UK consumer service — we&rsquo;re not liable for indirect or consequential losses. Nothing limits our liability for matters where UK law doesn&rsquo;t allow it (death, personal injury, fraud).",
  },
  {
    title: "9 · Data &amp; privacy",
    body: "How we handle your member data. Full detail is in our Privacy Policy. We use your data to fulfil the membership and to communicate about it; we don&rsquo;t sell it to third parties.",
  },
  {
    title: "10 · Law &amp; jurisdiction",
    body: "Governed by the laws of England and Wales. Any disputes fall under the exclusive jurisdiction of the courts of England and Wales.",
  },
];

function OverviewSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-4" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Plain-English Overview ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 400 }}>
              The <span className="text-[#C8A96E]">structure</span>, simplified
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="font-body text-white/55 leading-[1.75] mx-auto mt-5" style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", fontWeight: 300, maxWidth: "580px" }}>
              This is a plain-English summary of what each section of the binding terms covers.
              It is not the full legal document — for the binding version or any specific clause,
              email the membership team.
            </p>
          </FadeUp>
        </div>

        <div className="space-y-5">
          {OVERVIEW.map((item, i) => (
            <FadeUp key={item.title} delay={0.3 + i * 0.04}>
              <div className="bg-[#010101] border border-white/[0.06] rounded-md p-6 md:p-7">
                <h3
                  className="font-display italic text-cream leading-[1.18] mb-3"
                  style={{ fontSize: "clamp(17px, 1.5vw, 21px)", fontWeight: 400 }}
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                <p
                  className="font-body text-white/65 leading-[1.85]"
                  style={{ fontSize: "clamp(13px, 1.15vw, 15px)", fontWeight: 300 }}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[900px] mx-auto px-6 md:px-16 text-center">
        <FadeUp delay={0.05}>
          <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
            [ Questions ]
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400 }}>
            Need the <span className="text-[#C8A96E]">binding document</span>?
          </h2>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="font-body text-white/65 leading-[1.85] mx-auto mb-10" style={{ fontSize: "clamp(14px, 1.25vw, 16px)", fontWeight: 300, maxWidth: "560px" }}>
            For the full binding T&amp;Cs document, specific clause questions, or anything else
            membership-related — email the membership team.
          </p>
        </FadeUp>
        <FadeUp delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a href={`mailto:${MEMBERSHIP_EMAIL}?subject=OurView%20Membership%20T%26Cs%20enquiry`} className="btn-cta">
              Email {MEMBERSHIP_EMAIL}
            </a>
            <Link href="/wine-club" className="btn-cta">Back to OurView</Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function WineClubTermsPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><OperatorSection /></ScrollReset>
        <ScrollReset><OverviewSection /></ScrollReset>
        <ScrollReset><ContactCTA /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
