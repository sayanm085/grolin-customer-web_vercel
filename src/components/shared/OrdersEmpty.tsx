import { ShoppingBag } from 'lucide-react'
import { EmptyState } from './EmptyState'

export function OrdersEmpty() {
    return (
        <EmptyState
            icon={ShoppingBag}
            title="No orders yet"
            subtitle="Your first order is just a few taps away — fresh groceries delivered to your door."
            ctaLabel="Start Shopping"
            ctaHref="/"
            secondaryCtaLabel="Browse Categories"
            secondaryCtaHref="/categories"
            iconBg="bg-[color:var(--shop-primary-soft)]"
            iconColor="text-[color:var(--shop-primary)]"
        />
    )
}
