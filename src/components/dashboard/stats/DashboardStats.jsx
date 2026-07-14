import {
  LuBoxes,
  LuCalendar,
  LuClock,
  LuCrown,
  LuDollarSign,
  LuPackage,
  LuShoppingCart,
  LuStar,
  LuTrendingUp,
  LuUsers,
} from 'react-icons/lu'

import Skeleton from '@/components/ui/Skeleton'
import { cn } from '@/utils'

function StatsTemplate({ className, isLoading, color, header, icon, value, description }) {
  const colorClasses = {
    teal: { gradient: 'from-teal-400 to-teal-600', border: 'border-t-teal-600' },
    amber: { gradient: 'from-amber-400 to-amber-600', border: 'border-t-amber-600' },
    rose: { gradient: 'from-rose-400 to-rose-600', border: 'border-t-rose-600' },
    sky: { gradient: 'from-sky-400 to-sky-600', border: 'border-t-sky-600' },
    purple: { gradient: 'from-purple-400 to-purple-600', border: 'border-t-purple-600' },
    emerald: { gradient: 'from-emerald-400 to-emerald-600', border: 'border-t-emerald-500' },
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
        <h2 className="mb-2 text-sm font-medium text-neutral-600 capitalize">{header}</h2>
        <div
          className={cn(
            'rounded-2xl bg-linear-to-br p-3 text-3xl text-neutral-50 transition-all hover:scale-105 hover:rotate-12 dark:text-neutral-950',
            colorClasses[color]?.gradient,
          )}
        >
          {icon}
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col justify-end gap-1">
        <p className="line-clamp-1 text-2xl font-bold">
          {!isLoading ? value : <Skeleton width="50%" />}
        </p>
        {description && <p className="text-sm text-neutral-500">{description}</p>}
      </div>
    </div>
  )
}

export function TotalOrders({ className, isLoading, totalOrders }) {
  return (
    <StatsTemplate
      color="teal"
      header="total orders"
      icon={<LuShoppingCart />}
      value={totalOrders}
      description="All orders received"
      classNmae={className}
      isLoading={isLoading}
    />
  )
}

export function PendingOrders({ className, isLoading, pendingOrders }) {
  return (
    <StatsTemplate
      color="amber"
      header="pending orders"
      icon={<LuClock />}
      value={pendingOrders}
      description="Awaiting action"
      classNmae={className}
      isLoading={isLoading}
    />
  )
}

export function Revenue({ className, isLoading, revenue }) {
  return (
    <StatsTemplate
      color="rose"
      header="revenue"
      icon={<LuDollarSign />}
      value={revenue}
      description="Total gross revenue"
      className={className}
      isLoading={isLoading}
    />
  )
}

export function ThisMonth({ className, isLoading, salesThisMonth }) {
  return (
    <StatsTemplate
      color="sky"
      header="this month"
      icon={<LuCalendar />}
      value={salesThisMonth && `$${salesThisMonth}`}
      description="All sales this month"
      className={className}
      isLoading={isLoading}
    />
  )
}

export function TopProduct({ className, isLoading, topProduct, sales }) {
  return (
    <StatsTemplate
      color="purple"
      header="top product"
      icon={<LuCrown />}
      value={topProduct}
      description={`${sales || 0} sold`}
      className={className}
      isLoading={isLoading}
    />
  )
}

export function TotalUsers({ className, isLoading, totalUsers }) {
  return (
    <StatsTemplate
      color="emerald"
      header="total users"
      icon={<LuUsers />}
      value={totalUsers}
      description="Registered customers"
      className={className}
      isLoading={isLoading}
    />
  )
}

export function TotalProducts({ className, isLoading, totalProducts }) {
  return (
    <StatsTemplate
      color="sky"
      header="total products"
      icon={<LuPackage />}
      value={totalProducts}
      className={className}
      isLoading={isLoading}
    />
  )
}

export function FeuturedProducts({ className, isLoading, feuturedProducts }) {
  return (
    <StatsTemplate
      color="amber"
      header="feutured products"
      icon={<LuStar />}
      value={feuturedProducts}
      className={className}
      isLoading={isLoading}
    />
  )
}

export function InStockTotal({ className, isLoading, inStockTotal }) {
  return (
    <StatsTemplate
      color="emerald"
      header="in stock"
      icon={<LuTrendingUp />}
      value={inStockTotal}
      className={className}
      isLoading={isLoading}
    />
  )
}

export function OutOfStockTotal({ className, isLoading, outOfStockTotal }) {
  return (
    <StatsTemplate
      color="rose"
      header="out of stock"
      icon={<LuBoxes />}
      value={outOfStockTotal}
      className={className}
      isLoading={isLoading}
    />
  )
}
