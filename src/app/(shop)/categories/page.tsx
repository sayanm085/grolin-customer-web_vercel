'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { m, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Clock3,
  LayoutGrid,
  PackageOpen,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
} from 'lucide-react'
import { EmptyStateCard, PageShell } from '@/components/shared'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { QUERY_KEYS, STALE_TIMES } from '@/lib/constants'
import { getCategoryImageSrc } from '@/lib/media'
import { categoriesService } from '@/services/categories.service'
import type { Category } from '@/types/product.types'
import { cn } from '@/lib/utils'

type CategoryTheme = {
  priority: number
  accent: string
  imageStage: string
  chip: string
  blurb: string
  badgeClassName: string
}

const CATEGORY_THEME_MATCHERS: Array<{
  keywords: string[]
  theme: CategoryTheme
}> = [
  {
    keywords: ['fruit', 'vegetable', 'greens', 'produce'],
    theme: {
      priority: 0,
      accent: '#16835C',
      imageStage: 'from-[#EEF7EF] via-[#E2F2E6] to-[#D3EAD7]',
      chip: 'Fresh produce',
      blurb: 'Daily-picked vegetables and fruit basket staples for fast household refills.',
      badgeClassName: 'border-[#B7DFC5] bg-[#EFF8F1] text-[#196A4B]',
    },
  },
  {
    keywords: ['dairy', 'egg', 'milk', 'paneer'],
    theme: {
      priority: 0,
      accent: '#2F6FCC',
      imageStage: 'from-[#EFF5FF] via-[#E2EEFF] to-[#D7E7FF]',
      chip: 'Chilled essentials',
      blurb: 'Milk, eggs, butter, and everyday cold-chain essentials customers reorder most.',
      badgeClassName: 'border-[#C7D9F6] bg-[#F1F6FF] text-[#2E5FA8]',
    },
  },
  {
    keywords: ['bakery', 'bread', 'breakfast'],
    theme: {
      priority: 0,
      accent: '#B36A21',
      imageStage: 'from-[#FFF6E8] via-[#FFF0D9] to-[#FFE7C4]',
      chip: 'Morning stock-up',
      blurb: 'Fresh breads, breakfast staples, and oven-fresh picks for the first order of the day.',
      badgeClassName: 'border-[#F2D6B3] bg-[#FFF6EB] text-[#9A5A1B]',
    },
  },
  {
    keywords: ['beverage', 'drink', 'tea', 'coffee'],
    theme: {
      priority: 0,
      accent: '#2C7B8F',
      imageStage: 'from-[#EEF8FB] via-[#E1F1F6] to-[#D3E9F0]',
      chip: 'Sip & pour',
      blurb: 'Tea, coffee, juices, and bottle shelf winners for fast restocking.',
      badgeClassName: 'border-[#B9DEE8] bg-[#EEF8FA] text-[#2B6878]',
    },
  },
  {
    keywords: ['snack', 'chip', 'biscuit'],
    theme: {
      priority: 0,
      accent: '#D27B10',
      imageStage: 'from-[#FFF8E8] via-[#FFF3D8] to-[#FEEABF]',
      chip: 'Quick bites',
      blurb: 'Fast-moving munchies, biscuit jars, and pantry cravings in one aisle.',
      badgeClassName: 'border-[#F3D9A8] bg-[#FFF8EA] text-[#B2670D]',
    },
  },
  {
    keywords: ['rice', 'grain', 'oil', 'masala', 'spice', 'pantry'],
    theme: {
      priority: 0,
      accent: '#A06118',
      imageStage: 'from-[#FFF8EE] via-[#FBEFD9] to-[#F6E1BC]',
      chip: 'Pantry base',
      blurb: 'Rice sacks, masala jars, oils, and kitchen staples that keep the pantry full.',
      badgeClassName: 'border-[#EFD6B3] bg-[#FFF7ED] text-[#8A5515]',
    },
  },
  {
    keywords: ['frozen'],
    theme: {
      priority: 1,
      accent: '#4774B7',
      imageStage: 'from-[#EFF4FF] via-[#E2EBFF] to-[#D6E2FF]',
      chip: 'Frozen reserve',
      blurb: 'Freezer-friendly essentials, quick meals, and always-ready backups.',
      badgeClassName: 'border-[#CAD8F4] bg-[#F2F6FF] text-[#3F629A]',
    },
  },
  {
    keywords: ['personal', 'baby', 'household', 'care'],
    theme: {
      priority: 1,
      accent: '#8A5BA8',
      imageStage: 'from-[#F7F0FB] via-[#F1E7F8] to-[#E8D9F1]',
      chip: 'Home care',
      blurb: 'Home, hygiene, and care-driven essentials for repeat family shopping.',
      badgeClassName: 'border-[#DFCDEA] bg-[#F8F1FB] text-[#7A4B98]',
    },
  },
  {
    keywords: ['mobile', 'tablet', 'wearable', 'gadget', 'fashion', 'appliance'],
    theme: {
      priority: 2,
      accent: '#4A596B',
      imageStage: 'from-[#F3F5F7] via-[#ECEFF3] to-[#E3E7EB]',
      chip: 'Lifestyle aisle',
      blurb: 'Additional lifestyle inventory currently merchandised in the same storefront.',
      badgeClassName: 'border-[#D9DFE5] bg-[#F4F7F9] text-[#516070]',
    },
  },
]

