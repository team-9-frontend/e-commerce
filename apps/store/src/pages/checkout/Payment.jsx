import { useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import CardForm from '@/components/checkout/CardForm'
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector'
import { Elements, stripePromise } from '@/lib/stripe'

import { useCreateOrder } from '@repo/api'
import { Button } from '@repo/ui'

export default function Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const { shippingAddress, customerNote } = location.state || {}

  const [method, setMethod] = useState('cash')
  const { mutate: createOrder, isPending } = useCreateOrder()

  const placeOrder = (extra = {}) => {
    createOrder(
      {
        shippingAddress,
        customerNote,
        paymentMethod: method,
        ...extra,
      },
      {
        onSuccess: () => navigate('/order-success'),
      },
    )
  }

  useEffect(() => {
    if (!shippingAddress) return navigate('/checkout')
  }, [shippingAddress, navigate])

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">Payment</h1>

        <div className="space-y-6 rounded-2xl bg-white p-8 shadow-md">
          <PaymentMethodSelector value={method} onChange={setMethod} />

          {method === 'cash' && (
            <Button onClick={() => placeOrder()} disabled={isPending} className="w-full">
              {isPending ? 'Placing Order...' : 'Place Order'}
            </Button>
          )}

          {method === 'stripe' && (
            <Elements stripe={stripePromise}>
              <CardForm
                isSubmitting={isPending}
                onSuccess={(paymentMethodId) =>
                  placeOrder({ stripePaymentMethodId: paymentMethodId })
                }
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  )
}
