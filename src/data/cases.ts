/**
 * Cases of Wine — flat data list for the /wines/cases landing page.
 *
 * Source of truth is the `_VARIANTS` array on each SKU page (where
 * the Case-of-6 variant lives as `variantId: "case6"`). This file
 * mirrors those entries in a denormalised, listing-friendly shape so
 * the /wines/cases page can render cards without importing 11 SKU
 * pages.
 *
 * Architecture note: we deliberately do NOT create separate
 * /wine/<slug>-case routes. Cases live as variants on the parent
 * wine page; clicking a card here links to /wine/<slug>#case6
 * which the SKU page reads on mount to pre-select the Case variant.
 */
export interface CaseEntry {
  /** Slug of the parent wine - used to build /wine/<slug>#case6. */
  slug: string;
  /** Display name, e.g. "Bloomsbury NV". */
  name: string;
  /** Vintage tag, e.g. "NV", "2020". */
  vintage: string;
  /** Path to the case-shot PNG (under /public). */
  image: string;
  /** Tasting-note pills - same 3 keywords used on the WineGrid card. */
  tastingNotes: string[];
  /** Case price in GBP (numeric). */
  casePrice: number;
  /** Original price (6 × single-bottle) before the case discount. */
  originalPrice: number;
  /** Single-bottle price for the "vs. £X per bottle" inline note. */
  bottlePrice: number;
  /** Marketing tag for the card (max 30 chars). */
  badge: string;
  /** Out-of-stock flag - card renders as disabled with overlay. */
  outOfStock?: boolean;
}

export const cases: CaseEntry[] = [
  {
    slug: "bloomsbury",
    name: "Bloomsbury NV",
    vintage: "NV",
    image: "/products/bloomsbury-case.png",
    tastingNotes: ["Lemon Zest", "Green Apple", "Toasted Almond"],
    casePrice: 183.6,
    originalPrice: 204,
    bottlePrice: 34,
    badge: "Save 10%",
  },
  {
    slug: "cavendish",
    name: "Cavendish NV",
    vintage: "NV",
    image: "/products/cavendish-case.png",
    tastingNotes: ["Red Apple", "Brioche", "Wild Strawberry"],
    casePrice: 194.4,
    originalPrice: 216,
    bottlePrice: 36,
    badge: "Save 10%",
  },
  {
    slug: "fitzrovia",
    name: "Fitzrovia Rosé NV",
    vintage: "NV",
    image: "/products/fitzrovia-case.png",
    tastingNotes: ["Pink Grapefruit", "Wild Strawberry", "Soft Stone Fruit"],
    casePrice: 216,
    originalPrice: 240,
    bottlePrice: 40,
    badge: "Save 10%",
  },
  {
    slug: "blanc-de-noirs",
    name: "Blanc de Noirs 2016",
    vintage: "2016",
    image: "/products/blanc-de-noirs-case.png",
    tastingNotes: ["Stone Fruit", "Honeycomb", "Long Lees Bread"],
    casePrice: 324,
    originalPrice: 360,
    bottlePrice: 60,
    badge: "Save 10%",
  },
  {
    slug: "rose-de-noirs",
    name: "Rosé de Noirs 2020",
    vintage: "2020",
    image: "/products/rose-de-noirs-case.png",
    tastingNotes: ["Cranberry", "Spiced Plum", "Forest Floor"],
    casePrice: 351,
    originalPrice: 390,
    bottlePrice: 65,
    badge: "Save 10%",
  },
  {
    slug: "sparkling-red-reserve",
    name: "Sparkling Red Reserve",
    vintage: "Multi-Vintage Blend",
    image: "/products/sparkling-red-reserve-case.png",
    tastingNotes: ["Dark Cherry", "Black Pepper", "Cocoa Nib"],
    casePrice: 297,
    originalPrice: 330,
    bottlePrice: 55,
    badge: "Save 10%",
  },
  {
    slug: "blanc-de-blancs",
    name: "Blanc de Blancs 2020",
    vintage: "2020",
    image: "/products/blanc-de-blancs-case.png",
    tastingNotes: ["Honeyed Lemon", "Almond Pastry", "White Flower"],
    casePrice: 405,
    originalPrice: 450,
    bottlePrice: 75,
    badge: "Best Value · Save 10%",
  },
  {
    slug: "oak-reserve",
    name: "Oak Reserve",
    vintage: "Late-Disgorged",
    image: "/products/oak-reserve.png", // no dedicated case shot — falls back to 75cl bottle
    tastingNotes: ["Toasted Oak", "Hazelnut", "Cream"],
    casePrice: 459,
    originalPrice: 510,
    bottlePrice: 85,
    badge: "Save 10%",
    outOfStock: true,
  },
];