const DEFAULT_THEME: CategoryTheme = {
  priority: 1,
  accent: '#365C4A',
  imageStage: 'from-[#F3F7F4] via-[#ECF2EE] to-[#E4ECE6]',
  chip: 'Curated aisle',
  blurb: 'A high-rotation category assembled for faster discovery and repeat purchases.',
  badgeClassName: 'border-[#D8E4DC] bg-[#F4F8F5] text-[#365C4A]',
}

function getCategoryTheme(category: Category): CategoryTheme {
  const haystack = `${category.name} ${category.description ?? ''}`.toLowerCase()
  return (
    CATEGORY_THEME_MATCHERS.find((entry) =>
      entry.keywords.some((keyword) => haystack.includes(keyword)),
    )?.theme ?? DEFAULT_THEME
  )
}

function sortCategories(categories: Category[]) {
  return [...categories].sort((left, right) => {
    const leftTheme = getCategoryTheme(left)
    const rightTheme = getCategoryTheme(right)

    if (leftTheme.priority !== rightTheme.priority) {
      return leftTheme.priority - rightTheme.priority
    }

    if ((right.product_count ?? 0) !== (left.product_count ?? 0)) {
      return (right.product_count ?? 0) - (left.product_count ?? 0)
    }

    return left.name.localeCompare(right.name)
  })
}

