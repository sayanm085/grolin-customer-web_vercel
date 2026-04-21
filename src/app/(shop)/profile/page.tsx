import dynamic from 'next/dynamic'
import { ProfileSkeleton } from '@/components/skeletons/ProfileSkeleton'

const ProfilePageClient = dynamic(() => import('./ProfilePageClient'), {
    ssr: false,
    loading: () => <ProfileSkeleton />,
})

export default function ProfilePage() {
    return <ProfilePageClient />
}
