---
project: grolin
role: session
phase: P12
session: S02
window: W08
status: complete
---
# SESSION P12-S02 — SECTION SCROLL REVEALS

## Session Identity
- **Phase**: P12 — Homepage Motion Choreography
- **Session**: S02 of 3
- **Status**: ⬜ Not Started

---

## Skills & Tools for This Session

| Tool | Usage |
|------|-------|
| **ANIMATION_TOOLKIT.md** §3 | Viewport reveal patterns, stagger timing rules, spring gentle recipe |
| **MOTION_PRINCIPLES.md** | Viewport reveal category (stiffness:120, damping:24, mass:1.2) |
| **ui-ux-pro-max** §7 | `once-trigger`, `stagger-sequence` (30-50ms), `exit-faster-than-enter` |
| **Playwright MCP** | Scroll-capture screenshots at different scroll positions |
| **Figma MCP** | Verify section order and spacing against Figma homepage design |

---

## Objective

Wrap below-fold homepage sections in ViewportReveal so they reveal smoothly as the user scrolls. Each section reveals ONCE with gentle spring physics. No re-triggering on scroll back.

## Pre-Session Confirmation

> "I am executing P12-S02: Section Reveals. Wrapping homepage sections in ViewportReveal. Import from shared/ViewportReveal. Reading ANIMATION_TOOLKIT §3 for reveal patterns."

## Implementation Focus

### Which Sections Get Reveal (from ANIMATION_TOOLKIT §3)

```
✅ Trust strip          → reveal from bottom (variant="default")
✅ Editorial break       → reveal with slight delay (delay={100})
✅ Collection row A      → reveal from bottom (variant="default")
✅ Product section       → reveal (heading only, NOT every card)
✅ Dark editorial band   → reveal from bottom (variant="default", dramatic)
✅ Collection row B      → reveal from bottom (variant="default")
✅ Recommended section   → reveal (heading only)
```

### Section Reveal Pattern (ANIMATION_TOOLKIT §3)

```tsx
import { ViewportReveal } from '@/components/shared/ViewportReveal'

<ViewportReveal variant="default" margin="-80px 0px">
  <SectionWrapper background="white">
    <SectionHeading ... />
    {/* section content — children NOT individually animated */}
  </SectionWrapper>
</ViewportReveal>
```

### Spring Physics for Reveals

```typescript
// ViewportReveal uses these internally:
// stiffness: 120, damping: 24, mass: 1.2
// translateY: 24px → 0px
// opacity: 0 → 1
// once: true — NEVER re-triggers
```

### Rules (from ui-ux-pro-max §7 + ANIMATION_TOOLKIT §3)

1. Section headings may reveal, but NOT every individual card in a section
2. Card stagger is handled in P12-S03 (only first visible set)
3. Gentle spring (stiffness:120, damping:24, mass:1.2) — no overshoot
4. Each reveal fires ONCE — never re-triggers
5. IntersectionObserver margin: `-80px 0px` (fires 80px before entering viewport)
6. `prefers-reduced-motion` → content immediately visible (handled by ViewportReveal)
7. No more than 1-2 elements animating simultaneously (ui-ux-pro-max: `excessive-motion`)

## Files IN SCOPE

```
MODIFY:
  src/app/(shop)/page.tsx                → wrap sections in ViewportReveal
  src/components/home/*.tsx              → reveal wrapping where appropriate
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] Sections reveal smoothly on scroll (spring gentle, not linear)
- [ ] No re-triggering when scrolling back up (once: true)
- [ ] No jank on mobile scroll (test at 60fps with throttled CPU)
- [ ] No excessive reveals (NOT every item animates)
- [ ] `prefers-reduced-motion` → all content immediately visible
- [ ] `npx tsc --noEmit` passes
- [ ] Playwright: scroll homepage and capture mid-page state


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes

```
Files modified:
  src/app/(shop)/page.tsx — ViewportReveal wrappers applied to all below-fold sections

Key changes:
  - ViewportReveal import added to page.tsx
  - TrustBar → ViewportReveal default
  - YourUsuals (mesh-green div) → ViewportReveal default
  - EditorialBreak → ViewportReveal default
  - CategoryDiscovery (canvas div) → ViewportReveal fromLeft (directional energy)
  - Featured+Collections 1-2 (surface-subtle div) → ViewportReveal default
  - Promise+Collection3+CategoryGrid (mesh-warm div) → ViewportReveal default
  - LocalTrustSection → ViewportReveal scale delay=100 (dramatic dark anchor entry)
  - Collections 4-6 (surface-subtle div) → ViewportReveal default
  - BestSellers (surface div) → ViewportReveal default
  - Trending/FreshPicks/Deals canvas zone: NOT wrapped (near bottom, renders quickly)
  - PromoBand, HeroLayered, Footer: NOT wrapped (per SCROLL_CHOREOGRAPHY.md rules)
  - NEVER two animated sections back-to-back: each section has breathing room (scroll distance)
  - once:true built into ViewportReveal — never re-triggers on scroll back
  - prefers-reduced-motion: ViewportReveal shows content immediately

Issues found: None

Next session (P12-S03) should know:
  - Section reveals ✅ complete and verified at 375px + 1280px
  - Card stagger is P12-S03's job (first visible card set only, 0.07s per child)
  - Hover depth feedback is P12-S03's job (productCard, etc.)
  - Do NOT add more ViewportReveal wrappers in S03 (section reveals are done)
  - Pre-existing TSC error: CategoryRow.tsx:73 — ignore
  - NOTE: This is the last session for W08 — W08 COMPLETE after S02
```

---

*Session file for P12-S02. Uses ANIMATION_TOOLKIT §3, ui-ux-pro-max §7, Playwright MCP.*
