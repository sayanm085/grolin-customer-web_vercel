'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Minus, Plus, ShoppingCart, Loader2, Heart, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import { formatINR } from '@/lib/utils'
import type { Product } from '@/types/product.types'

export function AddToCartSection({ product }: { product: Product }) {
    const { addToCart, updateQty, removeFromCart, getQty, isAdding, isUpdating } = useCart()
    const qty = getQty(product.id)
    const max = product.max_order_qty ?? Math.min(product.stock_quantity, 10)
    const outOfStock = product.stock_quantity === 0

    const [selectedQty, setSelectedQty] = useState(1)
    const displayPrice = product.sale_price ?? product.salePrice ?? product.price
    const lowStockMessage =
        product.stock_quantity <= 1
            ? 'Last one left'
            : product.stock_quantity < 5
              ? `Only ${product.stock_quantity} left`
              : null

    if (outOfStock) {
        return (
            <div className="rounded-2xl border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] p-4 text-center">
                <p className="text-sm font-medium text-[color:var(--shop-ink-muted)]">Currently out of stock</p>
                <Button variant="outline" size="sm" className="mt-3">
                    <Heart className="mr-2 h-4 w-4" /> Notify When Available
                </Button>
            </div>
        )
    }

    if (qty > 0) {
        return (
            <div className="space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="grid h-[52px] w-full grid-cols-3 overflow-hidden rounded-[14px] bg-[color:var(--shop-action)] text-white shadow-[var(--shop-shadow-level-1)] sm:min-w-[200px]">
                        <button
                            type="button"
                            onClick={() => (qty === 1 ? removeFromCart(product.id) : updateQty(product.id, qty - 1))}
                            disabled={isUpdating}
                            className="flex h-full items-center justify-center border-r border-white/15 transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:opacity-40"
                            aria-label={`Decrease quantity of ${product.name}`}
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="flex h-full items-center justify-center text-[15px] font-bold tabular-nums">
                            {qty}
                        </span>
                        <button
                            type="button"
                            onClick={() => qty < max && updateQty(product.id, qty + 1)}
                            disabled={isUpdating || qty >= max}
                            className="flex h-full items-center justify-center border-l border-white/15 transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:opacity-40"
                            aria-label={`Increase quantity of ${product.name}`}
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-[color:var(--shop-ink)]">
                            In cart - {formatINR(displayPrice * qty)}
                        </p>
                        <p className="text-xs text-[color:var(--shop-ink-muted)]">
                            Adjust quantity here or review everything in cart.
                        </p>
                    </div>
                </div>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-xl text-sm font-semibold">
                    <Link href="/cart">View cart</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[color:var(--shop-ink)]">Quantity</p>
                {lowStockMessage && (
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                        <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.8} />
                        {lowStockMessage}
                    </div>
                )}
            </div>

            <div className="space-y-3 sm:flex sm:items-center sm:gap-3 sm:space-y-0">
                <div className="grid h-[52px] w-full grid-cols-3 overflow-hidden rounded-[14px] bg-[color:var(--shop-action)] text-white shadow-[var(--shop-shadow-level-1)] sm:min-w-[200px]">
                    <button
                        type="button"
                        onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
                        className="flex h-full items-center justify-center border-r border-white/15 transition-colors hover:bg-[color:var(--shop-action-hover)]"
                        aria-label={`Decrease selected quantity of ${product.name}`}
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="flex h-full items-center justify-center text-[15px] font-bold tabular-nums">
                        {selectedQty}
                    </span>
                    <button
                        type="button"
                        onClick={() => setSelectedQty((q) => Math.min(max, q + 1))}
                        disabled={selectedQty >= max}
                        className="flex h-full items-center justify-center border-l border-white/15 transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:opacity-40"
                        aria-label={`Increase selected quantity of ${product.name}`}
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
                <p className="text-xs text-[color:var(--shop-ink-muted)]">
                    Selected total: {formatINR(displayPrice * selectedQty)}
                </p>
            </div>

            <Button
                size="lg"
                className="h-[52px] w-full rounded-[14px] bg-[color:var(--shop-action)] text-[15px] font-bold text-white shadow-[var(--shop-shadow-level-1)] transition-colors hover:bg-[color:var(--shop-action-hover)] active:scale-[0.99] sm:min-w-[200px]"
                onClick={() => addToCart(product.id, selectedQty)}
                disabled={isAdding}
            >
                {isAdding ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <>
                        <ShoppingCart className="mr-2 h-5 w-5" /> Add {selectedQty} to cart -{' '}
                        {formatINR(displayPrice * selectedQty)}
                    </>
                )}
            </Button>
        </div>
    )
}
