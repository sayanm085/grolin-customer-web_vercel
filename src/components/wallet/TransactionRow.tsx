import { ArrowDownLeft, ArrowUpRight, Receipt, RotateCcw, Wallet } from 'lucide-react'
import type { WalletTransaction } from '@/types/wallet.types'
import { cn, formatDateTime, formatINR } from '@/lib/utils'

interface TransactionRowProps {
    transaction: WalletTransaction
}

function getTransactionIconMeta(transaction: WalletTransaction) {
    const description = transaction.description?.toLowerCase() ?? ''

    if (description.includes('refund') || description.includes('cashback') || description.includes('reward')) {
        return {
            icon: RotateCcw,
            iconClassName: 'bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]',
        }
    }

    if (description.includes('top up') || description.includes('top-up') || description.includes('add money') || description.includes('wallet')) {
        return {
            icon: Wallet,
            iconClassName: 'bg-[color:var(--shop-action-soft)] text-[color:var(--shop-action)]',
        }
    }

    if (description.includes('order') || description.includes('payment') || description.includes('purchase')) {
        return {
            icon: Receipt,
            iconClassName: 'bg-[color:var(--shop-surface-subtle)] text-[color:var(--shop-ink-muted)]',
        }
    }

    return {
        icon: transaction.type === 'CREDIT' ? ArrowDownLeft : ArrowUpRight,
        iconClassName:
            transaction.type === 'CREDIT'
                ? 'bg-[color:var(--shop-action-soft)] text-[color:var(--shop-action)]'
                : 'bg-[color:var(--shop-surface-subtle)] text-[color:var(--shop-ink-muted)]',
    }
}

export function TransactionRow({ transaction }: TransactionRowProps) {
    const isCredit = transaction.type === 'CREDIT'
    const { icon: Icon, iconClassName } = getTransactionIconMeta(transaction)

    return (
        <div className="flex items-center gap-4 rounded-[18px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-4 py-[14px] shadow-[var(--shop-shadow-level-1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shop-shadow-level-2)]">
            <div
                className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
                    iconClassName,
                )}
            >
                <Icon className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[color:var(--shop-ink)]">
                    {transaction.description || (isCredit ? 'Money Added' : 'Payment')}
                </p>
                <p className="mt-1 text-[12px] text-[color:var(--shop-ink-faint)]">
                    {formatDateTime(transaction.created_at ?? transaction.createdAt ?? '')}
                </p>
            </div>

            <div className="text-right">
                <p className={cn('text-[15px] font-bold tabular-nums', isCredit ? 'text-[color:var(--shop-success)]' : 'text-[color:var(--shop-ink)]')}>
                    {isCredit ? '+' : '-'}
                    {formatINR(transaction.amount)}
                </p>
                {transaction.balanceAfter !== undefined && (
                    <p className="mt-1 text-[10px] text-[color:var(--shop-ink-faint)]">
                        Bal: {formatINR(transaction.balanceAfter)}
                    </p>
                )}
            </div>
        </div>
    )
}