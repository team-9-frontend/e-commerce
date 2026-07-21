import { LuChevronDown, LuX } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

import { useGetAdminCarts } from '@repo/api'
import { Badge, Button, Error, Pagination, Table } from '@repo/ui'
import { format } from '@repo/utils'

const EMPTY_ARRAY = []

export default function AdminCarts() {
  const [searchParams] = useSearchParams()

  const page = searchParams.get('page') || 1
  const limit = 14

  const { data, isLoading, isError, error } = useGetAdminCarts({ page, limit })
  const carts = data?.carts || EMPTY_ARRAY
  console.log(carts)

  const mappedCarts = useMemo(() => {
    return carts.map((cart) => ({
      cart: <span className="text-sm text-neutral-600 uppercase">#{cart._id}</span>,
      customer: (
        <div className="flex items-center gap-4">
          <div className="flex-center size-8 rounded-full bg-neutral-50 text-xs">
            {String(cart.user?.username).slice(0, 1)}
          </div>

          <div className="flex flex-col">
            <h3 className="font-medium">{cart.user?.username || '-'}</h3>
            <p className="text-sm text-neutral-600">{cart.user?.email || '-'}</p>
          </div>
        </div>
      ),
      date: (
        <span className="text-sm text-neutral-600">{format(cart.createdAt, 'MMM d, yyyy')}</span>
      ),
      'item count': <span className="text-sm text-neutral-600">{cart.itemCount}</span>,
      coupon: (
        <span className="flex items-center gap-2 text-sm text-neutral-600">
          {cart.coupon?.code || '-'}
          {cart.coupon?.code && (
            <span className="text-sm text-emerald-600 dark:text-emerald-400">
              -{cart.coupon?.discountType === 'percentage' ? '%' : '$'}
              {cart.coupon?.discountValue}
            </span>
          )}
        </span>
      ),
      subtotal: (
        <span className="font-bold text-emerald-600 dark:text-emerald-400">${cart.subtotal}</span>
      ),
    }))
  }, [carts])

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="card flex items-center justify-between gap-8 p-4 max-sm:flex-col max-sm:items-end">
        <div className="space-y-2 max-sm:w-full">
          <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
            carts
          </p>
          <h2 className="text-2xl font-medium sm:text-3xl">Carts overview</h2>
          <p className="text-sm text-neutral-500">
            All active carts returned from the API are rendered here with their latest item details.
          </p>
        </div>
        <div className="card p-4 text-nowrap shadow-xs">
          {data?.total || 0} <span className="text-sm text-neutral-600">total carts</span>
        </div>
      </div>

      {isError ? (
        <Error message={error?.message} />
      ) : (
        <Table
          columns={['cart', 'customer', 'date', 'item count', 'coupon', 'subtotal']}
          data={mappedCarts}
          isLoading={isLoading}
          noDataMsg="No carts found"
        />
      )}

      <Pagination totalPages={data?.totalPages} />
    </div>
  )
}
