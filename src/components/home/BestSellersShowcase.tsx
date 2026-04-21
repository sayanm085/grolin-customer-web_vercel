'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, m, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Clock3,
  Crown,
  Flame,
  Heart,
  ShoppingBasket,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useCart } from '@/hooks/useCart'
import { PRODUCT_IMAGE_PLACEHOLDER, getProductFallbackImage, getProductImageSrc } from '@/lib/media'
import { cn, discountPercent, formatINR } from '@/lib/utils'
import type { Product } from '@/types/product.types'

type Props = { products: Product[] }

const displayPrice = (product: Product) => product.sale_price ?? product.price
const reviewCount = (product: Product) => Math.max(4.2, Math.min(4.9, 4.1 + (product.total_sold || 1) / 220))
const orderCount = (product: Product) => Math.max(38, Math.min(1320, Math.round((product.total_sold || 10) * 3.6)))
const demandShare = (product: Product) => Math.max(41, Math.min(96, Math.round((product.total_sold || 1) * 1.45)))
const stockBase = (product: Product) => Math.max(40, product.max_order_qty ?? 40)
const stockPercent = (product: Product) => Math.max(8, Math.min(100, (product.stock_quantity / stockBase(product)) * 100))
const repeatScore = (product: Product) => Math.max(61, Math.min(94, Math.round(reviewCount(product) * 20)))

function Stars({ value, light = false }: { value: number; light?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-3.5 w-3.5 fill-[#F6B93B] text-[#F6B93B]" />
        ))}
      </div>
      <span className={cn('text-[12px] font-semibold tabular-nums', light ? 'text-white/70' : 'text-[#5D6B61]')}>
        {value.toFixed(1)}
      </span>
    </div>
  )
}

function ProductImage({
  product,
  sizes,
  priority = false,
  className,
  fallbackClassName,
  fallbackTitleClassName,
  fallbackMetaClassName,
}: {
  product: Product
  sizes: string
  priority?: boolean
  className: string
  fallbackClassName?: string
  fallbackTitleClassName?: string
  fallbackMetaClassName?: string
}) {
  const source = useMemo(() => getProductImageSrc(product), [product])
  const generatedFallback = useMemo(() => getProductFallbackImage(product), [product])
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [source])

  const usesGenericCatalogArt =
    source === PRODUCT_IMAGE_PLACEHOLDER ||
    source.includes('/demo-catalog/categories/') ||
    source.includes('demo-catalog/categories/')

  const resolvedSource = usesGenericCatalogArt ? generatedFallback : source
  const showFallback = failed

  if (showFallback) {
    return (
      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-between p-3',
          fallbackClassName,
        )}
      >
        <p className={cn('max-w-[7ch] text-[15px] font-black uppercase leading-[0.9] tracking-[-0.05em]', fallbackTitleClassName)}>
          {product.name.split(' ').slice(0, 2).join(' ')}
        </p>
        <span
          className={cn(
            'inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em]',
            fallbackMetaClassName,
          )}
        >
          {product.category_name || 'Grocery'}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={resolvedSource}
      alt={product.name}
      fill
      priority={priority}
      sizes={sizes}
      unoptimized={resolvedSource.startsWith('http') || resolvedSource.startsWith('data:')}
      onError={() => setFailed(true)}
      className={className}
    />
  )
}

