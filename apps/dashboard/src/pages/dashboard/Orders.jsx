import { useMemo, useState } from 'react'

import { LuSearch } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

import OrdersDialog from '@/components/orders/OrdersDialog'

import { useGetAllOrders } from '@repo/api'
import { Badge, Error, FormField, Pagination, Table } from '@repo/ui'
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

const EMPTY_ARRAY = []

export default function AdminOrders() {
  const [selected, setSelected] = useState(null)

  const [searchParams] = useSearchParams()
  const { register, handleSubmit, updateParams, urlValues } = useSearchParamsForm({
    mode: 'onTouched',
    unDebouncedFields: ['status', 'payment', 'method'],
  })
  const { search, status, payment, method } = urlValues

  const currentPage = searchParams.get('page') || 1
  const limit = 15
  const apiLimit = 120
  const apiPage = Math.ceil((currentPage * limit) / apiLimit)
  const localPageIndex = (currentPage - 1) % (apiLimit / limit)
  const startIndex = localPageIndex * limit

  const { data, isLoading, isError, error } = useGetAllOrders({
    page: apiPage,
    limit: apiLimit,
  })
  const orders = data?.orders || EMPTY_ARRAY

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

  const page = filteredOrders.slice(startIndex, startIndex + limit)
  const totalPages = Math.ceil(filteredOrders.length / limit)

  const mappedOrders = useMemo(() => {
    return page.map((order) => ({
      onClick: () => {
        setSelected(order)
      },
      order: <span className="text-sm text-neutral-600 uppercase">#{order._id}</span>,
      customer: (
        <div className="flex items-center gap-4">
          <div className="flex-center size-8 rounded-full bg-neutral-200 text-xs">
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
        <Badge color={statusColors[order.status]}>
          <span className="align-middle text-2xl leading-0">•</span>
          <span> {order.status}</span>
        </Badge>
      ),
      payment: (
        <Badge color={statusColors[order.paymentStatus]}>
          <span className="align-middle text-2xl leading-0">•</span>
          <span> {order.paymentStatus}</span>
        </Badge>
      ),
      method: (
        <Badge color={statusColors[order.paymentMethod]}>
          <span className="align-middle text-2xl leading-0">•</span>
          <span> {order.paymentMethod}</span>
        </Badge>
      ),
      total: (
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          ${order.totalPrice}
        </span>
      ),
    }))
  }, [page, currentPage])

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="card flex items-center justify-between gap-8 p-4 max-sm:flex-col max-sm:items-end">
        <div className="space-y-2 max-sm:w-full">
          <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
            orders
          </p>
          <h2 className="text-2xl font-medium sm:text-3xl">Orders</h2>
          <p className="text-sm text-neutral-500">
            Manage your product inventory, view details, and update listings.
          </p>
        </div>
        <div className="card p-4 text-nowrap shadow-xs">
          {data?.total || 0} <span className="text-sm text-neutral-600">total orders</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(updateParams)}
        className="card flex items-center gap-4 p-4 max-sm:flex-col"
      >
        <FormField
          name="search"
          icon={<LuSearch />}
          placeholder="Search ID, customer..."
          register={register}
          parentClassName="w-full"
        />

        <div className="flex items-center gap-4 max-sm:w-full">
          <FormField
            name="status"
            register={register}
            type="select"
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
            className="sm:w-fit"
            parentClassName="w-full"
          />

          <FormField
            name="payment"
            register={register}
            type="select"
            options={['pending', 'paid', 'failed', 'refunded']}
            defaultOption="all payments"
            className="sm:w-fit"
            parentClassName="w-full"
          />

          <FormField
            name="method"
            register={register}
            type="select"
            options={['cash', 'stripe']}
            defaultOption="all methods"
            className="sm:w-fit"
            parentClassName="w-full"
          />
        </div>
      </form>

      {isError ? (
        <Error message={error?.message} />
      ) : (
        <Table
          columns={['order', 'customer', 'date', 'status', 'payment', 'method', 'total']}
          data={mappedOrders}
          isLoading={isLoading}
          noDataMsg="No orders found"
        />
      )}

      <Pagination totalPages={totalPages} />

      <OrdersDialog order={selected} setOrder={setSelected} />
    </div>
  )
}
