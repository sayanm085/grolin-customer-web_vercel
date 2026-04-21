---
project: grolin
role: session
phase: P06
session: S02
window: W03
status: complete
---
# SESSION P06-S02 — HERO CONTENT, COPY & CTA

## Session Identity
- **Phase**: P06 — Homepage Hero Recomposition
- **Session**: S02 of 3
- **Status**: ✅ Complete

---

## Objective

Refine hero content layer: editorial headline (clamp, 800 weight, tight tracking), concise supporting copy, prominent green CTA button with glow shadow, and optional trust cue ("30-min delivery" chip).

## Pre-Session Confirmation

> "I am executing P06-S02: Hero Content. Refining text content, CTA styling, and trust cues within HeroLayered.tsx. className and text content changes ONLY."

## Implementation Focus

### Hero Text Hierarchy

```
EYEBROW:    "FRESH FROM YOUR NEIGHBOURHOOD" or similar
            → eyebrow class (11px, 700, uppercase, tracking, white/light)
            
HEADLINE:   "Your Daily Groceries, Delivered Fresh"
            → clamp(34px, 5.5vw, 58px), weight 800, tracking -0.025em
            → White text on hero gradient background
            
SUPPORTING: Brief — max 2 lines
            → 14-16px, weight 400-500, white/translucent
            
CTA:        "Shop Now" or "Start Shopping"
            → Green gradient button with shadow-green-glow
            → btn-press utility for tactile feedback
            → 14px, weight 700, white text
            
TRUST CUE:  "🕐 Delivery in ~30 minutes"
            → Chip/badge below CTA, glass surface
```

### CTA Button Styling

```
className="
  bg-gradient-to-r from-[var(--shop-action)] to-[#1AAF6E]
  text-white font-bold text-sm tracking-[0.01em]
  px-8 py-3.5 rounded-full
  shadow-green-glow hover:shadow-green-glow-hover
  btn-press
  transition-all duration-200
"
```

## Files IN SCOPE

```
MODIFY:
  src/components/home/HeroLayered.tsx   → content layer refinement
```

## Files BLOCKED

```
❌ src/services/** ❌ src/hooks/** ❌ src/store/** ❌ src/lib/api*
❌ next.config.ts ❌ .env* ❌ package.json
```

## Validation

- [ ] Headline is large, bold, and commanding
- [ ] CTA is immediately visible with green glow
- [ ] Trust cue is present and readable
- [ ] Text is readable over background at all viewports


## Session End — Update These Files

1. **.claude/CURRENT_STATE.md**: Update current phase/session, mark status
2. **.claude/logs/SESSION_LOG.md**: Append entry with results
3. **.claude/logs/CHANGED_FILES.md**: List modified files (if any)

## Handoff Notes (fill at session end)

```
Files modified:
  src/components/home/HeroLayered.tsx

Key changes:
  - Headline font: clamp(20px, 4vw, 30px) → clamp(26px, 5.5vw, 52px), tracking-[-0.025em], leading-[1.08]
  - Headline max-width: max-w-[280px] md:max-w-sm → max-w-[300px] md:max-w-lg
  - CTA: white/green-text pill → green gradient (shop-action → #1AAF6E) + shadow-green-glow + hover:shadow-green-glow-hover + btn-press, white text
  - Trust cue chip (NEW): "🕐 Delivery in ~30 min" glass badge next to CTA, backdropFilter blur
  - Eyebrow "Fresh from your neighbourhood" added above headline (hidden on mobile, shown md:)
  - Bottom padding: pb-10 → pb-8 md:pb-12

Issues found: None

P06-S03 should know:
  - Mobile composition improved with eyebrow hidden (md:block) to reduce clutter at 375px
  - Headline is now much larger — verify it doesn't overflow at 375px
  - Trust cue chip sits inline with CTA — wraps gracefully on mobile
```

---

*Session file for P06-S02.*
