'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { ShoppingCart, ArrowRight, Flame, Clock, Sparkles } from 'lucide-react'
import { HeroLayered } from '@/components/home/HeroLayered'
import { BestSellersShowcase, BestSellersShowcaseSkeleton } from '@/components/home/BestSellersShowcase'
import { CategoryRow } from '@/components/home/CategoryRow'
import { CategoryRowSkeleton } from '@/components/home/CategoryRowSkeleton'
import { CollectionRow } from '@/components/home/CollectionRow'
import { HomeCategoryGrid, HomeCategoryGridSkeleton } from '@/components/home/HomeCategoryGrid'
import { HomeFeatureGrid, HomeFeatureGridSkeleton } from '@/components/home/HomeFeatureGrid'
import { EditorialBreak } from '@/components/home/EditorialBreak'
import { CinematicBanner, DualCinematicBanner } from '@/components/home/CinematicBanner'
import { PromoBand } from '@/components/home/PromoBand'
import { TodaysFreshPicks } from '@/components/home/TodaysFreshPicks'
import { HomeSectionHeader } from '@/components/home/HomeSectionHeader'
import { HomeTrendingGrid } from '@/components/home/HomeTrendingGrid'
import { RecommendedSection } from '@/components/home/RecommendedSection'
import { YourUsualsSection } from '@/components/home/YourUsualsSection'
import { ViewportReveal } from '@/components/shared/ViewportReveal'
import { HeaderCategoryNav, HeaderCategoryNavSkeleton } from '@/components/layout/HeaderCategoryNav'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { QUERY_KEYS, STALE_TIMES } from '@/lib/constants'
import {
  getHomepageCategoryGrid,
  getHomepageCategoryNav,
  getTrendingProducts,
  type HomepageCategoryNavItem,
} from '@/lib/shopfront/shopfront-home.utils'
import {
  getDemoAllProducts,
  getDemoBanners,
  getDemoCategories,
  getDemoDealProducts,
  getDemoFeaturedProducts,
  getDemoNewArrivals,
} from '@/lib/shopfront/shopfront-demo-data'
import { bannersService } from '@/services/banners.service'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'
import type { Category, Product } from '@/types/product.types'

type CollectionDefinition = {
  id: string
  title: string
  eyebrow: string
  emoji: string
  query: string
  gradient: string
  subtitle: string
  productKeywords: string[]
  categoryKeywords: string[]
  image?: string
}

