---
project: grolin
role: phase
phase: P12
window: W08-W09
status: planned
---
# PHASE 12 — HOMEPAGE MOTION CHOREOGRAPHY

## Phase Identity
- **Number**: 12
- **Name**: Homepage Motion Choreography
- **Status**: ⬜ Not Started
- **Dependencies**: P11 completed and approved

---

## Skills & Tools (MANDATORY)

| Tool | Usage | Reference |
|------|-------|-----------|
| **ui-ux-pro-max** §7 | Animation timing, spring physics, stagger rules, exit-faster-than-enter | `.agents/skills/ui-ux-pro-max/SKILL.md` |
| **ANIMATION_TOOLKIT.md** | Hero entrance timeline, spring recipes, micro-interaction library | `.claude/support/ANIMATION_TOOLKIT.md` |
| **MOTION_PRINCIPLES.md** | Motion budget enforcement, performance rules | `.claude/support/MOTION_PRINCIPLES.md` |
| **Playwright MCP** | Hero screenshot at 375px + 1280px, scroll jank verification | Automated viewport testing |
| **Figma MCP** | Reference original Figma designs for hero layout/motion intent | kumarmondalsouvik@gmail.com |
| **nano-banana-2** | Generate any reference motion mockup images if needed | `.agents/skills/nano-banana-2/SKILL.md` |

---

## Objective

Apply premium motion selectively to the homepage — the primary brand showcase. Hero entrance stagger, section scroll reveals, and card stagger create the feel of a living, responsive interface. Motion budget is strictly enforced.

## Why This Phase Exists

The homepage is the highest-ROI surface for motion investment. Properly choreographed motion creates the feeling of premium craftsmanship. But over-animation is the #1 risk — it makes sites feel cheaper, not better. This phase operates under strict motion budget constraints.

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P12-S01-hero-entrance.md` | Hero Entrance | Headline stagger, CTA reveal, badge spring |
| S02 | `P12-S02-section-reveals.md` | Section Reveals | Below-fold sections reveal on scroll |
| S03 | `P12-S03-micro-interactions.md` | Micro-Interactions | Card stagger, hover depth, button feedback |

## Motion Budget Rules (from ui-ux-pro-max §7 + ANIMATION_TOOLKIT)

```
✅  One hero-level entrance animation (spring physics, < 1s total)
✅  Section headings reveal once on scroll (spring gentle, once: true)
✅  First visible card set in a block may stagger (0.07s per child, max 8)
✅  Hover effects on interactive elements (280ms ease-out, translateY + shadow)
✅  2-3 scroll-linked parallax effects maximum (desktop only)

❌  No re-triggering animations on scroll-back
❌  No animating every child in large lists
❌  No continuous motion beyond the hero zone
❌  No delight-only animations that serve no function
❌  No jank-risk animations on mobile scroll
❌  No animation duration > 500ms (ui-ux-pro-max rule)
❌  No blocking user input during animation (interruptible rule)
```

## Animation Quality Standards (from ANIMATION_TOOLKIT §1-§4)

1. **Hero entrance**: Use exact timeline from ANIMATION_TOOLKIT §2 (0ms-900ms stagger)
2. **Section reveals**: Use ViewportReveal with spring gentle (stiffness:120, damping:24, mass:1.2)
3. **Card stagger**: Use cardContainer + cardItem from motion-variants.ts (0.07s stagger)
4. **Hover depth**: translateY(-4px) + shadow-5 transition at 280ms cubic-bezier(0.22, 1, 0.36, 1)
5. **Exit-faster-than-enter**: All exit animations 60-70% of enter duration

## In-Scope Files

```
MODIFY:
  src/components/home/HeroLayered.tsx       → entrance stagger
  src/components/home/*.tsx                 → viewport reveal wrappers
  src/components/product/ProductCard.tsx    → hover animation
  src/app/(shop)/page.tsx                   → section reveal application
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Completion Criteria

1. Hero entrance feels cinematic — confident, not bouncy (spring physics, NOT ease)
2. Below-fold sections reveal smoothly on scroll (once only, spring gentle)
3. Card stagger is subtle (70ms / 0.07s per child, not dramatic)
4. Hover states have smooth depth feedback (280ms, translateY + shadow)
5. No scroll jank on mobile (test at 60fps with throttled CPU)
6. Motion budget is respected — not over-animated
7. `prefers-reduced-motion` → all animation disabled, content immediately visible
8. Playwright screenshots at 375px and 1280px confirm visual quality

## Playwright Verification (run after each session)

```bash
npx playwright screenshot --viewport-size="375,812" http://localhost:3001 p12-hero-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001 p12-hero-1280.png
```

---

*Phase file for P12. Uses ANIMATION_TOOLKIT.md, ui-ux-pro-max §7, Playwright MCP, Figma MCP.*