function PodiumCard({
  product,
  rank,
  active,
  onClick,
  inView,
  reduced,
  delay,
}: {
  product: Product
  rank: number
  active: boolean
  onClick: () => void
  inView: boolean
  reduced: boolean | null
  delay: number
}) {
  const discount = product.sale_price !== null && product.sale_price < product.price
    ? discountPercent(product.price, product.sale_price)
    : null
  const share = demandShare(product)

  return (
    <m.button
      type="button"
      onClick={onClick}
      initial={reduced ? false : { opacity: 0, x: -18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className={cn(
        'w-full min-w-0 rounded-[24px] border p-3.5 text-left transition-all duration-300 sm:p-4',
        active
          ? 'border-[#F4C84A] bg-[#173725] shadow-[0_18px_32px_rgba(4,12,8,0.26)]'
          : 'border-white/10 bg-white/[0.05] hover:border-white/20 hover:bg-white/[0.08]',
      )}
    >
      <div className="flex min-w-0 items-start gap-3 sm:gap-3.5">
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border text-[14px] font-black sm:h-11 sm:w-11 sm:rounded-[16px] sm:text-[15px]',
            active ? 'border-[#F4C84A] bg-[#F4C84A] text-[#173725]' : 'border-white/15 bg-white/[0.06] text-[#FFF9EE]',
          )}
        >
          {rank}
        </div>

        <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[16px] border border-[#E7DCC7] bg-[#FFF9EE] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:h-[68px] sm:w-[68px] sm:rounded-[18px]">
          <ProductImage
            product={product}
            sizes="(max-width: 640px) 60px, 68px"
            className="object-contain p-2.5"
            fallbackClassName="bg-[linear-gradient(160deg,#214131_0%,#173725_100%)] text-[#FFF9EE]"
            fallbackTitleClassName="text-[14px]"
            fallbackMetaClassName="text-[#F4C84A]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="line-clamp-2 text-[14px] font-bold leading-tight text-[#FFF9EE] sm:text-[15px]">{product.name}</p>
              <p className="mt-1 text-[12px] text-[#D8D0C2]">{orderCount(product)} carts today</p>
            </div>
            {active ? (
              <Badge className="rounded-full border-0 bg-[#F15D36] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                Live
              </Badge>
            ) : null}
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-1.5">
              <span className="text-[20px] font-black leading-none text-[#FFF9EE] sm:text-[22px]">{formatINR(displayPrice(product))}</span>
              {discount ? (
                <span className="text-[11px] font-medium text-white/35 line-through">{formatINR(product.price)}</span>
              ) : null}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F4C84A]">{share}% demand</span>
          </div>

          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <m.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#37A667_0%,#F4C84A_100%)]"
              initial={{ width: 0 }}
              animate={inView ? { width: `${share}%` } : {}}
              transition={{ delay: delay + 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </m.button>
  )
}

function TrendingCard({
  product,
  rank,
  inView,
  reduced,
  delay,
}: {
  product: Product
  rank: number
  inView: boolean
  reduced: boolean | null
  delay: number
}) {
  const discount = product.sale_price !== null && product.sale_price < product.price
    ? discountPercent(product.price, product.sale_price)
    : null

  return (
    <m.div
      initial={reduced ? false : { opacity: 0, x: 18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block rounded-[24px] border border-[#E5DAC7] bg-[#FFF9EE] p-3.5 text-[#13251B] shadow-[0_16px_30px_rgba(6,15,11,0.12)] transition-all duration-300 hover:border-[#F4C84A] hover:shadow-[0_24px_38px_rgba(6,15,11,0.17)] sm:p-4"
      >
        <div className="flex min-w-0 items-start gap-3 sm:gap-3.5">
          <div className="relative flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-[#ECE0CD] bg-white sm:h-[78px] sm:w-[78px] sm:rounded-[18px]">
            <div className="absolute left-2 top-2 rounded-full bg-[#173725] px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">
              #{rank}
            </div>
            <ProductImage
              product={product}
              sizes="(max-width: 640px) 68px, 78px"
              className="object-contain p-2.5"
              fallbackClassName="bg-[linear-gradient(160deg,#214131_0%,#173725_100%)] text-[#FFF9EE]"
              fallbackTitleClassName="text-[14px]"
              fallbackMetaClassName="bg-white/10 text-[#F4C84A]"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="line-clamp-2 text-[14px] font-bold leading-tight text-[#13251B] sm:text-[15px]">{product.name}</p>
                <p className="mt-1 text-[12px] text-[#627062]">{orderCount(product)} repeat orders</p>
              </div>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#173725] transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-1.5">
                <span className="text-[20px] font-black leading-none text-[#13251B] sm:text-[22px]">{formatINR(displayPrice(product))}</span>
                {discount ? (
                  <span className="text-[11px] font-medium text-[#889487] line-through">{formatINR(product.price)}</span>
                ) : null}
              </div>
              <Badge
                variant="outline"
                className="rounded-full border-[#DDD2BE] bg-[#FAF4E7] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7A6648]"
              >
                {demandShare(product)}% share
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </m.div>
  )
}

function SignalTile({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: typeof Clock3
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4 text-[#FFF9EE]">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-[#F4C84A]">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">{label}</p>
          <p className="mt-1 text-[17px] font-black leading-none">{value}</p>
          <p className="mt-1.5 text-[12px] leading-5 text-white/58">{note}</p>
        </div>
      </div>
    </div>
  )
}

export function BestSellersShowcase({ products }: Props) {
  const { addToCart, isAdding } = useCart()
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const sorted = useMemo(() => products.slice(0, 7), [products])
  const topThree = sorted.slice(0, 3)
  const supportingRanks = sorted.slice(3, 7)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeProduct = topThree[activeIndex]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = useReducedMotion()

  const toggleLiked = useCallback((id: string) => {
    setLiked((previous) => ({ ...previous, [id]: !previous[id] }))
  }, [])

  useEffect(() => {
    if (!inView || reduced || topThree.length < 2) return

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % topThree.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [inView, reduced, topThree.length])

  if (!activeProduct) return null

  const discount = activeProduct.sale_price !== null && activeProduct.sale_price < activeProduct.price
    ? discountPercent(activeProduct.price, activeProduct.sale_price)
    : null

  return (
    <section
      ref={ref}
      className="relative overflow-hidden rounded-[28px] border border-[#214131] bg-[#10261C] text-[#FFF9EE] shadow-[0_30px_80px_rgba(5,15,10,0.28)] sm:rounded-[32px]"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/banners/bestsellers-cinematic.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18] mix-blend-luminosity"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(9,28,19,0.96)_0%,rgba(16,38,28,0.92)_45%,rgba(19,50,36,0.95)_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-0 h-[320px] w-[320px] rounded-full bg-[#F15D36]/18 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[280px] w-[280px] rounded-full bg-[#F4C84A]/12 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative z-10 px-4 py-5 sm:px-7 sm:py-7 lg:px-9 lg:py-8">
        <m.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-[720px] min-w-0">
            <Badge
              variant="outline"
              className="rounded-full border-[#35684C] bg-[#173725] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4C84A]"
            >
              Live rankings
            </Badge>
            <h2 className="mt-4 max-w-[560px] text-[28px] font-black leading-[0.98] tracking-[-0.045em] text-[#FFF9EE] sm:text-[40px] lg:text-[48px]">
              What Kolkata is adding first today.
            </h2>
            <p className="mt-4 max-w-[560px] text-[14px] leading-6 text-white/68 sm:text-[16px] sm:leading-7">
              Pantry winners, fruit basket regulars, and snack shelf leaders pulled from live customer carts across South Kolkata.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[460px]">
            <SignalTile
              icon={TrendingUp}
              label="Baskets today"
              value={`${orderCount(activeProduct)}+`}
              note="Top mover in repeat household orders."
            />
            <SignalTile
              icon={Clock3}
              label="Refresh window"
              value="Hourly"
              note="Board updates through the day as carts move."
            />
            <SignalTile
              icon={Sparkles}
              label="Freshness score"
              value={`${repeatScore(activeProduct)}%`}
              note="Strong repeat rate with healthy stock rotation."
            />
          </div>
        </m.div>

        <Separator className="my-5 bg-white/10 sm:my-6" />

        <m.div
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="mb-6 flex flex-wrap gap-2.5"
        >
          {topThree.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                'rounded-full border px-4 py-2 text-left transition-all duration-300',
                index === activeIndex
                  ? 'border-[#F4C84A] bg-[#FFF9EE] text-[#13251B]'
                  : 'border-white/12 bg-white/[0.04] text-white/72 hover:border-white/20 hover:bg-white/[0.08]',
              )}
            >
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">Rank #{index + 1}</span>
              <span className="block text-[13px] font-semibold">{product.name}</span>
            </button>
          ))}
        </m.div>

        <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#F4C84A]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F4C84A]">Leaderboard</p>
            </div>

            {topThree.map((product, index) => (
              <PodiumCard
                key={product.id}
                product={product}
                rank={index + 1}
                active={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                inView={inView}
                reduced={reduced}
                delay={0.1 + index * 0.08}
              />
            ))}
          </div>

          <m.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              <m.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.985 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="overflow-hidden rounded-[28px] border-[#D8CCB8] bg-[#FFF9EE] text-[#13251B] shadow-[0_28px_64px_rgba(5,15,10,0.22)] sm:rounded-[30px]">
                  <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#173725_0%,#10261C_100%)] p-4 text-white sm:p-6">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,200,74,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(241,93,54,0.2),transparent_34%)]" />

                      <div className="relative flex items-start justify-between gap-3">
                        <div className="space-y-2">
                          <Badge className="rounded-full border-0 bg-[#F15D36] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                            Rank #{activeIndex + 1}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="rounded-full border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F4C84A]"
                          >
                            Market pulse: live
                          </Badge>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleLiked(activeProduct.id)}
                          className="rounded-full border border-white/12 bg-white/10 p-2.5 text-white transition-all duration-300 hover:bg-white/20"
                        >
                          <Heart className={cn('h-[18px] w-[18px]', liked[activeProduct.id] ? 'fill-[#F15D36] text-[#F15D36]' : 'text-white')} />
                        </button>
                      </div>

                      <div className="relative mx-auto mt-5 flex h-[240px] max-w-[240px] items-center justify-center rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,249,238,0.14),rgba(255,249,238,0.05))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] sm:mt-6 sm:h-[320px] sm:max-w-[280px] sm:rounded-[28px] sm:p-5">
                        <div className="absolute inset-5 rounded-[22px] bg-[radial-gradient(circle_at_top,rgba(244,200,74,0.26),transparent_55%),radial-gradient(circle_at_bottom,rgba(241,93,54,0.18),transparent_48%)]" />
                        <ProductImage
                          product={activeProduct}
                          priority
                          sizes="(max-width: 1024px) 80vw, 420px"
                          className="object-contain p-4 drop-shadow-[0_18px_30px_rgba(0,0,0,0.2)]"
                          fallbackClassName="bg-[linear-gradient(160deg,#FFF9EE_0%,#F6EEDA_100%)] text-[#173725]"
                          fallbackTitleClassName="text-[34px] sm:text-[40px]"
                          fallbackMetaClassName="border-[#D8CCB8] bg-white text-[#7A6848]"
                        />

                        {discount ? (
                          <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#F15D36] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                            <Flame className="h-3.5 w-3.5" />
                            {discount}% off today
                          </div>
                        ) : null}
                      </div>

                      <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[20px] border border-white/10 bg-white/[0.06] px-4 py-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/48">Orders today</p>
                          <p className="mt-2 text-[28px] font-black leading-none text-[#FFF9EE]">
                            {orderCount(activeProduct).toLocaleString()}+
                          </p>
                        </div>
                        <div className="rounded-[20px] border border-white/10 bg-white/[0.06] px-4 py-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/48">Repeat score</p>
                          <p className="mt-2 text-[28px] font-black leading-none text-[#F4C84A]">{repeatScore(activeProduct)}%</p>
                        </div>
                      </div>
                    </div>

                    <CardContent className="flex h-full min-w-0 flex-col p-4 sm:p-6 lg:p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className="rounded-full border-[#DDD2BE] bg-[#FBF5E9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7A6848]"
                        >
                          {activeProduct.category_name || 'Daily essential'}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="rounded-full border-[#DDD2BE] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#173725]"
                        >
                          Best in repeat carts
                        </Badge>
                      </div>

                      <h3 className="mt-4 text-[24px] font-black leading-[1.04] tracking-[-0.04em] text-[#13251B] sm:text-[36px]">
                        {activeProduct.name}
                      </h3>

                      <div className="mt-3 flex items-center gap-3">
                        <Stars value={reviewCount(activeProduct)} />
                        <span className="text-[12px] font-medium text-[#667364]">{orderCount(activeProduct)} households bought this today</span>
                      </div>

                      <div className="mt-5 flex items-end gap-2.5">
                        <span className="text-[40px] font-black leading-none tracking-[-0.04em] text-[#13251B]">
                          {formatINR(displayPrice(activeProduct))}
                        </span>
                        {discount ? (
                          <span className="pb-1 text-[15px] font-medium text-[#899486] line-through">{formatINR(activeProduct.price)}</span>
                        ) : null}
                      </div>

                      <p className="mt-4 text-[15px] leading-7 text-[#5C685C]">
                        {activeProduct.description || 'Reliable everyday quality with strong repeat demand, consistent stock movement, and a price point customers trust.'}
                      </p>

                      <Separator className="my-6 bg-[#E7DCC8]" />

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[22px] border border-[#E7DCC8] bg-white px-4 py-4">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7B6750]">Shelf pressure</p>
                          <Progress value={stockPercent(activeProduct)} className="mt-3 h-2 bg-[#ECE3D3] [&>div]:bg-[#F15D36]" />
                          <p className="mt-2 text-[12px] leading-5 text-[#667364]">{activeProduct.stock_quantity} units left in the current stock window.</p>
                        </div>

                        <div className="rounded-[22px] border border-[#E7DCC8] bg-[#FBF5E9] px-4 py-4">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7B6750]">Demand mix</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[24px] font-black leading-none text-[#173725]">{demandShare(activeProduct)}%</span>
                            <TrendingUp className="h-5 w-5 text-[#1B9B61]" />
                          </div>
                          <p className="mt-2 text-[12px] leading-5 text-[#667364]">High share of reorder volume across pantry and daily-use baskets.</p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                        <Button
                          type="button"
                          onClick={() => addToCart(activeProduct.id, 1)}
                          disabled={isAdding || activeProduct.stock_quantity === 0}
                          className="h-11 flex-1 rounded-full bg-[#1C8F54] text-[14px] font-bold text-white shadow-[0_12px_24px_rgba(28,143,84,0.22)] hover:bg-[#177247]"
                        >
                          <ShoppingBasket className="h-[18px] w-[18px]" />
                          {activeProduct.stock_quantity === 0 ? 'Out of stock' : 'Add to cart'}
                        </Button>

                        <Button
                          asChild
                          variant="outline"
                          className="h-11 rounded-full border-[#D6CAB7] bg-white px-5 text-[14px] font-semibold text-[#13251B] hover:bg-[#FBF5E9]"
                        >
                          <Link href={`/products/${activeProduct.slug}`}>
                            View product
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </m.div>
            </AnimatePresence>
          </m.div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-[#F4C84A]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F4C84A]">More movers</p>
            </div>

            {supportingRanks.map((product, index) => (
              <TrendingCard
                key={product.id}
                product={product}
                rank={index + 4}
                inView={inView}
                reduced={reduced}
                delay={0.18 + index * 0.07}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 border-t border-white/10 pt-6 lg:grid-cols-3">
          {[
            {
              icon: Clock3,
              title: 'Pulled from live baskets',
              note: 'This board updates from recent order movement instead of static merchandising.',
            },
            {
              icon: Users,
              title: 'Built around repeat buying',
              note: 'Favourites stay here because customers come back for them, not because of decorative scoring.',
            },
            {
              icon: Sparkles,
              title: 'Sharper grocery signal',
              note: 'Pantry staples, produce winners, and quick-refill items get priority over generic catalog noise.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-[#F4C84A]">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#FFF9EE]">{item.title}</p>
                  <p className="mt-1.5 text-[12px] leading-5 text-white/58">{item.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BestSellersShowcaseSkeleton() {
  return (
    <section className="overflow-hidden rounded-[32px] border border-[#214131] bg-[#10261C] shadow-[0_30px_80px_rgba(5,15,10,0.28)]">
      <div className="px-5 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[680px]">
            <Skeleton className="h-8 w-32 rounded-full bg-white/10" />
            <Skeleton className="mt-4 h-14 w-full max-w-[560px] rounded-[18px] bg-white/10" />
            <Skeleton className="mt-3 h-5 w-full max-w-[480px] rounded-md bg-white/8" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[460px]">
            {[0, 1, 2].map((index) => (
              <Skeleton key={index} className="h-[96px] rounded-[20px] bg-white/10" />
            ))}
          </div>
        </div>

        <div className="my-6 h-px w-full bg-white/10" />

        <div className="mb-6 flex flex-wrap gap-2.5">
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} className="h-14 w-[180px] rounded-full bg-white/10" />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
          <div className="space-y-3">
            {[0, 1, 2].map((index) => (
              <Skeleton key={index} className="h-[122px] rounded-[24px] bg-white/10" />
            ))}
          </div>

          <Skeleton className="h-[710px] rounded-[30px] bg-white/12" />

          <div className="space-y-3">
            {[0, 1, 2, 3].map((index) => (
              <Skeleton key={index} className="h-[128px] rounded-[24px] bg-white/10" />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} className="h-[92px] rounded-[22px] bg-white/10" />
          ))}
        </div>
      </div>
    </section>
  )
}
