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
  const { data, isPending, isError, error } = useGetOrdersStats()
  const stats = data?.dashboard

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="card col-span-full p-4">
        <p className="text-accent-600 dark:text-accent-400 mb-1 font-mono text-sm tracking-wider uppercase">
          admin overview
        </p>
        <h2 className="text-3xl">Real-time commerce health</h2>
        <p className="text-muted text-sm">Monitor your storefront with clarity and live metrics.</p>
      </div>

      {isError ? (
        <div className="card text-muted col-span-full p-4">{error}</div>
      ) : (
        <>
          <TotalOrders totalOrders={stats?.orders?.total} isPending={isPending} />
          <PendingOrders pendingOrders={stats?.orders?.pending} isPending={isPending} />
          <Revenue revenue={stats?.revenue?.total} isPending={isPending} />
          <ThisMonth salesThisMonth={stats?.revenue?.thisMonth} isPending={isPending} />
          <TopProduct
            topProduct={stats?.topProducts?.[0].name}
            sales={stats?.topProducts?.[0].totalSold}
            isPending={isPending}
          />
          <TotalUsers totalUsers={stats?.totalCustomers} isPending={isPending} />

          <OrdersStatus stats={stats?.orders} className="col-span-full" isPending={isPending} />

          <div className="col-span-full grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TopProducts topProducts={stats?.topProducts} isPending={isPending} />

            <RecentOrders recentOrders={stats?.recentOrders} isPending={isPending} />
          </div>
        </>
      )}
    </div>
  )
}
