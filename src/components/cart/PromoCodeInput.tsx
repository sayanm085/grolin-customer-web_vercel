'use client'

import { useState } from 'react'
import { ChevronRight, Loader2, Tag, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PromoCodeInputProps {
    appliedCode: string | null
    discount: number
    isValidating: boolean
    onApply: (code: string) => void
    onRemove: () => void
    onViewCoupons: () => void
}

export function PromoCodeInput({
    appliedCode,
    isValidating,
    onApply,
    onRemove,
    onViewCoupons,
}: PromoCodeInputProps) {
    const [code, setCode] = useState('')

    if (appliedCode) {
        return (
            <div className="flex items-center justify-between rounded-[16px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-4 py-3.5 shadow-[var(--shop-shadow-level-1)]">
                <div className="flex min-w-0 items-center gap-2">
                    <Tag className="h-4 w-4 text-[color:var(--shop-action)]" strokeWidth={1.5} />
                    <span className="truncate text-sm font-semibold text-[color:var(--shop-ink)]">{appliedCode}</span>
                    <span className="text-xs text-[color:var(--shop-action)]">applied</span>
                </div>
                <button
                    type="button"
                    onClick={onRemove}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--shop-action-soft)]"
                    aria-label="Remove promo code"
                >
                    <X className="h-3.5 w-3.5 text-[color:var(--shop-action)]" />
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <div className="flex items-stretch">
                <input
                    type="text"
                    placeholder="Promo code"
                    value={code}
                    onChange={(event) => setCode(event.target.value.toUpperCase())}
                    className="h-11 flex-1 rounded-l-[10px] rounded-r-none border border-r-0 border-[color:var(--shop-border)] bg-white px-4 text-sm font-medium text-[color:var(--shop-ink)] placeholder:text-[color:var(--shop-ink-faint)] outline-none transition-colors focus:z-10 focus:border-[color:var(--shop-primary)]"
                    style={{ borderWidth: '1.5px' }}
                />
                <button
                    type="button"
                    onClick={() => {
                        if (code.trim()) onApply(code.trim())
                    }}
                    disabled={!code.trim() || isValidating}
                    className={cn(
                        'inline-flex h-11 min-w-[96px] items-center justify-center rounded-l-none rounded-r-[10px] px-5 text-sm font-semibold text-white transition-opacity',
                        code.trim()
                            ? 'bg-[color:var(--shop-accent)] hover:opacity-95'
                            : 'bg-[color:var(--shop-accent)] opacity-55',
                    )}
                >
                    {isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
                </button>
            </div>

            <button
                type="button"
                onClick={onViewCoupons}
                className="flex w-full items-center justify-between rounded-[14px] border border-dashed border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] px-4 py-3 text-left transition-colors hover:border-[color:var(--shop-primary)] hover:bg-[color:var(--shop-primary-soft)]"
            >
                <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-[color:var(--shop-primary)] opacity-70" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-[color:var(--shop-ink-muted)]">Browse available coupons</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[color:var(--shop-primary)] opacity-70" />
            </button>
        </div>
    )
}
