---
project: grolin
role: support
---
# UI VISION — Conversion-Aware Design Direction

> Every UI decision must answer: "Does this help the customer buy?"
> Pretty doesn't pay if it doesn't sell. Premium MUST convert.

---

## Conversion Hierarchy (Priority Order)

1. **CTA visibility** — "Shop Now" / "Add to Cart" must be the most visually prominent element
2. **Product discovery** — Categories, search, and recommendations must feel effortless
3. **Trust building** — Delivery time, quality badges, social proof reduce purchase friction
4. **Urgency cues** — "Fresh today", stock indicators, time-limited deals
5. **Checkout momentum** — Cart → Checkout flow must feel like one continuous motion

## Mobile Conversion Principles (Grolin's primary channel)

- **Thumb zone**: Primary CTAs in bottom 40% of screen (natural thumb reach)
- **Add-to-Cart**: Always visible on product detail pages — never allows scroll-off on mobile
- **Cart summary**: Sticky bottom bar showing item count + total when items are in cart
- **Hero CTA**: Must be fully visible and tappable within 500ms of page load
- **Bottom nav**: Commerce actions (Cart badge with count) always accessible

## Hero — The Conversion Engine

The hero is NOT a decoration. It's the first 1 second of the customer relationship.

| Element | Conversion Job | Timing |
|---------|---------------|--------|
| Background mesh | Set premium tone — "this is quality" | 0ms (instant) |
| Headline | Promise value — "Fresh at your doorstep" | 0-300ms |
| Subheadline | Prove speed — "30-min delivery" | 100-400ms |
| CTA button | Call to action — "Shop Now" | 200-500ms (must be tappable) |
| Trust chip | Remove objection — "Free delivery" | 400-700ms |

**Rule**: CTA must be visible and interactive within 500ms on mobile Fast 3G.

## Section Conversion Map

| Section | Conversion Role | Emotional Job |
|---------|----------------|---------------|
| Hero | First impression → CTA engagement | "This is premium and fast" |
| TrustBar | Objection removal → "Safe to buy" | "30-min delivery, 100% fresh" |
| YourUsuals | Repeat purchase → "Your stuff is here" | Familiarity, recognition |
| CategoryDiscovery | Browse path → "Find what you need" | Exploration, variety |
| EditorialBanner | Brand aspiration → "This is premium" | Magazine-quality, aspiration |
| LocalTrustSection | Social proof → "Real customers trust us" | Credibility, community |
| BestSellers | Social validation → "Others buy this" | Reduces choice anxiety |

## Color as Conversion Signal

```
GREEN (#16945E) = "BUY" — every commerce CTA is green
  Maximum contrast against its container background
  Never appears next to purple (commerce ≠ brand)

AMBER (#E3B93C) = "SEARCH" — only on search CTA
  High energy, draws secondary attention

RUST (#C2410C) = "SAVE" — discount/sale prices only
  Creates urgency without cheapening the brand

PURPLE (#6E49D8) = "BRAND" — auth, logo, selected states
  Premium feel, never on commerce CTAs
```

## Empty State Recovery

Empty states are NOT dead ends. They're conversion recovery opportunities.

| Empty State | Copy | CTA |
|------------|------|------|
| Empty cart | "Your basket is waiting — add some fresh picks" | "Browse fresh picks →" |
| Empty search | "We couldn't find that — try these popular items" | Show popular products |
| Empty orders | "No orders yet — start your first delivery" | "Shop now →" |
| Error state | "Something went wrong. Your cart is safe." | "Try again" + "Go home" |

## Product Card Conversion Anatomy

```
┌─────────────────────────┐
│   [Product Image]       │  ← Tappable → product detail
│   ₹99 ₹129 (23% off)   │  ← Rust discount catches eye
│   Fresh Tomatoes 500g   │  ← Bold name, 15px
│   [+ Add to Cart]       │  ← Green, 44px+ touch target
└─────────────────────────┘
```

- Card shadow: shadow-1 at rest → shadow-5 on hover (desktop depth feedback)
- Card press: scale(0.97) on mobile tap (tactile feedback)
- Price: Discount price in rust, MRP in muted strikethrough
- CTA: Full-width green at card bottom, always visible

---

*UI Vision for the Grolin frontend. Read this during motion windows (W08–W10) to ensure animation serves conversion.*
