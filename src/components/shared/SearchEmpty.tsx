import { Search } from 'lucide-react'
import { EmptyState } from './EmptyState'

interface SearchEmptyProps {
    query?: string
}

export function SearchEmpty({ query }: SearchEmptyProps) {
    return (
        <EmptyState
            icon={Search}
            title={query ? `Nothing found for "${query}"` : 'What are you looking for?'}
            subtitle={
                query
                    ? 'Try a shorter search term, check your spelling, or browse our categories instead.'
                    : 'Search for fresh produce, pantry staples, snacks, and more.'
            }
            ctaLabel="Browse Categories"
            ctaHref="/categories"
            secondaryCtaLabel="All Products"
            secondaryCtaHref="/products"
            iconBg="bg-[color:var(--shop-surface-subtle)]"
            iconColor="text-[color:var(--shop-ink-faint)]"
        />
    )
}