const COLLECTION_DEFINITIONS: CollectionDefinition[] = [
  {
    id: 'quick-breakfast',
    title: 'Quick Breakfast',
    eyebrow: 'BREAKFAST',
    emoji: '\u{1F950}',
    query: 'breakfast',
    gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    subtitle: 'Fast-start pantry and dairy staples for rushed mornings and easy first orders.',
    productKeywords: ['bread', 'egg', 'milk', 'butter', 'jam', 'banana', 'cereal', 'breakfast', 'toast', 'oats'],
    categoryKeywords: ['dairy', 'bakery', 'fruits', 'breakfast'],
    image: '/images/collections/col-breakfast.webp',
  },
  {
    id: 'tonights-dinner',
    title: "Tonight's Dinner",
    eyebrow: 'DINNER',
    emoji: '\u{1F372}',
    query: 'dinner',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #16945E 100%)',
    subtitle: 'Dinner-building essentials that help a shopper move from idea to basket fast.',
    productKeywords: ['rice', 'pasta', 'sauce', 'paneer', 'masala', 'dal', 'oil', 'vegetable', 'dinner', 'cook'],
    categoryKeywords: ['pantry', 'vegetables', 'dairy', 'snacks'],
    image: '/images/collections/col-dinner.webp',
  },
  {
    id: 'healthy-week',
    title: 'Healthy Week',
    eyebrow: 'HEALTHY',
    emoji: '\u{1F96C}',
    query: 'healthy',
    gradient: 'linear-gradient(135deg, #065F46 0%, #16945E 100%)',
    subtitle: 'Light, clean, repeatable picks for fruit, greens, oats, yogurt, and balance-led baskets.',
    productKeywords: ['salad', 'fruit', 'oats', 'nuts', 'yogurt', 'healthy', 'granola', 'fresh', 'greens'],
    categoryKeywords: ['fruits', 'vegetables', 'dairy'],
    image: '/images/collections/col-healthy.webp',
  },
  {
    id: 'weekend-treats',
    title: 'Weekend Treats',
    eyebrow: 'TREATS',
    emoji: '\u{1F370}',
    query: 'treats',
    gradient: 'linear-gradient(135deg, #BE185D 0%, #7C3AED 100%)',
    subtitle: 'Snacks, sweets, drinks, and indulgent picks that make the weekend feel worth planning.',
    productKeywords: ['chips', 'ice cream', 'cookie', 'biscuit', 'chocolate', 'cola', 'juice', 'snack', 'treat'],
    categoryKeywords: ['snacks', 'beverages', 'dairy'],
    image: '/images/collections/col-treats.webp',
  },
  {
    id: 'home-essentials',
    title: 'Home Essentials',
    eyebrow: 'ESSENTIALS',
    emoji: '\u{1F9F4}',
    query: 'essentials',
    gradient: 'linear-gradient(135deg, #1E3A5F 0%, #1D6FB8 100%)',
    subtitle: 'Utility-led products for the home layer of grocery shopping, not just the kitchen layer.',
    productKeywords: ['detergent', 'soap', 'tissue', 'dishwash', 'cleaner', 'essential', 'wash', 'care'],
    categoryKeywords: ['care', 'home', 'personal'],
    image: '/images/collections/col-essentials.webp',
  },
  {
    id: 'family-favourites',
    title: 'Family Favourites',
    eyebrow: 'FAMILY',
    emoji: '\u{1F46A}',
    query: 'family',
    gradient: 'linear-gradient(135deg, #9A3412 0%, #EA580C 100%)',
    subtitle: 'Friendly staples for bigger households, repeat orders, and kid-safe crowd-pleasers.',
    productKeywords: ['family', 'kids', 'juice', 'snack', 'milk', 'cereal', 'biscuit', 'favourite'],
    categoryKeywords: ['baby', 'dairy', 'snacks', 'beverages'],
    image: '/images/collections/col-family.webp',
  },
]

function getSelectedCategoryScopeIds(categories: Category[], selectedCategoryId: string) {
  if (selectedCategoryId === 'all') {
    return null
  }

  const categoryScopeIds = new Set<string>([selectedCategoryId])
  let expanded = true

  while (expanded) {
    expanded = false

    for (const category of categories) {
      if (category.parent_id && categoryScopeIds.has(category.parent_id) && !categoryScopeIds.has(category.id)) {
        categoryScopeIds.add(category.id)
        expanded = true
      }
    }
  }

  return categoryScopeIds
}

function filterProductsForHome(products: Product[], categoryScopeIds: Set<string> | null) {
  if (!categoryScopeIds) {
    return products
  }

  return products.filter((product) => categoryScopeIds.has(product.category_id))
}

function dedupeProducts(products: Product[]) {
  const seen = new Set<string>()
  return products.filter((product) => {
    if (!product.id || seen.has(product.id)) return false
    seen.add(product.id)
    return true
  })
}

function buildProductSearchText(product: Product, categoriesById: Map<string, Category>) {
  return [
    product.name,
    product.description ?? '',
    product.category_name ?? '',
    categoriesById.get(product.category_id)?.name ?? '',
    ...(product.tags ?? []),
  ]
    .join(' ')
    .toLowerCase()
}

function countMatches(text: string, keywords: string[]) {
  return keywords.reduce((count, keyword) => (text.includes(keyword) ? count + 1 : count), 0)
}

