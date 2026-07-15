import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { LuSearch } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'
import { useGetAllOrders, useUpdateOrderStatus } from '@/api'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import FormField from '@/components/ui/FormField'
import Pagination from '@/components/ui/Pagination'
import Table from '@/components/ui/Table'
import { useForm, useSearchParamsForm } from '@/utils/forms'

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

export default function AdminOrders() {
  const {
    register: dialogRegister,
    handleSubmit: dialogHandleSubmit,
    reset: resetDialogForm,
  } = useForm()
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus()
  const [selected, setSelected] = useState(null)

  const [searchParams] = useSearchParams()
  const { register, handleSubmit, updateParams, urlValues } = useSearchParamsForm()

  const { search, status, payment, method } = urlValues

  const { data, isLoading, isError, error } = useGetAllOrders({ limit: 100 })
  const orders = data?.orders || []

  const filteredOrders = useMemo(() => {
    if (!orders?.length) return []

    const query = search?.toLowerCase().trim()

    return orders.filter((order) => {
      if (status && order.status !== status) return false
      if (payment && order.paymentStatus !== payment) return false
      if (method && order.paymentMethod !== method) return false

      if (query) {
        const name = order.user?.username || ''

        return order._id?.toLowerCase().includes(query) || name.toLowerCase().includes(query)
      }

      return true
    })
  }, [orders, search, status, payment, method])

  const currentPage = searchParams.get('page') || 1
  const limit = 20
  const page = filteredOrders.slice((currentPage - 1) * limit, currentPage * limit)
  const totalPages = Math.ceil(filteredOrders.length / limit)

  const mappedOrders = useMemo(() => {
    return page.map((order) => ({
      onClick: () => {
        setSelected(order)
      },
      order: <span className="text-sm text-neutral-600 uppercase">#{order._id}</span>,
      customer: (
        <div className="flex items-center gap-4">
          <div className="flex-center size-8 rounded-full bg-neutral-50 text-xs">
            {String(order.user?.username).slice(0, 1)}
          </div>

          <div className="flex flex-col">
            <h3 className="font-medium">{order.user?.username || '-'}</h3>
            <p className="text-sm text-neutral-600">{order.user?.email || '-'}</p>
          </div>
        </div>
      ),
      date: (
        <span className="text-sm text-neutral-600">{format(order.createdAt, 'MMM d, yyyy')}</span>
      ),
      status: (
        <Badge color={statusColors[order.status]} className="flex-center w-fit gap-2">
          <span className="text-xl leading-0">•</span> {order.status}
        </Badge>
      ),
      payment: (
        <Badge color={statusColors[order.paymentStatus]} className="flex-center w-fit gap-2">
          <span className="text-xl leading-0">•</span> {order.paymentStatus}
        </Badge>
      ),
      method: (
        <Badge color={statusColors[order.paymentMethod]} className="flex-center w-fit gap-2">
          <span className="text-xl leading-0">•</span> {order.paymentMethod}
        </Badge>
      ),
      total: (
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          ${order.totalPrice}
        </span>
      ),
    }))
  }, [page])

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="card flex items-center justify-between p-4">
        <div className="space-y-2">
          <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
            orders
          </p>
          <h2 className="text-3xl">orders</h2>
          <p className="text-sm text-neutral-500">
            Manage your product inventory, view details, and update listings.
          </p>
        </div>
        <div className="card p-4 shadow-xs">
          {data?.total || 0} <span className="text-sm text-neutral-600">total orders</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(updateParams)}
        className="card flex items-center gap-4 p-4 max-sm:flex-col"
      >
        <FormField
          id="search"
          icon={<LuSearch />}
          placeholder="Search ID, customer..."
          register={register}
          className="w-full"
        />

        <div className="flex items-center gap-4 max-sm:w-full">
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
            ]}
            defaultOption="all statuses"
            className="flex-1 sm:w-fit"
          />

          <FormField
            type="select"
            id="payment"
            register={register}
            options={['pending', 'paid', 'failed', 'refunded']}
            defaultOption="all payments"
            className="flex-1 sm:w-fit"
          />

          <FormField
            type="select"
            id="method"
            register={register}
            options={['cash', 'stripe']}
            defaultOption="all methods"
            className="flex-1 sm:w-fit"
          />
        </div>
      </form>

      {isError ? (
        <div className="card p-4 text-neutral-500">{error?.message}</div>
      ) : (
        <Table
          columns={['order', 'customer', 'date', 'status', 'payment', 'method', 'total']}
          data={mappedOrders}
          isLoading={isLoading}
        />
      )}

      <Pagination totalPages={totalPages} className="mt-auto" />

      {!isLoading && (
        <Dialog
          position="right"
          isOpen={selected}
          setIsOpen={setSelected}
          title={
            <div className="flex flex-col">
              order detail
              <h2 className="text-xs font-medium text-neutral-600">#{selected?._id}</h2>
            </div>
          }
        >
          <div className="flex w-full items-center justify-between border-t border-neutral-200 pt-4">
            <div className="flex-center gap-2">
              <Badge color={statusColors[selected?.status]} className="flex-center gap-2">
                <span className="text-xl leading-0">•</span> {selected?.status}
              </Badge>

              <Badge color={statusColors[selected?.paymentStatus]} className="flex-center gap-2">
                <span className="text-xl leading-0">•</span> {selected?.paymentStatus}
              </Badge>
            </div>

            <span className="text-sm text-neutral-600">{selected?.paymentMethod}</span>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-medium text-neutral-600 uppercase">info</h2>

            <div className="card divide-y divide-neutral-200">
              <div className="flex items-center justify-between p-3 px-4 text-sm">
                <h2 className="font-medium text-neutral-600">Placed</h2>
                <p className="font-medium">
                  {selected && format(selected?.createdAt, 'MMM d, yyyy')}
                </p>
              </div>
              <div className="flex items-center justify-between p-3 px-4 text-sm">
                <h2 className="font-medium text-neutral-600">Customer</h2>
                <p className="font-medium">{selected?.user?.username || '-'}</p>
              </div>
              <div className="flex items-center justify-between p-3 px-4 text-sm">
                <h2 className="font-medium text-neutral-600">Email</h2>
                <p className="font-medium">{selected?.user?.email || '-'}</p>
              </div>
              <div className="flex items-center justify-between p-3 px-4 text-sm">
                <h2 className="font-medium text-neutral-600">Ship to</h2>
                <p className="font-medium">
                  {selected?.shippingAddress?.city} {selected?.shippingAddress?.country}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-medium text-neutral-600 uppercase">items</h2>

            {Array.from({ length: selected?.items?.length || 5 }).forEach((_, i) => {
              const item = selected?.items?.[i]

              return (
                <div className="card flex items-center justify-between p-4 shadow-sm">
                  <div className="flex gap-2">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      width={48}
                      height={48}
                      className="size-12 rounded-lg bg-neutral-300 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="line-clamp-1 font-bold sm:text-lg">{item?.name}</h3>
                      <p className="line-clamp-1 text-sm text-neutral-700 capitalize">
                        {`x ${item?.quantity} • $${item?.price}`}
                      </p>
                    </div>
                  </div>

                  <span className="font-medium">{item?.price}</span>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-2">
            <div className="card divide-y divide-neutral-200">
              <div className="flex items-center justify-between p-3 px-4 text-sm">
                <h2 className="font-medium text-neutral-600">Subtotal</h2>
                <p className="font-medium">${selected?.subtotal}</p>
              </div>
              <div className="flex items-center justify-between p-3 px-4 text-sm">
                <h2 className="font-medium text-neutral-600">Shipping</h2>
                <p className="font-medium">${selected?.shippingFee}</p>
              </div>
              <div className="flex items-center justify-between p-3 px-4 text-sm">
                <h2 className="font-medium text-neutral-600">
                  Tax ({Math.floor((selected?.tax / selected?.totalPrice) * 100)}%)
                </h2>
                <p className="font-medium">${selected?.tax}</p>
              </div>
              <div className="flex items-center justify-between p-3 px-4 text-sm">
                <h2 className="font-medium">Total</h2>
                <p className="font-medium">${selected?.totalPrice}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-medium text-neutral-600 uppercase">Update status</h2>

            <form
              onSubmit={dialogHandleSubmit((data) => {
                updateStatus(
                  { id: selected?._id, data },
                  {
                    onSuccess: () => {
                      setSelected(false)
                      resetDialogForm()
                    },
                  },
                )
              })}
              className="card flex flex-col gap-4 p-4"
            >
              <FormField
                type="select"
                id="status"
                register={dialogRegister}
                options={[
                  'pending',
                  'confirmed',
                  'processing',
                  'shipped',
                  'delivered',
                  'cancelled',
                  'returned',
                ].filter((status) => status !== selected?.status)}
                defaultOption={selected?.status}
                defaultValue={selected?.status}
                className="card overflow-visible shadow-sm"
              />

              <FormField
                type="textarea"
                id="adminNote"
                register={dialogRegister}
                placeholder="Admin Note (optional)..."
                className="card overflow-visible shadow-sm"
                rows={3}
              />

              <Button
                type="submit"
                disabled={isPending}
                variant="neutralPrimary"
                className="flex-center"
              >
                {!isPending ? 'Save Changes' : 'Saving...'}
              </Button>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  )
}
