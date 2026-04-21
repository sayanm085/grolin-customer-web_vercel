'use client'

import { Suspense, useEffect, useMemo, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { m } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpDown, Clock3, Search, Sparkles, Trash2, X } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGridSkeleton } from '@/components/product/ProductGrid'
import { PageShell, SectionHeader } from '@/components/shared'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { STALE_TIMES } from '@/lib/constants'
import { fadeIn } from '@/lib/motion'
import { QUERY_KEYS } from '@/lib/queryKeys'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'
import { useSearchStore } from '@/store/search.store'
import type { Category, Product } from '@/types/product.types'

type SortValue = 'relevance' | 'newest' | 'price_asc' | 'price_desc'
type SearchFilterId = 'all' | 'in-stock' | 'on-sale' | 'under-100' | 'under-500'

const SORT_OPTIONS: Array<{ value: SortValue; label: string }> = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
]

const SEARCH_FILTERS: Array<{
    id: SearchFilterId
    label: string
    isSupported: (products: Product[]) => boolean
    predicate: (product: Product) => boolean
}> = [
    {
        id: 'all',
        label: 'All',
        isSupported: () => true,
        predicate: () => true,
    },
    {
        id: 'in-stock',
        label: 'In Stock',
        isSupported: (products) => products.some((product) => typeof product.stock_quantity === 'number'),
        predicate: (product) => product.stock_quantity > 0,
    },
    {
        id: 'on-sale',
        label: 'On Sale',
        isSupported: (products) =>
            products.some((product) => product.sale_price !== null && product.sale_price < product.price),
        predicate: (product) => product.sale_price !== null && product.sale_price < product.price,
    },
    {
        id: 'under-100',
        label: 'Under \u20B9100',
        isSupported: (products) => products.some((product) => typeof getDisplayPrice(product) === 'number'),
        predicate: (product) => getDisplayPrice(product) < 100,
    },
    {
        id: 'under-500',
        label: 'Under \u20B9500',
        isSupported: (products) => products.some((product) => typeof getDisplayPrice(product) === 'number'),
        predicate: (product) => getDisplayPrice(product) < 500,
    },
]

const CATEGORY_GRADIENTS: Record<string, string> = {
    vegetables: 'linear-gradient(135deg, rgba(22, 148, 94, 0.18) 0%, rgba(255, 255, 255, 0.96) 100%)',
    fruits: 'linear-gradient(135deg, rgba(251, 146, 60, 0.18) 0%, rgba(255, 255, 255, 0.96) 100%)',
    dairy: 'linear-gradient(135deg, rgba(29, 111, 184, 0.18) 0%, rgba(255, 255, 255, 0.96) 100%)',
    bakery: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(255, 255, 255, 0.96) 100%)',
    snacks: 'linear-gradient(135deg, rgba(234, 88, 12, 0.18) 0%, rgba(255, 255, 255, 0.96) 100%)',
    default: 'linear-gradient(135deg, rgba(110, 73, 216, 0.16) 0%, rgba(255, 255, 255, 0.96) 100%)',
}

export default function SearchPage() {
    return (
        <Suspense fallback={<SearchPageSkeleton />}>
            <SearchContent />
        </Suspense>
    )
}

function SearchContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const q = (searchParams.get('q') ?? '').trim()

    const [sort, setSort] = useState<SortValue>('relevance')
    const [activeFilter, setActiveFilter] = useState<SearchFilterId>('all')

    useEffect(() => {
        document.title = q ? `Search: ${q} - Grolin` : 'Search - Grolin Grocery'
    }, [q])

    useEffect(() => {
        setSort('relevance')
        setActiveFilter('all')
    }, [q])

    const { recentSearches, addSearch, removeSearch, clearSearches } = useSearchStore()
    const { recentlyViewedIds } = useRecentlyViewed()

    const { data, isLoading } = useQuery({
        queryKey: QUERY_KEYS.search(q, 1),
        queryFn: () => productsService.search(q, 1),
        enabled: q.length >= 1,
        staleTime: 3 * 60 * 1000,
    })

    const { data: categories = [] } = useQuery({
        queryKey: QUERY_KEYS.categories(),
        queryFn: categoriesService.getAll,
        staleTime: STALE_TIMES.categories,
    })

    const { data: recentlyViewedProducts = [], isLoading: loadingRecentlyViewed } = useQuery({
        queryKey: ['recently-viewed-products', recentlyViewedIds.slice(0, 6)],
        queryFn: async () => {
            const entries = await Promise.all(
                recentlyViewedIds.slice(0, 6).map((id) => productsService.getById(id).catch(() => null)),
            )
            return entries.filter((entry): entry is Product => entry !== null)
        },
        enabled: recentlyViewedIds.length > 0,
        staleTime: 5 * 60 * 1000,
    })

    const { data: featuredProducts = [] } = useQuery({
        queryKey: QUERY_KEYS.featured(),
        queryFn: () => productsService.getFeatured(8),
        enabled: q.length >= 1,
        staleTime: STALE_TIMES.products,
    })

    const searchResults = useMemo(() => sortProducts(data?.products ?? [], sort), [data?.products, sort])

    const availableFilters = useMemo(
        () => SEARCH_FILTERS.filter((filter) => filter.id === 'all' || filter.isSupported(searchResults)),
        [searchResults],
    )

    useEffect(() => {
        if (!availableFilters.some((filter) => filter.id === activeFilter)) {
            setActiveFilter('all')
        }
    }, [activeFilter, availableFilters])

    const visibleProducts = useMemo(() => {
        const selectedFilter = availableFilters.find((filter) => filter.id === activeFilter)
        return searchResults.filter(selectedFilter?.predicate ?? (() => true))
    }, [activeFilter, availableFilters, searchResults])

    const discoveryProducts = useMemo(() => {
        const visibleIds = new Set(visibleProducts.map((product) => product.id))
        return featuredProducts.filter((product) => !visibleIds.has(product.id)).slice(0, 6)
    }, [featuredProducts, visibleProducts])

    const trendingCategories = useMemo(
        () =>
            [...categories]
                .filter((category) => category.is_active && !category.parent_id)
                .sort((a, b) => (b.product_count ?? 0) - (a.product_count ?? 0))
                .slice(0, 6),
        [categories],
    )

    const shouldShowDiscovery = q.length > 0 && visibleProducts.length <= 6 && discoveryProducts.length > 0

    const handleRecentSearchClick = (term: string) => {
        const value = term.trim()
        if (!value) return
        addSearch(value)
        router.push(`/search?q=${encodeURIComponent(value)}`)
    }

    if (q.length === 0) {
        return (
            <PageShell spacing="relaxed">
                <section className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--shop-primary)]">
                        Search
                    </p>
                    <h1 className="mt-2 headline-editorial">
                        Search the store
                    </h1>
                    <p className="mt-2 max-w-[640px] text-sm leading-6 text-[color:var(--shop-ink-muted)]">
                        Search products, brands, or categories with live store inventory.
                    </p>
                </section>

                <section className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
                    <SectionHeader
                        title="Recent Searches"
                        subtitle="Jump back into previous shopping intent without typing again."
                        action={
                            recentSearches.length > 0 ? (
                                <button
                                    type="button"
                                    onClick={clearSearches}
                                    className="inline-flex items-center gap-1 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-3 py-1.5 text-xs font-semibold text-[color:var(--shop-ink-muted)] transition-colors hover:bg-[color:var(--shop-surface-subtle)]"
                                >
                                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.6} />
                                    Clear all
                                </button>
                            ) : null
                        }
                    />

                    <div className="mb-3 mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[color:var(--shop-ink-muted)]">
                        <Clock3 className="h-4 w-4 text-[color:var(--shop-primary)]" strokeWidth={1.6} />
                    </div>

                    <RecentSearchChips
                        recentSearches={recentSearches}
                        onSelect={handleRecentSearchClick}
                        onRemove={removeSearch}
                        emptyCopy="No recent searches yet."
                    />
                </section>

                <section className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
                    <SectionHeader
                        title="Recently Viewed"
                        subtitle="Keep your momentum with products you already explored."
                    />

                    <div className="mb-3 mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[color:var(--shop-ink-muted)]">
                        <Sparkles className="h-4 w-4 text-[color:var(--shop-action)]" strokeWidth={1.6} />
                    </div>

                    {loadingRecentlyViewed ? (
                        <ProductGridSkeleton count={5} />
                    ) : recentlyViewedProducts.length === 0 ? (
                        <p className="text-sm text-[color:var(--shop-ink-muted)]">
                            Your recently viewed products will show here.
                        </p>
                    ) : (
                        <SearchGrid count={recentlyViewedProducts.length}>
                            {recentlyViewedProducts.slice(0, 5).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </SearchGrid>
                    )}
                </section>

                <section className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
                    <SectionHeader
                        title="Trending Categories"
                        subtitle="Jump into the highest-traffic aisles with real category links."
                    />
                    <TrendingCategoriesGrid categories={trendingCategories} />
                </section>
            </PageShell>
        )
    }

    if (isLoading) {
        return (
            <PageShell spacing="relaxed">
                <section className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
                    <div className="h-4 w-20 rounded-full bg-[color:var(--shop-primary-soft)]" />
                    <div className="mt-3 h-10 w-[320px] max-w-full rounded-[18px] bg-black/5" />
                    <div className="mt-4 h-10 w-40 rounded-[12px] bg-black/5" />
                    <div className="mt-5 flex gap-2 overflow-hidden">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="h-8 w-24 rounded-full bg-black/5" />
                        ))}
                    </div>
                </section>
                <ProductGridSkeleton count={12} />
            </PageShell>
        )
    }

    if ((data?.products ?? []).length === 0) {
        return (
            <PageShell spacing="relaxed">
                <section className="shop-surface-soft rounded-[30px] p-6 text-center sm:p-8">
                    <Search className="mx-auto h-16 w-16 text-[color:var(--shop-ink-faint)]" strokeWidth={1.7} />
                    <h1 className="mt-5 headline-editorial">
                        {highlightMatch(`No results for '${q}'`, q)}
                    </h1>
                    <p className="mt-2 text-sm text-[color:var(--shop-ink-muted)]">
                        Try different words or browse categories
                    </p>
                </section>

                <section className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
                    <SectionHeader
                        title="Recent Searches"
                        subtitle="Try one of your previous searches instead."
                        action={
                            recentSearches.length > 0 ? (
                                <button
                                    type="button"
                                    onClick={clearSearches}
                                    className="inline-flex items-center gap-1 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-3 py-1.5 text-xs font-semibold text-[color:var(--shop-ink-muted)] transition-colors hover:bg-[color:var(--shop-surface-subtle)]"
                                >
                                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.6} />
                                    Clear all
                                </button>
                            ) : null
                        }
                    />

                    <RecentSearchChips
                        recentSearches={recentSearches}
                        onSelect={handleRecentSearchClick}
                        onRemove={removeSearch}
                        query={q}
                        emptyCopy="No recent searches yet."
                    />
                </section>

                <section className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
                    <SectionHeader
                        title="Trending Categories"
                        subtitle="Browse real category aisles while refining your search."
                    />
                    <TrendingCategoriesGrid categories={trendingCategories} />
                </section>

                {shouldShowDiscovery && <SearchDiscoverySection products={discoveryProducts} />}
            </PageShell>
        )
    }

    return (
        <PageShell spacing="relaxed">
            <section className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--shop-primary)]">
                            Search
                        </p>
                        <m.h1
                            key={`${q}-${sort}-${activeFilter}-${visibleProducts.length}`}
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            className="mt-2 headline-editorial"
                        >
                            {highlightMatch(`${visibleProducts.length} results for '${q}'`, q)}
                        </m.h1>
                    </div>

                    <div className="flex justify-start lg:justify-end">
                        <label className="inline-flex items-center gap-2 rounded-[12px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-3.5 py-2.5 text-sm font-medium text-[color:var(--shop-ink)] shadow-[var(--shop-shadow-level-2)]">
                            <ArrowUpDown className="h-4 w-4 text-[color:var(--shop-primary)]" strokeWidth={1.8} />
                            <select
                                value={sort}
                                onChange={(event) => setSort(event.target.value as SortValue)}
                                className="bg-transparent pr-1 text-sm font-medium outline-none"
                                aria-label="Sort search results"
                            >
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                <div className="mt-5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex min-w-max gap-2">
                        {availableFilters.map((filter) => {
                            const isActive = filter.id === activeFilter

                            return (
                                <button
                                    key={filter.id}
                                    type="button"
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={
                                        isActive
                                            ? 'inline-flex h-8 items-center rounded-full bg-[color:var(--shop-primary)] px-4 text-[12px] font-medium text-white shadow-[var(--shop-shadow-level-1)]'
                                            : 'inline-flex h-8 items-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-4 text-[12px] font-medium text-[color:var(--shop-ink)] transition-colors hover:border-[color:var(--shop-primary)] hover:text-[color:var(--shop-primary)]'
                                    }
                                >
                                    {filter.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {visibleProducts.length === 0 ? (
                <section className="shop-surface-soft rounded-[30px] p-6 text-center sm:p-8">
                    <p className="text-base font-semibold text-[color:var(--shop-ink)]">
                        No products match this filter
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--shop-ink-muted)]">
                        Try switching to a broader quick filter to see more results.
                    </p>
                    <button
                        type="button"
                        onClick={() => setActiveFilter('all')}
                        className="mt-4 inline-flex h-10 items-center rounded-full bg-[color:var(--shop-primary)] px-5 text-sm font-semibold text-white"
                    >
                        Show all results
                    </button>
                </section>
            ) : (
                <SearchGrid count={visibleProducts.length}>
                    {visibleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </SearchGrid>
            )}

            {shouldShowDiscovery && <SearchDiscoverySection products={discoveryProducts} />}
        </PageShell>
    )
}

function RecentSearchChips({
    recentSearches,
    onSelect,
    onRemove,
    query = '',
    emptyCopy,
}: {
    recentSearches: string[]
    onSelect: (term: string) => void
    onRemove: (term: string) => void
    query?: string
    emptyCopy: string
}) {
    if (recentSearches.length === 0) {
        return <p className="mt-4 text-sm text-[color:var(--shop-ink-muted)]">{emptyCopy}</p>
    }

    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {recentSearches.map((term) => (
                <div
                    key={term}
                    className="group inline-flex items-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] pr-1 shadow-[var(--shop-shadow-level-1)]"
                >
                    <button
                        type="button"
                        onClick={() => onSelect(term)}
                        className="flex h-8 items-center px-3 text-sm font-medium text-[color:var(--shop-ink)] transition-colors hover:text-[color:var(--shop-primary)]"
                    >
                        {highlightMatch(term, query)}
                    </button>
                    <button
                        type="button"
                        onClick={() => onRemove(term)}
                        className="rounded-full p-1 text-[color:var(--shop-ink-faint)] transition-colors hover:bg-[color:var(--shop-primary-soft)] hover:text-[color:var(--shop-primary)]"
                        aria-label={`Remove ${term} from recent searches`}
                    >
                        <X className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </button>
                </div>
            ))}
        </div>
    )
}

function TrendingCategoriesGrid({ categories }: { categories: Category[] }) {
    if (categories.length === 0) {
        return <p className="mt-4 text-sm text-[color:var(--shop-ink-muted)]">Categories will appear here soon.</p>
    }

    return (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="group rounded-[24px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] p-4 shadow-[var(--shop-shadow-level-1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shop-shadow-level-2)]"
                >
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-[16px] text-lg font-semibold text-[color:var(--shop-primary)]"
                        style={{ backgroundImage: getCategoryGradient(category.name) }}
                    >
                        {category.name.charAt(0).toUpperCase()}
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[color:var(--shop-ink)] transition-colors group-hover:text-[color:var(--shop-primary)]">
                        {category.name}
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--shop-ink-muted)]">
                        {category.product_count ?? 0} products
                    </p>
                </Link>
            ))}
        </div>
    )
}

