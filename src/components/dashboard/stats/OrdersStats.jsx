import { format } from 'date-fns'

import Badge from '@/components/ui/Badge'
import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils'

export default function OrdersStats({ className, isLoading, stats }) {
  const colorClasses = {
    teal: 'border-teal-500/25 before:bg-teal-500/15 text-teal-700 dark:text-teal-400',
    amber: 'border-amber-500/25 before:bg-amber-500/15 text-amber-700 dark:text-amber-400',
    rose: 'border-rose-500/25 before:bg-rose-500/15 text-rose-700 dark:text-rose-400',
    sky: 'border-sky-500/25 before:bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/25 before:bg-sky-500/15 text-sky-700 dark:text-sky-400',
    purple: 'border-purple-500/25 before:bg-purple-500/15 text-purple-700 dark:text-purple-400',
    emerald:
      'border-emerald-500/25 before:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  }

  const statsColors = {
    pending: 'amber',
    processing: 'sky',
    confirmed: 'teal',
    shipped: 'purple',
    delivered: 'emerald',
    cancelled: 'rose',
  }

  return (
    <div className={cn('card flex flex-col gap-4 p-4', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent-600 dark:text-accent-400 mb-1 font-mono text-sm tracking-wider uppercase">
            orders stats
          </p>
          <h2 className="text-lg">Live fulfillment breakdown</h2>
        </div>
        <Badge>Updated {format(new Date(), 'h:mm a')}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
        {['price', 'discountPrice', 'stock', 'sku'].map((stat) => (
          <div
            key={stat}
            className={cn(
              'relative flex flex-col gap-1 overflow-hidden rounded-lg border bg-neutral-50 p-4 before:pointer-events-none before:absolute before:inset-0 before:content-[""]',
              colorClasses[statsColors[stat]],
            )}
          >
            <h3 className="font-mono text-sm tracking-wider uppercase">{stat}</h3>
            <p className="text-2xl font-bold">
              {!isLoading ? product?.[stat] : <Skeleton width={32} color={statsColors[stat]} />}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
