import { LuCalendar, LuClock, LuCrown, LuDollarSign, LuShoppingCart, LuUsers } from 'react-icons/lu'

import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils'

export function TotalOrders({ className, totalOrders }) {
  return (
    <div
      className={cn(
        'card flex flex-col items-start gap-2 border-t-4 border-t-teal-500 p-4 transition-all hover:-translate-y-1',
        className,
      )}
    >
      <div className="flex w-full items-start justify-between">
        <h2 className="text-muted mb-2 text-sm font-medium capitalize">total orders</h2>
        <div className="rounded-2xl bg-linear-to-br from-teal-300 to-teal-500 p-3 text-neutral-50 transition-all hover:scale-105 hover:rotate-12">
          <LuShoppingCart size={28} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1">
        <p className="text-2xl font-bold">{totalOrders || <Skeleton />}</p>
        <p className="text-muted text-sm font-light">All orders received</p>
      </div>
    </div>
  )
}

export function PendingOrders({ className, pendingOrders }) {
  return (
    <div
      className={cn(
        'card flex flex-col items-start gap-2 border-t-4 border-t-amber-500 p-4 transition-all hover:-translate-y-1',
        className,
      )}
    >
      <div className="flex w-full items-start justify-between">
        <h2 className="text-muted mb-2 text-sm font-medium capitalize">pending orders</h2>
        <div className="rounded-2xl bg-linear-to-br from-amber-300 to-amber-500 p-3 text-neutral-50 transition-all hover:scale-105 hover:rotate-12">
          <LuClock size={28} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1">
        <p className="text-2xl font-bold">{pendingOrders || <Skeleton />}</p>
        <p className="text-muted text-sm font-light">Awaiting action</p>
      </div>
    </div>
  )
}

export function Revenue({ className, revenue }) {
  return (
    <div
      className={cn(
        'card flex flex-col items-start gap-2 border-t-4 border-t-rose-500 p-4 transition-all hover:-translate-y-1',
        className,
      )}
    >
      <div className="flex w-full items-start justify-between">
        <h2 className="text-muted mb-2 text-sm font-medium capitalize">revenue</h2>
        <div className="rounded-2xl bg-linear-to-br from-rose-300 to-rose-500 p-3 text-neutral-50 transition-all hover:scale-105 hover:rotate-12">
          <LuDollarSign size={28} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1">
        <p className="text-2xl font-bold">
          {revenue && '$'}
          {revenue || <Skeleton />}
        </p>
        <p className="text-muted text-sm font-light">Total gross revenue</p>
      </div>
    </div>
  )
}

export function ThisMonth({ className, salesThisMonth }) {
  return (
    <div
      className={cn(
        'card flex flex-col items-start gap-2 border-t-4 border-t-sky-500 p-4 transition-all hover:-translate-y-1',
        className,
      )}
    >
      <div className="flex w-full items-start justify-between">
        <h2 className="text-muted mb-2 text-sm font-medium capitalize">this month</h2>
        <div className="rounded-2xl bg-linear-to-br from-sky-300 to-sky-500 p-3 text-neutral-50 transition-all hover:scale-105 hover:rotate-12">
          <LuCalendar size={28} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1">
        <p className="text-2xl font-bold">
          {salesThisMonth && '$'}
          {salesThisMonth || <Skeleton />}
        </p>
        <p className="text-muted text-sm font-light">Monthly sales target</p>
      </div>
    </div>
  )
}

export function TopProduct({ className, topProduct, sales }) {
  return (
    <div
      className={cn(
        'card flex flex-col items-start gap-2 border-t-4 border-t-purple-500 p-4 transition-all hover:-translate-y-1',
        className,
      )}
    >
      <div className="flex w-full items-start justify-between">
        <h2 className="text-muted mb-2 text-sm font-medium capitalize">top product</h2>
        <div className="rounded-2xl bg-linear-to-br from-purple-300 to-purple-500 p-3 text-neutral-50 transition-all hover:scale-105 hover:rotate-12">
          <LuCrown size={28} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1">
        <p className="line-clamp-1 text-2xl font-bold">{topProduct || <Skeleton />}</p>
        <p className="text-muted text-sm font-light">{sales || 0} sold</p>
      </div>
    </div>
  )
}

export function TotalUsers({ className, totalUsers }) {
  return (
    <div
      className={cn(
        'card flex flex-col items-start gap-2 border-t-4 border-t-lime-500 p-4 transition-all hover:-translate-y-1',
        className,
      )}
    >
      <div className="flex w-full items-start justify-between">
        <h2 className="text-muted mb-2 text-sm font-medium capitalize">total users</h2>
        <div className="rounded-2xl bg-linear-to-br from-lime-300 to-lime-500 p-3 text-neutral-50 transition-all hover:scale-105 hover:rotate-12">
          <LuUsers size={28} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1">
        <p className="text-2xl font-bold">{totalUsers || <Skeleton />}</p>
        <p className="text-muted text-sm font-light">Registered customers</p>
      </div>
    </div>
  )
}
