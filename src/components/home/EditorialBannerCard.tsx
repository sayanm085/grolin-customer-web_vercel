import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface EditorialBannerCardProps {
  title: string
  eyebrow: string
  emoji: string
  gradient: string
  href: string
  image?: string
}

export function EditorialBannerCard({ title, eyebrow, href, image }: EditorialBannerCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[240px] w-[148px] shrink-0 snap-start overflow-hidden rounded-[22px] shadow-[var(--shop-shadow-level-2)] tile-hover sm:w-[152px] lg:w-[156px]"
      aria-label={`Explore ${title}`}
    >
      {/* Background image */}
      {image && (
        <Image
          src={image}
          alt=""
          fill
          unoptimized
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      )}

      {/* Cinematic gradient scrim — taller and smoother for premium text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-[#0A0A0A] via-[rgba(10,10,10,0.55)] to-transparent pointer-events-none" />

      {/* Content — clean, no noise overlays */}
      <div className="relative z-10 flex min-h-[240px] flex-1 flex-col justify-end p-4 text-white">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">{eyebrow}</p>
          <h3 className="mt-1 text-[17px] font-bold leading-tight">{title}</h3>
        </div>

        <div className="mt-3 inline-flex items-center justify-center gap-1 self-start rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm transition-all duration-200 group-hover:bg-white/25">
          <span>Explore</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  )
}
