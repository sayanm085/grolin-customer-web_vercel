'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { Clock3, Headphones, Heart, Star, Wallet } from 'lucide-react'

const STORAGE_KEY = 'grolin_welcome_shown'
const OPEN_DELAY_MS = 30_000
const SWIPE_CLOSE_THRESHOLD = 120

const FEATURES = [
  {
    title: '?50 Welcome Credits',
    subtitle: 'Just added to your wallet',
    icon: Wallet,
    iconClassName: 'bg-[color:var(--shop-action-soft)] text-[color:var(--shop-action)]',
  },
  {
    title: '30-Min Delivery',
    subtitle: 'Every order, guaranteed',
    icon: Clock3,
    iconClassName: 'bg-[rgba(29,111,184,0.12)] text-[#1D6FB8]',
  },
  {
    title: 'Wishlist & Reorders',
    subtitle: 'Tap once, order again',
    icon: Heart,
    iconClassName: 'bg-[color:var(--shop-primary-soft)] text-[color:var(--shop-primary)]',
  },
  {
    title: 'Earn Grolin Rewards',
    subtitle: 'Points on every order',
    icon: Star,
    iconClassName: 'bg-[rgba(227,185,60,0.18)] text-[#B88912]',
  },
  {
    title: '24/7 Customer Support',
    subtitle: "We're always here",
    icon: Headphones,
    iconClassName: 'bg-[color:var(--shop-success-soft)] text-[color:var(--shop-action)]',
  },
] as const

export function WelcomeSheet({ isFirstOrder }: { isFirstOrder: boolean }) {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !isFirstOrder) return
    if (typeof window === 'undefined') return
    if (window.localStorage.getItem(STORAGE_KEY)) return

    const timer = window.setTimeout(() => {
      setOpen(true)
      window.localStorage.setItem(STORAGE_KEY, 'true')
    }, OPEN_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [isFirstOrder, mounted])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { duration: 0.35, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
    [reduceMotion],
  )

  const closeAndGoHome = () => {
    setOpen(false)
    router.push('/')
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
          <m.button
            type="button"
            aria-label="Dismiss welcome sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="fixed inset-0 z-[340] bg-black/35 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <m.div
            drag="y"
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.18 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > SWIPE_CLOSE_THRESHOLD || info.velocity.y > 500) {
                setOpen(false)
              }
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={transition}
            className="fixed inset-x-0 bottom-0 z-[350] mx-auto w-full max-w-[520px] rounded-t-[32px] border border-b-0 border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-6 pb-6 pt-4 shadow-[0_-24px_60px_rgba(24,39,75,0.18)]"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[color:var(--shop-border)]" />

            <div className="text-center">
              <div className="text-[48px] leading-none">??</div>
              <h2 className="mt-3 text-[20px] font-bold tracking-[-0.03em] text-[color:var(--shop-ink)]">
                Welcome to the Grolin family!
              </h2>
              <p className="mt-1 text-[14px] text-[color:var(--shop-ink-muted)]">
                Here&apos;s everything you&apos;ve unlocked
              </p>
            </div>

            <div className="mt-6 max-h-[48vh] overflow-y-auto pr-1">
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className={index === FEATURES.length - 1 ? 'flex items-center gap-3 py-3' : 'flex items-center gap-3 border-b border-[color:var(--shop-border)] py-3'}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${feature.iconClassName}`}>
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="text-[14px] font-semibold text-[color:var(--shop-ink)]">{feature.title}</div>
                      <div className="mt-0.5 text-[12px] text-[color:var(--shop-ink-muted)]">{feature.subtitle}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              onClick={closeAndGoHome}
              className="mt-5 inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[color:var(--shop-action)] px-5 text-[15px] font-bold text-white shadow-[var(--shop-shadow-level-2)] transition-colors hover:bg-[color:var(--shop-action-hover)]"
            >
              Start Exploring Grolin ?
            </button>
          </m.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
