import { Plus, Wallet } from 'lucide-react'
import { formatINR } from '@/lib/utils'

interface WalletCardProps {
    balance: number
    onAddMoney: () => void
}

export function WalletCard({ balance, onAddMoney }: WalletCardProps) {
    return (
        <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(135deg,rgba(110,73,216,0.95)_0%,rgba(88,61,186,0.98)_55%,rgba(53,36,119,1)_100%)] p-6 text-white shadow-[var(--shop-shadow-strong)] sm:p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-14 left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10 flex min-h-[220px] flex-col justify-between">
                <div>
                    <div className="mb-3 flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/15 backdrop-blur">
                            <Wallet className="h-5 w-5 text-white" strokeWidth={1.7} />
                        </span>
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Available Balance</p>
                            <p className="mt-1 text-sm font-medium text-white/80">Ready for top-ups and order payments</p>
                        </div>
                    </div>

                    <p className="mt-6 text-[38px] font-extrabold leading-none sm:text-[44px]">{formatINR(balance)}</p>
                    <p className="mt-2 text-sm font-medium text-white/70">Wallet balance updates instantly after successful top-ups.</p>
                </div>

                <button
                    type="button"
                    onClick={onAddMoney}
                    className="mt-8 inline-flex h-11 items-center justify-center gap-2 self-start rounded-[12px] bg-white px-5 text-sm font-semibold text-[color:var(--shop-primary)] shadow-[var(--shop-shadow-level-1)] transition-colors hover:bg-white/90"
                >
                    <Plus className="h-4 w-4" strokeWidth={1.8} />
                    Add Money
                </button>
            </div>
        </div>
    )
}