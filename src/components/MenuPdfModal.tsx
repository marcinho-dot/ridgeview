"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";

/**
 * MenuPdfModal — overlay PDF viewer with a Download button.
 *
 * Lets restaurant guests scan a menu inline (no leaving the page +
 * no taking up a new browser tab), while still letting them grab the
 * PDF for offline / mobile reading. The modal contains:
 *
 *   - A title bar (menu name + Download + Close)
 *   - A full-bleed <iframe> with the PDF (browser-native PDF viewer)
 *   - A backdrop that closes the modal on click
 *
 * Browser support: <iframe src=".pdf"> renders inline in Chrome /
 * Edge / Firefox / Safari desktop. Mobile Safari and Chrome Android
 * have inconsistent inline PDF support — they often show a download
 * prompt instead. The "Download" button is the universal fallback;
 * the iframe is the desktop optimisation.
 *
 * The modal is controlled by the parent — set `pdf` to a path to
 * open, set to null to close.
 */

export interface MenuPdf {
  label: string;
  /** Path under /public, e.g. "/docs/restaurant/food-menu.pdf". */
  href: string;
}

interface Props {
  pdf: MenuPdf | null;
  onClose: () => void;
}

export function MenuPdfModal({ pdf, onClose }: Props) {
  // Close on Escape, lock body scroll while open. Both side effects
  // gated on `pdf` so the modal only steals keyboard / scroll when
  // it's actually visible.
  useEffect(() => {
    if (!pdf) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [pdf, onClose]);

  return (
    <AnimatePresence>
      {pdf && (
        <motion.div
          key="menu-pdf-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
        >
          {/* Backdrop — click to close */}
          <button
            type="button"
            aria-label="Close menu preview"
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-default"
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[min(96vw,1100px)] h-[min(94vh,900px)] bg-[#0a0a0a] border border-white/[0.10] rounded-md overflow-hidden flex flex-col shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* Header — title + Download + Close */}
            <div className="flex items-center gap-3 px-5 md:px-6 py-3.5 md:py-4 border-b border-white/[0.08] bg-[#080808]">
              <p
                className="flex-1 min-w-0 font-display italic text-cream truncate"
                style={{ fontSize: "clamp(16px, 1.4vw, 20px)", fontWeight: 400 }}
              >
                {pdf.label}
              </p>

              <a
                href={`${basePath}${pdf.href}`}
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-[#C8A96E]/60 hover:border-[#C8A96E] bg-[rgba(245,240,232,0.04)] hover:bg-[rgba(200,169,110,0.10)] text-cream font-body uppercase tracking-[0.2em] transition-all duration-300"
                style={{ fontSize: "10px", fontWeight: 400 }}
              >
                <DownloadIcon />
                <span className="hidden sm:inline">Download</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close preview"
                className="inline-flex items-center justify-center w-9 h-9 rounded-sm border border-white/15 hover:border-white/40 text-white/65 hover:text-cream transition-colors duration-300"
              >
                <CloseIcon />
              </button>
            </div>

            {/* PDF viewer — full-bleed iframe. Browsers that don't
                support inline PDF (iOS Safari especially) will offer
                the Download button above; the iframe area falls back
                to a polite message via the noembed wording. */}
            <div className="flex-1 bg-[#1a1a1a]">
              <iframe
                src={`${basePath}${pdf.href}#toolbar=1&navpanes=0&view=FitH`}
                title={pdf.label}
                className="w-full h-full border-0"
              >
                <p className="p-6 text-white/65 text-center">
                  Your browser can&rsquo;t preview PDFs inline.{" "}
                  <a
                    href={`${basePath}${pdf.href}`}
                    download
                    className="text-[#C8A96E] underline"
                  >
                    Download {pdf.label} instead.
                  </a>
                </p>
              </iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DownloadIcon() {
  return (
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
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
