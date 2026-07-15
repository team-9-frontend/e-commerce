import { useGetOrdersStats } from '@/api'
import {
  PendingOrders,
  Revenue,
  ThisMonth,
  TopProduct,
  TotalOrders,
  TotalUsers,
} from '@/components/dashboard/stats/DashboardStats'
import OrdersStats from '@/components/dashboard/stats/OrdersStats'
import RecentOrders from '@/components/dashboard/stats/RecentOrders'
import StatsSkeleton from '@/components/dashboard/stats/StatsSkeleton'
import TopProducts from '@/components/dashboard/stats/TopProducts'

export default function AdminDashboard() {
  const { data, isPending, isError, error, refetch } = useGetOrdersStats()
  const stats = data?.dashboard

  return (
    <div className="flex flex-col gap-4">
      <div className="card space-y-2 p-4">
        <p className="text-accent-600 dark:text-accent-400 font-mono text-sm tracking-wider uppercase">
          admin overview
        </p>
        <h2 className="text-3xl">Real-time commerce health</h2>
        <p className="text-sm text-neutral-500">
          Monitor your storefront with clarity and live metrics.
        </p>
      </div>

      {isPending ? (
        <StatsSkeleton />
      ) : isError ? (
        <div className="card p-4 text-neutral-500">
          Error: {error?.message}
          <button onClick={refetch}>Retry</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <TotalOrders totalOrders={stats?.orders?.total} isLoading={isPending} />
            <PendingOrders pendingOrders={stats?.orders?.pending} isLoading={isPending} />
            <Revenue revenue={stats?.revenue?.total} isLoading={isPending} />
            <ThisMonth salesThisMonth={stats?.revenue?.thisMonth} isLoading={isPending} />
            <TopProduct
              topProduct={stats?.topProducts?.[0]?.name}
              sales={stats?.topProducts?.[0]?.totalSold}
              isLoading={isPending}
            />
            <TotalUsers totalUsers={stats?.totalCustomers} isLoading={isPending} />
          </div>

          <OrdersStats stats={stats?.orders} isLoading={isPending} />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TopProducts topProducts={stats?.topProducts} />
            <RecentOrders recentOrders={stats?.recentOrders} />
          </div>
        </>
      )}
    </div>
  )
}