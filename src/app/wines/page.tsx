"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReset } from "@/components/ScrollReset";
import { wines as allWines, WINE_CATEGORY, type WineCategory, type Wine } from "@/data/wines";
import { basePath } from "@/lib/basePath";

// ── Data ────────────────────────────────────────────────────────────────────
// Same filter as the homepage carousel: exclude the bespoke engraving
// service (it's a gift product, not a wine). Sorted price-desc to mirror
// the carousel's editorial pacing (flagship first, entry-level last).
const priceValue = (p: string): number =>
  parseFloat(p.replace(/[^0-9.]/g, "")) || 0;

const wines = allWines
  // Bottle-focused listing - exclude the gift product and the OurView
  // Wine Club membership entry. (Club still lives in wines.ts so its
  // existence is single-source; CTAs across the site link to it via
  // its customUrl. It just doesn't belong in this bottle grid.)
  .filter((w) => w.slug !== "engraved-bottle-gift" && w.kind !== "membership")
  // Sort:
  //  1. In-stock wines first, by price descending (flagship first).
  //  2. Out-of-stock wines last, internally still price-desc.
  // Keeps Oak Reserve (currently OOS) at the end of the grid without
  // hiding it — visitors still see the wine and can register interest
  // via the Notify-Me form on its SKU page.
  .sort((a, b) => {
    if (!a.outOfStock && b.outOfStock) return -1;
    if (a.outOfStock && !b.outOfStock) return 1;
    return priceValue(b.price) - priceValue(a.price);
  });

// ── Section: Page Hero ──────────────────────────────────────────────────────

