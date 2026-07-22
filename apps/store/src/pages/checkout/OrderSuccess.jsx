import { Link, useLocation } from 'react-router-dom'

import { Button } from '@repo/ui'

export default function OrderSuccess() {
  const { state } = useLocation()
  const order = state?.order

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-md">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">Order placed successfully</h1>
        <p className="mb-6 text-gray-600">
          Thank you for your purchase. Your order is being processed and a confirmation will be
          sent to you shortly.
        </p>

        {order?.id && (
          <p className="mb-6 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700">
            Order ID: <span className="font-semibold">{order.id}</span>
          </p>
        )}

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/orders">
            <Button className="w-full">View Orders</Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
