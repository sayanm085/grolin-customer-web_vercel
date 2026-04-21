'use client'

import { useRouter } from 'next/navigation'
import { Loader2, Minus, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { useAuthStore } from '@/store/auth.store'

interface AddToCartButtonProps {
    productId: string
    stockQty: number
    maxQty?: number | null
    className?: string
}

export function AddToCartButton({ productId, stockQty, maxQty, className }: AddToCartButtonProps) {
    const router = useRouter()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const { getQty, addToCart, updateQty, removeFromCart, isAdding } = useCart()
    const qty = getQty(productId)
    const limit = Math.min(maxQty ?? 10, stockQty)

    const handleAdd = () => {
        if (!isLoggedIn) {
            router.push('/login')
            return
        }
        if (stockQty <= 0) {
            toast.error('Out of stock')
            return
        }
        addToCart(productId, 1)
    }

    if (qty === 0) {
        return (
            <button
                onClick={handleAdd}
                disabled={stockQty <= 0 || isAdding}
                className={cn(
                    'flex items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 text-[13px] font-bold text-white shadow-green-glow btn-press transition-all duration-150 hover:shadow-green-glow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--shop-action)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                style={{ backgroundImage: 'linear-gradient(135deg, #16945E 0%, #128050 100%)' }}
                type="button"
            >
                {isAdding ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <>
                        <Plus className="h-4 w-4" strokeWidth={2.4} /> Add to Cart
                    </>
                )}
            </button>
        )
    }

    return (
        <div className={cn('grid grid-cols-3 overflow-hidden rounded-[10px] bg-[color:var(--shop-action)] text-white shadow-[var(--shop-shadow-level-1)]', className)}>
            <button
                onClick={() => (qty <= 1 ? removeFromCart(productId) : updateQty(productId, qty - 1))}
                className="flex h-10 items-center justify-center border-r border-white/15 transition-colors hover:bg-[color:var(--shop-action-hover)] focus-visible:outline-none"
                type="button"
                aria-label="Decrease quantity"
            >
                <Minus className="h-3.5 w-3.5" strokeWidth={2.4} />
            </button>
            <span className="flex h-10 items-center justify-center text-[15px] font-bold tabular-nums" aria-label={`Quantity: ${qty}`}>{qty}</span>
            <button
                onClick={() => updateQty(productId, qty + 1)}
                disabled={qty >= limit}
                className="flex h-10 items-center justify-center border-l border-white/15 transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:opacity-40 focus-visible:outline-none"
                type="button"
                aria-label="Increase quantity"
            >
                <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
            </button>
        </div>
    )
}
