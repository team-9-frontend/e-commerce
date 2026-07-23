import { LuCircleCheckBig, LuPackage, LuShoppingBag } from 'react-icons/lu'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@repo/ui'

export default function OrderSuccess() {
  const { id } = useParams()
  const orderId = id?.slice(-8)

  return (
    <div className="flex-center flex-1 flex-col py-8 text-center">
      <div className="flex-center mb-8 size-20 rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-400">
        <LuCircleCheckBig className="size-10" />
      </div>

      <h1 className="mb-2 text-3xl font-bold">Order Placed Successfully!</h1>
      <p className="mb-6 text-neutral-500">
        Thank you for your purchase. Your order has been confirmed.
      </p>

      <p className="mb-8 text-sm text-neutral-500">
        Order ID:{' '}
        <span className="text-accent-600 dark:text-accent-400 font-medium uppercase">
          #{orderId}
        </span>
      </p>

      <div className="flex-center flex-wrap gap-4">
        <Link to={`/orders/${id}`} className="text-inherit">
          <Button>
            <LuPackage /> Track My Order
          </Button>
        </Link>

        <Link to="/products" className="text-inherit">
          <Button variant="outline">
            <LuShoppingBag /> Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
