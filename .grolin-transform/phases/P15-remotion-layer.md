---
project: grolin
role: phase
phase: P15
window: W13
status: complete
---
# PHASE 15 — REMOTION SIGNATURE LAYER

## Phase Identity
- **Number**: 15
- **Name**: Remotion Signature Layer
- **Status**: ✅ Complete (W13, 2026-03-29)
- **Dependencies**: P12 completed and approved

---

## Skills & Tools (MANDATORY)

| Tool | Usage | Reference |
|------|-------|-----------|
| **REMOTION_GUIDE.md** | Full composition guide: structure, animation, rendering, integration | `.claude/support/REMOTION_GUIDE.md` |
| **nano-banana-2** | Generate missing produce assets (tomato, lemon, capsicum, etc.) | `.agents/skills/nano-banana-2/SKILL.md` |
| **ANIMATION_TOOLKIT.md** §1 | Spring physics recipes for Remotion spring() config | `.claude/support/ANIMATION_TOOLKIT.md` |
| **MOTION_PRINCIPLES.md** | Brand motion guidelines, color motion, composition narrative | `.claude/support/MOTION_PRINCIPLES.md` |
| **Playwright MCP** | Test video playback on desktop, verify static fallback on mobile | Automated viewport testing |
| **Figma MCP** | Reference Figma hero designs for video composition layout | kumarmondalsouvik@gmail.com |

---

## Objective

Add a carefully controlled premium motion asset layer using Remotion. This is a desktop-only hero enhancement — the static hero must already look excellent. Video enhances; it does not compensate.

## Remotion Composition Specifications

### Output Specs
| Spec | Value |
|------|-------|
| Resolution | 1920x1080 (≥ 1280x720 minimum) |
| FPS | 30 |
| Duration | 4-6 seconds (120-180 frames) |
| Primary codec | VP8/WebM |
| Fallback codec | H.264/MP4 |
| Max file size | < 5MB WebM, < 8MB MP4 |

### Animation Narrative (from REMOTION_GUIDE §6)
```
Act 1 (0-2s): Fresh produce items float in from edges (spring bounce physics)
Act 2 (2-4s): Items converge toward central basket (interpolate with ease-out)
Act 3 (4-5s): Basket transitions empty → full, brand moment (spring gentle)
```

### Asset Generation (nano-banana-2)
If any produce assets are missing from `public/images/remotion-sources/produce/`, generate them:

```bash
# Example: Generate missing tomato asset
infsh app run google/gemini-3-1-flash-image-preview --input '{
  "prompt": "Single ripe red tomato, photorealistic product photography, white background, no shadow, centered, 512x512",
  "aspect_ratio": "1:1",
  "resolution": "2K"
}'
```

## Sessions

| # | File | Title | Objective |
|---|------|-------|-----------|
| S01 | `P15-S01-composition.md` | Composition Development | Develop/refine Remotion hero composition |
| S02 | `P15-S02-integration.md` | Hero Integration | Video integration + mobile fallback |

## In-Scope Files

```
MODIFY/CREATE:
  remotion/**                            → Remotion compositions
  src/components/home/HeroLayered.tsx    → video integration
  public/videos/                         → rendered video output
  public/images/remotion-sources/        → asset generation target
```

## BLOCKED Files (ALWAYS)

```
❌  src/services/**   ❌  src/hooks/**   ❌  src/store/**
❌  src/lib/api*      ❌  src/app/api/**
❌  next.config.ts    ❌  .env*         ❌  package.json
```

## Completion Criteria

1. Remotion composition renders at ≥ 1280x720 (target 1920x1080)
2. Desktop hero shows video, mobile shows static fallback
3. Missing/failed video → graceful fallback (no broken state)
4. No CLS or layout jank from video loading
5. Video enhances the already-premium static hero
6. `prefers-reduced-motion` → static hero only (no video)
7. All produce assets present (generated via nano-banana-2 if missing)
8. Playwright verifies: desktop shows video, mobile shows static

## Playwright Verification

```bash
# Desktop — should show video
npx playwright screenshot --viewport-size="1280,800" http://localhost:3001 p15-desktop-video.png

# Mobile — should show static hero
npx playwright screenshot --viewport-size="375,812" http://localhost:3001 p15-mobile-static.png
```

## Escape Hatch — If Remotion Fails

If Remotion setup fails within 1 hour of W13 start (missing ffmpeg, package conflicts, etc.):

1. **ABORT** Remotion video development
2. **INSTEAD**: Create a CSS-only hero entrance enhancement:
   - Add `gradient-shift` keyframe (ANIMATION_TOOLKIT §6) to hero mesh background
   - Add 3 absolutely-positioned produce images with `float-slow` CSS animation (desktop only)
   - Add `prefers-reduced-motion` media query to disable all CSS animations
3. **Result**: Hero still feels alive and premium without Remotion dependency
4. **Document** the decision in W13_HANDOFF.md with rationale
5. P16 QA will verify the CSS fallback meets the ≥ 9.0 quality threshold

---

*Phase file for P15. Uses REMOTION_GUIDE.md, nano-banana-2, ANIMATION_TOOLKIT.md, Playwright MCP, Figma MCP.*

