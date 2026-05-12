export interface Wine {
  id: number;
  name: string;
  description: string;
  vintage: string;
  tastingNotes: string[];
  price: string;
  image: string;
  slug?: string;
}

export const wines: Wine[] = [
  {
    id: 4,
    name: "Blanc de Blancs",
    description:
      "Purity, elegance and complexity — the beating heart of Ridgeview. Made entirely from handpicked Chardonnay on our home estate in Sussex. Gold, Wines GB Pioneer Trophy 2023.",
    vintage: "2020",
    tastingNotes: ["White Peach", "Orchard Blossom", "Saline Mineral"],
    price: "£75",
    image: "/products/blanc-de-blancs.png",
    slug: "blanc-de-blancs",
  },
  {
    id: 1,
    name: "Bloomsbury",
    description:
      "Bright, fresh and fruit-driven with vibrant citrus aromas and notes of lemon zest, green apple and honey. Our bestselling blend — a true celebration in a bottle, delightful as an aperitif and perfect with canapés.",
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
    tastingNotes: ["Wild Raspberry", "Redcurrant", "Summer Fruit"],
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
    tastingNotes: ["Red Cherry", "Cream", "Brioche"],
    price: "£36",
    image: "/products/cavendish.png",
    slug: "cavendish",
  },
  {
    id: 5,
    name: "Blanc de Noirs",
    description:
      "A white sparkling wine made entirely from red grapes — Pinot Noir and Pinot Meunier. Remarkable freshness and depth, structured, precise and unmistakably English.",
    vintage: "Vintage",
    tastingNotes: ["White Cherry", "Citrus Pith", "Mineral Edge"],
    price: "£60",
    image: "/products/cavendish.webp",
  },
  {
    id: 6,
    name: "Rosé de Noirs",
    description:
      "Alive with vibrant fruit flavours and a creamy palate of peach, cherry and almond. An elegant, grown-up, serious English sparkling rosé — for those who expect more from a pink wine.",
    vintage: "Vintage",
    tastingNotes: ["Peach", "Wild Cherry", "Fine Mousse"],
    price: "£65",
    image: "/products/fitzrovia-rose.webp",
  },
  {
    id: 7,
    name: "Oak Reserve",
    description:
      "A rare, late-disgorged, oak barrel-fermented English Chardonnay. Rich, complex and unlike anything else in our range — for those who know what patience in the cellar truly tastes like.",
    vintage: "Limited Edition",
    tastingNotes: ["Vanilla Oak", "Golden Apple", "Toasted Brioche"],
    price: "£85",
    image: "/products/blanc-de-blancs.png",
  },
  {
    id: 8,
    name: "Sparkling Red Reserve",
    description:
      "A rare and remarkable English sparkling red — bold, expressive and unlike anything else in our range. The adventurous spirit of Ridgeview, and the extraordinary potential of English viticulture.",
    vintage: "NV",
    tastingNotes: ["Dark Cherry", "Warm Spice", "Silky Tannin"],
    price: "£55",
    image: "/products/cavendish.webp",
  },
];
