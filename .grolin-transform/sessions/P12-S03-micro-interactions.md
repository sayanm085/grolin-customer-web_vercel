---
project: grolin
role: session
phase: P12
session: S03
window: W09
status: complete
---
# SESSION P12-S03 — CARD STAGGER & MICRO-INTERACTIONS

## Session Identity
- **Phase**: P12 — Homepage Motion Choreography
- **Session**: S03 of 3
- **Status**: ⬜ Not Started

---

## Skills & Tools for This Session

| Tool | Usage |
|------|-------|
| **ANIMATION_TOOLKIT.md** §3 | Stagger timing rules (0.07s per child, max 8 children) |
| **ANIMATION_TOOLKIT.md** §4 | Micro-interaction library (button press, card hover, chip tap, counter morph) |
| **ANIMATION_TOOLKIT.md** §5 | Scroll-linked parallax (max 2-3 surfaces, desktop only) |
| **ui-ux-pro-max** §7 | `scale-feedback` (0.95-1.05), `stagger-sequence` (30-50ms), `interruptible` |
| **Playwright MCP** | Capture homepage with hover states, verify parallax surfaces |
| **Figma MCP** | Verify hover state designs against Figma |

---

## Objective

Add card stagger to the first visible product card set (NOT every card on the page). Add micro-interaction polishing: button press feedback, hover depth transitions, scroll-linked parallax for the GROLIN watermark (2-3 surfaces maximum).

## Pre-Session Confirmation

> "I am executing P12-S03: Micro-Interactions. Card stagger on first grid, hover depth, parallax effects. className and motion changes ONLY. Reading ANIMATION_TOOLKIT §3, §4, §5."

## Implementation Focus

### Card Stagger Rules (ANIMATION_TOOLKIT §3)

```
✅ First visible product card grid: stagger children 0.07s (max 8)
❌ Second/third product grids: NO stagger (already rendered)
✅ Collection cards (first row): stagger 0.08s (max 6)
❌ Cart items: NO stagger
❌ Order listing: NO stagger
```

### Micro-Interaction Polish (ANIMATION_TOOLKIT §4)

#### Product Card Hover

```css
.card-hover {
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-5);
}
```

#### Button Press (ui-ux-pro-max: `scale-feedback` 0.95-1.05)

```css
.btn-press {
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}
.btn-press:active {
  transform: scale(0.97);
  box-shadow: var(--shadow-1);
}
```

#### Category Card Hover

```css
.category-card-hover:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-3);
}
```

#### Trust Chip Hover

```css
.chip-hover:hover {
  transform: translateY(-1px);
  background-color: var(--shop-surface-subtle);
}
```

### Scroll-Linked Parallax (ANIMATION_TOOLKIT §5 — max 2-3 surfaces)

```tsx
import { useScroll, useTransform } from 'framer-motion'

const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], [0, -80])

// Surface 1: GROLIN watermark in hero → drifts up at 25% scroll speed
// Surface 2: Decorative produce scatter → drifts at 15%
// Surface 3: (optional) Dark editorial text → subtle 10% drift
```

### BANNED (from ANIMATION_TOOLKIT §5)
- No parallax on content text
- No parallax on cards or interactive elements
- No parallax on mobile (check `window.innerWidth < 768`)
- No continuous rotation or scale on scroll

## Files IN SCOPE

```
MODIFY:
  src/components/product/ProductGrid.tsx    → card stagger container
  src/components/home/HeroLayered.tsx       → parallax watermark
  src/components/product/ProductCard.tsx    → hover depth (if not in P08)
  src/app/globals.css                       → micro-interaction CSS classes
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] First card grid staggers subtly — not dramatic (0.07s, max 8 children)
- [ ] Hover depth transitions are smooth (280ms cubic-bezier)
- [ ] Button press: scale(0.97) feedback, responsive and interruptible
- [ ] Parallax: max 2-3 surfaces, gentle drift only, disabled on mobile
- [ ] No scroll jank on mobile (60fps maintained)
- [ ] All interactions interruptible (ui-ux-pro-max: `interruptible`)
- [ ] `prefers-reduced-motion` → hover transitions only (no parallax, no stagger)
- [ ] `npx tsc --noEmit` passes
- [ ] Phase 12 complete — homepage feels alive


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (filled 2026-03-28 W09)

```
Files modified:
  src/app/globals.css
  src/components/product/ProductGrid.tsx
  src/components/home/HomeTrendingGrid.tsx
  src/components/home/HeroLayered.tsx

Key changes:
  globals.css: .card-hover → 280ms cubic-bezier(0.22,1,0.36,1) + shadow-level-5 token
  globals.css: .btn-press:active → scale(0.97), 150ms; added base .btn-press transition
  globals.css: added .category-card-hover (scale 1.02, shadow-3) and .chip-hover
  ProductGrid.tsx: cardContainer+cardItem (0.07s stagger), max-8 cap, whileInView once:true
  HomeTrendingGrid.tsx: first homepage product grid staggers with cardContainer+cardItem
  HeroLayered.tsx: GROLIN watermark → m.span with scroll parallax (useScroll+useTransform, 25% speed, desktop only)

Issues found:
  None. Only pre-existing CategoryRow.tsx:73 TSC error.

Next session should know:
  P12 is COMPLETE (all 3 sessions done). P13 begins next.
  P13 = Loading, Empty & Transitional states (2 sessions)
  ProductCard.tsx already has strong Framer Motion whileHover (y:-6, scale:1.015) — do NOT touch in P13
  .category-card-hover and .chip-hover CSS classes are now available for any page that needs them
  Parallax max budget used: 1 of 3 surfaces (GROLIN watermark). 2 surfaces remaining if P13 needs them.
```

---

*Session file for P12-S03. This completes Phase 12. Uses ANIMATION_TOOLKIT §3/§4/§5, ui-ux-pro-max §7, Playwright MCP.*
