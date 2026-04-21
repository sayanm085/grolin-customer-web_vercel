'use client'

import { ArrowRight } from 'lucide-react'
import { formatINR } from '@/lib/utils'

interface CartStickyBarProps {
    itemCount: number
    total: number
    savings?: number
    onCheckout: () => void
    disabled?: boolean
    loading?: boolean
}

export function CartStickyBar({
    itemCount,
    total,
    onCheckout,
    disabled = false,
    loading = false,
}: CartStickyBarProps) {
    return (
        <div className="fixed inset-x-0 bottom-0 z-[220] px-3 pb-[calc(env(safe-area-inset-bottom)+0.85rem)] lg:hidden">
            <div className="mx-auto max-w-2xl rounded-[24px] border border-black/5 bg-white/96 p-3 shadow-[0_18px_44px_rgba(15,23,42,0.14),0_2px_8px_rgba(15,23,42,0.06)] backdrop-blur-[20px]">
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <div aria-live="polite" className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[color:var(--shop-ink)]">
                        {formatINR(total)} {'\u00B7'} {itemCount} item{itemCount !== 1 ? 's' : ''}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onCheckout}
                        disabled={disabled || loading}
                        className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-[16px] bg-[color:var(--shop-action)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[168px]"
                    >
                        {loading ? 'Loading...' : 'Checkout'}
                        {!loading && <ArrowRight className="h-4 w-4" />}
                    </button>
                </div>
            </div>
        </div>
    )
}