function CategoryVisual({
  category,
  className,
  imageClassName,
}: {
  category: Category
  className?: string
  imageClassName?: string
}) {
  const [failed, setFailed] = useState(false)
  const imageSrc = getCategoryImageSrc(category)
  const theme = getCategoryTheme(category)
  const usesGenericPlaceholder =
    imageSrc.includes('/placeholder-product.svg') ||
    imageSrc.includes('/images/product-placeholder.svg')
  const canRenderImage = Boolean(imageSrc && !failed && !usesGenericPlaceholder)
  const letters = category.name
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[28px] bg-gradient-to-br',
        theme.imageStage,
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full opacity-70 blur-2xl"
        style={{ backgroundColor: `${theme.accent}30` }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full opacity-60 blur-2xl"
        style={{ backgroundColor: `${theme.accent}22` }}
      />

      {canRenderImage ? (
        <Image
          src={imageSrc}
          alt={category.name}
          fill
          unoptimized
          sizes="(max-width: 768px) 50vw, 25vw"
          onError={() => setFailed(true)}
          className={cn('object-contain p-6', imageClassName)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/70 text-[24px] font-black shadow-[0_12px_24px_rgba(255,255,255,0.35)]"
            style={{ color: theme.accent }}
          >
            {letters || 'G'}
          </div>
          <div className="space-y-2">
            <p className="max-w-[10ch] text-[28px] font-black leading-[0.88] tracking-[-0.05em] text-[#203327]">
              {category.name}
            </p>
            <p className="text-[12px] font-medium text-[#5B6A61]">
              {category.description || theme.blurb}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function FeaturedCategoryCard({
  category,
  index,
  reducedMotion,
}: {
  category: Category
  index: number
  reducedMotion: boolean | null
}) {
  const theme = getCategoryTheme(category)

  return (
    <m.div
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/categories/${category.id}`} className="group block h-full">
        <Card className="h-full overflow-hidden rounded-[32px] border-[#E8E0D2] bg-white shadow-[0_24px_52px_rgba(20,34,23,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(20,34,23,0.14)]">
          <CardContent className="p-0">
            <div className="grid min-h-[360px] lg:grid-rows-[210px_minmax(0,1fr)]">
              <CategoryVisual
                category={category}
                className="rounded-none"
                imageClassName="object-contain p-7 transition-transform duration-500 group-hover:scale-[1.05]"
              />

              <div className="flex h-full flex-col justify-between px-6 py-5">
                <div>
                  <Badge
                    variant="outline"
                    className={cn('rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]', theme.badgeClassName)}
                  >
                    {theme.chip}
                  </Badge>
                  <h2 className="mt-4 text-[28px] font-black leading-[0.96] tracking-[-0.04em] text-[#1B2C22]">
                    {category.name}
                  </h2>
                  <p className="mt-3 text-[14px] leading-6 text-[#667267]">
                    {category.description || theme.blurb}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B877B]">Live count</p>
                    <p className="mt-1 text-[24px] font-black leading-none text-[#1B2C22]">
                      {category.product_count ?? 0}
                    </p>
                  </div>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-1"
                    style={{ backgroundColor: theme.accent }}
                  >
                    <ArrowRight className="h-[18px] w-[18px]" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </m.div>
  )
}

function DirectoryCategoryCard({
  category,
  index,
  reducedMotion,
}: {
  category: Category
  index: number
  reducedMotion: boolean | null
}) {
  const theme = getCategoryTheme(category)

  return (
    <m.div
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.025, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/categories/${category.id}`} className="group block h-full">
        <Card className="h-full overflow-hidden rounded-[28px] border-[#EAE1D4] bg-white shadow-[0_16px_36px_rgba(20,34,23,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D9D0C3] hover:shadow-[0_22px_48px_rgba(20,34,23,0.1)]">
          <CardContent className="p-0">
            <div className="flex h-full flex-col">
              <CategoryVisual
                category={category}
                className="h-[180px] rounded-none border-b border-[#F0E8DB]"
                imageClassName="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
              />

              <div className="flex flex-1 flex-col justify-between px-5 py-4">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[18px] font-black leading-[1.02] tracking-[-0.03em] text-[#1B2C22]">
                        {category.name}
                      </p>
                      <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-[#667267]">
                        {category.description || theme.blurb}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn('rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]', theme.badgeClassName)}
                    >
                      {category.product_count ?? 0} items
                    </Badge>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#7D897E]">
                    Explore aisle
                  </span>
                  <ArrowRight className="h-[18px] w-[18px] text-[#1B2C22] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </m.div>
  )
}

export default function CategoriesPage() {
  useEffect(() => {
    document.title = 'Categories - Grolin'
  }, [])

  const reducedMotion = useReducedMotion()

  const { data: allCategories = [], isLoading } = useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: categoriesService.getAll,
    staleTime: STALE_TIMES.categories,
  })

  const categories = useMemo(
    () => sortCategories(allCategories.filter((category: Category) => category.is_active && !category.parent_id)),
    [allCategories],
  )

  const featuredCategories = categories.slice(0, 3)
  const directoryCategories = categories.slice(3)
  const totalProducts = categories.reduce((sum, category) => sum + (category.product_count ?? 0), 0)
  const groceryFirstCount = categories.filter((category) => getCategoryTheme(category).priority === 0).length

  return (
    <PageShell spacing="relaxed" className="max-w-[1440px] pb-8">
      <section className="relative overflow-hidden rounded-[40px] border border-[#173A2B] bg-[#10261C] text-[#FFF9EF] shadow-[0_32px_80px_rgba(9,24,17,0.22)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,38,28,0.98)_0%,rgba(18,51,36,0.95)_42%,rgba(33,78,54,0.9)_100%)]" />
        <div className="pointer-events-none absolute right-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-[#F0C24A]/18 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-120px] left-[-80px] h-[300px] w-[300px] rounded-full bg-[#F08C3A]/14 blur-[120px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
            <m.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[720px]"
            >
              <Badge className="rounded-full border-0 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0C24A] shadow-none">
                Category Directory
              </Badge>
              <h1 className="mt-5 max-w-[680px] text-[38px] font-black leading-[0.94] tracking-[-0.05em] text-[#FFF9EF] sm:text-[50px] lg:text-[64px]">
                Shop by aisle, not by guesswork.
              </h1>
              <p className="mt-5 max-w-[620px] text-[16px] leading-7 text-white/72">
                Fresh produce, pantry staples, home care, and every fast-moving aisle organised into a cleaner category directory with stronger visuals and easier scanning.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/8 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/48">Active aisles</p>
                  <p className="mt-1 text-[24px] font-black leading-none text-[#FFF9EF]">{categories.length}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/8 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/48">Live products</p>
                  <p className="mt-1 text-[24px] font-black leading-none text-[#FFF9EF]">{totalProducts}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/8 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/48">Grocery-first aisles</p>
                  <p className="mt-1 text-[24px] font-black leading-none text-[#FFF9EF]">{groceryFirstCount}</p>
                </div>
              </div>
            </m.div>

            <m.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 sm:grid-cols-3"
            >
              {[
                {
                  icon: ShoppingBasket,
                  label: 'Faster discovery',
                  body: 'Bigger category visuals and stronger labels cut down decision time.',
                },
                {
                  icon: Clock3,
                  label: 'Daily use first',
                  body: 'Fresh and pantry-led aisles stay ahead of lower-priority inventory.',
                },
                {
                  icon: ShieldCheck,
                  label: 'Premium clarity',
                  body: 'Cleaner surfaces, tighter spacing, and product-led imagery throughout.',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[28px] border border-white/10 bg-white/[0.06] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-white/10 text-[#F0C24A]">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-4 text-[15px] font-bold text-[#FFF9EF]">{item.label}</p>
                  <p className="mt-2 text-[13px] leading-6 text-white/62">{item.body}</p>
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#16835C]">Featured Aisles</p>
            <h2 className="mt-2 text-[30px] font-black leading-[0.98] tracking-[-0.04em] text-[#1B2C22]">
              High-traffic categories customers open first.
            </h2>
          </div>

          <Badge
            variant="outline"
            className="w-fit rounded-full border-[#D8E0D5] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5E6D62]"
          >
            {featuredCategories.length} highlighted aisles
          </Badge>
        </div>

        {isLoading ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="skeleton-shimmer h-[360px] rounded-[32px]" />
            ))}
          </div>
        ) : featuredCategories.length === 0 ? (
          <EmptyStateCard
            icon={LayoutGrid}
            title="No categories yet"
            subtitle="The merchandising team has not published categories yet. Check back soon."
            ctaLabel="Return Home"
            ctaHref="/"
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {featuredCategories.map((category, index) => (
              <FeaturedCategoryCard
                key={category.id}
                category={category}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        )}
      </section>

      {!isLoading && categories.length > 0 ? (
        <section className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#16835C]">All Aisles</p>
              <h2 className="mt-2 text-[30px] font-black leading-[0.98] tracking-[-0.04em] text-[#1B2C22]">
                Browse the full category directory.
              </h2>
              <p className="mt-3 max-w-[720px] text-[15px] leading-7 text-[#667267]">
                Every category sits on a cleaner premium card with larger product-led imagery, clearer counts, and faster scanning.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="rounded-full border-[#D8E0D5] bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#5E6D62]"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Premium layout
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full border-[#D8E0D5] bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#5E6D62]"
              >
                <PackageOpen className="mr-1.5 h-3.5 w-3.5" />
                {totalProducts} products mapped
              </Badge>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {directoryCategories.map((category, index) => (
              <DirectoryCategoryCard
                key={category.id}
                category={category}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          <div className="rounded-[30px] border border-[#E8E0D2] bg-[linear-gradient(180deg,#FFFDF8_0%,#FBF6EC_100%)] px-6 py-6 shadow-[0_18px_42px_rgba(20,34,23,0.06)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#16835C]">Need faster product discovery?</p>
                <h3 className="mt-2 text-[24px] font-black leading-[1] tracking-[-0.04em] text-[#1B2C22]">
                  Search directly across every aisle.
                </h3>
                <p className="mt-3 max-w-[680px] text-[14px] leading-7 text-[#667267]">
                  Jump straight into products if you already know what you want, or open an aisle to browse a cleaner category feed.
                </p>
              </div>

              <Button
                asChild
                className="h-11 rounded-full bg-[#1A8B58] px-5 text-[14px] font-semibold text-white hover:bg-[#157146]"
              >
                <Link href="/search">
                  Open Search
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  )
}
