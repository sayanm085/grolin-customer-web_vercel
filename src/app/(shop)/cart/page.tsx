'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useCoupon } from '@/hooks/useCoupon'
import { CouponSheet } from '@/components/checkout/CouponSheet'
import {
    CartCrossSell,
    CartEmpty,
    CartItem,
    CartItemMobile,
    CartStickyBar,
    CartSummary,
    FreeDeliveryBar,
    PromoCodeInput,
} from '@/components/cart'
import { cartSavings } from '@/components/cart/cart.utils'
import { DEFAULT_DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, PLATFORM_FEE } from '@/lib/constants'
import { WEEKLY_CUSTOMERS } from '@/constants/social-proof'
import { formatINR } from '@/lib/utils'

export default function CartPage() {
    const router = useRouter()
    const reduceMotion = useReducedMotion()
    const { cart, isLoading, updateQty, removeFromCart } = useCart()
    const subtotal = cart?.subtotal ?? 0
    const [showCouponSheet, setShowCouponSheet] = useState(false)
    const { coupon, applyCoupon, removeCoupon, isValidating } = useCoupon(subtotal)

    useEffect(() => {
        document.title = 'My Basket - Grolin Grocery'
    }, [])

    if (isLoading) {
        return (
            <div className="page-enter px-4 py-6 sm:px-5 lg:px-6">
                <div className="mb-6 h-4 w-24 rounded-lg skeleton-shimmer" />
                <div className="mb-2 h-12 w-52 rounded-lg skeleton-shimmer" />
                <div className="mb-8 h-5 w-64 rounded-lg skeleton-shimmer" />
                <div className="grid gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.95fr)]">
                    <div className="space-y-4">
                        <div className="h-24 rounded-[22px] skeleton-shimmer" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-40 rounded-[24px] skeleton-shimmer" />
                        ))}
                    </div>
                    <div className="hidden h-[560px] rounded-[28px] skeleton-shimmer lg:block" />
                </div>
            </div>
        )
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="page-enter px-4 py-8 sm:px-5 lg:px-6">
                <CartEmpty />
            </div>
        )
    }

    const lineItemCount = cart.items.length
    const totalSavings = cartSavings(cart.items)
    const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DEFAULT_DELIVERY_FEE
    const total = Math.max(0, subtotal + deliveryFee + PLATFORM_FEE - coupon.discount)
    const cartProductIds = cart.items.map((item) => item.productId)

    const renderPromoBlock = () => (
        <PromoCodeInput
            appliedCode={coupon.code}
            discount={coupon.discount}
            isValidating={isValidating}
            onApply={(code) => applyCoupon(code)}
            onRemove={removeCoupon}
            onViewCoupons={() => setShowCouponSheet(true)}
        />
    )

    return (
        <>
            <div className="page-enter px-3.5 py-4 pb-36 sm:px-5 lg:px-6 lg:pb-8">
                <section className="mb-5">
                    <div className="flex flex-col gap-4 border-b border-[color:var(--shop-border)] pb-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-[28px] font-extrabold leading-none tracking-[-0.03em] text-[color:var(--shop-ink)] sm:text-[36px]">
                                    My Basket
                                </h1>
                                <span className="inline-flex rounded-full bg-[color:var(--shop-primary)] px-3 py-1 text-xs font-semibold text-white">
                                    {lineItemCount} item{lineItemCount !== 1 ? 's' : ''}
                                </span>
                                {totalSavings > 0 && (
                                    <m.div
                                        initial={reduceMotion ? false : { opacity: 0, y: -16 }}
                                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                                        className="inline-flex items-center gap-2 rounded-full bg-[color:var(--shop-action-soft)] px-4 py-2 text-sm font-semibold text-[color:var(--shop-action)]"
                                    >
                                        <Sparkles className="h-4 w-4" />
                                        Saving {formatINR(totalSavings)}
                                    </m.div>
                                )}
                            </div>
                            <p className="mt-2 text-sm text-[color:var(--shop-ink-muted)]">
                                Review your groceries, confirm fees, and head to checkout.
                            </p>
                        </div>

                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[color:var(--shop-primary)] transition-colors hover:text-[color:var(--shop-primary-hover)] lg:self-auto"
                        >
                            Continue shopping
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.95fr)] lg:gap-5 lg:items-start">
                    <div className="space-y-4">
                        <FreeDeliveryBar subtotal={subtotal} threshold={FREE_DELIVERY_THRESHOLD} />

                        <div className="rounded-[22px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] p-4 shadow-[var(--shop-shadow-level-1)] lg:hidden">
                            {renderPromoBlock()}
                        </div>

                        <section className="rounded-[22px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] p-3.5 shadow-[var(--shop-shadow-level-1)] lg:hidden">
                            <div className="space-y-3">
                                <AnimatePresence initial={false}>
                                    {cart.items.map((item) => (
                                        <CartItemMobile
                                            key={item.productId}
                                            item={item}
                                            onQtyChange={(qty) => updateQty(item.productId, qty)}
                                            onRemove={() => removeFromCart(item.productId)}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </section>

                        <section className="hidden rounded-[22px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface-elevated)] p-3.5 shadow-[var(--shop-shadow-level-1)] lg:block">
                            <div className="space-y-4">
                                <AnimatePresence initial={false}>
                                    {cart.items.map((item) => (
                                        <CartItem
                                            key={item.productId}
                                            item={item}
                                            onQtyChange={(qty) => updateQty(item.productId, qty)}
                                            onRemove={() => removeFromCart(item.productId)}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </section>

                        <CartCrossSell
                            productIds={cartProductIds}
                            cartProductIds={cartProductIds}
                        />

                        <div className="rounded-[12px] border border-[color:color-mix(in srgb, var(--shop-primary) 15%, transparent)] bg-[color:var(--shop-primary-soft)] px-4 py-3 text-[13px] font-medium text-[color:var(--shop-primary)] lg:hidden">
                            🛒 {WEEKLY_CUSTOMERS} Kolkata families ordered on Grolin this week
                        </div>

                        <CartSummary
                            className="lg:hidden"
                            subtotal={subtotal}
                            deliveryFee={deliveryFee}
                            platformFee={PLATFORM_FEE}
                            discount={coupon.discount}
                            savings={totalSavings}
                            total={total}
                            itemCount={lineItemCount}
                            freeDeliveryThreshold={FREE_DELIVERY_THRESHOLD}
                        />
                    </div>

                    <aside className="hidden lg:block">
                        <div className="sticky top-[104px] space-y-4">
                            <div className="rounded-[12px] border border-[color:color-mix(in srgb, var(--shop-primary) 15%, transparent)] bg-[color:var(--shop-primary-soft)] px-4 py-3 text-[13px] font-medium text-[color:var(--shop-primary)]">
                                🛒 {WEEKLY_CUSTOMERS} Kolkata families ordered on Grolin this week
                            </div>
                            <CartSummary
                                subtotal={subtotal}
                                deliveryFee={deliveryFee}
                                platformFee={PLATFORM_FEE}
                                discount={coupon.discount}
                                savings={totalSavings}
                                total={total}
                                itemCount={lineItemCount}
                                onCheckout={() => router.push('/checkout')}
                                ctaLabel={'Proceed to Checkout \u2192'}
                                promoContent={renderPromoBlock()}
                                freeDeliveryThreshold={FREE_DELIVERY_THRESHOLD}
                            />
                        </div>
                    </aside>
                </div>
            </div>

            <CartStickyBar
                itemCount={lineItemCount}
                total={total}
                savings={totalSavings}
                onCheckout={() => router.push('/checkout')}
            />

            <CouponSheet
                isOpen={showCouponSheet}
                onClose={() => setShowCouponSheet(false)}
                onApply={(code) => {
                    applyCoupon(code)
                    setShowCouponSheet(false)
                }}
                appliedCode={coupon.code}
                isValidating={isValidating}
                onRemove={removeCoupon}
            />
        </>
    )
}

