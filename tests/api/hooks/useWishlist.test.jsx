import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  useAddToWishlist,
  useClearWishlist,
  useGetAllWishlist,
  useGetWishlist,
  useGetWishlistStats,
  useRemoveFromWishlist,
  wishlistKeys,
  wishlistService,
} from '@repo/api'

vi.mock('@repo/api', () => ({
  wishlistService: {
    getMyWishlist: vi.fn(),
    getAllWishlist: vi.fn(),
    getWishlistStats: vi.fn(),
    add: vi.fn(),
    remove: vi.fn(),
    clear: vi.fn(),
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

describe('useWishlist query hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useGetWishlist fetches the user wishlist', async () => {
    wishlistService.getMyWishlist.mockResolvedValue({ items: [] })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetWishlist(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({ items: [] })
  })

  it('useGetAllWishlist fetches all wishlists for admin', async () => {
    wishlistService.getAllWishlist.mockResolvedValue({ wishlists: [] })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetAllWishlist(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({ wishlists: [] })
  })

  it('useGetWishlistStats fetches wishlist stats', async () => {
    wishlistService.getWishlistStats.mockResolvedValue({ total: 5 })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetWishlistStats(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({ total: 5 })
  })
})

describe('useWishlist mutation hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it.each([
    ['useAddToWishlist', useAddToWishlist, wishlistService.add, '1'],
    ['useRemoveFromWishlist', useRemoveFromWishlist, wishlistService.remove, '1'],
    ['useClearWishlist', useClearWishlist, wishlistService.clear, undefined],
  ])(
    '%s calls the matching service and invalidates user + admin wishlist',
    async (_name, hook, serviceFn, arg) => {
      serviceFn.mockResolvedValue({ success: true })
      const { wrapper, queryClient } = createWrapper()
      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
      const { result } = renderHook(() => hook(), { wrapper })

      await act(async () => {
        result.current.mutate(arg)
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))
      expect(serviceFn.mock.calls[0][0]).toEqual(arg)
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: wishlistKeys.user })
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: wishlistKeys.admin.all })
    },
  )
})
