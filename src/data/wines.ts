export interface Wine {
  id: number;
  name: string;
  description: string;
  vintage: string;
  tastingNotes: string[];
  price: string;
  image: string;
  /** Standard bottle volume for the listing's default SKU
   *  (all current Ridgeview wines ship in 75cl as the default bottle;
   *  magnums live as variants on the individual SKU page).
   *  Optional - defaults to "75cl" at the call site. */
  bottleSize?: string;
  slug?: string;
  /** Routes that should not resolve to /wine/<slug> (e.g. the OurView
   *  Wine Club entry, which has its own dedicated /wine-club/ landing
   *  page). Falls back to /wine/<slug> when absent. */
  customUrl?: string;
  /** Visually flags this entry as a membership rather than a bottle.
   *  Lets the listing / carousel render an alternate badge or copy. */
  kind?: "wine" | "membership";
}

export const wines: Wine[] = [
  {
    id: 4,
    name: "Blanc de Blancs",
    description:
      "Purity, elegance and complexity - the beating heart of Ridgeview. Made entirely from handpicked Chardonnay on our home estate in Sussex. Gold, Wines GB Pioneer Trophy 2023.",
    vintage: "2020",
    tastingNotes: ["Brioche & Honey", "White Peach", "Toasted Hazelnut"],
    price: "£75",
    image: "/products/blanc-de-blancs.png",
    slug: "blanc-de-blancs",
  },
  {
    id: 1,
    name: "Bloomsbury",
    description:
      "Bright, fresh and fruit-driven with vibrant citrus aromas and notes of lemon zest, green apple and honey. Our bestselling blend - a true celebration in a bottle, delightful as an aperitif and perfect with canapés.",
    vintage: "NV",
    tastingNotes: ["Lemon Zest", "Green Apple", "Toasted Almond"],
    price: "£34",
    image: "/products/bloomsbury.png",
    slug: "bloomsbury",
  },
  {
    id: 2,
    name: "Fitzrovia Rosé",
    description:
      "Full of sunshine and celebration, featuring wild raspberry, honeyed redcurrant and notes of summer fruit. A fresh and fruit-driven English sparkling rosé, alive with colour and character.",
    vintage: "NV",
    tastingNotes: ["Wild Raspberry & Redcurrant", "Sherbet Citrus", "Cream & Summer Fruit"],
    price: "£40",
    image: "/products/fitzrovia.png",
    slug: "fitzrovia",
  },
  {
    id: 3,
    name: "Cavendish",
    description:
      "Rich and expressive, led by Pinot Noir and Pinot Meunier. Structured and generous with a full-bodied style that rewards patience. The choice for those who prefer depth over delicacy.",
    vintage: "NV",
    tastingNotes: ["Red Berry & Cherry", "Toasted Almond", "Brioche & Bergamot"],
    price: "£36",
    image: "/products/cavendish.png",
    slug: "cavendish",
  },
  {
    id: 5,
    name: "Blanc de Noirs",
    description:
      "A white sparkling wine made entirely from red grapes - Pinot Noir and Pinot Meunier. Remarkable freshness and depth, structured, precise and unmistakably English.",
    vintage: "2016",
    tastingNotes: ["White Cherry & Red Fruit", "Sweet Spice", "Toasted Hazelnut"],
    price: "£60",
    image: "/products/blanc-de-noirs.png",
    slug: "blanc-de-noirs",
  },
  {
    id: 6,
    name: "Rosé de Noirs",
    description:
      "Alive with vibrant fruit flavours and a creamy palate of peach, cherry and almond. An elegant, grown-up, serious English sparkling rosé - for those who expect more from a pink wine.",
    vintage: "2020",
    tastingNotes: ["Wild Strawberry & Cherry", "Honey & Cranberry", "Almond Biscuit"],
    price: "£65",
    image: "/products/rose-de-noirs.png",
    slug: "rose-de-noirs",
  },
  {
    id: 7,
    name: "Oak Reserve",
    description:
      "A rare, late-disgorged, oak barrel-fermented English Chardonnay. Rich, complex and unlike anything else in our range - for those who know what patience in the cellar truly tastes like.",
    vintage: "Late-Disgorged",
    tastingNotes: ["Vanilla Oak & Caramelised Butter", "Candied Citrus & Mace", "Toasted Brioche"],
    price: "£85",
    image: "/products/oak-reserve.png",
    slug: "oak-reserve",
  },
  {
    id: 8,
    name: "Sparkling Red Reserve",
    description:
      "A rare and remarkable English sparkling red - bold, expressive and unlike anything else in our range. The adventurous spirit of Ridgeview, and the extraordinary potential of English viticulture.",
    vintage: "Multi-Vintage Blend",
    tastingNotes: ["Wild Blackberry & Cherry", "Pomegranate & Sweet Spice", "Silky Tannin"],
    price: "£55",
    image: "/products/sparkling-red-reserve.png",
    slug: "sparkling-red-reserve",
  },
  {
    id: 9,
    name: "Still Chardonnay",
    description:
      "Ridgeview's first-ever still wine - 100% estate-grown Chardonnay. White blossom and lychee aromatics over a palate of peach, pear and apricot, finishing silky with a hint of mineral lift.",
    vintage: "2023",
    tastingNotes: ["White Blossom & Lychee", "Peach, Pear & Apricot", "Silky Mineral"],
    price: "£27.50",
    image: "/products/still-chardonnay.png",
    slug: "still-chardonnay",
  },
  {
    id: 10,
    name: "Still English Rosé",
    description:
      "Ridgeview's debut still rosé - 100% Pinot Précoce from Suffolk and Essex partner vineyards. Light rose-petal hue with watermelon, grapefruit and summer berry aromatics, opening onto peach, cranberry and strawberries-and-cream over a crisp, creamy finish.",
    vintage: "2024 · Limited",
    tastingNotes: ["Watermelon & Grapefruit", "Peach & Cranberry", "Strawberries & Cream"],
    price: "£27.50",
    image: "/products/still-english-rose.png",
    slug: "still-english-rose",
  },
  {
    id: 11,
    name: "Engraved Bottle Gift",
    description:
      "Bespoke engraving on Ridgeview's award-winning sparkling wines. Choose Bloomsbury NV, Fitzrovia Rosé or Blanc de Blancs and have your message engraved on the bottle - perfect for milestones, thank-yous and corporate gestures. Made-to-order in up to 5 working days.",
    vintage: "Bespoke Gift",
    tastingNotes: ["Bespoke Engraving", "Three Wine Options", "Made-to-Order"],
    price: "From £50",
    image: "/products/engraved-bottle-gift.png",
    slug: "engraved-bottle-gift",
  },
  {
    id: 12,
    name: "OurView Wine Club",
    description:
      "An annual membership built around two curated 6-bottle cases a year, rare cellar access, member-only events and 20% off Ridgeview wines all year round. Welcome gift set delivered within two weeks of joining.",
    vintage: "Annual Membership",
    tastingNotes: ["12 Bottles a Year", "Rare Cellar Access", "Member Events"],
    price: "From £580/year",
    image: "/products/bloomsbury.png",
    slug: "wine-club",
    customUrl: "/wine-club/",
    kind: "membership",
  },
];