function buildCollectionProducts(
  definition: CollectionDefinition,
  products: Product[],
  categoriesById: Map<string, Category>,
) {
  const scored = dedupeProducts(products)
    .map((product, index) => {
      const text = buildProductSearchText(product, categoriesById)
      const productHits = countMatches(text, definition.productKeywords)
      const categoryHits = countMatches(text, definition.categoryKeywords)
      const queryHit = text.includes(definition.query.toLowerCase()) ? 1 : 0
      const score =
        productHits * 6 +
        categoryHits * 4 +
        queryHit * 3 +
        (product.is_featured ? 1 : 0) +
        Math.min(3, Math.floor((product.total_sold || 0) / 50))

      return { product, score, index }
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        (b.product.total_sold || 0) - (a.product.total_sold || 0) ||
        a.index - b.index,
    )

  const selected = scored.filter((entry) => entry.score > 0).map((entry) => entry.product)

  if (selected.length >= 8) {
    return selected.slice(0, 8)
  }

  const leftovers = scored
    .map((entry) => entry.product)
    .filter((product) => !selected.some((chosen) => chosen.id === product.id))

  return [...selected, ...leftovers].slice(0, 8)
}

export default function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')
  const demoBanners = useMemo(() => getDemoBanners(), [])
  const demoCategories = useMemo(() => getDemoCategories(), [])
  const demoFeaturedProducts = useMemo(() => getDemoFeaturedProducts(12), [])
  const demoNewArrivals = useMemo(() => getDemoNewArrivals(12), [])
  const demoDealProducts = useMemo(() => getDemoDealProducts(12), [])
  const demoCatalogProducts = useMemo(() => getDemoAllProducts({ limit: 60 }).products, [])

  const { data: banners = demoBanners } = useQuery({
    queryKey: QUERY_KEYS.banners,
    queryFn: bannersService.getActive,
    staleTime: STALE_TIMES.banners,
    retry: false,
    placeholderData: demoBanners,
  })

  const { data: allCategories = demoCategories, isLoading: loadingCategories } = useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: categoriesService.getAll,
    staleTime: STALE_TIMES.categories,
    retry: false,
    placeholderData: demoCategories,
  })

  const { data: featuredProducts = demoFeaturedProducts, isLoading: loadingFeatured } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productsService.getFeatured(12),
    staleTime: STALE_TIMES.products,
    retry: false,
    placeholderData: demoFeaturedProducts,
  })

  const { data: newArrivals = demoNewArrivals } = useQuery({
    queryKey: ['products', 'new-arrivals'],
    queryFn: () => productsService.getNewArrivals(12),
    staleTime: STALE_TIMES.products,
    retry: false,
    placeholderData: demoNewArrivals,
  })

  const { data: dealProducts = demoDealProducts } = useQuery({
    queryKey: ['products', 'deals'],
    queryFn: () => productsService.getDeals(12),
    staleTime: STALE_TIMES.products,
    retry: false,
    placeholderData: demoDealProducts,
  })

  const { data: catalogData, isLoading: loadingCatalog } = useQuery({
    queryKey: ['products', 'all-home'],
    queryFn: () => productsService.getAll({ limit: 60 }),
    staleTime: STALE_TIMES.products,
    retry: false,
    placeholderData: { products: demoCatalogProducts, pagination: { page: 1, limit: 60, total: demoCatalogProducts.length, totalPages: 1 } },
  })

  const resolvedBanners = useMemo(
    () => (banners.length > 0 ? banners : demoBanners),
    [banners, demoBanners],
  )
  const resolvedCategories = useMemo(
    () => (allCategories.length > 0 ? allCategories : demoCategories) as Category[],
    [allCategories, demoCategories],
  )
  const resolvedFeaturedProducts = useMemo(
    () => (featuredProducts.length > 0 ? featuredProducts : demoFeaturedProducts),
    [demoFeaturedProducts, featuredProducts],
  )
  const resolvedNewArrivals = useMemo(
    () => (newArrivals.length > 0 ? newArrivals : demoNewArrivals),
    [demoNewArrivals, newArrivals],
  )
  const resolvedDealProducts = useMemo(
    () => (dealProducts.length > 0 ? dealProducts : demoDealProducts),
    [dealProducts, demoDealProducts],
  )
  const resolvedCatalogProducts = useMemo(
    () => (catalogData?.products?.length ? catalogData.products : demoCatalogProducts),
    [catalogData?.products, demoCatalogProducts],
  )

  const discoveryCategories = useMemo(() => getHomepageCategoryNav(resolvedCategories, 8), [resolvedCategories])

  useEffect(() => {
    if (selectedCategoryId === 'all') {
      return
    }

    if (!discoveryCategories.some((category) => category.id === selectedCategoryId)) {
      setSelectedCategoryId('all')
    }
  }, [discoveryCategories, selectedCategoryId])

  const discoveryCategoryIds = useMemo(() => discoveryCategories.map((category) => category.id), [discoveryCategories])
  const categories = getHomepageCategoryGrid(resolvedCategories, 10, discoveryCategoryIds)
  const selectedCategoryScopeIds = useMemo(
    () => getSelectedCategoryScopeIds(resolvedCategories, selectedCategoryId),
    [resolvedCategories, selectedCategoryId],
  )
  const selectedCategoryLabel = useMemo(() => {
    if (selectedCategoryId === 'all') {
      return 'All Categories'
    }

    return (
      discoveryCategories.find((category) => category.id === selectedCategoryId)?.navLabel ??
      resolvedCategories.find((category) => category.id === selectedCategoryId)?.name ??
      'Selected Category'
    )
  }, [discoveryCategories, resolvedCategories, selectedCategoryId])

  const filteredFeaturedProducts = useMemo(
    () => filterProductsForHome(resolvedFeaturedProducts, selectedCategoryScopeIds),
    [resolvedFeaturedProducts, selectedCategoryScopeIds],
  )
  const filteredNewArrivals = useMemo(
    () => filterProductsForHome(resolvedNewArrivals, selectedCategoryScopeIds),
    [resolvedNewArrivals, selectedCategoryScopeIds],
  )
  const filteredDealProducts = useMemo(
    () => filterProductsForHome(resolvedDealProducts, selectedCategoryScopeIds),
    [resolvedDealProducts, selectedCategoryScopeIds],
  )

  const trendingProducts = getTrendingProducts({
    featured: resolvedFeaturedProducts,
    deals: resolvedDealProducts,
    newArrivals: resolvedNewArrivals,
    excludeIds: resolvedFeaturedProducts.slice(0, 6).map((product) => product.id),
  })

  const filteredTrendingProducts = useMemo(
    () => filterProductsForHome(trendingProducts, selectedCategoryScopeIds),
    [selectedCategoryScopeIds, trendingProducts],
  )

  const categoriesById = useMemo(
    () => new Map(resolvedCategories.map((category) => [category.id, category])),
    [resolvedCategories],
  )

  const collectionSourceProducts = useMemo(
    () =>
      dedupeProducts([
        ...resolvedFeaturedProducts,
        ...resolvedNewArrivals,
        ...resolvedDealProducts,
        ...resolvedCatalogProducts,
      ]),
    [resolvedCatalogProducts, resolvedDealProducts, resolvedFeaturedProducts, resolvedNewArrivals],
  )

  const curatedCollections = useMemo(
    () =>
      COLLECTION_DEFINITIONS.map((definition) => ({
        ...definition,
        viewAllHref: `/search?q=${encodeURIComponent(definition.query)}`,
        products: buildCollectionProducts(definition, collectionSourceProducts, categoriesById),
      })),
    [categoriesById, collectionSourceProducts],
  )

  const shouldShowCategorySkeleton = loadingCategories && discoveryCategories.length === 0
  const shouldShowFeaturedSkeleton = loadingFeatured && resolvedFeaturedProducts.length === 0

  return (
    <div className="pb-0">
      <PromoBand />
      <HeroLayered banners={resolvedBanners} />

      <ViewportReveal variant="default">
        <div className="relative overflow-hidden bg-[color:var(--shop-canvas)] py-5 md:py-6">
          <div className="relative max-w-screen-xl mx-auto">
            <YourUsualsSection />
          </div>
        </div>
      </ViewportReveal>

      <ViewportReveal variant="default">
        <div className="relative overflow-hidden bg-[color:var(--shop-canvas)] py-3 md:py-4">
          <div className="relative">
            {shouldShowCategorySkeleton ? (
              <HomepageCategoryDiscoverySkeleton />
            ) : discoveryCategories.length > 0 ? (
              <HomepageCategoryDiscovery
                categories={discoveryCategories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
              />
            ) : null}
          </div>
        </div>
      </ViewportReveal>

      <ViewportReveal variant="default">
        <div className="relative overflow-hidden bg-[color:var(--shop-canvas)] py-3 md:py-4">
          <div className="relative z-10 mx-auto max-w-[1680px]">
            {shouldShowFeaturedSkeleton ? (
              <HomeFeatureGridSkeleton />
            ) : filteredFeaturedProducts.length > 0 ? (
              <HomeFeatureGrid
                products={filteredFeaturedProducts.slice(0, 10)}
                title="Featured Deals"
                subtitle="High-conviction value picks designed to open the homepage with energy and intent."
              />
            ) : null}

            {curatedCollections[0] && curatedCollections[0].products.length > 0 && (
              <CollectionRow
                title={curatedCollections[0].title}
                eyebrow={curatedCollections[0].eyebrow}
                emoji={curatedCollections[0].emoji}
                subtitle={curatedCollections[0].subtitle}
                gradient={curatedCollections[0].gradient}
                products={curatedCollections[0].products}
                viewAllHref={curatedCollections[0].viewAllHref}
                image={curatedCollections[0].image}
              />
            )}

            {/* ── Cinematic Banner: Breakfast context ── */}
            <div className="home-section-spacing">
              <CinematicBanner variant="breakfast" />
            </div>

            <RecommendedSection />

            {curatedCollections[1] && curatedCollections[1].products.length > 0 && (
              <CollectionRow
                title={curatedCollections[1].title}
                eyebrow={curatedCollections[1].eyebrow}
                emoji={curatedCollections[1].emoji}
                subtitle={curatedCollections[1].subtitle}
                gradient={curatedCollections[1].gradient}
                products={curatedCollections[1].products}
                viewAllHref={curatedCollections[1].viewAllHref}
                image={curatedCollections[1].image}
              />
            )}

            {/* ── Cinematic Banner: Dinner context ── */}
            <div className="home-section-spacing">
              <CinematicBanner variant="dinner" />
            </div>
          </div>
        </div>
      </ViewportReveal>

      <div className="h-2 bg-[color:var(--shop-canvas)]" />

      {/* Editorial Break — moved away from hero into the middle page flow */}
      <EditorialBreak />

      <ViewportReveal variant="default">
        <div className="relative overflow-hidden bg-[color:var(--shop-canvas)] py-3 md:py-4">
          <div className="relative">
            {curatedCollections[2] && curatedCollections[2].products.length > 0 && (
              <CollectionRow
                title={curatedCollections[2].title}
                eyebrow={curatedCollections[2].eyebrow}
                emoji={curatedCollections[2].emoji}
                subtitle={curatedCollections[2].subtitle}
                gradient={curatedCollections[2].gradient}
                products={curatedCollections[2].products}
                viewAllHref={curatedCollections[2].viewAllHref}
                image={curatedCollections[2].image}
              />
            )}

            {/* ── Dual Banners: Healthy + Treats ── */}
            <div className="home-section-spacing">
              <DualCinematicBanner left="healthy" right="treats" />
            </div>

            {loadingCategories && categories.length === 0 ? <HomeCategoryGridSkeleton /> : categories.length > 0 ? <HomeCategoryGrid categories={categories} /> : null}
          </div>
        </div>
      </ViewportReveal>

      <ViewportReveal variant="default">
        <div className="relative overflow-hidden bg-[color:var(--shop-canvas)] py-3 md:py-4">
          <div className="relative">
            {curatedCollections[3] && curatedCollections[3].products.length > 0 && (
              <CollectionRow
                title={curatedCollections[3].title}
                eyebrow={curatedCollections[3].eyebrow}
                emoji={curatedCollections[3].emoji}
                subtitle={curatedCollections[3].subtitle}
                gradient={curatedCollections[3].gradient}
                products={curatedCollections[3].products}
                viewAllHref={curatedCollections[3].viewAllHref}
                image={curatedCollections[3].image}
              />
            )}

            {curatedCollections[4] && curatedCollections[4].products.length > 0 && (
              <CollectionRow
                title={curatedCollections[4].title}
                eyebrow={curatedCollections[4].eyebrow}
                emoji={curatedCollections[4].emoji}
                subtitle={curatedCollections[4].subtitle}
                gradient={curatedCollections[4].gradient}
                products={curatedCollections[4].products}
                viewAllHref={curatedCollections[4].viewAllHref}
                image={curatedCollections[4].image}
              />
            )}

            {curatedCollections[5] && curatedCollections[5].products.length > 0 && (
              <CollectionRow
                title={curatedCollections[5].title}
                eyebrow={curatedCollections[5].eyebrow}
                emoji={curatedCollections[5].emoji}
                subtitle={curatedCollections[5].subtitle}
                gradient={curatedCollections[5].gradient}
                products={curatedCollections[5].products}
                viewAllHref={curatedCollections[5].viewAllHref}
                image={curatedCollections[5].image}
              />
            )}

            {/* ── Dual Banners: Essentials + Family ── */}
            <div className="home-section-spacing">
              <DualCinematicBanner left="essentials" right="family" />
            </div>
          </div>
        </div>
      </ViewportReveal>

      <ViewportReveal variant="default">
        <div className="relative overflow-hidden bg-[color:var(--shop-canvas)] py-3 md:py-4">
          <div className="relative mx-auto max-w-[1680px]">
            {shouldShowFeaturedSkeleton ? (
              <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
                <BestSellersShowcaseSkeleton />
              </section>
            ) : filteredFeaturedProducts.length > 0 ? (
              <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
                <BestSellersShowcase products={filteredFeaturedProducts} />
              </section>
            ) : null}
          </div>
        </div>
      </ViewportReveal>

      <div className="relative overflow-hidden bg-[color:var(--shop-canvas)] py-3 md:py-4">
        <div className="relative mx-auto max-w-[1680px]">
          {filteredTrendingProducts.length > 0 && <HomeTrendingGrid products={filteredTrendingProducts} />}

          {/* ── Cinematic Banner: Free Delivery promo ── */}
          <div className="home-section-spacing">
            <CinematicBanner variant="free-delivery" compact />
          </div>

          <TodaysFreshPicks products={filteredNewArrivals} isLoading={shouldShowFeaturedSkeleton} />

          {/* ═══════════════════════════════════════════════════════════
              WEEKLY PICKS — Cinematic Conversion-Focused Spotlight
              ═══════════════════════════════════════════════════════════ */}
          {filteredDealProducts.length > 0 && (
            <WeeklyPicksSection products={filteredDealProducts} />
          )}

          {(selectedCategoryId !== 'all' || (!loadingCatalog && resolvedCatalogProducts.length === 0)) && (
            <AllProductsSection
              products={resolvedCatalogProducts}
              isLoading={loadingCatalog}
              selectedCategoryId={selectedCategoryId}
              selectedCategoryLabel={selectedCategoryLabel}
              selectedCategoryScopeIds={selectedCategoryScopeIds}
              onResetSelection={() => setSelectedCategoryId('all')}
            />
          )}
        </div>
      </div>

    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
//  WEEKLY PICKS — Cinematic Conversion-Focused Spotlight
// ═══════════════════════════════════════════════════════════════════
function WeeklyPicksSection({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const prefersReduced = useReducedMotion()
  const heroProduct = products[0]
  const supportingProducts = products.slice(1, 7)

  // Calculate max savings for counter
  const maxSavings = useMemo(() => {
    return products.slice(0, 6).reduce((max, p) => {
      const salePrice = p.sale_price ?? p.salePrice ?? null
      const saved = salePrice !== null && salePrice < p.price ? p.price - salePrice : 0
      return saved > max ? saved : max
    }, 0)
  }, [products])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden home-section-spacing"
      aria-label="Weekly Picks"
    >
      {/* ═══ ATMOSPHERIC BACKGROUND ═══ */}
      <div className="absolute inset-0 z-0" style={{
        background: `linear-gradient(165deg, 
          var(--shop-canvas, #F0ECE8) 0%, 
          #EDE6DF 20%,
          #F0E9F5 45%, 
          #EDE3F8 60%, 
          #F0E9F5 75%,
          var(--shop-canvas, #F0ECE8) 100%)`,
      }} />

      {/* Floating ambient orbs */}
      <div
        className="ambient-orb z-0"
        style={{
          width: 350, height: 350,
          top: '-15%', left: '60%',
          background: 'rgba(110, 73, 216, 0.07)',
          filter: 'blur(90px)',
          animationDelay: '1s',
        }}
      />
      <div
        className="ambient-orb z-0"
        style={{
          width: 280, height: 280,
          bottom: '5%', left: '-5%',
          background: 'rgba(22, 148, 94, 0.06)',
          filter: 'blur(80px)',
          animationDelay: '3s',
        }}
      />

      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(110,73,216,0.3) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top shimmer accent */}
      <div className="absolute left-0 right-0 top-0 z-[1] shimmer-accent-line" />

      <div className="relative z-[2] px-3 sm:px-4 lg:px-6">

        {/* ═══ CINEMATIC HEADER ═══ */}
        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div className="flex flex-col gap-2.5">
            {/* Urgency pill badge */}
            <m.span
              initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-orange-700 ring-1 ring-orange-500/15 backdrop-blur-sm"
            >
              <Flame className="h-3 w-3" strokeWidth={2.2} />
              Hot Deals
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
              </span>
            </m.span>

            {/* Headline */}
            <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-black tracking-[-0.03em] leading-[1.1] text-[color:var(--shop-ink)]">
              Weekly{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E49D8] via-[#9B6DFF] to-[#6E49D8]" style={{ backgroundSize: '200% 100%', animation: 'shimmer-accent 4s ease-in-out infinite' }}>
                  Picks
                </span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#6E49D8] via-[#A78BFA] to-[#6E49D8]"
                  style={{ backgroundSize: '200% 100%', animation: 'shimmer-accent 4s ease-in-out infinite' }}
                />
              </span>
            </h2>

            <p className="mt-0.5 max-w-[520px] text-[13px] sm:text-[14px] leading-[1.6] text-[color:var(--shop-ink-muted)] font-medium">
              Best-value deals handpicked from this week&apos;s freshest drops — shop early for the best picks.
            </p>

            {/* Savings counter badge */}
            {maxSavings > 0 && (
              <m.div
                initial={prefersReduced ? false : { opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.3 }}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--shop-action)]/8 px-3.5 py-1.5 ring-1 ring-[color:var(--shop-action)]/12"
              >
                <span className="text-[11px] font-semibold text-[color:var(--shop-action)]">
                  Save up to
                </span>
                <span className="text-[15px] font-black text-[color:var(--shop-action)] savings-glow">
                  ₹{maxSavings}
                </span>
                <span className="text-[11px] font-semibold text-[color:var(--shop-action)]">
                  this week
                </span>
              </m.div>
            )}
          </div>

          {/* See all + refresh timer */}
          <div className="flex flex-col items-end gap-2 mb-1">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--shop-primary)] px-5 py-2.5 text-[12px] font-bold text-white shadow-[0_4px_16px_rgba(110,73,216,0.25)] transition-all duration-200 hover:shadow-[0_6px_24px_rgba(110,73,216,0.35)] hover:scale-[1.02]"
            >
              View All Deals
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </Link>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[color:var(--shop-ink-faint)] uppercase tracking-[0.12em]">
              <Clock className="h-3 w-3" strokeWidth={1.8} />
              Deals refresh weekly
            </span>
          </div>
        </m.div>

        {/* ═══ PRODUCT GRID ═══ */}
        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100, damping: 22, delay: 0.2 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6"
        >
          {/* Hero spotlight — first deal gets special treatment */}
          {heroProduct && (
            <div className="col-span-2 sm:col-span-1 xl:col-span-1">
              <div className="deal-spotlight-glow rounded-[var(--shop-card-radius)]">
                <ProductCard product={heroProduct} priority />
              </div>
            </div>
          )}

          {/* Supporting deals */}
          {supportingProducts.map((product, index) => (
            <m.div
              key={product.id}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 22,
                delay: 0.25 + index * 0.05,
              }}
            >
              <ProductCard product={product} priority={index < 3} />
            </m.div>
          ))}
        </m.div>

        {/* ═══ INLINE CTA STRIP ═══ */}
        <m.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100, damping: 22, delay: 0.5 }}
          className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-[color:var(--shop-primary)]/8 bg-gradient-to-r from-[color:var(--shop-primary)]/[0.03] via-transparent to-[color:var(--shop-action)]/[0.03] px-5 py-3"
        >
          <Sparkles className="h-4 w-4 text-[color:var(--shop-primary)] opacity-60" strokeWidth={1.8} />
          <p className="text-[12px] sm:text-[13px] font-semibold text-[color:var(--shop-ink-muted)]">
            Deals refresh every week — <span className="text-[color:var(--shop-primary)] font-bold">shop early</span> for the best picks
          </p>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[color:var(--shop-primary)] transition-colors hover:text-[color:var(--shop-primary-hover)]"
          >
            Browse All
            <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
          </Link>
        </m.div>
      </div>

      {/* Bottom shimmer accent */}
      <div className="absolute left-0 right-0 bottom-0 z-[1] shimmer-accent-line" />
    </section>
  )
}

