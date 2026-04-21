---
project: grolin
role: phase
phase: P13
window: W10
status: complete
date: 2026-03-29
---
# PHASE 13 — LOADING, EMPTY & TRANSITIONAL STATES

## Phase Identity
- **Number**: 13
- **Name**: Loading, Empty & Transitional States
- **Status**: ⬜ Not Started
- **Dependencies**: P03 and P04 completed

---

## Skills & Tools (MANDATORY)

| Tool | Usage | Reference |
|------|-------|-----------|
| **ui-ux-pro-max** §3 | Performance — CLS prevention, skeleton layout matching | `.agents/skills/ui-ux-pro-max/SKILL.md` |
| **ui-ux-pro-max** §8 | Forms & Feedback — error recovery, empty state UX | `.agents/skills/ui-ux-pro-max/SKILL.md` |
| **nano-banana-2** | Generate branded empty state illustrations (produce basket, search lens) | `.agents/skills/nano-banana-2/SKILL.md` |
| **ANIMATION_TOOLKIT.md** §6 | Warm shimmer CSS keyframes, skeleton animation patterns | `.claude/support/ANIMATION_TOOLKIT.md` |
| **Playwright MCP** | Screenshot each loading/empty state at both viewports | Automated viewport testing |
| **Figma MCP** | Reference Figma for skeleton layout dimensions and empty state designs | kumarmondalsouvik@gmail.com |

---

## Objective

Make secondary states — loading skeletons, empty results, error boundaries — feel as premium as the core UI. Users experience these states frequently; they shape perceived quality.

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P13-S01-skeletons-loading.md` | Skeletons & Loading | Warm ivory skeletons, layout-matched |
| S02 | `P13-S02-empty-error.md` | Empty & Error | Branded empty states, recoverable errors |

## Animation Standards for This Phase

### Skeleton Shimmer (from ANIMATION_TOOLKIT §6)
- Use warm ivory gradient: `linear-gradient(90deg, var(--shop-surface-subtle), #F5F1EC, var(--shop-surface-subtle))`
- Duration: 1500ms linear infinite
- Background-size: 200% 100%
- NEVER gray — always warm ivory tones matching the canvas

### State Transitions
- Skeleton → content: fade crossfade (200ms ease-out)
- Empty content: fade in with spring gentle (opacity + translateY 12px)
- Error state: immediate display (no animation — urgency conveys seriousness)

### Empty State Illustrations (nano-banana-2)
Generate using:
```bash
infsh app run google/gemini-3-1-flash-image-preview --input '{
  "prompt": "Cute illustrated empty grocery basket with a single leaf, warm ivory #F0ECE8 background, flat illustration style, no text, 512x512",
  "aspect_ratio": "1:1"
}'
```

## In-Scope Files

```
MODIFY:
  src/components/skeletons/*.tsx              → warm shimmer treatment
  src/components/shared/EmptyState.tsx        → branded empty design
  src/components/shared/ErrorBoundary.tsx     → error recovery
  src/app/globals.css                         → skeleton utility classes
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Completion Criteria

1. All skeletons use warm ivory shimmer (not gray) — ANIMATION_TOOLKIT §6 recipe
2. Skeleton layouts match real content layouts (no CLS — ui-ux-pro-max §3)
3. Empty states have personality and brand voice (not generic "No items found")
4. Empty states have nano-banana-2 generated illustrations (or quality emoji fallback)
5. Error states offer recovery actions (ui-ux-pro-max §8)
6. State transitions feel smooth and intentional (200ms crossfade)
7. Playwright screenshots verify each state at 375px + 1280px

## Playwright Verification

```bash
# Loading states (throttle network in DevTools first)
npx playwright screenshot --viewport-size="375,812" http://localhost:3001 p13-loading-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001 p13-loading-1280.png

# Empty cart
npx playwright screenshot --viewport-size="375,812" http://localhost:3001/cart p13-empty-cart-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001/cart p13-empty-cart-1280.png
```

---

*Phase file for P13. Uses nano-banana-2, ui-ux-pro-max §3/§8, ANIMATION_TOOLKIT §6, Playwright MCP, Figma MCP.*
