import { Wallet } from 'lucide-react'

interface WalletEmptyProps {
    onAddMoney: () => void
}

export function WalletEmpty({ onAddMoney }: WalletEmptyProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] px-6 py-16 text-center shadow-[var(--shop-shadow-level-1)]">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--shop-surface-subtle)]">
                <Wallet className="h-8 w-8 text-[color:var(--shop-ink-faint)]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-[color:var(--shop-ink)]">No transactions yet</h3>
            <p className="mt-2 max-w-[280px] text-sm text-[color:var(--shop-ink-muted)]">Add money to get started</p>
            <button
                type="button"
                onClick={onAddMoney}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-[12px] bg-[color:var(--shop-action)] px-6 text-sm font-semibold text-white shadow-[var(--shop-shadow-level-1)] transition-colors hover:bg-[color:var(--shop-action-hover)]"
            >
                Add Money
            </button>
        </div>
    )
}