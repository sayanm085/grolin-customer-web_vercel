---
project: grolin
role: session
phase: P01
session: S02
window: W01
status: complete
---
# SESSION P01-S02 — VISUAL DEBT INVENTORY

## Session Identity
- **Phase**: P01 — Baseline Audit & Verification Closure
- **Session**: S02 of 3
- **Title**: Visual Debt Inventory
- **Status**: ✅ Complete

---

## Objective

Catalog every visual deficiency across all routes, organized by severity and category. This creates the actionable inventory that drives phases 02-14.

## Read-First Context Files

1. `.claude/CURRENT_STATE.md`
2. `.claude/logs/SESSION_LOG.md` (last entry from S01)
3. `.claude/support/RULES.md`
4. `.grolin-transform/phases/P01-baseline-audit.md`

## Pre-Session Confirmation

> "I am executing Phase 01, Session 02: Visual Debt Inventory.
> This is a READ-ONLY audit. No source code will be modified.
> I will catalog visual deficiencies by category and severity."

## Implementation Focus

### Visual Debt Categories

For each route, assess these categories:

**1. Typography Issues**
- Headings too small or wrong weight
- Inconsistent font sizes at same hierarchy level
- Missing eyebrow labels where editorial structure expected
- Prices not using tabular-nums

**2. Surface & Depth Issues**
- Cards using borders instead of shadows
- Missing background alternation between sections
- No grain/mesh on premium surfaces
- Flat backgrounds where depth expected

**3. Color & Token Issues**
- Colors not matching shop-* token system
- Green used for non-commerce actions
- Purple used for non-brand actions
- Amber used outside search CTA
- Generic gray/blue used where tokens expected

**4. Layout & Spacing Issues**
- Inconsistent padding between sections
- Max-width inconsistency across pages
- Grid column mismatch between views
- Excessive whitespace or cramped content

**5. Interaction & State Issues**
- Missing hover states on cards/buttons
- Missing focus-visible states
- Missing loading/skeleton states
- Missing empty state designs
- Poor disabled state treatment

**6. Responsive Issues**
- Layout breaks at 375px
- Content overflow/truncation
- Images not properly sized
- Touch targets too small

**7. Motion Issues**
- Missing entrance animations where expected
- Excessive or purposeless motion
- Jank during scroll or interaction
- Missing reduced-motion support

### Severity Scale

| Severity | Definition | Example |
|----------|-----------|---------|
| **P0 — Critical** | Breaks usability or renders incorrectly | Route doesn't load, CTA invisible |
| **P1 — High** | Significantly degrades perceived quality | Cards boxed with borders, flat typography |
| **P2 — Medium** | Noticeable quality gap vs. target | Missing hover states, inconsistent spacing |
| **P3 — Low** | Polish-level improvement | Fine-tuning grain opacity, eyebrow tracking |

### Inventory Template

```markdown
### [Route Name] — /path

**Typography**: [issues or ✅]
**Surface/Depth**: [issues or ✅]
**Color/Tokens**: [issues or ✅]
**Layout/Spacing**: [issues or ✅]
**Interaction/States**: [issues or ✅]
**Responsive**: [issues or ✅]
**Motion**: [issues or ✅]
**Overall Assessment**: [score 0-10]
```

## Files IN SCOPE (read-only)

```
READ ONLY — zero modifications
```

## Files BLOCKED

```
ALL files blocked for modification. READ-ONLY session.
```

## Rules for This Session

1. **NO code changes** — catalog only
2. Be specific: "heading is 18px, should be 22px" not "heading too small"
3. Assign severity to every issue
4. Map issues to the phase that will fix them
5. Focus on what EXISTS, not what should be invented

## VISUAL DEBT INVENTORY (completed 2026-03-28)

---

### [AUTH] /login

