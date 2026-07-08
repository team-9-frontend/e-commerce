import { useGetOrdersStats } from '@/api'
import DashboardStats from '@/components/dashboard/stats/DashboardStats'
import OrderStatus from '@/components/dashboard/stats/OrderStatus'
import RecentOrders from '@/components/dashboard/stats/RecentOrders'
import StatsSkeleton from '@/components/dashboard/stats/StatsSkeleton'
import TopProducts from '@/components/dashboard/stats/TopProducts'

export default function AdminDashboard() {
  const { data, isLoading, isError, refetch } = useGetOrdersStats()
  const stats = data?.dashboard

  return (
    <div className="container my-6 space-y-6">
      <div className="card border-accent-100 dark:border-accent-50 flex items-center justify-between gap-3 rounded-3xl border bg-white p-6 shadow-lg dark:bg-neutral-100">
        <div>
          <p className="text-accent-800 text-xs tracking-wider uppercase sm:text-sm">
            Admin overview
          </p>
          <h1 className="text-xl sm:text-2xl">Real-time commerce health</h1>
          <p className="text-xs text-gray-500 sm:text-sm">
            Monitor your storefront with AI-style clarity and live API metrics.
          </p>
        </div>
      </div>

      {isError ? (
        <div className="card rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-800">Error: {isError}</p>
          <div className="mt-4">
            <button
              type="button"
              onClick={refetch}
              className="btn btn-sm rounded-lg bg-red-600 px-3 py-2 text-white"
            >
              Retry
            </button>
          </div>
        </div>
      ) : isLoading ? (
        <StatsSkeleton />
      ) : (
        <>
          <DashboardStats
            totalOrders={stats.orders?.total}
            pendingOrders={stats.orders?.pending}
            revenue={stats.revenue?.total}
            salesForMonth={stats.revenue?.thisMonth}
            topProduct={stats.topProducts?.[0]}
            users={stats.totalCustomers}
          />
          <div className="grid gap-2 lg:grid-cols-2">
            <OrderStatus orders={stats.orders} />
            <TopProducts topProducts={stats.topProducts} />
          </div>
          <RecentOrders recentOrders={stats.recentOrders} />
        </>
      )}
    </div>
  )
}
