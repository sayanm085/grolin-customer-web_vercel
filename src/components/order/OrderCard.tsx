'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Loader2, RotateCcw } from 'lucide-react'
import { formatDate, formatINR } from '@/lib/utils'
import { OrderStatusBadge } from './OrderStatusBadge'
import { getImageUrl } from '@/lib/media'
import type { Order, OrderItem } from '@/types/order.types'

interface OrderCardProps {
    order: Order
    onReorder?: (orderId: string) => void | Promise<void>
    reordering?: boolean
}

type OrderItemExtended = OrderItem & {
    thumbnail_url?: string | null
}

export function OrderCard({ order, onReorder, reordering = false }: OrderCardProps) {
    const items = order.items ?? []
    const displayItems = items.slice(0, 3)
    const moreCount = Math.max(0, items.length - 3)

    return (
        <article className="rounded-[22px] bg-[color:var(--shop-surface-elevated)] p-[14px] shadow-[var(--shop-shadow-level-2)]">
            <Link href={`/orders/${order.id}`} className="block rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--shop-primary-soft)]">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-[color:var(--shop-ink)]">
                            Order #{order.order_number || order.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-[color:var(--shop-ink-muted)]">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="text-right">
                        <OrderStatusBadge status={order.status} />
                        <p className="mt-2 text-base font-bold text-[color:var(--shop-ink)]">
                            {formatINR(order.total_amount)}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    {displayItems.map((item, index) => {
                        const product = item as OrderItemExtended
                        return (
                            <div
                                key={`${order.id}-${item.productId}-${index}`}
                                className="relative h-[44px] w-[44px] overflow-hidden rounded-[12px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)]"
                            >
                                <Image
                                    src={getImageUrl(item.image || product.thumbnail_url)}
                                    alt={item.name || 'Product'}
                                    fill
                                    className="object-contain p-1.5"
                                    sizes="44px"
                                unoptimized={true}
                                />
                            </div>
                        )
                    })}
                    {moreCount > 0 && (
                        <span className="inline-flex h-[44px] min-w-[44px] items-center justify-center rounded-[12px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] px-2 text-xs font-semibold text-[color:var(--shop-ink-muted)]">
                            +{moreCount}
                        </span>
                    )}
                    <p className="ml-2 text-sm text-[color:var(--shop-ink-muted)]">
                        {items.length} item{items.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </Link>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                {onReorder ? (
                    <button
                        type="button"
                        onClick={() => onReorder(order.id)}
                        disabled={reordering}
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[12px] bg-[color:var(--shop-action)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {reordering ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <RotateCcw className="h-4 w-4" strokeWidth={1.9} />
                        )}
                        Reorder
                    </button>
                ) : null}
                <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-[12px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-4 text-sm font-semibold text-[color:var(--shop-primary)] transition-colors hover:bg-[color:var(--shop-primary-soft)]"
                >
                    View Details
                </Link>
            </div>
        </article>
    )
}