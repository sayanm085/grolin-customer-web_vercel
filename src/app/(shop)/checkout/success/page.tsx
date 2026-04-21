import { redirect } from 'next/navigation'

export default function CheckoutSuccessRedirectPage({
    searchParams,
}: {
    searchParams: { orderId?: string; isFirst?: string }
}) {
    const orderId = typeof searchParams.orderId === 'string' ? searchParams.orderId : ''

    if (!orderId) {
        redirect('/orders')
    }

    const params = new URLSearchParams({ orderId })
    if (typeof searchParams.isFirst === 'string') {
        params.set('isFirst', searchParams.isFirst)
    }

    redirect(`/order-confirmed?${params.toString()}`)
}
