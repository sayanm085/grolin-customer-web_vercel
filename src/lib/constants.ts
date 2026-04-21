import type { OrderStatus } from '@/types/order.types'

export const ORDER_STATUS_CONFIG: Record<
    OrderStatus,
    { label: string; color: string; bg: string }
> = {
    PENDING: {
        label: 'Order Placed',
        color: 'var(--shop-warning)',
        bg: 'color-mix(in srgb, var(--shop-accent) 16%, white 84%)',
    },
    CONFIRMED: {
        label: 'Confirmed',
        color: 'var(--shop-warning)',
        bg: 'color-mix(in srgb, var(--shop-accent) 16%, white 84%)',
    },
    PREPARING: {
        label: 'Preparing',
        color: 'var(--shop-warning)',
        bg: 'color-mix(in srgb, var(--shop-accent) 16%, white 84%)',
    },
    PACKED: {
        label: 'Packed',
        color: 'var(--shop-warning)',
        bg: 'color-mix(in srgb, var(--shop-accent) 16%, white 84%)',
    },
    OUT_FOR_DELIVERY: {
        label: 'Out for Delivery',
        color: 'var(--shop-trust)',
        bg: 'var(--shop-trust-soft)',
    },
    DELIVERED: {
        label: 'Delivered',
        color: 'var(--shop-action)',
        bg: 'var(--shop-action-soft)',
    },
    CANCELLED: {
        label: 'Cancelled',
        color: 'var(--shop-danger)',
        bg: 'color-mix(in srgb, var(--shop-danger) 10%, white 90%)',
    },
    REFUNDED: {
        label: 'Refunded',
        color: 'var(--shop-ink-muted)',
        bg: 'color-mix(in srgb, var(--shop-border) 55%, white 45%)',
    },
} as const

export const QUERY_KEYS = {
    cart: ['cart'] as const,
    categories: ['categories'] as const,
    products: (p?: Record<string, unknown>) => ['products', p] as const,
    product: (id: string) => ['product', id] as const,
    orders: (p?: Record<string, unknown>) => ['orders', p] as const,
    order: (id: string) => ['order', id] as const,
    wishlist: ['wishlist'] as const,
    wallet: ['wallet'] as const,
    walletTransactions: ['wallet-transactions'] as const,
    notifications: ['notifications'] as const,
    addresses: ['addresses'] as const,
    user: ['user'] as const,
    banners: ['banners'] as const,
    reviews: (productId: string) => ['reviews', productId] as const,
    myReviews: ['my-reviews'] as const,
} as const

export const STALE_TIMES = {
    banners: 30 * 60 * 1000,
    categories: 30 * 60 * 1000,
    products: 5 * 60 * 1000,
    cart: 0,
    orders: 30 * 1000,
    wallet: 0,
    notifications: 0,
    user: 15 * 60 * 1000,
    addresses: 10 * 60 * 1000,
} as const

export const FREE_DELIVERY_THRESHOLD = 299
export const PLATFORM_FEE = 5
export const DEFAULT_DELIVERY_FEE = 29
export const OTP_RESEND_SECONDS = 60
export const SEARCH_DEBOUNCE_MS = 300
export const MAX_CART_QTY = 10