function PageHero() {
  return (
    // Hero compacted 2026-05-20: pt 28/32 → 20/24 and pb 14/20 → 6/10
    // so the row-view gallery fits inside the viewport on standard
    // monitors. The atmospheric radial + typographic weight still
    // carry the section, no extra vertical breathing needed.
    <section className="relative bg-[#010101] overflow-hidden pt-20 md:pt-24 pb-6 md:pb-10">
      <div
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
          [ The Collection · {wines.length} sparkling {wines.length === 1 ? "wine" : "wines"} ]
        </motion.p>

        {/* Headline — single line on desktop (md+), broken to two
            lines on mobile because the full sentence doesn't fit a
            narrow viewport at the cap font-size. The break happens
            via `block md:inline` on the wrapper span (NOT a <br>);
            the Cockpit content editor still sees one DOM text node
            so headline edits stay single-field.

            Font-size capped at 72px (down from 88px on 2026-05-27)
            so the whole sentence — "Sparkling wines from Sussex
            chalk." — fits one line within the max-w-[1200px]
            container at desktop widths without re-wrapping. */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-cream leading-[1.06] mb-6"
          style={{ fontSize: "clamp(38px, 5.2vw, 72px)", fontWeight: 400 }}
        >
          Sparkling wines from{" "}
          <span className="block md:inline">
            <span className="text-[#C8A96E]">Sussex chalk</span>.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="font-body text-white/65 leading-[1.75] mx-auto"
          style={{
            fontSize: "clamp(14px, 1.4vw, 17px)",
            fontWeight: 400,
            maxWidth: "560px",
          }}
        >
          Three decades of English sparkling and still wines, Méthode Traditionnelle
          and hand-harvested at our estate on Ditchling Common.
        </motion.p>

        {/* Browse-Cases cross-link previously sat here centred under
            the hero copy. Moved into GalleryToolbar 2026-05-27 so
            its baseline lines up with the layout-switcher row
            instead of floating one row above it. */}
      </div>
    </section>
  );
}

// ── Section: Wine Legend ────────────────────────────────────────────────────
// Compact anchor-strip under the hero: one mini-bottle per wine. Click jumps
// to the full card in the grid below. Solves the "10 wines = lots of scrolling"
// UX problem - gives users a one-glance overview + a direct route to whichever
// bottle they came for. On mobile the strip scrolls horizontally with snap;
// desktop wraps to a single (or two-line on narrow viewports) row.

function WineLegend({ wines }: { wines: Wine[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cbarRef = useRef<HTMLDivElement | null>(null);
  const cthumbRef = useRef<HTMLDivElement | null>(null);

  // Wheel + drag + custom scrollbar - mirrors the Beyond-the-Bottle
  // homepage row mechanic so the bottle poster scrolls horizontally
  // on desktop with the same affordances (vertical wheel → horizontal
  // scroll, pointer drag, draggable thumb under the row).
  useEffect(() => {
    const el = scrollerRef.current;
    const cbar = cbarRef.current;
    const cthumb = cthumbRef.current;
    if (!el || !cbar || !cthumb) return;

    el.querySelectorAll("img").forEach((img) =>
      img.setAttribute("draggable", "false"),
    );

    const onWheel = (e: WheelEvent) => {
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      if ((atStart && delta < 0) || (atEnd && delta > 0)) return;
      e.preventDefault();
      el.scrollLeft += delta * 1.5;
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    let rowDown = false;
    let rowStartX = 0;
    let rowStartLeft = 0;
    const onRowDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest("a, button")) return;
      e.preventDefault();
      rowDown = true;
      rowStartX = e.clientX;
      rowStartLeft = el.scrollLeft;
    };
    const onRowMove = (e: PointerEvent) => {
      if (!rowDown) return;
      el.scrollLeft = rowStartLeft - (e.clientX - rowStartX);
    };
    const onRowUp = () => { rowDown = false; };
    el.addEventListener("pointerdown", onRowDown);
    document.addEventListener("pointermove", onRowMove);
    document.addEventListener("pointerup", onRowUp);
    document.addEventListener("pointercancel", onRowUp);

    const cbarUpdate = () => {
      const scrollW = el.scrollWidth;
      const clientW = el.clientWidth;
      if (scrollW <= clientW + 1) {
        cbar.style.display = "none";
        return;
      }
      cbar.style.display = "block";
      const trackW = cbar.clientWidth;
      if (trackW <= 0) return;
      const ratio = clientW / scrollW;
      const thumbW = Math.max(48, Math.floor(trackW * ratio));
      const maxLeft = trackW - thumbW;
      const scrollable = scrollW - clientW;
      const progress = scrollable > 0
        ? Math.max(0, Math.min(1, el.scrollLeft / scrollable))
        : 0;
      cthumb.style.width = thumbW + "px";
      cthumb.style.left = Math.round(maxLeft * progress) + "px";
    };
    el.addEventListener("scroll", cbarUpdate, { passive: true });
    window.addEventListener("resize", cbarUpdate, { passive: true });
    cbarUpdate();
    const t1 = setTimeout(cbarUpdate, 100);
    const t2 = setTimeout(cbarUpdate, 600);

    let thumbDragging = false;
    let thumbStartX = 0;
    let thumbStartScroll = 0;
    const thumbDown = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      thumbDragging = true;
      thumbStartX = e.clientX;
      thumbStartScroll = el.scrollLeft;
      cbar.classList.add("is-dragging");
      document.body.style.userSelect = "none";
    };
    const thumbMove = (e: PointerEvent) => {
      if (!thumbDragging) return;
      const trackW = cbar.clientWidth;
      const thumbW = cthumb.clientWidth;
      const maxLeft = trackW - thumbW;
      if (maxLeft <= 0) return;
      const dx = e.clientX - thumbStartX;
      const scrollable = el.scrollWidth - el.clientWidth;
      el.scrollLeft = thumbStartScroll + (dx / maxLeft) * scrollable;
    };
    const thumbUp = () => {
      if (!thumbDragging) return;
      thumbDragging = false;
      cbar.classList.remove("is-dragging");
      document.body.style.userSelect = "";
    };
    cthumb.addEventListener("pointerdown", thumbDown);
    document.addEventListener("pointermove", thumbMove);
    document.addEventListener("pointerup", thumbUp);
    document.addEventListener("pointercancel", thumbUp);

    const trackClick = (e: PointerEvent) => {
      if (e.target === cthumb) return;
      const rect = cbar.getBoundingClientRect();
      const thumbW = cthumb.clientWidth;
      const trackW = cbar.clientWidth;
      const maxLeft = trackW - thumbW;
      if (maxLeft <= 0) return;
      const x = e.clientX - rect.left - thumbW / 2;
      const clamped = Math.max(0, Math.min(maxLeft, x));
      const scrollable = el.scrollWidth - el.clientWidth;
      el.scrollLeft = (clamped / maxLeft) * scrollable;
    };
    cbar.addEventListener("pointerdown", trackClick);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onRowDown);
      document.removeEventListener("pointermove", onRowMove);
      document.removeEventListener("pointerup", onRowUp);
      document.removeEventListener("pointercancel", onRowUp);
      el.removeEventListener("scroll", cbarUpdate);
      window.removeEventListener("resize", cbarUpdate);
      cthumb.removeEventListener("pointerdown", thumbDown);
      document.removeEventListener("pointermove", thumbMove);
      document.removeEventListener("pointerup", thumbUp);
      document.removeEventListener("pointercancel", thumbUp);
      cbar.removeEventListener("pointerdown", trackClick);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative bg-[#010101] border-t border-white/[0.06] overflow-hidden">
      {/* Soft gold radial wash anchoring the bottle row - gives the
          editorial poster a quiet stage instead of a flat dark band. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200,169,110,0.045) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1500px] mx-auto px-2 md:px-12 pt-8 md:pt-10 pb-2 md:pb-8">
        {/* "Jump to a bottle" label removed 2026-05-17 - the mini-
            bottle strip is self-explanatory and the explicit label
            felt redundant above it. */}

        {/* Horizontal scroll-snap strip on every breakpoint. Mobile
            keeps the 88px swipe thumbs; desktop scales up to wide
            editorial plates (~220px each) so 5-6 are visible at a time
            and the rest pull in with the wheel→horizontal mechanic and
            the gold custom scrollbar below. */}
        <div
          ref={scrollerRef}
          className="overflow-x-auto overflow-y-hidden row-scroll select-none"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
        <ul
          className="flex gap-4 md:gap-6 snap-x snap-mandatory md:snap-proximity px-4 md:px-0 pb-3 md:pb-0"
          style={{ paddingRight: "max(1rem, 4vw)" }}
        >
          {wines.map((wine) => {
            return (
              <li
                key={wine.id}
                className="flex-shrink-0 snap-start"
                style={{ scrollSnapAlign: "start" }}
              >
                <a
                  href={
                    wine.customUrl
                      ? `${basePath}${wine.customUrl}`
                      : wine.slug
                        ? `${basePath}/wine/${wine.slug}`
                        : "#"
                  }
                  aria-label={`Open ${wine.name}`}
                  className="group relative flex flex-col items-center w-[27vw] md:w-[220px] lg:w-[240px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]/40 rounded-sm"
                >
                  {/* Bottle stage - square thumb on mobile, taller portrait
                      plate on desktop so the bottle reads as a poster
                      figure not a thumbnail. */}
                  <div className="relative w-full aspect-square md:aspect-[5/6] bg-[#0a0a0a] rounded-sm overflow-hidden">
                    {/* Concentrated gold halo behind the bottle */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 70% 55% at 50% 70%, rgba(200,169,110,0.10) 0%, transparent 65%)",
                      }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${basePath}${wine.image}`}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 w-full h-full object-contain p-2.5 md:p-5 transition-transform duration-700 ease-out group-hover:scale-[1.06] [filter:drop-shadow(0_8px_14px_rgba(0,0,0,0.6))]"
                    />
                    {/* Inset hairline - gold on hover. Read as a vitrine
                        frame around the bottle. */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none rounded-sm ring-1 ring-inset ring-white/[0.04] group-hover:ring-[#C8A96E]/40 transition-colors duration-500"
                    />
                  </div>

                  {/* Editorial caption block - display italic name + gold
                      italic price + uppercase volume hairline. */}
                  <span
                    className="font-display italic text-white/80 group-hover:text-cream mt-3 md:mt-4 text-center leading-[1.15] transition-colors duration-400"
                    style={{ fontSize: "clamp(11px, 1.1vw, 16px)", fontWeight: 400 }}
                  >
                    {wine.name}
                  </span>
                  <span
                    className="font-display italic text-[#C8A96E] mt-1 md:mt-2 text-center leading-none"
                    style={{ fontSize: "clamp(11px, 1vw, 14px)" }}
                  >
                    {wine.price}
                  </span>
                  <span
                    className="font-body text-white/35 mt-1 text-center uppercase leading-none"
                    style={{ fontSize: "8.5px", letterSpacing: "0.28em" }}
                  >
                    {wine.bottleSize ?? "75cl"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        </div>

        {/* Custom always-visible gold scrollbar - same mechanic as the
            Beyond-the-Bottle row on the homepage. Shown on mobile too
            (was desktop-only) so users on touch devices can see the
            scroll affordance + drag the thumb directly. */}
        <div className="block mt-4 md:mt-6 px-4 md:px-2">
          <div ref={cbarRef} className="rv-row-cbar">
            <div ref={cthumbRef} className="rv-row-cbar-thumb" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Wine Grid ──────────────────────────────────────────────────────

function WineGrid({ wines }: { wines: Wine[] }) {
  // Track the URL hash so the matching grid card gets a gold ring -
  // signals to the user "this is the wine you jumped to from the
  // legend strip above". Reads on mount AND on every hashchange so
  // repeated clicks in the legend re-highlight cleanly.
  const [activeSlug, setActiveSlug] = useState<string>("");
  useEffect(() => {
    const read = () => setActiveSlug(window.location.hash.replace(/^#/, ""));
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  return (
    <section className="relative bg-[#010101] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-14 md:py-20">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-14 md:gap-y-20">
          {wines.map((wine, i) => {
            const anchorId = wine.slug ?? `wine-${wine.id}`;
            const isActive = activeSlug === anchorId;
            return (
            <motion.li
              key={wine.id}
              // Anchor target for the WineLegend strip above.
              // scroll-mt clears the fixed navbar (~95px desktop / ~70px mobile)
              // so the card lands fully visible, not tucked under the nav.
              id={anchorId}
              style={{ scrollMarginTop: "100px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                // Stagger across rows (3 cols) - items in same row reveal
                // together, next row 0.08s later.
                delay: 0.05 + (i % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative rounded-sm transition-all duration-500 ${
                isActive
                  ? "ring-1 ring-[#C8A96E]/55 shadow-[0_0_42px_-8px_rgba(200,169,110,0.35)] bg-[rgba(200,169,110,0.03)] p-4 md:p-5 -m-4 md:-m-5"
                  : "p-0"
              }`}
            >
              <a
                href={wine.customUrl
                  ? `${basePath}${wine.customUrl}`
                  : wine.slug ? `${basePath}/wine/${wine.slug}` : "#"}
                className="block text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]/40 rounded-sm"
              >
                {/* Bottle stage - dark frame + gold radial atmosphere */}
                <div className="relative aspect-[3/4] overflow-hidden mb-5 md:mb-6 bg-[#0a0a0a] rounded-sm">
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 60% at 50% 65%, rgba(200,169,110,0.06) 0%, transparent 70%)",
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${wine.image}`}
                    alt={`${wine.name} bottle`}
                    className="absolute inset-0 w-full h-full object-contain p-7 md:p-10 transition-transform duration-700 ease-out group-hover:scale-[1.04] [filter:drop-shadow(0_18px_28px_rgba(0,0,0,0.5))]"
                  />
                  {/* Subtle gold hairline that appears on hover */}
                  <div
                    aria-hidden
                    className="absolute inset-x-7 bottom-3 md:inset-x-10 md:bottom-5 h-px bg-[#C8A96E]/0 group-hover:bg-[#C8A96E]/50 transition-colors duration-500"
                  />
                </div>

                {/* Vintage kicker */}
                <p
                  className="font-body text-[#C8A96E]/75 group-hover:text-[#C8A96E] uppercase tracking-[0.24em] mb-2 transition-colors duration-400"
                  style={{ fontSize: "10px" }}
                >
                  {wine.vintage}
                </p>

                {/* Wine name */}
                <h2
                  className="font-display italic text-cream group-hover:text-white leading-[1.1] mb-2 transition-colors duration-400"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 30px)",
                    fontWeight: 400,
                  }}
                >
                  {wine.name}
                </h2>

                {/* Price */}
                <p
                  className="font-body text-white/55 group-hover:text-white/80 tracking-wider transition-colors duration-400 mb-5"
                  style={{
                    fontSize: "clamp(13px, 1.2vw, 15px)",
                    fontWeight: 400,
                  }}
                >
                  {wine.price}
                </p>

                {/* Trailer - tasting notes as pill chips, same compact
                    treatment as the homepage carousel's mobile view */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                  {wine.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="font-body text-white/55 group-hover:text-white/75 text-[11px] border border-white/[0.08] group-hover:border-[#C8A96E]/25 px-3 py-1 rounded-full transition-colors duration-400"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Shop Bottle - no border, elegant gold underline
                    appears on hover, slides from left like a magazine
                    accent line. */}
                <span
                  className="inline-flex font-body text-cream uppercase tracking-[0.22em] pb-1 relative"
                  style={{ fontSize: "11px", fontWeight: 400 }}
                >
                  {wine.kind === "membership" ? "Discover Membership" : "Shop Bottle"}
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 bottom-0 h-px bg-[#C8A96E] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  />
                </span>
              </a>
            </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// ── Section: Gallery Toolbar ────────────────────────────────────────────────
// Top-right toolbar (2026-05-20): replaces the previous center-aligned
// pill switch which felt like a primary action even though the two
// views show the same wines.
//
// Three elements, right-aligned:
//   1. Hint label "Layout" — tiny uppercase tracking, white/35.
//      Hidden on mobile (cramped viewport).
//   2. Counter "10 / 10 available" — gold italic kicker, makes
//      inventory legible before the user scrolls.
//   3. Icon-only switch — outline SVG (3 lines / 2×2 grid) inside a
//      square hairline-bordered frame. Active icon = gold bg @ 15%,
//      cream text. matches our .btn-cta layered-border language.

function RowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="3" y1="4" x2="13" y2="4" />
      <line x1="3" y1="8" x2="13" y2="8" />
      <line x1="3" y1="12" x2="13" y2="12" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      aria-hidden
    >
      <rect x="3" y="3" width="4.5" height="4.5" />
      <rect x="8.5" y="3" width="4.5" height="4.5" />
      <rect x="3" y="8.5" width="4.5" height="4.5" />
      <rect x="8.5" y="8.5" width="4.5" height="4.5" />
    </svg>
  );
}

function GalleryToolbar({
  view,
  onChange,
  count,
  total,
}: {
  view: "row" | "grid";
  onChange: (v: "row" | "grid") => void;
  count: number;
  total: number;
}) {
  return (
    <section className="relative bg-[#010101] pt-0 pb-2 md:pb-3">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center md:justify-between gap-3 md:gap-5">

        {/* Browse-Cases cross-link — moved here 2026-05-27 from
            PageHero so its baseline aligns with the layout-switcher
            row on the right. Bulk-buyers / gifting / wine-club-
            curious cohort lands directly on the 6-bottle pricing.
            The underline + arrow treatment matches the "Shop Bottle"
            CTA at the bottom of each WineGrid card. */}
        <a
          href={`${basePath}/wines/cases`}
          className="group inline-flex items-center gap-2.5 font-body text-cream uppercase tracking-[0.22em] pb-1 relative hover:text-[#C8A96E] transition-colors duration-400"
          style={{ fontSize: "11px", fontWeight: 400 }}
        >
          <span>Browse Cases · Save 10%</span>
          <span aria-hidden className="text-[#C8A96E]">
            →
          </span>
          <span
            aria-hidden
            className="absolute left-0 right-0 bottom-0 h-px bg-[#C8A96E] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
          />
        </a>

        {/* Right-side controls cluster — counter then layout label
            then switcher. "Layout" sits directly next to the icons
            so it reads as the icon's label, not a header above the
            counter. */}
        <div className="flex items-center gap-4 md:gap-5 self-end md:self-auto">
          {/* Inventory counter — gold tracking, mobile keeps it visible */}
          <span
            className="font-body text-[#C8A96E]/80 uppercase tracking-[0.18em]"
            style={{ fontSize: "10px", fontWeight: 400 }}
            aria-label={`${count} of ${total} bottles available`}
          >
            {count} / {total} available
          </span>

          {/* Layout label — desktop only, sits IMMEDIATELY next to
              the switcher so the relationship is unambiguous. */}
          <span
            className="hidden md:inline font-body text-white/35 uppercase tracking-[0.22em]"
            style={{ fontSize: "10px", fontWeight: 400 }}
          >
            Layout
          </span>

          {/* Icon switch — outline SVGs, square hairline frame */}
          <div
            role="group"
            aria-label="Catalog view"
            className="inline-flex items-center border border-white/15 rounded-sm p-0.5 bg-white/[0.03] backdrop-blur-sm"
          >
          <button
            type="button"
            onClick={() => onChange("row")}
            aria-pressed={view === "row"}
            title="Row view — compact horizontal strip"
            className={`p-1.5 rounded-sm transition-colors duration-300 ${
              view === "row"
                ? "bg-[#C8A96E]/15 text-cream"
                : "text-white/55 hover:text-white/85"
            }`}
          >
            <RowIcon />
          </button>
          <button
            type="button"
            onClick={() => onChange("grid")}
            aria-pressed={view === "grid"}
            title="Grid view — editorial cards"
            className={`p-1.5 rounded-sm transition-colors duration-300 ${
              view === "grid"
                ? "bg-[#C8A96E]/15 text-cream"
                : "text-white/55 hover:text-white/85"
            }`}
          >
            <GridIcon />
          </button>
        </div>
        </div>{/* /right-cluster */}
      </div>
    </section>
  );
}

// ── Section: Bespoke Gifting CTA ────────────────────────────────────────────
// Engraved Bottle Gift is intentionally excluded from the wine grid (it's a
// service, not a wine). This section keeps it discoverable without diluting
// the catalog.

function GiftCTA() {
  return (
    <section className="relative bg-[#010101] border-t border-white/[0.06]">
      <div className="max-w-[960px] mx-auto px-6 md:px-16 py-16 md:py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-display italic text-[#C8A96E] tracking-widest mb-4"
          style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
        >
          [ Bespoke Gifting ]
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-display italic text-cream leading-[1.1] mb-5"
          style={{ fontSize: "clamp(28px, 3.6vw, 52px)", fontWeight: 400 }}
        >
          Looking for a <span className="text-[#C8A96E]">gift</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="font-body text-white/65 leading-[1.8] mx-auto mb-9"
          style={{
            fontSize: "clamp(14px, 1.4vw, 17px)",
            fontWeight: 400,
            maxWidth: "520px",
          }}
        >
          Engrave a message on Bloomsbury, Fitzrovia Rosé or Blanc de Blancs -
          made-to-order in our cellar within five working days.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.24 }}
        >
          <a
            href={`${basePath}/wine/engraved-bottle-gift`}
            className="btn-cta"
          >
            Discover the Engraved Bottle
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section: Back-to-Top floating arrow ────────────────────────────────────
// Appears once the user has scrolled past the hero (typical use: they
// clicked a mini-bottle in the legend, the page anchor-scrolled them
// down to a wine card, and now they want to return to the hero to pick
// another bottle). Fixed bottom-right; smooth-scroll to top on click;
// auto-hides when back at the top. Honors prefers-reduced-motion.

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Threshold ≈ "past the hero" - 70 % of viewport height covers the
    // hero section + mini-bottle legend on all common viewports.
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-sm border border-[#C8A96E]/60 bg-[rgba(245,240,232,0.04)] text-cream backdrop-blur-md backdrop-saturate-150 transition-all duration-400 hover:border-[#C8A96E] hover:bg-[rgba(200,169,110,0.10)] hover:shadow-[0_0_24px_-2px_rgba(200,169,110,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96E]/30 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      style={{
        transition:
          "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      {/* Up arrow - simple inline SVG, gold-on-glass aesthetic.
          Cream stroke matches the cream text used elsewhere on
          floating chrome (Navbar logo, etc.). */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M10 16V4M10 4L4 10M10 4L16 10"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// ── Category filter ─────────────────────────────────────────────────────────
// Signature vs Limited Release vs Still — the one meaningful grouping the
// UK shop makes. Pills filter the grid/legend below; "All" is the default.
const WINE_FILTERS: { key: WineCategory | "all"; label: string }[] = [
  { key: "all", label: "All Wines" },
  { key: "signature", label: "Signature" },
  { key: "limited", label: "Limited Release" },
  { key: "still", label: "Still" },
];

function CategoryFilter({
  active,
  onChange,
}: {
  active: WineCategory | "all";
  onChange: (c: WineCategory | "all") => void;
}) {
  return (
    <section className="relative bg-[#010101] pb-5 md:pb-7">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex flex-wrap gap-2 md:gap-2.5">
        {WINE_FILTERS.map((f) => {
          const on = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onChange(f.key)}
              aria-pressed={on}
              className={`font-body uppercase tracking-[0.18em] px-4 py-2 rounded-sm border transition-colors duration-300 ${
                on
                  ? "border-[#C8A96E] text-cream bg-[rgba(200,169,110,0.10)]"
                  : "border-white/12 text-white/55 hover:border-[#C8A96E]/50 hover:text-[#C8A96E]"
              }`}
              style={{ fontSize: "10.5px", fontWeight: 400 }}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function WinesPage() {
  // View mode: "row" = compact horizontal bottle strip (default),
  // "grid" = editorial card grid. Toggled via the layout switch.
  const [view, setView] = useState<"row" | "grid">("row");
  // Category filter (Signature / Limited / Still / All).
  const [cat, setCat] = useState<WineCategory | "all">("all");
  const filtered =
    cat === "all"
      ? wines
      : wines.filter((w) => w.slug && WINE_CATEGORY[w.slug] === cat);

  return (
    <div className="bg-[#010101] min-h-screen">
      {/* Grain noise overlay - same value used on /vineyard-booking for visual
          continuity across non-homepage routes. Sits above content
          (z-100) but pointer-events:none so it never blocks clicks. */}
      <div
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
        <GalleryToolbar
          view={view}
          onChange={setView}
          count={filtered.length}
          total={wines.length}
        />
        <CategoryFilter active={cat} onChange={setCat} />
        {view === "row" ? (
          <WineLegend wines={filtered} />
        ) : (
          <ScrollReset key={cat}><WineGrid wines={filtered} /></ScrollReset>
        )}
        <ScrollReset><GiftCTA /></ScrollReset>
      </main>
      <BackToTop />
      <Footer />
      {/* No <BottomNav /> on /wines - the catalog cards themselves
          are the primary navigation on this page; a sticky bottom
          bar would just add mobile clutter without a relevant
          destination (Home is one tap away in the hamburger menu,
          and "View All Wines" pointing back at the page the user
          is already on is tautological). */}
    </div>
  );
}
