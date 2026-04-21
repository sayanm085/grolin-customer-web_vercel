---
project: grolin
role: session
phase: P11
session: S01
window: W06
status: complete
---
# SESSION P11-S01 — MOTION VARIANTS & LAZYMOTION CONFIG

## Session Identity
- **Phase**: P11 — Motion System Foundation
- **Session**: S01 of 2
- **Status**: ⬜ Not Started

---

## Objective

Create the centralized `motion-variants.ts` file containing all Framer Motion variant definitions organized by animation category. Configure LazyMotion with `domAnimation` at the layout level for bundle efficiency.

## Pre-Session Confirmation

> "I am executing P11-S01: Variants & LazyMotion. Creating motion-variants.ts (new file, visual-only). Configuring LazyMotion provider. Zero API imports."

## Implementation Focus

### motion-variants.ts Contents

```typescript
// src/lib/motion-variants.ts

// HERO ENTRANCE
export const heroHeadline = { hidden: {...}, visible: {...} }
export const heroCTA = { hidden: {...}, visible: {...} }
export const heroImage = { hidden: {...}, visible: {...} }

// VIEWPORT REVEAL
export const viewportReveal = { hidden: {...}, visible: {...} }
export const viewportRevealFromLeft = { ... }
export const viewportRevealFromRight = { ... }

// CARD STAGGER
export const cardContainer = { hidden: {...}, visible: { transition: { staggerChildren: 0.07 } } }
export const cardItem = { hidden: {...}, visible: {...} }

// SPRING ENTRIES
export const springBounce = { hidden: {...}, visible: { transition: { type: 'spring', stiffness: 220, damping: 18 } } }
export const springGentle = { hidden: {...}, visible: { transition: { type: 'spring', stiffness: 120, damping: 24, mass: 1.2 } } }

// PANEL ANIMATIONS
export const panelOpen = { hidden: {...}, visible: {...} }
export const panelClose = { ... }

// BOTTOM NAV PILL
export const bottomNavPill = { ... }
```

### LazyMotion Configuration

```tsx
// In src/app/(shop)/layout.tsx — wrap children with:
import { LazyMotion, domAnimation } from 'framer-motion'

<LazyMotion features={domAnimation} strict>
  {children}
</LazyMotion>
```

## Files IN SCOPE

```
CREATE:
  src/lib/motion-variants.ts              → all motion variant definitions

MODIFY:
  src/app/(shop)/layout.tsx               → LazyMotion provider wrapper
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] motion-variants.ts compiles without errors
- [ ] LazyMotion wraps the shop layout
- [ ] `npx tsc --noEmit` passes
- [ ] No bundle size regression


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified: src/lib/motion-variants.ts (MODIFIED — expanded with full variant set)
Key changes:
  - Added heroHeadline, heroCTA, heroImage (page-load choreography, 0→400ms stagger)
  - Added viewportReveal, viewportRevealFromLeft, viewportRevealFromRight (spring stiffness:120 damping:24 mass:1.2)
  - Added cardContainer + cardItem (stagger 0.07s per child)
  - Added springBounce (stiffness:220 damping:18) + springGentle (stiffness:120 damping:24 mass:1.2)
  - Added bottomNavPill (spring stiffness:300 damping:22)
  - Added panelClose (distinct from panelOpen)
  - Retained all existing variants: fadeUp, eyebrowReveal, scaleIn, springPop, staggerContainer, staggerItem, slideInLeft, slideInRight, panelOpen
Issues found:
  - LazyMotion already at root app/layout.tsx via MotionProvider — shop layout does NOT need a second wrapper
  - ViewportReveal (ui/ViewportReveal.tsx) already existed — did NOT modify it (P11-S02 creates shared/ViewportReveal.tsx with expanded API)
  - Pre-existing TSC error: CategoryRow.tsx:73 — ignore
Next session should know:
  - motion-variants.ts is the canonical variants source — import from @/lib/motion-variants
  - LazyMotion provider is at root level (app/layout.tsx) — all m.* calls work throughout the app
  - P11-S02: create src/components/shared/ViewportReveal.tsx (variant-select + reduced-motion API)
```

---

*Session file for P11-S01.*
