import { useGetOrdersStats } from '@/api'
import {
  PendingOrders,
  Revenue,
  ThisMonth,
  TopProduct,
  TotalOrders,
  TotalUsers,
} from '@/components/dashboard/stats/DashboardStats'
import OrdersStatus from '@/components/dashboard/stats/OrdersStatus'
import RecentOrders from '@/components/dashboard/stats/RecentOrders'
import TopProducts from '@/components/dashboard/stats/TopProducts'

export default function AdminDashboard() {
  const { data, isLoading, isError, error } = useGetOrdersStats()
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

      {isError ? (
        <div className="card p-4 text-neutral-500">{error?.message}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <TotalOrders totalOrders={stats?.orders?.total} isLoading={isLoading} />
            <PendingOrders pendingOrders={stats?.orders?.pending} isLoading={isLoading} />
            <Revenue revenue={stats?.revenue?.total} isLoading={isLoading} />
            <ThisMonth salesThisMonth={stats?.revenue?.thisMonth} isLoading={isLoading} />
            <TopProduct
              topProduct={stats?.topProducts?.[0].name}
              sales={stats?.topProducts?.[0].totalSold}
              isLoading={isLoading}
            />
            <TotalUsers totalUsers={stats?.totalCustomers} isLoading={isLoading} />
          </div>

          <OrdersStatus stats={stats?.orders} isLoading={isLoading} />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TopProducts topProducts={stats?.topProducts} isLoading={isLoading} />

            <RecentOrders recentOrders={stats?.recentOrders} isLoading={isLoading} />
          </div>
        </>
      )}
    </div>
  )
}