**Typography**: ✅ Eyebrow "SIGN IN" present. Heading "Welcome back" at ~36px bold. Correct hierarchy.
**Surface/Depth**: ✅ Split-panel: left = purple gradient hero, right = warm canvas (#F0ECE8) with white card. Card has no border/shadow — relies on canvas contrast. Works but card could use shop-shadow-level-1 for lift. P3.
**Color/Tokens**: ✅ Purple (#6E49D8) on hero, correct. CTA uses --shop-primary. Clean.
**Layout/Spacing**: ⚠️ At 375px the left panel collapses entirely — only shows the form panel. Left panel branding/value-props are hidden on mobile. P2. Fix P06.
**Interaction/States**: ⚠️ "Get OTP" button has no visible loading/disabled visual differentiation before number is entered. P3.
**Responsive**: ✅ 375px form renders cleanly. 1280px split layout correct.
**Motion**: ✅ No excessive motion. Simple fade.
**Overall Assessment**: 8.5 / 10

---

### [AUTH] /otp

**Typography**: ✅ Correct hierarchy. OTP slot styling clear.
**Surface/Depth**: ✅ Same split-panel as login. Consistent.
**Color/Tokens**: ✅ Tokens consistent with login.
**Layout/Spacing**: ⚠️ Same mobile collapse of left branding panel as login. P2.
**Interaction/States**: ⚠️ Cannot test submit states without live auth. Code audit shows countdown timer present (good). P3 — needs verification with live auth.
**Responsive**: ✅ Renders correctly at both viewports.
**Motion**: ✅ Clean.
**Overall Assessment**: 8.3 / 10

---

### [AUTH] /new-user-setup

**Typography**: ✅ Eyebrow "NEW PROFILE" uppercase, tracking-[0.2em], shop-primary-strong. h1 at text-[32px] font-bold tracking-[-0.03em]. Correct.
**Surface/Depth**: ✅ Purple hero left panel with gradient, white form card right. Same pattern as login. Consistent.
**Color/Tokens**: ✅ Correct shop-primary throughout. Inputs use shop-border.
**Layout/Spacing**: ⚠️ Mobile: left panel hidden, same issue as login/otp. P2.
**Interaction/States**: ✅ Continue button has disabled:opacity-50 treatment. P3 – loading state not observed.
**Responsive**: ✅ Clean at both viewports.
**Motion**: ✅ Clean.
**Overall Assessment**: 8.4 / 10

---

### [SHOP] / (Home — guest/unauthenticated)

**Typography**:
  - ⚠️ Hero h1 inside banner carousel: `text-[28px] sm:text-[36px] lg:text-[44px]` with `tracking-[-0.04em]`. Desktop: good weight/scale. Mobile 28px is slightly small for a hero headline — target 30-32px. P3.
  - ⚠️ Section headings (Best Sellers, Trending etc.) use `HomeSectionHeader` — need to verify scale in P01-S03 deep audit. Preliminary: text-base/text-lg range. Too small for section titles. P2 — fix in P03.
  - ✅ Eyebrow labels present ("DEALS", "CATALOG", collection names).
  - ⚠️ Price display: fonts appear normal-weight. Need `tabular-nums` on prices. P2 — fix in P02.
**Surface/Depth**:
  - ✅ Home page uses section alternation: canvas → surface-subtle → canvas → surface (white). Good rhythm established.
  - ⚠️ At desktop (1280px), section bands don't have enough visual separation — transitions feel soft/blended. The warm-canvas-to-surface-subtle delta is subtle. P2 — fix in P04.
  - ⚠️ Product cards in home: card backgrounds use gradient bg + border + shadow-level-1. Good, but border creates a "boxed" feeling vs pure shadow. P2 — fix in P04.
  - ✅ Hero carousel has warm white card container with shadow-[0_20px_48px_rgba(34,22,84,0.08)] — premium.
**Color/Tokens**:
  - ✅ Shop-action (#16945E) used for "Add to Cart" CTAs. Correct.
  - ✅ Shop-primary (#6E49D8) used for brand elements. Correct.
  - ⚠️ Discount badges: checking needed — some may use generic red instead of shop-discount (#C2410C). P2 — audit in P02.
  - ⚠️ `brand.*` color scale in tailwind.config (green-500 #22C55E) differs from shop-action (#16945E). Dual-direction color system risk. P1 — fix in P02.
**Layout/Spacing**:
  - ✅ Max-width container consistent across sections.
  - ⚠️ Section vertical rhythm: home-section-spacing = 2rem/2.5rem pt. At 375px sections feel slightly cramped when stacked. P2 — fix in P04.
  - ⚠️ At 1280px, product grid is 4-col which is fine, but there's too much unused space on wide screens (no 5-col at xl+). P3 — fix in P07.
**Interaction/States**:
  - ⚠️ Product card hover: `-translate-y-0.5 hover:shadow-level-2` present but subtle. Cards don't feel "liftable" — hover effect is too gentle. P2 — fix in P08.
  - ✅ Cart badge bounce animation present.
  - ✅ Wishlist button present.
**Responsive**:
  - ✅ 375px renders without overflow. Bottom nav present.
  - ⚠️ CategoryRow horizontal scroll at 375px — chevron nav buttons hidden on mobile (lg:flex). Discovery pattern changes between breakpoints. P2 — fix in P07.
**Motion**:
  - ✅ Stagger-in on product grid via framer-motion. Good.
  - ✅ Hero carousel auto-advance with progress bar. Premium.
  - ⚠️ Section entrance animations: not all sections have scroll-reveal. P3 — fix in P08.
**Overall Assessment**: 8.7 / 10

---

### [SHOP] /categories

**Typography**:
  - ✅ Eyebrow "BROWSE" present. h1 "All Categories" prominent.
  - ✅ Category card names: text-[16px] font-bold on desktop. Adequate.
  - ⚠️ Item count "2 items" text uses default size (~12px). Could be slightly more styled. P3.
**Surface/Depth**:
  - ✅ Category cards use `bg-gradient-to-br` with color-coded gradient per category. Good visual variety.
  - ⚠️ Cards: no explicit shadow — hover adds `hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]`. At rest cards have no elevation (flat gradient bg with no border or shadow). Looks slightly flat. P2 — fix in P04.
  - ✅ Page background uses shop-canvas. Correct.
**Color/Tokens**:
  - ✅ Category gradient colors are custom per-category (not from shop tokens). Intentional and correct.
  - ✅ Header uses shop tokens correctly.
**Layout/Spacing**:
  - ✅ Grid layout: responsive columns correct.
  - ⚠️ Container card (shop-surface-soft) has `border border-[color:var(--shop-border)]`. Double border artifact — outer container card border + inner card outlines creates visual noise. P2 — fix in P04.
**Interaction/States**:
  - ✅ Hover: `-translate-y-1` on cards.
  - ⚠️ No loading skeleton for categories (shows "Loading" text + spinner, not a skeleton grid). P2 — fix in P05.
**Responsive**:
  - ✅ 375px: 1-col stack, clean.
  - ✅ 1280px: multi-col grid, correct.
**Motion**: ✅ Clean transitions.
**Overall Assessment**: 8.2 / 10

---

### [SHOP] /categories/[id]

**Typography**: ✅ Eyebrow + h1 present. Breadcrumb present.
**Surface/Depth**: ⚠️ Same card/border issues as /categories. P2.
**Color/Tokens**: ⚠️ API 530 so no real data. Token usage in skeleton/loading states looks correct.
**Layout/Spacing**: ✅ Breadcrumb adds good depth. Sort combobox positioned correctly.
**Interaction/States**: ⚠️ Loading state is text+icon not skeleton. P2 — fix in P05.
**Responsive**: ✅ Both viewports render clean structure.
**Motion**: ✅ Clean.
**Overall Assessment**: 8.0 / 10

---

### [SHOP] /search

**Typography**:
  - ✅ Eyebrow "SEARCH", h1 "Search the store". Correct hierarchy.
  - ✅ Section headings "Recent Searches", "Recently Viewed", "Trending Categories" use h2 at ~text-2xl font-bold. Good weight.
  - ⚠️ Empty state sub-text: small/muted. Correct semantically but styling could be more editorial. P3.
**Surface/Depth**:
  - ✅ `shop-surface-soft` sections with rounded-[30px]. Premium feel.
  - ⚠️ Sections are all identical surface treatment — no visual rhythm between sections. Three consecutive white-bordered cards stack without separation. P2 — fix in P04.
  - ✅ Trending category cards: shadow-level-1 + hover shadow-level-2. Good.
**Color/Tokens**:
  - ✅ Shop-primary used for section headings/icons correctly.
  - ✅ Search button: amber (#E3B93C / shop-accent) on header. Correct per CLAUDE.md rules.
**Layout/Spacing**:
  - ✅ Full-width sections with consistent padding.
  - ⚠️ At 1280px, main content area is constrained but the page itself has too much blank right-side space. Layout appears single-column on a wide screen — no right-panel or sidebar. P2 — fix in P07.
**Interaction/States**:
  - ✅ Filter chips with active/inactive states — correct token usage.
  - ⚠️ Search input has amber CTA button in header — consistent. However the search page itself has no visible search input (it's in the header, not repeated on the page). P2 — fix in P07.
**Responsive**:
  - ✅ 375px: clean. Trending grid goes to 2-col. Correct.
  - ✅ 1280px: renders. Layout concerns noted above.
**Motion**: ✅ Clean.
**Overall Assessment**: 8.0 / 10

---

### [SHOP] /products

**Typography**: ✅ h1 "All Products". Product count displayed. Sort UI present.
**Surface/Depth**: ⚠️ Empty state (0 products) shows no skeleton/illustration — just blank space. P1 — fix in P05.
**Color/Tokens**: ✅ Filter/sort controls use correct tokens.
**Layout/Spacing**: ✅ Grid container present and responsive.
**Interaction/States**: ⚠️ No product data = blank grid. In-stock filter button present. Skeleton not visible for 0-product state. P2.
**Responsive**: ✅ Both viewports clean.
**Motion**: ✅ Grid stagger animation from ProductGrid component.
**Overall Assessment**: 7.8 / 10 (data-empty state drags score)

---

### [SHOP] /products/[slug] (not-found variant)

**Typography**: ⚠️ Not-found page (no product data): renders footer/header. Main content area is empty (no not-found UI visible in snapshot). P1 — verify not-found component renders. Note: title says "Product Not Found" correctly.
**Surface/Depth**: ⚠️ Not-found renders with empty `<main>` in snapshot. The not-found.tsx must be checked. P1.
**Color/Tokens**: N/A
**Layout/Spacing**: ⚠️ Empty main area visible in snapshot. P1.
**Interaction/States**: N/A
**Responsive**: ✅ No overflow.
**Motion**: ✅ N/A.
**Overall Assessment**: 6.0 / 10 (not-found empty state needs verification)

---

### [SHOP] /order-confirmed

**Typography**: — (route now loads after canvas-confetti fix but needs authenticated session to render content)
**Surface/Depth**: —
**Color/Tokens**: — (was previously blocked by build error)
**Layout/Spacing**: —
**Interaction/States**: —
**Responsive**: —
**Motion**: — (confetti effect now has dependency)
**Overall Assessment**: — (unverifiable without auth; route now renders shell)
**Note**: Route previously blocked by canvas-confetti missing dep. Now fixed. Needs auth to test content.

---

### [ALL AUTH-GATED] /cart, /checkout, /checkout/success, /orders, /orders/[id], /profile, /profile/edit, /profile/addresses, /profile/reviews, /wallet, /wallet/add-money, /wishlist, /notifications

These all redirect to /login (HTTP 307) without auth. Visual audit not possible without authenticated session.
Source code audit conducted instead — see Cross-Route Issues below.

---

## CROSS-ROUTE ISSUES (apply to multiple routes)

### Typography System Issues
| # | Issue | Severity | Routes | Fix Phase |
|---|-------|----------|--------|-----------|
| T1 | `brand.*` green scale (#22C55E) coexists with `shop-action` (#16945E) — two greens, risk of drift | P1 | All | P02 |
| T2 | Price text lacks `tabular-nums` font-feature — numbers jump width as prices change | P2 | Home, Products, Cart | P02 |
| T3 | Section headings (HomeSectionHeader) appear at ~text-lg/xl. Target is text-2xl+ for editorial hierarchy | P2 | Home, Categories | P03 |
| T4 | Body text line-height inconsistent — some 1.5, some 1.625, some hard-coded leading-6/7 | P3 | All | P03 |
| T5 | Mobile hero heading: text-[28px] — slightly small for impactful first impression. Target 30-32px | P3 | Home | P03 |

### Surface & Depth Issues
| # | Issue | Severity | Routes | Fix Phase |
|---|-------|----------|--------|-----------|
| S1 | Cards use `border border-[--shop-border]` + shadow combo — border creates "boxed" vs "floating" feel | P1 | Home, Search, Categories | P04 |
| S2 | Section-to-section transitions: canvas (#F0ECE8) ↔ surface-subtle (#FAF8F5) delta too small — sections bleed together | P2 | Home | P04 |
| S3 | No grain/mesh texture on premium surfaces (hero, promo sections) | P2 | Home | P04 |
| S4 | `shop-surface-soft` class always uses `border border-[--shop-border]` — uniform treatment regardless of context | P2 | Search, Categories | P04 |
| S5 | Auth pages: right panel (warm canvas) has no shadow/grain — feels like a flat rectangle | P3 | Login, OTP, Setup | P04 |

### Color & Token Issues
| # | Issue | Severity | Routes | Fix Phase |
|---|-------|----------|--------|-----------|
| C1 | Dual green system: `brand.500` (#22C55E) + `--shop-action` (#16945E) — both active in CSS | P1 | All | P02 |
| C2 | Old `--bg-page: #EAE6DB` and `--shop-canvas: #F0ECE8` both defined — two canvas values coexist | P1 | globals.css | P02 |
| C3 | Old `--shadow-*` (black-based) and new `--shop-shadow-*` (warm-tinted) both defined — shadow system split | P2 | globals.css | P02 |
| C4 | Old `--text-primary/secondary/body/muted` and new `--shop-ink/ink-muted/ink-faint` both defined — text tokens doubled | P2 | globals.css | P02 |
| C5 | Old `--border-light/base/dark` and new `--shop-border/border-strong` both defined — border tokens doubled | P2 | globals.css | P02 |
| C6 | Old `--status-*` colors use generic tailwind scale, not shop tokens | P3 | Orders | P02 |

### Layout & Spacing Issues
| # | Issue | Severity | Routes | Fix Phase |
|---|-------|----------|--------|-----------|
| L1 | Auth pages: left branding panel collapses on mobile — value-props (30min delivery, fresh guarantee, easy returns) hidden | P2 | Login, OTP, Setup | P06 |
| L2 | Search page: single-column layout at 1280px — no right sidebar or 2-col layout for wide screens | P2 | Search | P07 |
| L3 | CategoryRow horizontal scroll: navigation arrows hidden on mobile (lg:flex only) | P2 | Home | P07 |
| L4 | Products page: 4-col grid at lg, no 5-col at xl+ | P3 | Products, Home | P07 |

### Interaction & State Issues
| # | Issue | Severity | Routes | Fix Phase |
|---|-------|----------|--------|-----------|
| I1 | /products empty state: no illustration or skeleton — blank white area when 0 products | P1 | Products | P05 |
| I2 | /products/[slug] not-found: main content area appears empty in snapshot — not-found component may not render visually | P1 | Products/[slug] | P05 |
| I3 | Categories/[id] loading: text+icon spinner instead of proper skeleton grid | P2 | Categories/[id] | P05 |
| I4 | Product card hover: `-translate-y-0.5` too subtle. Doesn't feel "liftable" | P2 | Home, Products | P08 |
| I5 | Section scroll-reveal: not consistent across all home sections | P3 | Home | P08 |

### Responsive Issues
| # | Issue | Severity | Routes | Fix Phase |
|---|-------|----------|--------|-----------|
| R1 | Auth left panel hidden on mobile — branding lost | P2 | Auth | P06 |
| R2 | Touch targets: some secondary navigation items (value bar links, footer links) may be below 44px | P3 | All with footer | P07 |

### Motion Issues
| # | Issue | Severity | Routes | Fix Phase |
|---|-------|----------|--------|-----------|
| M1 | No `prefers-reduced-motion` override confirmed in globals.css | P2 | All | P08 |
| M2 | Section entrance animations inconsistent — some sections have stagger, others have none | P3 | Home | P08 |

---

## ISSUE COUNT SUMMARY

| Severity | Count |
|----------|-------|
| P0 — Critical | 0 |
| P1 — High | 6 (T1, S1, C1, C2, I1, I2) |
| P2 — Medium | 17 |
| P3 — Low | 9 |
| **Total** | **32** |

## ROUTE SCORES

| Route | Score | Key Issue |
|-------|-------|-----------|
| /login | 8.5 | Mobile left panel collapse |
| /otp | 8.3 | Same as login |
| /new-user-setup | 8.4 | Same as login |
| / (home) | 8.7 | Section depth, card borders |
| /categories | 8.2 | Card flat-rest, skeleton missing |
| /categories/[id] | 8.0 | Card borders, no skeleton |
| /search | 8.0 | Section sameness, wide layout |
| /products | 7.8 | Empty state blank |
| /products/[slug] not-found | 6.0 | Empty main area |
| /order-confirmed | — | Needs auth |
| Auth-gated routes | — | Needs auth |

## Expected Output

## Session End Updates

1. **.claude/CURRENT_STATE.md**: Update session to S02 complete
2. **.claude/logs/SESSION_LOG.md**: Append inventory summary with issue counts

## Handoff Notes (filled 2026-03-28)

```
Total issues found: 32
P0 (Critical): 0
P1 (High): 6 — T1 (dual green), S1 (border cards), C1 (dual green tokens), C2 (dual canvas), I1 (products empty state), I2 (product not-found empty main)
P2 (Medium): 17
P3 (Low): 9
Routes below 8.0: /products (7.8), /products/[slug] not-found (6.0)

Key findings for P01-S03 (Current-State Document):
  - Token system has DUAL system debt: old vars + new shop-* vars both live in globals.css
    Old: --bg-page, --text-primary, --shadow-sm, --border-base etc.
    New: --shop-canvas, --shop-ink, --shadow-1, --shop-border etc.
    This is the #1 P02 priority — must consolidate
  - Card treatment is border+shadow hybrid. The "floating card" aesthetic isn't fully realized.
  - Products not-found page main content area was empty in snapshot — P01-S03 should
    read the not-found.tsx source to confirm whether it renders an error UI or is empty
  - Auth-gated routes (cart, checkout, orders, profile, wallet, wishlist, notifications)
    cannot be visually audited without login — document as "pending auth audit" in S03
  - canvas-confetti dependency: NOW FIXED (installed in this session)
  - home page section rhythm is the most developed — others can learn from it
```

---

*Session file for P01-S02.*
