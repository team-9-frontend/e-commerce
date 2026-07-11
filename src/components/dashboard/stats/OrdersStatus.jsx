import { format } from 'date-fns'

import Badge from '@/components/ui/Badge'
import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils'

export default function OrdersStatus({ className, stats }) {
  return (
    <div className={cn('card flex flex-col gap-4 p-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent-600 dark:text-accent-400 mb-1 font-mono text-sm tracking-wider uppercase">
            orders status
          </p>
          <h2 className="text-xl">Live fulfillment breakdown</h2>
        </div>
        <Badge>Updated {format(new Date(), 'h:mm a')}</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {['pending', 'processing', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(
          (status) => {
            const colors = {
              pending: 'amber',
              processing: 'sky',
              confirmed: 'teal',
              shipped: 'purple',
              delivered: 'lime',
              cancelled: 'rose',
            }

            return (
              <div
                key={status}
                className={cn(
                  'flex flex-col gap-1 rounded-xl border p-4',
                  `border-${colors[status]}-500/25 bg-${colors[status]}-500/15 text-${colors[status]}-600 dark:text-${colors[status]}-400border-${colors[status]}-500/25 bg-${colors[status]}-500/15 text-${colors[status]}-600 dark:text-${colors[status]}-400`,
                )}
              >
                <h3 className="font-mono text-sm tracking-wider uppercase">{status}</h3>
                <p className="text-2xl font-bold">
                  {stats?.[status] ?? <Skeleton width={32} color={colors[status]} />}
                </p>
              </div>
            )
          },
        )}
      </div>
    </div>
  )
}
