---
project: grolin
role: phase
phase: P05
window: W03
status: complete
---
# PHASE 05 — STRUCTURAL PRIMITIVES & LAYOUT UNIFICATION

## Phase Identity
- **Number**: 05
- **Name**: Structural Primitives & Layout Unification
- **Status**: ⬜ Not Started
- **Dependencies**: P04 completed and approved

---

## Objective

Create reusable page-structure components that enforce consistent max-width, gutters, vertical spacing, and heading patterns across all sections. These primitives are the structural skeleton that prevents layout drift.

## Why This Phase Exists

Without shared structural primitives, each homepage section and page reinvents its own geometry — different paddings, different max-widths, different heading patterns. This creates subtle visual inconsistency. Primitives enforce the grid system.

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P05-S01-wrapper-heading.md` | Wrapper & Heading | Create SectionWrapper + SectionHeading |
| S02 | `P05-S02-promo-trust.md` | Promo & Trust | Create PromoBand + TrustCard |
| S03 | `P05-S03-grid-spacing.md` | Grid & Spacing | Standardize grid system and breathing room |

## Structural Primitive Specs

### SectionWrapper
- Max-width: `max-w-screen-xl` (1280px)
- Horizontal padding: `px-4 md:px-8`
- Vertical padding: `py-8 md:py-12`
- Accepts: background variant prop (warm/white/subtle/dark)
- Accepts: optional divider/separator

### SectionHeading
- Eyebrow: 11px uppercase purple, tracking 0.08em
- Title: 22-28px, weight 700, tight leading
- Subtitle: optional, 14px muted
- Right action: optional link/button

## In-Scope Files

```
CREATE (new files):
  src/components/shared/SectionWrapper.tsx
  src/components/shared/SectionHeading.tsx
  src/components/shared/PromoBand.tsx
  src/components/shared/TrustCard.tsx

MODIFY:
  src/app/(shop)/page.tsx            → apply wrappers to homepage sections
  src/app/globals.css                → any structural utility classes
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Completion Criteria

1. SectionWrapper and SectionHeading exist and render correctly
2. PromoBand and TrustCard support all content patterns
3. Homepage sections use consistent spacing through wrappers
4. No layout regressions

---

*Phase file for P05.*
