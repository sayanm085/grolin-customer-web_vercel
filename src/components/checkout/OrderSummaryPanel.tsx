'use client'

import { CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PriceBreakdown } from './PriceBreakdown'
import { PrimaryCheckoutButton } from './PrimaryCheckoutButton'
import { TrustBadge } from './TrustBadge'

interface OrderSummaryPanelProps {
    subtotal: number
    deliveryFee: number
    platformFee: number
    discount: number
    total: number
    itemCount: number
    ctaLabel?: string
    onAction?: () => void
    actionDisabled?: boolean
    actionLoading?: boolean
    freeDeliveryThreshold?: number
    className?: string
    stageLabel?: string
    securityNote?: string
}

export function OrderSummaryPanel({
    subtotal,
    deliveryFee,
    platformFee,
    discount,
    total,
    itemCount,
    ctaLabel,
    onAction,
    actionDisabled = false,
    actionLoading = false,
    freeDeliveryThreshold,
    className,
    stageLabel,
    securityNote,
}: OrderSummaryPanelProps) {
    return (
        <div
            className={cn(
                'rounded-[22px] bg-white p-5 shadow-[var(--shop-shadow-level-3)] sm:p-[20px]',
                className,
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--shop-primary)]">
                        Secure checkout
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[color:var(--shop-ink)]">Order Summary</h3>
                </div>

                {stageLabel && (
                    <span className="rounded-full bg-[color:var(--shop-primary-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--shop-primary)]">
                        {stageLabel}
                    </span>
                )}
            </div>

            <div className="mt-5">
                <PriceBreakdown
                    subtotal={subtotal}
                    deliveryFee={deliveryFee}
                    platformFee={platformFee}
                    discount={discount}
                    total={total}
                    itemCount={itemCount}
                    freeDeliveryThreshold={freeDeliveryThreshold}
                    showProgress
                />
            </div>

            <div className="mt-5 space-y-3">
                <TrustBadge
                    icon={ShieldCheck}
                    label="Secure checkout"
                    subtext="Bank-grade payment protection"
                    className="border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)]"
                />
                <TrustBadge
                    icon={CheckCircle2}
                    label="No hidden charges"
                    subtext="Every fee is shown before you pay"
                    className="border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)]"
                />
                <TrustBadge
                    icon={RotateCcw}
                    label="Easy returns"
                    subtext="Support is available if your order changes"
                    className="border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)]"
                />
            </div>

            {ctaLabel && onAction && (
                <div className="mt-6">
                    <PrimaryCheckoutButton
                        label={ctaLabel}
                        loading={actionLoading}
                        disabled={actionDisabled}
                        onClick={onAction}
                        className="h-14 rounded-[14px] bg-[color:var(--shop-action)] shadow-[0_16px_32px_rgba(22,163,74,0.24)] hover:bg-[color:var(--shop-action-hover)]"
                    />
                    {securityNote && (
                        <p className="mt-3 text-center text-xs font-medium text-[color:var(--shop-trust)]">
                            {securityNote}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}