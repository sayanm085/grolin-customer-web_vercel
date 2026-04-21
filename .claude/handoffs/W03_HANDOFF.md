---
project: grolin
role: handoff
window: W03
status: complete
created: 2026-03-28
---
# W03 HANDOFF — Structural Primitives & Hero Recomposition

## Window Summary

| Field | Value |
|-------|-------|
| **Window** | W03 |
| **Phases** | P05 (Structural Primitives) + P06 (Hero Recomposition) |
| **Sessions** | 6 (P05-S01 through P06-S03) |
| **Status** | ✅ Complete |
| **Progress After** | 15/47 sessions (32%) |

---

## Sessions Completed

| Session | Title | Result |
|---------|-------|--------|
| P05-S01 | SectionWrapper & SectionHeading | ✅ 2 new components created |
| P05-S02 | PromoBand & TrustCard | ✅ 2 new components created |
| P05-S03 | Grid & Spacing Rhythm | ✅ Audit — all targets already on-spec |
| P06-S01 | Hero Layer Architecture | ✅ z-layer hierarchy, height, decorative elements |
| P06-S02 | Hero Content, Copy & CTA | ✅ Headline scale, green CTA, trust chip |
| P06-S03 | Hero Mobile Composition | ✅ Responsive composition finalized |

---

## Files Modified This Window

### P05 — Structural Primitives (new files)
- `src/components/shared/SectionWrapper.tsx` (NEW)
- `src/components/shared/SectionHeading.tsx` (NEW)
- `src/components/shared/PromoBand.tsx` (NEW)
- `src/components/shared/TrustCard.tsx` (NEW)

### P06 — Hero Recomposition
- `src/components/home/HeroLayered.tsx`

---

## Key Decisions & Discoveries

1. **P05-S03 was a no-op**: Homepage uses `max-w-[1680px]` wide layout — wider than `SectionWrapper`'s `max-w-screen-xl`. `SectionWrapper` cannot be applied to homepage sections without breaking the design. Audit confirmed ProductGrid grid columns and gaps already match spec.

2. **SectionWrapper target**: Interior pages (product listing `/products`, `/search`, `/categories/[id]`) — NOT the homepage. File is ready for W04 to apply to those pages.

3. **home/PromoBand ≠ shared/PromoBand**: `src/components/home/PromoBand.tsx` is a scrolling ticker band. `src/components/shared/PromoBand.tsx` is the new image+copy+CTA section primitive. Both coexist with different purposes.

4. **Hero is a banner carousel**: P06 session plans described a static editorial split layout. The actual hero is an Embla carousel with banners. The layer architecture was applied to the carousel slide structure, not rewritten as a static component.

5. **produce-scatter.webp decorative layer**: Already available in `/public/images/hero/`. Applied as Layer 1 with `opacity-20 mix-blend-luminosity` — subtle atmospheric depth behind the banner image, desktop-only.

6. **shadow-green-glow utilities exist**: `globals.css` already has `.shadow-green-glow`, `.shadow-green-glow-hover`, `.btn-press`, `progress-fill` animation — no new CSS needed.

---

## Primitive Component Summary (for W04 use)

| Component | Location | Use |
|-----------|----------|-----|
| `SectionWrapper` | `shared/SectionWrapper.tsx` | Full-width section + max-w-screen-xl container for interior pages |
| `SectionHeading` | `shared/SectionHeading.tsx` | Eyebrow + title + subtitle + action for section headers |
| `PromoBand` | `shared/PromoBand.tsx` | Image+copy+CTA promo section, 3 color variants |
| `TrustCard` | `shared/TrustCard.tsx` | Trust proof card — compact (pill) or full (stat+label) |

---

## Validation

- **TypeScript**: Only 1 pre-existing error (`CategoryRow.tsx:73`) throughout
- **Scope compliance**: Zero backend files touched
- **Hero**: Layer hierarchy clean (0-5), headline at editorial scale, green CTA with glow

---

## Carry-Forward for W04

```
STRUCTURAL PRIMITIVES — READY:
- SectionWrapper: use for interior page layouts, NOT homepage
- SectionHeading: richer alternative to SectionHeader (has eyebrow + variant)
- PromoBand/TrustCard: available for homepage section narrative (P07)

HERO — COMPLETE:
- Layers: 0=bg, 1=scatter+watermark(desktop), 2=scrims, 3=content, 4=progress, 5=dots
- Headlines: clamp(26px, 5.5vw, 52px) with tracking-[-0.025em]
- CTA: green gradient + shadow-green-glow + btn-press
- Trust chip: glass badge with backdropFilter
- Mobile: min-h-[420px], decorative elements hidden

HOMEPAGE ARCHITECTURE (immutable):
- max-w-[1680px] wide layout — NOT screen-xl
- Background zones complete — DO NOT TOUCH
- home/PromoBand.tsx = ticker (≠ shared/PromoBand.tsx)

PRE-EXISTING TSC ERROR (ignore):
- src/components/home/CategoryRow.tsx:73
```

---

## W04 Start

```
Window: W04
Phases: P07 (Homepage Section Narrative) + P08 (Product Card & Discovery)
Sessions: 7
First action: Read .grolin-transform/phases/P07-homepage-narrative.md
Then: Read P07-S01 session file
```
