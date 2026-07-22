import { useState } from 'react'

import { CardElement, useElements, useStripe } from '@/lib/stripe'

import { Button } from '@repo/ui'

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
      return
    }

    onSuccess(paymentMethod.id)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-gray-300 bg-white p-4">
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={!stripe || isSubmitting} className="w-full">
        {isSubmitting ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  )
}
