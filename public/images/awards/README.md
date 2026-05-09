# Award Badges — SKU Mapping

Quelle: https://www.ridgeview.co.uk (visuell verifiziert).
Alle Badges liegen unter `public/images/awards/` und werden auf den SKU-Pages im Hero-Bereich neben dem Preis angezeigt.

---

## Badge-Dateien (9 Stück)

| Datei | Wettbewerb | Auszeichnung | Jahr |
|---|---|---|---:|
| `iwsc-93pts-2020.webp` | IWSC | 93 Points (Silver) | 2020 |
| `iwsc-95pts-2020-gold.webp` | IWSC | 95 Points (Gold) | 2020 |
| `decanter-2017-silver.webp` | Decanter World Wine Awards | Silver | 2017 |
| `decanter-2018-silver.webp` | Decanter World Wine Awards | Silver | 2018 |
| `decanter-2022-93pts.webp` | Decanter World Wine Awards | 93 Points (Silver) | 2022 |
| `decanter-2023-platinum.webp` | Decanter World Wine Awards | **Platinum** | 2023 |
| `cswwc-2018-silver.webp` | Champagne & Sparkling Wine World Championships | Silver | 2018 |
| `winegb-2023-trophy.webp` | WineGB Awards | Trophy Winner | 2023 |
| `sustainable-wines-gb-founder-member.png` | Sustainable Wines of Great Britain | Founder Member | — |

---

## SKU → Badges Mapping

| SKU | Badges |
|---|---|
| **Bloomsbury NV** | `iwsc-93pts-2020.webp`, `decanter-2018-silver.webp` |
| **Fitzrovia Rosé NV** | `iwsc-93pts-2020.webp`, `decanter-2018-silver.webp` |
| **Cavendish NV** | `decanter-2017-silver.webp` |
| **Blanc de Noirs** | `winegb-2023-trophy.webp`, `cswwc-2018-silver.webp` |
| **Blanc de Blancs** | `iwsc-95pts-2020-gold.webp` |
| **Rosé de Noirs** | `decanter-2023-platinum.webp` |
| **Still English Rosé** | `sustainable-wines-gb-founder-member.png` |
| **Oak Reserve** | `decanter-2022-93pts.webp` |
| **Sparkling Red Reserve** | *(Pioneer Trophy WineGB 2023 — kein Badge-PNG, ggf. `winegb-2023-trophy.webp` reused)* |
| **Still Chardonnay** | *(keine Awards)* |
| **Magnum Bloomsbury NV** | `iwsc-93pts-2020.webp`, `decanter-2018-silver.webp` |
| **Blanc de Blancs 2010 Magnum** | `iwsc-95pts-2020-gold.webp` |

---

## Verwendung im Code

```tsx
import { basePath } from "@/lib/basePath";

<Image
  src={`${basePath}/images/awards/iwsc-93pts-2020.webp`}
  alt="IWSC 93 Points 2020"
  width={80}
  height={80}
  className="opacity-90 hover:opacity-100 transition-opacity"
/>
```

**Empfohlene Display-Größe:** 64–96px Höhe, nebeneinander, ca. 16px Gap.
**Hero-Position:** Links unter Preis, oder als horizontale Reihe unter den Tasting Notes.
