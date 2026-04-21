---
project: grolin
role: support
---
# QA CHECKLIST

> Reference checklist for phase-end and session-end verification.
> Skills: ui-ux-pro-max (§1 Accessibility, §2 Touch, §3 Performance, §5 Layout, §7 Animation)
> Tools: Playwright MCP (automated screenshots), Figma MCP (design verification)

---

## Per-Session Checklist

### Implementation
- [ ] Implementation matches session objective
- [ ] Code changes are className/visual ONLY (no backend modifications)
- [ ] All imports are from approved paths (no new dependencies without approval)
- [ ] `npx tsc --noEmit` passes

### Responsive (MANDATORY every session)
- [ ] 375px mobile — no layout breaks, no overflow, no clipping
- [ ] 1280px desktop — space used well, no stretch, proper column layout
- [ ] Run: `npx playwright screenshot --viewport-size="375,812" http://localhost:3001 session-375.png`
- [ ] Run: `npx playwright screenshot --viewport-size="1280,800" http://localhost:3001 session-1280.png`

### Context Files
- [ ] .claude/CURRENT_STATE.md updated (phase/session, progress)
- [ ] .claude/logs/SESSION_LOG.md entry appended
- [ ] .claude/logs/CHANGED_FILES.md updated
- [ ] Session file handoff notes filled in

---

## Per-Phase Checklist

- [ ] All sessions in phase completed
- [ ] Phase completion criteria ALL met
- [ ] No regression on previously completed phases
- [ ] Phase file status → `complete`
- [ ] Human approval obtained

---

## Visual Quality (ui-ux-pro-max §4 Colors, §6 Typography, §9 Shadow)

