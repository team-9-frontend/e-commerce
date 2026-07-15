import { format } from 'date-fns'
import { LuX } from 'react-icons/lu'
import { useUpdateOrderStatus } from '@/api'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import FormField from '@/components/ui/FormField'
import { useForm } from '@/utils/forms'

const statusColors = {
  pending: 'amber',
  processing: 'sky',
  confirmed: 'teal',
  shipped: 'purple',
  delivered: 'emerald',
  cancelled: 'rose',
  returned: 'sky',
  paid: 'teal',
  failed: 'rose',
  refunded: 'purple',
  cash: 'emerald',
  stripe: 'sky',
}

export default function OrdersDialog({ selectedOrder, setSelectedOrder }) {
  if (!selectedOrder) return

  const { mutate: updateStatus, isPending } = useUpdateOrderStatus()

  const { register, handleSubmit } = useForm({ mode: 'onTouched' })

  return (
    <Dialog
      position="right"
      isOpen={selectedOrder}
      setIsOpen={setSelectedOrder}
      title={
        <div className="flex flex-col">
          order detail
          <h2 className="text-xs font-medium text-neutral-600">#{selectedOrder?._id}</h2>
        </div>
      }
    >
      <div className="flex w-full items-center justify-between border-t border-neutral-200 pt-4">
        <div className="flex-center gap-2">
          <Badge color={statusColors[selectedOrder?.status]} className="flex-center gap-2">
            <span className="text-xl leading-0">•</span> {selectedOrder?.status}
          </Badge>

          <Badge color={statusColors[selectedOrder?.paymentStatus]} className="flex-center gap-2">
            <span className="text-xl leading-0">•</span> {selectedOrder?.paymentStatus}
          </Badge>
        </div>

        <span className="text-sm text-neutral-600">{selectedOrder?.paymentMethod}</span>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xs font-medium text-neutral-600 uppercase">info</h2>

        <div className="card divide-y divide-neutral-200">
          <div className="flex items-center justify-between p-3 px-4 text-sm">
            <h2 className="font-medium text-neutral-600">Placed</h2>
            <p className="font-medium">{format(selectedOrder?.createdAt, 'MMM d, yyyy')}</p>
          </div>
          <div className="flex items-center justify-between p-3 px-4 text-sm">
            <h2 className="font-medium text-neutral-600">Customer</h2>
            <p className="font-medium">{selectedOrder?.user?.username || '-'}</p>
          </div>
          <div className="flex items-center justify-between p-3 px-4 text-sm">
            <h2 className="font-medium text-neutral-600">Email</h2>
            <p className="font-medium">{selectedOrder?.user?.email || '-'}</p>
          </div>
          <div className="flex items-center justify-between p-3 px-4 text-sm">
            <h2 className="font-medium text-neutral-600">Ship to</h2>
            <p className="font-medium">
              {selectedOrder?.shippingAddress.city} {selectedOrder?.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xs font-medium text-neutral-600 uppercase">items</h2>

        {selectedOrder?.items.map((item, i) => (
          <div key={i} className="card flex items-center justify-between p-4 shadow-sm">
            <div className="flex gap-2">
              <img
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="size-12 rounded-lg bg-neutral-300 object-cover"
              />
              <div className="flex-1">
                <h3 className="line-clamp-1 font-medium sm:text-lg">{item.name}</h3>
                <p className="line-clamp-1 flex items-center gap-1 text-xs text-neutral-600 capitalize">
                  <LuX /> <span>{`${item.quantity} • $${item.price}`}</span>
                </p>
              </div>
            </div>

            <span className="font-medium">${item.price}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="card divide-y divide-neutral-200">
          <div className="flex items-center justify-between p-3 px-4 text-sm">
            <h2 className="font-medium text-neutral-600">Subtotal</h2>
            <p className="font-medium">${selectedOrder?.subtotal}</p>
          </div>
          <div className="flex items-center justify-between p-3 px-4 text-sm">
            <h2 className="font-medium text-neutral-600">Shipping</h2>
            <p className="font-medium">${selectedOrder?.shippingFee}</p>
          </div>
          <div className="flex items-center justify-between p-3 px-4 text-sm">
            <h2 className="font-medium text-neutral-600">
              Tax ({Math.floor((selectedOrder?.tax / selectedOrder?.totalPrice) * 100)}%)
            </h2>
            <p className="font-medium">${selectedOrder?.tax}</p>
          </div>
          <div className="flex items-center justify-between p-3 px-4 text-sm">
            <h2 className="font-medium">Total</h2>
            <p className="font-medium">${selectedOrder?.totalPrice}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xs font-medium text-neutral-600 uppercase">Update status</h2>

        <form
          onSubmit={handleSubmit((data) => {
            updateStatus(
              { id: selectedOrder?._id, data },
              {
                onSuccess: () => {
                  setSelectedOrder(false)
                },
              },
            )
          })}
          className="card flex flex-col gap-4 p-4"
        >
          <FormField
            type="select"
            id="status"
            register={register}
            options={[
              'pending',
              'confirmed',
              'processing',
              'shipped',
              'delivered',
              'cancelled',
              'returned',
            ].filter((status) => status !== selectedOrder?.status)}
            defaultOption={selectedOrder?.status}
            defaultValue={selectedOrder?.status}
            className="card overflow-visible shadow-xs"
          />

          <FormField
            type="textarea"
            id="adminNote"
            register={register}
            placeholder="Admin Note (optional)..."
            className="card overflow-visible shadow-xs outline-none"
            rows={3}
          />

          <Button
            type="submit"
            disabled={isPending}
            variant="primary"
            className="flex-center"
          >
            {!isPending ? 'Save Changes' : 'Saving...'}
          </Button>
        </form>
      </div>
    </Dialog>
  )
}
