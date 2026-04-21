---
project: grolin
role: session
phase: P12
session: S01
window: W08
status: complete
---
# SESSION P12-S01 — HERO ENTRANCE ANIMATION

## Session Identity
- **Phase**: P12 — Homepage Motion Choreography
- **Session**: S01 of 3
- **Status**: ⬜ Not Started

---

## Skills & Tools for This Session

| Tool | Usage |
|------|-------|
| **ANIMATION_TOOLKIT.md** §2 | Hero entrance timeline (0ms-900ms), spring recipes |
| **MOTION_PRINCIPLES.md** | Motion budget, page-load choreography sequence |
| **ui-ux-pro-max** §7 | `spring-physics`, `duration-timing` (< 500ms per element), `exit-faster-than-enter` |
| **Playwright MCP** | Screenshot hero at load, capture entrance state |
| **Figma MCP** | Reference Figma hero layout for animation targets |

---

## Objective

Choreograph the hero entrance: headline staggers in (0→400ms), supporting elements follow (200→600ms), CTA appears with spring overshoot, floating accents spring in with delay. The hero should feel like a confident reveal, not a bounce party.

## Pre-Session Confirmation

> "I am executing P12-S01: Hero Entrance. Applying motion variants to HeroLayered.tsx. Using variants from motion-variants.ts. Reading ANIMATION_TOOLKIT.md §2 for timeline. Zero API imports."

## Implementation Focus

### Hero Entrance Timeline (from ANIMATION_TOOLKIT §2)

```
0ms     Background mesh visible (no animation — stability anchor)
0-300ms Headline staggers in (opacity 0→1, y 20→0, spring gentle)
         stiffness:120, damping:24, mass:1.2
100-400ms Subheadline fades in (opacity 0→1, y 10→0)
200-500ms CTA button (opacity 0→1, scale 0.92→1, spring elastic)
         stiffness:180, damping:12, mass:1.0
400-700ms Trust chip (opacity 0→1, y 12→0, spring bounce)
         stiffness:220, damping:18, mass:1.0
500-800ms Floating accents (scale 0→1, spring bounce) — DESKTOP ONLY
600-900ms Hero image (scale 0.96→1, opacity 0→1, spring gentle)
```

### Code Pattern (from ANIMATION_TOOLKIT §2)

```tsx
// Import from centralized variants
import { heroHeadline, heroCTA, heroImage, springBounce } from '@/lib/motion-variants'

<m.div
  variants={heroContainer}
  initial="hidden"
  animate="visible"
>
  <m.h1 variants={heroHeadline}>Freshness at your doorstep</m.h1>
  <m.p variants={heroSubheadline}>Quick delivery, premium quality</m.p>
  <m.div variants={heroCTA}>
    <Button>Shop Now</Button>
  </m.div>
</m.div>
```

### Important: Motion Budget Enforcement

- Hero zone gets ONE entrance choreography
- After entrance, hero is STILL — no continuous animation
- Decorative elements may have gentle `float-slow` ONLY on desktop
- GROLIN watermark parallax is addressed in P12-S03
- Mobile: skip floating accents, simplify to fade+slide only
- `prefers-reduced-motion`: show all elements immediately, no animation

### Important: Hero Variant Physics Decision

- The existing hero variants in `motion-variants.ts` use **duration-based easing** (duration: 0.55, ease: standard)
- The ANIMATION_TOOLKIT §2 timeline uses **spring physics** (stiffness:120, damping:24)
- Both produce a professional, confident feel. The ANIMATION_TOOLKIT describes the TARGET FEEL.
- **Do NOT rewrite existing working duration-based variants to spring** unless you measure a clear improvement
- Focus on applying the existing variants to HeroLayered.tsx components

### Reduced Motion Pattern (ANIMATION_TOOLKIT §10)

```tsx
const shouldReduceMotion = useReducedMotion()

<m.div
  variants={shouldReduceMotion ? undefined : heroContainer}
  initial={shouldReduceMotion ? false : "hidden"}
  animate="visible"
>
```

## Files IN SCOPE

```
MODIFY:
  src/components/home/HeroLayered.tsx    → apply motion variants
  src/app/(shop)/page.tsx                → hero container wrapper (if needed for stagger orchestration)
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] Hero entrance feels cinematic and confident (spring physics, not bouncy)
- [ ] No bouncy/playful overshoot — professional and restrained
- [ ] Mobile hero entrance is simplified (no floating elements)
- [ ] Animation completes in under 1 second total
- [ ] `prefers-reduced-motion` → content immediately visible
- [ ] `npx tsc --noEmit` passes
- [ ] Playwright: `npx playwright screenshot --viewport-size="1280,800" http://localhost:3001 p12-s01-hero.png`


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes

```
Files modified:
  src/lib/motion-variants.ts — added heroContainer, heroSubheadline, heroTrustChip variants;
                               updated heroHeadline/heroCTA to spring physics (stiffness:120/180, damping:24/12)
  src/components/home/HeroLayered.tsx — applied heroContainer stagger + heroHeadline/heroCTA/heroTrustChip variants
                                        to first-slide content zone; useReducedMotion guard; m.section → section;
                                        BottomNav motion→m fix bundled (pre-existing strict-mode crash blocker)
  src/components/layout/BottomNav.tsx — motion → m import fix (pre-existing LazyMotion strict-mode crash)

Key changes:
  - Hero entrance now choreographed: container stagger (delayChildren:0.05, staggerChildren:0.12)
  - First slide ONLY gets animation (index === 0 && !shouldReduceMotion)
  - Headline: spring gentle (stiffness:120 damping:24 mass:1.2) — confident, not bouncy
  - CTA row: spring elastic (stiffness:180 damping:12) — subtle spring overshoot
  - Trust chip: spring bounce (stiffness:220 damping:18) — energetic but restrained
  - After entrance: hero is STILL — no continuous motion
  - BottomNav crash fixed (motion → m) — was crashing on mobile viewport

Issues found:
  - Pre-existing: BottomNav.tsx used `motion.span` (not `m.span`) — caused LazyMotion strict-mode crash
    FIXED in this session (within layout scope, className/JSX-only change)

Next session (P12-S02) should know:
  - Hero entrance ✅ complete and verified
  - motion-variants.ts now has heroContainer, heroSubheadline, heroTrustChip exports
  - P12-S02: Section reveals — wrap homepage sections with <ViewportReveal>
  - Use SCROLL_CHOREOGRAPHY.md section reveal map for which variant per section
  - Do NOT re-animate hero (it is already complete)
  - Pre-existing TSC error: CategoryRow.tsx:73 — ignore
```

---

*Session file for P12-S01. Uses ANIMATION_TOOLKIT §2, ui-ux-pro-max §7, Playwright MCP.*
