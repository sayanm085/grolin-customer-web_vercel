'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, ArrowUpDown, ChevronRight, PackageSearch } from 'lucide-react'
import { HeaderCategoryNav, HeaderCategoryNavSkeleton } from '@/components/layout/HeaderCategoryNav'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGridSkeleton } from '@/components/product/ProductCardSkeleton'
import { EmptyStateCard, PageShell } from '@/components/shared'
import { getCategoryImageSrc } from '@/lib/media'
import { getHomepageCategoryNav } from '@/lib/shopfront/shopfront-home.utils'
import { categoriesService } from '@/services/categories.service'
import type { Category, Product } from '@/types/product.types'

type CategoryFilterId = 'all' | 'in-stock' | 'on-sale' | 'under-100' | 'under-500'

type CategoryFilter = {
  id: CategoryFilterId
  label: string
  predicate: (product: Product) => boolean
}

function toNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

function getDisplayPrice(product: Product) {
  return toNumber(product.sale_price ?? product.salePrice ?? product.price)
}

function hasSale(product: Product) {
  const discountValue = toNumber((product as Product & { discount?: number | string | null }).discount)
  return discountValue !== null && discountValue > 0
    ? true
    : product.sale_price !== null && product.sale_price !== undefined
      ? true
      : product.salePrice !== null && product.salePrice !== undefined
}

function getCategoryHeroTheme(name: string) {
  const normalized = name.toLowerCase()

  if (normalized.includes('fruit') || normalized.includes('vegetable')) {
    return {
      gradient: 'linear-gradient(135deg, #6E49D8 0%, #2FA56F 100%)',
      glow: 'rgba(255,255,255,0.16)',
    }
  }

  if (normalized.includes('dairy') || normalized.includes('egg')) {
    return {
      gradient: 'linear-gradient(135deg, #5B78D4 0%, #6E49D8 100%)',
      glow: 'rgba(255,255,255,0.14)',
    }
  }

  if (normalized.includes('bakery') || normalized.includes('bread')) {
    return {
      gradient: 'linear-gradient(135deg, #D9983D 0%, #6E49D8 100%)',
      glow: 'rgba(255,255,255,0.14)',
    }
  }

  if (normalized.includes('beverage') || normalized.includes('drink')) {
    return {
      gradient: 'linear-gradient(135deg, #1D6FB8 0%, #6E49D8 100%)',
      glow: 'rgba(255,255,255,0.14)',
    }
  }

  if (normalized.includes('snack')) {
    return {
      gradient: 'linear-gradient(135deg, #E3B93C 0%, #6E49D8 100%)',
      glow: 'rgba(255,255,255,0.14)',
    }
  }

  return {
    gradient: 'linear-gradient(135deg, #6E49D8 0%, #8A63F0 52%, #2FA56F 100%)',
    glow: 'rgba(255,255,255,0.15)',
  }
}

