'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ClipboardList, Home, LayoutGrid, Search, User } from 'lucide-react'
import { m } from 'framer-motion'
import { cn } from '@/lib/utils'

const TABS = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/categories', icon: LayoutGrid, label: 'Categories' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/orders', icon: ClipboardList, label: 'Orders' },
  { href: '/profile', icon: User, label: 'Account' },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const prefetchRoute = (href: string) => {
    if (href === '/orders' || href === '/profile') {
      router.prefetch(href)
    }
  }

  const isTabActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href === '/categories') return pathname.startsWith('/categories') || pathname.startsWith('/products')
    if (href === '/orders') return pathname.startsWith('/orders')
    if (href === '/profile') {
      return ['/profile', '/wallet', '/wishlist', '/notifications'].some((route) => pathname.startsWith(route))
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-[260] px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] lg:hidden"
    >
      <div className="mx-auto max-w-lg rounded-[28px] border border-black/5 bg-white/96 p-1.5 shadow-[0_18px_44px_rgba(15,23,42,0.16),0_2px_8px_rgba(15,23,42,0.06)] backdrop-blur-[22px]">
        <div className="grid min-h-[72px] grid-cols-5 gap-1">
        {TABS.map((tab) => {
          const isActive = isTabActive(tab.href)
          const Icon = tab.icon

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-[22px] px-1 py-2.5"
              onPointerEnter={() => prefetchRoute(tab.href)}
              onTouchStart={() => prefetchRoute(tab.href)}
            >
              {isActive && (
                <m.span
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 rounded-[22px] border border-[rgba(110,73,216,0.14)] bg-[linear-gradient(180deg,rgba(110,73,216,0.16)_0%,rgba(110,73,216,0.07)_100%)] shadow-[0_10px_24px_rgba(110,73,216,0.12)]"
                  aria-hidden="true"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.8 }}
                />
              )}
              <span
                className={cn(
                  'relative z-10 flex h-9 w-9 items-center justify-center rounded-[14px] transition-all duration-200',
                  isActive
                    ? 'bg-white text-[color:var(--shop-primary)] shadow-[0_8px_18px_rgba(110,73,216,0.12)]'
                    : 'text-[color:var(--shop-ink-faint)]',
                )}
              >
                <Icon
                  className={cn('transition-all duration-200', isActive ? 'h-[22px] w-[22px]' : 'h-[20px] w-[20px]')}
                  strokeWidth={isActive ? 2.2 : 1.9}
                />
              </span>
              <span
                className={cn(
                  'relative z-10 max-w-full truncate text-[11px] leading-none tracking-[-0.01em] transition-all duration-200',
                  isActive ? 'font-bold text-[color:var(--shop-primary)]' : 'font-semibold text-[color:var(--shop-ink-faint)]',
                )}
              >
                {tab.label}
              </span>
            </Link>
          )
        })}
        </div>
      </div>
    </nav>
  )
}
