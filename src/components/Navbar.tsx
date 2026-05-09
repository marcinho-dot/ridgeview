"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";

function getLinks(isBookingPage: boolean) {
  // On the booking page, anchor links must point back to the homepage
  const anchor = (hash: string) => isBookingPage ? `${basePath}/${hash}` : hash;

  // "Shop" is the primary CTA — rendered separately as a gold-tinted button.
  const shopHref = anchor("#wine-collection");

  const desktop = [
    { label: "Vineyard Bookings", href: `${basePath}/booking` },
  ];

  const wineClubHref = anchor("#ourview");

  const mobile = [
    { label: "Shop", href: shopHref },
    { label: "Vineyard Bookings", href: `${basePath}/booking` },
    { label: "Wine Club", href: anchor("#ourview") },
    { label: "Our Story", href: anchor("#heritage") },
    { label: "Contact", href: anchor("#footer") },
  ];

  return { desktop, mobile, wineClubHref, shopHref };
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBookingPage, setIsBookingPage] = useState(false);

  useEffect(() => {
    setIsBookingPage(window.location.pathname.includes("/booking"));
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

  const { desktop: desktopLinks, mobile: mobileLinks, wineClubHref, shopHref } = getLinks(isBookingPage);

  return (
    <>
      {/* ── Main Navbar ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ease-out ${
          scrolled
            ? "py-[15px] md:py-3 bg-black/60 backdrop-blur-xl border-b border-white/[0.06]"
            : "py-5 md:py-6 bg-transparent"
        }`}
      >
        {/* Left links — desktop. "Shop" is rendered as a gold-tinted button
            with arrow (matching the hero "View all Wines" CTA), other entries
            stay as understated underline-on-hover text links. */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href={shopHref}
            className="btn-atb backdrop-blur-2xl backdrop-saturate-150"
          >
            Shop
            <span className="btn-atb-arrow">&rarr;</span>
          </a>
          {desktopLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="link-underline font-body text-white/75 text-[11px] tracking-[0.2em] uppercase hover:text-[#C8A96E] transition-colors duration-300"
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
          <a
            href={wineClubHref}
            className="hidden md:flex link-underline font-body text-white/75 text-[11px] tracking-[0.2em] uppercase hover:text-[#C8A96E] transition-colors duration-300"
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

      {/* ── Mobile Fullscreen Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ backgroundColor: "#080808" }}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <RidgeviewBadgeLogo scrolled={false} />
              <button aria-label="Close menu" className="text-white/55 hover:text-white transition-colors p-1"
                onClick={() => setMenuOpen(false)}>
                <CloseIcon />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-0 px-8">
              {mobileLinks.map((link, i) => (
                <motion.div key={link.label} className="w-full overflow-hidden border-b border-white/[0.06] last:border-0"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    className="font-display text-white/70 hover:text-white transition-colors py-4 w-full text-center block"
                    style={{ fontSize: "clamp(28px, 7vw, 48px)", fontStyle: "italic", fontWeight: 400, letterSpacing: "0.02em" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom */}
            <motion.div
              className="flex items-center justify-center gap-6 pb-10 border-t border-white/[0.06] pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <button aria-label="Search" className="text-white/40 hover:text-white transition-colors p-2">
                <SearchIcon />
              </button>
              <button aria-label="Account" className="text-white/40 hover:text-white transition-colors p-2">
                <AccountIcon />
              </button>
            </motion.div>
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
