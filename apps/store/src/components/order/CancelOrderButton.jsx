import { useState } from 'react'

import { FaTimesCircle } from 'react-icons/fa'
import { LuLoaderCircle } from 'react-icons/lu'

import { useCancelOrder } from '@repo/api'
import { Button, ConfirmDialog } from '@repo/ui'

export default function CancelOrderButton({ order }) {
  const [cancel, setCancel] = useState(false)
  const { mutate: cancelOrder, isPending } = useCancelOrder()

  const canCancel = order.status === 'pending' || order.status === 'confirmed'

  return (
    canCancel && (
      <>
        <div className="flex-center mt-4">
          <Button variant="outlineDanger" onClick={() => setCancel(true)} disabled={isPending}>
            {isPending ? (
              <LuLoaderCircle className="h-[1.5em] animate-spin" />
            ) : (
              <>
                <FaTimesCircle />
                Cancel Order
              </>
            )}
          </Button>
        </div>

        <ConfirmDialog
          isOpen={cancel}
          setIsOpen={setCancel}
          onConfirm={() => {
            cancelOrder(order._id, {
              onSuccess: () => setCancel(false),
            })
          }}
          isLoading={isPending}
        ></ConfirmDialog>
      </>
    )
  )
}
