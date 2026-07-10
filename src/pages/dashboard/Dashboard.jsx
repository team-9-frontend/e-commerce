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
  const { data, isPending } = useGetOrdersStats()
  const stats = data?.dashboard

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="card col-span-full p-4">
        <p className="text-accent-600 mb-1 font-mono text-sm tracking-wider uppercase">
          admin overview
        </p>
        <h2 className="text-2xl">Real-time commerce health</h2>
        <p className="text-muted text-sm">Monitor your storefront with clarity and live metrics.</p>
      </div>

      <TotalOrders totalOrders={stats?.orders?.total} />
      <PendingOrders pendingOrders={stats?.orders?.pending} />
      <Revenue revenue={stats?.revenue?.total} />
      <ThisMonth salesThisMonth={stats?.revenue?.thisMonth} />
      <TopProduct
        topProduct={stats?.topProducts?.[0].name}
        sales={stats?.topProducts?.[0].totalSold}
      />
      <TotalUsers totalUsers={stats?.totalCustomers} />

      <OrdersStatus stats={stats?.orders} className="col-span-full" />

      <div className="col-span-full grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TopProducts topProducts={stats?.topProducts} />

        <RecentOrders recentOrders={stats?.recentOrders} />
      </div>
    </div>
  )
}
