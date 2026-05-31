# Handoff: Workinabox — Visual Identity

## Overview
This is the visual identity system for **Workinabox** (Gos & co ApS) — an agentic
system that runs vertical work (software, marketing, sales, operations). The design
is delivered as a single long-form **identity guidelines document** covering brand
voice, the logo mark, wordmark & lockups, color, typography, iconography, UI
components, an application console, the marketing website hero, and design tokens.

The aesthetic is deliberately **industrial / engineering-credible** — warm cream
"paper", a warm near-black "ink", a single orange brand signal, monospace labels,
precise spacing, no gradients or sci-fi tropes.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype that
shows the intended look, the system, and its behavior. They are **not production code
to copy directly**.

The task is to **recreate this identity / these screens in the target codebase's
existing environment** (React, Vue, SwiftUI, native, etc.) using its established
patterns, component primitives, and libraries. If no environment exists yet, choose
the most appropriate framework for the project and implement there. Treat the HTML as
the source of truth for *visual intent and tokens*, not as files to ship.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, and component states are final
and exact. Recreate the UI faithfully using the codebase's existing libraries. All
exact values are in the **Design Tokens** section below and in `Workinabox Identity.html`
(section 11 — Tokens).

---

## ⭐ Chosen Direction (IMPORTANT — read first)

This identity document is **tweakable** — it ships with an interactive Tweaks panel that
can reshape the whole document across five controls (palette, type, logo mark, line
weight, density). Those controls exist so the team could explore directions. **For
implementation, build the ONE chosen combination below.** The other options are recorded
in the "Tweak Catalog" section purely for reference — do not build a runtime theme
switcher unless explicitly asked.

| Control | CHOSEN value | Meaning |
|---|---|---|
| **Logo mark** | `toolboxAlt` — "Work box · alternating" | The box/briefcase mark whose box edges alternate ink / orange |
| **Line weight** | `1.0×` | Default logo + icon stroke weight (no scaling) |
| **Palette** | `workshop` | Warm cream paper, warm ink, orange accent |
| **Type system** | `engineering` | Space Grotesk (display/body) · JetBrains Mono (mono) |
| **Density** | `standard` | Default spacing scale |

Everything in the **Design Tokens** section reflects this chosen direction (the
`workshop` palette + `engineering` type). Build to these.

---

## Tweak Catalog (reference only — NOT all to be built)

The prototype's Tweaks panel is defined in `tweaks-app.jsx`. Each tweak sets a
`data-*` attribute on the root `<html>` element, and CSS variant rules in `styles.css`
respond. Below is every control and every option in plain language. **Only the values
marked ⭐ are the chosen direction.**

### 1. Logo mark  (`data-logo`)
Swaps the primary logo glyph. Mark SVGs are generated in `logos.js`.
- `brain` — "Brain + gear" — original; the mind in the box.
- `toolbox` — "Work box" — box / briefcase with laptop + cog.
- ⭐ `toolboxAlt` — "Work box · alternating" — same box, edges alternate ink / orange.

### 2. Line weight  (`--line-scale`)
A multiplier (slider, 0.1×–2.4×, step 0.1) that scales the logo mark and icon-system
stroke widths. ⭐ Chosen: **1.0×** (no scaling). At implementation, icon strokes are
1.5px on a 24px grid (see Iconography).

### 3. Palette  (`data-palette`)
Recolors the entire document. Each option is paper / ink / accent / rule:
- ⭐ `workshop` — Warm cream, ink, orange. paper `#F4EFE6` · ink `#2A2622` · accent `#E76F2C` · rule `#D8D2C6`
- `blueprint` — Cool paper, navy, orange. paper `#E9EEF4` · ink `#1F2E47` · accent `#E76F2C` · rule `#C5CFDA`
- `carbon` — Dark; orange pops. paper `#221F1B` · ink `#F2EFE8` · accent `#F08246` · rule `#3A3631`
- `press` — Riso vermillion, near-black. paper `#F7F4EC` · ink `#1A1815` · accent `#D33820` · rule `#CDC8BC`

