"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ScrollReset } from "@/components/ScrollReset";
import { basePath } from "@/lib/basePath";

const GIFT_EMAIL = "info@ridgeview.co.uk";
const BESPOKE_MAILTO =
  `mailto:${GIFT_EMAIL}` +
  `?subject=${encodeURIComponent("Bespoke gift set enquiry — Ridgeview")}` +
  `&body=${encodeURIComponent(
    "Hello,\n\nI'd like to enquire about a bespoke gift set from Ridgeview.\n\n" +
      "Type of set (Duo / Trio / mixed case / fully bespoke): \n" +
      "Recipient occasion (birthday / anniversary / corporate / housewarming / other): \n" +
      "Approximate budget: \n" +
      "Quantity (1 / 5 / 25 / 100+): \n" +
      "Delivery date: \n" +
      "Personalisation needs (engraving / branded note / gift wrap): \n\n" +
      "Contact:\nName: \nEmail: \nPhone: \n\nThank you.\n",
  )}`;

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
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
          src={`${basePath}/images/chalk-bottles.jpg`}
          alt="Ridgeview bottles arranged on Sussex chalk — gift set selection"
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
          [ Wine Gifts · Curated &amp; Bespoke ]
        </motion.p>

        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display italic text-cream leading-[1.05]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)", fontWeight: 400, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            initial={{ y: "102%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Wine <span className="text-[#C8A96E]">Gift Sets</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="font-body text-white/65 max-w-[680px]"
          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.7, textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          A single bottle that says everything, or a curated set built around an occasion.
          Award-winning English sparkling — personalised, packaged and delivered, ready to
          arrive with the right note attached.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
          className="mt-7 md:mt-9 flex flex-wrap gap-3 md:gap-4"
        >
          <a href="#shop" className="btn-cta">Shop ready-to-gift</a>
          <a href="#bespoke" className="btn-cta">Bespoke sets</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Ready-to-gift catalogue ──────────────────────────────────────────────
type Gift = {
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  badge?: string;
};

const READY_GIFTS: Gift[] = [
  {
    kicker: "[ Personalised ]",
    title: "Engraved Bottle Gift",
    body: "Bespoke engraving on Bloomsbury NV, Fitzrovia Rosé or Blanc de Blancs. A name, a date, a short message — engraved by hand and fulfilled in up to 5 working days.",
    cta: "Personalise a bottle",
    href: "/wine/engraved-bottle-gift",
    image: "/images/gift-sets/engraved-bottle.webp",
    imageAlt: "Engraved Ridgeview bottle with custom message",
    badge: "Most personal",
  },
  {
    kicker: "[ Voucher ]",
    title: "Gift Vouchers",
    body: "From £25. Redeemable across wine, tours, the restaurant and OurView membership. Digital delivery within one working day; valid 12 months.",
    cta: "Choose an amount",
    href: "/gift-vouchers",
    image: "/images/articles/luxury-sparkling-wine-gift-guide/inline-3.webp",
    imageAlt: "Ridgeview gift voucher card",
  },
  {
    kicker: "[ Statement Bottle ]",
    title: "Sparkling Red Reserve",
    body: "England&rsquo;s answer to a special Pinot moment — wild blackberry, vanilla and warm spice. The gift for someone who already has everything sparkling and white.",
    cta: "Discover the wine",
    href: "/wine/sparkling-red-reserve",
    image: "/images/gift-sets/sparkling-red-gift.webp",
    imageAlt: "Ridgeview Sparkling Red Reserve — gift presentation",
  },
  {
    kicker: "[ Magnum · 1.5L ]",
    title: "Magnum Bloomsbury NV",
    body: "Our most poured wine, in a format that turns it into the centrepiece. Slower ageing in the larger bottle delivers layered fruit and biscuity complexity.",
    cta: "Choose a Magnum",
    href: "/wine/bloomsbury",
    image: "/images/articles/luxury-sparkling-wine-gift-guide/inline-7.webp",
    imageAlt: "Magnum Bloomsbury NV",
  },
  {
    kicker: "[ Vintage Magnum · 2010 ]",
    title: "Blanc de Blancs Magnum",
    body: "100% Chardonnay, aged for over a decade. Bright apricot, fine persistent mousse, long pure finish. For New Year&rsquo;s Eve, gifting and once-a-year moments.",
    cta: "Discover the vintage",
    href: "/wine/blanc-de-blancs",
    image: "/images/articles/luxury-sparkling-wine-gift-guide/inline-9.webp",
    imageAlt: "Magnum Blanc de Blancs 2010",
    badge: "Sommelier 2024",
  },
  {
    kicker: "[ Membership Gift ]",
    title: "OurView Wine Club Gift",
    body: "A year of OurView membership — Spring &amp; Autumn cases, member-only pricing, secret events, archive wines. The gift that keeps arriving.",
    cta: "Gift membership",
    href: "/wine-club",
    image: "/images/articles/luxury-sparkling-wine-gift-guide/inline-11.webp",
    imageAlt: "OurView wine club case",
  },
];

