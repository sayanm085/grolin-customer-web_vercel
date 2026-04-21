'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ordersService } from '@/services/orders.service'
import { QUERY_KEYS, STALE_TIMES } from '@/lib/constants'
import { EmptyStateCard, PageHeader, PageShell } from '@/components/shared'
import { OrderCard, OrderCardSkeleton } from '@/components/order'
import { cn } from '@/lib/utils'
import { Package } from 'lucide-react'
import type { Order } from '@/types/order.types'

type Tab = 'active' | 'past' | 'cancelled'

export default function OrdersPage() {
    const router = useRouter()
    const [tab, setTab] = useState<Tab>('active')
    const [reorderingId, setReorderingId] = useState<string | null>(null)

    useEffect(() => {
        document.title = 'My Orders - Grolin Grocery'
    }, [])

    const { data, isLoading } = useQuery({
        queryKey: QUERY_KEYS.orders({}),
        queryFn: () => ordersService.getAll({ limit: 50 }),
        staleTime: STALE_TIMES.orders,
    })

    const ACTIVE_STATUSES = ['PENDING', 'CONFIRMED', 'PREPARING', 'PACKED', 'OUT_FOR_DELIVERY']
    const PAST_STATUSES = ['DELIVERED', 'REFUNDED']
    const CANCELLED_STATUSES = ['CANCELLED']

    const allOrders: Order[] = data?.orders ?? []
    const orders = allOrders.filter((order: Order) => {
        if (tab === 'active') return ACTIVE_STATUSES.includes(order.status)
        if (tab === 'cancelled') return CANCELLED_STATUSES.includes(order.status)
        return PAST_STATUSES.includes(order.status)
    })

    const handleReorder = async (orderId: string) => {
        setReorderingId(orderId)
        try {
            await ordersService.reorder(orderId)
            toast.success('Items added to cart!')
            router.push('/cart')
        } catch {
            toast.error('Could not reorder right now.')
        } finally {
            setReorderingId(null)
        }
    }

    return (
        <PageShell spacing="relaxed">
            <PageHeader
                eyebrow="Order history"
                title="My Orders"
                subtitle="Track active deliveries, revisit past purchases, and reorder your essentials faster."
            />

            <div className="shop-surface-soft flex gap-1 rounded-[22px] p-1.5">
                {(['active', 'past', 'cancelled'] as Tab[]).map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => setTab(value)}
                        className={cn(
                            'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                            tab === value
                                ? 'bg-[color:var(--shop-surface)] text-[color:var(--shop-ink)] shadow-sm'
                                : 'text-[color:var(--shop-ink-muted)] hover:text-[color:var(--shop-ink)]',
                        )}
                    >
                        {value === 'active' ? 'Active' : value === 'past' ? 'Past' : 'Cancelled'}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <OrderCardSkeleton key={index} />
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <EmptyStateCard
                    icon={Package}
                    title={tab === 'active' ? 'No active orders' : tab === 'past' ? 'No completed orders' : 'No cancelled orders'}
                    subtitle="When you place orders, they will appear here with live status and pricing details."
                    ctaLabel="Start Shopping"
                    ctaHref="/"
                    secondaryCtaLabel="Browse Categories"
                    secondaryCtaHref="/categories"
                />
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onReorder={handleReorder}
                            reordering={reorderingId === order.id}
                        />
                    ))}
                </div>
            )}
        </PageShell>
    )
}