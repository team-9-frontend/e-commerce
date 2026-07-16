import { fireEvent, render, screen } from '@testing-library/react'
import Sidebar from 'apps/dashboard/src/components/Sidebar'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockUseLogout = vi.fn()
vi.mock('@repo/api', () => ({
  useLogout: (...args) => mockUseLogout(...args),
}))

vi.mock('@repo/ui', () => ({
  default: ({ children }) => <div>{children}</div>,
}))

function renderSidebar(props = {}, route = '/dashboard') {
  const defaultProps = { className: '', open: false, minimized: false }
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Sidebar {...defaultProps} {...props} />
    </MemoryRouter>,
  )
}

describe('Sidebar', () => {
  beforeEach(() => {
    mockUseLogout.mockReset()
  })

  it('يعرض كل الـ 7 لينكات، والمسار الحالي (/dashboard) بيخلي أول لينك active', () => {
    mockUseLogout.mockReturnValue({ mutate: vi.fn(), isPending: false })
    renderSidebar({ minimized: false, open: false }, '/dashboard')

    const links = screen.getAllByRole('link')
    expect(links.length).toBe(7)
    expect(links[0]).toHaveClass('bg-accent-500')
    // باقي اللينكات (مش /dashboard) المفروض تبقى inactive
    expect(links[1]).not.toHaveClass('bg-accent-500')
  })

  it('لو المسار الحالي مش مطابق لأي لينك (كله inactive)، والسايدبار minimized ومفتوح، بيرندر من غير كراش', () => {
    mockUseLogout.mockReturnValue({ mutate: vi.fn(), isPending: false })
    const { container } = renderSidebar({ minimized: true, open: true }, '/some-other-page')

    expect(container.querySelector('aside')).toBeInTheDocument()
    const links = screen.getAllByRole('link')
    links.forEach((link) => expect(link).not.toHaveClass('bg-accent-500'))
  })

  it('الدوس على Logout بينادي دالة logout', () => {
    const logout = vi.fn()
    mockUseLogout.mockReturnValue({ mutate: logout, isPending: false })
    renderSidebar()

    fireEvent.click(screen.getByRole('button', { name: /logout/i }))
    expect(logout).toHaveBeenCalledTimes(1)
  })

  it('زرار Logout بيتعطل وقت isPending = true', () => {
    mockUseLogout.mockReturnValue({ mutate: vi.fn(), isPending: true })
    renderSidebar()

    expect(screen.getByRole('button', { name: /logout/i })).toBeDisabled()
  })
})
