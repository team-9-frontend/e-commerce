import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}))

// mock شامل لـ @/api: Header بيستخدم useCurrentUser، Sidebar بيستخدم useLogout،
// و DashboardLayout بيستخدم useCurrentUser كمان (auth guard)، وDashboard page بيستخدم useGetOrdersStats
// مهم: لازم الـ user object يكون نفس الـ reference في كل استدعاء،
// وإلا DashboardLayout's useEffect (اللي معتمد على [user, ...]) هيدخل infinite loop
// لأنه هيحس إن user "اتغير" في كل render مع إن البيانات نفسها فعليًا.
const mockAdminUser = { username: 'amr', role: 'admin' }

vi.mock('@/api', () => ({
  useCurrentUser: () => ({ data: mockAdminUser, isLoading: false, isError: false }),
  useLogin: () => ({ mutateAsync: vi.fn() }),
  useLogout: () => ({ mutateAsync: vi.fn() }),
useGetOrdersStats: () => ({
    data: { dashboard: { orders: { total: 0, pending: 0 }, revenue: { total: 0, thisMonth: 0 }, topProducts: [], totalCustomers: 0, recentOrders: [] } },
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  }),
}))

import AppRoutes from './index'

function renderAtPath(path) {
  window.history.pushState({}, '', path)
  return render(<AppRoutes />)
}

describe('AppRoutes - smoke test', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('"/" بيرندر صفحة Home', () => {
    renderAtPath('/')
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })

  it('"/products" بيرندر صفحة Products', () => {
    renderAtPath('/products')
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })

  it('"/login" بيرندر فورم الـ Login الحقيقي', () => {
    renderAtPath('/login')
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('مسار مش موجود بيرندر NotFound', () => {
    renderAtPath('/random-page-1234')
    expect(screen.getByText('Page not found')).toBeInTheDocument()
  })

  it('"/dashboard" بيرندر DashboardLayout (Header + Sidebar) + صفحة Dashboard لـ admin', async () => {
    renderAtPath('/dashboard')

    await waitFor(() => {
      expect(screen.getByText(/LOOM/)).toBeInTheDocument() // من Header
    })
    expect(screen.getAllByText('Products').length).toBeGreaterThan(0) // من Sidebar
    expect(screen.getByText('Real-time commerce health')).toBeInTheDocument() // من Dashboard page
  })

  // ⚠️ اكتشفنا سلوك مهم أثناء كتابة التست ده يستحق تتأكدوا منه مع الفريق:
  // DashboardLayout عنده useEffect بيعمل navigate('/dashboard') لأي admin بغض النظر
  // عن المسار الفرعي الحالي (زي /dashboard/products)، لأن الـ effect ملوش dependency
  // على المسار نفسه. يعني عمليًا: مستحيل تعمل refresh على /dashboard/products مباشرة
  // من غير ما ترجع تلقائيًا لـ /dashboard. التست ده بيوثق السلوك الحالي (مش بيحكم عليه
  // صح أو غلط) عشان الفريق يقرر عايزينه فعلاً كده ولا لأ.
it('"/dashboard/products" بيرندر صفحة Products بتاعة الداشبورد من غير أي redirect', async () => {
    renderAtPath('/dashboard/products')

    await waitFor(() => {
      expect(screen.getByText(/LOOM/)).toBeInTheDocument() // Header اتحمل
    })
    expect(window.location.pathname).toBe('/dashboard/products')
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })  
})