function ShopGrid() {
  return (
    <section id="shop" className="relative bg-[#010101] py-20 md:py-28 border-t border-white/[0.06] scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Ready to Gift ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08]" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              Six gifts, <span className="text-[#C8A96E]">delivered</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="font-body text-white/65 leading-[1.85] mx-auto mt-6" style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300, maxWidth: "580px" }}>
              Each one a complete gift on its own — personalised, packaged and ready to arrive
              with the right note. From engraved single bottles to year-long memberships.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {READY_GIFTS.map((g, i) => (
            <FadeUp key={g.title} delay={0.3 + i * 0.05}>
              <Link
                href={g.href}
                className="group block h-full bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md overflow-hidden transition-all duration-400"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${g.image}`}
                    alt={g.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition-colors duration-700 group-hover:from-black/40" />
                  {g.badge && (
                    <span
                      className="absolute top-4 right-4 font-body text-[#C8A96E] uppercase tracking-[0.25em] border border-[#C8A96E]/40 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-sm"
                      style={{ fontSize: "9.5px", fontWeight: 400 }}
                    >
                      {g.badge}
                    </span>
                  )}
                </div>
                <div className="p-7 md:p-8">
                  <p
                    className="font-display italic text-[#C8A96E] tracking-widest mb-3"
                    style={{ fontSize: "clamp(11px, 1.05vw, 13px)" }}
                  >
                    {g.kicker}
                  </p>
                  <h3
                    className="font-display italic text-cream group-hover:text-white leading-[1.18] mb-3 transition-colors"
                    style={{ fontSize: "clamp(20px, 1.9vw, 26px)", fontWeight: 400 }}
                  >
                    {g.title}
                  </h3>
                  <p
                    className="font-body text-white/55 leading-[1.7] mb-5"
                    style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", fontWeight: 300 }}
                    dangerouslySetInnerHTML={{ __html: g.body }}
                  />
                  <span
                    className="font-body text-[#C8A96E]/80 group-hover:text-[#C8A96E] uppercase tracking-[0.2em] transition-colors"
                    style={{ fontSize: "11px", fontWeight: 400 }}
                  >
                    {g.cta} →
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bespoke Sets ──────────────────────────────────────────────────────────
type BespokeFormat = { title: string; body: string; image?: string; alt?: string };

const BESPOKE_FORMATS: BespokeFormat[] = [
  {
    title: "Rosé Duo",
    body: "Two of our rosé sparkling wines, paired and presented in a single gift box — built around the recipient&rsquo;s palate.",
    image: "/images/gift-sets/rose-duo.webp",
    alt: "Ridgeview Rosé Duo gift set",
  },
  {
    title: "Limited Release Duo",
    body: "Two scarce, allocation-limited wines from the cellar. Selected by us, presented as a single statement.",
    image: "/images/gift-sets/oak-single.webp",
    alt: "Ridgeview limited release single",
  },
  {
    title: "Signature Trio",
    body: "Three core-range wines that map the Ridgeview house style — a tasting flight, gifted.",
    image: "/images/gift-sets/signature-trio.webp",
    alt: "Ridgeview Signature Trio gift set",
  },
  {
    title: "Limited Release Trio",
    body: "A trio drawn from current limited releases — for collectors and people who want to be remembered.",
    image: "/images/gift-sets/noirs-trio.webp",
    alt: "Ridgeview Noirs Trio gift set",
  },
  {
    title: "Bespoke Mixed Case",
    body: "Six or twelve bottles, chosen with you. Branded gift notes and engraved bottles included on request.",
  },
  {
    title: "Fully Bespoke",
    body: "Vouchers + bottles + accessories. We&rsquo;ll build the set around the budget, occasion and recipient.",
  },
];

function BespokeSection() {
  return (
    <section id="bespoke" className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06] scroll-mt-24">
      <div className="max-w-[1300px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0.05}>
            <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
              [ Bespoke Gift Sets · By Enquiry ]
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-display italic text-cream leading-[1.08] mb-6" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontWeight: 400 }}>
              Duos, Trios &amp; <span className="text-[#C8A96E]">made-to-order</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="font-body text-white/65 leading-[1.85] mx-auto" style={{ fontSize: "clamp(13px, 1.25vw, 15px)", fontWeight: 300, maxWidth: "620px" }}>
              For curated sets beyond the catalogue — Duos, Trios, mixed cases and fully bespoke
              gifts — we build to order. Send a brief, we&rsquo;ll come back with proposals,
              imagery and pricing.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {BESPOKE_FORMATS.map((f, i) => (
            <FadeUp key={f.title} delay={0.3 + i * 0.05}>
              {/* Tiles with a product photo render as cards; text-only
                  formats (Bespoke Mixed Case, Fully Bespoke) stay as
                  editorial text-blocks with gold-hairline top — visual
                  variety that telegraphs "this is the imagination-led
                  end of the menu". */}
              {f.image ? (
                <div className="group h-full bg-[#0d0d0d] border border-white/[0.08] hover:border-[#C8A96E]/40 rounded-md overflow-hidden flex flex-col transition-all duration-400">
                  <div className="relative aspect-square overflow-hidden bg-[#0a0a0a]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${basePath}${f.image}`}
                      alt={f.alt || f.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <h3
                      className="font-display italic text-cream group-hover:text-white leading-[1.15] mb-3 transition-colors duration-400"
                      style={{ fontSize: "clamp(19px, 1.65vw, 22px)", fontWeight: 400 }}
                    >
                      {f.title}
                    </h3>
                    <p
                      className="font-body text-white/55 leading-[1.75]"
                      style={{ fontSize: "clamp(13px, 1.1vw, 14px)", fontWeight: 300 }}
                      dangerouslySetInnerHTML={{ __html: f.body }}
                    />
                  </div>
                </div>
              ) : (
                <div className="h-full border-t border-[#C8A96E]/25 pt-5">
                  <h3
                    className="font-display italic text-cream leading-[1.15] mb-3"
                    style={{ fontSize: "clamp(20px, 1.7vw, 24px)", fontWeight: 400 }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="font-body text-white/55 leading-[1.75]"
                    style={{ fontSize: "clamp(13px, 1.1vw, 14px)", fontWeight: 300 }}
                    dangerouslySetInnerHTML={{ __html: f.body }}
                  />
                </div>
              )}
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.7}>
          <div className="text-center">
            <a href={BESPOKE_MAILTO} className="btn-cta">
              Brief a bespoke set
            </a>
            <p
              className="font-body text-white/45 leading-relaxed mt-6 mx-auto"
              style={{ fontSize: "12.5px", fontWeight: 300, letterSpacing: "0.04em", maxWidth: "560px" }}
            >
              Buying for a company event or larger volumes? See{" "}
              <Link href="/corporate-services/corporate-wine-gifts" className="text-[#C8A96E] hover:underline">
                Corporate Wine &amp; Gift Services
              </Link>{" "}
              for branded engraving and B2B logistics.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Promise / Why us ─────────────────────────────────────────────────────
const PROMISES = [
  { title: "Free next-day delivery", body: "On UK orders over £45. Confirmed by 12 noon, dispatched same day via DHL." },
  { title: "Personalised gift notes", body: "Add a personal message at checkout — included with every gift, free of charge." },
  { title: "Sustainable to the door", body: "Lighter glass where the wine permits, recyclable secondary packaging." },
];

function PromiseSection() {
  return (
    <section className="relative bg-[#010101] py-16 md:py-20 border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {PROMISES.map((p, i) => (
            <FadeUp key={p.title} delay={0.1 + i * 0.06}>
              <div className="text-center md:text-left">
                <h3
                  className="font-display italic text-cream leading-[1.15] mb-3"
                  style={{ fontSize: "clamp(18px, 1.55vw, 22px)", fontWeight: 400 }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-body text-white/55 leading-[1.75]"
                  style={{ fontSize: "clamp(13px, 1.1vw, 14px)", fontWeight: 300 }}
                >
                  {p.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function GiftSetsPage() {
  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <PageHeader />
        <ScrollReset><ShopGrid /></ScrollReset>
        <ScrollReset><BespokeSection /></ScrollReset>
        <ScrollReset><PromiseSection /></ScrollReset>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
