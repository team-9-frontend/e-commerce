import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { userKeys } from '@/api//keys/userKeys'
import { usersService } from '@/api/services/usersService'

import {
  useAddUser,
  useDeleteUser,
  useGetAllUsers,
  useGetUserById,
  useUpdateUser,
} from '@/api/hooks/useUsers'

vi.mock('@/api/services/usersService', () => ({
  usersService: {
    getAll: vi.fn(),
    getById: vi.fn(),
    add: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
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

describe('useUsers query hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useGetAllUsers fetches all users', async () => {
    usersService.getAll.mockResolvedValue({ users: [] })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetAllUsers(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({ users: [] })
  })

  it('useGetUserById fetches a user when id is provided', async () => {
    usersService.getById.mockResolvedValue({ id: '1' })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetUserById('1'), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(usersService.getById).toHaveBeenCalledWith('1')
  })

  it('useGetUserById stays disabled when no id is provided', () => {
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetUserById(undefined), { wrapper })

    expect(result.current.fetchStatus).toBe('idle')
    expect(usersService.getById).not.toHaveBeenCalled()
  })
})

describe('useUsers mutation hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useAddUser calls the service and invalidates users on success', async () => {
    usersService.add.mockResolvedValue({ id: '2' })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useAddUser(), { wrapper })
    const payload = { name: 'Sara', email: 's@s.com' }

    await act(async () => {
      result.current.mutate(payload)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(usersService.add.mock.calls[0][0]).toEqual(payload)
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: userKeys.all })
  })

  it('useUpdateUser calls the service with id and data', async () => {
    usersService.update.mockResolvedValue({ success: true })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useUpdateUser(), { wrapper })

    await act(async () => {
      result.current.mutate({ id: '2', data: { name: 'Sara Updated' } })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(usersService.update).toHaveBeenCalledWith('2', { name: 'Sara Updated' })
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: userKeys.all })
  })

  it('useDeleteUser calls the service with id', async () => {
    usersService.remove.mockResolvedValue({ success: true })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useDeleteUser(), { wrapper })

    await act(async () => {
      result.current.mutate('2')
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(usersService.remove).toHaveBeenCalledWith('2')
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: userKeys.all })
  })
})
