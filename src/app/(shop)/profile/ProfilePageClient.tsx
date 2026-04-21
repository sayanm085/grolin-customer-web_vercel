'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileMenu } from '@/components/profile/ProfileMenu'
import { ReferralCard } from '@/components/profile/ReferralCard'
import { DeleteAccountDialog } from '@/components/profile/DeleteAccountDialog'
import { ProfileSkeleton } from '@/components/skeletons/ProfileSkeleton'
import { QUERY_KEYS, STALE_TIMES } from '@/lib/constants'
import { authService } from '@/services/auth.service'
import { reviewsService } from '@/services/reviews.service'
import { wishlistService } from '@/services/wishlist.service'
import { useAuthStore } from '@/store/auth.store'

function formatMemberLabel(rawDate?: string | null) {
    if (!rawDate) return 'Grolin member'

    const parsedDate = new Date(rawDate)
    if (Number.isNaN(parsedDate.getTime())) {
        return 'Grolin member'
    }

    return `Member since ${new Intl.DateTimeFormat('en-IN', {
        month: 'short',
        year: 'numeric',
    }).format(parsedDate)}`
}

export default function ProfilePageClient() {
    const { user, logout, isLoading: authLoading } = useAuthStore()
    const router = useRouter()
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {
        document.title = 'My Profile - Grolin Grocery'
    }, [])

    const { data: stats } = useQuery({
        queryKey: [...QUERY_KEYS.user, 'stats'],
        queryFn: authService.getStats,
        staleTime: STALE_TIMES.user,
        enabled: Boolean(user),
    })

    const { data: wishlistItems } = useQuery({
        queryKey: QUERY_KEYS.wishlist,
        queryFn: wishlistService.get,
        staleTime: STALE_TIMES.user,
        enabled: Boolean(user),
    })

    const { data: myReviews } = useQuery({
        queryKey: QUERY_KEYS.myReviews,
        queryFn: () => reviewsService.getMyReviews(),
        staleTime: STALE_TIMES.user,
        enabled: Boolean(user),
    })

    if (authLoading || !user) {
        return <ProfileSkeleton />
    }

    const userWithMeta = user as (typeof user & { created_at?: string | null; createdAt?: string | null }) | null
    const memberLabel = formatMemberLabel(userWithMeta?.created_at ?? userWithMeta?.createdAt ?? null)
    const profileStats = [
        { label: 'Orders', value: stats?.total_orders },
        { label: 'Lists', value: wishlistItems?.length },
        { label: 'Reviews', value: myReviews?.reviews.length },
    ]

    return (
        <div className="page-enter pb-24">
            <div className="px-4 pt-4 sm:px-6 sm:pt-6">
                <ProfileHeader
                    name={user.name}
                    phone={user.phone}
                    avatarUrl={user.avatar_url}
                    memberSinceLabel={memberLabel}
                    stats={profileStats}
                />
            </div>

            {user.referral_code && (
                <div className="mt-6 px-4 sm:px-6">
                    <ReferralCard referralCode={user.referral_code} />
                </div>
            )}

            <div className="mt-6 px-4 sm:px-6">
                <ProfileMenu
                    onLogout={async () => {
                        await authService.logout()
                        logout()
                        router.push('/login')
                    }}
                    onDeleteAccount={() => setShowDelete(true)}
                />
            </div>

            <DeleteAccountDialog isOpen={showDelete} onClose={() => setShowDelete(false)} />
        </div>
    )
}
