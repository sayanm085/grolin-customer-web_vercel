'use client'

import { useState } from 'react'
import { Loader2, Wallet } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn, formatINR } from '@/lib/utils'

const QUICK = [100, 200, 500, 1000]

interface AddMoneySheetProps {
    open: boolean
    onOpenChange: (value: boolean) => void
    onSubmit: (amount: number) => Promise<void>
}

export function AddMoneySheet({ open, onOpenChange, onSubmit }: AddMoneySheetProps) {
    const [amount, setAmount] = useState<number | ''>('')
    const [loading, setLoading] = useState(false)
    const value = typeof amount === 'number' ? amount : 0

    const handleOpenChange = (value: boolean) => {
        onOpenChange(value)
        if (!value) {
            setAmount('')
        }
    }

    const handleSubmit = async () => {
        if (value < 10) return
        setLoading(true)
        try {
            await onSubmit(value)
            handleOpenChange(false)
        } catch {
            // The page-level submit handler owns the toast messaging.
        } finally {
            setLoading(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent side="bottom" className="rounded-t-[24px] border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-5 pb-6 pt-4">
                <SheetHeader>
                    <SheetTitle className="text-left text-lg font-bold text-[color:var(--shop-ink)]">Add Money to Wallet</SheetTitle>
                </SheetHeader>

                <div className="space-y-4 py-4">
                    <div className="flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
                            <Wallet className="h-7 w-7" strokeWidth={1.7} />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                        <span className="text-2xl font-bold text-[color:var(--shop-ink)]">₹</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value ? Number(event.target.value) : '')}
                            placeholder="0"
                            className="w-28 bg-transparent text-center text-2xl font-bold text-[color:var(--shop-ink)] outline-none placeholder:text-[color:var(--shop-ink-faint)]"
                            min={10}
                            max={10000}
                        />
                    </div>

                    <div className="flex justify-center gap-2">
                        {QUICK.map((quickAmount) => (
                            <button
                                key={quickAmount}
                                onClick={() => setAmount(quickAmount)}
                                className={cn(
                                    'rounded-[12px] border px-3 py-2 text-sm font-semibold transition-colors',
                                    amount === quickAmount
                                        ? 'border-[color:var(--shop-primary)] bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]'
                                        : 'border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] text-[color:var(--shop-ink-muted)] hover:border-[color:var(--shop-primary)]/40',
                                )}
                                type="button"
                            >
                                {formatINR(quickAmount)}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={value < 10 || loading}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-[color:var(--shop-action)] py-3 text-sm font-semibold text-white shadow-[var(--shop-shadow-level-1)] transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : `Pay ${value >= 10 ? formatINR(value) : '₹0'}`}
                    </button>
                </div>
            </SheetContent>
        </Sheet>
    )
}