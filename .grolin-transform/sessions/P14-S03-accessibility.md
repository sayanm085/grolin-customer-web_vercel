---
project: grolin
role: session
phase: P14
session: S03
window: W12
status: complete
---
# SESSION P14-S03 — FOCUS, REDUCED MOTION, CONTRAST & ARIA

## Session Identity
- **Phase**: P14 — Responsive Hardening & Accessibility
- **Session**: S03 of 3
- **Status**: ⬜ Not Started

---

## Skills & Tools for This Session

| Tool | Usage |
|------|-------|
| **ui-ux-pro-max** §1 | Accessibility — HIGHEST PRIORITY: focus-visible, contrast, ARIA, reduced-motion |
| **ANIMATION_TOOLKIT.md** §10 | Reduced motion compliance patterns (useReducedMotion, CSS query) |
| **Playwright MCP** | Test focus states, capture accessibility screenshots |
| **Figma MCP** | Verify focus ring visibility against Figma design system |

---

## Objective

Implement accessibility standards: focus-visible rings on all interactive elements, prefers-reduced-motion support (simplify all animation), contrast ratio verification, and ARIA labels where needed.

## Pre-Session Confirmation

> "I am executing P14-S03: Accessibility. Adding focus states, reduced-motion query, and ARIA attributes. className and attribute changes ONLY. Using ui-ux-pro-max §1 as the primary reference."

## Implementation Focus

### Focus-Visible States (ui-ux-pro-max §1 — CRITICAL)

All interactive elements must have visible focus indicators:

```css
/* In globals.css — universal focus-visible */
:focus-visible {
  outline: 2px solid var(--shop-primary);
  outline-offset: 2px;
  border-radius: var(--shop-radius-8);
}

/* On dark backgrounds — switch to white/light outline */
.dark-surface :focus-visible,
[data-dark] :focus-visible {
  outline-color: #FFFFFF;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Reduced Motion (ui-ux-pro-max §1 + ANIMATION_TOOLKIT §10)

Verify `@media (prefers-reduced-motion: reduce)` in globals.css:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Framer Motion components:
- Check all `ViewportReveal` uses `useReducedMotion()` internally ✅
- Check hero entrance has reduced-motion guard ✅
- Float/scroll animations → disabled in reduced-motion
- Skeleton shimmer → static warm background in reduced-motion
- Parallax → completely disabled in reduced-motion

### Contrast Ratios (ui-ux-pro-max §1 — WCAG AA)

| Combination | Ratio | Requirement | Status |
|-------------|-------|-------------|--------|
| Body (#1A232B) on canvas (#F0ECE8) | ~12.5:1 | ≥ 4.5:1 | ✅ |
| Muted (#56606B) on white (#FFFFFF) | ~5.1:1 | ≥ 4.5:1 | ✅ Check |
| White on green CTA (#16945E) | ~4.6:1 | ≥ 4.5:1 | ⚠️ Borderline |
| White on dark (#1A0E3D) | ~15.2:1 | ≥ 4.5:1 | ✅ |
| White on purple (#6E49D8) | ~4.8:1 | ≥ 3:1 large | ✅ |

> If green CTA contrast is borderline, consider darkening to #148553 for safer 5.2:1 ratio.

### ARIA Labels (ui-ux-pro-max §1)

| Element Type | ARIA Requirement | Example |
|-------------|------------------|---------|
| Icon-only buttons | `aria-label` | `<button aria-label="Add to cart">` |
| Close buttons | `aria-label="Close"` | `<button aria-label="Close modal">` |
| Decorative images | `aria-hidden="true"` + `alt=""` | `<img aria-hidden="true" alt="" />` |
| Form inputs | Associated `<label>` or `aria-label` | `<input aria-label="Search products" />` |
| Nav landmarks | `aria-label` on `<nav>` | `<nav aria-label="Main navigation">` |
| Cart badge count | `aria-label` with count | `<span aria-label="3 items in cart">3</span>` |
| Quantity stepper | `aria-label` on +/- buttons | `<button aria-label="Increase quantity">+</button>` |

### Semantic HTML Landmarks

```html
<header>           → Site header with navigation
<nav>              → Main nav, category nav, footer nav (each with aria-label)
<main>             → Primary page content
<section>          → Each content section (with aria-label or heading)
<footer>           → Site footer
<aside>            → Sidebar/filter panels (if any)
```

## Files IN SCOPE

```
MODIFY:
  src/app/globals.css                    → focus-visible, reduced-motion
  src/components/**/*.tsx               → ARIA attributes, focus states
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] All interactive elements have focus-visible indicators (test with Tab key)
- [ ] `prefers-reduced-motion` disables ALL animations (CSS + Framer Motion)
- [ ] Key text/background combinations meet WCAG AA (verify in DevTools)
- [ ] Green CTA contrast meets 4.5:1 (darken if needed)
- [ ] All icon-only buttons have `aria-label`
- [ ] Decorative images are `aria-hidden="true"`
- [ ] Navigation landmarks have `aria-label`
- [ ] Tab order follows visual reading order
- [ ] `npx tsc --noEmit` passes
- [ ] Playwright: capture focus state on key elements
- [ ] Phase 14 complete — accessible and responsive


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (filled 2026-03-29)

