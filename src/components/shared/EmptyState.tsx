import type { LucideIcon } from 'lucide-react'
import { EmptyStateCard } from './EmptyStateCard'

interface EmptyStateProps {
    icon: LucideIcon
    title: string
    subtitle: string
    ctaLabel?: string
    ctaHref?: string
    ctaAction?: () => void
    secondaryCtaLabel?: string
    secondaryCtaHref?: string
    secondaryCtaAction?: () => void
    iconBg?: string
    iconColor?: string
}

export function EmptyState({
    icon,
    title,
    subtitle,
    ctaLabel,
    ctaHref,
    ctaAction,
    secondaryCtaLabel,
    secondaryCtaHref,
    secondaryCtaAction,
    iconBg,
    iconColor,
}: EmptyStateProps) {
    return (
        <EmptyStateCard
            icon={icon}
            title={title}
            subtitle={subtitle}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
            ctaAction={ctaAction}
            secondaryCtaLabel={secondaryCtaLabel}
            secondaryCtaHref={secondaryCtaHref}
            secondaryCtaAction={secondaryCtaAction}
            iconBg={iconBg}
            iconColor={iconColor}
        />
    )
}
