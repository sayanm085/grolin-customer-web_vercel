import type { ReactNode } from 'react'
import Link from 'next/link'
import {
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Mail,
    MessageCircle,
    PhoneCall,
    ShieldCheck,
    Sparkles,
    Truck,
} from 'lucide-react'
import { PrimaryCheckoutButton, TrustBadge } from '@/components/checkout'
import { formatINR } from '@/lib/utils'

interface CartSummaryProps {
    subtotal: number
    deliveryFee: number
    platformFee: number
    discount: number
    savings?: number
    total: number
    itemCount: number
    ctaLabel?: string
    onCheckout?: () => void
    className?: string
    promoContent?: ReactNode
    freeDeliveryThreshold?: number
}

interface SummaryRowProps {
    label: string
    value: string
    helper?: string
    valueClassName?: string
}

const SUPPORT_PHONE = '+919775845587'
const SUPPORT_EMAIL = 'support@groceryapp.com'

function SummaryRow({ label, value, helper, valueClassName }: SummaryRowProps) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <p className="text-sm font-medium text-[color:var(--shop-ink-muted)]">{label}</p>
                {helper ? <p className="mt-0.5 text-[11px] text-[color:var(--shop-ink-faint)]">{helper}</p> : null}
            </div>
            <span className={valueClassName ?? 'text-sm font-semibold text-[color:var(--shop-ink)]'}>{value}</span>
        </div>
    )
}

export function CartSummary({
    subtotal,
    deliveryFee,
    platformFee,
    discount,
    savings = 0,
    total,
    itemCount,
    ctaLabel = 'Proceed to Checkout \u2192',
    onCheckout,
    className = '',
    promoContent,
    freeDeliveryThreshold,
}: CartSummaryProps) {
    const freeDeliveryHint = freeDeliveryThreshold
        ? `free above ${formatINR(freeDeliveryThreshold)}`
        : 'delivery charges apply by order value'

    return (
        <div
            className={`overflow-hidden rounded-[22px] bg-[color:var(--shop-surface-elevated)] p-[20px] shadow-[var(--shop-shadow-level-3)] ${className}`}
        >
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--shop-ink-faint)]">
                        Order review
                    </p>
                    <h3 className="mt-2 text-[24px] font-bold tracking-tight text-[color:var(--shop-ink)]">
                        Order Summary
                    </h3>
                </div>
                <span className="inline-flex rounded-full bg-[color:var(--shop-primary-soft)] px-3 py-1 text-[11px] font-semibold text-[color:var(--shop-primary)]">
                    {itemCount} item{itemCount !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="rounded-[16px] bg-[color:var(--shop-surface-subtle)] p-4 shadow-[var(--shop-shadow-level-1)]">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
                            <CalendarDays className="h-5 w-5" />
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-[color:var(--shop-ink)]">Today, 2-4 PM</p>
                            <p className="mt-1 text-xs text-[color:var(--shop-ink-muted)]">Estimated delivery slot</p>
                        </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--shop-primary)]">
                        Change
                        <ChevronRight className="h-4 w-4" />
                    </span>
                </div>

                {subtotal > 500 && (
                    <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[color:var(--shop-action-soft)] px-3 py-1 text-[11px] font-semibold text-[color:var(--shop-action)]">
                        <Sparkles className="h-3.5 w-3.5" />
                        Express delivery available
                    </div>
                )}
            </div>

            {promoContent && (
                <div className="mt-4 rounded-[16px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] p-4 shadow-[var(--shop-shadow-level-1)]">
                    {promoContent}
                </div>
            )}

            <div className="mt-4 rounded-[16px] border border-[color:var(--shop-border)] bg-white p-4 shadow-[var(--shop-shadow-level-1)]">
                <div className="space-y-3.5">
                    <SummaryRow label={`Items (${itemCount})`} value={formatINR(subtotal)} helper="cart subtotal before discounts and fees" />
                    {savings > 0 && (
                        <SummaryRow
                            label="Savings"
                            value={`-${formatINR(savings)}`}
                            helper="instant product savings already applied"
                            valueClassName="text-sm font-semibold text-[color:var(--shop-action)]"
                        />
                    )}
                    <SummaryRow
                        label="Delivery"
                        value={deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}
                        helper={freeDeliveryHint}
                        valueClassName={
                            deliveryFee === 0
                                ? 'text-sm font-semibold text-[color:var(--shop-action)]'
                                : 'text-sm font-semibold text-[color:var(--shop-ink)]'
                        }
                    />
                    <SummaryRow
                        label="Platform fee"
                        value={formatINR(platformFee)}
                        helper="packing, handling, and service support"
                    />
                    {discount > 0 && (
                        <SummaryRow
                            label="Coupon"
                            value={`-${formatINR(discount)}`}
                            helper="promo discount applied to this basket"
                            valueClassName="text-sm font-semibold text-[color:var(--shop-action)]"
                        />
                    )}
                </div>

                <div className="mt-4 border-t border-[color:var(--shop-border)] pt-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold text-[color:var(--shop-ink)]">To pay</p>
                            <p className="mt-0.5 text-[11px] text-[color:var(--shop-ink-faint)]">final amount including all visible charges</p>
                        </div>
                        <p className="text-[24px] font-bold tracking-[-0.04em] text-[color:var(--shop-ink)]">{formatINR(total)}</p>
                    </div>
                </div>
            </div>

            <div className="mt-3.5 space-y-2">
                <TrustBadge
                    icon={ShieldCheck}
                    label="Secure checkout"
                    subtext="Protected pricing and verified payment flow"
                    className="border-[color:var(--shop-border)]"
                />
                <TrustBadge
                    icon={CheckCircle2}
                    label="No hidden charges"
                    subtext="Every fee is visible before you continue"
                    className="border-[color:var(--shop-border)]"
                />
                <TrustBadge
                    icon={Truck}
                    label="Reliable delivery"
                    subtext="Live order timing and delivery updates"
                    className="border-[color:var(--shop-border)]"
                />
            </div>

            {onCheckout && (
                <div className="mt-4" aria-live="polite">
                    <PrimaryCheckoutButton
                        label={ctaLabel}
                        onClick={onCheckout}
                        className="h-[52px] rounded-[14px] text-base font-bold hover:scale-[1.01]"
                    />
                </div>
            )}

            <div className="mt-4 rounded-[16px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] p-4">
                <p className="text-sm font-semibold text-[color:var(--shop-ink)]">Need help?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                        href={`https://wa.me/${SUPPORT_PHONE.replace(/\D/g, '')}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-3 py-2 text-sm font-medium text-[color:var(--shop-ink-muted)]"
                    >
                        <MessageCircle className="h-4 w-4 text-[color:var(--shop-action)]" />
                        Chat
                    </Link>
                    <Link
                        href={`tel:${SUPPORT_PHONE}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-3 py-2 text-sm font-medium text-[color:var(--shop-ink-muted)]"
                    >
                        <PhoneCall className="h-4 w-4 text-[color:var(--shop-action)]" />
                        Call
                    </Link>
                    <Link
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-3 py-2 text-sm font-medium text-[color:var(--shop-ink-muted)]"
                    >
                        <Mail className="h-4 w-4 text-[color:var(--shop-action)]" />
                        Email
                    </Link>
                </div>
            </div>
        </div>
    )
}
