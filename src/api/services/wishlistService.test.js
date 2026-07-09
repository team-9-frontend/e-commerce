import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

import api from '../client'
import { wishlistService } from './wishlistService'

describe('wishlistService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getMyWishlist calls GET /wishlists/my', async () => {
    api.get.mockResolvedValue({ data: { items: [] } })
    const result = await wishlistService.getMyWishlist()
    expect(api.get).toHaveBeenCalledWith('/wishlists/my')
    expect(result).toEqual({ items: [] })
  })

  it('getAllWishlist calls GET /wishlists/admin/all', async () => {
    api.get.mockResolvedValue({ data: { wishlists: [] } })
    const result = await wishlistService.getAllWishlist()
    expect(api.get).toHaveBeenCalledWith('/wishlists/admin/all')
    expect(result).toEqual({ wishlists: [] })
  })

  it('getWishlistStats calls GET /wishlists/admin/stats', async () => {
    api.get.mockResolvedValue({ data: { total: 5 } })
    const result = await wishlistService.getWishlistStats()
    expect(api.get).toHaveBeenCalledWith('/wishlists/admin/stats')
    expect(result).toEqual({ total: 5 })
  })

  it('add calls POST /wishlists/add/:productId', async () => {
    api.post.mockResolvedValue({ data: { success: true } })
    const result = await wishlistService.add('1')
    expect(api.post).toHaveBeenCalledWith('/wishlists/add/1')
    expect(result).toEqual({ success: true })
  })

  it('remove calls DELETE /wishlists/remove/:productId', async () => {
    api.delete.mockResolvedValue({ data: { success: true } })
    const result = await wishlistService.remove('1')
    expect(api.delete).toHaveBeenCalledWith('/wishlists/remove/1')
    expect(result).toEqual({ success: true })
  })

  it('clear calls DELETE /wishlists/clear', async () => {
    api.delete.mockResolvedValue({ data: { success: true } })
    const result = await wishlistService.clear()
    expect(api.delete).toHaveBeenCalledWith('/wishlists/clear')
    expect(result).toEqual({ success: true })
  })
})
