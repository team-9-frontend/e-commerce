import { LuCircleCheckBig, LuPackage, LuShoppingBag } from 'react-icons/lu'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@repo/ui'

export default function OrderSuccess() {
  const { id } = useParams()
  const orderId = id?.slice(-8).toUpperCase()

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-lg p-4 text-center">
        <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
          <LuCircleCheckBig className="size-10" />
        </div>
        <h1 className="mb-3 text-3xl font-bold">Order Placed Successfully!</h1>
        <p className="mb-6 font-medium text-neutral-500">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="mb-6 sm:mb-10 flex items-center justify-center gap-2">
          <span className="text-sm font-medium text-neutral-500">Order ID:</span>
          <span className="text-accent-500 text-sm font-medium">#{orderId}</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to={`/profile/orders/${id}`} className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="border-accent-500 text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-950/20 w-full"
              icon={<LuPackage className="size-4.5" />}
            >
              Track My Order
            </Button>
          </Link>

          <Link to="/products" className="w-full sm:w-auto">
            <Button
              variant="primary"
              className="bg-accent-600 hover:bg-accent-700 dark:bg-accent-500 dark:hover:bg-accent-400 w-full"
              icon={<LuShoppingBag className="size-4.5" />}
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
