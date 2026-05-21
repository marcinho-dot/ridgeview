import { basePath } from "@/lib/basePath";
import { SubstackForm } from "@/components/SubstackForm";

interface FooterProps {
  /**
   * Whether to render the aerial-drone background image inside the
   * footer. Defaults to true (used on /vineyard-booking, SKU pages,
   * etc.). The homepage opts out via withBackground={false} (per
   * user direction 2026-05-18) so the homepage's own cinematic
   * sections aren't competing with another full-bleed image at the
   * very bottom of the page.
   */
  withBackground?: boolean;
}

export function Footer({ withBackground = true }: FooterProps = {}) {
  // Every same-page anchor in the footer needs to resolve to the homepage,
  // not to whatever route the footer is rendered on (SKU pages, booking, etc.).
  // Prefixing with `${basePath}/` makes the link absolute to the homepage on
  // every route - the anchor scroll fires once that route loads.
  const home = `${basePath}/`;
  return (
    <footer id="footer" className="relative bg-[#010101] border-t border-white/10 overflow-hidden isolate">
      {withBackground && (
        /* ── Background aerial photo ──────
            Drone shot (F-ALP-DJI_0326 → footer-aerial.jpg) anchored
            to bottom-left of the footer so the building / chalk-soil
            corner remains visible while the rest of the frame fades
            into the surrounding overlays. Added 2026-05-18; gated
            behind withBackground so /page.tsx can opt out. */
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/images/footer-aerial.jpg`}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "left bottom" }}
          />
          {/* Base darken — pulls the image back so the text/links
              remain the primary read. */}
          <div className="absolute inset-0 bg-black/85" />
          {/* Top blend gradient — fades the image into the section
              above so the Substack strip's edge isn't a hard cut. */}
          <div
            className="absolute inset-x-0 top-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(1,1,1,1) 0%, rgba(1,1,1,0) 100%)" }}
          />
          {/* Right-side fade — pushes the image's right half toward
              solid black so the right-aligned legal/social columns
              sit on a cleaner plate. Keeps the bottom-LEFT corner of
              the image (per user direction) prominent. */}
          <div
            className="absolute inset-y-0 right-0 w-[55%] pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(1,1,1,0.95) 0%, rgba(1,1,1,0) 100%)" }}
          />
        </div>
      )}

      {/* ── Substack strip - newsletter signup ──────
          Rewritten 2026-05-17: Ridgeview now publishes exclusively
          on Substack (no in-house newsletter), so the copy and the
          form both speak Substack. The form uses the shared
          <SubstackForm /> component (same as the homepage ImageReveal
          + /beyond-the-bottle hero) for visual consistency.
          Layout restructured 2026-05-18 from a 2-column grid (text
          left / form right) to a single left-aligned column — kicker,
          headline, description, form all stacked vertically so the
          form no longer floats alone on the right side of the strip. */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 pt-14 md:pt-16 pb-10 md:pb-14 border-b border-white/[0.06]">
        <div className="max-w-[560px]">
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
            className="font-body text-white/55 mb-6 md:mb-7"
            style={{ fontSize: "13px", fontWeight: 300, maxWidth: "480px" }}
          >
            Subscribe to our Substack newsletter for harvest dispatches,
            cellar updates and member-only releases - direct from
            Ridgeview. Unsubscribe anytime.
          </p>
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
              <a href="/heritage" className="link-underline font-body text-cream text-sm hover:text-white/60 transition-colors" style={{ fontWeight: 500 }}>
                Our Story
              </a>
            </li>
            {[
              { label: "Sustainable & Ethical Practices", href: "/sustainability" },
              { label: "Career Vacancies", href: "/careers" },
              { label: "Contact Us", href: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} className="link-underline font-body text-white/55 text-sm hover:text-[#C8A96E]/80 transition-colors duration-300" style={{ fontWeight: 300 }}>
                  {item.label}
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
              //     each /wine/<slug>/ page - no separate landing needed.
              //   - Gift Sets pointed to /wines (redundant); no dedicated
              //     /gifts route exists. The engraved-bottle-gift SKU is
              //     still discoverable via the main catalogue.
              //   - Click & Collect was advertised but never wired into
              //     the checkout flow (Royal Mail shipping only). Listing
              //     it was misleading.
              { label: "English Sparkling Wine", href: `${home}wines` },
              { label: "Exclusive Range", href: `${home}wines/exclusive-range` },
              { label: "Gift Sets", href: `${home}gift-sets` },
              { label: "Gift Vouchers", href: `${home}gift-vouchers` },
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
              { label: "The Rows & Vine Restaurant", href: `${home}restaurant` },
              { label: "Wine Bar & Shop", href: `${home}restaurant#reserve` },
              { label: "Private Events & Venue Hire", href: `${home}private-events` },
              { label: "How to get to Ridgeview", href: `${home}directions` },
              { label: "Nearby Accommodation", href: `${home}vineyard-booking/#nearby-accommodation` },
              { label: "Opening Times", href: `${home}restaurant/#hours` },
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
              { label: "Delivery", href: "/legal/delivery" },
              { label: "Returns", href: "/legal/returns" },
              { label: "Legal", href: "/legal/terms" },
              { label: "Privacy Policy", href: "/legal/privacy" },
              { label: "Help & FAQs", href: "/help" },
              { label: "Wine Technical Sheets", href: "/wine-technical-sheets" },
              { label: "Corporate Services", href: "/corporate-services" },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} className="link-underline font-body text-white/55 text-sm hover:text-[#C8A96E]/80 transition-colors duration-300" style={{ fontWeight: 300 }}>
                  {item.label}
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
            {[
              { label: "News", href: "/beyond-the-bottle" },
              { label: "Press Releases", href: "/press" },
              { label: "Drink Responsibly", href: "https://www.drinkaware.co.uk/", external: true },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="link-underline font-body text-white/55 text-sm hover:text-[#C8A96E]/80 transition-colors duration-300"
                  style={{ fontWeight: 300 }}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {item.label}
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

      {/* Credentials strip — SWGB founder-member badge above the legal
          links. Single editorial pill, gold hairline border, ridgeview
          tone. Builds trust before the legal small-print row that
          follows. */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-7 md:py-8 flex flex-col md:flex-row items-center justify-center md:justify-start gap-5 md:gap-8">
          <p
            className="font-display italic text-white/40 tracking-widest text-center md:text-left shrink-0"
            style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 400 }}
          >
            [ Credentials ]
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {/* SWGB Founder Member — uses local badge asset */}
            <a
              href="/sustainability"
              className="group inline-flex items-center gap-2.5 border border-[#C8A96E]/30 hover:border-[#C8A96E]/70 hover:bg-[#C8A96E]/[0.06] rounded-sm px-4 py-2.5 transition-all duration-400"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/awards/sustainable-wines-gb-founder-member.png"
                alt="Sustainable Wines of Great Britain Founder Member"
                className="h-9 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-400"
                loading="lazy"
              />
              <span className="flex flex-col leading-tight">
                <span
                  className="font-body text-cream/85 group-hover:text-cream uppercase tracking-[0.22em] transition-colors"
                  style={{ fontSize: "10px", fontWeight: 500 }}
                >
                  SWGB Founder
                </span>
                <span
                  className="font-body text-white/40 group-hover:text-white/60 tracking-[0.15em] transition-colors mt-0.5"
                  style={{ fontSize: "9px", fontWeight: 300 }}
                >
                  Gold Recertified
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar - same 1600px constraint as the top grid */}
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
            { href: "/legal/wine-club-terms", label: "OurView T&Cs" },
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
