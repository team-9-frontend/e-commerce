import { beforeEach, describe, expect, it, vi } from 'vitest'
import api from '@/api/client'
import { ordersService } from '@/api/services/ordersService'

vi.mock('@/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('ordersService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getOrdersDashboard calls GET /orders/admin/dashboard', async () => {
    api.get.mockResolvedValue({ data: { totalOrders: 10 } })
    const result = await ordersService.getOrdersDashboard()
    expect(api.get).toHaveBeenCalledWith('/orders/admin/dashboard')
    expect(result).toEqual({ totalOrders: 10 })
  })

  it('getAdminOrderById calls GET /orders/admin/:id', async () => {
    api.get.mockResolvedValue({ data: { id: '7' } })
    const result = await ordersService.getAdminOrderById('7')
    expect(api.get).toHaveBeenCalledWith('/orders/admin/7')
    expect(result).toEqual({ id: '7' })
  })

  it('getAllOrders calls GET /orders/admin with params', async () => {
    const params = { page: 1 }
    api.get.mockResolvedValue({ data: { orders: [] } })
    const result = await ordersService.getAllOrders(params)
    expect(api.get).toHaveBeenCalledWith('/orders/admin', { params })
    expect(result).toEqual({ orders: [] })
  })

  it('getAdminCarts calls GET /orders/admin/carts with params', async () => {
    const params = { page: 2 }
    api.get.mockResolvedValue({ data: { carts: [] } })
    const result = await ordersService.getAdminCarts(params)
    expect(api.get).toHaveBeenCalledWith('/orders/admin/carts', { params })
    expect(result).toEqual({ carts: [] })
  })

  it('updateOrderStatus calls PATCH /orders/admin/:id/status with data', async () => {
    const payload = { status: 'shipped' }
    api.patch.mockResolvedValue({ data: { success: true } })
    const result = await ordersService.updateOrderStatus('7', payload)
    expect(api.patch).toHaveBeenCalledWith('/orders/admin/7/status', payload)
    expect(result).toEqual({ success: true })
  })

  it('getOrderById calls GET /orders/my/:id', async () => {
    api.get.mockResolvedValue({ data: { id: '3' } })
    const result = await ordersService.getOrderById('3')
    expect(api.get).toHaveBeenCalledWith('/orders/my/3')
    expect(result).toEqual({ id: '3' })
  })

  it('getMyOrders calls GET /orders/my with params', async () => {
    const params = { page: 1 }
    api.get.mockResolvedValue({ data: { orders: [] } })
    const result = await ordersService.getMyOrders(params)
    expect(api.get).toHaveBeenCalledWith('/orders/my', { params })
    expect(result).toEqual({ orders: [] })
  })

  it('createOrder calls POST /orders with data', async () => {
    const payload = { items: [{ productId: '1', quantity: 1 }] }
    api.post.mockResolvedValue({ data: { id: '99' } })
    const result = await ordersService.createOrder(payload)
    expect(api.post).toHaveBeenCalledWith('/orders', payload)
    expect(result).toEqual({ id: '99' })
  })

  it('cancelOrder calls PATCH /orders/my/:id/cancel', async () => {
    api.patch.mockResolvedValue({ data: { cancelled: true } })
    const result = await ordersService.cancelOrder('99')
    expect(api.patch).toHaveBeenCalledWith('/orders/my/99/cancel')
    expect(result).toEqual({ cancelled: true })
  })
})