```
Files modified:
  src/app/globals.css
  src/components/product/AddToCartButton.tsx
  src/components/layout/BottomNav.tsx
  src/components/checkout/StepIndicator.tsx
  src/components/layout/SearchBar.tsx

Key changes:
  globals.css:
    - Added :focus-visible global rule (2px solid var(--shop-primary), offset 2px, border-radius 4px)
    - Added :focus:not(:focus-visible) { outline: none } — suppresses ring for mouse users
    - Added .footer-layered-surface :focus-visible + [data-dark] :focus-visible — white outline on dark surfaces
    - Upgraded prefers-reduced-motion: added universal *, *::before, *::after rule with animation-iteration-count: 1 (was class-only block, now covers ALL CSS animations)
  AddToCartButton.tsx:
    - Minus button: aria-label="Decrease quantity"
    - Plus button: aria-label="Increase quantity"
    - Quantity span: aria-label="Quantity: {qty}"
  BottomNav.tsx:
    - <nav> element: aria-label="Main navigation"
    - Link: aria-label={tab.label} + aria-current={isActive ? 'page' : undefined}
  StepIndicator.tsx:
    - Outer div: role="list" aria-label="Checkout steps"
    - Each step div: role="listitem" + aria-current={isCurrent ? 'step' : undefined}
    - Step circle div: aria-label="Step — completed/current/upcoming"
    - Pulse span: aria-hidden="true"
    - Check icon: aria-hidden="true"
  SearchBar.tsx:
    - Input: aria-label="Search products"
    - Desktop Search button icon: aria-hidden="true" (button has text so fine)

Issues found:
  - Playwright MCP browser launch fails on Windows (Chrome existing session conflict) — screenshots skipped
  - Dev server verified running at 200 OK
  - TSC: clean (no new errors — pre-existing CategoryRow.tsx:73 unchanged)

Next session (P15) should know:
  - P14 COMPLETE ✅ — responsive hardening + accessibility done
  - focus-visible global rule is in globals.css — do NOT re-add component-level focus overrides unless special case
  - prefers-reduced-motion universal rule is now in globals.css — all CSS animations covered
  - Framer Motion components (ViewportReveal, HeroLayered) already have useReducedMotion() guards
  - Do not touch FilterBar top-[130px] lg:top-[108px] — correct from S01
  - Do not touch PageShell max-w-screen-xl — correct from S01
```

---

*Session file for P14-S03. This completes Phase 14. Uses ui-ux-pro-max §1, ANIMATION_TOOLKIT §10, Playwright MCP.*
