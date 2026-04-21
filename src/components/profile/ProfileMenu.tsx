'use client'

import { useRouter } from 'next/navigation'
import {
    Bell,
    ChevronRight,
    Heart,
    HelpCircle,
    LogOut,
    MapPin,
    Settings,
    Shield,
    ShoppingBag,
    Star,
    Trash2,
    Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type MenuTone = 'shopping' | 'preferences' | 'account' | 'danger'

interface MenuItem {
    icon: LucideIcon
    label: string
    href?: string
    onClick?: () => void | Promise<void>
}

interface MenuSection {
    title: string
    tone: MenuTone
    items: ReadonlyArray<MenuItem>
}

interface ProfileMenuProps {
    onLogout: () => void | Promise<void>
    onDeleteAccount: () => void
}

const TONE_STYLES: Record<MenuTone, { icon: string; surface: string; chevron: string }> = {
    shopping: {
        icon: 'text-shop-action',
        surface: 'bg-shop-action-soft',
        chevron: 'text-shop-action',
    },
    preferences: {
        icon: 'text-shop-trust',
        surface: 'bg-shop-trust-soft',
        chevron: 'text-shop-trust',
    },
    account: {
        icon: 'text-shop-primary',
        surface: 'bg-shop-primary-soft',
        chevron: 'text-shop-primary',
    },
    danger: {
        icon: 'text-shop-danger',
        surface: 'bg-red-50',
        chevron: 'text-shop-danger',
    },
}

const MENU_SECTIONS: ReadonlyArray<MenuSection> = [
    {
        title: 'Shopping',
        tone: 'shopping',
        items: [
            { icon: ShoppingBag, label: 'My Orders', href: '/orders' },
            { icon: Heart, label: 'Wishlist', href: '/wishlist' },
            { icon: Wallet, label: 'Wallet', href: '/wallet' },
        ],
    },
    {
        title: 'Preferences',
        tone: 'preferences',
        items: [
            { icon: MapPin, label: 'Addresses', href: '/profile/addresses' },
            { icon: Bell, label: 'Notifications', href: '/notifications' },
            { icon: Star, label: 'My Reviews', href: '/profile/reviews' },
        ],
    },
    {
        title: 'Account',
        tone: 'account',
        items: [
            { icon: Settings, label: 'Account Settings', href: '/profile/edit' },
            { icon: Shield, label: 'Privacy & Security', href: '#' },
            { icon: HelpCircle, label: 'Help & Support', href: '#' },
        ],
    },
]

export function ProfileMenu({ onLogout, onDeleteAccount }: ProfileMenuProps) {
    const router = useRouter()

    const renderMenuItem = (item: MenuItem, tone: MenuTone) => {
        const toneStyles = TONE_STYLES[tone]
        const isInteractive = Boolean(item.onClick || (item.href && item.href !== '#'))
        const hoverClass = tone === 'danger' ? 'hover:bg-red-50' : 'hover:bg-[color:var(--shop-surface-subtle)]'

        const content = (
            <div
                className={cn(
                    'flex items-center gap-3 rounded-[18px] px-4 py-3.5 transition-colors duration-200',
                    isInteractive ? hoverClass : 'cursor-default',
                )}
            >
                <span
                    className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                        toneStyles.surface,
                        toneStyles.icon,
                    )}
                >
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className={cn('flex-1 text-sm font-medium', tone === 'danger' ? 'text-shop-danger' : 'text-[color:var(--shop-ink)]')}>
                    {item.label}
                </span>
                <ChevronRight className={cn('h-4 w-4 opacity-60', toneStyles.chevron)} />
            </div>
        )

        if (item.href && item.href !== '#') {
            return (
                <button
                    key={`${tone}-${item.label}`}
                    onClick={() => {
                        void item.onClick?.()
                        router.push(item.href!)
                    }}
                    className="w-full text-left"
                    type="button"
                >
                    {content}
                </button>
            )
        }

        if (item.onClick) {
            return (
                <button
                    key={`${tone}-${item.label}`}
                    onClick={() => {
                        void item.onClick?.()
                    }}
                    className="w-full text-left"
                    type="button"
                >
                    {content}
                </button>
            )
        }

        return (
            <div key={`${tone}-${item.label}`} aria-disabled="true">
                {content}
            </div>
        )
    }

    return (
        <div className="space-y-5">
            {MENU_SECTIONS.map((section) => (
                <section key={section.title}>
                    <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--shop-ink-faint)]">
                        {section.title}
                    </p>
                    <div className="rounded-[22px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] p-1.5 shadow-[var(--shop-shadow-level-1)]">
                        {section.items.map((item) => renderMenuItem(item, section.tone))}
                    </div>
                </section>
            ))}

            <section>
                <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--shop-ink-faint)]">
                    Danger Zone
                </p>
                <div className="rounded-[22px] border border-red-100 bg-[color:var(--shop-surface)] p-1.5 shadow-[var(--shop-shadow-level-1)]">
                    {renderMenuItem({ icon: LogOut, label: 'Log Out', onClick: onLogout }, 'danger')}
                    {renderMenuItem({ icon: Trash2, label: 'Delete Account', onClick: onDeleteAccount }, 'danger')}
                </div>
            </section>
        </div>
    )
}
