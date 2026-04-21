'use client'

import { useState } from 'react'
import { Banknote, CheckCircle2, CreditCard, Landmark, ShieldCheck, Smartphone, Wallet } from 'lucide-react'
import { formatINR } from '@/lib/utils'
import { PaymentMethodCard } from './PaymentMethodCard'
import { TrustBadge } from './TrustBadge'
import type { PaymentMethod } from '@/types/order.types'

type OnlineOption = 'UPI' | 'CARD' | 'NET_BANKING'

interface PaymentStepProps {
    selected: PaymentMethod
    onSelect: (method: PaymentMethod) => void
    total: number
    walletBalance: number
    deliveryNotes: string
    onDeliveryNotesChange: (value: string) => void
    walletBalanceLoading?: boolean
}

const UPI_APPS = ['Google Pay', 'PhonePe', 'Paytm'] as const

export function PaymentStep({
    selected,
    onSelect,
    total,
    walletBalance,
    deliveryNotes,
    onDeliveryNotesChange,
    walletBalanceLoading = false,
}: PaymentStepProps) {
    const [onlineOption, setOnlineOption] = useState<OnlineOption>('UPI')
    const [upiId, setUpiId] = useState('')

    const walletInsufficient = walletBalance < total
    const walletSubtext = walletBalanceLoading
        ? 'Checking wallet balance...'
        : walletInsufficient
          ? `Insufficient balance - Add ${formatINR(total - walletBalance)} more`
          : `Balance: ${formatINR(walletBalance)}`

    const selectOnline = (option: OnlineOption) => {
        setOnlineOption(option)
        onSelect('ONLINE')
    }

    return (
        <div className="space-y-5">
            <div>
                <p className="text-sm font-semibold text-[color:var(--shop-ink)]">Select payment method</p>
                <p className="mt-1 text-sm text-[color:var(--shop-ink-muted)]">
                    Pick the option that feels safest and fastest for you.
                </p>
            </div>

            <div className="space-y-3">
                <PaymentMethodCard
                    icon={Smartphone}
                    label="UPI"
                    subtext="Pay instantly with any UPI app"
                    badge="Fastest"
                    selected={selected === 'ONLINE' && onlineOption === 'UPI'}
                    onSelect={() => selectOnline('UPI')}
                >
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                            {UPI_APPS.map((app) => (
                                <span
                                    key={app}
                                    className="inline-flex h-7 items-center rounded-[8px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-3 text-[11px] font-medium text-[color:var(--shop-ink)]"
                                >
                                    {app}
                                </span>
                            ))}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-[color:var(--shop-ink-muted)]">
                                Enter UPI ID
                            </label>
                            <input
                                value={upiId}
                                onChange={(event) => setUpiId(event.target.value)}
                                placeholder="username@upi"
                                className="h-11 w-full rounded-[12px] border border-[color:var(--shop-border)] bg-[color:var(--shop-canvas)] px-4 text-sm text-[color:var(--shop-ink)] outline-none transition-colors focus:border-[color:var(--shop-primary)]"
                            />
                        </div>
                    </div>
                </PaymentMethodCard>

                <PaymentMethodCard
                    icon={CreditCard}
                    label="Card"
                    subtext="Credit and debit cards"
                    selected={selected === 'ONLINE' && onlineOption === 'CARD'}
                    onSelect={() => selectOnline('CARD')}
                />

                <PaymentMethodCard
                    icon={Landmark}
                    label="Net Banking"
                    subtext="Major banks supported"
                    selected={selected === 'ONLINE' && onlineOption === 'NET_BANKING'}
                    onSelect={() => selectOnline('NET_BANKING')}
                />

                <PaymentMethodCard
                    icon={Wallet}
                    label="Grolin Wallet"
                    subtext={walletSubtext}
                    badge={!walletInsufficient && !walletBalanceLoading ? 'Ready' : undefined}
                    selected={selected === 'WALLET'}
                    onSelect={() => onSelect('WALLET')}
                    disabled={walletBalanceLoading || walletInsufficient}
                    tone="wallet"
                />

                <PaymentMethodCard
                    icon={Banknote}
                    label="Cash on Delivery"
                    subtext={
                        total > 2000
                            ? 'Cash on delivery is available up to ₹2,000 only'
                            : 'Pay in cash when your order arrives'
                    }
                    selected={selected === 'COD'}
                    onSelect={() => onSelect('COD')}
                    disabled={total > 2000}
                />
            </div>

            <div className="grid gap-3 rounded-[22px] bg-[color:var(--shop-surface-subtle)] p-4 shadow-[var(--shop-shadow-level-1)] sm:grid-cols-3">
                <TrustBadge
                    icon={ShieldCheck}
                    label="Secure UPI"
                    subtext="Trusted payment rails for every order"
                    className="border-[color:var(--shop-border)]"
                />
                <TrustBadge
                    icon={CheckCircle2}
                    label="100% Safe Payments"
                    subtext="Protected checkout from start to finish"
                    className="border-[color:var(--shop-border)]"
                />
                <TrustBadge
                    icon={CreditCard}
                    label="Encrypted Session"
                    subtext="Your payment details stay protected"
                    className="border-[color:var(--shop-border)]"
                />
            </div>

            <div className="rounded-[22px] bg-[color:var(--shop-surface)] p-4 shadow-[var(--shop-shadow-level-1)]">
                <label className="mb-1.5 block text-sm font-medium text-[color:var(--shop-ink)]">
                    Delivery Notes <span className="text-[color:var(--shop-ink-faint)]">(optional)</span>
                </label>
                <textarea
                    value={deliveryNotes}
                    onChange={(event) => onDeliveryNotesChange(event.target.value)}
                    maxLength={200}
                    placeholder="Leave at the door, ring the bell..."
                    className="w-full rounded-[14px] border border-[color:var(--shop-border)] bg-[color:var(--shop-canvas)] px-4 py-3 text-sm text-[color:var(--shop-ink)] placeholder:text-[color:var(--shop-ink-faint)] focus:border-[color:var(--shop-primary)] focus:outline-none"
                    rows={2}
                />
                <p className="mt-2 text-right text-[10px] text-[color:var(--shop-ink-faint)]">{deliveryNotes.length}/200</p>
            </div>
        </div>
    )
}