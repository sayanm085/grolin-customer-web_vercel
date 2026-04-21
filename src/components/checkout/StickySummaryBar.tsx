'use client'

import { useState, type ReactNode } from 'react'
import { ChevronUp } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { formatINR } from '@/lib/utils'
import { PrimaryCheckoutButton } from './PrimaryCheckoutButton'

interface StickySummaryBarProps {
    total: number
    itemCount: number
    ctaLabel: string
    onCtaClick: () => void
    disabled?: boolean
    loading?: boolean
    securityNote?: string
    children: ReactNode
}

export function StickySummaryBar({
    total,
    itemCount,
    ctaLabel,
    onCtaClick,
    disabled = false,
    loading = false,
    securityNote,
    children,
}: StickySummaryBarProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="fixed inset-x-0 bottom-0 z-[220] px-3 pb-[calc(env(safe-area-inset-bottom)+0.85rem)] lg:hidden">
                <div className="mx-auto max-w-2xl rounded-[24px] border border-black/5 bg-white/96 p-3 shadow-[0_18px_44px_rgba(15,23,42,0.14),0_2px_8px_rgba(15,23,42,0.06)] backdrop-blur-[20px]">
                    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="flex min-w-0 flex-1 items-center justify-between rounded-[16px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] px-3.5 py-3 text-left"
                        >
                            <p className="truncate text-sm font-semibold text-[color:var(--shop-ink)]">
                                {`${formatINR(total)} \u00B7 ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
                            </p>
                            <ChevronUp className="ml-3 h-4 w-4 shrink-0 text-[color:var(--shop-ink-muted)]" />
                        </button>

                        <div className="w-full shrink-0 sm:w-[220px]">
                            <PrimaryCheckoutButton
                                label={ctaLabel}
                                loading={loading}
                                disabled={disabled}
                                onClick={onCtaClick}
                                className="h-12 rounded-[16px] bg-[color:var(--shop-action)] px-4 text-[13px] shadow-none hover:bg-[color:var(--shop-action-hover)]"
                            />
                        </div>
                    </div>

                    {securityNote && (
                        <p className="mt-2 text-center text-[11px] font-medium text-[color:var(--shop-trust)]">
                            {securityNote}
                        </p>
                    )}
                </div>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    side="bottom"
                    className="rounded-t-[28px] border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] px-4 pb-6 pt-5"
                >
                    <SheetHeader className="mb-4">
                        <SheetTitle className="text-left text-[color:var(--shop-ink)]">Order summary</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-4">{children}</div>
                </SheetContent>
            </Sheet>
        </>
    )
}
