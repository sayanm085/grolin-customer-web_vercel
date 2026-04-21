'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Loader2, Minus, Plus, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { useCart } from '@/hooks/useCart'
import { QUERY_KEYS, STALE_TIMES } from '@/lib/constants'
import { PRODUCT_IMAGE_PLACEHOLDER, getProductImageSrc } from '@/lib/media'
import { cn, discountPercent, formatINR } from '@/lib/utils'
import { cartService } from '@/services/cart.service'
import { ordersService } from '@/services/orders.service'
import { productsService } from '@/services/products.service'
import { useAuthStore } from '@/store/auth.store'
import type { Order } from '@/types/order.types'
import type { Product } from '@/types/product.types'

type UsualMeta = {
  productId: string
  daysAgo: number
  quantity: number
}

type UsualItem = {
  product: Product
  daysAgo: number
  quantity: number
}

function getFirstName(name: string | null | undefined) {
  if (!name) return 'there'
  return name.trim().split(/\s+/)[0] || 'there'
}

function formatDaysAgo(daysAgo: number) {
  if (daysAgo <= 0) return 'Ordered today'
  if (daysAgo === 1) return 'Ordered 1 day ago'
  return `Ordered ${daysAgo} days ago`
}

function formatBadgeUnit(unit: Product['unit']) {
  const map: Record<Product['unit'], string> = {
    kg: '1kg',
    g: '500g',
    l: '1L',
    ml: '500ml',
    piece: '1pc',
    pack: '1pack',
  }
  return map[unit] ?? '1pc'
}

function deriveUsualMeta(orders: Order[]) {
  const completedOrders = orders
    .filter((order) => order.status === 'DELIVERED')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3)

  const productMap = new Map<string, UsualMeta>()

  completedOrders.forEach((order) => {
    const daysAgo = Math.max(
      0,
      Math.floor((Date.now() - new Date(order.created_at).getTime()) / (1000 * 60 * 60 * 24)),
    )

    order.items.forEach((item) => {
      if (!item.productId || productMap.has(item.productId)) return

      productMap.set(item.productId, {
        productId: item.productId,
        daysAgo,
        quantity: Math.max(1, item.quantity || 1),
      })
    })
  })

  return Array.from(productMap.values())
    .sort((a, b) => a.daysAgo - b.daysAgo)
    .slice(0, 14)
}

