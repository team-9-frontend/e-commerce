import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('../services/cartService', () => ({
  cartService: {
    getCart: vi.fn(),
    addItem: vi.fn(),
    applyCoupon: vi.fn(),
    updateItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    removeCoupon: vi.fn(),
  },
}))

import { cartService } from '../services/cartService'
import { cartKeys } from '../keys/cartKeys'
import {
  useGetCart,
  useAddToCart,
  useApplyCoupon,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
  useRemoveCoupon,
} from './useCart'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return { wrapper, queryClient }
}

describe('useCart hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useGetCart fetches the cart', async () => {
    cartService.getCart.mockResolvedValue({ items: [{ id: '1' }] })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetCart(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual({ items: [{ id: '1' }] })
  })

  it.each([
    ['useAddToCart', useAddToCart, cartService.addItem, { productId: '1', quantity: 2 }],
    ['useApplyCoupon', useApplyCoupon, cartService.applyCoupon, { code: 'SAVE10' }],
    ['useUpdateCartItem', useUpdateCartItem, cartService.updateItem, { productId: '1', quantity: 3 }],
    ['useRemoveCartItem', useRemoveCartItem, cartService.removeItem, '1'],
    ['useClearCart', useClearCart, cartService.clear, undefined],
    ['useRemoveCoupon', useRemoveCoupon, cartService.removeCoupon, undefined],
  ])('%s calls the matching service function and invalidates the cart', async (_name, hook, serviceFn, arg) => {
    serviceFn.mockResolvedValue({ success: true })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => hook(), { wrapper })

    await act(async () => {
      result.current.mutate(arg)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(serviceFn.mock.calls[0][0]).toEqual(arg)
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: cartKeys.all })
  })
})
