import { useState } from 'react'

import { LuLoaderCircle } from 'react-icons/lu'

import { CardElement, useElements, useStripe } from '@/lib/stripe'

import { Button } from '@repo/ui'
import { toast } from '@repo/utils/toasts'

export default function CardForm({ onSuccess, isSubmitting }) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setError('')
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    if (stripeError) {
      setError(stripeError.message)
      toast.error(stripeError.message)
      return
    }

    onSuccess(paymentMethod.id)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:bg-neutral-800">
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>

      <Button type="submit" disabled={!stripe || isSubmitting} className="w-full">
        {isSubmitting ? <LuLoaderCircle className="h-[1.5em] animate-spin" /> : 'Pay Now'}
      </Button>

      {error && (
        <p className="mt-6 text-center text-sm font-medium text-red-600 capitalize dark:text-red-400">
          {error}
        </p>
      )}
    </form>
  )
}
