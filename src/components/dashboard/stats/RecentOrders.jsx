import { format } from 'date-fns'

import Badge from '@/components/ui/Badge'
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
          <h2 className="text-xl">Latest customer activity</h2>
        </div>
        <Badge>{recentOrders?.length || 0} orders</Badge>
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
                  <Badge
                    color={
                      (order.status === 'returned' && 'amber') ||
                      (order.status === 'pending' && 'amber') ||
                      (order.status === 'processing' && 'sky') ||
                      (order.status === 'confirmed' && 'teal') ||
                      (order.status === 'shipped' && 'purple') ||
                      (order.status === 'delivered' && 'lime') ||
                      (order.status === 'cancelled' && 'rose') ||
                      null
                    }
                  >
                    {order.status}
                  </Badge>
                  <span className="hidden sm:block">•</span>
                  <span className="hidden font-bold sm:block sm:text-lg">${order.totalPrice}</span>
                </div>
              </div>
            ))
          : Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="card flex items-center justify-between gap-4 p-4 shadow-sm dark:bg-neutral-200"
              >
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
