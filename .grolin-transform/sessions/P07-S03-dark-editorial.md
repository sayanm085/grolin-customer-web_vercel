---
project: grolin
role: session
phase: P07
session: S03
window: W04
status: complete
---
# SESSION P07-S03 — DARK EDITORIAL SECTION

## Session Identity
- **Phase**: P07 — Homepage Section Narrative
- **Session**: S03 of 4
- **Status**: ⬜ Not Started

---

## Objective

Create the full-bleed dark editorial section — the dramatic "scroll stopper" mid-page. This is the most visually dramatic moment on the homepage. It uses mesh-dark background, grain overlay, dot-grid pattern, and presents brand proof/stats in a compelling format.

## Pre-Session Confirmation

> "I am executing P07-S03: Dark Editorial. Creating/refining the dark editorial band component. New visual-only component. Zero API imports."

## Implementation Focus

### Dark Editorial Design

```
Background:  mesh-dark + grain-overlay + dot-grid
Full width:  extends edge-to-edge (no max-width constraint on bg)
Content:     max-w-screen-xl centered within

Content Layout:
  - Eyebrow: "WHY KOLKATA TRUSTS GROLIN" (white, uppercase, tracking)
  - Headline: Large editorial (gradient-text-green or white)
  - Stat cards: 3-4 stats in a row
    Example: "5000+" Products | "30 min" Avg Delivery | "4.8★" Rating | "50k+" Happy Customers
  - Optional CTA: ghost button (white outline on dark)
```

### Stat Card Design (within dark section)

```
- Glass surface: glass-surface-dark
- Stat number: 28-32px, weight 800, white or gradient-text-green
- Stat label: 12px, weight 500, white/60%
- Subtle border: 1px solid rgba(255,255,255,0.12)
- Border-radius: 16px
```

### Visual Effect

This section should feel like stepping into a different world — dramatic, dark, premium. The transition from light sections above creates visual tension that demands attention.

## Files IN SCOPE

```
CREATE:
  src/components/home/DarkEditorialBand.tsx    → new dark section component

MODIFY:
  src/app/(shop)/page.tsx                     → insert dark section in homepage flow
  src/app/globals.css                         → glass-surface-dark utility (if not present)
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] Dark section creates dramatic visual break
- [ ] Mesh-dark + grain-overlay + dot-grid all applied
- [ ] Stat cards are readable against dark background
- [ ] Section works at both 375px and 1280px
- [ ] Transition from light→dark→light feels intentional


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified:
  - src/components/home/LocalTrustSection.tsx

Key changes:
  - DarkEditorialBand.tsx NOT created — LocalTrustSection already IS the dark editorial scroll stopper
    (mesh-dark + grain-overlay + glass-surface-dark stat cards + editorial headline + trust images)
  - Added dot-grid texture overlay (z-[1], opacity-40) to LocalTrustSection — the only missing element
  - Content remains at z-10 (above dot-grid at z-[1])

Issues found:
  - LocalTrustSection already satisfied all spec criteria except dot-grid — no duplicate component needed
  - This is the same pattern as P04-S01 and P05-S03 (audit + targeted addition instead of rewrite)

Next session should know:
  - LocalTrustSection is the canonical dark editorial section — do NOT create DarkEditorialBand.tsx
  - dot-grid is now applied; LocalTrustSection satisfies: mesh-dark + grain-overlay + dot-grid + glass stats + gradient headline
```

---

*Session file for P07-S03.*
