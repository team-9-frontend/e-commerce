import { useCallback, useEffect, useRef, useState } from 'react'
import DashboardStats from '@/components/dashboard/stats/DashboardStats'
import OrderStatus from '@/components/dashboard/stats/OrderStatus'
import RecentOrders from '@/components/dashboard/stats/RecentOrders'
import StatsSkeleton from '@/components/dashboard/stats/StatsSkeleton'
import TopProducts from '@/components/dashboard/stats/TopProducts'
import { getOrdersStates } from '@/api/ordersApi'

const emptyStats = {
  orders: {
    total: 0,
    pending: 0,
    processing: 0,
    confirmed: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  },
  revenue: {
    total: 0,
    thisMonth: 0,
    lastMonth: 0,
    growthPercent: 0,
  },
  recentOrders: [],
  topProducts: [],
  ordersByStatus: [],
  dailyRevenue: [],
  totalCustomers: 0,
}

export default function AdminDashboard() {
  const AUTO_REFRESH_MS = Number(import.meta.env.VITE_DASHBOARD_POLL_MS) || 60000
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(emptyStats)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const intervalRef = useRef(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getOrdersStates()
      const payload = res?.data?.dashboard ?? res?.data?.data ?? res?.data ?? {}
      setStats({ ...emptyStats, ...payload })
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  useEffect(() => {
    if (!autoRefresh) return

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      if (!loading) {
        fetchStats()
      }
    }, AUTO_REFRESH_MS)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [autoRefresh, fetchStats, loading, AUTO_REFRESH_MS])

  return (
    <div className="container my-6 space-y-6">
      <div className="card border-accent-100 dark:border-accent-50 flex items-center justify-between gap-3 rounded-3xl border bg-white p-6 shadow-lg dark:bg-neutral-100">
        <div>
          <p className="text-accent-800 text-xs tracking-wider uppercase sm:text-sm">Admin overview</p>
          <h1 className="text-xl sm:text-2xl">Real-time commerce health</h1>
          <p className="text-xs text-gray-500 sm:text-sm">
            Monitor your storefront with AI-style clarity and live API metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-500">Auto-refresh: {autoRefresh ? `${AUTO_REFRESH_MS / 1000}s` : 'off'}</div>
          <button
            type="button"
            onClick={() => setAutoRefresh((value) => !value)}
            className="btn btn-ghost btn-sm rounded-lg px-3 py-2"
          >
            {autoRefresh ? 'Disable' : 'Enable'}
          </button>
          <button
            type="button"
            onClick={fetchStats}
            className="btn btn-sm rounded-lg bg-accent-800 px-3 py-2 text-white"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {error ? (
        <div className="card rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-800">Error: {error}</p>
          <div className="mt-4">
            <button
              type="button"
              onClick={fetchStats}
              className="btn btn-sm rounded-lg bg-red-600 px-3 py-2 text-white"
            >
              Retry
            </button>
          </div>
        </div>
      ) : loading ? (
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
