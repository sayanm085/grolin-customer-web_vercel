import { Star } from 'lucide-react'
import { EmptyState } from './EmptyState'

export function ReviewsEmpty() {
    return (
        <EmptyState
            icon={Star}
            title="No reviews yet"
            subtitle="Be the first to share your experience — your review helps other shoppers make great choices."
            ctaLabel="Browse Products"
            ctaHref="/products"
            secondaryCtaLabel="Go Home"
            secondaryCtaHref="/"
            iconBg="bg-amber-50"
            iconColor="text-amber-400"
        />
    )
}