function SearchDiscoverySection({ products }: { products: Product[] }) {
    return (
        <section className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--shop-primary)]">
                While you&apos;re here
            </p>
            <h2 className="mt-2 text-[22px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[color:var(--shop-ink)]">
                Popular Right Now
            </h2>
            <div className="mt-5">
                <SearchGrid count={products.length}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </SearchGrid>
            </div>
        </section>
    )
}

function SearchGrid({ children, count }: { children: ReactNode; count: number }) {
    return <div className={getSearchGridClasses(count)}>{children}</div>
}

function getSearchGridClasses(count: number) {
    if (count >= 8) {
        return 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 md:gap-4'
    }

    if (count >= 4) {
        return 'mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4'
    }

    return 'mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4'
}

function SearchPageSkeleton() {
    return (
        <PageShell spacing="relaxed">
            <section className="shop-surface-soft rounded-[30px] p-5 sm:p-6">
                <div className="h-4 w-20 rounded-full bg-[color:var(--shop-primary-soft)]" />
                <div className="mt-3 h-10 w-[320px] max-w-full rounded-[18px] bg-black/5" />
                <div className="mt-5 flex gap-2 overflow-hidden">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="h-8 w-24 rounded-full bg-black/5" />
                    ))}
                </div>
            </section>
            <ProductGridSkeleton count={12} />
        </PageShell>
    )
}

