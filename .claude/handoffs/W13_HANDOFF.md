---
project: grolin
role: handoff
window: W13
status: complete
created: 2026-03-29
---
# W13 HANDOFF — Window Complete ✅

## Window Summary

**Window**: W13
**Phase**: P15 — Remotion Signature Layer (COMPLETE ✅)
**Sessions completed**: P15-S01 (Composition), P15-S02 (Integration)
**Progress after W13**: 44 / 47 sessions (94%)

---

## What Was Done

### P15-S01: Remotion Composition Development

Upgraded Remotion composition from 600×700 portrait to 1920×1080 widescreen with brand-quality spring physics and brand color narrative.

**remotion/Root.tsx** — upgraded:
- `width: 1920, height: 1080` (was 600×700)
- `id: "HeroVideo"` (was "HeroLoop")
- `durationInFrames: 150` (5s at 30fps — was 180)
- Exported as `RemotionRoot` named export
- `registerRoot(RemotionRoot)` retained

**remotion/HeroLoop.tsx** — rewritten for 1920×1080:
- Produce items repositioned for widescreen canvas — corner clusters at 1920px edges
- **Bounce spring** (stiffness:220, damping:18, mass:1.0) for all produce entry — ANIMATION_TOOLKIT §1 ✅
- **Gentle spring** (stiffness:120, damping:24, mass:1.2) for basket/BrandReveal — ANIMATION_TOOLKIT §1 ✅
- `GreenTrail` component: radial burst (#16945E) per produce item entry (frames 0-18 of each item)
- `BrandReveal` component: "GROLIN / Fresh · Local · Premium" fades in at frame 108 (Act 3)
- `BasketLayer`: gentle spring entry + purple pulse ring (#6E49D8) during Act 3 basket crossfade
- Canvas warm ivory `#F0ECE8` throughout — matches brand token exactly

**remotion/index.ts** — created as re-export entry.

**Rendered videos:**
- `public/videos/hero-composition.webm` — 224KB, 1920×1080, 30fps, 5s, VP8 ✅ (< 5MB)
- `public/videos/hero-composition.mp4` — 1.8MB, 1920×1080, 30fps, 5s, H.264 ✅ (< 8MB)

---

### P15-S02: Hero Video Integration & Fallback

Integrated new video into `HeroLayered.tsx` with full fallback chain per REMOTION_GUIDE §5.

**src/components/home/HeroLayered.tsx** changes:
- Added `useRef` import
- Added `isMobile` state — **default `true`** (SSR-safe: no video renders until JS confirms desktop)
- Added `videoFailed` state — set by `onError` handler
- Added `videoRef` (`useRef<HTMLVideoElement>`)
- Added `useEffect` → `setIsMobile(window.innerWidth < 768)` on mount
- Video render conditional upgraded: `renderLoopVideo && !isMobile && !shouldReduceMotion && !videoFailed`
- Video sources: `hero-composition.webm` (primary) + `hero-composition.mp4` (fallback)
- `poster="/images/hero/hero-basket.webp"` — confirmed present ✅
- `onError={() => setVideoFailed(true)}` — graceful fallback to static

**Fallback chain:**
| Condition | Behavior |
|-----------|----------|
| Desktop + motion OK | ✅ Video plays (hero-composition.webm) |
| Desktop + reduced motion | ✅ Static hero image |
| Mobile < 768px | ✅ Static hero image |
| Video load error | ✅ Static hero image (onError) |
| SSR / hydration | ✅ Static hero (isMobile default true) |

---

## Files Modified This Window

| File | Change |
|------|--------|
| `remotion/Root.tsx` | Upgraded to 1920×1080, id=HeroVideo, 150 frames |
| `remotion/HeroLoop.tsx` | Rewritten: widescreen layout, brand spring physics, GreenTrail, BrandReveal |
| `remotion/index.ts` | Created: re-export entry |
| `public/videos/hero-composition.webm` | Rendered: 224KB, VP8, 1920×1080 |
| `public/videos/hero-composition.mp4` | Rendered: 1.8MB, H.264, 1920×1080 |
| `src/components/home/HeroLayered.tsx` | Video integration: mobile guard, reduced-motion guard, error fallback |

---

## Verification Status

- ✅ 375px Playwright screenshot — static hero, no video ✅
- ✅ 1280px Playwright screenshot — hero clean, no layout breaks ✅
- ✅ `npx tsc --noEmit` — clean (pre-existing CategoryRow.tsx:73 only)

---

## Note on Demo Data

The 3 demo banners (`banner-fresh-dinner`, `banner-breakfast`, `banner-snacks`) all have entries in `LOCAL_HERO_IMAGE_MAP`. This means `renderLoopVideo = false` for all demo banners — static images are always used. The video activates for any banner that has no local image mapping. This is the correct priority order: curated static images > video animation.

---

## For W14 — P16 (Final Phase)

**Carry forward:**
- P15 fully complete — Remotion composition + hero integration done
- `isMobile` default=true in HeroLayered.tsx — do NOT remove this default (SSR safety)
- `renderLoopVideo` logic unchanged — controls video activation based on banner data
- `hero-composition.webm` and `.mp4` are the canonical video assets
- Old `hero-loop.*` files remain in `public/videos/` but are no longer referenced by HeroLayered
- Pre-existing TSC error CategoryRow.tsx:73 — continue to ignore

**W14 start procedure:**
1. Read `CLAUDE.md`
2. Read `.claude/BOOST.md`
3. Read `.grolin-transform/phases/P16-*.md` (final phase file)
4. Read `.grolin-transform/sessions/P16-S01-*.md`
5. Confirm: "I am executing P16-S01: [title]"
6. Execute
