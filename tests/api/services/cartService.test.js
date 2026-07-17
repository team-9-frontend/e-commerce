import { beforeEach, describe, expect, it, vi } from 'vitest'

import api, { cartService } from '@repo/api'

vi.mock('@repo/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('cartService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getCart calls GET /carts and returns res.data', async () => {
    api.get.mockResolvedValue({ data: { items: [] } })
    const result = await cartService.getCart()
    expect(api.get).toHaveBeenCalledWith('/carts')
    expect(result).toEqual({ items: [] })
  })

  it('addItem calls POST /carts/items with data', async () => {
    const payload = { productId: '1', quantity: 2 }
    api.post.mockResolvedValue({ data: { success: true } })
    const result = await cartService.addItem(payload)
    expect(api.post).toHaveBeenCalledWith('/carts/items', payload)
    expect(result).toEqual({ success: true })
  })

  it('applyCoupon calls POST /carts/coupon with data', async () => {
    const payload = { code: 'SAVE10' }
    api.post.mockResolvedValue({ data: { discount: 10 } })
    const result = await cartService.applyCoupon(payload)
    expect(api.post).toHaveBeenCalledWith('/carts/coupon', payload)
    expect(result).toEqual({ discount: 10 })
  })

  it('updateItem calls PATCH /carts/items with data', async () => {
    const payload = { productId: '1', quantity: 5 }
    api.patch.mockResolvedValue({ data: { success: true } })
    const result = await cartService.updateItem(payload)
    expect(api.patch).toHaveBeenCalledWith('/carts/items', payload)
    expect(result).toEqual({ success: true })
  })

  it('removeItem calls DELETE /carts/items/:id', async () => {
    api.delete.mockResolvedValue({ data: { success: true } })
    const result = await cartService.removeItem('42')
    expect(api.delete).toHaveBeenCalledWith('/carts/items/42')
    expect(result).toEqual({ success: true })
  })

  it('clear calls DELETE /carts/clear', async () => {
    api.delete.mockResolvedValue({ data: { success: true } })
    const result = await cartService.clear()
    expect(api.delete).toHaveBeenCalledWith('/carts/clear')
    expect(result).toEqual({ success: true })
  })

  it('removeCoupon calls DELETE /carts/coupon', async () => {
    api.delete.mockResolvedValue({ data: { success: true } })
    const result = await cartService.removeCoupon()
    expect(api.delete).toHaveBeenCalledWith('/carts/coupon')
    expect(result).toEqual({ success: true })
  })
})
