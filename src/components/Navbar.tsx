"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";
import { CartButton } from "@/components/cart/CartButton";

function getLinks(isOffHome: boolean) {
  // On any non-homepage route (booking, /wine/<sku>, etc.) anchor links
  // need to point back to the homepage explicitly — otherwise the
  // hash resolves against the current route and silently does nothing.
  const anchor = (hash: string) => isOffHome ? `${basePath}/${hash}` : hash;

  // Primary menu — four items, identical structure across desktop +
  // mobile (locked 2026-05-12). Each has a `kicker` line that only
  // renders in the mobile drawer (editorial / magazine TOC pattern).
  //
  // Beyond the Bottle is now a real route (/beyond-the-bottle/) — the
  // articles hub built from the legacy news. Direct nav, no anchor.
  const items = [
    {
      label: "Home",
      kicker: "Sussex estate landing",
      href: `${basePath}/`,
    },
    {
      label: "Shop",
      kicker: "Ten award-winning wines",
      href: anchor("#wine-collection"),
    },
    {
      label: "Vineyard",
      kicker: "Tours, tastings & private events",
      href: `${basePath}/booking`,
    },
    {
      label: "Beyond the Bottle",
      kicker: "Articles & inspiration",
      href: `${basePath}/beyond-the-bottle/`,
    },
    {
      label: "About",
      kicker: "The team, the winemaker, the founder",
      href: `${basePath}/people/`,
    },
  ];

  const wineClubHref = `${basePath}/wine-club/`;

  return { items, wineClubHref };
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // True on every route except the homepage — controls whether anchor
  // links (#wine-collection, #ourview, etc.) need the homepage prefix.
  const [isOffHome, setIsOffHome] = useState(false);
  // Booking page also gets the milk-glass navbar from the start.
  const [isBookingPage, setIsBookingPage] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    // Strip a trailing slash for the comparison; basePath itself
    // is "" in dev and "/ridgeview" in production.
    const normalized = path.replace(/\/$/, "");
    const home = basePath.replace(/\/$/, "");
    setIsOffHome(normalized !== home);
    setIsBookingPage(path.includes("/booking"));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const { items: menuItems, wineClubHref } = getLinks(isOffHome);

  // The Booking (Vineyard) page starts with the milk-glass treatment by
  // default — the aerial hero image is busy and the header would disappear
  // against it without a frosted backdrop.
  const milkGlass = scrolled || isBookingPage;

  return (
    <>
      {/* ── Main Navbar ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ease-out ${
          milkGlass
            ? "py-4 md:py-5 bg-black/60 backdrop-blur-xl border-b border-white/[0.06]"
            : "py-5 md:py-6 bg-transparent"
        }`}
      >
        {/* Left links — desktop. Five-item structure (Home, Shop,
            Vineyard, Beyond the Bottle, People) mirrored in the
            mobile drawer.
            All entries share the same link-underline text style —
            no standalone gold CTA. Wine Club lives on the right. */}
        <div className="hidden md:flex items-center gap-7">
          {menuItems.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="relative top-[2px] link-underline font-body text-white/75 text-[11px] tracking-[0.2em] uppercase hover:text-[#C8A96E] transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Center logo */}
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
          <Link href="/">
            <motion.div whileHover={{ opacity: 0.75 }} transition={{ duration: 0.2 }}>
              <RidgeviewBadgeLogo scrolled={scrolled} />
            </motion.div>
          </Link>
        </div>

        {/* Right: icons + hamburger */}
        <div className="flex items-center gap-4 md:gap-5">
          <button aria-label="Search" className="hidden md:flex text-white/65 hover:text-[#C8A96E] transition-colors duration-300 p-1">
            <SearchIcon />
          </button>
          <button aria-label="Account" className="hidden md:flex text-white/65 hover:text-[#C8A96E] transition-colors duration-300 p-1">
            <AccountIcon />
          </button>
          {/* Cart — visible on BOTH mobile and desktop (unlike search
              / account which are desktop-only) because it's primary
              shopping UX. Full-white (not /65 like the neighbouring
              icons) so the hand-drawn basket-with-bottle-and-grapes
              detail reads crisply at navbar render size; the count
              badge already singles this icon out as "special". */}
          <CartButton className="text-white" />
          <a
            href={wineClubHref}
            className="hidden md:flex relative top-[2px] link-underline font-body text-white/75 text-[11px] tracking-[0.2em] uppercase hover:text-[#C8A96E] transition-colors duration-300"
          >
            Wine Club
          </a>

          {/* Hamburger + MENU — mobile only */}
          <button
            aria-label="Toggle menu"
            className="md:hidden flex items-center gap-2.5"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="font-body text-white/70 text-[10px] uppercase tracking-[0.22em]">
              Menu
            </span>
            <div className="flex flex-col justify-center items-center w-6 gap-[5px]">
              <motion.span className="block h-px bg-white origin-center" style={{ width: 22 }}
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }} />
              <motion.span className="block h-px bg-white" style={{ width: 22 }}
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }} />
              <motion.span className="block h-px bg-white origin-center" style={{ width: 22 }}
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }} />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile Editorial Drawer ────────────────────────────────
          Design direction (frontend-design + ui-ux-pro-max):
          Asymmetric left-aligned magazine TOC layout. Each menu item
          is a numbered editorial entry — gold ordinal (01–04) +
          Cormorant italic label + small Raleway kicker + gold arrow
          cue. The whole drawer rides on a deep-black canvas with a
          warm gold radial glow in the upper-right and a subtle
          grain-noise feel from the live `body::after` filter.
          Bottom anchors a featured Wine Club CTA (.btn-cta, etched
          crystal) plus search/account as quiet sub-icons + the
          estate signature line.

          Animation cascade: backdrop fades → top bar drops → menu
          items stagger up from below → bottom bar settles last. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Base black canvas */}
            <div className="absolute inset-0 bg-[#050505]" />

            {/* Atmospheric gold radial — upper-right glow, evokes
                a candlelit cellar window. Pointer-events:none so it
                never blocks taps. */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 65% 55% at 82% 18%, rgba(200,169,110,0.08) 0%, transparent 65%)",
              }}
            />
            {/* Secondary cool radial — lower-left, very subtle */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 0% 100%, rgba(255,255,255,0.025) 0%, transparent 60%)",
              }}
            />

            {/* Content stack — restructured 2026-05-12 to bring the
                action-zone (icons + Wine Club CTA) to the TOP so the
                user lands on what they can DO immediately when the
                drawer opens. The menu list sits tight underneath, no
                wasted vertical padding above or below. */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Top bar — logo + Search/Account icons + Close.
                  The two utility icons moved up from the bottom so
                  they're reachable next to the close affordance. */}
              <motion.div
                className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]"
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <RidgeviewBadgeLogo scrolled={false} />
                <div className="flex items-center gap-1">
                  <button
                    aria-label="Search"
                    className="text-white/55 hover:text-[#C8A96E] transition-colors p-2"
                  >
                    <SearchIcon />
                  </button>
                  <button
                    aria-label="Account"
                    className="text-white/55 hover:text-[#C8A96E] transition-colors p-2"
                  >
                    <AccountIcon />
                  </button>
                  <button
                    aria-label="Close menu"
                    className="text-white/55 hover:text-[#C8A96E] transition-colors p-2 ml-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </motion.div>

              {/* Wine Club featured CTA — moved up from the bottom.
                  This is the most important non-navigation action,
                  now visible immediately when the drawer opens. */}
              <motion.div
                className="px-6 py-4 border-b border-white/[0.06]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.20, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={wineClubHref}
                  onClick={() => setMenuOpen(false)}
                  className="btn-cta"
                  style={{ display: "flex", width: "100%", justifyContent: "center" }}
                >
                  Join the Wine Club
                </a>
              </motion.div>

              {/* Menu items — asymmetric, numbered, editorial TOC.
                  Sits directly under the CTA bar with a small top
                  pad. No flex-1 / justify-center on the list (was
                  the source of the big empty top+bottom padding) —
                  items stack tightly and the flex-1 spacer below
                  carries the remaining vertical space. */}
              <div className="px-8 pt-2">
                {menuItems.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group block border-b border-white/[0.07] last:border-0 active:bg-white/[0.02] transition-colors"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-5 py-5">
                      {/* Ordinal — small gold number, 01–04 */}
                      <span
                        className="font-display italic text-[#C8A96E]/65 group-hover:text-[#C8A96E] transition-colors duration-400 leading-none flex-shrink-0 self-start mt-3"
                        style={{ fontSize: "13px", letterSpacing: "0.08em" }}
                      >
                        0{i + 1}
                      </span>

                      {/* Label + kicker — slides slightly right on hover */}
                      <div className="flex-1 transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                        <span
                          className="block font-display italic text-cream group-hover:text-white transition-colors duration-400 leading-[1.0]"
                          style={{
                            fontSize: "clamp(32px, 8vw, 52px)",
                            fontWeight: 400,
                          }}
                        >
                          {link.label}
                        </span>
                        <span
                          className="block font-body text-white/35 group-hover:text-white/65 uppercase tracking-[0.24em] mt-2.5 transition-colors duration-400"
                          style={{ fontSize: "10px" }}
                        >
                          {link.kicker}
                        </span>
                      </div>

                      {/* Arrow cue — gold, slides right on hover */}
                      <span
                        aria-hidden
                        className="text-[#C8A96E]/35 group-hover:text-[#C8A96E] flex-shrink-0 self-center transition-all duration-500 group-hover:translate-x-1.5"
                        style={{ fontSize: "20px", lineHeight: 1 }}
                      >
                        &rarr;
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Signature — sits DIRECTLY under the last menu item
                  (no flex-1 spacer pushing it down). Aligned to the
                  menu's px-8 left/right padding so it reads as a
                  quiet outro to the list rather than a footer bar.
                  Empty drawer space falls below it. */}
              <motion.div
                className="px-8 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 + menuItems.length * 0.08 + 0.15, duration: 0.5 }}
              >
                <p
                  className="font-body text-white/30 uppercase tracking-[0.28em] text-center"
                  style={{ fontSize: "9px" }}
                >
                  Sussex &middot; Est. 1995
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Badge Logo ── */
function RidgeviewBadgeLogo({ scrolled }: { scrolled: boolean }) {
  return (
    <Image
      src={`${basePath}/logo/ridgeview-logo-dark.svg`}
      alt="Ridgeview Wine Estate"
      width={scrolled ? 52 : 64}
      height={scrolled ? 35 : 43}
      style={{
        filter: "brightness(0) invert(1)",
        opacity: 0.92,
        transition: "width 0.4s ease, height 0.4s ease",
      }}
      priority
    />
  );
}

/* ── Icons ── */
function WineGlassIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
      <path d="M4 1h8v5a4 4 0 0 1-4 4 4 4 0 0 1-4-4V1z" />
      <path d="M8 10v6" />
      <path d="M5 19h6" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function AccountIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
