import { fireEvent, render, screen } from '@testing-library/react'
import AdminDashboard from 'apps/dashboard/src/pages/dashboard/Dashboard'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockRefetch = vi.fn()
const mockUseGetOrdersStats = vi.fn()

vi.mock('@repo/api', () => ({
  useGetOrdersStats: (...args) => mockUseGetOrdersStats(...args),
}))

// بنعمل mock للكومبوننتات الفرعية عشان التست ده يركز بس على منطق
// الـ AdminDashboard نفسه (loading / error / success)، وكل كومبوننت
// من دول متغطي بتستاته الخاصة بيه لوحده.
vi.mock('apps/dashboard/src/components/stats/DashboardStats', () => ({
  default: () => <div>DashboardStats-mock</div>,
}))
vi.mock('apps/dashboard/src/components/stats/OrderStatus', () => ({
  default: () => <div>OrderStatus-mock</div>,
}))
vi.mock('apps/dashboard/src/components/stats/RecentOrders', () => ({
  default: () => <div>RecentOrders-mock</div>,
}))
vi.mock('apps/dashboard/src/components/stats/StatsSkeleton', () => ({
  default: () => <div>StatsSkeleton-mock</div>,
}))
vi.mock('apps/dashboard/src/components/stats/TopProducts', () => ({
  default: () => <div>TopProducts-mock</div>,
}))

describe('AdminDashboard', () => {
  beforeEach(() => {
    mockUseGetOrdersStats.mockReset()
    mockRefetch.mockReset()
  })

  it('يعرض StatsSkeleton وقت التحميل (isPending)', () => {
    mockUseGetOrdersStats.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      refetch: mockRefetch,
    })
    render(<AdminDashboard />)
    expect(screen.getByText('StatsSkeleton-mock')).toBeInTheDocument()
    expect(screen.queryByText('DashboardStats-mock')).not.toBeInTheDocument()
  })

  it('يعرض رسالة الخطأ وزرار Retry لو isError، وينادي refetch عند الضغط', () => {
    mockUseGetOrdersStats.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      refetch: mockRefetch,
    })
    render(<AdminDashboard />)
    expect(screen.getByText(/Error:/)).toBeInTheDocument()

    const retryButton = screen.getByRole('button', { name: /retry/i })
    fireEvent.click(retryButton)
    expect(mockRefetch).toHaveBeenCalledTimes(1)
  })

  it('يعرض كل كومبوننتات الداشبورد لو البيانات جاهزة (success)', () => {
    mockUseGetOrdersStats.mockReturnValue({
      data: {
        dashboard: {
          orders: { total: 100, pending: 5 },
          revenue: { total: 5000, thisMonth: 800 },
          topProducts: [{ _id: '1', name: 'Mouse', totalSold: 10 }],
          totalCustomers: 200,
          recentOrders: [],
        },
      },
      isPending: false,
      isError: false,
      refetch: mockRefetch,
    })
    render(<AdminDashboard />)

    expect(screen.getByText('DashboardStats-mock')).toBeInTheDocument()
    expect(screen.getByText('OrderStatus-mock')).toBeInTheDocument()
    expect(screen.getByText('TopProducts-mock')).toBeInTheDocument()
    expect(screen.getByText('RecentOrders-mock')).toBeInTheDocument()
    expect(screen.queryByText('StatsSkeleton-mock')).not.toBeInTheDocument()
    expect(screen.queryByText(/Error:/)).not.toBeInTheDocument()
  })
})
