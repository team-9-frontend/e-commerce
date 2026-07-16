import { useMemo, useState } from 'react'

import { LuSearch } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

import OrdersDialog from '@/components/orders/OrdersDialog'

import { useGetAllOrders } from '@repo/api'
import { Badge, FormField, Pagination, Table } from '@repo/ui'
import { filterData, format } from '@repo/utils'
import { useSearchParamsForm } from '@repo/utils/forms'

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

const EMPTY_ORDERS = []

export default function AdminOrders() {
  const [selected, setSelected] = useState(null)

  const [searchParams] = useSearchParams()
  const { register, handleSubmit, updateParams, urlValues } = useSearchParamsForm({
    mode: 'onTouched',
  })

  const { search, status, payment, method } = urlValues

  const { data, isLoading, isError, error } = useGetAllOrders({ limit: 100 })
  const orders = data?.orders || EMPTY_ORDERS

  const filteredOrders = useMemo(() => {
    return filterData(orders, [
      {
        [search]: {
          fields: [
            '_id',
            (o) => o.user?.username,
            (o) => o.user?.email,
            (o) => o.shippingAddress?.city,
            (o) => o.shippingAddress?.country,
          ],
        },
      },
      { [status]: { fields: ['status'], exact: true } },
      { [payment]: { fields: ['paymentStatus'], exact: true } },
      { [method]: { fields: ['paymentMethod'], exact: true } },
    ])
  }, [orders, search, status, payment, method])

  const currentPage = searchParams.get('page') || 1
  const limit = 14
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

      <OrdersDialog order={selected} setOrder={setSelected} />
    </div>
  )
}
