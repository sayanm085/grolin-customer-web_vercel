'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ShoppingBasket } from 'lucide-react'
import { useCartStore } from '@/store/cart.store'
import { cn } from '@/lib/utils'

export function HeaderCartButton() {
  const count = useCartStore((state) => state.count)
  const prevCount = useRef(count)
  const badgeRef = useRef<HTMLSpanElement | null>(null)
  const [pop, setPop] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined

    if (count > prevCount.current) {
      setPop(true)
      timeout = setTimeout(() => setPop(false), 320)
    }

    prevCount.current = count

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [count])

  useEffect(() => {
    const handler = () => {
      const badge = badgeRef.current
      if (!badge) return
      badge.classList.remove('bouncing')
      void badge.offsetWidth
      badge.classList.add('bouncing')
      window.setTimeout(() => badge.classList.remove('bouncing'), 420)
    }

    window.addEventListener('grolin:cart-item-added', handler)
    return () => window.removeEventListener('grolin:cart-item-added', handler)
  }, [])

  const display = count > 9 ? '9+' : `${count}`

  return (
    <Link
      href="/cart"
      data-cart-icon
      className="group/cart relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] text-[color:var(--shop-ink)] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-250 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:border-[#16945E]/30 hover:bg-[#16945E]/8 hover:text-[#16945E] hover:shadow-[0_4px_16px_rgba(22,148,94,0.12)] hover:scale-[1.05] active:scale-[0.96]"
      aria-label={`Open cart with ${display} items`}
    >
      <ShoppingBasket className={cn('h-[18px] w-[18px] transition-transform duration-200', pop && 'cart-bounce-soft')} strokeWidth={1.8} />
      <span
        ref={badgeRef}
        data-cart-badge
        className={cn(
          'absolute -right-1.5 -top-1.5 flex h-[20px] min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-black leading-none text-white shadow-[0_2px_6px_rgba(22,148,94,0.35)]',
          'bg-[linear-gradient(135deg,#16945E_0%,#1AAF6E_100%)]',
          pop && 'cart-pop',
        )}
      >
        {display}
      </span>
    </Link>
  )
}
