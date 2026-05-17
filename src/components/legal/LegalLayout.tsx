"use client";

/**
 * LegalLayout - shared shell for all /legal/* pages.
 *
 * Provides consistent typography, page header, and a small sidebar /
 * cross-link footer so the suite of legal pages reads as one document
 * surface. Each individual page (Terms, Privacy, Cookies, etc.) renders
 * its own copy inside the <article> slot.
 *
 * Last-updated dates live on each page rather than here - different
 * pages can be revised independently.
 */

import { ReactNode } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface LegalLayoutProps {
  /** Section kicker, e.g. "Legal · Cookies". */
  kicker: string;
  /** Page H1. */
  title: string;
  /** ISO date string, e.g. "2026-05-16". Rendered as "Last updated 16 May 2026". */
  lastUpdated: string;
  /** Markdown-like body (children). */
  children: ReactNode;
}

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/cookies", label: "Cookie Policy" },
  { href: "/legal/delivery", label: "Delivery" },
  { href: "/legal/returns", label: "Returns & Cancellation" },
  { href: "/legal/company", label: "Company Information" },
];

export function LegalLayout({
  kicker,
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="bg-[#010101] min-h-screen pt-28 md:pt-32 pb-20 md:pb-32">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          {/* Header */}
          <header className="mb-12 md:mb-16 pb-8 border-b border-white/[0.06]">
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-3"
              style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
            >
              [ {kicker} ]
            </p>
            <h1
              className="font-display italic text-cream leading-[1.05]"
              style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
            >
              {title}
            </h1>
            <p
              className="mt-4 font-body font-light text-white/45"
              style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
            >
              Last updated {formatDate(lastUpdated)} · Ridgeview Wine
              Estate · England
            </p>
          </header>

          {/* Body + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-20">
            <article className="legal-article">{children}</article>

            <aside className="lg:sticky lg:top-32 lg:self-start">
              <p
                className="font-body font-light text-white/55 uppercase tracking-[0.22em] mb-4"
                style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
              >
                Legal
              </p>
              <ul className="space-y-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-white/65 hover:text-[#C8A96E] transition-colors"
                      style={{ fontSize: "clamp(12px, 1.05vw, 14px)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </main>
      <Footer />

      {/*
        Scoped typography for legal articles. Tailwind v4 + this site's
        editorial vocabulary - Cormorant for headings, Raleway for body,
        gold rule under H2, max-width 70ch for readable line-length.
      */}
      <style jsx global>{`
        .legal-article {
          font-family: var(--font-body, "Raleway", system-ui, sans-serif);
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
          font-size: clamp(14px, 1.15vw, 16px);
          max-width: 70ch;
        }
        .legal-article h2 {
          font-family: var(--font-display, "Cormorant Garamond", serif);
          font-style: italic;
          color: #f5f0e8;
          margin-top: 3.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(200, 169, 110, 0.2);
          font-size: clamp(24px, 2.4vw, 34px);
          line-height: 1.15;
        }
        .legal-article h2:first-child {
          margin-top: 0;
        }
        .legal-article h3 {
          font-family: var(--font-display, "Cormorant Garamond", serif);
          font-style: italic;
          color: #f5f0e8;
          margin-top: 2.25rem;
          margin-bottom: 0.5rem;
          font-size: clamp(18px, 1.7vw, 22px);
          line-height: 1.2;
        }
        .legal-article p {
          margin-bottom: 1.1rem;
        }
        .legal-article a {
          color: #c8a96e;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.25s ease;
        }
        .legal-article a:hover {
          color: #f5f0e8;
        }
        .legal-article ul,
        .legal-article ol {
          margin: 0 0 1.1rem 1.5rem;
        }
        .legal-article ul {
          list-style: disc;
        }
        .legal-article ol {
          list-style: decimal;
        }
        .legal-article li {
          margin-bottom: 0.4rem;
        }
        .legal-article strong {
          color: #f5f0e8;
          font-weight: 500;
        }
        .legal-article .legal-callout {
          margin: 1.5rem 0;
          padding: 1.25rem 1.5rem;
          border: 1px solid rgba(200, 169, 110, 0.25);
          background: rgba(200, 169, 110, 0.04);
          border-radius: 4px;
        }
        .legal-article .legal-callout p:last-child {
          margin-bottom: 0;
        }
        .legal-article .legal-meta {
          font-size: 0.85em;
          color: rgba(255, 255, 255, 0.45);
        }
        .legal-article address {
          font-style: normal;
          margin: 0.5rem 0 1.5rem;
        }
      `}</style>
    </>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
