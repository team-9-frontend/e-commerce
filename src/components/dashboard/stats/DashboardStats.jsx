import { LuCalendar, LuClock, LuCrown, LuDollarSign, LuShoppingCart, LuUsers } from 'react-icons/lu'

import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils'

function StatsTemplate({ className, color, header, icon, value, description }) {
  const colorClasses = {
    teal: { gradient: 'from-teal-300 to-teal-500', border: 'border-t-teal-500' },
    amber: { gradient: 'from-amber-300 to-amber-500', border: 'border-t-amber-500' },
    rose: { gradient: 'from-rose-300 to-rose-500', border: 'border-t-rose-500' },
    sky: { gradient: 'from-sky-300 to-sky-500', border: 'border-t-sky-500' },
    purple: { gradient: 'from-purple-300 to-purple-500', border: 'border-t-purple-500' },
    lime: { gradient: 'from-lime-300 to-lime-500', border: 'border-t-lime-500' },
  }

  return (
    <div
      className={cn(
        'card flex flex-col items-start gap-2 border-t-4 p-4 transition-all hover:-translate-y-1',
        colorClasses[color]?.border,
        className,
      )}
    >
      <div className="flex w-full items-start justify-between">
        <h2 className="text-muted mb-2 text-sm font-medium capitalize">{header}</h2>
        <div
          className={cn(
            'rounded-2xl bg-linear-to-br p-3 text-neutral-50 transition-all hover:scale-105 hover:rotate-12',
            colorClasses[color]?.gradient,
          )}
        >
          {icon}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1">
        <p className="line-clamp-1 text-2xl font-bold">{value || <Skeleton />}</p>
        <p className="text-muted text-sm font-light">{description}</p>
      </div>
    </div>
  )
}

export function TotalOrders({ className, totalOrders }) {
  return (
    <StatsTemplate
      color="teal"
      header="total orders"
      icon={<LuShoppingCart size={28} />}
      value={totalOrders}
      description="All orders received"
      classNmae={className}
    />
  )
}

export function PendingOrders({ className, pendingOrders }) {
  return (
    <StatsTemplate
      color="amber"
      header="pending orders"
      icon={<LuClock size={28} />}
      value={pendingOrders}
      description="Awaiting action"
      classNmae={className}
    />
  )
}

export function Revenue({ className, revenue }) {
  return (
    <StatsTemplate
      color="rose"
      header="revenue"
      icon={<LuDollarSign size={28} />}
      value={revenue}
      description="Total gross revenue"
      className={className}
    />
  )
}

export function ThisMonth({ className, salesThisMonth }) {
  return (
    <StatsTemplate
      color="sky"
      header="this month"
      icon={<LuCalendar size={28} />}
      value={salesThisMonth && `$${salesThisMonth}`}
      description="All sales this month"
      className={className}
    />
  )
}

export function TopProduct({ className, topProduct, sales }) {
  return (
    <StatsTemplate
      color="purple"
      header="top product"
      icon={<LuCrown size={28} />}
      value={topProduct}
      description={`${sales || 0} sold`}
      className={className}
    />
  )
}

export function TotalUsers({ className, totalUsers }) {
  return (
    <StatsTemplate
      color="lime"
      header="total users"
      icon={<LuUsers size={28} />}
      value={totalUsers}
      description="Registered customers"
      className={className}
    />
  )
}