function HomepageCategoryDiscovery({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: {
  categories: HomepageCategoryNavItem[]
  selectedCategoryId: string
  onSelectCategory: (categoryId: string) => void
}) {
  return (
    <section className="px-2 pt-2 sm:px-3 lg:px-4 lg:pt-3">
      <div className="overflow-hidden rounded-[28px] border border-[color:var(--shop-border)] bg-white shadow-[0_20px_56px_rgba(26,35,43,0.06)]">
        <HeaderCategoryNav
          categories={categories}
          mode="select"
          activeCategoryId={selectedCategoryId}
          onCategorySelect={onSelectCategory}
        />

        <div className="px-0 pb-3 pt-2 sm:px-3 sm:pb-4 lg:px-4 lg:pb-4 lg:pt-3">
          <CategoryRow
            categories={categories}
            selectedCategoryId={selectedCategoryId === 'all' ? undefined : selectedCategoryId}
          />
        </div>
      </div>
    </section>
  )
}

function HomepageCategoryDiscoverySkeleton() {
  return (
    <section className="px-2 pt-2 sm:px-3 lg:px-4 lg:pt-3">
      <div className="overflow-hidden rounded-[28px] border border-[color:var(--shop-border)] bg-white shadow-[0_20px_56px_rgba(26,35,43,0.06)]">
        <HeaderCategoryNavSkeleton />
        <div className="px-0 pb-3 pt-2 sm:px-3 sm:pb-4 lg:px-4 lg:pb-4 lg:pt-3">
          <CategoryRowSkeleton />
        </div>
      </div>
    </section>
  )
}

function AllProductsSection({
  products,
  isLoading,
  selectedCategoryId = 'all',
  selectedCategoryLabel = 'All Categories',
  selectedCategoryScopeIds,
  onResetSelection,
}: {
  products: Product[]
  isLoading: boolean
  selectedCategoryId?: string
  selectedCategoryLabel?: string
  selectedCategoryScopeIds: Set<string> | null
  onResetSelection?: () => void
}) {
  const visibleProducts = useMemo(
    () => filterProductsForHome(products, selectedCategoryScopeIds),
    [products, selectedCategoryScopeIds],
  )

  if (isLoading && products.length === 0) {
    return (
      <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
        <Skeleton className="mb-4 h-6 w-32 rounded" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    )
  }

  if (selectedCategoryId !== 'all' && visibleProducts.length === 0) {
    return (
      <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-6 py-16 text-center shadow-[var(--shop-shadow-level-1)]">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
            <ShoppingCart className="h-10 w-10" />
          </div>
          <h2 className="mb-2 text-lg font-bold text-[color:var(--shop-ink)]">No products in {selectedCategoryLabel} yet</h2>
          <p className="max-w-[340px] text-sm text-[color:var(--shop-ink-muted)]">
            Try another category from the selector above and keep exploring without leaving the homepage.
          </p>
          <button
            type="button"
            onClick={onResetSelection}
            className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--shop-primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--shop-primary-hover)]"
          >
            Show All Products
          </button>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-6 py-20 shadow-[var(--shop-shadow-level-1)]">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
            <ShoppingCart className="h-10 w-10" />
          </div>
          <h2 className="mb-1 text-lg font-bold text-[color:var(--shop-ink)]">No products yet</h2>
          <p className="max-w-[300px] text-center text-sm text-[color:var(--shop-ink-muted)]">
            Check back soon for fresh groceries.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
      <HomeSectionHeader
        title={selectedCategoryId === 'all' ? 'All Products' : `More in ${selectedCategoryLabel}`}
        subtitle={
          selectedCategoryId === 'all'
            ? 'Fallback live catalog rendering when primary featured merchandising is unavailable.'
            : `Products filtered to ${selectedCategoryLabel.toLowerCase()} without leaving the homepage.`
        }
        eyebrow={selectedCategoryId === 'all' ? 'CATALOG' : 'SELECTED'}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {visibleProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
