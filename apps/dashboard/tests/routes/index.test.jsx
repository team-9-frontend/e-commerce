import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import AppRoutes from '@/routes/index'

vi.mock('@repo/utils', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}))

// mock Ø´Ø§Ù…Ù„ Ù„Ù€ @repo/api: Header Ø¨ÙŠØ³ØªØ®Ø¯Ù… useCurrentUserØŒ Sidebar Ø¨ÙŠØ³ØªØ®Ø¯Ù… useLogoutØŒ
// Ùˆ DashboardLayout Ø¨ÙŠØ³ØªØ®Ø¯Ù… useCurrentUser ÙƒÙ…Ø§Ù† (auth guard)ØŒ ÙˆDashboard page Ø¨ÙŠØ³ØªØ®Ø¯Ù… useGetOrdersStats
// Ù…Ù‡Ù…: Ù„Ø§Ø²Ù… Ø§Ù„Ù€ user object ÙŠÙƒÙˆÙ† Ù†ÙØ³ Ø§Ù„Ù€ reference ÙÙŠ ÙƒÙ„ Ø§Ø³ØªØ¯Ø¹Ø§Ø¡ØŒ
// ÙˆØ¥Ù„Ø§ DashboardLayout's useEffect (Ø§Ù„Ù„ÙŠ Ù…Ø¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ [user, ...]) Ù‡ÙŠØ¯Ø®Ù„ infinite loop
// Ù„Ø£Ù†Ù‡ Ù‡ÙŠØ­Ø³ Ø¥Ù† user "Ø§ØªØºÙŠØ±" ÙÙŠ ÙƒÙ„ render Ù…Ø¹ Ø¥Ù† Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù†ÙØ³Ù‡Ø§ ÙØ¹Ù„ÙŠÙ‹Ø§.
const mockAdminUser = { username: 'amr', role: 'admin' }

vi.mock('@repo/api', () => ({
  useCurrentUser: () => ({ data: mockAdminUser, isLoading: false, isError: false }),
  useLogin: () => ({ mutateAsync: vi.fn() }),
  useLogout: () => ({ mutateAsync: vi.fn() }),
  useGetOrdersStats: () => ({
    data: {
      dashboard: {
        orders: { total: 0, pending: 0 },
        revenue: { total: 0, thisMonth: 0 },
        topProducts: [],
        totalCustomers: 0,
        recentOrders: [],
      },
    },
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  }),
  useGetProducts: () => ({
    data: { products: [], total: 0 },
    isLoading: false,
    isError: false,
    error: null,
  }),
}))

function renderAtPath(path) {
  window.history.pushState({}, '', path)
  return render(<AppRoutes />)
}

describe('AppRoutes - smoke test', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('"/" Ø¨ÙŠØ±Ù†Ø¯Ø± ØµÙØ­Ø© Home', () => {
    renderAtPath('/')
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })

  it('"/products" Ø¨ÙŠØ±Ù†Ø¯Ø± ØµÙØ­Ø© Products', () => {
    renderAtPath('/products')
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })

  it('"/login" Ø¨ÙŠØ±Ù†Ø¯Ø± ÙÙˆØ±Ù… Ø§Ù„Ù€ Login Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ', () => {
    renderAtPath('/login')
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('Ù…Ø³Ø§Ø± Ù…Ø´ Ù…ÙˆØ¬ÙˆØ¯ Ø¨ÙŠØ±Ù†Ø¯Ø± NotFound', () => {
    renderAtPath('/random-page-1234')
    expect(screen.getByText('Page not found')).toBeInTheDocument()
  })

  it('"/dashboard" Ø¨ÙŠØ±Ù†Ø¯Ø± DashboardLayout (Header + Sidebar) + ØµÙØ­Ø© Dashboard Ù„Ù€ admin', async () => {
    renderAtPath('/dashboard')

    await waitFor(() => {
      expect(screen.getByText(/LOOM/)).toBeInTheDocument() // Ù…Ù† Header
    })
    expect(screen.getAllByText('Products').length).toBeGreaterThan(0) // Ù…Ù† Sidebar
    expect(screen.getByText('Real-time commerce health')).toBeInTheDocument() // Ù…Ù† Dashboard page
  })

  // âš ï¸ Ø§ÙƒØªØ´ÙÙ†Ø§ Ø³Ù„ÙˆÙƒ Ù…Ù‡Ù… Ø£Ø«Ù†Ø§Ø¡ ÙƒØªØ§Ø¨Ø© Ø§Ù„ØªØ³Øª Ø¯Ù‡ ÙŠØ³ØªØ­Ù‚ ØªØªØ£ÙƒØ¯ÙˆØ§ Ù…Ù†Ù‡ Ù…Ø¹ Ø§Ù„ÙØ±ÙŠÙ‚:
  // DashboardLayout Ø¹Ù†Ø¯Ù‡ useEffect Ø¨ÙŠØ¹Ù…Ù„ navigate('/dashboard') Ù„Ø£ÙŠ admin Ø¨ØºØ¶ Ø§Ù„Ù†Ø¸Ø±
  // Ø¹Ù† Ø§Ù„Ù…Ø³Ø§Ø± Ø§Ù„ÙØ±Ø¹ÙŠ Ø§Ù„Ø­Ø§Ù„ÙŠ (Ø²ÙŠ /dashboard/products)ØŒ Ù„Ø£Ù† Ø§Ù„Ù€ effect Ù…Ù„ÙˆØ´ dependency
  // Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø³Ø§Ø± Ù†ÙØ³Ù‡. ÙŠØ¹Ù†ÙŠ Ø¹Ù…Ù„ÙŠÙ‹Ø§: Ù…Ø³ØªØ­ÙŠÙ„ ØªØ¹Ù…Ù„ refresh Ø¹Ù„Ù‰ /dashboard/products Ù…Ø¨Ø§Ø´Ø±Ø©
  // Ù…Ù† ØºÙŠØ± Ù…Ø§ ØªØ±Ø¬Ø¹ ØªÙ„Ù‚Ø§Ø¦ÙŠÙ‹Ø§ Ù„Ù€ /dashboard. Ø§Ù„ØªØ³Øª Ø¯Ù‡ Ø¨ÙŠÙˆØ«Ù‚ Ø§Ù„Ø³Ù„ÙˆÙƒ Ø§Ù„Ø­Ø§Ù„ÙŠ (Ù…Ø´ Ø¨ÙŠØ­ÙƒÙ… Ø¹Ù„ÙŠÙ‡
  // ØµØ­ Ø£Ùˆ ØºÙ„Ø·) Ø¹Ø´Ø§Ù† Ø§Ù„ÙØ±ÙŠÙ‚ ÙŠÙ‚Ø±Ø± Ø¹Ø§ÙŠØ²ÙŠÙ†Ù‡ ÙØ¹Ù„Ø§Ù‹ ÙƒØ¯Ù‡ ÙˆÙ„Ø§ Ù„Ø£.
  it('"/dashboard/products" Ø¨ÙŠØ±Ù†Ø¯Ø± ØµÙØ­Ø© Products Ø¨ØªØ§Ø¹Ø© Ø§Ù„Ø¯Ø§Ø´Ø¨ÙˆØ±Ø¯ Ù…Ù† ØºÙŠØ± Ø£ÙŠ redirect', async () => {
    renderAtPath('/dashboard/products')

    await waitFor(() => {
      expect(screen.getByText(/LOOM/)).toBeInTheDocument() // Header Ø§ØªØ­Ù…Ù„
    })
    expect(window.location.pathname).toBe('/dashboard/products')
    expect(screen.getAllByText('Products')[0]).toBeInTheDocument()
  })
})
