---
project: grolin
role: phase
phase: P16
window: W14-W15
status: planned
---
# PHASE 16 — FINAL QA & SHIP READINESS

## Phase Identity
- **Number**: 16
- **Name**: Final QA & Ship Readiness
- **Status**: ⬜ Not Started
- **Dependencies**: ALL previous phases completed

---

## Skills & Tools (MANDATORY — Use ALL tools for comprehensive QA)

| Tool | Usage | Reference |
|------|-------|-----------|
| **ui-ux-pro-max** §1-§10 | Full Pre-Delivery Checklist — ALL rules | `.agents/skills/ui-ux-pro-max/SKILL.md` |
| **ANIMATION_TOOLKIT.md** | Verify all motion follows toolkit patterns | `.claude/support/ANIMATION_TOOLKIT.md` |
| **MOTION_PRINCIPLES.md** | Verify motion budget not exceeded | `.claude/support/MOTION_PRINCIPLES.md` |
| **DESIGN_TOKENS.md** | Verify all color/shadow/typography tokens correct | `.claude/support/DESIGN_TOKENS.md` |
| **Playwright MCP** | Full route screenshot matrix at 375px + 1280px for EVERY route | Automated testing |
| **Figma MCP** | Final design fidelity comparison against Figma source files | kumarmondalsouvik@gmail.com |
| **nano-banana-2** | Generate before/after comparison mockups for final report | `.agents/skills/nano-banana-2/SKILL.md` |

---

## Objective

Convert from good-looking work to a trustworthy release candidate. Comprehensive cross-route visual audit, performance verification, regression closure, and final polish. No phase is skipped; no shortcut is taken.

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P16-S01-visual-audit.md` | Visual Audit | Cross-route visual consistency + Playwright automated screenshots |
| S02 | `P16-S02-performance.md` | Performance Check | LCP, CLS, bundle size, jank + build verification |
| S03 | `P16-S03-release-gate.md` | Release Gate | Final polish, regression closure, human signoff |

## In-Scope Files

```
ALL files may be read for verification.
Only className/CSS fixes for regressions.

BLOCKED (ALWAYS):
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Route Verification Matrix (Playwright Automated)

| Route | 375px | 1280px | Console | Motion | A11y | Score |
|-------|-------|--------|---------|--------|------|-------|
| / (home) | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /categories | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /categories/[id] | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /search | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /products/[slug] | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /cart | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /checkout | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /orders | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /orders/[id] | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /profile | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /wallet | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /login | ☐ | ☐ | ☐ | ☐ | ☐ | — |
| /otp | ☐ | ☐ | ☐ | ☐ | ☐ | — |

## Scoring Dimensions (ui-ux-pro-max Pre-Delivery Checklist)

Each route scored 0-10 on all 8 dimensions:

1. **Typography hierarchy** — heading authority, body readability, scale consistency
2. **Surface depth** — shadows (shadow-1 → shadow-5), backgrounds, textures, mesh gradients
3. **Color token compliance** — GREEN=commerce, PURPLE=brand, BLUE=trust, AMBER=search only
4. **Interaction states** — hover (translateY+shadow), press (scale 0.97), focus-visible, disabled
5. **Responsive composition** — intentional at 375px and 1280px, no stretch/compress
6. **Motion quality** — choreography, restraint, performance (60fps), reduced-motion compliance
7. **Accessibility** — focus-visible, contrast AA, ARIA labels, semantic HTML, tab order
8. **Brand consistency** — feels like one cohesive product across all routes

**Overall = average of 8 dimensions. Must be ≥ 9.0 for release.**

## Release Gate Checklist (COMPREHENSIVE)

### Visual Quality
- [ ] All routes ≥ 9.0 visual score (averaged across 8 dimensions)
- [ ] Typography hierarchy consistent everywhere
- [ ] Shadow system applied everywhere (no border boxes remaining)
- [ ] Color tokens used correctly on every route
- [ ] Dark editorial band present and premium
- [ ] Warm ivory canvas (#F0ECE8) on all page backgrounds

### Responsive
- [ ] All routes verified at 375px (Playwright screenshots)
- [ ] All routes verified at 1280px (Playwright screenshots)
- [ ] No horizontal overflow on any route at any viewport
- [ ] Tap targets ≥ 44px on ALL interactive elements
- [ ] Bottom nav doesn't overlap content on any page

### Motion (ANIMATION_TOOLKIT + MOTION_PRINCIPLES)
- [ ] Hero entrance: cinematic, < 1s, spring physics
- [ ] Section reveals: fire once, spring gentle, no re-trigger
- [ ] Card stagger: subtle (0.07s), first set only
- [ ] Hover depth: translateY(-4px) + shadow-5 transition
- [ ] Parallax: max 2-3 surfaces, desktop only
- [ ] No scroll jank at 60fps
- [ ] `prefers-reduced-motion`: ALL animation disabled

### Performance
- [ ] LCP < 2.5s (hard limit 3.0s)
- [ ] CLS < 0.05 (hard limit 0.1)
- [ ] `npx tsc --noEmit` — zero errors
- [ ] `npm run build` — builds successfully
- [ ] JS bundle < 200KB initial load
- [ ] No console errors affecting rendering

### Accessibility (ui-ux-pro-max §1 — HIGHEST PRIORITY)
- [ ] Focus-visible states on ALL interactive elements
- [ ] ARIA labels on ALL icon-only elements
- [ ] Contrast meets WCAG AA (4.5:1 body, 3:1 large)
- [ ] Reduced motion fully supported
- [ ] Semantic HTML landmarks (nav, main, footer, section)
- [ ] Tab order logical and visual-matching

### Brand
- [ ] Homepage tells a cohesive story
- [ ] Every route feels like the same product
- [ ] Cards feel tactile and premium (shadows, not borders)
- [ ] The "Zepto/Blinkit test" passes (not embarrassing if competitors saw it)

### Final Gate
- [ ] Human approval obtained — "Ship it."

## Playwright Full Verification Commands

```bash
# Full route screenshot matrix
for route in "" "categories" "search" "cart" "profile" "wallet" "login"; do
  npx playwright screenshot --viewport-size="375,812" "http://localhost:3001/$route" "p16-final-${route:-home}-375.png"
  npx playwright screenshot --viewport-size="1280,800" "http://localhost:3001/$route" "p16-final-${route:-home}-1280.png"
done
```

## Transformation Summary Output

At completion, create `.grolin-transform/TRANSFORMATION-COMPLETE.md` documenting:
- What was accomplished (all 16 phases, all 47 sessions)
- Before/after route scores
- Key design decisions made
- Files changed (summary with counts)
- Known limitations or future improvements
- Tools & skills used throughout

---

*Phase file for P16. Uses ALL skills and MCP servers for comprehensive final QA. This is the final gate before production.*
