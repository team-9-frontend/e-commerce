import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { cartKeys } from '@/api//keys/cartKeys'
import { orderKeys } from '@/api//keys/orderKeys'
import {
  useCancelOrder,
  useCreateOrder,
  useGetAdminCarts,
  useGetAdminOrderById,
  useGetAllOrders,
  useGetMyOrders,
  useGetOrderById,
  useGetOrdersStats,
  useUpdateOrderStatus,
} from '@/api/hooks/useOrders'
import { ordersService } from '@/api/services/ordersService'

vi.mock('@/api/services/ordersService', () => ({
  ordersService: {
    getOrdersDashboard: vi.fn(),
    getAdminOrderById: vi.fn(),
    getAllOrders: vi.fn(),
    getAdminCarts: vi.fn(),
    getOrderById: vi.fn(),
    getMyOrders: vi.fn(),
    createOrder: vi.fn(),
    cancelOrder: vi.fn(),
    updateOrderStatus: vi.fn(),
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

describe('useOrders query hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useGetOrdersStats fetches the admin dashboard stats', async () => {
    ordersService.getOrdersDashboard.mockResolvedValue({ totalOrders: 10 })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetOrdersStats(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({ totalOrders: 10 })
  })

  it('useGetAdminOrderById fetches an order when id is provided', async () => {
    ordersService.getAdminOrderById.mockResolvedValue({ id: '7' })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetAdminOrderById('7'), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(ordersService.getAdminOrderById).toHaveBeenCalledWith('7')
    expect(result.current.data).toEqual({ id: '7' })
  })

  it('useGetAdminOrderById stays disabled when no id is provided', () => {
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetAdminOrderById(undefined), { wrapper })

    expect(result.current.fetchStatus).toBe('idle')
    expect(ordersService.getAdminOrderById).not.toHaveBeenCalled()
  })

  it('useGetAllOrders fetches orders with params', async () => {
    ordersService.getAllOrders.mockResolvedValue({ orders: [] })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetAllOrders({ page: 1 }), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(ordersService.getAllOrders).toHaveBeenCalledWith({ page: 1 })
  })

  it('useGetAdminCarts fetches carts with params', async () => {
    ordersService.getAdminCarts.mockResolvedValue({ carts: [] })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetAdminCarts({ page: 1 }), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(ordersService.getAdminCarts).toHaveBeenCalledWith({ page: 1 })
  })

  it('useGetOrderById fetches an order when id is provided', async () => {
    ordersService.getOrderById.mockResolvedValue({ id: '3' })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetOrderById('3'), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(ordersService.getOrderById).toHaveBeenCalledWith('3')
  })

  it('useGetOrderById stays disabled when no id is provided', () => {
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetOrderById(undefined), { wrapper })

    expect(result.current.fetchStatus).toBe('idle')
    expect(ordersService.getOrderById).not.toHaveBeenCalled()
  })

  it('useGetMyOrders fetches my orders with params', async () => {
    ordersService.getMyOrders.mockResolvedValue({ orders: [] })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetMyOrders({ page: 1 }), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(ordersService.getMyOrders).toHaveBeenCalledWith({ page: 1 })
  })
})

describe('useOrders mutation hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useCreateOrder invalidates user orders and cart on success', async () => {
    ordersService.createOrder.mockResolvedValue({ id: '99' })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useCreateOrder(), { wrapper })
    const payload = { items: [{ productId: '1', quantity: 1 }] }

    await act(async () => {
      result.current.mutate(payload)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(ordersService.createOrder.mock.calls[0][0]).toEqual(payload)
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: orderKeys.user.all })
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: cartKeys.all })
  })

  it('useCancelOrder invalidates user orders and cart on success', async () => {
    ordersService.cancelOrder.mockResolvedValue({ cancelled: true })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useCancelOrder(), { wrapper })

    await act(async () => {
      result.current.mutate('99')
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(ordersService.cancelOrder).toHaveBeenCalledWith('99')
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: orderKeys.user.all })
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: cartKeys.all })
  })

  it('useUpdateOrderStatus invalidates admin orders on success', async () => {
    ordersService.updateOrderStatus.mockResolvedValue({ success: true })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useUpdateOrderStatus(), { wrapper })

    await act(async () => {
      result.current.mutate({ id: '7', data: { status: 'shipped' } })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(ordersService.updateOrderStatus).toHaveBeenCalledWith('7', { status: 'shipped' })
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: orderKeys.admin.all })
  })
})
