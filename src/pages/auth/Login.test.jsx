import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('@/api/services/authService', () => ({
  authService: {
    login: vi.fn(),
  },
}))

import { authService } from '@/api/services/authService'
import Login from './Login'

function renderLogin() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

async function fillAndSubmit(email, password) {
  await userEvent.type(screen.getByPlaceholderText('Enter your email'), email)
  await userEvent.type(screen.getByPlaceholderText('Enter your password'), password)
  await userEvent.click(screen.getByRole('button', { name: /login/i }))
}

describe('Login', () => {
  beforeEach(() => {
    authService.login.mockReset()
    mockNavigate.mockClear()
    localStorage.clear()
  })

  it('يعرض رسالة خطأ لو سايب الإيميل فاضي وعمل blur', async () => {
    renderLogin()
    const emailInput = screen.getByPlaceholderText('Enter your email')
    await userEvent.click(emailInput)
    await userEvent.tab()
    expect(await screen.findByText('Email is required')).toBeInTheDocument()
  })

  it('يعرض رسالة خطأ لو الإيميل مش بصيغة صحيحة', async () => {
    renderLogin()
    const emailInput = screen.getByPlaceholderText('Enter your email')
    await userEvent.type(emailInput, 'not-an-email')
    await userEvent.tab()
    expect(await screen.findByText('Invalid email address')).toBeInTheDocument()
  })

  it('يعرض رسالة خطأ لو الباسورد أقل من 8 حروف', async () => {
    renderLogin()
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    await userEvent.type(passwordInput, '123')
    await userEvent.tab()
    expect(await screen.findByText('Must be at least 8 characters')).toBeInTheDocument()
  })

  it('مايبعتش submit خالص لو الفورم فيها أخطاء validation', async () => {
    renderLogin()
    await userEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
    expect(authService.login).not.toHaveBeenCalled()
  })

  it('يبعت الإيميل والباسورد الصح لـ authService.login', async () => {
    authService.login.mockResolvedValueOnce({ token: 'abc', user: { role: 'user' } })
    renderLogin()
    await fillAndSubmit('amr@test.com', '12345678')
  await waitFor(() => {
      expect(authService.login).toHaveBeenCalled()
    })
    expect(authService.login.mock.calls[0][0]).toEqual({
      email: 'amr@test.com',
      password: '12345678',
    
    })
  })

  it('يوديك على "/dashboard" لو role = admin', async () => {
    authService.login.mockResolvedValueOnce({ token: 'abc', user: { role: 'admin' } })
    renderLogin()
    await fillAndSubmit('admin@test.com', 'adminpass123')
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('يوديك على "/" لو role مش admin', async () => {
    authService.login.mockResolvedValueOnce({ token: 'abc', user: { role: 'user' } })
    renderLogin()
    await fillAndSubmit('amr@test.com', '12345678')
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('لو الـ API رمى error فيه رسالة من السيرفر، يعرضها', async () => {
    authService.login.mockRejectedValueOnce({
      response: { data: { message: 'حساب موقوف' } },
    })
    renderLogin()
    await fillAndSubmit('amr@test.com', '12345678')
    expect(await screen.findByText('حساب موقوف')).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('لو الـ error من غير رسالة سيرفر (زي network error)، يعرض "Invalid credentials"', async () => {
    authService.login.mockRejectedValueOnce(new Error('Network Error'))
    renderLogin()
    await fillAndSubmit('amr@test.com', '12345678')
    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument()
  })

  it('يعطل الزرار ويكتب "Loading..." وقت الـ submit', async () => {
    let resolveLogin
    authService.login.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveLogin = resolve
        }),
    )
    renderLogin()
    await fillAndSubmit('amr@test.com', '12345678')
    expect(screen.getByRole('button', { name: /loading/i })).toBeDisabled()
    resolveLogin({ token: 'abc', user: { role: 'user' } })
    await waitFor(() => expect(mockNavigate).toHaveBeenCalled())
  })
})