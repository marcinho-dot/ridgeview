import { basePath } from "@/lib/basePath";
import { SubstackForm } from "@/components/SubstackForm";

export function Footer() {
  // Every same-page anchor in the footer needs to resolve to the homepage,
  // not to whatever route the footer is rendered on (SKU pages, booking, etc.).
  // Prefixing with `${basePath}/` makes the link absolute to the homepage on
  // every route — the anchor scroll fires once that route loads.
  const home = `${basePath}/`;
  return (
    <footer id="footer" className="bg-[#010101] border-t border-white/10">
      {/* ── Substack strip — newsletter signup ──────
          Rewritten 2026-05-17: Ridgeview now publishes exclusively
          on Substack (no in-house newsletter), so the copy and the
          form both speak Substack. The form uses the shared
          <SubstackForm /> component (same as the homepage ImageReveal
          + /beyond-the-bottle hero) for visual consistency.
          Two-column on desktop (intro copy left, form right), stacks
          on mobile. */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 pt-14 md:pt-16 pb-10 md:pb-14 border-b border-white/[0.06]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
          <div>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-3"
              style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}
            >
              [ Our Substack ]
            </p>
            <h3
              className="font-display italic text-cream leading-[1.1] mb-3"
              style={{ fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 400 }}
            >
              Field notes from the estate.
            </h3>
            <p
              className="font-body text-white/55"
              style={{ fontSize: "13px", fontWeight: 300, maxWidth: "480px" }}
            >
              Subscribe to our Substack newsletter for harvest dispatches,
              cellar updates and member-only releases &mdash; direct from
              Ridgeview. Unsubscribe anytime.
            </p>
          </div>
          <div className="w-full" style={{ maxWidth: "460px" }}>
            <SubstackForm />
          </div>
        </div>
      </div>

      {/* Responsive grid: 2 cols mobile → 3 cols tablet → 6 cols desktop.
          Content constrained to the same 1600px container the BtB row /
          Heritage / OurView sections use, so the footer aligns with the
          homepage rhythm. */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 pt-10 md:pt-14 pb-8 md:pb-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 md:gap-8">
        {/* ABOUT */}
        <div>
          <h4 className="font-body text-cream text-xs uppercase tracking-[0.2em] mb-5" style={{ fontWeight: 500 }}>
            ABOUT
          </h4>
          <ul className="space-y-3">
            <li>
              <a href={`${home}#heritage`} className="link-underline font-body text-cream text-sm hover:text-white/60 transition-colors" style={{ fontWeight: 500 }}>
                Our Story
              </a>
            </li>
            {["Sustainable & Ethical Practices", "Career Vacancies", "Contact Us"].map((item) => (
              <li key={item}>
                <a href="#" className="link-underline font-body text-white/55 text-sm hover:text-[#C8A96E]/80 transition-colors duration-300" style={{ fontWeight: 300 }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ONLINE SHOP */}
        <div>
          <h4 className="font-body text-cream text-xs uppercase tracking-[0.2em] mb-5" style={{ fontWeight: 500 }}>
            ONLINE SHOP
          </h4>
          <ul className="space-y-3">
            {[
              // Cases of Wine, Gift Sets & Collections, Click & Collect
              // were removed 2026-05-16:
              //   - Cases are SKU format variants (Magnum, Case of 6) on
              //     each /wine/<slug>/ page — no separate landing needed.
              //   - Gift Sets pointed to /wines (redundant); no dedicated
              //     /gifts route exists. The engraved-bottle-gift SKU is
              //     still discoverable via the main catalogue.
              //   - Click & Collect was advertised but never wired into
              //     the checkout flow (Royal Mail shipping only). Listing
              //     it was misleading.
              { label: "English Sparkling Wine", href: `${home}wines` },
              { label: "OurView Wine Club", href: `${home}wine-club/` },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} className="link-underline font-body text-white/55 text-sm hover:text-[#C8A96E]/80 transition-colors duration-300" style={{ fontWeight: 300 }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* VISIT */}
        <div>
          <h4 className="font-body text-cream text-xs uppercase tracking-[0.2em] mb-5" style={{ fontWeight: 500 }}>
            VISIT
          </h4>
          <ul className="space-y-3">
            {[
              { label: "Vineyard Tours & Wine Tastings", href: `${home}vineyard-booking` },
              { label: "Wine Bar & Shop", href: `${home}vineyard-booking` },
              { label: "How to get to Ridgeview", href: `${home}#footer` },
              { label: "Nearby Accommodation", href: `${home}#footer` },
              { label: "Opening Times", href: `${home}vineyard-booking` },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} className="link-underline font-body text-white/55 text-sm hover:text-[#C8A96E]/80 transition-colors duration-300" style={{ fontWeight: 300 }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* BUYING FROM US */}
        <div>
          <h4 className="font-body text-cream text-xs uppercase tracking-[0.2em] mb-5" style={{ fontWeight: 500 }}>
            BUYING FROM US
          </h4>
          <ul className="space-y-3">
            {[
              "Delivery",
              "Returns",
              "Legal",
              "Privacy Policy",
              "Help & FAQs",
              "Corporate Services",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="link-underline font-body text-white/55 text-sm hover:text-[#C8A96E]/80 transition-colors duration-300" style={{ fontWeight: 300 }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* NEWS & MEDIA */}
        <div>
          <h4 className="font-body text-cream text-xs uppercase tracking-[0.2em] mb-5" style={{ fontWeight: 500 }}>
            NEWS &amp; MEDIA
          </h4>
          <ul className="space-y-3">
            {["News", "Press Releases", "Drink Responsibly"].map((item) => (
              <li key={item}>
                <a href="#" className="link-underline font-body text-white/55 text-sm hover:text-[#C8A96E]/80 transition-colors duration-300" style={{ fontWeight: 300 }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT US */}
        <div>
          <h4 className="font-body text-cream text-xs uppercase tracking-[0.2em] mb-5" style={{ fontWeight: 500 }}>
            CONTACT US
          </h4>
          <address
            className="font-body text-white/55 text-sm not-italic leading-relaxed mb-4"
            style={{ fontWeight: 300 }}
          >
            Ridgeview Wine Estate
            <br />
            Fragbarrow Lane
            <br />
            Ditchling Common
            <br />
            East Sussex
            <br />
            BN6 8TP
          </address>
          <a
            href="tel:01444242040"
            className="link-underline font-body text-white/55 text-sm hover:text-white/80 transition-colors block mb-1"
            style={{ fontWeight: 300 }}
          >
            01444 242040
          </a>
          <a
            href="mailto:info@ridgeview.co.uk"
            className="link-underline font-body text-white/55 text-sm hover:text-white/80 transition-colors block mb-6"
            style={{ fontWeight: 300 }}
          >
            info@ridgeview.co.uk
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/ridgeviewwine/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/55 social-icon">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/RidgeviewWineEstate/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/55 social-icon">
              <FacebookIcon />
            </a>
            <a href="https://www.linkedin.com/company/ridgeview-wine-estate/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/55 social-icon">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar — same 1600px constraint as the top grid */}
      <div className="border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-4 md:py-5 flex flex-col md:flex-row items-center gap-3 md:gap-0 md:justify-between">
        <p className="font-body text-white/40 text-xs" style={{ fontWeight: 300 }}>
          © Ridgeview 2026
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {[
            { href: "/legal/terms", label: "Terms" },
            { href: "/legal/privacy", label: "Privacy" },
            { href: "/legal/cookies", label: "Cookies" },
            { href: "/legal/delivery", label: "Delivery" },
            { href: "/legal/returns", label: "Returns" },
            { href: "/legal/company", label: "Company Info" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="link-underline font-body text-white/40 text-xs hover:text-white/60 transition-colors"
              style={{ fontWeight: 300 }}
            >
              {label}
            </a>
          ))}
        </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
