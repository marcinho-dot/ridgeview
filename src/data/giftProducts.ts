/**
 * Curated gift products (fixed bundles + accessories) rendered by the
 * shared <GiftProductPage>. Prices and contents are verbatim from the
 * legacy ridgeview.co.uk shop (fetched 2026-05-30) — no invented values.
 *
 * The configurable "The Ridgeview Gift Set" is NOT here — it has its own
 * page (/gift-sets/the-ridgeview-gift-set) because it needs a wine picker.
 */
export interface GiftProduct {
  slug: string;
  name: string;
  /** GBP, single fixed price (UK original). */
  price: number;
  kicker: string;
  subtitle: string;
  description: string;
  included: string[];
  image: string;
  /** "Duo" / "Trio" / "Accessory" — shown as the cart line "vintage" slot. */
  kind: string;
}

export const GIFT_PRODUCTS: Record<string, GiftProduct> = {
  "rose-duo": {
    slug: "rose-duo",
    name: "Rosé Duo",
    price: 105,
    kind: "Duo",
    kicker: "[ Duo · English Sparkling Rosé ]",
    subtitle: "Two expressions of English rosé, boxed together.",
    description:
      "An award-winning duo of world-class English sparkling rosé — our fresh, fruit-forward Fitzrovia Rosé NV alongside the complex, vintage Rosé de Noirs 2020. Two unique forms of England's finest Pinot, paired in a single gift box.",
    included: [
      "Fitzrovia Rosé NV — 75cl",
      "Rosé de Noirs 2020 — 75cl",
      "Presented in a Ridgeview gift box",
      "Free next-working-day delivery",
    ],
    image: "/images/gift-sets/rose-duo.webp",
  },
  "limited-release-duo": {
    slug: "limited-release-duo",
    name: "Limited Release Duo",
    price: 135,
    kind: "Duo",
    kicker: "[ Duo · Vintage Limited Release ]",
    subtitle: "Two of our finest vintage sparkling wines.",
    description:
      "Bringing together two of Ridgeview's finest vintage sparkling wines, this limited-release duo celebrates the elegance of English Chardonnay and Pinot Noir. Blanc de Blancs 2020 is precise and elegant; Blanc de Noirs balances richness with finesse.",
    included: [
      "Blanc de Blancs 2020 — 75cl",
      "Blanc de Noirs — 75cl",
      "Presented in individual gift boxes",
      "Free next-working-day delivery",
    ],
    image: "/images/gift-sets/limited-release-duo.webp",
  },
  "signature-trio": {
    slug: "signature-trio",
    name: "Signature Trio",
    price: 110,
    kind: "Trio",
    kicker: "[ Trio · Signature Non-Vintage ]",
    subtitle: "Our three bestselling signature blends.",
    description:
      "A trio of our bestselling sparkling wines, featuring our signature non-vintage blends. Bloomsbury brings bright citrus and fresh elegance, Cavendish offers rich red-berry depth, and Fitzrovia Rosé shines with vibrant fruit purity.",
    included: [
      "Bloomsbury NV — 75cl",
      "Cavendish NV — 75cl",
      "Fitzrovia Rosé NV — 75cl",
      "Presented in a Ridgeview gift box",
      "Free next-working-day delivery",
    ],
    image: "/images/gift-sets/signature-trio.webp",
  },
  "limited-release-trio": {
    slug: "limited-release-trio",
    name: "Limited Release Trio",
    price: 200,
    kind: "Trio",
    kicker: "[ Trio · Vintage Limited Release ]",
    subtitle: "England's finest vintage sparkling, in individual boxes.",
    description:
      "Showcasing England's finest vintage sparkling wines, presented in individual gift boxes. Blanc de Blancs 2020 epitomises purity and elegance; Blanc de Noirs 2016 balances richness with finesse; Rosé de Noirs 2020 brings depth and red-fruit complexity.",
    included: [
      "Blanc de Blancs 2020 — 75cl",
      "Blanc de Noirs 2016 — 75cl",
      "Rosé de Noirs 2020 — 75cl",
      "Presented in individual gift boxes",
      "Free next-working-day delivery",
    ],
    image: "/images/gift-sets/limited-release-trio.webp",
  },
  "bottle-stopper": {
    slug: "bottle-stopper",
    name: "Sparkling Bottle Stopper",
    price: 8,
    kind: "Accessory",
    kicker: "[ Accessory ]",
    subtitle: "Keep the sparkle, between pours.",
    description:
      "A chrome Ridgeview sparkling bottle stopper that seals an open bottle to keep the mousse fresh between pours. The perfect small addition to any wine gift.",
    included: ["Chrome bottle stopper with Ridgeview enamel badge"],
    image: "/images/gift-sets/bottle-stopper.webp",
  },
  "umbrella": {
    slug: "umbrella",
    name: "The Ridgeview Umbrella",
    price: 39,
    kind: "Accessory",
    kicker: "[ Accessory ]",
    subtitle: "Life is for celebrating — rain or shine.",
    description:
      "A wooden-handled Ridgeview umbrella in black and estate teal, finished with the Ridgeview wordmark and our 'Life is for Celebrating' motto. A characterful gift that keeps the brand close on a grey day.",
    included: [
      "Automatic wooden-handle umbrella",
      "Black canopy with estate-teal underside",
    ],
    image: "/images/gift-sets/umbrella.webp",
  },
};

export const GIFT_PRODUCT_SLUGS = Object.keys(GIFT_PRODUCTS);

/**
 * Mixed cases — six-bottle cases of DIFFERENT wines (unlike the
 * single-wine cases that live as `case6` variants on a wine SKU). They
 * have no parent wine page, so they get their own product pages under
 * /wines/cases/<slug>, rendered by the same <GiftProductPage>. Prices +
 * contents verbatim from the UK shop (fetched 2026-05-30).
 */
export const MIXED_CASES: Record<string, GiftProduct> = {
  "signature-mixed-case": {
    slug: "signature-mixed-case",
    name: "Signature Mixed Case",
    price: 198,
    kind: "Case of 6",
    kicker: "[ Mixed Case · Signature ]",
    subtitle: "Our three signature blends, two of each.",
    description:
      "A showcase of Ridgeview's signature style: two bottles each of the crisp, citrus-driven Bloomsbury NV, the rich red-fruited Cavendish NV, and the vibrant, fruit-pure Fitzrovia Rosé NV. Perfect for effortless entertaining, thoughtful gifting, or stocking up.",
    included: [
      "2 × Bloomsbury NV — 75cl",
      "2 × Cavendish NV — 75cl",
      "2 × Fitzrovia Rosé NV — 75cl",
      "Free next-working-day delivery",
    ],
    image: "/images/gift-sets/signature-mixed-case.webp",
  },
  "ridgeview-mixed-case": {
    slug: "ridgeview-mixed-case",
    name: "Ridgeview Mixed Case",
    price: 279,
    kind: "Case of 6",
    kicker: "[ Mixed Case · Signature & Limited ]",
    subtitle: "A tasting journey — signature meets limited release.",
    description:
      "Three of our signature non-vintage blends alongside three limited-release vintage wines — a true exploration of style and craftsmanship. Perfect for an at-home tasting, sharing with friends and family, or marking a special occasion with something exceptional.",
    included: [
      "3 × Signature NV — Bloomsbury, Cavendish, Fitzrovia Rosé",
      "3 × Limited-release vintage wines",
      "Free next-working-day delivery",
    ],
    image: "/images/gift-sets/ridgeview-mixed-case.webp",
  },
};
