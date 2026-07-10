import { format } from 'date-fns'
import Skeleton from 'react-loading-skeleton'

import { cn } from '@/utils'

export default function OrdersStatus({ className, stats }) {
  const statusConfig = {
    pending: {
      colors: 'border-amber-500/25 bg-amber-500/15 p-4 text-amber-600 dark:text-amber-400',
      skeleton: (
        <Skeleton
          width={32}
          baseColor={`hsl(from var(--color-amber-500) h s l / 0.2)`}
          highlightColor={`hsl(from var(--color-amber-500) h s l / 0.3)`}
        />
      ),
    },
    processing: {
      colors: 'border-sky-500/25 bg-sky-500/15 p-4 text-sky-600 dark:text-sky-400',
      skeleton: (
        <Skeleton
          width={32}
          baseColor={`hsl(from var(--color-sky-500) h s l / 0.2)`}
          highlightColor={`hsl(from var(--color-sky-500) h s l / 0.3)`}
        />
      ),
    },
    confirmed: {
      colors: 'border-teal-500/25 bg-teal-500/15 p-4 text-teal-600 dark:text-teal-400',
      skeleton: (
        <Skeleton
          width={32}
          baseColor={`hsl(from var(--color-teal-500) h s l / 0.2)`}
          highlightColor={`hsl(from var(--color-teal-500) h s l / 0.3)`}
        />
      ),
    },
    shipped: {
      colors: 'border-purple-500/25 bg-purple-500/15 p-4 text-purple-600 dark:text-purple-400',
      skeleton: (
        <Skeleton
          width={32}
          baseColor={`hsl(from var(--color-purple-500) h s l / 0.2)`}
          highlightColor={`hsl(from var(--color-purple-500) h s l / 0.3)`}
        />
      ),
    },
    delivered: {
      colors: 'border-lime-500/25 bg-lime-500/15 p-4 text-lime-600 dark:text-lime-400',
      skeleton: (
        <Skeleton
          width={32}
          baseColor={`hsl(from var(--color-lime-500) h s l / 0.2)`}
          highlightColor={`hsl(from var(--color-lime-500) h s l / 0.3)`}
        />
      ),
    },
    cancelled: {
      colors: 'border-rose-500/25 bg-rose-500/15 p-4 text-rose-600 dark:text-rose-400',
      skeleton: (
        <Skeleton
          width={32}
          baseColor={`hsl(from var(--color-rose-500) h s l / 0.2)`}
          highlightColor={`hsl(from var(--color-rose-500) h s l / 0.3)`}
        />
      ),
    },
  }

  return (
    <div className={cn('card flex flex-col gap-4 p-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent-600 mb-1 font-mono text-sm tracking-wider uppercase">
            orders status
          </p>
          <h2 className="text-xl">Live fulfillment breakdown</h2>
        </div>
        <span className="bg-accent-500/15 border-accent-500/25 text-accent-600 rounded-full border px-2 py-0.5 text-xs tracking-wider">
          Updated {format(new Date(), 'h:mm a')}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(statusConfig).map((status) => {
          return (
            <div
              key={status}
              className={cn('flex flex-col gap-1 rounded-xl border', statusConfig[status].colors)}
            >
              <h3 className="font-mono text-sm tracking-wider uppercase">{status}</h3>
              <p className="text-2xl font-bold">
                {stats?.[status] || statusConfig[status].skeleton}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
