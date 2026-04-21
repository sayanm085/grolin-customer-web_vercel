'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Apple, Baby, Coffee, Cookie, Grid2x2, House, Milk, Package, Snowflake, Sparkles, Sprout } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { HomepageCategoryNavItem } from '@/lib/shopfront/shopfront-home.utils'
import type { CategoryIconKey } from '@/lib/shopfront/shopfront-content'

type HeaderCategoryNavProps = {
  categories: HomepageCategoryNavItem[]
  mode?: 'navigate' | 'select'
  activeCategoryId?: string
  onCategorySelect?: (categoryId: string) => void
}

function CategoryIcon({ iconKey }: { iconKey: CategoryIconKey | 'default' }) {
  const className = 'h-5 w-5 stroke-[1.9]'

  switch (iconKey) {
    case 'vegetables':
      return <Sprout className={className} />
    case 'fruits':
      return <Apple className={className} />
    case 'dairy':
      return <Milk className={className} />
    case 'bakery':
    case 'breakfast':
      return <Cookie className={className} />
    case 'beverages':
      return <Coffee className={className} />
    case 'snacks':
      return <Cookie className={className} />
    case 'frozen':
      return <Snowflake className={className} />
    case 'household':
      return <House className={className} />
    case 'baby':
      return <Baby className={className} />
    case 'care':
      return <Sparkles className={className} />
    case 'meat':
    case 'pantry':
      return <Package className={className} />
    default:
      return <Grid2x2 className={className} />
  }
}

export function HeaderCategoryNav({
  categories,
  mode = 'navigate',
  activeCategoryId = 'all',
  onCategorySelect,
}: HeaderCategoryNavProps) {
  const pathname = usePathname()
  const items = [
    { id: 'all', navLabel: 'All', iconKey: 'default' as const, href: '/' },
    ...categories.map((category) => ({
      id: category.id,
      navLabel: category.navLabel,
      iconKey: category.iconKey,
      href: `/categories/${category.id}`,
    })),
  ]

  return (
    <div className="border-b border-[color:var(--shop-border)] px-3 sm:px-4 lg:px-5">
      <div className="overflow-x-auto scrollbar-hide" aria-label="Homepage category tabs">
        <div className="flex min-w-max items-center gap-4 lg:gap-5">
          {items.map((item) => {
            const isActive =
              mode === 'select'
                ? activeCategoryId === item.id
                : item.id === 'all'
                  ? pathname === '/'
                  : pathname === item.href

            const sharedClassName = cn(
              'relative flex h-11 items-center gap-2 whitespace-nowrap border-b-2 px-0 text-[15px] font-semibold transition-colors duration-200',
              isActive
                ? 'border-[color:var(--shop-primary)] text-[color:var(--shop-primary)]'
                : 'border-transparent text-[color:var(--shop-ink-muted)] hover:text-[color:var(--shop-ink)]',
            )

            if (mode === 'select') {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onCategorySelect?.(item.id)}
                  className={sharedClassName}
                  aria-pressed={isActive}
                >
                  <CategoryIcon iconKey={item.iconKey} />
                  <span className="max-w-[8.75rem] truncate">{item.navLabel}</span>
                </button>
              )
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className={sharedClassName}
                aria-current={isActive ? 'page' : undefined}
              >
                <CategoryIcon iconKey={item.iconKey} />
                <span className="max-w-[8.75rem] truncate">{item.navLabel}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function HeaderCategoryNavSkeleton() {
  return (
    <div className="border-b border-[color:var(--shop-border)] px-3 sm:px-4 lg:px-5">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max items-center gap-5 py-2.5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-6 w-20 rounded-full skeleton-shimmer" />
          ))}
        </div>
      </div>
    </div>
  )
}
