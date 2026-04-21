'use client'

import { ArrowUpDown, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterBarProps {
    sort: string
    onSortChange: (sort: string) => void
    inStock: boolean
    onInStockChange: (v: boolean) => void
    resultCount?: number
}

const SORT_OPTIONS = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest' },
    { value: 'price_asc', label: 'Price Low→High' },
    { value: 'price_desc', label: 'Price High→Low' },
]

export function FilterBar({
    sort,
    onSortChange,
    inStock,
    onInStockChange,
    resultCount,
}: FilterBarProps) {
    const hasActiveFilters = inStock || sort !== 'relevance'

    return (
        <div className="sticky top-[130px] z-[50] mb-5 lg:top-[108px]">
            <div className="overflow-x-auto rounded-[20px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)]/95 px-3 py-3 shadow-[var(--shop-shadow-level-1)] backdrop-blur-sm sm:px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex min-w-max items-center gap-2.5">
                    <div className="flex items-center gap-2 rounded-full border border-[color:var(--shop-border)] bg-white px-3 py-2">
                        <ArrowUpDown className="h-4 w-4 text-[color:var(--shop-ink-muted)]" strokeWidth={1.5} />
                        <select
                            value={sort}
                            onChange={(event) => onSortChange(event.target.value)}
                            className="bg-transparent text-sm font-medium text-[color:var(--shop-ink)] outline-none"
                            aria-label="Sort products"
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={() => onInStockChange(!inStock)}
                        className={cn(
                            'inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold transition-colors',
                            inStock
                                ? 'border-[color:var(--shop-primary)] bg-[color:var(--shop-primary)] text-white'
                                : 'border-[color:var(--shop-border)] bg-white text-[color:var(--shop-ink-muted)] hover:border-[color:var(--shop-primary-soft)] hover:text-[color:var(--shop-ink)]',
                        )}
                        aria-pressed={inStock}
                    >
                        In Stock
                    </button>

                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={() => {
                                onSortChange('relevance')
                                onInStockChange(false)
                            }}
                            className="ml-1 text-sm font-semibold text-[color:var(--shop-ink-muted)] transition-colors hover:text-[color:var(--shop-ink)]"
                        >
                            Clear all
                        </button>
                    )}

                    {typeof resultCount === 'number' && (
                        <div className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[color:var(--shop-surface-subtle)] px-3 py-2 text-sm font-medium text-[color:var(--shop-ink-muted)]">
                            <Sparkles className="h-4 w-4 text-[color:var(--shop-action)]" strokeWidth={1.5} />
                            {resultCount} products
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}