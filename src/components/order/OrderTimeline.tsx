import { Check } from 'lucide-react'
import { cn, formatDateTime } from '@/lib/utils'
import type { OrderStatus } from '@/types/order.types'

interface TimelineEvent {
    status: OrderStatus
    timestamp?: string | null
}

interface OrderTimelineProps {
    currentStatus: OrderStatus
    events: TimelineEvent[]
}

const ALL_STEPS: OrderStatus[] = [
    'PENDING',
    'CONFIRMED',
    'PREPARING',
    'PACKED',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
]

const STEP_LABELS: Record<string, string> = {
    PENDING: 'Order Placed',
    CONFIRMED: 'Confirmed',
    PREPARING: 'Preparing',
    PACKED: 'Packed',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
}

export function OrderTimeline({ currentStatus, events }: OrderTimelineProps) {
    const currentIdx = ALL_STEPS.indexOf(currentStatus)

    if (currentStatus === 'CANCELLED') {
        return (
            <div className="rounded-[16px] border border-[color:var(--shop-border)] bg-[color:color-mix(in_srgb,var(--shop-danger)_8%,white_92%)] px-4 py-3">
                <p className="text-sm font-semibold text-[color:var(--shop-danger)]">Order Cancelled</p>
            </div>
        )
    }

    return (
        <div className="space-y-0">
            {ALL_STEPS.map((step, index) => {
                const isComplete = index < currentIdx
                const isCurrent = index === currentIdx
                const event = events.find((entry) => entry.status === step)
                const isLast = index === ALL_STEPS.length - 1

                return (
                    <div key={step} className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <div className="relative flex h-7 w-7 items-center justify-center">
                                {isCurrent ? (
                                    <span className="absolute inset-0 rounded-full bg-[color:var(--shop-action-soft)] animate-pulse" />
                                ) : null}
                                <div
                                    className={cn(
                                        'relative z-10 flex h-7 w-7 items-center justify-center rounded-full border',
                                        isComplete && 'border-[color:var(--shop-action)] bg-[color:var(--shop-action)] text-white',
                                        isCurrent && 'border-[color:var(--shop-action)] bg-[color:var(--shop-action)] text-white',
                                        !isComplete && !isCurrent && 'border-[color:var(--shop-border)] bg-white text-[color:var(--shop-ink-faint)]',
                                    )}
                                >
                                    {isComplete || isCurrent ? (
                                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                                    ) : (
                                        <span className="h-2 w-2 rounded-full bg-[color:var(--shop-border-strong)]" />
                                    )}
                                </div>
                            </div>
                            {!isLast && (
                                <div
                                    className={cn(
                                        'min-h-[28px] w-0.5 flex-1',
                                        index < currentIdx ? 'bg-[color:var(--shop-action)]' : 'bg-[color:var(--shop-border)]',
                                    )}
                                />
                            )}
                        </div>

                        <div className="pb-4">
                            <p
                                className={cn(
                                    'text-sm font-medium',
                                    isComplete || isCurrent
                                        ? 'text-[color:var(--shop-ink)]'
                                        : 'text-[color:var(--shop-ink-faint)]',
                                )}
                            >
                                {STEP_LABELS[step] || step}
                            </p>
                            <p className="mt-0.5 text-xs text-[color:var(--shop-ink-muted)]">
                                {event?.timestamp ? formatDateTime(event.timestamp) : 'Awaiting update'}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}