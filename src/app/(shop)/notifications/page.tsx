'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/lib/queryKeys'
import { notificationsService } from '@/services/notifications.service'
import { timeAgo, cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { EmptyStateCard, PageHeader, PageShell } from '@/components/shared'
import { Bell, CheckCheck, Package, CreditCard, Tag, Info } from 'lucide-react'
import { toast } from 'sonner'
import type { Notification, NotificationType } from '@/types/notification.types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const ICON_MAP: Record<NotificationType, typeof Package> = {
    ORDER_STATUS: Package,
    PAYMENT: CreditCard,
    PROMOTION: Tag,
    DELIVERY: Package,
    ADMIN_BROADCAST: Info,
    SYSTEM: Info,
}

export default function NotificationsPage() {
    const qc = useQueryClient()
    const router = useRouter()
    const [filter, setFilter] = useState<'all' | 'unread'>('all')

    useEffect(() => {
        document.title = 'Notifications - Grolin Grocery'
    }, [])

    const { data, isLoading } = useQuery({
        queryKey: QUERY_KEYS.notifications(),
        queryFn: () => notificationsService.getAll(),
    })

    const markAllRead = useMutation({
        mutationFn: notificationsService.markAllRead,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: QUERY_KEYS.notifications() })
            toast.success('All marked as read')
        },
    })

    const notifications = Array.isArray(data?.notifications) ? data.notifications : []
    const filteredNotifications =
        filter === 'unread'
            ? notifications.filter((notification) => !notification.is_read)
            : notifications
    const unreadCount = Number(data?.unreadCount ?? notifications.filter((n) => !n.is_read).length)

    const handleNotificationClick = async (notif: Notification) => {
        try {
            if (!notif.is_read) {
                await notificationsService.markAsRead(notif.id)
                qc.invalidateQueries({ queryKey: QUERY_KEYS.notifications() })
            }
        } catch {
            toast.error('Could not open notification')
            return
        }

        const payload = (notif.data ?? {}) as Record<string, unknown>
        const orderId = String(payload.orderId ?? payload.order_id ?? '')

        switch (notif.type) {
            case 'ORDER_STATUS':
            case 'DELIVERY':
                if (orderId) router.push(`/orders/${orderId}`)
                break
            case 'PAYMENT':
                router.push('/wallet')
                break
            case 'PROMOTION':
                router.push('/products?sort=popular')
                break
            default:
                break
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-3 px-6 py-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-xl" />
                ))}
            </div>
        )
    }

    return (
        <PageShell spacing="relaxed">
            <PageHeader
                eyebrow="Inbox"
                title="Notifications"
                subtitle="Track operational updates, delivery signals, payments, and promotions in one feed."
                actions={unreadCount > 0 ? (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAllRead.mutate()}
                        className="border-brand-200 text-brand-500"
                    >
                        <CheckCheck className="mr-1 h-4 w-4" /> Mark all read
                    </Button>
                ) : null}
            />

            <div className="shop-surface-soft flex gap-1 rounded-[22px] p-1.5">
                {(['all', 'unread'] as const).map((f) => (
                    <button
                        key={f}
                        type="button"
                        onClick={() => setFilter(f)}
                        className={cn(
                            'flex-1 rounded-lg py-2 text-sm font-medium transition-all',
                            filter === f
                                ? 'bg-white text-[color:var(--shop-ink)] shadow-sm'
                                : 'text-[color:var(--shop-ink-muted)] hover:text-[color:var(--shop-ink)]',
                        )}
                    >
                        {f === 'all' ? 'All' : 'Unread'}
                    </button>
                ))}
            </div>

            {filteredNotifications.length === 0 ? (
                <EmptyStateCard
                    icon={Bell}
                    title={filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                    subtitle={filter === 'unread' ? 'You are all caught up.' : "You're all caught up."}
                />
            ) : (
                <div className="space-y-2">
                    {filteredNotifications.map((notif) => {
                        const Icon = ICON_MAP[notif.type] ?? Info
                        return (
                            <button
                                key={notif.id}
                                type="button"
                                onClick={() => handleNotificationClick(notif)}
                                className={cn(
                                    'flex w-full items-start gap-3 rounded-[22px] p-4 text-left transition-all duration-200',
                                    notif.is_read
                                        ? 'bg-[color:var(--shop-surface-elevated)] shadow-[var(--shop-shadow-level-1)] hover:shadow-[var(--shop-shadow-level-2)]'
                                        : 'bg-[color:var(--shop-primary-soft)] shadow-[var(--shop-shadow-level-2)] hover:shadow-[var(--shop-shadow-level-3)]',
                                )}
                            >
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--shop-primary-soft)]">
                                    <Icon className="h-4 w-4 text-[color:var(--shop-primary)]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className={cn('text-sm text-[color:var(--shop-ink)]', !notif.is_read && 'font-semibold')}>
                                        {notif.title}
                                    </p>
                                    <p className="mt-0.5 line-clamp-2 text-xs text-[color:var(--shop-ink-muted)]">{notif.body}</p>
                                    <p className="mt-1 text-[11px] text-[color:var(--shop-ink-faint)]">{timeAgo(notif.created_at)}</p>
                                </div>
                                {!notif.is_read && <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[color:var(--shop-primary)]" />}
                            </button>
                        )
                    })}
                </div>
            )}
        </PageShell>
    )
}