function UsualProductCard({ item }: { item: UsualItem }) {
  const { addToCart, updateQty, removeFromCart, getQty, isAdding, isUpdating } = useCart()
  const qty = getQty(item.product.id)
  const salePrice = item.product.sale_price ?? item.product.salePrice ?? null
  const displayPrice = salePrice ?? item.product.price
  const discount =
    salePrice !== null && salePrice < item.product.price ? discountPercent(item.product.price, salePrice) : null
  const maxQty = Math.min(item.product.max_order_qty ?? 10, Math.max(1, item.product.stock_quantity))
  const resolvedImageSrc = useMemo(() => getProductImageSrc(item.product), [item.product])
  const [imageFailed, setImageFailed] = useState(false)
  const imageSrc = imageFailed ? PRODUCT_IMAGE_PLACEHOLDER : resolvedImageSrc

  useEffect(() => {
    setImageFailed(false)
  }, [resolvedImageSrc])

  return (
    <article className="group flex h-full w-[148px] shrink-0 flex-col overflow-hidden rounded-[22px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] shadow-[var(--shop-shadow-level-1)] transition-shadow duration-200 hover:shadow-[var(--shop-shadow-level-5)]">
      <Link href={`/products/${item.product.slug}`} className="block">
        <div
          className="relative h-[160px] overflow-hidden border-b border-[color:var(--shop-border)]"
          style={{ backgroundImage: 'var(--shop-gradient-promo)' }}
        >
          <div className="absolute left-2 top-2 z-10 inline-flex rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[color:var(--shop-primary)] shadow-[var(--shop-shadow-level-1)]">
            {discount ? `${discount}% OFF` : item.product.tags?.[0] || item.product.category_name || 'Reorder'}
          </div>

          <Image
            src={imageSrc}
            alt={item.product.name}
            fill
            onError={() => setImageFailed(true)}
            className="object-contain object-center p-4 transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="148px"
            unoptimized={imageSrc.startsWith('http')}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="inline-flex rounded-full bg-[color:var(--shop-primary-soft)] px-2 py-0.5 text-[10px] font-medium text-[color:var(--shop-primary)]">
            {formatBadgeUnit(item.product.unit)}
          </span>
        </div>

        <Link href={`/products/${item.product.slug}`} className="block">
          <p className="line-clamp-2 text-[14px] font-semibold leading-[1.4] text-[color:var(--shop-ink)]">
            {item.product.name}
          </p>
        </Link>

        <p className="mt-1 text-[11px] font-medium text-[color:var(--shop-ink-faint)]">
          {formatDaysAgo(item.daysAgo)}
        </p>

        <div className="mt-auto pt-3">
          <div className="mb-2.5 flex items-end gap-1.5">
            <p
              className={cn(
                'text-[18px] font-extrabold leading-none tracking-tight',
                discount ? 'text-[color:var(--shop-discount)]' : 'text-[color:var(--shop-ink)]',
              )}
            >
              {formatINR(displayPrice)}
            </p>
            {discount ? (
              <p className="text-[13px] font-normal text-[color:var(--shop-ink-faint)] line-through">
                {formatINR(item.product.price)}
              </p>
            ) : null}
          </div>

          {qty === 0 ? (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                addToCart(item.product.id, Math.min(item.quantity, maxQty))
              }}
              disabled={isAdding}
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-[10px] bg-[color:var(--shop-action)] px-3 text-[12px] font-bold text-white shadow-[var(--shop-shadow-level-1)] transition-all duration-150 hover:bg-[color:var(--shop-action-hover)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-55"
              aria-label={`Add ${item.product.name} again`}
            >
              {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-3 w-3" strokeWidth={2.2} />
              )}
              Add Again
            </button>
          ) : (
            <div
              className="grid h-9 w-full grid-cols-3 overflow-hidden rounded-[10px] bg-[color:var(--shop-action)] text-white shadow-[var(--shop-shadow-level-1)]"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
            >
              <button
                type="button"
                onClick={() => (qty === 1 ? removeFromCart(item.product.id) : updateQty(item.product.id, qty - 1))}
                disabled={isUpdating}
                className="flex h-full items-center justify-center border-r border-white/15 transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:opacity-40"
                aria-label={`Decrease quantity of ${item.product.name}`}
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={2.4} />
              </button>
              <span className="flex h-full items-center justify-center text-[15px] font-bold tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => {
                  if (qty < maxQty) updateQty(item.product.id, qty + 1)
                }}
                disabled={isUpdating || qty >= maxQty}
                className="flex h-full items-center justify-center border-l border-white/15 transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:opacity-40"
                aria-label={`Increase quantity of ${item.product.name}`}
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

function UsualsSkeleton() {
  return (
    <section className="px-3 pt-5 sm:px-4 lg:px-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 h-3 w-24 rounded-full bg-[color:var(--shop-primary-soft)]" />
          <div className="h-8 w-52 rounded-full bg-[color:var(--shop-surface-subtle)]" />
          <div className="mt-2 h-4 w-40 rounded-full bg-[color:var(--shop-surface-subtle)]" />
        </div>
        <div className="h-8 w-28 rounded-full bg-[color:var(--shop-success-soft)]" />
      </div>
      <div className="flex gap-3 overflow-hidden px-1">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[312px] w-[148px] shrink-0 rounded-[22px] bg-[color:var(--shop-surface-subtle)] animate-shimmer"
          />
        ))}
      </div>
    </section>
  )
}

