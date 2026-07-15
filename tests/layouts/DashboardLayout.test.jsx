import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import DashboardLayout from '@/layouts/DashboardLayout'

const mockNavigate = vi.fn()
const mockUseCurrentUser = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Outlet: () => <div>Outlet-mock</div>,
  }
})

vi.mock('@/api', () => ({
  useCurrentUser: (...args) => mockUseCurrentUser(...args),
}))

vi.mock('@/components/dashboard/Header', () => ({
  default: () => <div>Header-mock</div>,
}))
vi.mock('@/components/dashboard/Sidebar', () => ({
  default: () => <div>Sidebar-mock</div>,
}))

describe('DashboardLayout', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    mockUseCurrentUser.mockReset()
  })

  it('يعرض "Loading..." وقت isPending، ومايعملش أي redirect', () => {
    mockUseCurrentUser.mockReturnValue({ data: undefined, isPending: true })
    render(<DashboardLayout />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('يودّي على /login لو مفيش يوزر (مش مسجل دخول)', () => {
    mockUseCurrentUser.mockReturnValue({ data: null, isPending: false })
    render(<DashboardLayout />)
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('يودّي على "/" لو اليوزر موجود بس role مش admin', () => {
    mockUseCurrentUser.mockReturnValue({ data: { role: 'user' }, isPending: false })
    render(<DashboardLayout />)
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('يعرض Header وSidebar وOutlet لو اليوزر admin، من غير أي redirect', () => {
    mockUseCurrentUser.mockReturnValue({ data: { role: 'admin' }, isPending: false })
    render(<DashboardLayout />)
    expect(screen.getByText('Header-mock')).toBeInTheDocument()
    expect(screen.getByText('Sidebar-mock')).toBeInTheDocument()
    expect(screen.getByText('Outlet-mock')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('زرار الـ overlay بيتحكم في class الفتح/القفل بتاع الموبايل (open state)', () => {
    mockUseCurrentUser.mockReturnValue({ data: { role: 'admin' }, isPending: false })
    const { container } = render(<DashboardLayout />)

    const overlayButton = container.querySelector('button')
    expect(overlayButton).toHaveClass('hidden')
    expect(overlayButton).not.toHaveClass('block')

    fireEvent.click(overlayButton)
    expect(overlayButton).toHaveClass('block')
    expect(overlayButton).not.toHaveClass('hidden')

    fireEvent.click(overlayButton)
    expect(overlayButton).toHaveClass('hidden')
  })
})
