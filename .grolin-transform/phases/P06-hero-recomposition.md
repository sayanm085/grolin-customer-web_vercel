---
project: grolin
role: phase
phase: P06
window: W03
status: complete
---
# PHASE 06 — HOMEPAGE HERO RECOMPOSITION

## Phase Identity
- **Number**: 06
- **Name**: Homepage Hero Recomposition
- **Status**: ⬜ Not Started
- **Dependencies**: P05 completed and approved

---

## Objective

Rebuild the homepage hero into a true premium brand moment with layered depth composition, editorial headlines, strong CTA clarity, and intentional responsive behavior at both 375px and 1280px.

## Why This Phase Exists

The hero carries disproportionate weight in first-impression quality. It is the first thing users see. A premium hero with proper layering, atmospheric backgrounds, and editorial typography instantly communicates quality. The current hero is functional but not memorable.

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P06-S01-hero-layout.md` | Hero Layout | Layer architecture — background, subject, foreground |
| S02 | `P06-S02-hero-content.md` | Hero Content | Headlines, copy, CTA, trust cue |
| S03 | `P06-S03-hero-responsive.md` | Hero Responsive | Mobile-specific intentional composition |

## Hero Composition Model

```
LAYER 0: Background surface (mesh gradient + grain)
LAYER 1: Decorative elements (produce scatter, GROLIN watermark)
LAYER 2: Primary subject (hero basket image)
LAYER 3: Content (headline + description + CTA)
LAYER 4: Floating accents (trust chip, delivery badge)
```

## In-Scope Files

```
MODIFY:
  src/components/home/HeroLayered.tsx       → primary hero component
  src/components/home/BannerCarousel.tsx     → carousel container
  src/app/(shop)/page.tsx                   → hero section wrapper
  src/app/globals.css                       → hero-specific utilities

READ REFERENCE:
  /public/images/hero/*                     → available hero assets
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Completion Criteria

1. Hero creates a premium brand moment at first viewport
2. Clear depth layers are visible (background → subject → content)
3. CTA is immediately visible and prominent
4. Mobile hero is intentionally composed (not just squeezed desktop)
5. Hero loads without layout shift

---

*Phase file for P06.*
