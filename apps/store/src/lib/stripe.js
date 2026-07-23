import { loadStripe } from '@stripe/stripe-js'

export * from '@stripe/stripe-js'
export * from '@stripe/react-stripe-js'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

export const stripePromise = publishableKey ? loadStripe(publishableKey) : null
