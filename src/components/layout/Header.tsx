'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  Heart, Loader2, LogOut, MapPin, Package,
  UserRound, Wallet, Leaf, ChevronDown,
  ShoppingBag, Tag, Shield, HelpCircle, Home,
} from 'lucide-react'
import { HeaderCartButton } from './HeaderCartButton'
import { HeaderWishlistButton } from './HeaderWishlistButton'
import { SearchBar } from './SearchBar'
import { SHOPFRONT_HEADER_LINKS, SHOPFRONT_VALUE_BAR } from '@/lib/shopfront/shopfront-content'
import { useAuthStore } from '@/store/auth.store'
import { useAddressStore } from '@/store/address.store'
import { QUERY_KEYS, STALE_TIMES } from '@/lib/constants'
import { addressesService } from '@/services/addresses.service'
import { authService } from '@/services/auth.service'
import { cn } from '@/lib/utils'

/* ═══════════════  HELPERS  ══════════════════════════════════════ */

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Good morning'
  if (hour >= 12 && hour < 17) return 'Good afternoon'
  if (hour >= 17 && hour < 21) return 'Good evening'
  return 'Good night'
}

function getFirstName(name: string | null | undefined) {
  if (!name) return 'there'
  return name.trim().split(/\s+/)[0] || 'there'
}

function getInitials(name: string | null | undefined) {
  if (!name) return 'G'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('') || 'G'
}

/** Maps nav labels to contextual icons */
function getNavIcon(label: string) {
  const lower = label.toLowerCase()
  if (lower.includes('home')) return Home
  if (lower.includes('categor')) return ShoppingBag
  if (lower.includes('deal') || lower.includes('offer')) return Tag
  if (lower.includes('promise') || lower.includes('quality')) return Shield
  if (lower.includes('help') || lower.includes('contact')) return HelpCircle
  return ShoppingBag
}

/* ═══════════════  AVATAR  ═══════════════════════════════════════ */

function UserAvatar({
  name,
  avatarUrl,
  size = 'md',
}: {
  name: string | null | undefined
  avatarUrl: string | null | undefined
  size?: 'sm' | 'md'
}) {
  const dimension = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const textSize = size === 'sm' ? 'text-[13px]' : 'text-[14px]'

  if (avatarUrl) {
    return (
      <span className={cn('relative overflow-hidden rounded-full ring-2 ring-[color:var(--shop-primary)]/20', dimension)}>
        <Image
          src={avatarUrl}
          alt={name ? `${name} avatar` : 'Profile avatar'}
          fill
          className="object-cover"
          sizes={size === 'sm' ? '32px' : '40px'}
          unoptimized={avatarUrl.startsWith('http')}
        />
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#6E49D8_0%,#4F46E5_100%)] font-bold text-white shadow-[0_2px_8px_rgba(110,73,216,0.3)]',
        dimension,
        textSize,
      )}
    >
      {getInitials(name)}
    </span>
  )
}

function DesktopAuthPlaceholder() {
  return (
    <span className="inline-flex h-11 w-[184px] items-center gap-2 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] pl-1.5 pr-3 shadow-[var(--shop-shadow-level-1)]">
      <span className="h-9 w-9 rounded-full bg-[linear-gradient(135deg,rgba(110,73,216,0.16),rgba(79,70,229,0.08))] skeleton-shimmer" />
      <span className="h-3.5 flex-1 rounded-full bg-[rgba(110,73,216,0.12)] skeleton-shimmer" />
    </span>
  )
}

/* ═══════════════  MAIN HEADER  ══════════════════════════════════ */

