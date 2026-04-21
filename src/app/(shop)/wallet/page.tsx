import dynamic from 'next/dynamic'
import { PageShell } from '@/components/shared'
import { WalletSkeleton } from '@/components/skeletons/WalletSkeleton'

const WalletPageClient = dynamic(() => import('./WalletPageClient'), {
    ssr: false,
    loading: () => (
        <PageShell className="pb-24" spacing="relaxed">
            <WalletSkeleton />
        </PageShell>
    ),
})

export default function WalletPage() {
    return <WalletPageClient />
}
