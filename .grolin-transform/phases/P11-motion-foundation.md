---
project: grolin
role: phase
phase: P11
window: W06
status: complete
---
# PHASE 11 — MOTION SYSTEM FOUNDATION

## Phase Identity
- **Number**: 11
- **Name**: Motion System Foundation
- **Status**: ✅ Complete (2026-03-28, W07)
- **Dependencies**: P10 completed and approved

---

## Objective

Create the reusable motion library, configure LazyMotion for bundle efficiency, and build the ViewportReveal wrapper component. This establishes the motion infrastructure that Phase 12 will choreograph.

## Why This Phase Exists

Motion without a system creates inconsistency and integration debt. Having a shared variants file and a reusable reveal component means motion is applied consistently everywhere, with correct physics and performance guarantees.

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P11-S01-variants-lazymotion.md` | Variants & LazyMotion | Create motion-variants.ts + LazyMotion config |
| S02 | `P11-S02-viewport-reveal.md` | ViewportReveal | Create ViewportReveal wrapper + interaction primitives |

## In-Scope Files

```
CREATE:
  src/lib/motion-variants.ts                → all motion variant definitions
  src/components/shared/ViewportReveal.tsx   → scroll-triggered reveal wrapper

MODIFY:
  src/app/(shop)/layout.tsx                 → LazyMotion provider (if not present)
  src/app/globals.css                       → reduced-motion media query
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Completion Criteria

1. `motion-variants.ts` contains all animation categories with correct spring physics
2. LazyMotion is configured at layout level with `domAnimation`
3. ViewportReveal fires once on scroll (not re-triggering)
4. `prefers-reduced-motion` is respected
5. No bundle size regression from motion setup

---

*Phase file for P11.*
