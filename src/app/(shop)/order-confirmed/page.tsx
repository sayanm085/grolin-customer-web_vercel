import { redirect } from 'next/navigation'
import { OrderConfirmedExperience } from '@/components/order/OrderConfirmedExperience'

export default function OrderConfirmedPage({
    searchParams,
}: {
    searchParams: { orderId?: string; isFirst?: string }
}) {
    const orderId = typeof searchParams.orderId === 'string' ? searchParams.orderId.trim() : ''

    if (!orderId) {
        redirect('/orders')
    }

    return (
        <OrderConfirmedExperience
            orderId={orderId}
            isFirstOrder={searchParams.isFirst === 'true'}
        />
    )
}
