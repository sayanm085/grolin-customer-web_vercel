'use client'

import { useState, type KeyboardEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import { Minus, Package2, Plus, Trash2 } from 'lucide-react'
import { formatINR } from '@/lib/utils'
import { getImageUrl } from '@/lib/media'
import type { CartItem as CartItemType } from '@/types/cart.types'
import {
    cartItemDiscountPercent,
    cartItemIsLowStock,
    cartItemOriginalPrice,
    cartItemStockLabel,
    cartItemUnitPriceLabel,
    cartItemUnitSavings,
} from './cart.utils'

interface CartItemProps {
    item: CartItemType
    onQtyChange: (qty: number) => void
    onRemove: () => void
}

export function CartItem({ item, onQtyChange, onRemove }: CartItemProps) {
    const reduceMotion = useReducedMotion()
    const [substitutionPreference, setSubstitutionPreference] = useState<'best_match' | 'refund'>('best_match')
    const maxQty = item.stockQuantity ?? 99
    const href = `/products/${item.slug ?? item.productId}`
    const originalPrice = cartItemOriginalPrice(item)
    const discount = cartItemDiscountPercent(item)
    const isDiscounted = originalPrice > item.price
    const isLowStock = cartItemIsLowStock(item)
    const stockLabel = cartItemStockLabel(item)
    const originalSubtotal = originalPrice * item.quantity
    const unitPriceLabel = cartItemUnitPriceLabel(item)

    const handleStepperKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault()
            if (item.quantity < maxQty) onQtyChange(item.quantity + 1)
        }

        if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault()
            if (item.quantity > 1) onQtyChange(item.quantity - 1)
        }
    }

    return (
        <m.article
            layout={!reduceMotion}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -40, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
            className="group rounded-[22px] bg-[color:var(--shop-surface-elevated)] p-[14px] shadow-[var(--shop-shadow-level-1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shop-shadow-level-2)]"
        >
            <div className="grid grid-cols-[72px_minmax(0,1fr)_124px] gap-4">
                <Link
                    href={href}
                    className="relative h-[72px] w-[72px] overflow-hidden rounded-[12px] border border-[color:var(--shop-border)]"
                    style={{ backgroundImage: 'var(--shop-gradient-promo)' }}
                >
                    <Image
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        fill
                        className="object-contain p-2.5"
                        sizes="72px"
                    unoptimized={true}
                    />
                </Link>

                <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <Link
                                href={href}
                                className="block text-[15px] font-bold leading-[1.32] text-[color:var(--shop-ink)] transition-colors hover:text-[color:var(--shop-primary)]"
                            >
                                <span className="line-clamp-2">{item.name}</span>
                            </Link>

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--shop-primary-soft)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--shop-primary)]">
                                    <Package2 className="h-3 w-3" />
                                    {item.unit || 'Unit'}
                                </span>
                                <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                        item.inStock
                                            ? isLowStock
                                                ? 'bg-amber-50 text-amber-700'
                                                : 'bg-emerald-50 text-emerald-700'
                                            : 'bg-rose-50 text-rose-700'
                                    }`}
                                >
                                    <span
                                        className={`h-2 w-2 rounded-full ${
                                            item.inStock
                                                ? isLowStock
                                                    ? 'bg-amber-500'
                                                    : 'bg-emerald-500'
                                                : 'bg-rose-500'
                                        }`}
                                    />
                                    {stockLabel}
                                </span>
                            </div>

                            {unitPriceLabel ? (
                                <p className="mt-1.5 text-[11px] font-medium text-[color:var(--shop-ink-faint)]">
                                    {unitPriceLabel}
                                </p>
                            ) : null}

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <p className="text-[16px] font-bold tabular-nums text-[color:var(--shop-ink)]">{formatINR(item.price)}</p>
                                {isDiscounted && (
                                    <span className="inline-flex rounded-full bg-[rgba(194,65,12,0.10)] px-2.5 py-1 text-[11px] font-bold tracking-[0.04em] text-[color:var(--shop-discount)]">
                                        {discount > 0 ? `${discount}% OFF` : `Save ${formatINR(cartItemUnitSavings(item))}`}
                                    </span>
                                )}
                            </div>

                            <div className="mt-3 rounded-[14px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] p-3">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--shop-ink-faint)]">
                                    Substitution
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setSubstitutionPreference('best_match')}
                                        className={`inline-flex h-8 items-center rounded-full px-3 text-[11px] font-semibold transition-colors ${
                                            substitutionPreference === 'best_match'
                                                ? 'bg-[color:var(--shop-primary)] text-white'
                                                : 'border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] text-[color:var(--shop-ink-muted)] hover:border-[color:var(--shop-primary)] hover:text-[color:var(--shop-primary)]'
                                        }`}
                                    >
                                        Best match
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSubstitutionPreference('refund')}
                                        className={`inline-flex h-8 items-center rounded-full px-3 text-[11px] font-semibold transition-colors ${
                                            substitutionPreference === 'refund'
                                                ? 'bg-[color:var(--shop-primary)] text-white'
                                                : 'border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] text-[color:var(--shop-ink-muted)] hover:border-[color:var(--shop-primary)] hover:text-[color:var(--shop-primary)]'
                                        }`}
                                    >
                                        Refund if unavailable
                                    </button>
                                </div>
                                <p className="mt-2 text-[11px] leading-5 text-[color:var(--shop-ink-muted)]">
                                    Pick whether we replace an unavailable item with a similar option or refund it before checkout.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onRemove}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[color:var(--shop-ink-faint)] opacity-0 transition-all hover:bg-red-50 hover:text-red-500 focus-visible:opacity-100 group-hover:opacity-100"
                            aria-label={`Remove ${item.name} from cart`}
                        >
                            <Trash2 className="h-4 w-4" strokeWidth={1.7} />
                        </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                        <div
                            tabIndex={0}
                            onKeyDown={handleStepperKeyDown}
                            className="grid h-9 w-[114px] grid-cols-3 overflow-hidden rounded-[10px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--shop-primary-soft)]"
                            aria-label={`Quantity for ${item.name}`}
                        >
                            <button
                                type="button"
                                onClick={() => onQtyChange(Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                                className="flex h-full w-full items-center justify-center text-[color:var(--shop-action)] transition-colors hover:bg-[color:var(--shop-action-soft)] disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label={`Decrease quantity of ${item.name}`}
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <m.span
                                key={item.quantity}
                                initial={reduceMotion ? false : { y: 8, opacity: 0 }}
                                animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                                className="inline-flex h-full w-full items-center justify-center border-x border-[color:var(--shop-border)] text-sm font-semibold text-[color:var(--shop-ink)]"
                            >
                                {item.quantity}
                            </m.span>
                            <button
                                type="button"
                                onClick={() => onQtyChange(Math.min(maxQty, item.quantity + 1))}
                                disabled={item.quantity >= maxQty}
                                className="flex h-full w-full items-center justify-center bg-[color:var(--shop-action)] text-white transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label={`Increase quantity of ${item.name}`}
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        {isDiscounted && (
                            <p className="text-xs font-medium text-[color:var(--shop-ink-muted)]">
                                You save {formatINR(cartItemUnitSavings(item) * item.quantity)}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-end justify-between text-right">
                    <div className="min-h-9" />
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--shop-ink-faint)]">
                            Subtotal
                        </p>
                        {isDiscounted && (
                            <p className="mt-1 text-xs font-medium text-[color:var(--shop-ink-faint)] line-through">
                                {formatINR(originalSubtotal)}
                            </p>
                        )}
                        <m.p
                            key={`${item.productId}-${item.quantity}`}
                            initial={reduceMotion ? false : { y: 10, opacity: 0 }}
                            animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                            className="mt-1 text-[22px] font-extrabold tabular-nums tracking-[-0.03em] text-[color:var(--shop-ink)]"
                        >
                            {formatINR(item.subtotal)}
                        </m.p>
                    </div>
                </div>
            </div>
        </m.article>
    )
}
