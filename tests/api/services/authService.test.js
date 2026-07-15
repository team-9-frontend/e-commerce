import { beforeEach, describe, expect, it, vi } from 'vitest'
import api from '@/api/client'
import { authService } from '@/api/services/authService'

vi.mock('@/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getCurrentUser calls GET /auth/me and returns res.data.user', async () => {
    api.get.mockResolvedValue({ data: { user: { id: 1, name: 'Ali' } } })
    const result = await authService.getCurrentUser()
    expect(api.get).toHaveBeenCalledWith('/auth/me')
    expect(result).toEqual({ id: 1, name: 'Ali' })
  })

  it('adminTest calls GET /auth/admin-test and returns res.data', async () => {
    api.get.mockResolvedValue({ data: { ok: true } })
    const result = await authService.adminTest()
    expect(api.get).toHaveBeenCalledWith('/auth/admin-test')
    expect(result).toEqual({ ok: true })
  })

  it('login calls POST /auth/login with credentials and returns res.data', async () => {
    const payload = { email: 'a@a.com', password: '123456' }
    api.post.mockResolvedValue({ data: { token: 'tok', user: { role: 'admin' } } })
    const result = await authService.login(payload)
    expect(api.post).toHaveBeenCalledWith('/auth/login', payload)
    expect(result).toEqual({ token: 'tok', user: { role: 'admin' } })
  })

  it('logout calls POST /auth/logout and returns res.data', async () => {
    api.post.mockResolvedValue({ data: { success: true } })
    const result = await authService.logout()
    expect(api.post).toHaveBeenCalledWith('/auth/logout')
    expect(result).toEqual({ success: true })
  })

  it('updateUserRole calls PATCH /auth/change-role with data', async () => {
    const payload = { role: 'admin' }
    api.patch.mockResolvedValue({ data: { success: true } })
    const result = await authService.updateUserRole(payload)
    expect(api.patch).toHaveBeenCalledWith('/auth/change-role', payload)
    expect(result).toEqual({ success: true })
  })

  it('sendRegisterOtp calls POST /auth/register/send-otp with data', async () => {
    const payload = { email: 'a@a.com' }
    api.post.mockResolvedValue({ data: { sent: true } })
    const result = await authService.sendRegisterOtp(payload)
    expect(api.post).toHaveBeenCalledWith('/auth/register/send-otp', payload)
    expect(result).toEqual({ sent: true })
  })

  it('verifyRegisterOtp calls POST /auth/register/verify-otp with data', async () => {
    const payload = { email: 'a@a.com', otp: '1234' }
    api.post.mockResolvedValue({ data: { verified: true } })
    const result = await authService.verifyRegisterOtp(payload)
    expect(api.post).toHaveBeenCalledWith('/auth/register/verify-otp', payload)
    expect(result).toEqual({ verified: true })
  })

  it('sendForgotPasswordOtp calls POST /auth/forgot-password/send-otp with data', async () => {
    const payload = { email: 'a@a.com' }
    api.post.mockResolvedValue({ data: { sent: true } })
    const result = await authService.sendForgotPasswordOtp(payload)
    expect(api.post).toHaveBeenCalledWith('/auth/forgot-password/send-otp', payload)
    expect(result).toEqual({ sent: true })
  })

  it('verifyForgotPasswordOtp calls POST /auth/forgot-password/verify-otp with data', async () => {
    const payload = { email: 'a@a.com', otp: '1234', newPassword: 'x' }
    api.post.mockResolvedValue({ data: { verified: true } })
    const result = await authService.verifyForgotPasswordOtp(payload)
    expect(api.post).toHaveBeenCalledWith('/auth/forgot-password/verify-otp', payload)
    expect(result).toEqual({ verified: true })
  })
})
