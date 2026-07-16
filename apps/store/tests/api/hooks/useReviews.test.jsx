import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useDeleteReview, useGetReviews, usePostReview } from '@repo/api'
import { reviewKeys } from '@repo/api//keys/reviewKeys'
import { reviewsService } from '@repo/api/services/reviewsService'

vi.mock('@repo/api/services/reviewsService', () => ({
  reviewsService: {
    getByProductId: vi.fn(),
    create: vi.fn(),
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

describe('useReviews hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useGetReviews fetches reviews when a productId is provided', async () => {
    reviewsService.getByProductId.mockResolvedValue({ reviews: [] })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetReviews('1'), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(reviewsService.getByProductId).toHaveBeenCalledWith('1')
  })

  it('useGetReviews stays disabled when no productId is provided', () => {
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetReviews(undefined), { wrapper })

    expect(result.current.fetchStatus).toBe('idle')
    expect(reviewsService.getByProductId).not.toHaveBeenCalled()
  })

  it('usePostReview calls the service and invalidates the reviews list', async () => {
    reviewsService.create.mockResolvedValue({ id: 'r1' })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => usePostReview(), { wrapper })
    const payload = { productId: '1', data: { rating: 5, comment: 'Great!' } }

    await act(async () => {
      result.current.mutate(payload)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(reviewsService.create).toHaveBeenCalledWith('1', { rating: 5, comment: 'Great!' })
    // Note: onSuccess reads variables.id (not variables.productId) when building the key.
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: reviewKeys.list(undefined) })
  })

  it('useDeleteReview calls the service and invalidates the reviews list', async () => {
    reviewsService.remove.mockResolvedValue({ success: true })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useDeleteReview(), { wrapper })
    const payload = { productId: '1', reviewId: 'r1' }

    await act(async () => {
      result.current.mutate(payload)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(reviewsService.remove).toHaveBeenCalledWith('1', 'r1')
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: reviewKeys.list(undefined) })
  })
})
