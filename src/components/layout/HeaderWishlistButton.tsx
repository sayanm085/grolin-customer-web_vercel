'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlist.store'

export function HeaderWishlistButton() {
  const count = useWishlistStore((state) => state.count)
  const display = count > 9 ? '9+' : `${count}`

  return (
    <Link
      href="/wishlist"
      className="group/wish relative flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] text-[color:var(--shop-ink-muted)] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-250 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:border-[#EF446E]/25 hover:bg-[#EF446E]/8 hover:text-[#EF446E] hover:shadow-[0_4px_16px_rgba(239,68,110,0.12)] hover:scale-[1.05] active:scale-[0.96]"
      aria-label={`Wishlist (${display} items)`}
    >
      <Heart className="h-[18px] w-[18px] transition-transform duration-300 group-hover/wish:scale-110 group-hover/wish:animate-[heart-beat_600ms_ease-in-out]" strokeWidth={1.8} />
      <span className="absolute -right-1.5 -top-1.5 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#EF446E_0%,#F472B6_100%)] px-1 text-[10px] font-black leading-none text-white shadow-[0_2px_6px_rgba(239,68,110,0.30)]">
        {display}
      </span>
    </Link>
  )
}
