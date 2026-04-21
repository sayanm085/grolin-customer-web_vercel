'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { HomeSectionHeader } from '@/components/home/HomeSectionHeader'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton'
import { QUERY_KEYS, STALE_TIMES } from '@/lib/constants'
import api from '@/lib/api'
import { ordersService } from '@/services/orders.service'
import { categoriesService } from '@/services/categories.service'
import { cartService } from '@/services/cart.service'
import { normalizeProducts, productsService } from '@/services/products.service'
import { useAuthStore } from '@/store/auth.store'
import type { Cart } from '@/types/cart.types'
import type { Order } from '@/types/order.types'
import type { Product } from '@/types/product.types'

function getLastOrder(orders: Order[]) {
  return [...orders]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .find((order) => order.items.length > 0 && order.status !== 'CANCELLED' && order.status !== 'REFUNDED')
}

function dedupeProducts(products: Product[]) {
  const seen = new Set<string>()
  return products.filter((product) => {
    if (!product.id || seen.has(product.id)) return false
    seen.add(product.id)
    return true
  })
}

function filterRecommendationProducts(products: Product[], excludeIds: Set<string>) {
  return dedupeProducts(products)
    .filter((product) => product.stock_quantity > 0 && !excludeIds.has(product.id))
    .sort((a, b) => (b.total_sold || 0) - (a.total_sold || 0))
}

async function getRecommendedProducts(lastOrder: Order, cart: Cart | undefined) {
  const lastOrderProductIds = new Set(lastOrder.items.map((item) => item.productId).filter(Boolean))
  const cartProductIds = new Set((cart?.items ?? []).map((item) => item.productId).filter(Boolean))
  const excludeIds = new Set([...lastOrderProductIds, ...cartProductIds])

  try {
    const { data } = await api.get('/users/me/recommendations')
    const rawProducts = Array.isArray(data?.data?.products)
      ? data.data.products
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.products)
          ? data.products
          : []

    const normalized = normalizeProducts(rawProducts as Record<string, unknown>[])
    const filtered = filterRecommendationProducts(normalized, excludeIds)
    if (filtered.length >= 4) {
      return filtered.slice(0, 8)
    }
  } catch {
    // Fall back to derived recommendations from the user's last order.
  }

  const categoryProducts = await Promise.all(
    Array.from(
      new Set(
        lastOrder.items
          .map((item) => item.productId)
          .filter(Boolean),
      ),
    ).map(async (productId) => {
      try {
        const orderedProduct = await productsService.getById(productId)
        if (!orderedProduct.category_id) return []
        const response = await categoriesService.getProducts(orderedProduct.category_id, { limit: 12, sort: 'popular' })
        return response.products
      } catch {
        return []
      }
    }),
  )

  return filterRecommendationProducts(categoryProducts.flat(), excludeIds).slice(0, 8)
}

function RecommendedSectionSkeleton() {
  return (
    <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
      <div className="mb-4">
        <div className="mb-2 h-3 w-24 rounded-full bg-[color:var(--shop-primary-soft)]" />
        <div className="h-8 w-64 rounded-full bg-[color:var(--shop-surface-subtle)]" />
        <div className="mt-2 h-4 w-72 rounded-full bg-[color:var(--shop-surface-subtle)]" />
      </div>
      <div className="overflow-hidden pb-2">
        <div className="flex min-w-max gap-3 px-1 sm:gap-3.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-[148px] shrink-0">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function RecommendedSection() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const { data: ordersData, isLoading: loadingOrders } = useQuery({
    queryKey: QUERY_KEYS.orders({ limit: 12, scope: 'recommended-last-order' }),
    queryFn: () => ordersService.getAll({ limit: 12 }),
    enabled: isLoggedIn,
    staleTime: STALE_TIMES.orders,
  })

  const { data: cart } = useQuery({
    queryKey: QUERY_KEYS.cart,
    queryFn: cartService.get,
    enabled: isLoggedIn,
    staleTime: STALE_TIMES.cart,
  })

  const lastOrder = useMemo(() => getLastOrder(ordersData?.orders ?? []), [ordersData?.orders])

  const { data: products = [], isLoading: loadingRecommendations } = useQuery({
    queryKey: ['home', 'recommended', lastOrder?.id ?? 'none', (cart?.items ?? []).map((item) => item.productId).join(',')],
    enabled: isLoggedIn && Boolean(lastOrder),
    staleTime: STALE_TIMES.products,
    queryFn: () => getRecommendedProducts(lastOrder!, cart),
  })

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const updateState = () => {
      setCanScrollLeft(element.scrollLeft > 8)
      setCanScrollRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 8)
    }

    updateState()
    element.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)

    return () => {
      element.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [products])

  const scrollByAmount = (direction: 'left' | 'right') => {
    const element = scrollRef.current
    if (!element) return

    element.scrollBy({
      left: (direction === 'left' ? -1 : 1) * Math.max(320, element.clientWidth * 0.7),
      behavior: 'smooth',
    })
  }

  if (!isLoggedIn) return null
  if (loadingOrders || (lastOrder && loadingRecommendations)) return <RecommendedSectionSkeleton />
  if (!lastOrder || products.length < 4) return null

  return (
    <section className="px-3 home-section-spacing sm:px-4 lg:px-6">
      <HomeSectionHeader
        title="Based on Your Last Order"
        subtitle="Fresh picks chosen from the categories you bought most recently, so the next basket starts with momentum."
        eyebrow="JUST FOR YOU"
        onPrev={() => scrollByAmount('left')}
        onNext={() => scrollByAmount('right')}
        controlsDisabled={!canScrollLeft && !canScrollRight}
      />

      <div ref={scrollRef} className="overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex min-w-max snap-x snap-mandatory gap-3 px-1 sm:gap-3.5">
          {products.map((product, index) => (
            <div key={product.id} className="w-[148px] shrink-0 snap-start self-stretch">
              <ProductCard product={product} priority={index < 2} variant="section" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

