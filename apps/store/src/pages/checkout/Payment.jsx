import { useEffect, useState } from 'react'

import { LuLoaderCircle } from 'react-icons/lu'
import { useLocation, useNavigate } from 'react-router-dom'

import CardForm from '@/components/checkout/CardForm'
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector'
import { Elements, stripePromise } from '@/lib/stripe'

import { useCreateOrder } from '@repo/api'
import { Button } from '@repo/ui'

export default function Payment() {
  const [method, setMethod] = useState('cash')
  const navigate = useNavigate()
  const location = useLocation()

  const { shippingAddress, customerNote } = location.state || {}

  const { mutate: createOrder, isPending } = useCreateOrder()

  const placeOrder = () => {
    createOrder(
      {
        shippingAddress,
        customerNote,
        paymentMethod: method,
      },
      {
        onSuccess: (data) => navigate(`/order-success/${data.order._id}`),
      },
    )
  }

  useEffect(() => {
    if (!shippingAddress) return navigate('/checkout')
  }, [shippingAddress, navigate])

  return (
    <div className="flex-center flex-1 py-8 text-center">
      <div className="card w-full max-w-md p-6">
        <h1 className="mb-2 text-3xl font-bold">Payment</h1>
        <p className="mb-6 text-neutral-500">Choose your payment method.</p>

        <div className="flex flex-col gap-4">
          <PaymentMethodSelector value={method} setValue={setMethod} />

          {method === 'cash' && (
            <Button onClick={() => placeOrder()} disabled={isPending} className="w-full">
              {isPending ? <LuLoaderCircle className="h-[1.5em] animate-spin" /> : 'Place Order'}
            </Button>
          )}

          {method === 'stripe' &&
            (stripePromise ? (
              <Elements stripe={stripePromise}>
                <CardForm isSubmitting={isPending} onSuccess={() => placeOrder()} />
              </Elements>
            ) : (
              <p className="mt-2 text-center text-sm font-medium text-red-600 capitalize dark:text-red-400">
                Stripe is not configured yet. Use cash on delivery for now.
              </p>
            ))}
        </div>
      </div>
    </div>
  )
}