export function Header() {
  const FLYOUT_AUTO_CLOSE_MS = 10_000
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const logout = useAuthStore((state) => state.logout)
  const activeAddressId = useAddressStore((state) => state.activeAddressId)
  const activeAddress = useAddressStore((state) => state.activeAddress)
  const setActiveAddress = useAddressStore((state) => state.setActiveAddress)
  const clearAddress = useAddressStore((state) => state.clearAddress)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const moreMenuRef = useRef<HTMLDivElement>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const moreCloseTimeoutRef = useRef<number | null>(null)
  const profileCloseTimeoutRef = useRef<number | null>(null)

  const authReady = hydrated
  const resolvedLoggedIn = authReady && isLoggedIn
  const resolvedUser = authReady ? user : null

  const { data: addresses = [] } = useQuery({
    queryKey: QUERY_KEYS.addresses,
    queryFn: () => addressesService.getAll(),
    staleTime: STALE_TIMES.addresses,
    enabled: resolvedLoggedIn,
  })

  const addressTitle = activeAddress ? `${activeAddress.city}, ${activeAddress.state}` : 'Set delivery address'
  const addressLine = activeAddress ? activeAddress.address_line1 : 'Choose your default location'
  const greetingLabel = useMemo(() => `${getGreeting()}, ${getFirstName(resolvedUser?.name)} 👋`, [resolvedUser?.name])

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!resolvedLoggedIn) {
      clearAddress()
      return
    }

    if (addresses.length === 0) return

    const preferred =
      addresses.find((address) => address.id === activeAddressId) ??
      addresses.find((address) => address.is_default) ??
      addresses[0]

    if (!preferred) return

    if (activeAddress?.id !== preferred.id) {
      setActiveAddress(preferred)
    }
  }, [activeAddress?.id, activeAddressId, addresses, clearAddress, resolvedLoggedIn, setActiveAddress])

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (moreOpen && moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setMoreOpen(false)
      }
      if (mobileOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileOpen(false)
      }
      if (profileOpen && profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [mobileOpen, moreOpen, profileOpen])

  useEffect(() => {
    if (!moreOpen) {
      if (moreCloseTimeoutRef.current !== null) {
        window.clearTimeout(moreCloseTimeoutRef.current)
        moreCloseTimeoutRef.current = null
      }
      return
    }

    moreCloseTimeoutRef.current = window.setTimeout(() => {
      setMoreOpen(false)
    }, FLYOUT_AUTO_CLOSE_MS)

    return () => {
      if (moreCloseTimeoutRef.current !== null) {
        window.clearTimeout(moreCloseTimeoutRef.current)
        moreCloseTimeoutRef.current = null
      }
    }
  }, [FLYOUT_AUTO_CLOSE_MS, moreOpen])

  useEffect(() => {
    if (!profileOpen) {
      if (profileCloseTimeoutRef.current !== null) {
        window.clearTimeout(profileCloseTimeoutRef.current)
        profileCloseTimeoutRef.current = null
      }
      return
    }

    profileCloseTimeoutRef.current = window.setTimeout(() => {
      setProfileOpen(false)
    }, FLYOUT_AUTO_CLOSE_MS)

    return () => {
      if (profileCloseTimeoutRef.current !== null) {
        window.clearTimeout(profileCloseTimeoutRef.current)
        profileCloseTimeoutRef.current = null
      }
    }
  }, [FLYOUT_AUTO_CLOSE_MS, profileOpen])

  const handleLogout = async () => {
    try {
      setSigningOut(true)
      await authService.logout().catch(() => undefined)
      logout()
      setProfileOpen(false)
      router.push('/login')
    } finally {
      setSigningOut(false)
    }
  }

  /* ── Shared style tokens ── */
  const iconButtonClass =
    'group/icon relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] text-[color:var(--shop-ink-muted)] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-250 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:border-[color:var(--shop-primary)]/30 hover:bg-[color:var(--shop-primary-soft)] hover:text-[color:var(--shop-primary)] hover:shadow-[0_4px_16px_rgba(110,73,216,0.12)] hover:scale-[1.05] active:scale-[0.96]'

  const flyoutPanelClass =
    'absolute right-0 top-full z-[240] mt-3 w-[260px] rounded-[20px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,249,251,0.82))] p-2.5 shadow-[0_18px_44px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.66)] backdrop-blur-[22px] animate-[header-dropdown-in_250ms_cubic-bezier(0.34,1.56,0.64,1)]'

  const desktopMenuItemClass =
    'flex items-center gap-3 rounded-[14px] px-3.5 py-3 text-[13px] font-semibold tracking-tight text-[color:var(--shop-ink)] transition-all duration-200 hover:bg-black/[0.04] hover:text-[color:var(--shop-ink)] hover:translate-x-0.5'

  const mobileMenuItemClass =
    'flex items-center gap-3 rounded-[14px] px-4 py-3.5 text-[14px] font-semibold tracking-tight text-[color:var(--shop-ink)] transition-all duration-200 hover:bg-[color:var(--shop-primary-soft)] hover:text-[color:var(--shop-primary)] active:scale-[0.98]'

  const profileItemClass =
    'flex h-11 items-center gap-3 rounded-[14px] px-3.5 text-[13px] font-semibold tracking-tight text-[color:var(--shop-ink)] transition-all duration-200 hover:bg-black/[0.04] hover:text-[color:var(--shop-ink)] hover:translate-x-0.5'

  return (
    <header
      className={cn(
        'border-b border-[color:var(--shop-border)]/60 bg-[color:var(--shop-header-surface)] transition-[box-shadow] duration-300 ease-out',
        scrolled
          ? 'shadow-[0_4px_24px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.03)]'
          : 'shadow-none',
      )}
    >
      {/* ═══ Main row ═══ */}
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3.5 sm:px-6 lg:gap-5 lg:px-8 lg:py-4">

        {/* Brand */}
        <Link
          href="/"
          className="group/brand shrink-0 flex items-center gap-1.5"
          aria-label="Go to homepage"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[color:var(--shop-primary)] text-white shadow-[0_2px_8px_rgba(110,73,216,0.3)] transition-transform duration-200 group-hover/brand:scale-105">
            <Leaf className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
          <span className="text-[22px] font-black leading-none tracking-[-0.06em] text-[color:var(--shop-primary)]">
            Grolin
          </span>
        </Link>

        {/* Address pill */}
        <Link
          href="/profile/addresses"
          className="hidden h-11 min-w-[230px] max-w-[312px] items-center gap-2.5 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-3.5 py-1.5 text-left shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-200 hover:border-[color:var(--shop-primary)]/25 hover:bg-[color:var(--shop-primary-soft)] hover:shadow-[0_4px_16px_rgba(110,73,216,0.08)] lg:flex"
          aria-label="Manage delivery address"
        >
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
            <MapPin className="h-[15px] w-[15px]" strokeWidth={2} />
            {/* Live delivery indicator */}
            <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
            </span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-bold leading-tight tracking-tight text-[color:var(--shop-ink)]">
              {addressTitle}
            </span>
            <span className="mt-0.5 block truncate text-[11px] font-medium leading-tight text-[color:var(--shop-ink-faint)]">
              {addressLine}
            </span>
          </span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[color:var(--shop-ink-faint)]" />
        </Link>

        {/* Search — desktop */}
        <div className="hidden min-w-0 flex-1 lg:block">
          <SearchBar />
        </div>

        {/* ═══ Action buttons ═══ */}
        <div className="ml-auto flex shrink-0 items-center gap-3">

          {/* Profile — desktop */}
          <div
            className="relative hidden lg:block"
            ref={profileMenuRef}
          >
            {!authReady ? (
              <DesktopAuthPlaceholder />
            ) : resolvedLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  setMoreOpen(false)
                  setProfileOpen((value) => !value)
                }}
                className="inline-flex h-11 items-center gap-2.5 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] pl-1.5 pr-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-250 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:border-[color:var(--shop-primary)]/25 hover:bg-[color:var(--shop-primary-soft)] hover:shadow-[0_4px_16px_rgba(110,73,216,0.10)]"
                aria-label={greetingLabel}
                aria-expanded={profileOpen}
              >
                <UserAvatar name={resolvedUser?.name} avatarUrl={resolvedUser?.avatar_url} size="sm" />
                <span className="max-w-[160px] truncate whitespace-nowrap text-[13px] font-bold tracking-tight text-[color:var(--shop-ink)]">
                  {greetingLabel}
                </span>
              </button>
            ) : (
              <Link href="/login" className={cn(iconButtonClass, 'hidden lg:inline-flex')} aria-label="Login">
                <UserRound className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </Link>
            )}

            {resolvedLoggedIn && profileOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-[240] min-w-[220px] rounded-[20px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,249,251,0.82))] p-2.5 shadow-[0_18px_44px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.66)] backdrop-blur-[22px] animate-[header-dropdown-in_250ms_cubic-bezier(0.34,1.56,0.64,1)]">
                <div className="grid gap-0.5">
                  <Link href="/profile" onClick={() => setProfileOpen(false)} className={profileItemClass}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[color:var(--shop-success-soft)] text-[color:var(--shop-action)]">
                      <UserRound className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <span>My Profile</span>
                  </Link>
                  <Link href="/orders" onClick={() => setProfileOpen(false)} className={profileItemClass}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[color:var(--shop-success-soft)] text-[color:var(--shop-action)]">
                      <Package className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <span>My Orders</span>
                  </Link>
                  <Link href="/wallet" onClick={() => setProfileOpen(false)} className={profileItemClass}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
                      <Wallet className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <span>My Wallet</span>
                  </Link>
                  <Link href="/wishlist" onClick={() => setProfileOpen(false)} className={profileItemClass}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[rgba(239,68,110,0.10)] text-[#EF446E]">
                      <Heart className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <span>Wishlist</span>
                  </Link>
                  <div className="my-1.5 h-px bg-black/8" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={signingOut}
                    className="flex h-11 items-center gap-3 rounded-[14px] px-3.5 text-[13px] font-semibold text-red-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
                  >
                    {signingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist — desktop */}
          <div className="hidden lg:block">
            <HeaderWishlistButton />
          </div>

          {/* Profile — mobile */}
          <div className="lg:hidden">
            {!authReady ? (
              <span className="inline-flex h-8 w-8 rounded-full bg-[rgba(110,73,216,0.12)] skeleton-shimmer" />
            ) : resolvedLoggedIn ? (
              <Link href="/profile" className="inline-flex h-8 w-8 items-center justify-center" aria-label="Profile">
                <UserAvatar name={resolvedUser?.name} avatarUrl={resolvedUser?.avatar_url} size="sm" />
              </Link>
            ) : (
              <Link href="/login" className={iconButtonClass} aria-label="Login">
                <UserRound className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </Link>
            )}
          </div>

          {/* Cart */}
          <HeaderCartButton />

          {/* More — desktop hamburger */}
          <div className="relative hidden lg:block" ref={moreMenuRef}>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                setProfileOpen(false)
                setMoreOpen((value) => !value)
              }}
              className={cn(iconButtonClass, moreOpen && 'border-[color:var(--shop-primary)]/30 bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]')}
              aria-label={moreOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative h-5 w-5">
                <span className={cn(
                  'absolute left-[3px] top-[5px] h-[2px] w-[14px] rounded-full bg-current transition-all duration-300',
                  moreOpen && 'top-[9px] rotate-45'
                )} />
                <span className={cn(
                  'absolute left-[3px] top-[9px] h-[2px] w-[14px] rounded-full bg-current transition-all duration-300',
                  moreOpen && 'opacity-0 scale-x-0'
                )} />
                <span className={cn(
                  'absolute left-[3px] top-[13px] h-[2px] w-[14px] rounded-full bg-current transition-all duration-300',
                  moreOpen && 'top-[9px] -rotate-45'
                )} />
              </div>
            </button>

            {moreOpen && (
              <div className={flyoutPanelClass}>
                <div className="grid gap-0.5">
                  {SHOPFRONT_HEADER_LINKS.map((link) => {
                    const IconComponent = getNavIcon(link.label)
                    return (
                      <Link key={link.href} href={link.href} onClick={() => setMoreOpen(false)} className={desktopMenuItemClass}>
                        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
                          <IconComponent className="h-3.5 w-3.5" strokeWidth={1.9} />
                        </span>
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => {
              setMoreOpen(false)
              setProfileOpen(false)
              setMobileOpen((value) => !value)
            }}
            className={cn(iconButtonClass, 'lg:hidden', mobileOpen && 'border-[color:var(--shop-primary)]/30 bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]')}
            aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
          >
            <div className="relative h-5 w-5">
              <span className={cn(
                'absolute left-[3px] top-[5px] h-[2px] w-[14px] rounded-full bg-current transition-all duration-300',
                mobileOpen && 'top-[9px] rotate-45'
              )} />
              <span className={cn(
                'absolute left-[3px] top-[9px] h-[2px] w-[14px] rounded-full bg-current transition-all duration-300',
                mobileOpen && 'opacity-0 scale-x-0'
              )} />
              <span className={cn(
                'absolute left-[3px] top-[13px] h-[2px] w-[14px] rounded-full bg-current transition-all duration-300',
                mobileOpen && 'top-[9px] -rotate-45'
              )} />
            </div>
          </button>
        </div>
      </div>

      {/* ═══ Mobile search row ═══ */}
      <div className="border-t border-[color:var(--shop-border)]/60 px-4 py-3 lg:hidden">
        <SearchBar />
      </div>

      {/* ═══ Desktop value bar ═══ */}
      <div className="hidden border-t border-[color:var(--shop-border)]/40 px-4 py-1.5 text-[12px] font-semibold tracking-[0.01em] text-[color:var(--shop-ink-muted)] sm:px-6 lg:block lg:px-8">
        <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center">
          <div></div>
          <div className="text-center truncate px-2">{SHOPFRONT_VALUE_BAR.message}</div>
          <div className="flex items-center justify-end gap-4">
            <span className="shrink-0">{SHOPFRONT_VALUE_BAR.locale}</span>
            <Link href={SHOPFRONT_VALUE_BAR.helpHref} className="header-nav-link shrink-0 pb-1 font-bold tracking-tight text-[color:var(--shop-primary)] transition-colors hover:text-[color:var(--shop-primary-strong)]">
              {SHOPFRONT_VALUE_BAR.helpLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ Mobile menu ═══ */}
      {mobileOpen && (
        <div
          className="relative z-[320] max-h-[calc(100vh-7rem)] overflow-y-auto border-t border-[color:var(--shop-border)]/60 bg-[color:var(--shop-surface)]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+6.5rem)] pt-4 shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-[24px] lg:hidden animate-[header-dropdown-in_250ms_cubic-bezier(0.34,1.56,0.64,1)]"
          ref={mobileMenuRef}
        >
          <div className="grid gap-1">
            {SHOPFRONT_HEADER_LINKS.map((link) => {
              const IconComponent = getNavIcon(link.label)
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={mobileMenuItemClass}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
                    <IconComponent className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  {link.label}
                </Link>
              )
            })}
            <Link href="/orders" onClick={() => setMobileOpen(false)} className={mobileMenuItemClass}>
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[color:var(--shop-success-soft)] text-[color:var(--shop-action)]">
                <Package className="h-4 w-4" strokeWidth={1.8} />
              </span>
              Orders
            </Link>
            <Link href="/wallet" onClick={() => setMobileOpen(false)} className={mobileMenuItemClass}>
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]">
                <Wallet className="h-4 w-4" strokeWidth={1.8} />
              </span>
              Wallet
            </Link>
            {!resolvedLoggedIn && (
              <Link href="/login" onClick={() => setMobileOpen(false)} className={cn(mobileMenuItemClass, 'mt-2 justify-center bg-[color:var(--shop-primary)] text-white hover:bg-[color:var(--shop-primary-strong)] hover:text-white')}>
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
