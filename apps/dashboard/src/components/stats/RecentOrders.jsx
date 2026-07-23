import { Badge, Skeleton } from '@repo/ui'
import { cn, format } from '@repo/utils'

export default function RecentOrders({ className, isLoading, recentOrders }) {
  return (
    <div className={cn('card flex flex-col gap-4 p-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent-600 dark:text-accent-400 mb-1 font-mono text-sm tracking-wider uppercase">
            recent orders
          </p>
          <h2 className="text-xl font-bold">Latest customer activity</h2>
        </div>
        <Badge>{recentOrders?.length || 0} orders</Badge>
      </div>

      <div className="flex max-h-128 flex-col gap-4 overflow-y-auto">
        {Array.from({ length: isLoading ? 5 : recentOrders?.length }).map((_, i) => {
          const order = recentOrders?.[i]

          return (
            <div key={i} className="card flex gap-4 p-4 shadow-sm dark:bg-neutral-200">
              <div className="flex-1">
                <h3 className="line-clamp-1 font-bold sm:text-lg">
                  {!isLoading ? `${order?.user?.username || 'Customer'}` : <Skeleton width="50%" />}
                </h3>
                <p className="line-clamp-1 text-sm text-neutral-700 capitalize">
                  {!isLoading ? (
                    `${order?.items?.[0]?.name} • ${format(order?.createdAt, 'MMM d, yyyy')}`
                  ) : (
                    <Skeleton width="100%" />
                  )}
                </p>
              </div>

              <div className="flex-1 space-x-2 self-center text-end">
                {!isLoading ? (
                  <>
                    <Badge
                      color={
                        (order?.status === 'returned' && 'amber') ||
                        (order?.status === 'pending' && 'amber') ||
                        (order?.status === 'processing' && 'sky') ||
                        (order?.status === 'confirmed' && 'teal') ||
                        (order?.status === 'shipped' && 'purple') ||
                        (order?.status === 'delivered' && 'emerald') ||
                        (order?.status === 'cancelled' && 'rose') ||
                        null
                      }
                    >
                      {order?.status}
                    </Badge>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden font-bold sm:inline sm:text-lg">
                      ${order?.totalPrice}
                    </span>
                  </>
                ) : (
                  <Skeleton width="50%" className="max-w-32 sm:text-lg" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
