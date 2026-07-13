import { format } from 'date-fns'

import Badge from '@/components/ui/Badge'
import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils'

export default function OrdersStatus({ className, isLoading, stats }) {
  const colorClasses = {
    teal: 'border-teal-500/25 bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/25 bg-teal-500/15 text-teal-600 dark:text-teal-400',
    amber:
      'border-amber-500/25 bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25 bg-amber-500/15 text-amber-600 dark:text-amber-400',
    rose: 'border-rose-500/25 bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/25 bg-rose-500/15 text-rose-600 dark:text-rose-400',
    sky: 'border-sky-500/25 bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/25 bg-sky-500/15 text-sky-600 dark:text-sky-400',
    purple:
      'border-purple-500/25 bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/25 bg-purple-500/15 text-purple-600 dark:text-purple-400',
    lime: 'border-lime-500/25 bg-lime-500/15 text-lime-600 dark:text-lime-400 border-lime-500/25 bg-lime-500/15 text-lime-600 dark:text-lime-400',
  }

  const statusColors = {
    pending: 'amber',
    processing: 'sky',
    confirmed: 'teal',
    shipped: 'purple',
    delivered: 'lime',
    cancelled: 'rose',
  }

  return (
    <div className={cn('card flex flex-col gap-4 p-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent-600 dark:text-accent-400 mb-1 font-mono text-sm tracking-wider uppercase">
            orders status
          </p>
          <h2 className="text-lg">Live fulfillment breakdown</h2>
        </div>
        <Badge>Updated {format(new Date(), 'h:mm a')}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {['pending', 'processing', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(
          (status) => (
            <div
              key={status}
              className={cn(
                'flex flex-col gap-1 rounded-lg border p-4',
                colorClasses[statusColors[status]],
              )}
            >
              <h3 className="font-mono text-sm tracking-wider uppercase">{status}</h3>
              <p className="text-2xl font-bold">
                {!isLoading ? (
                  stats?.[status]
                ) : (
                  <Skeleton width={32} color={statusColors[status]} />
                )}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