const CATEGORY_FILTERS: CategoryFilter[] = [
  {
    id: 'all',
    label: 'All',
    predicate: () => true,
  },
  {
    id: 'in-stock',
    label: 'In Stock',
    predicate: (product) => {
      const stockQuantity = toNumber(product.stock_quantity)
      const stockValue = toNumber((product as Product & { stock?: number | string | null }).stock)
      const inStockFlag = (product as Product & { inStock?: boolean }).inStock
      return (stockQuantity !== null && stockQuantity > 0) || (stockValue !== null && stockValue > 0) || inStockFlag === true
    },
  },
  {
    id: 'on-sale',
    label: 'On Sale',
    predicate: (product) => hasSale(product),
  },
  {
    id: 'under-100',
    label: 'Under ₹100',
    predicate: (product) => {
      const displayPrice = getDisplayPrice(product)
      return displayPrice !== null && displayPrice < 100
    },
  },
  {
    id: 'under-500',
    label: 'Under ₹500',
    predicate: (product) => {
      const displayPrice = getDisplayPrice(product)
      return displayPrice !== null && displayPrice < 500
    },
  },
]

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('popular')
  const [activeFilter, setActiveFilter] = useState<CategoryFilterId>('all')
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const observerRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['category-products', params.id, page, sort],
    queryFn: () => categoriesService.getProducts(params.id, { page, sort }),
  })

  const { data: category } = useQuery({
    queryKey: ['category', params.id],
    queryFn: () => categoriesService.getById(params.id),
  })

  const { data: allCategories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['categories', 'nav'],
    queryFn: categoriesService.getAll,
  })

  const navCategories = useMemo(
    () => getHomepageCategoryNav(allCategories as Category[], 8, params.id),
    [allCategories, params.id],
  )

  const availableFilters = useMemo(() => {
    if (allProducts.length === 0) {
      return [] as CategoryFilter[]
    }

    return CATEGORY_FILTERS.filter((filter) => {
      if (filter.id === 'all') return true
      return allProducts.some(filter.predicate)
    })
  }, [allProducts])

  const filteredProducts = useMemo(() => {
    const activeDefinition = CATEGORY_FILTERS.find((filter) => filter.id === activeFilter) ?? CATEGORY_FILTERS[0]!
    return allProducts.filter(activeDefinition.predicate)
  }, [activeFilter, allProducts])

  useEffect(() => {
    if (!data?.products) return

    if (page === 1) {
      setAllProducts(data.products)
      return
    }

    setAllProducts((prev) => [...prev, ...data.products])
  }, [data?.products, page])

  useEffect(() => {
    setPage(1)
    setAllProducts([])
    setActiveFilter('all')
  }, [sort])

  useEffect(() => {
    if (availableFilters.length === 0) return
    if (availableFilters.some((filter) => filter.id === activeFilter)) return
    setActiveFilter('all')
  }, [activeFilter, availableFilters])

  useEffect(() => {
    const element = observerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || !data?.pagination) return
        if (page >= data.pagination.totalPages) return
        setPage((currentPage) => currentPage + 1)
      },
      { rootMargin: '300px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [data?.pagination, page])

  const heroTheme = getCategoryHeroTheme(category?.name ?? 'Category')
  const heroImage = category ? getCategoryImageSrc(category) : null
  const totalProducts = data?.pagination?.total ?? allProducts.length
  const loadErrorMessage = error instanceof Error ? error.message : undefined

  return (
    <PageShell spacing="relaxed">
      {loadingCategories ? (
        <section className="px-1 pb-1 sm:px-0">
          <div className="overflow-hidden rounded-[26px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] shadow-[var(--shop-shadow-level-1)]">
            <HeaderCategoryNavSkeleton />
          </div>
        </section>
      ) : navCategories.length > 0 ? (
        <section className="px-1 pb-1 sm:px-0">
          <div className="overflow-hidden rounded-[26px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] shadow-[var(--shop-shadow-level-1)]">
            <HeaderCategoryNav categories={navCategories} />
          </div>
        </section>
      ) : null}

      <section
        className="relative overflow-hidden rounded-[30px] border border-white/15 px-5 py-5 text-white shadow-[var(--shop-shadow-level-3)] sm:px-6 sm:py-6 lg:px-8 lg:py-8"
        style={{ background: heroTheme.gradient }}
      >
        <div className="pointer-events-none absolute -right-14 top-[-24px] h-40 w-40 rounded-full" style={{ background: heroTheme.glow, filter: 'blur(8px)' }} />
        <div className="pointer-events-none absolute bottom-[-36px] left-[-28px] h-32 w-32 rounded-full" style={{ background: heroTheme.glow, filter: 'blur(8px)' }} />

        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_280px] lg:items-end">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-[12px] font-medium text-white/78">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-70" />
              <Link href="/categories" className="transition-colors hover:text-white">
                Categories
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-70" />
              <span className="text-white">{category?.name ?? 'Category'}</span>
            </nav>

            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">Curated aisle</p>
            <h1 className="max-w-[700px] text-[30px] font-extrabold leading-[1.02] tracking-[-0.025em] sm:text-[36px] lg:text-[44px]">
              {category?.name ?? 'Products'}
            </h1>
            <p className="mt-3 max-w-[640px] text-sm leading-6 text-white/80 sm:text-[15px]">
              {category?.description ?? 'Explore a premium category view with cleaner discovery, filters, and product rhythm.'}
            </p>

            <div className="mt-5 inline-flex items-center rounded-full border border-white/18 bg-white/12 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md">
              {totalProducts > 0 ? `${totalProducts} products available in this curated aisle` : 'Loading category inventory'}
            </div>
          </div>

          <div className="relative hidden h-[220px] overflow-hidden rounded-[24px] border border-white/16 bg-white/12 shadow-[0_18px_44px_rgba(15,23,42,0.18)] lg:block">
            {heroImage ? (
              <Image
                src={heroImage}
                alt={category?.name ?? 'Category'}
                fill
                unoptimized
                className="object-contain p-6"
                sizes="280px"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.28),transparent_55%),radial-gradient(circle_at_72%_68%,rgba(255,255,255,0.2),transparent_50%)]" />
            )}
          </div>
        </div>
      </section>

      <section className="shop-surface-soft rounded-[30px] p-4 sm:p-5 lg:p-6">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--shop-primary)]">Filter this aisle</p>
            <p className="mt-2 max-w-[760px] text-sm leading-6 text-[color:var(--shop-ink-muted)]">
              {category?.description ?? 'Discover the best products in this aisle with faster sorting and cleaner filter chips.'}
            </p>
          </div>

          <div className="inline-flex h-11 items-center gap-2 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-4 text-sm font-semibold text-[color:var(--shop-ink)] shadow-[var(--shop-shadow-level-1)]">
            <ArrowUpDown className="h-4 w-4 text-[color:var(--shop-primary)]" />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="bg-transparent pr-1 text-sm outline-none"
              aria-label="Sort products"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {availableFilters.length > 0 ? (
          <div className="mb-5 overflow-x-auto pb-1 scrollbar-hide">
            <div className="flex min-w-max items-center gap-2">
              {availableFilters.map((filter) => {
                const isActive = activeFilter === filter.id

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={
                      isActive
                        ? 'inline-flex h-8 items-center rounded-full bg-[color:var(--shop-primary)] px-4 text-[12px] font-medium text-white shadow-[var(--shop-shadow-level-1)]'
                        : 'inline-flex h-8 items-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-4 text-[12px] font-medium text-[color:var(--shop-ink)] transition-colors hover:bg-[color:var(--shop-primary-soft)]'
                    }
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}

        {isLoading && page === 1 ? (
          <ProductGridSkeleton count={12} />
        ) : isError && page === 1 ? (
          <div
            className="overflow-hidden rounded-[26px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] shadow-[var(--shop-shadow-level-1)]"
            title={loadErrorMessage}
          >
            <EmptyStateCard
              icon={AlertCircle}
              title="Couldn't load this aisle"
              subtitle="We couldn't load live products for this category right now. Try again or browse other curated aisles."
              ctaLabel="Try Again"
              ctaAction={() => refetch()}
              secondaryCtaLabel="Browse Categories"
              secondaryCtaHref="/categories"
            />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : allProducts.length > 0 ? (
          <EmptyStateCard
            icon={PackageSearch}
            title="No matches for this filter"
            subtitle="Try a different chip to explore more products in this aisle."
            ctaLabel="Show All Products"
            ctaAction={() => setActiveFilter('all')}
          />
        ) : (
          <EmptyStateCard
            icon={PackageSearch}
            title="No products in this category"
            subtitle="This aisle does not have active products yet. Explore other categories for live inventory."
            ctaLabel="Back to Categories"
            ctaHref="/categories"
          />
        )}

        <div ref={observerRef} className="h-10" />

        {isLoading && page > 1 ? (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[color:var(--shop-border)] border-t-[color:var(--shop-primary)]" />
          </div>
        ) : null}
      </section>
    </PageShell>
  )
}
