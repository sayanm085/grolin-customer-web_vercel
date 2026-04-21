---
project: grolin
role: session
phase: P06
session: S01
window: W03
status: complete
---
# SESSION P06-S01 — HERO LAYER ARCHITECTURE

## Session Identity
- **Phase**: P06 — Homepage Hero Recomposition
- **Session**: S01 of 3
- **Status**: ✅ Complete

---

## Objective

Restructure the hero into a properly layered composition with: Layer 0 (background mesh + grain), Layer 1 (decorative elements), Layer 2 (primary subject/image), Layer 3 (content zone), Layer 4 (floating accents). Each layer has correct z-indexing and positioning.

## Pre-Session Confirmation

> "I am executing P06-S01: Hero Layout. Restructuring HeroLayered.tsx layer architecture. className and DOM structure changes ONLY. No service imports."

## Implementation Focus

### Layer Architecture

```
z-0: Background surface       → mesh-purple + grain-overlay
z-1: Decorative scatter        → produce-scatter.webp, GROLIN watermark text
z-2: Primary subject           → hero-basket.webp with Next.js Image (priority)
z-3: Content (headline + CTA)  → positioned for clarity over background
z-4: Floating accents           → delivery badge chip, basket thumbnail card
```

### Layout Approach

- Desktop: Content left, image right (classic editorial split)
- Mobile: Content stacked above image with intentional vertical composition
- Hero height: `min-h-[480px] md:min-h-[560px]` — never full viewport (allows peek of next section)
- Overflow hidden on hero container to clip decorative elements

## Files IN SCOPE

```
MODIFY:
  src/components/home/HeroLayered.tsx   → layer restructuring
  src/app/globals.css                   → hero-specific utilities if needed
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] Hero has visible depth layers
- [ ] Background mesh + grain applied
- [ ] Image loads with priority (no LCP delay)
- [ ] Hero height allows next section peek on mobile


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified:
  src/components/home/HeroLayered.tsx

Key changes:
  - Article height: clamp(260px, 40vw, 420px) inline → min-h-[420px] md:min-h-[520px] Tailwind class
  - Layer 0: bg div → z-[0]
  - Layer 1 (NEW): produce-scatter.webp decorative overlay, desktop-only (hidden md:block),
    opacity-20 mix-blend-luminosity — subtle atmospheric depth
  - Layer 1b (NEW): GROLIN watermark text, desktop-only, opacity-20
  - Layer 2 scrims: z-[1] → z-[2] (3 gradient overlay divs)
  - Layer 3 content: z-[2] → z-[3] (button click target)
  - Layer 4 progress bar: z-[3] → z-[4]
  - Dot indicators: z-[4] → z-[5]

Issues found:
  - Hero is a banner carousel, not a static editorial split — the 5-layer split layout
    from the session plan doesn't apply. Carousel structure preserved.
  - produce-scatter.webp already in /public/images/hero/ ✅

P06-S02 should know:
  - Layer structure is clean: 0=bg, 1=decorative, 2=scrims, 3=content, 4=progress, 5=dots
  - Focus on headline font size (clamp 26→52px), green CTA gradient, trust cue chip
```

---

*Session file for P06-S01.*
