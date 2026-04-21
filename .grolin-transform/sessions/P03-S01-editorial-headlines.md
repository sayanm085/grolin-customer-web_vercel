---
project: grolin
role: session
phase: P03
session: S01
window: W02
status: complete
---
# SESSION P03-S01 — EDITORIAL HEADLINE TREATMENT

## Session Identity
- **Phase**: P03 — Typography & Hierarchy System
- **Session**: S01 of 3
- **Title**: Editorial Headline Treatment
- **Status**: ⬜ Not Started

---

## Objective

Apply the editorial type scale to ALL section headings across the application. Every section heading should be ≥22px mobile / ≥28px desktop with 700-800 weight. Hero headline uses clamp(). Eyebrow labels (uppercase, tracking, purple) added where editorial structure is expected.

## Pre-Session Confirmation

> "I am executing P03-S01: Editorial Headlines. Files in scope: homepage section headings, page-level headings across all routes. className changes ONLY. No logic, no service imports."

## Implementation Focus

### Heading Classification

**Hero Headlines** (largest — brand statement):
- `clamp(34px, 5.5vw, 58px)`, weight 800, tracking -0.025em, leading 1.06-1.12
- Applied to: HeroLayered.tsx main heading

**Editorial Headlines** (section anchors — homepage sections):
- `clamp(28px, 4.5vw, 46px)`, weight 800, tracking -0.02em
- Applied to: Trust section, collection row headers, dark editorial section

**Section Headings** (content group titles):
- `22px` mobile → `28px` desktop, weight 700, tracking -0.015em
- Applied to: Category page titles, order page headers, profile sections, cart heading

**Eyebrow Labels** (above headings):
- `11px` mobile → `12px` desktop, weight 700, uppercase, tracking 0.08em, color: `--shop-primary`
- Applied above editorial and section headings where context hierarchy helps

### Where to Apply

```
src/components/home/HeroLayered.tsx        → hero headline
src/components/home/CollectionRow.tsx       → collection section headings  
src/components/home/TrustBar.tsx            → trust section heading
src/components/home/Editorial*.tsx          → editorial headings
src/app/(shop)/page.tsx                    → any page-level headings
src/app/(shop)/categories/page.tsx          → category page heading
src/app/(shop)/cart/page.tsx               → cart heading
src/app/(shop)/orders/page.tsx             → orders heading
src/app/(shop)/profile/page.tsx            → profile heading
src/app/(shop)/wallet/page.tsx             → wallet heading
```

### The Change Pattern

Find heading elements → update className to enforce the type scale. Example:
```
BEFORE: className="text-lg font-semibold"
AFTER:  className="text-[22px] md:text-[28px] font-bold tracking-[-0.015em] leading-[1.15]"
```

## Files IN SCOPE

```
MODIFY (className only):
  src/components/home/*.tsx             → section headings
  src/app/(shop)/**/page.tsx            → page-level headings
  src/app/(auth)/**/page.tsx            → auth page headings
  src/app/globals.css                   → .eyebrow, .headline-editorial, .section-heading utilities (if not already present)
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ src/app/api/** ❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] Section headings ≥22px on 375px mobile
- [ ] Section headings ≥28px on 1280px desktop  
- [ ] Hero headline uses clamp() with 800 weight
- [ ] No text overflow at 375px
- [ ] `npx tsc --noEmit` passes


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified:
  src/components/shared/PageHeader.tsx
  src/app/(shop)/cart/page.tsx
  src/app/(shop)/categories/[id]/page.tsx
  src/app/(shop)/not-found.tsx
  src/app/(shop)/products/page.tsx
  src/app/(shop)/products/[slug]/not-found.tsx
  src/app/(shop)/search/page.tsx
  src/app/(auth)/layout.tsx
  src/app/(auth)/login/page.tsx
  src/app/(auth)/new-user-setup/page.tsx
  src/app/(auth)/otp/page.tsx

Key changes:
  - All page/section h1/h2 headings upgraded from font-bold (700) → font-extrabold (800)
  - PageHeader.tsx eyebrow now uses .eyebrow utility class (--shop-primary color, 11px, uppercase)
  - PageHeader.tsx h1 tracking upgraded from tracking-tight → tracking-[-0.025em]
  - products/page.tsx h1 upgraded from text-2xl → text-[28px] sm:text-[32px] with proper tracking
  - search/page.tsx discovery h2 upgraded from 20px → 22px font-extrabold
  - categories/[id] h1 tracking upgraded to tracking-[-0.025em]
  - globals.css: existing .eyebrow, .section-heading, .headline-editorial utilities confirmed solid — no changes needed
  - HomeSectionHeader, SectionHeader, LocalTrustSection already use correct typography — no changes

Issues found:
  - Pre-existing TSC error in CategoryRow.tsx:73 (unchanged, documented)
  - Many profile/address/wallet/reviews pages still have gray-900 text and text-xl/text-2xl headings
    → These are auth-gated routes — flagged for P03-S03 (Chrome & Utility Text)

Next session (P03-S02) should know:
  - Section-level headings (HomeSectionHeader, SectionHeader) already use .section-heading utility —
    don't touch these, they're correct
  - Focus P03-S02 on CARD typography: product card names, prices, badge text, chips
  - profile/* routes still use old gray-900 text system — will need addressing in P03-S03
```

---

*Session file for P03-S01.*
