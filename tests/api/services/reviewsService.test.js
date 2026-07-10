import { beforeEach, describe, expect, it, vi } from 'vitest'

import api from '@/api/client'

import { reviewsService } from '@/api/services/reviewsService'

vi.mock('@/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('reviewsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getByProductId calls GET /products/:id/reviews', async () => {
    api.get.mockResolvedValue({ data: { reviews: [] } })
    const result = await reviewsService.getByProductId('1')
    expect(api.get).toHaveBeenCalledWith('/products/1/reviews')
    expect(result).toEqual({ reviews: [] })
  })

  it('create calls POST /products/:id/reviews with data', async () => {
    const payload = { rating: 5, comment: 'Great!' }
    api.post.mockResolvedValue({ data: { id: 'r1', ...payload } })
    const result = await reviewsService.create('1', payload)
    expect(api.post).toHaveBeenCalledWith('/products/1/reviews', payload)
    expect(result).toEqual({ id: 'r1', ...payload })
  })

  it('remove calls DELETE /products/:productId/reviews/:reviewId', async () => {
    api.delete.mockResolvedValue({ data: { success: true } })
    const result = await reviewsService.remove('1', 'r1')
    expect(api.delete).toHaveBeenCalledWith('/products/1/reviews/r1')
    expect(result).toEqual({ success: true })
  })
})
