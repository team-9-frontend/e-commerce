import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  useAdminTest,
  useCurrentUser,
  useForgotPasswordOtp,
  useLogin,
  useLogout,
  useSendRegisterOtp,
  useUpdateUserRole,
  useVerifyForgotPasswordOtp,
  useVerifyRegisterOtp,
} from '@repo/api'
import { authKeys } from '@repo/api//keys/authKeys'
import { authService } from '@repo/api/services/authService'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('@repo/api/services/authService', () => ({
  authService: {
    getCurrentUser: vi.fn(),
    adminTest: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    updateUserRole: vi.fn(),
    sendRegisterOtp: vi.fn(),
    verifyRegisterOtp: vi.fn(),
    sendForgotPasswordOtp: vi.fn(),
    verifyForgotPasswordOtp: vi.fn(),
  },
}))

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return { wrapper, queryClient }
}

describe('useAuth hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.localStorage.clear()
  })

  it('useCurrentUser fetches the current user', async () => {
    authService.getCurrentUser.mockResolvedValue({ id: 1, role: 'user' })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useCurrentUser(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({ id: 1, role: 'user' })
  })

  it('useAdminTest fetches admin test data', async () => {
    authService.adminTest.mockResolvedValue({ ok: true })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useAdminTest(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({ ok: true })
  })

  it('useLogin stores the token and navigates to /dashboard for an admin user', async () => {
    authService.login.mockResolvedValue({ token: 'tok123', user: { role: 'admin' } })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useLogin(), { wrapper })

    await act(async () => {
      result.current.mutate({ email: 'a@a.com', password: '123456' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.localStorage.getItem('token')).toBe('tok123')
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: authKeys.currentUser })
  })

  it('useLogin stores the token and navigates to / for a non-admin user', async () => {
    authService.login.mockResolvedValue({ token: 'tok456', user: { role: 'user' } })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useLogin(), { wrapper })

    await act(async () => {
      result.current.mutate({ email: 'b@b.com', password: '123456' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.localStorage.getItem('token')).toBe('tok456')
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('useLogout clears the token, clears the cache, and navigates to /login', async () => {
    window.localStorage.setItem('token', 'tok123')
    authService.logout.mockResolvedValue({})
    const { wrapper, queryClient } = createWrapper()
    const clearSpy = vi.spyOn(queryClient, 'clear')
    const { result } = renderHook(() => useLogout(), { wrapper })

    await act(async () => {
      result.current.mutate()
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.localStorage.getItem('token')).toBeNull()
    expect(clearSpy).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('useUpdateUserRole calls the service and invalidates the current user', async () => {
    authService.updateUserRole.mockResolvedValue({ success: true })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useUpdateUserRole(), { wrapper })

    await act(async () => {
      result.current.mutate({ role: 'admin' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(authService.updateUserRole.mock.calls[0][0]).toEqual({ role: 'admin' })
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: authKeys.currentUser })
  })

  it('useSendRegisterOtp calls the service with the given data', async () => {
    authService.sendRegisterOtp.mockResolvedValue({ sent: true })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useSendRegisterOtp(), { wrapper })

    await act(async () => {
      result.current.mutate({ email: 'c@c.com' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(authService.sendRegisterOtp.mock.calls[0][0]).toEqual({ email: 'c@c.com' })
  })

  it('useVerifyRegisterOtp calls the service with the given data', async () => {
    authService.verifyRegisterOtp.mockResolvedValue({ verified: true })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useVerifyRegisterOtp(), { wrapper })

    await act(async () => {
      result.current.mutate({ email: 'c@c.com', otp: '1234' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(authService.verifyRegisterOtp.mock.calls[0][0]).toEqual({
      email: 'c@c.com',
      otp: '1234',
    })
  })

  it('useForgotPasswordOtp calls the service with the given data', async () => {
    authService.sendForgotPasswordOtp.mockResolvedValue({ sent: true })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useForgotPasswordOtp(), { wrapper })

    await act(async () => {
      result.current.mutate({ email: 'c@c.com' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(authService.sendForgotPasswordOtp.mock.calls[0][0]).toEqual({ email: 'c@c.com' })
  })

  it('useVerifyForgotPasswordOtp calls the service with the given data', async () => {
    authService.verifyForgotPasswordOtp.mockResolvedValue({ verified: true })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useVerifyForgotPasswordOtp(), { wrapper })

    await act(async () => {
      result.current.mutate({ email: 'c@c.com', otp: '1234', newPassword: 'x' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(authService.verifyForgotPasswordOtp.mock.calls[0][0]).toEqual({
      email: 'c@c.com',
      otp: '1234',
      newPassword: 'x',
    })
  })
})
