import DashboardStats from '@/components/dashboard/stats/DashboardStats'
import OrderStatus from '@/components/dashboard/stats/OrderStatus'
import RecentOrders from '@/components/dashboard/stats/RecentOrders'
import StatsSkeleton from '@/components/dashboard/stats/StatsSkeleton'
import TopProducts from '@/components/dashboard/stats/TopProducts'

export default function AdminDashboard() {
  const loading = false
  const stats = {
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
    recentOrders: [
      {
        _id: 'string',
        user: 'string',
        items: [
          {
            product: 'string',
            name: 'string',
            image: 'string',
            price: 0,
            quantity: 0,
          },
        ],
        shippingAddress: {
          fullName: 'John Doe',
          phone: '+201234567890',
          country: 'Egypt',
          city: 'Cairo',
          address: '123 Main Street, Apt 4',
          postalCode: '11511',
        },
        paymentMethod: 'cash',
        paymentStatus: 'pending',
        transactionId: 'string',
        subtotal: 500,
        shippingFee: 50,
        tax: 70,
        discount: 0,
        totalPrice: 620,
        status: 'confirmed',
        paidAt: '2026-07-05T16:45:56.643Z',
        deliveredAt: '2026-07-05T16:45:56.643Z',
        cancelledAt: '2026-07-05T16:45:56.643Z',
        customerNote: 'Please deliver before 5 PM',
        adminNote: 'string',
        createdAt: '2026-07-05T16:45:56.643Z',
        updatedAt: '2026-07-05T16:45:56.643Z',
      },
    ],
    topProducts: [
      {
        _id: 'string',
        name: 'string',
        image: 'string',
        totalSold: 0,
        revenue: 0,
      },
    ],
    ordersByStatus: [
      {
        _id: 'string',
        count: 0,
      },
    ],
    dailyRevenue: [
      {
        _id: 'string',
        revenue: 0,
        orders: 0,
      },
    ],
    totalCustomers: 0,
  }
  return (
    <div className="container my-6 space-y-6">
      <div className="card border-accent-100 dark:border-accent-50 flex flex-col gap-3 rounded-3xl border bg-white p-6 shadow-lg dark:bg-neutral-100">
        <p className="text-accent-800 text-xs tracking-wider uppercase sm:text-sm">
          Admin overview
        </p>
        <h1 className="text-xl sm:text-2xl">Real-time commerce health</h1>
        <p className="text-xs text-gray-500 sm:text-sm">
          Monitor your storefront with AI-style clarity and live API metrics.
        </p>
      </div>
      {loading ? (
        <StatsSkeleton />
      ) : (
        <>
          <DashboardStats
            totalOrders={stats.orders.total}
            pendingOrders={stats.orders.pending}
            revenue={stats.revenue.total}
            salesForMonth={stats.revenue.thisMonth}
            topProduct={stats.topProducts[0]}
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
