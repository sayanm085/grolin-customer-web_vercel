'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ShieldCheck } from 'lucide-react'
import {
    AddressStep,
    OrderSummaryPanel,
    PaymentStep,
    ReviewStep,
    StepIndicator,
    StickySummaryBar,
} from '@/components/checkout'
import { DEFAULT_DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, PLATFORM_FEE } from '@/lib/constants'
import { QUERY_KEYS } from '@/lib/queryKeys'
import { loadRazorpay, openRazorpayCheckout } from '@/lib/razorpay'
import { formatINR } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { useCoupon } from '@/hooks/useCoupon'
import { cartService } from '@/services/cart.service'
import { authService } from '@/services/auth.service'
import { ordersService } from '@/services/orders.service'
import { paymentsService } from '@/services/payments.service'
import { walletService } from '@/services/wallet.service'
import { useAuthStore } from '@/store/auth.store'
import { useCouponStore } from '@/store/coupon.store'
import { toast } from 'sonner'
import type { Address } from '@/types/address.types'
import type { PaymentMethod } from '@/types/order.types'

type Step = 'address' | 'payment' | 'review'

const STEPS: Step[] = ['address', 'payment', 'review']
const STEP_LABELS: Record<Step, string> = {
    address: 'Address',
    payment: 'Payment',
    review: 'Review',
}