- [ ] Premium, not template-like — passes the "Zepto test"
- [ ] Consistent across the page (same tokens, same shadows, same spacing)
- [ ] Cards float with shadow (var(--shadow-1) at rest, var(--shadow-5) on hover) — NOT bordered
- [ ] Typography creates clear hierarchy (hero > editorial > section > card > body > eyebrow)
- [ ] Color tokens used correctly (GREEN=commerce, PURPLE=brand, BLUE=trust, AMBER=search only)
- [ ] Warm ivory canvas (#F0ECE8) everywhere — no white or gray backgrounds on page level
- [ ] Dark editorial band has proper mesh gradient, not flat dark color

---

## Interaction Quality (ui-ux-pro-max §2 Touch, §7 Animation)

- [ ] Hover states: transform + shadow transition (280ms cubic-bezier)
- [ ] Press states: scale(0.97) feedback on buttons
- [ ] Disabled states: opacity 0.5 + cursor not-allowed + no hover effect
- [ ] Loading states: disabled + spinner indicator
- [ ] Quantity stepper: smooth number morph with AnimatePresence
- [ ] Motion helps user comprehension — never distracts or decorates

---

## Motion Quality (MOTION_PRINCIPLES.md + ANIMATION_TOOLKIT.md)

- [ ] Hero entrance: cinematic, confident, completes in < 1s
- [ ] Section reveals: fire once on scroll, spring gentle physics
- [ ] Card stagger: first visible set only, 0.07s per child, subtle
- [ ] Hover depth: translateY(-4px) + shadow-5 on desktop, smooth 280ms
- [ ] Parallax: max 2-3 surfaces, gentle drift, disabled on mobile
- [ ] No scroll jank: maintain 60fps during scroll animations
- [ ] No re-triggering: all viewport reveals use `once: true`
- [ ] `prefers-reduced-motion`: all animation disabled, content immediately visible

---

## Responsive Quality (ui-ux-pro-max §5 Layout)

- [ ] Mobile (375px) feels designed, not compressed
- [ ] Tablet (768px) uses space proportionally
- [ ] Desktop (1280px) uses space elegantly with proper max-width constraints
- [ ] No horizontal overflow at any viewport
- [ ] Tap targets ≥ 44px on touch devices (44x44px minimum)
- [ ] Bottom nav doesn't overlap page content
- [ ] Hero: next section peeks on mobile (hero doesn't fill entire viewport)
- [ ] Horizontal gutters: `px-4` mobile, `px-8` desktop

---

## Accessibility (ui-ux-pro-max §1 — HIGHEST PRIORITY)

- [ ] All interactive elements have `:focus-visible` outlines (2px solid var(--shop-primary), 2px offset)
- [ ] `prefers-reduced-motion` respected in CSS + Framer Motion
- [ ] Contrast ratios meet WCAG AA (4.5:1 for body text, 3:1 for large text)
- [ ] All icon-only buttons have `aria-label`
- [ ] Decorative images have `aria-hidden="true"` and empty `alt=""`
- [ ] Form inputs have associated labels (explicit or aria-label)
- [ ] Semantic landmarks used: `<nav>`, `<main>`, `<footer>`, `<section>`
- [ ] Tab order is logical and follows visual reading order
- [ ] No content hidden from screen readers unless purely decorative

---

## Performance (ui-ux-pro-max §3)

| Metric | Target | Hard Limit |
|--------|--------|-----------|
| LCP | < 2.5s | < 3.0s |
| CLS | < 0.05 | < 0.10 |
| FCP | < 1.2s | < 1.5s |
| FID | < 80ms | < 100ms |
| JS Bundle (initial) | < 180KB | < 250KB |
| Scroll FPS | 60fps | 55fps min |

### Performance Verification Commands

```bash
# TypeScript check
npx tsc --noEmit

# Production build
npm run build

# Check build output for large chunks
# Look for any chunk > 100KB in the build output
```

### Performance Rules
- Hero image: `priority` prop on Next.js Image component
- LazyMotion: `domAnimation` (NOT `domMax`)
- Below-fold images: proper lazy loading (no `priority`)
- `will-change: transform` ONLY on continuously animated elements
- Skeleton shimmer uses CSS animation (NOT JS intervals)

---

## Playwright Automated Testing

### Route Screenshot Matrix

```bash
# Homepage
npx playwright screenshot --viewport-size="375,812" http://localhost:3001 home-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001 home-1280.png

# Categories
npx playwright screenshot --viewport-size="375,812" http://localhost:3001/categories cat-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001/categories cat-1280.png

# Product Detail (use a known slug)
npx playwright screenshot --viewport-size="375,812" http://localhost:3001/products/sample-product pd-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001/products/sample-product pd-1280.png

# Cart
npx playwright screenshot --viewport-size="375,812" http://localhost:3001/cart cart-375.png
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001/cart cart-1280.png
```

---

## Figma Design Verification

Use Figma MCP to compare implementation against design files:
- Check color token usage matches Figma design
- Verify typography scale matches design specs
- Confirm spacing/padding values match Figma measurements
- Validate shadow values against Figma drop shadows

---

## Scoring

| Score | Meaning | Action |
|-------|---------|--------|
| < 7.0 | Unacceptable | Must fix before proceeding |
| 7.0-8.0 | Below target | Fix if in current scope |
| 8.0-9.0 | Approaching | Polish in later phases |
| ≥ 9.0 | Target quality | Maintain |

### Scoring Dimensions (score each 0-10)

1. Typography hierarchy (heading authority, body readability)
2. Surface depth (shadows, backgrounds, textures)
3. Color token compliance (correct token usage)
4. Interaction states (hover, press, focus, disabled)
5. Responsive composition (intentional at both viewports)
6. Motion quality (choreography, restraint, performance)
7. Accessibility (focus, contrast, ARIA, reduced-motion)
8. Brand consistency (feels like the same product)

**Overall = average of 8 dimensions. Must be ≥ 9.0 for release.**

---

*QA Checklist for the Grolin frontend transformation. Referenced by ALL sessions.*
