---
project: grolin
role: support
---
# SCROLL CHOREOGRAPHY — Homepage Narrative

> The homepage is a 15-second story told through scroll.
> Each section has an emotional job, a motion role, and a conversion purpose.
> Reference: UI_VISION.md for conversion, ANIMATION_TOOLKIT.md for motion recipes.

---

## The Scroll Story

### Beat 1: Arrival (Hero — 0vh)
- **FEEL**: Confident, warm, premium
- **MOTION**: Headline staggers in. CTA springs. Mesh background is static.
- **CONVERSION**: "Shop Now" visible and tappable in <500ms
- **RULE**: After entrance completes, hero is STILL — zero continuous motion

### Beat 2: Trust (TrustBar — ~100vh)
- **FEEL**: Reassurance, speed, quality
- **MOTION**: Subtle fade-up on scroll entry. Icons already loaded.
- **CONVERSION**: "30-min delivery" + "100% fresh" → removes purchase objections
- **RULE**: Minimal animation — trust needs stability, not flashiness

### Beat 3: Familiarity (YourUsuals — ~150vh)
- **FEEL**: Personal, welcoming, "we know you"
- **MOTION**: Card stagger (first row only, 0.07s per child). Mesh gradient background.
- **CONVERSION**: Repeat purchase cards → easy re-order with one tap
- **RULE**: Only first visible card set staggers. Rest renders instantly.

### Beat 4: Pause (EditorialBreak — ~200vh)
- **FEEL**: Magazine-quality, brand voice, breathing room
- **MOTION**: Static text. No animation. Gradient headline sits still.
- **CONVERSION**: "Freshness you can trust" → brand promise reinforcement
- **RULE**: This is a REST beat. NO animation here. Let the eye breathe.

### Beat 5: Discovery (CategoryDiscovery — ~250vh)
- **FEEL**: Exploration, variety, curated selection
- **MOTION**: FromLeft reveal. Horizontal scroll card row.
- **CONVERSION**: Category cards → gives browsing path for undecided customers
- **RULE**: Horizontal scroll must be smooth and snappable

### Beat 6: Scroll Stopper (LocalTrustSection — ~300vh)
- **FEEL**: DRAMATIC contrast. Dark anchor. Premium confidence.
- **MOTION**: Scale reveal. Stat counters fade in. Mesh-dark + grain + dot-grid layers.
- **CONVERSION**: "1000+ families trust us" → social proof drives confidence
- **RULE**: This is the SINGLE scroll stopper — only ONE dark section per page

### Beat 7: Validation (BestSellers — ~350vh)
- **FEEL**: Social validation, popularity, safety in numbers
- **MOTION**: Card stagger (first row). Subtle parallax on watermark (desktop only).
- **CONVERSION**: "Others buy this" → reduces choice anxiety for new customers
- **RULE**: Parallax only on decorative watermark, NEVER on product cards

### Beat 8: Close (Footer — ~400vh)
- **FEEL**: Trust, completeness, professionalism
- **MOTION**: No animation. Static. Grain overlay.
- **CONVERSION**: Help links, contact, about → safety net for hesitant buyers
- **RULE**: Zero animation. Footer is the firm handshake goodbye.

---

## Scroll Rhythm Rules

1. **Never two animated sections back-to-back** — every animated section followed by breathing room
2. **Dark editorial is the SINGLE scroll stopper** — only one dark contrast section per page
3. **Parallax: max 2-3 surfaces, desktop only** — decorative elements only, never on content
4. **The scroll should feel like FLOWING, not JUMPING** — smooth spring gentle physics
5. **Mobile: simplify motion** — reduce stagger counts, skip parallax, skip float decorations
6. **Every section reveal fires ONCE** — `once: true` on every IntersectionObserver

## Section Reveal Map (for P12-S02)

| Section | Reveal Variant | Spring | Delay | Note |
|---------|---------------|--------|-------|------|
| TrustBar | `default` | gentle | 0ms | Fade up 24px |
| YourUsuals | `default` | gentle | 0ms | Card stagger inside |
| EditorialBreak | `default` | gentle | 0ms | Simple fade, no drama |
| CategoryDiscovery | `fromLeft` | gentle | 0ms | Directional energy |
| Featured+Collections | `default` | gentle | 0ms | Standard reveal |
| LocalTrustSection | `scale` | gentle | 100ms | Dark anchor = dramatic entry |
| Collections 4-6 | `default` | gentle | 0ms | Standard reveal |
| BestSellers | `default` | gentle | 0ms | Card stagger inside |

**NOT revealed (always visible)**: Hero, Header, Footer, mesh-warm backgrounds

---

*Scroll Choreography for the Grolin homepage. Referenced by P12 sessions. Read alongside ANIMATION_TOOLKIT.md.*
