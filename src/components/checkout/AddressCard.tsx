import { Briefcase, CheckCircle2, Home, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Address } from '@/types/address.types'

interface AddressCardProps {
    address: Address
    selected: boolean
    onSelect: () => void
}

export function AddressCard({ address, selected, onSelect }: AddressCardProps) {
    const LabelIcon = getAddressIcon(address.label)

    return (
        <button
            onClick={onSelect}
            aria-pressed={selected}
            className={cn(
                'group relative flex w-full items-start gap-4 rounded-[22px] p-5 text-left transition-all duration-200',
                selected
                    ? 'border-2 border-[color:var(--shop-primary)] bg-[color:var(--shop-primary-soft)] shadow-[var(--shop-shadow-level-1)]'
                    : 'border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] shadow-[var(--shop-shadow-level-1)] hover:-translate-y-0.5 hover:shadow-[var(--shop-shadow-level-2)]',
            )}
            type="button"
        >
            {selected && (
                <span className="absolute right-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--shop-success)] text-white shadow-[var(--shop-shadow-level-1)]">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.1} />
                </span>
            )}

            <div
                className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] transition-colors',
                    selected
                        ? 'bg-white text-[color:var(--shop-primary)]'
                        : 'bg-[color:var(--shop-surface-subtle)] text-[color:var(--shop-ink-muted)] group-hover:text-[color:var(--shop-primary)]',
                )}
            >
                <LabelIcon className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div className="min-w-0 flex-1 pr-8">
                <div className="flex flex-wrap items-center gap-2">
                    {address.label && (
                        <span
                            className={cn(
                                'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold',
                                selected
                                    ? 'bg-white text-[color:var(--shop-primary)]'
                                    : 'bg-[color:var(--shop-surface-subtle)] text-[color:var(--shop-ink-muted)]',
                            )}
                        >
                            {address.label}
                        </span>
                    )}
                </div>

                <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--shop-ink)]">
                    {address.address_line1}
                    {address.address_line2 ? `, ${address.address_line2}` : ''}
                </p>
                <p className="mt-1 text-sm text-[color:var(--shop-ink-muted)]">
                    {address.city}, {address.state} - {address.pincode}
                </p>
            </div>

            <div className="hidden shrink-0 self-center text-xs font-medium text-[color:var(--shop-ink-faint)] sm:block">
                {selected ? 'Selected' : 'Tap to select'}
            </div>
        </button>
    )
}

function getAddressIcon(label?: string) {
    const normalized = (label ?? '').toLowerCase()

    if (normalized === 'home') return Home
    if (normalized === 'work') return Briefcase
    return MapPin
}