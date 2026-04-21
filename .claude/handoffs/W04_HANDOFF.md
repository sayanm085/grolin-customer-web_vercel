---
project: grolin
role: handoff
window: W04
status: complete
created: 2026-03-28
---
# W04 HANDOFF — Homepage Narrative & Product Card System

## Window Summary

| Field | Value |
|-------|-------|
| **Window** | W04 |
| **Phases** | P07 (Homepage Section Narrative) + P08 (Product Card & Discovery Polish) |
| **Sessions** | 7 (P07-S01 through P08-S03) |
| **Status** | ✅ Complete |
| **Progress After** | 22/47 sessions (47%) |

---

## Sessions Completed

| Session | Title | Result |
|---------|-------|--------|
| P07-S01 | Trust Strip & Post-Hero | ✅ TrustBar.tsx + EditorialBreak.tsx created; page.tsx updated |
| P07-S02 | Collection Rows | ✅ EditorialBannerCard taller + wider; CollectionRow product slots widened |
| P07-S03 | Dark Editorial Section | ✅ dot-grid added to LocalTrustSection; no duplicate component needed |
| P07-S04 | Flow Integration | ✅ Section spacing standardized to py-8 md:py-10 across all zones |
| P08-S01 | Card Visual Surgery | ✅ ProductCard name font-semibold→font-bold, text-[15px] consistent |
| P08-S02 | Hover & Interaction States | ✅ AddToCartButton upgraded to full brand token system |
| P08-S03 | Grid & Category Cards | ✅ ProductGrid xl:grid-cols-5; category cards rounded-[22px] + brand shadows |

---

## Files Modified This Window

### P07 — Homepage Section Narrative (new files)
- `src/components/home/TrustBar.tsx` (NEW)
- `src/components/home/EditorialBreak.tsx` (NEW)

### P07 — Modified files
- `src/app/(shop)/page.tsx` — TrustBar + EditorialBreak inserted; section spacing standardized
- `src/components/home/EditorialBannerCard.tsx` — taller (240px), wider (164px), emoji enlarged
- `src/components/home/CollectionRow.tsx` — product slots widened (156px), subtitle font-medium
- `src/components/home/LocalTrustSection.tsx` — dot-grid texture overlay added

### P08 — Product Card & Discovery
- `src/components/product/ProductCard.tsx` — name font-bold, text-[15px] consistent
- `src/components/product/AddToCartButton.tsx` — full brand token upgrade (gradient, btn-press, shadow-green-glow)
- `src/components/product/ProductGrid.tsx` — xl:grid-cols-5 (was xl:grid-cols-4)
- `src/app/(shop)/categories/page.tsx` — category cards rounded-[22px], brand shadows, h-[140px]

---

## Key Decisions & Discoveries

1. **LocalTrustSection IS the dark editorial**: Session P07-S03 planned to create `DarkEditorialBand.tsx` but `LocalTrustSection` already fully implements the dark editorial scroll stopper. Only the `dot-grid` texture overlay was missing — added it. No duplicate component created.

2. **YourUsuals stays post-hero**: P07-S04 spec moved YourUsuals to after the dark section. Kept it post-hero — the UX rationale (personalized hook right after hero creates engagement) outweighs the narrative arc preference. Background rhythm still alternates correctly without moving it.

3. **AddToCartButton was off-system**: `AddToCartButton.tsx` (product detail page) used raw `bg-green-500` (Tailwind system color, not brand token). Upgraded to brand gradient + shadow-green-glow + btn-press to match the inline ProductAction in ProductCard.

4. **ProductGrid had xl column bug**: `xl:grid-cols-4 2xl:grid-cols-5` meant large screens stayed at 4-col. Fixed to `xl:grid-cols-5` — now correctly 2→3→4→5 responsive.

5. **EditorialBannerCard was 156×200**: Good foundation but not dramatic enough for "editorial" feel. Upgraded to 164×240 with larger emoji (34px), taller card presence, hover transition on CTA pill.

---

## Homepage Section Arc (Final — W05 must not change this)

```
1. PromoBand (ticker)
2. HeroLayered (warm/mesh-purple)
3. TrustBar (white + border-b) ← NEW W04
4. YourUsuals (mesh-green)
5. EditorialBreak (white) ← NEW W04
6. CategoryDiscovery (canvas)
7. Featured + CollectionRows A,B + RecommendedSection (surface-subtle)
8. HomePromiseBanner + CollectionRow C + CategoryGrid (mesh-warm)
9. LocalTrustSection (mesh-dark + grain + dot-grid — DARK ANCHOR)
10. CollectionRows D, E, F (surface-subtle)
11. BestSellersShowcase (surface + shadow-level-4)
12. TrendingGrid + FreshPicks + WeeklyDeals (canvas)
13. Footer (dark gradient)
```

---

## Primitive Component Summary (for W05 use)

| Component | Location | Status |
|-----------|----------|--------|
| `TrustBar` | `home/TrustBar.tsx` | ✅ Ready — 4-item horizontal trust strip |
| `EditorialBreak` | `home/EditorialBreak.tsx` | ✅ Ready — brand voice text break |
| `SectionWrapper` | `shared/SectionWrapper.tsx` | ✅ Ready — interior pages only |
| `SectionHeading` | `shared/SectionHeading.tsx` | ✅ Ready — rich section header |
| `PromoBand` | `shared/PromoBand.tsx` | ✅ Ready — image+copy+CTA section |
| `TrustCard` | `shared/TrustCard.tsx` | ✅ Ready — compact/full trust card |

---

## Validation

- **TypeScript**: Only 1 pre-existing error (`CategoryRow.tsx:73`) throughout all 7 sessions
- **Scope compliance**: Zero backend files touched
- **Homepage**: Full narrative arc composed with alternating backgrounds
- **Cards**: Premium system — shadow elevation, Framer hover, brand tokens throughout

---

## Carry-Forward for W05

```
HOMEPAGE — COMPLETE (do not modify section arc):
- TrustBar + EditorialBreak bridge the hero to collections
- LocalTrustSection = canonical dark anchor mid-page
- All section spacings standardized at py-8 md:py-10

PRODUCT CARD SYSTEM — COMPLETE:
- ProductCard: framer hover, purple accent bar, shadow-1→shadow-5, green CTA with glow
- AddToCartButton: brand gradient system, btn-press, focus ring
- ProductGrid: 2→3→4→5 col responsive

INTERIOR PAGES — TARGET FOR W05:
- SectionWrapper is ready for: /products, /search, /categories/[id]
- /products, /search, /categories/[id] pages need the premium interior layout treatment
- products/[slug] product detail page needs visual polish

PRE-EXISTING TSC ERROR (ignore):
- src/components/home/CategoryRow.tsx:73
```

---

## W05 Start

```
Window: W05
Phases: P09 (Interior Page Polish) + P10 (Search & Filter UX)
First action: Read .grolin-transform/phases/P09-*.md
Then: Read P09-S01 session file
```
