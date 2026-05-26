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
          className="subline-hero"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
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
    title: "4 · Eligibility",
    body: "To become a member you must have completed an Application Form, be over the age of 18, and reside in the UK. We may request proof of age and identification at our discretion, and reserve the right to decline or revoke a membership where the eligibility criteria are not met.",
  },
  {
    title: "5 · Your benefits",
    body: "What you receive as a member — a Welcome Set (one bottle of Bloomsbury NV, two Ridgeview branded glasses and a sparkling-wine bottle stopper), a complimentary Classic Tour &amp; Tasting voucher for two, two mixed cases of wine across the Membership Term (delivered around the second week of May and November), 20% off Ridgeview wine, 20% off Ridgeview wine and 10% off food at The Rows &amp; Vine, archive access and priority event invitations. Full benefits listed on the OurView Benefits page.",
  },
  {
    title: "6 · Fees, payment and renewal",
    body: "Membership runs for an initial 12-month term and auto-renews for further 12-month periods unless cancelled. Payment is collected as a one-off annual payment via GoCardless, an FCA-authorised payment institution. We will not increase your fees during a Membership Term; for any change at renewal we give at least 30 days&rsquo; notice by email.",
  },
  {
    title: "7 · Cancellation and refunds",
    body: "You have a 14-day cooling-off period from membership confirmation (and from the start of each renewed term) to change your mind. After that you can cancel at any time in writing — refunds are only made where the cancellation is due to a significant change of terms, a serious breach by us, or your statutory rights as a UK consumer. Benefits already delivered during the Membership Term are not affected.",
  },
  {
    title: "8 · Changes to these terms",
    body: "We may update these terms occasionally. Material changes will be notified to active members by email before they take effect.",
  },
  {
    title: "9 · Our liability",
    body: "We are responsible for carrying out our obligations to a reasonable standard. Our overall liability under the Membership is capped at 150% of the total amount paid by you in the 12 months preceding the incident. Nothing limits our liability where UK law does not allow it (death or personal injury caused by negligence, fraud).",
  },
  {
    title: "10 · Data &amp; privacy",
    body: "We only process your personal information in accordance with applicable data-protection laws and our Privacy Policy. Full detail on what we collect, why and how — and your data-protection rights — is set out in the Privacy Policy linked in the footer.",
  },
  {
    title: "11 · Law &amp; jurisdiction",
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
          <p className="subline-section mx-auto mb-10">
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
