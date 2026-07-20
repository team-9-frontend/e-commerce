import { FaTimesCircle } from 'react-icons/fa'
import { LuLoaderCircle } from 'react-icons/lu'

import { useCancelOrder } from '@repo/api'

export default function CancelOrderButton({ order }) {
  const { mutate, isPending } = useCancelOrder()

  const canCancel = order.status === 'pending' || order.status === 'confirmed'

  if (!canCancel) return null

  const handleCancel = () => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?')

    if (!confirmed) return

    mutate(order._id)
  }

  return (
    <div className="mt-8 text-center">
      <button
        onClick={handleCancel}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaTimesCircle />

        {isPending ? <LuLoaderCircle className="h-[1.5em] animate-spin" /> : 'Cancel Order'}
      </button>
    </div>
  )
}
