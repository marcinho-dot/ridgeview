# Jelly Button — 3D Cursor-Tilt Archive

Frozen copy of the cursor-tracking 3D-lift-and-tilt jelly buttons
(committed `25b994f` 2026-05-15) before they were replaced with the
single-shot kickflip variant.

Source git ref: **`25b994f`** — final tuning pass of the tilt
variant (perspective 380px, 30°/34° tilt, ::before back-layer
at translateZ(-20px)).

## What's in here

| File | What it was |
|---|---|
| `JellyButtonCss.tsx`    | Cursor-following 3D tilt — pure CSS transitions, cubic-bezier spring-overshoot. |
| `JellyButtonCanvas.tsx` | Cursor-following 3D tilt — JS rAF spring-lerp loop, viscous mass feel. |

The corresponding CSS rules (`.rv-jelly3d-*` + `::before` back-layer +
`::after` top-rim highlight) lived in `src/app/globals.css` and were
removed when the kickflip rewrite landed.

## Why archived (not deleted)

User feedback after looking at the live result: the cursor-following
tilt made the two hero buttons collide visually (both with active
transforms = chaotic), and the desired behaviour was a discrete
"kickflip" animation on hover, not continuous cursor tracking.
Variants kept here in case we want a refined cursor-tilt option
later (e.g. on a less-crowded surface than the hero).

No imports anywhere in the active tree reference this folder —
zero bundle weight.
