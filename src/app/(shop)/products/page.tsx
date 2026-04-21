'use client'

import { Suspense, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AlertCircle, PackageSearch } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { FilterBar } from '@/components/product/FilterBar'
import { ProductGrid, ProductGridSkeleton } from '@/components/product/ProductGrid'
import { EmptyStateCard } from '@/components/shared/EmptyStateCard'
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import type { Product } from '@/types/product.types'

type SortValue = 'relevance' | 'newest' | 'price_asc' | 'price_desc'

const VALID_SORTS: SortValue[] = ['relevance', 'newest', 'price_asc', 'price_desc']

export default function ProductsPage() {
    useEffect(() => {
        document.title = 'Products — Grolin'
    }, [])

    return (
        <Suspense
            fallback={
                <div className="page-enter px-4 py-6 sm:px-6">
                    <div className="mb-5 space-y-2">
                        <div className="h-8 w-48 rounded bg-black/10" />
                        <div className="h-4 w-28 rounded bg-black/10" />
                    </div>
                    <div className="mb-5 h-[74px] rounded-[20px] bg-black/10" />
                    <ProductGridSkeleton count={10} />
                </div>
            }
        >
            <ProductsPageContent />
        </Suspense>
    )
}

function ProductsPageContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const sortParam = searchParams.get('sort') ?? 'relevance'
    const sort = (VALID_SORTS.includes(sortParam as SortValue)
        ? sortParam
        : 'relevance') as SortValue
    const inStock = searchParams.get('inStock') === 'true'
    const categoryId = searchParams.get('categoryId') ?? undefined
    const search = searchParams.get('q') ?? undefined

    const {
        data,
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteProducts({
        categoryId,
        search,
        sort,
        inStock,
    })

    const { ref: loadMoreRef, inView } = useInView({
        rootMargin: '320px 0px',
        threshold: 0,
    })

    useEffect(() => {
        if (!inView || !hasNextPage || isFetchingNextPage) return
        fetchNextPage()
    }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

    const products = useMemo(
        () => data?.pages.flatMap((page) => page.products ?? []) ?? [],
        [data?.pages],
    )

    const sortedProducts = useMemo(() => {
        const list = [...products]

        if (sort === 'newest') {
            list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            return list
        }

        if (sort === 'price_asc') {
            list.sort((a, b) => {
                const aPrice = a.sale_price ?? a.salePrice ?? a.price
                const bPrice = b.sale_price ?? b.salePrice ?? b.price
                return aPrice - bPrice
            })
            return list
        }

        if (sort === 'price_desc') {
            list.sort((a, b) => {
                const aPrice = a.sale_price ?? a.salePrice ?? a.price
                const bPrice = b.sale_price ?? b.salePrice ?? b.price
                return bPrice - aPrice
            })
            return list
        }

        return list
    }, [products, sort])

    const totalCount = data?.pages?.[0]?.pagination?.total ?? sortedProducts.length

    const updateSearchParams = (updates: Record<string, string | null>) => {
        const nextParams = new URLSearchParams(searchParams.toString())

        Object.entries(updates).forEach(([key, value]) => {
            if (!value) {
                nextParams.delete(key)
            } else {
                nextParams.set(key, value)
            }
        })

        const query = nextParams.toString()
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    }

    const handleSortChange = (nextSort: string) => {
        updateSearchParams({ sort: nextSort === 'relevance' ? null : nextSort })
    }

    const handleInStockChange = (value: boolean) => {
        updateSearchParams({ inStock: value ? 'true' : null })
    }

    return (
        <div className="page-enter px-4 py-6 sm:px-6">
            <div className="mb-4">
                <h1 className="text-[28px] font-extrabold leading-[1.06] tracking-[-0.025em] text-[color:var(--shop-ink)] sm:text-[32px]">All Products</h1>
                <p className="mt-1 text-sm text-[color:var(--shop-ink-muted)]">{totalCount} products</p>
            </div>

            <FilterBar
                sort={sort}
                onSortChange={handleSortChange}
                inStock={inStock}
                onInStockChange={handleInStockChange}
                resultCount={totalCount}
            />

            {isLoading ? (
                <ProductGridSkeleton count={10} />
            ) : isError ? (
                <div className="overflow-hidden rounded-[30px] border border-[color:var(--shop-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(240,236,232,0.94)_100%)] shadow-[var(--shop-shadow-level-2)]">
                    <EmptyStateCard
                        icon={AlertCircle}
                        title="We couldn't load products right now"
                        subtitle="Please retry in a moment or explore another aisle while the live catalog reconnects."
                        ctaLabel="Retry"
                        ctaAction={() => refetch()}
                        secondaryCtaLabel="Browse Categories"
                        secondaryCtaHref="/categories"
                    />
                </div>
            ) : sortedProducts.length === 0 ? (
                <div className="overflow-hidden rounded-[30px] border border-[color:var(--shop-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,243,238,0.94)_100%)] shadow-[var(--shop-shadow-level-1)]">
                    <EmptyStateCard
                        icon={PackageSearch}
                        title="We're stocking the shelves!"
                        subtitle="Check back soon or try another category while fresh picks arrive."
                        ctaLabel="Browse Categories"
                        ctaHref="/categories"
                    />
                </div>
            ) : (
                <>
                    <ProductGrid>
                        {sortedProducts.map((product: Product, index) => (
                            <ProductCard key={product.id} product={product} priority={index < 5} />
                        ))}
                    </ProductGrid>

                    <div ref={loadMoreRef} className="h-3" aria-hidden="true" />

                    {isFetchingNextPage && (
                        <div className="mt-4">
                            <ProductGridSkeleton count={5} />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
