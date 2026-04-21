---
project: grolin
role: phase
phase: P14
window: W11-W12
status: planned
---
# PHASE 14 — RESPONSIVE HARDENING & ACCESSIBILITY

## Phase Identity
- **Number**: 14
- **Name**: Responsive Hardening & Accessibility
- **Status**: ⬜ Not Started
- **Dependencies**: P01-P13 all completed

---

## Skills & Tools (MANDATORY)

| Tool | Usage | Reference |
|------|-------|-----------|
| **ui-ux-pro-max** §1 | Accessibility — HIGHEST PRIORITY: focus-visible, contrast, ARIA, reduced-motion | `.agents/skills/ui-ux-pro-max/SKILL.md` |
| **ui-ux-pro-max** §2 | Touch & Interaction — tap targets ≥ 44px, gesture feedback, safe areas | `.agents/skills/ui-ux-pro-max/SKILL.md` |
| **ui-ux-pro-max** §5 | Layout & Responsive — mobile-first, fluid typography, breakpoint rules | `.agents/skills/ui-ux-pro-max/SKILL.md` |
| **Playwright MCP** | Automated screenshot matrix at 375px, 768px, 1280px, 1440px for ALL routes | Automated viewport testing |
| **Figma MCP** | Cross-reference responsive breakpoints with Figma design specs | kumarmondalsouvik@gmail.com |
| **ANIMATION_TOOLKIT.md** §10 | Reduced motion compliance patterns | `.claude/support/ANIMATION_TOOLKIT.md` |

---

## Objective

Ensure premium quality survives all viewport conditions and accessibility modes. Verify every surface at 375px, 768px, and 1280px. Implement focus-visible states, comfortable tap targets, reduced-motion support, and adequate contrast ratios.

## Accessibility Standards (from ui-ux-pro-max §1 — CRITICAL)

### Focus-Visible
- All interactive elements: `outline: 2px solid var(--shop-primary); outline-offset: 2px;`
- Focus ring must be visible on ALL backgrounds (light and dark)
- Tab order follows visual reading order

### Contrast (WCAG AA)
- Body text (#1A232B) on canvas (#F0ECE8): ≥ 4.5:1
- Muted text (#56606B) on white (#FFFFFF): ≥ 4.5:1
- White text on green CTA (#16945E): ≥ 4.5:1
- White text on dark (#1A0E3D): ≥ 4.5:1

### Touch Targets (ui-ux-pro-max §2)
- ALL interactive elements: minimum 44x44px touch area
- Check: buttons, links, steppers, chips, nav items, checkboxes
- Use padding to extend touch area (NOT visible size increase)

### Reduced Motion (ui-ux-pro-max §1 + ANIMATION_TOOLKIT §10)
- CSS: `@media (prefers-reduced-motion: reduce)` disables ALL CSS animations
- Framer Motion: `useReducedMotion()` hook → skip all variants, show content immediately
- Skeleton shimmer: static background (no animation) in reduced-motion mode

### ARIA
- Icon-only buttons: `aria-label` (e.g., "Add to cart", "Remove item", "Close modal")
- Decorative images: `aria-hidden="true"` + empty `alt=""`
- Form inputs: explicit labels or `aria-label`
- Navigation: `<nav aria-label="Main navigation">`, `<nav aria-label="Category navigation">`

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P14-S01-mobile-pass.md` | Mobile Pass | Systematic 375px verification and fixes |
| S02 | `P14-S02-desktop-pass.md` | Desktop Pass | 1280px composition verification and fixes |
| S03 | `P14-S03-accessibility.md` | Accessibility | Focus states, reduced motion, contrast, ARIA |

## In-Scope Files

```
MODIFY (className and a11y attributes):
  All component files as needed for responsive fixes
  src/app/globals.css                         → responsive utilities, focus styles
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Playwright Automated Verification (MANDATORY)

### Route Screenshot Matrix — Run for EVERY route at BOTH viewports

```bash
# Homepage
npx playwright screenshot --viewport-size="375,812" http://localhost:3001 p14-home-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001 p14-home-1280.png

# Categories
npx playwright screenshot --viewport-size="375,812" http://localhost:3001/categories p14-cat-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001/categories p14-cat-1280.png

# Search
npx playwright screenshot --viewport-size="375,812" http://localhost:3001/search p14-search-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001/search p14-search-1280.png

# Cart
npx playwright screenshot --viewport-size="375,812" http://localhost:3001/cart p14-cart-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001/cart p14-cart-1280.png

# Profile
npx playwright screenshot --viewport-size="375,812" http://localhost:3001/profile p14-profile-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001/profile p14-profile-1280.png
```

## Completion Criteria

1. No layout breaks at 375px on any route (Playwright verified)
2. Desktop uses space elegantly at 1280px (Playwright verified)
3. All interactive elements have focus-visible states (ui-ux-pro-max §1)
4. Tap targets ≥ 44px on touch surfaces (ui-ux-pro-max §2)
5. `prefers-reduced-motion` simplifies all animation (ANIMATION_TOOLKIT §10)
6. Contrast ratios meet WCAG AA minimum (tested with DevTools)
7. All icon-only buttons have `aria-label`
8. Semantic landmarks properly used throughout

---

*Phase file for P14. Uses ui-ux-pro-max §1/§2/§5, Playwright MCP, Figma MCP.*
