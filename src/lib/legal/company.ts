/**
 * Company.ts - single source of truth for Ridgeview's legal entity data.
 *
 * All legal pages (Terms, Privacy, Cookies, Delivery, Returns, Company
 * Info) and the checkout footer pull registered company / contact
 * details from this single object.
 *
 * Scope follows the UK statutory display requirements (Companies Act
 * 2006 s.82 + Companies (Trading Disclosures) Regulations 2008): we
 * surface the registered legal name, registered number, country of
 * incorporation and registered office. Tax-side identifiers (VAT,
 * AWRS) live on invoices / B2B documentation rather than on the
 * public website - same approach the existing ridgeview.co.uk site
 * and every comparable UK wine retailer take. If the board ever
 * decides to expose those numbers publicly, they can be added back
 * as additional fields here.
 *
 * Facts verified against ridgeview.co.uk's live footer + Privacy
 * Policy on 2026-05-16.
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
     *  (ADR - Alternative Dispute Resolution). */
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
