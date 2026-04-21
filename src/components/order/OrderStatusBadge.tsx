import { ORDER_STATUS_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { OrderStatus } from '@/types/order.types'

interface OrderStatusBadgeProps {
    status: OrderStatus | string
    className?: string
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
    const config = ORDER_STATUS_CONFIG[status as OrderStatus]
    const label = config?.label ?? status

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold',
                className,
            )}
            style={{
                color: config?.color ?? 'var(--shop-ink-muted)',
                backgroundColor: config?.bg ?? 'var(--shop-surface-subtle)',
                borderColor: config?.color
                    ? `color-mix(in srgb, ${config.color} 22%, white 78%)`
                    : 'var(--shop-border)',
            }}
        >
            {label}
        </span>
    )
}