"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { categories, articles } from "@/data/articles";
import { basePath } from "@/lib/basePath";

/**
 * Homepage section: horizontal-scrolling row of 7 category cards.
 *
 * Replaces the old per-article `BlogSection`. Each card links to
 * /beyond-the-bottle/#<category-slug> so the hub page auto-opens the
 * matching accordion on landing.
 *
 * Scroll mechanics (mirrors the Micronutrition academy row):
 *   - Vertical wheel input is captured and converted to horizontal
 *     scroll while the row hasn't reached its left/right boundary.
 *     Once a boundary is hit, the wheel falls back to page-vertical
 *     scroll so the user is never trapped.
 *   - The native horizontal scrollbar is visible (gold-themed via
 *     the `.row-scroll` utility in globals.css) so the user can also
 *     grab the thumb and drag.
 *   - Touch / trackpad horizontal swipes work natively. Pointer-based
 *     drag-to-scroll is provided too so a desktop user with no
 *     horizontal-scroll hardware can grab and drag the row.
 *   - CSS scroll-snap keeps cards aligned after any of the above.
 */

export function CategoryCardRow() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cbarRef = useRef<HTMLDivElement | null>(null);
  const cthumbRef = useRef<HTMLDivElement | null>(null);

  // ── Wheel + drag + custom-scrollbar (MN academy-row mechanic) ─────
  useEffect(() => {
    const el = scrollerRef.current;
    const cbar = cbarRef.current;
    const cthumb = cthumbRef.current;
    if (!el || !cbar || !cthumb) return;

    // Disable native image drag inside the row so it doesn't fight our
    // pointer-drag handler.
    el.querySelectorAll("img").forEach((img) =>
      img.setAttribute("draggable", "false"),
    );

    // ── Wheel: redirect vertical → horizontal with a 1.5× multiplier
    //   for snappier feel. Pass through when at a boundary so the user
    //   can keep scrolling the page.
    const onWheel = (e: WheelEvent) => {
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      if ((atStart && delta < 0) || (atEnd && delta > 0)) return;
      e.preventDefault();
      el.scrollLeft += delta * 1.5;
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    // ── Pointer drag on the row itself. Ignore presses landing on a
    //   link so card navigation still works.
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

    // ── Custom scrollbar thumb sync ──────────────────────────────────
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
    // Re-sync after fonts/images settle layout
    const t1 = setTimeout(cbarUpdate, 100);
    const t2 = setTimeout(cbarUpdate, 600);

    // ── Drag the thumb itself
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

    // ── Click on bare track → jump to that position
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

  // Compute article counts per category for the kicker line.
  // Drafts excluded so the displayed counts match what's actually
  // browseable on the hub / category pages.
  const countByCategory = articles.reduce<Record<string, number>>((acc, a) => {
    if (a.draft) return acc;
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <section
      id="beyond-the-bottle-row"
      className="relative bg-[#010101] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Subtle gold radial - keeps the dark band from feeling flat */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto py-20 md:py-28">
        {/* Header - staggered entrance triggers when the section enters
            the viewport (amount: 0.15 so it fires while the section
            is still partly below the fold, before the user has time to
            wonder if anything is animating). */}
        <motion.div
          className="px-6 md:px-16 mb-10 md:mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
          }}
        >
          <motion.p
            className="font-display italic text-[#C8A96E] tracking-widest mb-4"
            style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            [ Beyond the Bottle ]
          </motion.p>
          <motion.h2
            className="font-display italic text-cream leading-[1.06] max-w-[820px]"
            style={{
              fontSize: "clamp(34px, 5vw, 72px)",
              fontWeight: 400,
            }}
            variants={{
              hidden: { opacity: 0, y: 32 },
              show: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            Stories from the <span className="text-[#C8A96E]">estate</span>.
          </motion.h2>
          <motion.div
            className="mt-8 md:mt-10"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <a href={`${basePath}/beyond-the-bottle/`} className="btn-cta">
              All Stories beyond the Bottle
            </a>
          </motion.div>
        </motion.div>

        {/* Horizontal-scroll row. Native scrollbar hidden; we render a
            custom always-visible thumb (.rv-row-cbar) below. No
            scroll-snap so wheel-driven scrollLeft updates don't
            stutter. */}
        <div
          ref={scrollerRef}
          className="overflow-x-auto overflow-y-hidden row-scroll select-none"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <ul
            className="flex gap-4 md:gap-6 px-6 md:px-16"
            style={{ paddingRight: "max(1.5rem, 6vw)" }}
          >
            {categories.map((cat, i) => {
              const count = countByCategory[cat.slug] || 0;
              return (
                <motion.li
                  key={cat.slug}
                  className="flex-shrink-0 w-[78vw] sm:w-[44vw] md:w-[320px] lg:w-[340px]"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={`${basePath}/beyond-the-bottle/#${cat.slug}`}
                    className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]/40 rounded-sm"
                  >
                    {/* Image stage - aspect 16:15 (25% shorter than the
                        previous 4:5 portrait) */}
                    <div className="relative aspect-[16/15] overflow-hidden mb-4 bg-[#0a0a0a] rounded-sm">
                      {cat.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${basePath}${cat.image}`}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/15 font-display italic text-[20px]">
                          Ridgeview
                        </div>
                      )}
                      {/* Bottom-up gradient for label readability */}
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                      />
                      {/* Gold hairline on hover */}
                      <div
                        aria-hidden
                        className="absolute inset-x-5 bottom-5 h-px bg-[#C8A96E]/0 group-hover:bg-[#C8A96E]/60 transition-colors duration-500"
                      />

                      {/* Label stack - overlaid in the bottom area */}
                      <div className="absolute inset-x-0 bottom-0 px-5 md:px-6 pb-5 md:pb-6">
                        <p
                          className="font-body text-[#C8A96E]/80 group-hover:text-[#C8A96E] uppercase tracking-[0.24em] mb-2 transition-colors duration-400"
                          style={{ fontSize: "10px" }}
                        >
                          [ {count} {count === 1 ? "story" : "stories"} ]
                        </p>
                        <h3
                          className="font-display italic text-cream group-hover:text-white leading-[1.05] transition-colors duration-400"
                          style={{
                            fontSize: "clamp(24px, 2.2vw, 32px)",
                            fontWeight: 400,
                          }}
                        >
                          {cat.label}
                        </h3>
                      </div>
                    </div>

                    {/* Blurb - sits under the image, not over */}
                    <p
                      className="font-body text-white/55 group-hover:text-white/75 leading-relaxed transition-colors duration-400"
                      style={{
                        fontSize: "clamp(13px, 1.1vw, 14px)",
                        fontWeight: 300,
                      }}
                    >
                      {cat.blurb}
                    </p>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Custom always-visible scrollbar. Lives below the row,
            inside the same horizontal-padding container so it lines up
            with the card stack. */}
        <div className="px-6 md:px-16 mt-6 md:mt-8">
          <div ref={cbarRef} className="rv-row-cbar">
            <div ref={cthumbRef} className="rv-row-cbar-thumb" />
          </div>
        </div>

      </div>
    </section>
  );
}