export function YourUsualsSection() {
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, containScroll: 'trimSnaps' })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const { data: ordersData, isLoading: loadingOrders } = useQuery({
    queryKey: QUERY_KEYS.orders({ limit: 20, scope: 'usuals' }),
    queryFn: () => ordersService.getAll({ limit: 20 }),
    enabled: isLoggedIn,
    staleTime: STALE_TIMES.orders,
  })

  const usualMeta = useMemo(() => deriveUsualMeta(ordersData?.orders ?? []), [ordersData?.orders])

  const { data: usualItems = [], isLoading: loadingProducts } = useQuery({
    queryKey: ['home', 'usuals', usualMeta.map((meta) => meta.productId).join(',')],
    enabled: isLoggedIn && usualMeta.length > 0,
    staleTime: STALE_TIMES.products,
    queryFn: async () => {
      const resolved = await Promise.all(
        usualMeta.map(async (meta) => {
          try {
            const product = await productsService.getById(meta.productId)
            if (product.stock_quantity <= 0) return null
            return { product, daysAgo: meta.daysAgo, quantity: meta.quantity }
          } catch {
            return null
          }
        }),
      )

      return resolved.filter((item): item is UsualItem => Boolean(item)).slice(0, 14)
    },
  })

  const updateScrollState = useCallback(() => {
    if (!emblaApi) return
    setCanScrollLeft(emblaApi.canScrollPrev())
    setCanScrollRight(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    updateScrollState()
    emblaApi.on('select', updateScrollState)
    emblaApi.on('reInit', updateScrollState)
    emblaApi.on('scroll', updateScrollState)
    return () => {
      emblaApi.off('select', updateScrollState)
      emblaApi.off('reInit', updateScrollState)
      emblaApi.off('scroll', updateScrollState)
    }
  }, [emblaApi, updateScrollState])

  const reorderAllMutation = useMutation({
    mutationFn: async () => {
      for (const item of usualItems) {
        const quantity = Math.min(
          item.quantity,
          Math.max(1, item.product.max_order_qty ?? item.product.stock_quantity),
        )
        await cartService.addItem(item.product.id, quantity)
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart })
      const totalItems = usualItems.reduce(
        (sum, item) =>
          sum +
          Math.min(item.quantity, Math.max(1, item.product.max_order_qty ?? item.product.stock_quantity)),
        0,
      )
      toast.success(`Added ${totalItems} items to your basket`)
    },
    onError: () => {
      toast.error('Could not reorder your usuals right now.')
    },
  })

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!emblaApi) return
    if (direction === 'left') emblaApi.scrollPrev()
    else emblaApi.scrollNext()
  }

  if (!isLoggedIn) return null
  if (loadingOrders || (usualMeta.length > 0 && loadingProducts)) return <UsualsSkeleton />
  if (usualItems.length < 4) return null

  return (
    <section className="px-3 pt-5 sm:px-4 lg:px-6">
      <div className="reveal-on-scroll mb-5 flex items-start justify-between gap-4 sm:mb-6">
        <div className="flex items-start gap-3">
          <span className="mt-1 hidden h-8 w-[2px] rounded-full bg-[color:var(--shop-primary)] sm:block" />
          <div>
            <span className="eyebrow mb-1.5">
              ORDER AGAIN
            </span>
            <h2 className="headline-editorial">
              Your <span className="gradient-text-green">Usuals</span>
              {user?.name ? `, ${getFirstName(user.name)}` : ''}
            </h2>
            <p className="mt-2 text-[13px] text-[color:var(--shop-ink-muted)]">Items from your past orders</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => reorderAllMutation.mutate()}
          disabled={reorderAllMutation.isPending}
          className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-[color:var(--shop-success-soft)] px-3 text-[11px] font-bold text-[color:var(--shop-action)] transition-colors hover:bg-[color:var(--shop-success-soft)]/80 disabled:opacity-55"
        >
          {reorderAllMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          Reorder All
        </button>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollByAmount('left')}
          aria-label="Scroll your usuals left"
          className={cn(
            'absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#101216] text-white shadow-[0_18px_36px_rgba(16,18,22,0.24)] transition-all duration-200 hover:scale-[1.03] hover:bg-black lg:flex',
            !canScrollLeft && 'pointer-events-none opacity-0',
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => scrollByAmount('right')}
          aria-label="Scroll your usuals right"
          className={cn(
            'absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#101216] text-white shadow-[0_18px_36px_rgba(16,18,22,0.24)] transition-all duration-200 hover:scale-[1.03] hover:bg-black lg:flex',
            !canScrollRight && 'pointer-events-none opacity-0',
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="overflow-hidden pb-2" ref={emblaRef}>
          <div className="flex select-none touch-pan-y gap-3 px-1 sm:gap-3.5">
            {usualItems.map((item) => (
              <UsualProductCard key={item.product.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
