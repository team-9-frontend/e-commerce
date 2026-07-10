import { beforeEach, describe, expect, it, vi } from 'vitest'

import api from '@/api/client'

import { usersService } from '@/api/services/usersService'

vi.mock('@/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('usersService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getAll calls GET /users/all', async () => {
    api.get.mockResolvedValue({ data: { users: [] } })
    const result = await usersService.getAll()
    expect(api.get).toHaveBeenCalledWith('/users/all')
    expect(result).toEqual({ users: [] })
  })

  it('getById calls GET /users/:id', async () => {
    api.get.mockResolvedValue({ data: { id: '1' } })
    const result = await usersService.getById('1')
    expect(api.get).toHaveBeenCalledWith('/users/1')
    expect(result).toEqual({ id: '1' })
  })

  it('add calls POST /users/add with data', async () => {
    const payload = { name: 'Sara', email: 's@s.com' }
    api.post.mockResolvedValue({ data: { id: '2', ...payload } })
    const result = await usersService.add(payload)
    expect(api.post).toHaveBeenCalledWith('/users/add', payload)
    expect(result).toEqual({ id: '2', ...payload })
  })

  it('update calls PATCH /users/:id with data', async () => {
    const payload = { name: 'Sara Updated' }
    api.patch.mockResolvedValue({ data: { success: true } })
    const result = await usersService.update('2', payload)
    expect(api.patch).toHaveBeenCalledWith('/users/2', payload)
    expect(result).toEqual({ success: true })
  })

  it('remove calls DELETE /users/:id', async () => {
    api.delete.mockResolvedValue({ data: { success: true } })
    const result = await usersService.remove('2')
    expect(api.delete).toHaveBeenCalledWith('/users/2')
    expect(result).toEqual({ success: true })
  })
})