export default function CheckoutPage() {
    const router = useRouter()
    const user = useAuthStore((state) => state.user)
    const clearCoupon = useCouponStore((state) => state.clearCoupon)
    const { cart } = useCart()

    const [step, setStep] = useState<Step>('address')
    const [selectedAddr, setSelectedAddr] = useState<Address | null>(null)
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ONLINE')
    const [deliveryNotes, setDeliveryNotes] = useState('')
    const [isPlacing, setIsPlacing] = useState(false)

    const { data: walletBalanceData, isLoading: walletBalanceLoading } = useQuery({
        queryKey: QUERY_KEYS.wallet(),
        queryFn: walletService.getBalance,
        enabled: !!user,
    })

    const walletBalance = walletBalanceData?.balance ?? 0
    const subtotal = cart?.subtotal ?? 0
    const { coupon } = useCoupon(subtotal)
    const couponDiscount = coupon.isValid ? Math.min(coupon.discount, subtotal) : 0
    const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DEFAULT_DELIVERY_FEE
    const total = Math.max(0, subtotal + deliveryFee + PLATFORM_FEE - couponDiscount)
    const stepIndex = STEPS.indexOf(step)
    const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0
    const securityNote = step === 'review' ? '\u{1F512} Secured by Razorpay \u00B7 100% payment protection' : undefined

    useEffect(() => {
        document.title = 'Checkout \u2014 Grolin Grocery'
    }, [])

    useEffect(() => {
        if (paymentMethod === 'WALLET' && walletBalance < total) {
            setPaymentMethod('ONLINE')
        }
    }, [paymentMethod, total, walletBalance])

    const handlePlaceOrder = async () => {
        if (!selectedAddr) {
            toast.error('Please select an address')
            return
        }

        setIsPlacing(true)

        try {
            const validation = await cartService.validate()
            if (!validation.valid) {
                toast.error('Some items changed. Please review cart.')
                router.push('/cart')
                return
            }

            const order = await ordersService.place({
                addressId: selectedAddr.id,
                paymentMethod,
                couponCode: coupon.isValid ? coupon.code ?? undefined : undefined,
                deliveryNotes: deliveryNotes.trim() || undefined,
            })

            const getOrderConfirmedUrl = async () => {
                let isFirst = false

                try {
                    const stats = await authService.getStats()
                    isFirst = stats.total_orders === 1
                } catch {
                    isFirst = false
                }

                const params = new URLSearchParams({ orderId: order.id })
                if (isFirst) {
                    params.set('isFirst', 'true')
                }

                return `/order-confirmed?${params.toString()}`
            }

            if (paymentMethod === 'ONLINE') {
                await loadRazorpay()
                const razorpayOrder = await paymentsService.createOrder(order.id)

                await openRazorpayCheckout({
                    amount: razorpayOrder.amount,
                    currency: 'INR',
                    orderId: razorpayOrder.razorpayOrderId,
                    keyId: razorpayOrder.keyId,
                    userPhone: user?.phone ?? '',
                    userName: user?.name ?? '',
                    onSuccess: async (payment) => {
                        await paymentsService.verify({
                            razorpayOrderId: payment.razorpay_order_id,
                            razorpayPaymentId: payment.razorpay_payment_id,
                            razorpaySignature: payment.razorpay_signature,
                        })
                        clearCoupon()
                        router.push(await getOrderConfirmedUrl())
                    },
                    onDismiss: () => {
                        setIsPlacing(false)
                        toast.error('Payment cancelled. Order saved \u2014 retry from Orders page.')
                    },
                })

                return
            }

            if (paymentMethod === 'WALLET') {
                const walletPayment = await walletService.pay(order.id)
                if (!walletPayment) {
                    setIsPlacing(false)
                    toast.error('Wallet payment failed. Please try again.')
                    return
                }
            }

            clearCoupon()
            router.push(await getOrderConfirmedUrl())
        } catch {
            toast.error('Could not place order')
            setIsPlacing(false)
        }
    }

    const ctaLabel = getCheckoutCtaLabel(step, total)
    const isPrimaryDisabled =
        step === 'address'
            ? !selectedAddr
            : step === 'review'
                ? !selectedAddr || isPlacing
                : false

    const handlePrimaryAction = () => {
        if (step === 'address') {
            if (!selectedAddr) return
            setStep('payment')
            return
        }

        if (step === 'payment') {
            setStep('review')
            return
        }

        void handlePlaceOrder()
    }

    const stepContent = {
        address: {
            eyebrow: 'Delivery',
            title: 'Choose where to deliver',
            description: 'Select a saved address or add a new one for this order.',
        },
        payment: {
            eyebrow: 'Payment',
            title: 'Choose how you want to pay',
            description: 'Pick a secure payment option and add any delivery note.',
        },
        review: {
            eyebrow: 'Review',
            title: 'Review before you place the order',
            description: 'Confirm your address, payment method, and final pricing.',
        },
    }[step]

    return (
        <div className="min-h-screen pb-36 lg:pb-10">
            <div className="page-enter mx-auto max-w-[1280px] px-3.5 py-4 sm:px-5 lg:px-6 lg:py-8">
                <div className="mb-4 rounded-[24px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-4 py-4 shadow-[var(--shop-shadow-level-2)] sm:px-6 sm:py-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex h-11 w-11 items-center justify-center rounded-[16px] text-base font-bold text-white shadow-[var(--shop-shadow-level-2)] sm:h-12 sm:w-12 sm:text-lg"
                                style={{ backgroundImage: 'var(--shop-gradient-hero)' }}
                            >
                                G
                            </div>
                            <span className="text-[24px] font-bold tracking-[-0.04em] text-[color:var(--shop-ink)]">
                                Grolin
                            </span>
                        </div>

                        <div className="w-full lg:max-w-[560px]">
                            <StepIndicator steps={Object.values(STEP_LABELS)} currentStep={stepIndex} />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-12 lg:gap-6 lg:items-start">
                    <div className="space-y-4 lg:col-span-7 lg:space-y-5">
                        <section className="rounded-[24px] border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] p-4 shadow-[var(--shop-shadow-level-2)] sm:rounded-[28px] sm:p-6">
                            <div className="mb-6">
                                <p className="eyebrow text-[color:var(--shop-primary)]">
                                    {stepContent.eyebrow}
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--shop-ink)]">
                                    {stepContent.title}
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-[color:var(--shop-ink-muted)]">
                                    {stepContent.description}
                                </p>
                            </div>

                            {step === 'address' && (
                                <AddressStep
                                    selectedId={selectedAddr?.id ?? null}
                                    onSelect={setSelectedAddr}
                                />
                            )}

                            {step === 'payment' && (
                                <PaymentStep
                                    selected={paymentMethod}
                                    onSelect={setPaymentMethod}
                                    total={total}
                                    walletBalance={walletBalance}
                                    deliveryNotes={deliveryNotes}
                                    onDeliveryNotesChange={setDeliveryNotes}
                                    walletBalanceLoading={walletBalanceLoading}
                                />
                            )}

                            {step === 'review' && (
                                <ReviewStep
                                    items={cart?.items ?? []}
                                    address={selectedAddr}
                                    paymentMethod={paymentMethod}
                                    subtotal={subtotal}
                                    deliveryFee={deliveryFee}
                                    platformFee={PLATFORM_FEE}
                                    discount={couponDiscount}
                                    total={total}
                                    deliveryNotes={deliveryNotes.trim() || undefined}
                                />
                            )}
                        </section>

                        {step !== 'address' && (
                            <button
                                type="button"
                                onClick={() => setStep(step === 'payment' ? 'address' : 'payment')}
                                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--shop-border)] bg-[color:var(--shop-surface)] px-4 py-2.5 text-sm font-medium text-[color:var(--shop-ink-muted)] transition-colors hover:bg-[color:var(--shop-surface-subtle)]"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                {step === 'payment' ? 'Back to Address' : 'Back to Payment'}
                            </button>
                        )}
                    </div>

                    <aside className="hidden lg:col-span-5 lg:block">
                        <div className="sticky top-6 space-y-4">
                            <OrderSummaryPanel
                                subtotal={subtotal}
                                deliveryFee={deliveryFee}
                                platformFee={PLATFORM_FEE}
                                discount={couponDiscount}
                                total={total}
                                itemCount={itemCount}
                                ctaLabel={ctaLabel}
                                onAction={handlePrimaryAction}
                                actionDisabled={isPrimaryDisabled}
                                actionLoading={isPlacing}
                                freeDeliveryThreshold={FREE_DELIVERY_THRESHOLD}
                                stageLabel={`Step ${stepIndex + 1} of ${STEPS.length}`}
                                securityNote={securityNote}
                            />

                            <div className="rounded-[24px] border border-[rgba(22,163,74,0.18)] bg-[rgba(240,253,244,0.9)] p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[color:var(--shop-success)]">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[color:var(--shop-ink)]">Trusted checkout</p>
                                        <p className="mt-1 text-sm text-[color:var(--shop-ink-muted)]">
                                            Clear pricing, protected payments, and support if plans change.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <div className="lg:hidden">
                <StickySummaryBar
                    total={total}
                    itemCount={itemCount}
                    ctaLabel={ctaLabel}
                    onCtaClick={handlePrimaryAction}
                    disabled={isPrimaryDisabled}
                    loading={isPlacing}
                    securityNote={securityNote}
                >
                    <OrderSummaryPanel
                        subtotal={subtotal}
                        deliveryFee={deliveryFee}
                        platformFee={PLATFORM_FEE}
                        discount={couponDiscount}
                        total={total}
                        itemCount={itemCount}
                        ctaLabel={ctaLabel}
                        onAction={handlePrimaryAction}
                        actionDisabled={isPrimaryDisabled}
                        actionLoading={isPlacing}
                        freeDeliveryThreshold={FREE_DELIVERY_THRESHOLD}
                        stageLabel={`Step ${stepIndex + 1} of ${STEPS.length}`}
                    />
                </StickySummaryBar>
            </div>
        </div>
    )
}

function getCheckoutCtaLabel(step: Step, total: number) {
    if (step !== 'review') return 'Continue \u2192'
    return `Place Order \u2014 ${formatINR(total)}`
}