function highlightMatch(text: string, query: string): ReactNode {
    const trimmed = query.trim()
    if (!trimmed) return text

    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escaped})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) => {
        if (part.toLowerCase() === trimmed.toLowerCase()) {
            return (
                <mark key={index} className="bg-transparent font-semibold text-[color:var(--shop-primary)]">
                    {part}
                </mark>
            )
        }

        return <span key={index}>{part}</span>
    })
}

function getDisplayPrice(product: Product) {
    return product.sale_price ?? product.salePrice ?? product.price
}

function sortProducts(products: Product[], sort: SortValue) {
    const list = [...products]

    if (sort === 'newest') {
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        return list
    }

    if (sort === 'price_asc') {
        list.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b))
        return list
    }

    if (sort === 'price_desc') {
        list.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a))
        return list
    }

    return list
}

function getCategoryGradient(name: string) {
    const lower = name.toLowerCase()

    if (lower.includes('vegetable')) return CATEGORY_GRADIENTS.vegetables
    if (lower.includes('fruit')) return CATEGORY_GRADIENTS.fruits
    if (lower.includes('dairy')) return CATEGORY_GRADIENTS.dairy
    if (lower.includes('bakery')) return CATEGORY_GRADIENTS.bakery
    if (lower.includes('snack')) return CATEGORY_GRADIENTS.snacks

    return CATEGORY_GRADIENTS.default
}