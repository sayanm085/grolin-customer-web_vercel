'use client'

import { useRef, useState, type ChangeEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Camera, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProfileStat {
    label: string
    value?: number | string | null
}

interface ProfileHeaderProps {
    name?: string | null
    phone?: string | null
    avatarUrl?: string | null
    memberSinceLabel?: string | null
    stats: ReadonlyArray<ProfileStat>
    onAvatarUpload?: (file: File) => Promise<void>
}

export function ProfileHeader({
    name,
    phone,
    avatarUrl,
    memberSinceLabel,
    stats,
    onAvatarUpload,
}: ProfileHeaderProps) {
    const fileRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)
    const initial = name?.[0]?.toUpperCase() ?? '?'

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file || !onAvatarUpload) return

        setIsUploading(true)
        try {
            await onAvatarUpload(file)
        } finally {
            setIsUploading(false)
            event.target.value = ''
        }
    }

    const avatarContent = avatarUrl ? (
        <div className="relative h-20 w-20 overflow-hidden rounded-full">
            <Image
                src={avatarUrl}
                alt={name ?? 'Avatar'}
                fill
                className="object-cover"
                sizes="80px"
            />
        </div>
    ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--shop-surface)] text-[28px] font-bold text-[color:var(--shop-primary)]">
            {initial}
        </div>
    )

    const avatarNode = onAvatarUpload ? (
        <button
            onClick={() => fileRef.current?.click()}
            className="relative h-20 w-20 shrink-0 disabled:cursor-not-allowed"
            disabled={isUploading}
            type="button"
        >
            {avatarContent}
            <div
                className={cn(
                    'absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity hover:opacity-100',
                    isUploading && 'opacity-100',
                )}
            >
                {isUploading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                ) : (
                    <Camera className="h-5 w-5 text-white" strokeWidth={1.5} />
                )}
            </div>
            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </button>
    ) : (
        <div className="relative h-20 w-20 shrink-0">{avatarContent}</div>
    )

    const secondaryParts = [phone, memberSinceLabel].filter(Boolean)
    const secondaryLine = secondaryParts.length > 0 ? secondaryParts.join(' / ') : 'Grolin member'

    return (
        <section className="relative">
            <div className="shop-hero-surface relative h-[160px] overflow-hidden rounded-[28px] px-5 pt-5 text-white shadow-[var(--shop-shadow-strong)] sm:px-6">
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-xl" />
                <div className="absolute -left-8 top-16 h-28 w-28 rounded-full bg-white/10 blur-lg" />

                <div className="relative flex justify-end">
                    <Link
                        href="/profile/edit"
                        className="inline-flex items-center rounded-full border border-white/30 px-3 py-1.5 text-[12px] font-medium text-white/80 transition-colors hover:border-white/45 hover:bg-white/10 hover:text-white"
                    >
                        Edit Profile
                    </Link>
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end gap-4 sm:left-6 sm:right-6">
                    <div className="translate-y-6">{avatarNode}</div>
                    <div className="min-w-0 flex-1 pb-2">
                        <h1 className="truncate text-[26px] font-extrabold leading-tight text-white">{name ?? 'Guest User'}</h1>
                        <p className="mt-1 truncate text-[13px] font-medium text-white/70">{secondaryLine}</p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 -mt-4 grid grid-cols-3 gap-3 px-3 sm:px-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-[16px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-3 py-4 text-center shadow-[var(--shop-shadow-level-2)]"
                    >
                        {stat.value === undefined || stat.value === null ? (
                            <div className="mx-auto mb-2 h-5 w-10 rounded-full skeleton-shimmer" />
                        ) : (
                            <p className="truncate text-[18px] font-extrabold text-[color:var(--shop-ink)]">{stat.value}</p>
                        )}
                        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--shop-ink-faint)]">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

