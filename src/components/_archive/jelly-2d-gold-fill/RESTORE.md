# Jelly Button — 2D Gold-Fill Archive

Frozen copy of the **previous** jelly-button implementation (SVG-goo
+ Canvas-2D-metaballs gold liquid fill) so it can be brought back if
the current 3D lift-and-tilt version (committed in `de19371` on
2026-05-15) doesn't hold up.

Source git ref: **`de19371^`** (commit before the 3D rewrite).

## What's in here

| File | Original location | What it was |
|---|---|---|
| `JellyButtonCss.tsx` | `src/components/JellyButtonCss.tsx` | SVG goo-filter variant. Gold blob follows cursor, fuses into pill via Lucas-Bebber goo recipe. Universal browser support. |
| `JellyButtonCanvas.tsx` | `src/components/JellyButtonCanvas.tsx` | Canvas-2D-metaballs variant. Two-pass render (blur+contrast alpha mask → source-in gold tint) with JS spring-lerp on blob position. |
| `RvGooDefs.tsx` | `src/components/RvGooDefs.tsx` | Singleton `<svg><defs><filter id="rv-goo-filter">` SVG, was mounted once in `layout.tsx`. Required by the SVG-goo variant. |
| `globals.snippet.css` | `src/app/globals.css` | The `.rv-jelly-css*` and `.rv-jelly-canvas*` CSS rule block that lived next to `.btn-cta`. |

## Restore procedure (~5 minutes)

1. Copy the three `.tsx` files back to `src/components/`:
   ```bash
   cp src/components/_archive/jelly-2d-gold-fill/JellyButton*.tsx src/components/
   cp src/components/_archive/jelly-2d-gold-fill/RvGooDefs.tsx src/components/
   ```
2. Open `src/app/globals.css`, find the current
   `─── Jelly Button — 3D Lift + Tilt ───` block, and replace it
   with the contents of `globals.snippet.css`.
3. In `src/app/layout.tsx`:
   - Re-add the import: `import { RvGooDefs } from "@/components/RvGooDefs";`
   - Mount it inside `<body>`: `<RvGooDefs />` (next to `<ScrollProgress />`).
4. `npm run build` → must be green.
5. Push. The Hero CTAs will revert to the gold-fill effect.

## Why this archive exists

The user's reference video showed pills that *lift off the surface
and tilt in 3D* — not a 2D liquid fill. After confirming with the
user, the buttons were rewritten as 3D-CSS-transform pills (current
state, in active `src/components/JellyButton{Css,Canvas}.tsx`). The
2D version is preserved here in case the 3D effect underperforms on
the live site or doesn't read as elegantly as expected.

No imports anywhere in the active tree reference this folder, so it
adds zero bundle weight.
