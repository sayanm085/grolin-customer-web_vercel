'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2, Minus, Plus, ShoppingCart } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { useCart } from '@/hooks/useCart'
import { useFlyToCart } from '@/hooks/useFlyToCart'
import { WishlistButton } from '@/components/product/WishlistButton'
import { PRODUCT_IMAGE_PLACEHOLDER, getProductImageSrc } from '@/lib/media'
import { discountPercent, formatINR, cn } from '@/lib/utils'
import type { Product } from '@/types/product.types'

interface Props {
  product: Product
  showNewBadge?: boolean
  priority?: boolean
  variant?: 'default' | 'section'
}

function getCardImageSrc(src: string) {
  if (!src.includes('res.cloudinary.com') || !src.includes('/image/upload/')) {
    return src
  }

  const [base = '', query = ''] = src.split('?')
  if (base.includes('/image/upload/e_trim/')) {
    return src
  }

  const marker = '/image/upload/'
  const markerIndex = base.indexOf(marker)
  if (markerIndex === -1) {
    return src
  }

  const prefix = base.slice(0, markerIndex + marker.length)
  const remainder = base.slice(markerIndex + marker.length)
  const transformed = `${prefix}e_trim/${remainder}`
  return query ? `${transformed}?${query}` : transformed
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

function formatTagLabel(product: Product) {
  const raw = product.tags?.[0]?.trim()
  if (!raw) return 'Curated Grocery'
  return raw
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getUnitPriceLabel(amount: number, unit: Product['unit']) {
  switch (unit) {
    case 'kg':
      return `${formatINR(amount)}/kg`
    case 'g':
      return `${formatINR(amount / 5)}/100g`
    case 'l':
      return `${formatINR(amount)}/L`
    case 'ml':
      return `${formatINR(amount / 5)}/100ml`
    case 'piece':
      return `${formatINR(amount)}/piece`
    case 'pack':
      return `${formatINR(amount)}/pack`
    default:
      return null
  }
}

function ProductBadge({
  discount,
  displayTag,
  showNewBadge,
  showPopular,
}: {
  discount: number | null
  displayTag: string
  showNewBadge?: boolean
  showPopular?: boolean
}) {
  if (discount) {
    return (
      <span className="inline-flex rounded-full bg-[color:var(--shop-discount)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[var(--shop-shadow-level-1)]">
        {discount}% OFF
      </span>
    )
  }

  if (showNewBadge) {
    return (
      <span className="inline-flex rounded-full bg-[color:var(--shop-primary)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[var(--shop-shadow-level-1)]">
        New
      </span>
    )
  }

  if (showPopular) {
    return (
      <span className="inline-flex rounded-full bg-[#E3B93C] px-2.5 py-1 text-[10px] font-bold text-white shadow-[var(--shop-shadow-level-1)]">
        🔥 Popular
      </span>
    )
  }

  return (
    <span className="inline-flex max-w-[132px] truncate rounded-full bg-[color:var(--shop-surface)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[color:var(--shop-primary)] shadow-[var(--shop-shadow-level-1)]">
      {displayTag}
    </span>
  )
}

function ProductAction({
  product,
  qty,
  max,
  outOfStock,
  isAdding,
  isUpdating,
  updateQty,
  removeFromCart,
  onAdd,
}: {
  product: Product
  qty: number
  max: number
  outOfStock: boolean
  isAdding: boolean
  isUpdating: boolean
  updateQty: (productId: string, qty: number) => void
  removeFromCart: (productId: string) => void
  onAdd: () => void
}) {
  if (outOfStock) {
    return (
      <span className="inline-flex h-9 w-full items-center justify-center rounded-[10px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-subtle)] px-4 text-[12px] font-semibold text-[color:var(--shop-ink-muted)]">
        Out of stock
      </span>
    )
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {qty === 0 ? (
        <m.button
          key="add"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 450, damping: 15 }}
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onAdd()
          }}
          disabled={isAdding}
          className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-[10px] px-4 text-[13px] font-bold text-white shadow-green-glow hover:shadow-green-glow-hover btn-press transition-shadow duration-150 disabled:cursor-not-allowed disabled:opacity-55"
          style={{ backgroundImage: 'linear-gradient(135deg, #16945E 0%, #128050 100%)' }}
          aria-label={`Add ${product.name} to cart`}
        >
          {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" strokeWidth={2.2} />}
          Add
        </m.button>
      ) : (
        <m.div
          key="stepper"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
          className="grid h-9 w-full grid-cols-3 overflow-hidden rounded-[10px] bg-[color:var(--shop-action)] text-white shadow-[var(--shop-shadow-level-1)]"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
        >
          <button
            type="button"
            onClick={() => (qty === 1 ? removeFromCart(product.id) : updateQty(product.id, qty - 1))}
            disabled={isUpdating}
            className="flex h-full items-center justify-center border-r border-white/15 transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:opacity-40"
            aria-label={`Decrease quantity of ${product.name}`}
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={2.4} />
          </button>
          <span className="flex h-full items-center justify-center text-[15px] font-bold tabular-nums">{qty}</span>
          <button
            type="button"
            onClick={() => {
              if (qty < max) updateQty(product.id, qty + 1)
            }}
            disabled={isUpdating || qty >= max}
            className="flex h-full items-center justify-center border-l border-white/15 transition-colors hover:bg-[color:var(--shop-action-hover)] disabled:opacity-40"
            aria-label={`Increase quantity of ${product.name}`}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  )
}

export const ProductCard = React.memo(function ProductCard({
  product,
  showNewBadge,
  priority = false,
  variant = 'default',
}: Props) {
  const { addToCart, updateQty, removeFromCart, getQty, isAdding, isUpdating } = useCart()
  const flyToCart = useFlyToCart()
  const imageRef = React.useRef<HTMLDivElement | null>(null)
  const qty = getQty(product.id)
  const salePrice = product.sale_price ?? product.salePrice ?? null
  const displayPrice = salePrice ?? product.price
  const discount = salePrice !== null && salePrice < product.price ? discountPercent(product.price, salePrice) : null
  const max = product.max_order_qty ?? Math.min(product.stock_quantity, 10)
  const outOfStock = product.stock_quantity === 0
  const displayTag = formatTagLabel(product)
  const showPopular = !discount && (product.weekly_sales ?? 0) > 500
  const resolvedImageSrc = React.useMemo(() => getProductImageSrc(product), [product])
  const [imageFailed, setImageFailed] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const unitRateLabel = getUnitPriceLabel(displayPrice, product.unit)
  const isSection = variant === 'section'

  React.useEffect(() => {
    setImageFailed(false)
    setIsLoaded(false)
  }, [resolvedImageSrc])

  const imageSrc = getCardImageSrc(imageFailed ? PRODUCT_IMAGE_PLACEHOLDER : resolvedImageSrc)
  const useNormalizedRealImage =
    imageSrc !== PRODUCT_IMAGE_PLACEHOLDER &&
    !imageSrc.startsWith('data:image/svg+xml') &&
    !imageSrc.includes('/demo-catalog/categories/')

  const handleAdd = () => {
    const cartElement = document.querySelector('[data-cart-icon]') as HTMLElement | null
    if (imageRef.current && cartElement) {
      flyToCart({
        imageUrl: imageSrc,
        fromElement: imageRef.current,
        toElement: cartElement,
      })
    }
    addToCart(product.id, 1)
  }

  return (
    <m.article
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[rgba(24,33,43,0.10)] bg-[color:var(--shop-surface)] shadow-[0_12px_30px_rgba(24,33,43,0.07)] transition-[box-shadow,border-color] duration-200 hover:border-[rgba(110,73,216,0.18)] hover:shadow-[0_18px_36px_rgba(24,33,43,0.10)]',
        isSection && 'min-h-full',
      )}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px] rounded-t-[22px] opacity-0 transition-opacity duration-220 group-hover:opacity-100"
        style={{ background: 'linear-gradient(90deg, #6E49D8, #9B6DFF)' }}
      />
      <Link href={`/products/${product.slug}`} className="block">
        <div
          ref={imageRef}
          data-product-image
          className={cn(
            'relative overflow-hidden border-b border-[rgba(24,33,43,0.08)] bg-gradient-to-br from-[#F5F0EC] via-[#EDE8E3] to-[#E8E2DA] transition-all duration-[400ms] group-hover:border-[rgba(110,73,216,0.14)] group-hover:from-[#F0EBE5] group-hover:to-[#DDD6CC]',
            isSection ? 'h-[152px] md:h-[160px] lg:h-[168px]' : 'h-[148px] lg:h-[164px]',
          )}
        >
          <div className="absolute left-2 top-2 z-20">
            <ProductBadge
              discount={discount}
              displayTag={displayTag}
              showNewBadge={showNewBadge}
              showPopular={showPopular}
            />
          </div>

          <WishlistButton
            productId={product.id}
            className="absolute right-2 top-2 z-20 h-8 w-8 rounded-full border-[color:var(--shop-border)] bg-white text-[color:var(--shop-ink-faint)] shadow-[var(--shop-shadow-level-1)]"
          />

          {!isLoaded && (
            <Skeleton className="absolute inset-0 z-10 rounded-[22px]" />
          )}
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            onError={() => { setImageFailed(true); setIsLoaded(true) }}
            onLoad={() => setIsLoaded(true)}
            data-product-image
            className={cn(
              'object-center transition-[transform,opacity] duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]',
              useNormalizedRealImage
                ? 'object-contain p-3 group-hover:scale-[1.04] md:p-3.5'
                : 'object-contain p-4 group-hover:scale-110',
              isLoaded ? 'opacity-100' : 'opacity-0',
              outOfStock && 'opacity-45 grayscale-[0.7]',
            )}
            sizes={
              isSection
                ? '(max-width: 640px) 214px, (max-width: 1024px) 228px, 244px'
                : '(max-width: 640px) 45vw, (max-width: 1200px) 22vw, 220px'
            }
            priority={priority}
            unoptimized={imageSrc.startsWith('http')}
          />
        </div>
      </Link>

      <div className={cn('flex flex-1 flex-col p-3 pb-3.5', isSection && 'p-3.5')}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className="inline-flex rounded-full bg-[color:var(--shop-primary-soft)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[color:var(--shop-primary)]">
            {formatBadgeUnit(product.unit)}
          </span>
        </div>

        <Link href={`/products/${product.slug}`} className="block">
          <p className="line-clamp-2 text-[15px] font-bold leading-[1.45] tracking-[-0.01em] text-[color:var(--shop-ink)]">
            {product.name}
          </p>
        </Link>

        {product.stock_quantity !== undefined && product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <div className="mt-1 flex items-center gap-1">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: 'var(--shop-discount)', animation: 'pulse-ring 1.5s ease-out infinite' }}
              aria-hidden="true"
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: 'var(--shop-discount)' }}>
              Only {product.stock_quantity} left
            </span>
          </div>
        )}

        {unitRateLabel ? (
          <p className="mt-1.5 text-[12px] font-medium leading-5 text-[color:var(--shop-ink-faint)]">{unitRateLabel}</p>
        ) : null}

        <div className="mt-auto pt-3">
          <div className="mb-2.5 flex items-end gap-1.5">
            <p
              className={cn(
                'text-[20px] font-extrabold leading-none tracking-[-0.03em] sm:text-[21px]',
                discount ? 'text-[color:var(--shop-discount)]' : 'text-[color:var(--shop-ink)]',
              )}
            >
              {formatINR(displayPrice)}
            </p>
            {discount ? (
              <p className="text-[12px] font-medium leading-none text-[color:var(--shop-ink-faint)] line-through">
                {formatINR(product.price)}
              </p>
            ) : null}
          </div>

          {discount ? (
            <div className="mb-2.5">
              <span className="inline-flex rounded-full bg-[color:var(--shop-discount)] px-2.5 py-1 text-[10px] font-bold text-white shadow-[var(--shop-shadow-level-1)]">
                Save {formatINR(product.price - displayPrice)}
              </span>
            </div>
          ) : null}

          <ProductAction
            product={product}
            qty={qty}
            max={max}
            outOfStock={outOfStock}
            isAdding={isAdding}
            isUpdating={isUpdating}
            updateQty={updateQty}
            removeFromCart={removeFromCart}
            onAdd={handleAdd}
          />
        </div>
      </div>
    </m.article>
  )
})
