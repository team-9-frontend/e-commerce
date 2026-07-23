import { LuArrowLeft } from 'react-icons/lu'
import { Link, useParams } from 'react-router-dom'

import CancelOrderButton from '@/components/order/CancelOrderButton'
import OrderItems from '@/components/order/OrderItems'
import OrderProgress from '@/components/order/OrderProgress'
import PaymentSummary from '@/components/order/PaymentSummary'
import ShippingAddress from '@/components/order/ShippingAddress'

import { useGetOrderById } from '@repo/api'
import { Button, Error, LoadingSpinner } from '@repo/ui'

export default function DynamicOrder() {
  const { id } = useParams()

  const { data, isLoading, isError, error } = useGetOrderById(id)
  const order = data?.order

  return isLoading ? (
    <div className="flex-center flex-1 py-8 ">
      <LoadingSpinner className="size-24" />
    </div>
  ) : (
    <div className="flex flex-1 flex-col gap-4 py-8">
      <div className="card relative flex items-center justify-between gap-4 p-4">
        <div className="from-accent-500/10 pointer-events-none absolute inset-0 bg-linear-to-l via-transparent to-transparent" />

        <div className="flex gap-4">
          <div className="bg-accent-600 dark:bg-accent-400 w-2 rounded-full" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold sm:text-3xl">Order Details</h2>
            <p className="text-sm text-neutral-500">
              Order ID:{' '}
              <span className="text-accent-600 dark:text-accent-400 font-medium uppercase">
                #{order._id.slice(-8)}
              </span>
            </p>
          </div>
        </div>

        <Link to="/orders">
          <Button variant="ghost">
            <LuArrowLeft /> Go Back
          </Button>
        </Link>
      </div>

      {isError ? (
        <Error message={error?.message} />
      ) : (
        <>
          <OrderProgress status={order.status} />

          <OrderItems items={order.items} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ShippingAddress address={order.shippingAddress} />

            <PaymentSummary order={order} />
          </div>

          <CancelOrderButton order={order} />
        </>
      )}
    </div>
  )
}
