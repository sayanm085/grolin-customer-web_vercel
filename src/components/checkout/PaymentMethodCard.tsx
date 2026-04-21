import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface PaymentMethodCardProps {
    icon: LucideIcon
    label: string
    subtext?: string
    badge?: string
    selected: boolean
    onSelect: () => void
    disabled?: boolean
    tone?: 'default' | 'wallet'
    children?: ReactNode
}

export function PaymentMethodCard({
    icon: Icon,
    label,
    subtext,
    badge,
    selected,
    onSelect,
    disabled,
    tone = 'default',
    children,
}: PaymentMethodCardProps) {
    return (
        <div
            className={cn(
                'group rounded-[22px] transition-all duration-200',
                disabled && 'border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] opacity-75',
                !disabled && tone === 'wallet' && !selected && 'border border-[color:var(--shop-border)] bg-[linear-gradient(135deg,rgba(110,73,216,0.10)_0%,rgba(255,255,255,0.98)_100%)] shadow-[var(--shop-shadow-level-1)] hover:-translate-y-0.5 hover:shadow-[var(--shop-shadow-level-2)]',
                !disabled && tone === 'wallet' && selected && 'border-2 border-[color:var(--shop-primary)] bg-[linear-gradient(135deg,rgba(110,73,216,0.18)_0%,rgba(255,255,255,0.98)_100%)] shadow-[var(--shop-shadow-level-2)]',
                !disabled && tone === 'default' && selected && 'border-2 border-[color:var(--shop-primary)] bg-[color:var(--shop-primary-soft)] shadow-[var(--shop-shadow-level-1)]',
                !disabled && tone === 'default' && !selected && 'border border-[color:var(--shop-border)] bg-white shadow-[var(--shop-shadow-level-1)] hover:-translate-y-0.5 hover:shadow-[var(--shop-shadow-level-2)]',
            )}
        >
            <button
                onClick={onSelect}
                disabled={disabled}
                aria-pressed={selected}
                className="w-full p-5 text-left disabled:cursor-not-allowed"
                type="button"
            >
                <div className="flex items-start gap-4">
                    <div
                        className={cn(
                            'flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] transition-colors',
                            selected
                                ? 'bg-white text-[color:var(--shop-primary)]'
                                : 'bg-[color:var(--shop-surface-subtle)] text-[color:var(--shop-ink-muted)] group-hover:text-[color:var(--shop-primary)]',
                        )}
                    >
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-[color:var(--shop-ink)]">{label}</span>
                            {badge && (
                                <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--shop-primary)]">
                                    {badge}
                                </span>
                            )}
                        </div>
                        {subtext && <p className="mt-1 text-sm text-[color:var(--shop-ink-muted)]">{subtext}</p>}
                    </div>

                    <div
                        className={cn(
                            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-200',
                            selected
                                ? 'border-[color:var(--shop-primary)] bg-[color:var(--shop-primary)] shadow-[0_8px_16px_rgba(110,73,216,0.22)]'
                                : 'border-[color:var(--shop-border)] bg-white',
                        )}
                    >
                        <Check
                            className={cn(
                                'h-3.5 w-3.5 transition-all duration-200',
                                selected ? 'scale-100 text-white opacity-100' : 'scale-75 text-transparent opacity-0',
                            )}
                            strokeWidth={3}
                        />
                    </div>
                </div>
            </button>

            {children && selected && !disabled && <div className="px-5 pb-5">{children}</div>}
        </div>
    )
}