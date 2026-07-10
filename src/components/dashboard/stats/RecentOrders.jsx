import { format } from 'date-fns'

import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils'

export default function RecentOrders({ className, recentOrders }) {
  return (
    <div className={cn('card flex flex-col gap-4 p-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent-600 mb-1 font-mono text-sm tracking-wider uppercase">
            recent orders
          </p>
          <h2 className="text-xl">Best sellers</h2>
        </div>
        <span className="bg-accent-500/15 border-accent-500/25 text-accent-600 rounded-full border px-2 py-0.5 text-xs tracking-wider">
          {recentOrders?.length || 0} orders
        </span>
      </div>

      <div className="flex max-h-128 flex-col gap-4 overflow-y-auto">
        {recentOrders
          ? recentOrders.map((order) => (
              <div
                key={order._id}
                className="card flex items-center justify-between gap-4 p-4 shadow-sm dark:bg-neutral-200"
              >
                <div>
                  <h3 className="line-clamp-1 font-bold sm:text-lg">
                    {order.user?.username || 'Customer'}
                  </h3>
                  <p className="line-clamp-1 text-sm text-neutral-700 capitalize">
                    {order.items?.[0]?.name} • {format(order.createdAt, 'MMM d, yyyy')}
                  </p>
                </div>

                <div className="flex-center gap-2">
                  <span
                    className={cn(
                      'rounded-full border px-2 py-0.5 text-xs tracking-wider',
                      order.status === 'pending' &&
                        'border-amber-500/25 bg-amber-500/15 text-amber-600 dark:text-amber-400',
                      order.status === 'confirmed' &&
                        'border-teal-500/25 bg-teal-500/15 text-teal-600 dark:text-teal-400',
                      order.status === 'shipped' &&
                        'border-purple-500/25 bg-purple-500/15 text-purple-600 dark:text-purple-400',
                      order.status === 'delivered' &&
                        'border-lime-500/25 bg-lime-500/15 text-lime-600 dark:text-lime-400',
                      order.status === 'returned' &&
                        'border-amber-500/25 bg-amber-500/15 text-amber-600 dark:text-amber-400',
                      order.status === 'cancelled' &&
                        'border-rose-500/25 bg-rose-500/15 text-rose-600 dark:text-rose-400',
                    )}
                  >
                    {order.status}
                  </span>
                  <span className="hidden sm:block">•</span>
                  <span className="hidden font-bold sm:block sm:text-lg">${order.totalPrice}</span>
                </div>
              </div>
            ))
          : Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card flex items-center gap-4 p-4 dark:bg-neutral-200">
                <div className="flex-1">
                  <Skeleton width="35%" className="sm:text-lg" />
                  <Skeleton width="50%" className="text-sm" />
                </div>
                <div className="flex-1 text-end">
                  <Skeleton width="50%" className="max-w-32 sm:text-lg" />
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