### 4. Type system  (`data-type`)
Swaps the display/body and mono font pairing:
- ⭐ `engineering` — Space Grotesk (500, -0.025em) · JetBrains Mono
- `industrial` — Inter Tight (700, -0.045em) · IBM Plex Mono
- `editorial` — Instrument Serif (italic, 400) · Space Grotesk

### 5. Density  (`data-density`)
Global spacing scale (radio): `compact` · ⭐ `standard` · `spacious`.

> Implementation note: because each tweak is just a root `data-*` attribute + CSS
> variables, you *can* support multiple themes if the product needs it — but the brief
> is to build the ⭐ chosen direction. The catalog above is documentation, not a
> requirement to build a switcher.

---

## Screens / Views
The document is one continuous page of stacked sections. Each `<section>` carries a
`data-screen-label`. In reading order:

1. **00 — Cover** — Wordmark "Workin**a**box" (orange "a"), headline "Companies, in a box.", subtitle, runners top/bottom (mono).
2. **Contents** — 11-item table of contents, numbered, with meta descriptions.
3. **01 — Brand & voice** — Positioning headline + three voice cards (Honest not slick / Engineering-credible / Industrial not sci-fi) + a "We say / We don't say" two-column list.
4. **02 — The mark** — Mark on paper and on ink, plus concept (box + gear + brain) and clear-space / min-size rules.
5. **03 — Companion glyph** — The mark at 280 / 80 / 48 / 32 / 16px to show small-size behavior.
6. **04 — Wordmark & lockups** — Big wordmark; horizontal, stacked, on-ink, and mono lockups.
7. **05 — Color** — Primary (4), Supporting (4), Semantic (4) swatches; usage ratios (60/30/10 marketing, product-UI ratio); accessibility notes.
8. **06 — Typography** — Specimens, display scale (88 / 56 / 32 / 22 / 15 / 12px).
9. **07 — Iconography** — 16 line icons on a 24px grid, 1.5px stroke, rounded joins.
10. **08 — UI components** — Buttons, inputs, status badges, task cards.
11. **09 — Application UI** — The Workinabox console (8 screens; rendered by `console-screens.js`).
12. **10 — Website** — workinabox.ai hero (nav, hero, 4-up feature strip).
13. **11 — Tokens** — CSS custom properties for color and type, for handoff.

For exact layout, copy, and component structure of each section, read
`Workinabox Identity.html` directly — it is well-commented and the labels above map to
the `data-screen-label` on each `<section>`.

## Interactions & Behavior
This is primarily a static identity document. Interactive pieces:
- **Contents** links are in-page anchors (`#voice`, `#mark`, …) to each section.
- **Tweaks panel** (prototype-only) — do not ship; see Chosen Direction.
- **Component states** to implement (from section 08):
  - Buttons: `primary` (filled orange), `secondary` (outline), `ghost` (text), plus `small` variants. Hover/pressed use **Orange Deep** `#C25827`.
  - Inputs: default + readonly (mono). Joined input+button group shares squared inner corners.
  - Badges: created / assigned / in-progress / blocked / completed / failed — each maps to a semantic color (see tokens).

## State Management
None required for the identity document itself. For the **console** screens (section 09),
if rebuilt as a real app, model: tasks (id, title, status, assigned agent, step
progress), agent hierarchy, and the six task statuses above. The prototype renders these
statically from `console-screens.js`.

## Design Tokens
These reflect the ⭐ chosen direction (`workshop` palette + `engineering` type). Source:
section 11 of the HTML.

