import { Bell } from 'lucide-react'
import { EmptyState } from './EmptyState'

export function NotificationsEmpty() {
    return (
        <EmptyState
            icon={Bell}
            title="All caught up!"
            subtitle="You're up to date — no new notifications right now. Order updates and offers will appear here."
            ctaLabel="Continue Shopping"
            ctaHref="/"
            secondaryCtaLabel="View Orders"
            secondaryCtaHref="/orders"
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
        />
    )
}
