/**
 * Press-Review Testimonials für Ridgeview SKU-Pages.
 *
 * WICHTIG — Brand-Voice-Regel:
 * - Alle Quotes sind verbatim (wortwörtlich) aus den genannten Quellen übernommen.
 * - Quelle, Reviewer und Score (falls vorhanden) MÜSSEN beim Anzeigen
 *   klar gekennzeichnet sein (siehe TestimonialSection-Komponente).
 * - Keine Founder-Familienname-Zitate (Brand-Voice-Vorgabe).
 *
 * Hinzugefügt: 2026-05-09 (Recherche via WebSearch + WebFetch).
 */

export interface Testimonial {
  /** Verbatim Quote — keine Bearbeitung. */
  quote: string;
  /** Reviewer-Name inkl. Titel (z.B. "Anne Krebiehl MW") */
  author: string;
  /** Publikation, in der die Review erschien (z.B. "Wine Enthusiast", "Decanter") */
  publication: string;
  /** Optionaler Score (z.B. 90, 94). Skala-Wert wird als "{score} / 100" oder "{score}/20" gerendert. */
  score?: number;
  /** Maximaler Skala-Wert. Default 100. Für Jancis Robinson "16/20" → maxScore: 20. */
  maxScore?: number;
  /**
   * Tier-Label des Scores (z.B. "Excellent", "Highly Recommended", "Outstanding").
   * Wird unter dem Score gerendert um den Punkt-Wert in Kontext zu setzen.
   *
   * Wine Enthusiast Skala:
   *   98–100 Classic · 94–97 Superb · 90–93 Excellent · 87–89 Very Good
   * Decanter Skala:
   *   95–100 Outstanding · 90–94 Highly Recommended · 86–89 Recommended
   */
  tier?: string;
  /** Veröffentlichungsdatum der Review (Freitext, z.B. "Apr 2024", "31 Jan 2022") */
  date?: string;
  /** Link zur Originalreview, falls öffentlich abrufbar. */
  url?: string;
}

export const TESTIMONIALS: Record<string, Testimonial> = {
  bloomsbury: {
    // Quelle: Anne Krebiehl MW · Review zur "Ridgeview Estate NV Bloomsbury Sparkling"
    // bei Wine Enthusiast (URL hinter Paywall, Wortlaut via Search-Snippet verifiziert).
    // Score wurde bewusst NICHT gesetzt — der bei Wine Enthusiast publizierte
    // 90-Punkte-Score ist einer separaten Review-Variante zugeordnet ("Bloomsbury
    // Brut Blend NV") und gehört nicht eindeutig zu diesem Quote.
    quote:
      "It is zesty lemon that takes center stage on the slender palate. This is frothy, fresh, invigorating and dry.",
    author: "Anne Krebiehl MW",
    publication: "Wine Enthusiast",
    url: "https://www.wineenthusiast.com/buying-guide/ridgeview-estate-nv-bloomsbury-brut-sparkling-england/",
  },

  fitzrovia: {
    quote:
      "Gorgeously floral and inviting, this red berry-focused rosé sparkling from Ridgeview is an elegant partner to most occasions.",
    author: "Natalie Earl",
    publication: "Decanter",
    score: 94,
    tier: "Highly Recommended",
    date: "Apr 2024",
    url: "https://www.decanter.com/wine-reviews/united-kingdom/england/ridgeview-fitzrovia-rose-sussex-england-united-kingdom-56041",
  },

  cavendish: {
    quote:
      "This is fine-boned and sylph-like in its elegance, but it comes with lovely depth.",
    author: "Anne Krebiehl MW",
    publication: "Wine Enthusiast",
    score: 92,
    tier: "Excellent",
    url: "https://www.wineenthusiast.com/buying-guide/ridgeview-estate-nv-cavendish-sparkling-england/",
  },

  "blanc-de-noirs": {
    quote:
      "This continues to be my favourite wine from English Sparkling pioneers, Ridgeview, who blend their best Pinot Noir and Pinot Meunier into this superb vintage wine in only the very best years.",
    author: "John Mobbs",
    publication: "Great British Wine",
    url: "https://www.greatbritishwine.com/wines/ridgeview-blanc-de-noirs-2015/",
  },

  "blanc-de-blancs": {
    quote:
      "From the first vineyard planted by Ridgeview in 1995, this now is the well-deserved vintage Blanc de Blancs… There is lovely elegance and brightness.",
    author: "Anne Krebiehl MW",
    publication: "Wine Enthusiast",
    score: 93,
    tier: "Excellent",
    url: "https://www.wineenthusiast.com/buying-guide/ridgeview-estate-2014-blanc-de-blancs-chardonnay-england/",
  },

  "rose-de-noirs": {
    quote:
      "Tart strawberries and cream are spelled out joyously on the nose… This is utterly appealing and very, very moreish — despite all its seriousness.",
    author: "Anne Krebiehl MW",
    publication: "Wine Enthusiast",
    url: "https://www.wineenthusiast.com/buying-guide/ridgeview-estate-2013-rose-de-noirs-sparkling-england/",
  },

  "oak-reserve": {
    quote:
      "One of the most memorable and distinctive English sparkling wines to be released so far…",
    author: "John Mobbs",
    publication: "Great British Wine",
    url: "https://www.greatbritishwine.com/articles/ridgeview-launches-oak-reserve-nv/",
  },

  "red-reserve": {
    quote:
      "This is probably the most convincing sparkling red I've had from England so far, balancing tannin, acid and sweetness effectively.",
    author: "Tom Hewson",
    publication: "Tim Atkin English Wine Report",
    date: "2022",
    url: "https://timatkin.com/product/2022-england-special-report/",
  },

  // Magnums — same review applies to the wine inside
  "magnum-bloomsbury": {
    // Identisch zu "bloomsbury" (Magnum-Variante teilt sich Review).
    quote:
      "It is zesty lemon that takes center stage on the slender palate. This is frothy, fresh, invigorating and dry.",
    author: "Anne Krebiehl MW",
    publication: "Wine Enthusiast",
    url: "https://www.wineenthusiast.com/buying-guide/ridgeview-estate-nv-bloomsbury-brut-sparkling-england/",
  },

  "blanc-de-blancs-magnum": {
    quote:
      "From the first vineyard planted by Ridgeview in 1995, this now is the well-deserved vintage Blanc de Blancs… There is lovely elegance and brightness.",
    author: "Anne Krebiehl MW",
    publication: "Wine Enthusiast",
    score: 93,
    tier: "Excellent",
    url: "https://www.wineenthusiast.com/buying-guide/ridgeview-estate-2014-blanc-de-blancs-chardonnay-england/",
  },

  // Still wines + Personalised Gift — keine externe Press-Review verfügbar.
  // Diese Pages bekommen statt Testimonial-Section eine alternative Recognition-Variante.
};

export function getTestimonial(slug: string): Testimonial | undefined {
  return TESTIMONIALS[slug];
}