### Color
```
/* primary */
--wiab-orange       : oklch(0.692 0.181 49)   /* #E76F2C */
--wiab-orange-deep  : oklch(0.585 0.173 42)   /* #C25827 */
--wiab-ink          : oklch(0.21  0.012 60)   /* #2A2622 */
--wiab-paper        : oklch(0.965 0.012 80)   /* #F4EFE6 */

/* supporting */
--wiab-ink-soft     : oklch(0.36 0.012 60)    /* #564F49 */
--wiab-ink-mute     : oklch(0.55 0.010 60)    /* #877F77 */
--wiab-paper-deep   : oklch(0.935 0.014 80)   /* #ECE5D8 */
--wiab-schematic    : oklch(0.50 0.080 240)   /* #3F6589 */

/* semantic */
--wiab-ok           : oklch(0.58 0.110 150)   /* #4A8E5E */
--wiab-warn         : oklch(0.74 0.130 80)    /* #D1A24A */
--wiab-crit         : oklch(0.58 0.180 25)    /* #B83E2A */
--wiab-info         : oklch(0.55 0.080 240)   /* #4972A0 */
```

### Typography
```
/* families */
--wiab-font-display : 'Space Grotesk', system-ui, sans-serif
--wiab-font-body    : 'Space Grotesk', system-ui, sans-serif
--wiab-font-mono    : 'JetBrains Mono', ui-monospace, monospace
--wiab-font-mark    : 'Quicksand', sans-serif          /* wordmark only */

/* scale — size / line-height / letter-spacing / weight */
--wiab-display-01   : 88px / 0.95 / -0.035em / 500
--wiab-display-02   : 56px / 1.02 / -0.025em / 500
--wiab-heading-01   : 32px / 1.15 / -0.015em / 500
--wiab-heading-02   : 22px / 1.30 / -0.010em / 500
--wiab-body         : 15px / 1.55 /  0.000em / 400
--wiab-caption      : 12px / mono /  0.060em / 500   /* uppercase, mono */
```

### Radii
```
--wiab-radius-sm : 4px
--wiab-radius-md : 6px
--wiab-radius-lg : 10px
```

### Color usage rules
- **Marketing ratio 60 / 30 / 10** — paper / ink / orange. Orange is always the
  smallest share.
- **Product-UI ratio** — paper / paper-deep / ink / orange (~55/25/15/5). Orange
  reserved for selection & key actions.
- Body copy = `ink-soft`; headings = `ink`. Never pure `#000` or `#FFF`.
- Accessibility: Ink on Paper 12.4:1 (AAA). Orange on Paper 4.7:1 (AA Large). Orange
  on Ink 4.2:1 (AA Large).

### Iconography
24px grid · 1.5px stroke · rounded joins. 16 icons defined inline in section 07
(box, spec, agent, task, board, hierarchy, turn, work, voice, repo, pipeline, gate,
trace, done, blocked, ship).

## Assets
- **Fonts** — Google Fonts: Space Grotesk, JetBrains Mono, Quicksand (wordmark), plus
  Inter Tight, IBM Plex Mono, Instrument Serif (only needed for non-chosen type
  tweaks; safe to drop if you only build the chosen direction). Loaded via `<link>` in
  the HTML head.
- **Logo marks** — generated as inline SVG by `logos.js` (no image files). The chosen
  mark is `toolboxAlt`.
- **Icons** — inline SVG in the HTML; no external icon set.
- `images/` and `screenshots/` folders are included if present in the project.

## Files
Included in this bundle (under the project's design files):
- `Workinabox Identity.html` — the full identity document (start here).
- `styles.css` — all styling, including the palette/type/density variant rules keyed
  off the root `data-*` attributes.
- `logos.js` — generates the logo mark SVGs (`brain`, `toolbox`, `toolboxAlt`).
- `console-screens.js` — renders the section 09 console screens.
- `tweaks-app.jsx` — Tweaks panel definition (prototype tooling; documents the tweak
  catalog above — not for production).
- `tweaks-panel.jsx` — Tweaks panel host scaffold (prototype tooling).
