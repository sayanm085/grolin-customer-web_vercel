import { Heart } from 'lucide-react'
import { EmptyState } from './EmptyState'

export function WishlistEmpty() {
    return (
        <EmptyState
            icon={Heart}
            title="Your wishlist is waiting"
            subtitle="Tap the heart on any product to save it here for later — great for building your next order."
            ctaLabel="Discover Products"
            ctaHref="/products"
            secondaryCtaLabel="Browse Categories"
            secondaryCtaHref="/categories"
            iconBg="bg-[#FFF0F0]"
            iconColor="text-rose-400"
        />
    )
}
