'use client'

import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { QUERY_KEYS, STALE_TIMES } from '@/lib/constants'
import { loadRazorpay, openRazorpayCheckout } from '@/lib/razorpay'
import { useAuthStore } from '@/store/auth.store'
import { PageHeader, PageShell } from '@/components/shared'
import { AddMoneySheet } from '@/components/wallet/AddMoneySheet'
import { TransactionRow } from '@/components/wallet/TransactionRow'
import { WalletCard } from '@/components/wallet/WalletCard'
import { WalletEmpty } from '@/components/wallet/WalletEmpty'
import { WalletSkeleton } from '@/components/skeletons/WalletSkeleton'
import { walletService } from '@/services/wallet.service'

export default function WalletPageClient() {
    const qc = useQueryClient()
    const { user, isLoading: authLoading } = useAuthStore()
    const [showAddMoney, setShowAddMoney] = useState(false)

    useEffect(() => {
        document.title = 'Wallet - Grolin Grocery'
    }, [])

    const { data: balance, isLoading: loadingBalance } = useQuery({
        queryKey: QUERY_KEYS.wallet,
        queryFn: walletService.getBalance,
        staleTime: STALE_TIMES.wallet,
        enabled: Boolean(user),
    })

    const { data: txData, isLoading: loadingTx } = useQuery({
        queryKey: QUERY_KEYS.walletTransactions,
        queryFn: () => walletService.getTransactions(),
        staleTime: STALE_TIMES.wallet,
        enabled: Boolean(user),
    })

    const transactions = txData?.transactions ?? []

    const walletErrorMessage = (error: unknown, fallback: string) =>
        error instanceof AxiosError
            ? ((error.response?.data as { message?: string } | undefined)?.message ?? fallback)
            : fallback

    const handleAddMoney = async (amount: number) => {
        if (!Number.isFinite(amount) || amount < 10 || amount > 10000) {
            toast.error('Enter a valid amount between ?10 and ?10,000')
            throw new Error('invalid_amount')
        }

        let paymentCompleted = false

        try {
            await loadRazorpay()
            const topup = await walletService.addMoney(amount)

            await openRazorpayCheckout({
                amount: topup.amount,
                currency: topup.currency,
                orderId: topup.razorpayOrderId,
                keyId: topup.keyId,
                userPhone: user?.phone ?? '',
                userName: user?.name ?? 'Grolin User',
                userEmail: user?.email ?? '',
                description: 'Wallet Top-up',
                onSuccess: async (payment) => {
                    await walletService.verifyTopUp(
                        payment.razorpay_payment_id,
                        payment.razorpay_order_id,
                        payment.razorpay_signature,
                    )
                    await Promise.all([
                        qc.invalidateQueries({ queryKey: QUERY_KEYS.wallet }),
                        qc.invalidateQueries({ queryKey: QUERY_KEYS.walletTransactions }),
                    ])
                    paymentCompleted = true
                    toast.success(`?${amount.toLocaleString('en-IN')} added to wallet!`)
                    setShowAddMoney(false)
                },
                onDismiss: () => {
                    toast.warning('Payment cancelled')
                },
            })

            if (!paymentCompleted) {
                throw new Error('payment_dismissed')
            }
        } catch (error) {
            if (error instanceof Error && error.message === 'payment_dismissed') {
                throw error
            }

            toast.error(walletErrorMessage(error, 'Could not add money right now'))
            throw error
        }
    }

    if (authLoading || !user || (loadingBalance && loadingTx)) {
        return (
            <PageShell className="pb-24" spacing="relaxed">
                <WalletSkeleton />
            </PageShell>
        )
    }

    return (
        <PageShell className="pb-24" spacing="relaxed">
            <PageHeader
                eyebrow="Balance & credits"
                title="Wallet"
                subtitle="Track wallet balance, top up instantly, and review every transaction in one place."
            />

            <WalletCard balance={balance?.balance ?? 0} onAddMoney={() => setShowAddMoney(true)} />

            <div className="flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-[color:var(--shop-ink)]">Transaction History</h2>
                <span className="text-[12px] text-[color:var(--shop-ink-muted)]">
                    {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'}
                </span>
            </div>

            {transactions.length === 0 ? (
                <WalletEmpty onAddMoney={() => setShowAddMoney(true)} />
            ) : (
                <div className="space-y-3">
                    {transactions.map((tx) => (
                        <TransactionRow key={tx.id} transaction={tx} />
                    ))}
                </div>
            )}

            <AddMoneySheet open={showAddMoney} onOpenChange={setShowAddMoney} onSubmit={handleAddMoney} />
        </PageShell>
    )
}
