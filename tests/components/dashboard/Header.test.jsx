import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Header from '@/components/dashboard/Header'

const mockUseTheme = vi.fn()
vi.mock('next-themes', () => ({
  useTheme: (...args) => mockUseTheme(...args),
}))

const mockUseCurrentUser = vi.fn()
vi.mock('@/api', () => ({
  useCurrentUser: (...args) => mockUseCurrentUser(...args),
}))

vi.mock('@/components/ui/Tooltip', () => ({
  default: ({ children }) => <div>{children}</div>,
}))

function renderHeader(props = {}) {
  const defaultProps = {
    open: false,
    setOpen: vi.fn(),
    minimized: false,
    setMinimized: vi.fn(),
    className: '',
  }
  return render(
    <MemoryRouter>
      <Header {...defaultProps} {...props} />
    </MemoryRouter>,
  )
}

describe('Header', () => {
  beforeEach(() => {
    mockUseTheme.mockReset()
    mockUseCurrentUser.mockReset()
  })

  it('يعرض avatar/username/role لو موجودين، والثيم light', () => {
    mockUseTheme.mockReturnValue({ theme: 'light', setTheme: vi.fn() })
    mockUseCurrentUser.mockReturnValue({
      data: { avatar: '/avatar.jpg', username: 'amr', role: 'admin' },
    })
    renderHeader({ open: false, minimized: false })

    expect(screen.getByAltText('avatar')).toHaveAttribute('src', '/avatar.jpg')
    expect(screen.getByText('amr')).toBeInTheDocument()
    expect(screen.getByText('admin')).toBeInTheDocument()
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
  })

  it('يستخدم fallback ("username", "guest") ويعرض أيقونة افتراضية لو مفيش avatar، والثيم dark', () => {
    mockUseTheme.mockReturnValue({ theme: 'dark', setTheme: vi.fn() })
    mockUseCurrentUser.mockReturnValue({ data: {} })
    renderHeader({ open: true, minimized: true })

    expect(screen.queryByAltText('avatar')).not.toBeInTheDocument()
    expect(screen.getByText('username')).toBeInTheDocument()
    expect(screen.getByText('guest')).toBeInTheDocument()
    expect(screen.getByText('Light Mode')).toBeInTheDocument()
  })

  it('زرار فتح/قفل السايدبار (موبايل) بينادي setOpen بعكس القيمة الحالية', () => {
    mockUseTheme.mockReturnValue({ theme: 'light', setTheme: vi.fn() })
    mockUseCurrentUser.mockReturnValue({ data: { username: 'amr', role: 'admin' } })
    const setOpen = vi.fn()
    const { container } = renderHeader({ open: false, setOpen })

    fireEvent.click(container.querySelectorAll('button')[0])
    expect(setOpen).toHaveBeenCalledWith(true)
  })

  it('زرار تصغير السايدبار بينادي setMinimized بعكس القيمة الحالية', () => {
    mockUseTheme.mockReturnValue({ theme: 'light', setTheme: vi.fn() })
    mockUseCurrentUser.mockReturnValue({ data: { username: 'amr', role: 'admin' } })
    const setMinimized = vi.fn()
    const { container } = renderHeader({ minimized: false, setMinimized })

    fireEvent.click(container.querySelectorAll('button')[1])
    expect(setMinimized).toHaveBeenCalledWith(true)
  })

  it('زرار تبديل الثيم بينادي setTheme("dark") لو الحالي light', () => {
    const setTheme = vi.fn()
    mockUseTheme.mockReturnValue({ theme: 'light', setTheme })
    mockUseCurrentUser.mockReturnValue({ data: { username: 'amr', role: 'admin' } })
    const { container } = renderHeader()

    fireEvent.click(container.querySelectorAll('button')[2])
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('زرار تبديل الثيم بينادي setTheme("light") لو الحالي dark', () => {
    const setTheme = vi.fn()
    mockUseTheme.mockReturnValue({ theme: 'dark', setTheme })
    mockUseCurrentUser.mockReturnValue({ data: { username: 'amr', role: 'admin' } })
    const { container } = renderHeader()

    fireEvent.click(container.querySelectorAll('button')[2])
    expect(setTheme).toHaveBeenCalledWith('light')
  })
})
