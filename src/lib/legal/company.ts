/**
 * Company.ts — single source of truth for Ridgeview's legal entity data.
 *
 * All legal pages (Terms, Privacy, Cookies, Delivery, Returns, Company
 * Info), the checkout footer, and any other place that needs to surface
 * registered company / contact details pull from this file.
 *
 * Facts verified from ridgeview.co.uk's live Privacy Policy + footer
 * (2026-05-16). If anything below changes (new VAT registration, new
 * trading address, etc.), update here only — every consumer reads from
 * this single object.
 *
 * Fields still pending (TODO when Aufsichtsrat provides the data):
 *   - VAT registration number (`vatNumber`)
 *   - AWRS (Alcohol Wholesaler Registration Scheme) number (`awrsNumber`)
 *   - ICO registration number (`icoNumber`) — UK GDPR data-controller
 *     registration with the Information Commissioner's Office
 *   - Insurance / EORI numbers if applicable
 */

export const COMPANY = {
  /** Registered legal name with Companies House. */
  legalName: "QBRidge Limited",
  /** Public trading name shown on the website + invoices. */
  tradingName: "Ridgeview Wine Estate",
  /** Companies House registration number (England & Wales). */
  companyNumber: "16702308",
  /** Country of incorporation. */
  jurisdiction: "England and Wales",

  /** VAT registration number — TODO: fill in once Aufsichtsrat confirms. */
  vatNumber: null as string | null,
  /** AWRS (Alcohol Wholesaler Registration Scheme) — required for the
   *  wholesale of alcohol in the UK. TODO: fill in. */
  awrsNumber: null as string | null,
  /** ICO data-protection registration. TODO: fill in. */
  icoNumber: null as string | null,

  /** Registered office + trading address (same site). */
  address: {
    line1: "Fragbarrow Lane",
    line2: "Ditchling Common",
    city: "Hassocks",
    region: "East Sussex",
    postcode: "BN6 8TP",
    country: "United Kingdom",
  },

  /** Public contact channels. */
  contact: {
    email: "info@ridgeview.co.uk",
    phone: "+44 (0)1444 242040",
    /** UK regulator complaints route for unresolved consumer disputes
     *  (ADR — Alternative Dispute Resolution). */
    adrBody: "Wine and Spirit Trade Association (WSTA)",
  },

  /** External resources we reference in legal copy. */
  external: {
    drinkawareUrl: "https://www.drinkaware.co.uk",
    icoUrl: "https://ico.org.uk",
    ukGovOdrUrl: "https://www.gov.uk/consumer-advice-helpline",
  },
} as const;

/** Pre-formatted address block for inline display. */
export function formatAddress(): string {
  const a = COMPANY.address;
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.region} ${a.postcode}, ${a.country}`;
}

/** Multi-line address (for blocks where line-breaks are expected). */
export function formatAddressLines(): string[] {
  const a = COMPANY.address;
  return [
    a.line1,
    a.line2,
    `${a.city}, ${a.region}`,
    a.postcode,
    a.country,
  ];
}
