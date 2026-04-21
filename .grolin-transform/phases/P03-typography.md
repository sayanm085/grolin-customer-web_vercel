---
project: grolin
role: phase
phase: P03
window: W02
status: complete
---
# PHASE 03 — TYPOGRAPHY & HIERARCHY SYSTEM

## Phase Identity
- **Number**: 03
- **Name**: Typography & Hierarchy System
- **Status**: ⬜ Not Started
- **Dependencies**: P02 completed and approved

---

## Objective

Transform the typography across all surfaces to create clear authority in headlines, comfort in body text, and precision in commerce numbers. Apply the Plus Jakarta Sans type scale systematically to create visual hierarchy that communicates importance at a glance.

## Why This Phase Exists

Typography hierarchy is the #1 driver of perceived quality. Currently, section headings are 18-20px when they should be 24-32px. Body and heading weights are too similar. Nothing commands attention. This phase fixes the single biggest quality lever available.

## Scope Boundaries

- **IN SCOPE**: All text-related className changes across components and pages. Font size, weight, line-height, letter-spacing, text color adjustments.
- **OUT OF SCOPE**: Shadows, borders, backgrounds, layout structure, motion, interactions.
- **PHASE TYPE**: Typography className pass

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P03-S01-editorial-headlines.md` | Editorial Headlines | Section headings ≥22px with proper weight |
| S02 | `P03-S02-commerce-typography.md` | Commerce Typography | Card titles, prices, badges, chips |
| S03 | `P03-S03-chrome-utility-text.md` | Chrome & Utility Text | Nav labels, footer text, metadata |

## Type Scale Reference

| Element | Mobile | Desktop | Weight | Tracking |
|---------|--------|---------|--------|----------|
| Hero headline | clamp(34px, 5.5vw, 58px) | — | 800 | -0.025em |
| Editorial headline | clamp(28px, 4.5vw, 46px) | — | 800 | -0.02em |
| Section heading | 22px | 28px | 700 | -0.015em |
| Card heading | 15px | 17px | 700 | normal |
| Body text | 14px | 15px | 500 | normal |
| Eyebrow | 11px | 12px | 700 | 0.08em (uppercase) |
| Badge/chip | 10px | 11px | 700 | 0.04em |
| Price current | 16px | 18px | 800 | tabular-nums |
| Price original | 12px | 13px | 500 | tabular-nums |
| CTA button | 14px | 15px | 700 | 0.01em |
| Nav label | 10px | 11px | 600 | normal |

## In-Scope Files

```
MODIFY (className only):
  src/components/home/*.tsx           → section headings, hero text
  src/components/product/*.tsx        → card titles, prices, descriptions
  src/components/layout/*.tsx         → header text, footer text
  src/components/cart/*.tsx           → cart item text, totals
  src/components/checkout/*.tsx       → checkout text hierarchy
  src/components/order/*.tsx          → order text
  src/components/profile/*.tsx        → profile text
  src/components/wallet/*.tsx         → wallet text
  src/app/(shop)/**/page.tsx          → page-level headings
  src/app/(auth)/**/page.tsx          → auth page headings
  src/app/globals.css                 → typography utility classes if needed

READ REFERENCE:
  .grolin-transform/phases/P03-typography.md  → this file
  .grolin-transform/context/*                 → current state
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
❌  All *.service.ts  ❌  All *.query.ts
```

## Expected Outputs

1. All section headings use the editorial type scale
2. Product card text has clear hierarchy (name > price > description)
3. Navigation, footer, utility text properly sized
4. Consistent type hierarchy across all routes

## Risk Notes

- Over-large headings on mobile 375px — must verify at that breakpoint
- Commerce text (prices) must remain scannable — don't make decorative
- Changing font size can affect layout spacing — check for overflow

## Review Checklist

- [ ] Section headings ≥ 22px on mobile, ≥ 28px on desktop
- [ ] Hero headline uses clamp() with 800 weight
- [ ] Product card names are 15px/700 weight
- [ ] Prices use tabular-nums and proper emphasis
- [ ] Body text 14-15px at 500 weight
- [ ] Eyebrow labels 11px uppercase with tracking
- [ ] No text overflow or truncation issues at 375px
- [ ] Typography feels hierarchical — headlines command, body supports

## Completion Criteria

**This phase is complete when**:
1. Every text element follows the type scale
2. Hierarchy creates visual authority — headlines are clearly dominant
3. 375px layout is not broken by text sizing
4. Type consistency is present across all routes

## End-of-Phase Gate

Human approval required before proceeding to Phase 04.

---

*Phase file for P03. Read this before any session in Phase 03.*
