'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { ordersService } from '@/services/orders.service'
import { QUERY_KEYS, STALE_TIMES, ORDER_STATUS_CONFIG } from '@/lib/constants'
import { formatDateTime, formatINR } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { CancelOrderDialog, OrderIssuePanel, OrderTimeline, OrderTracking } from '@/components/order'
import { ReviewForm } from '@/components/product/ReviewForm'
import { PageHeader, PageShell, TrustRow } from '@/components/shared'
import type { OrderStatus } from '@/types/order.types'

const STEPS: OrderStatus[] = ['PENDING', 'CONFIRMED', 'PREPARING', 'PACKED', 'OUT_FOR_DELIVERY', 'DELIVERED']

export default function OrderDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [showCancel, setShowCancel] = useState(false)
    const [reviewProduct, setReviewProduct] = useState<{ id: string; name: string } | null>(null)

    const { data: order, isLoading } = useQuery({
        queryKey: QUERY_KEYS.order(params.id),
        queryFn: () => ordersService.getById(params.id),
        staleTime: STALE_TIMES.orders,
        refetchInterval: 30000,
    })

    useEffect(() => {
        document.title = `Order #${order?.order_number ?? params.id} - Grolin`
    }, [order?.order_number, params.id])

    if (isLoading) {
        return (
            <div className="space-y-4 px-6 py-6">
                <Skeleton className="h-8 w-64 rounded" />
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-60 w-full rounded-xl" />
            </div>
        )
    }

    if (!order) return null

    const config = ORDER_STATUS_CONFIG[order.status]
    const timelineEvents = STEPS.map((status) => ({
        status,
        timestamp:
            status === 'PENDING'
                ? order.created_at
                : status === order.status
                  ? order.updated_at
                  : null,
    }))
    const isCancelled = order.status === 'CANCELLED' || order.status === 'REFUNDED'

    return (
        <PageShell spacing="relaxed">
            <PageHeader
                eyebrow="Order detail"
                title={`Order #${order.order_number}`}
                subtitle={formatDateTime(order.created_at)}
                actions={
                    <>
                        <button
                            onClick={() => router.back()}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-white text-[color:var(--shop-ink-muted)] transition-colors hover:bg-[color:var(--shop-surface-subtle)]"
                            aria-label="Go back"
                            type="button"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <div
                            className="rounded-full px-3 py-1.5 text-xs font-semibold"
                            style={{ color: config.color, backgroundColor: config.bg }}
                        >
                            {config.label}
                        </div>
                    </>
                }
            />

            {!isCancelled && (
                <div className="shop-surface-soft rounded-[28px] p-5">
                    <h3 className="mb-4 text-sm font-semibold text-[color:var(--shop-ink)]">Order Progress</h3>
                    <OrderTimeline currentStatus={order.status} events={timelineEvents} />
                </div>
            )}

            {order.status === 'OUT_FOR_DELIVERY' && (
                <OrderTracking
                    orderId={order.id}
                    riderName={order.rider?.name}
                    riderPhone={order.rider?.phone}
                    deliveryOtp={order.delivery_otp ?? undefined}
                    estimatedMinutes={order.estimated_minutes ?? undefined}
                />
            )}

            <OrderIssuePanel />

            <div className="shop-surface-soft rounded-[28px] p-5">
                <h3 className="mb-4 text-sm font-semibold text-[color:var(--shop-ink)]">Items ({order.items.length})</h3>
                <div className="space-y-3">
                    {order.items.map((item) => (
                        <div key={item.productId} className="flex items-center gap-3 rounded-[16px] border border-[color:var(--shop-border)] bg-white p-3">
                            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-[12px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)]">
                                {item.image ? (
                                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="48px" />
                                ) : null}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-[color:var(--shop-ink)]">{item.name}</p>
                                <p className="text-xs text-[color:var(--shop-ink-muted)]">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-bold text-[color:var(--shop-ink)]">{formatINR(item.total)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="shop-surface-soft space-y-3 rounded-[28px] p-5">
                <div className="flex justify-between text-sm">
                    <span className="text-[color:var(--shop-ink-muted)]">Subtotal</span>
                    <span className="text-[color:var(--shop-ink)]">{formatINR(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[color:var(--shop-ink-muted)]">Delivery</span>
                    <span className="text-[color:var(--shop-ink)]">{order.delivery_fee === 0 ? 'FREE' : formatINR(order.delivery_fee)}</span>
                </div>
                {order.discount_amount > 0 ? (
                    <div className="flex justify-between text-sm">
                        <span className="text-[color:var(--shop-ink-muted)]">Discount</span>
                        <span className="text-[color:var(--shop-action)]">-{formatINR(order.discount_amount)}</span>
                    </div>
                ) : null}
                <div className="flex justify-between border-t border-[color:var(--shop-border)] pt-3">
                    <span className="font-bold text-[color:var(--shop-ink)]">Total</span>
                    <span className="font-extrabold text-[color:var(--shop-ink)]">{formatINR(order.total_amount)}</span>
                </div>
            </div>

            <TrustRow />

            {order.status === 'DELIVERED' && (
                <div className="rounded-[18px] border border-[color:var(--shop-border)] bg-[color:color-mix(in_srgb,var(--shop-accent)_12%,white_88%)] p-4">
                    <p className="mb-2 text-sm font-semibold text-[color:var(--shop-warning)]">How was your order?</p>
                    <div className="flex flex-wrap gap-2">
                        {order.items.slice(0, 3).map((item) => (
                            <button
                                key={item.productId}
                                onClick={() => setReviewProduct({ id: item.productId, name: item.name })}
                                className="rounded-[10px] border border-[color:var(--shop-border)] bg-white px-3 py-1.5 text-xs font-medium text-[color:var(--shop-ink)] transition-colors hover:bg-[color:var(--shop-surface-subtle)]"
                                type="button"
                            >
                                Rate {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex gap-3">
                {['PENDING', 'CONFIRMED', 'PREPARING'].includes(order.status) && (
                    <Button
                        variant="outline"
                        onClick={() => setShowCancel(true)}
                        className="flex-1 rounded-xl border-[color:color-mix(in_srgb,var(--shop-danger)_24%,white_76%)] text-[color:var(--shop-danger)] hover:bg-[color:color-mix(in_srgb,var(--shop-danger)_8%,white_92%)]"
                    >
                        Cancel Order
                    </Button>
                )}
                {order.status === 'DELIVERED' && (
                    <Button
                        onClick={async () => {
                            try {
                                await ordersService.reorder(order.id)
                                router.push('/cart')
                                toast.success('Items added to cart!')
                            } catch {
                                toast.error('Could not reorder')
                            }
                        }}
                        className="flex-1 rounded-xl bg-[color:var(--shop-action)] text-white hover:bg-[color:var(--shop-action-hover)]"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" /> Reorder
                    </Button>
                )}
            </div>

            <CancelOrderDialog
                isOpen={showCancel}
                onClose={() => setShowCancel(false)}
                orderId={order.id}
                onCancelled={() => {
                    setShowCancel(false)
                    router.refresh()
                }}
            />

            {reviewProduct && (
                <ReviewForm
                    isOpen={!!reviewProduct}
                    onClose={() => setReviewProduct(null)}
                    productId={reviewProduct.id}
                    productName={reviewProduct.name}
                    orderId={order.id}
                />
            )}
        </PageShell>
    )
}