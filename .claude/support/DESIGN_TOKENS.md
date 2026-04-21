---
project: grolin
role: support
---
# DESIGN TOKEN REFERENCE

> Quick-reference for design tokens. Source of truth: `src/app/globals.css` + `tailwind.config.ts`

## Colors

| Token | Value | Role | Usage |
|-------|-------|------|-------|
| `--shop-canvas` | `#F0ECE8` | Page background | Every page bg |
| `--shop-surface` | `#FFFFFF` | Card/panel bg | All cards |
| `--shop-surface-subtle` | `#FAF8F5` | Inset/alt bg | Alternate sections |
| `--shop-primary` | `#16945E` | Commerce actions | Add to Cart, Checkout, CTA |
| `--shop-accent` | `#6E49D8` | Brand/auth | Logo, Nav active, OTP |
| `--shop-secondary-blue` | `#1D6FB8` | Trust | Delivery time, trust marks |
| `--shop-search-amber` | `#E3B93C` | Search CTA ONLY | Search button. Nowhere else. |
| `--shop-discount` | `#C2410C` | Discounts | Sale price, "Save ₹X" |
| `--shop-text` | `#1A232B` | Body text | Primary content |
| `--shop-text-muted` | `#56606B` | Secondary text | Descriptions, labels |

## Shadows (5-tier warm system)

| Level | Value | Use Case |
|-------|-------|----------|
| `--shadow-1` | `0 2px 8px rgba(26,35,43,0.06), 0 1px 3px rgba(26,35,43,0.04)` | Cards at rest |
| `--shadow-2` | `0 4px 16px rgba(26,35,43,0.08), 0 2px 6px rgba(26,35,43,0.05)` | Dropdowns |
| `--shadow-3` | `0 8px 32px rgba(110,73,216,0.12), 0 2px 8px rgba(110,73,216,0.06)` | Auth/wallet |
| `--shadow-4` | `0 1px 0 rgba(26,35,43,0.06), 0 4px 20px rgba(26,35,43,0.10)` | Sticky header |
| `--shadow-5` | `0 12px 40px rgba(26,35,43,0.12), 0 4px 12px rgba(26,35,43,0.08)` | Card hover |

## Typography Scale

| Level | Mobile | Desktop | Weight | Role |
|-------|--------|---------|--------|------|
| Hero headline | clamp(34px,5.5vw,58px) | — | 800 | Brand statement |
| Editorial | clamp(28px,4.5vw,46px) | — | 800 | Section anchors |
| Section heading | 22px | 28px | 700 | Group titles |
| Card heading | 15px | 17px | 700 | Product names |
| Body | 14px | 15px | 500 | Descriptions |
| Eyebrow | 11px | 12px | 700 | Labels |
| Badge/chip | 10px | 11px | 700 | Status |
| Price | 16px | 18px | 800 | Commerce |

## Surfaces

| Surface | Background | Effect |
|---------|-----------|--------|
| Base page | `--shop-canvas` | Warm ivory everywhere |
| Elevated card | `--shop-surface` + shadow-1 | White card floating |
| Soft inset | `--shop-surface-subtle` | Alternate section bg |
| Premium promo | mesh gradient + grain | Hero, promo bands |
| Dark editorial | mesh-dark (#1A0E3D) | Scroll-stopper band |
| Glass overlay | `glass-surface` (backdrop-blur) | Header on scroll |

## Fixed Values

- Card border-radius: `22px` (Grolin signature — NEVER change)
- Section max-width: `max-w-screen-xl` (1280px)
- Horizontal gutters: `px-4 md:px-8`
- Section vertical spacing: `py-8 md:py-12`
- Font: Plus Jakarta Sans (via `next/font/google`)

## Color Logic

```
GREEN  → Commerce: Add to Cart, Checkout, Place Order, Success
PURPLE → Brand/Auth: Logo, Nav active, OTP, Selected states
BLUE   → Trust: Delivery time, Trust marks, "~30 min"
AMBER  → Search CTA ONLY. Nowhere else. Ever.
RUST   → Discount: Sale price, "Save ₹X", badges
```
## Header & Chrome Tokens (established in P09)

| Token | Value | Use |
|-------|-------|-----|
| `--shop-header-surface` | `rgba(240,236,232,0.72)` → glass on scroll | Header transparent-to-glass transition |
| `--shop-header-shadow` | `var(--shadow-4)` on scroll | Header sticky shadow |
| Glass nav surface | `rgba(240,236,232,0.94)` | Bottom nav warm glass bg |

## State Tokens

| State | Treatment | Use |
|-------|----------|-----|
| Hover (desktop) | `translateY(-4px)` + `shadow-5` | Card & interactive lift |
| Press (mobile) | `scale(0.97)` | Button & card tap feedback |
| Focus-visible | `outline: 2px solid var(--shop-primary); outline-offset: 2px` | Accessibility focus ring |
| Disabled | `opacity: 0.5; cursor: not-allowed` | Inactive elements |

---

*Related files: ANIMATION_TOOLKIT.md (motion), SCROLL_CHOREOGRAPHY.md (section narrative), UI_VISION.md (conversion direction).*
