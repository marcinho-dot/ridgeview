"use client";

import { Fragment, ReactNode, useEffect, useRef, useState } from "react";

/**
 * Scroll-Reset Wrapper.
 *
 * Verhalten (übernommen von der Micronutrition-Logik):
 *   - Beobachtet die Scroll-Position.
 *   - Sobald der User von "nicht ganz oben" auf scrollY < 5 wechselt
 *     (Flanken-getriggert) UND das umschlossene Element unterhalb des
 *     Viewports liegt (rect.top + 4 >= innerHeight — 4px Sub-Pixel-
 *     Puffer für Sections die exakt am Fold sitzen, z.B. direkt unter
 *     einem h-svh Hero), wird der interne `key` inkrementiert. Das
 *     führt zu einem Re-Mount der Children — und damit triggern
 *     Framer-Motion-Animationen mit `whileInView once:true` beim
 *     nächsten Runterscrollen frisch.
 *
 * Wichtig:
 *   - Die Animationen selbst werden NICHT verändert. Nur das Reset-Trigger-
 *     Verhalten kommt hinzu.
 *   - Sichtbare Elemente bleiben sichtbar - kein Flackern mid-page.
 *   - Wrapper nutzt display:contents, damit kein zusätzlicher Layout-Knoten
 *     entsteht (CSS-Selektoren auf direkte Eltern bleiben intakt).
 *   - Kein State-Loop: Inkrement passiert nur an der Flanke (5+ → <5).
 */
export function ScrollReset({ children }: { children: ReactNode }) {
  const [resetKey, setResetKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let wasTop = window.scrollY < 5;

    const onScroll = () => {
      const isTop = window.scrollY < 5;
      if (isTop && !wasTop) {
        // Gerade an den Seitenanfang gescrollt — prüfen, ob unsere
        // Section unterhalb des Viewports liegt; nur dann resetten.
        //
        // Threshold-Toleranz (2026-05-22): die ursprüngliche strikte
        // `r.top > innerHeight` Bedingung scheiterte für Sections die
        // direkt am Fold sitzen (z.B. CategoryCardRow direkt unter
        // einem `h-svh` Hero → r.top === innerHeight, strikte `>`
        // ist false). `>=` mit kleinem Sub-Pixel-Puffer löst das,
        // ohne Resets auf tatsächlich teilsichtbaren Sections zu
        // riskieren (die wären mindestens 4+ px überm Fold).
        const r = ref.current?.getBoundingClientRect();
        if (r && r.top + 4 >= window.innerHeight) {
          setResetKey((k) => k + 1);
        }
      }
      wasTop = isTop;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Wrapper-div without display:contents - display:contents would make the
  // element layout-transparent and break getBoundingClientRect(), causing the
  // r.top > innerHeight check to always fail. A plain div is harmless because
  // children are <section> elements that span full width naturally.
  return (
    <div ref={ref}>
      <Fragment key={resetKey}>{children}</Fragment>
    </div>
  );
}
