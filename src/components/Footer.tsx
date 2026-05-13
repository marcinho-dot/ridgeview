import { basePath } from "@/lib/basePath";

// Substack publication slug — swap to the real Ridgeview Substack
// publication once it's set up. The newsletter form below POSTs to
// `https://<slug>.substack.com/api/v1/free?nojs=true` which is the
// public no-JS subscribe endpoint.
const SUBSTACK_SLUG = "ridgeview";

export function Footer() {
  // Every same-page anchor in the footer needs to resolve to the homepage,
  // not to whatever route the footer is rendered on (SKU pages, booking, etc.).
  // Prefixing with `${basePath}/` makes the link absolute to the homepage on
  // every route — the anchor scroll fires once that route loads.
  const home = `${basePath}/`;
  return (
    <footer id="footer" className="bg-[#010101] border-t border-white/10">
      {/* ── Stay-in-the-loop strip — Substack newsletter signup ──────
          Sits above the link grid so it reads as a deliberate
          editorial gesture rather than buried in a column. Two-column
          on desktop (intro copy left, form right), stacks on mobile. */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 pt-14 md:pt-16 pb-10 md:pb-14 border-b border-white/[0.06]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
          <div>
            <p
              className="font-display italic text-[#C8A96E] tracking-widest mb-3"
              style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}
            >
              [ Stay in the loop ]
            </p>
            <h3
              className="font-display italic text-cream leading-[1.1] mb-3"
              style={{ fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 400 }}
            >
              Cellar updates &amp; seasonal releases.
            </h3>
            <p
              className="font-body text-white/55"
              style={{ fontSize: "13px", fontWeight: 300, maxWidth: "480px" }}
            >
              Behind-the-vine notes, harvest dispatches and member
              experiences direct from the estate. Unsubscribe anytime.
            </p>
          </div>
          <form
            action={`https://${SUBSTACK_SLUG}.substack.com/api/v1/free?nojs=true`}
            method="post"
            target="_blank"
            className="flex items-center gap-2 border-b border-white/22 w-full"
            style={{ maxWidth: "460px" }}
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              aria-label="Email address for newsletter"
              required
              className="flex-1 bg-transparent font-body text-cream text-sm py-3 outline-none placeholder:text-white/30 focus:placeholder:text-white/50 transition-colors"
              style={{ fontWeight: 300 }}
            />
            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="group relative w-9 h-9 rounded-full border border-[#C8A96E]/55 hover:border-[#C8A96E] flex items-center justify-center transition-all duration-300 hover:bg-[#C8A96E]/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]/50"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#C8A96E] transition-transform duration-300 group-hover:translate-x-[2px]"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>
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
              { label: "English Sparkling Wine", href: `${home}#wine-collection` },
              { label: "Cases of Wine", href: `${home}#wine-collection` },
              { label: "Gift Sets & Collections", href: `${home}#wine-collection` },
              { label: "OurView Wine Club", href: `${home}wine-club/` },
              { label: "Click & Collect", href: `${home}#wine-collection` },
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
              { label: "Vineyard Tours & Wine Tastings", href: `${home}booking` },
              { label: "Wine Bar & Shop", href: `${home}booking` },
              { label: "How to get to Ridgeview", href: `${home}#footer` },
              { label: "Nearby Accommodation", href: `${home}#footer` },
              { label: "Opening Times", href: `${home}booking` },
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
        <div className="flex items-center gap-6">
          <a href="#" className="link-underline font-body text-white/40 text-xs hover:text-white/60 transition-colors" style={{ fontWeight: 300 }}>
            Privacy Policy
          </a>
          <a href="#" className="link-underline font-body text-white/40 text-xs hover:text-white/60 transition-colors" style={{ fontWeight: 300 }}>
            Sitemap
          </a>
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
