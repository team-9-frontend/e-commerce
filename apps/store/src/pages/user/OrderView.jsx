import { useParams } from 'react-router-dom'

import CancelOrderButton from '@/components/orders/CancelOrderButton'
import OrderItems from '@/components/orders/OrderItems'
import OrderProgress from '@/components/orders/OrderProgress'
import PaymentSummary from '@/components/orders/PaymentSummary'
import ShippingAddress from '@/components/orders/ShippingAddress'

import { useGetOrderById } from '@repo/api'
import { LoadingSpinner } from '@repo/ui'

export default function DynamicOrder() {
  const { id } = useParams()

  const { data, isLoading, isError } = useGetOrderById(id)

  if (isLoading) return <LoadingSpinner />

  if (isError) return <h2>Something went wrong.</h2>

  const order = data?.order

  return (
    <div className="mx-auto w-3/4 p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Order Details</h1>

          <p className="mt-1 text-sm text-slate-500">Order #{order._id.slice(-8).toUpperCase()}</p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          {order.status}
        </span>
      </div>
      {order.status !== 'cancelled' && <OrderProgress status={order.status} />}
      <OrderItems items={order.items} />
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <ShippingAddress address={order.shippingAddress} />

        <PaymentSummary order={order} />
      </div>
      <CancelOrderButton order={order} />
    </div>
  )
}
