import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  productsKeys,
  productsService,
  useCreateProduct,
  useDeleteProduct,
  useGetProductById,
  useGetProducts,
  useSearchProducts,
  useUpdateProduct,
} from '@repo/api'

vi.mock('@repo/api', () => ({
  productsService: {
    search: vi.fn(),
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
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

describe('useProducts query hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useSearchProducts is enabled and fetches when a query is given', async () => {
    productsService.search.mockResolvedValue({ results: [{ id: '1' }] })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useSearchProducts({ query: 'shoe' }), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(productsService.search).toHaveBeenCalledWith({ query: 'shoe' })
  })

  it('useSearchProducts stays disabled when params are empty', () => {
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useSearchProducts({}), { wrapper })

    expect(result.current.fetchStatus).toBe('idle')
    expect(productsService.search).not.toHaveBeenCalled()
  })

  it('useGetProducts fetches products with params', async () => {
    productsService.getAll.mockResolvedValue({ products: [] })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetProducts({ page: 1 }), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(productsService.getAll).toHaveBeenCalledWith({ page: 1 })
  })

  it('useGetProductById fetches a product when id is provided', async () => {
    productsService.getById.mockResolvedValue({ id: '1' })
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetProductById('1'), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(productsService.getById).toHaveBeenCalledWith('1')
  })

  it('useGetProductById stays disabled when no id is provided', () => {
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useGetProductById(undefined), { wrapper })

    expect(result.current.fetchStatus).toBe('idle')
    expect(productsService.getById).not.toHaveBeenCalled()
  })
})

describe('useProducts mutation hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useCreateProduct calls the service and invalidates products on success', async () => {
    productsService.create.mockResolvedValue({ id: '2' })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useCreateProduct(), { wrapper })
    const payload = { name: 'Shoe', price: 100 }

    await act(async () => {
      result.current.mutate(payload)
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(productsService.create.mock.calls[0][0]).toEqual(payload)
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: productsKeys.all })
  })

  it('useUpdateProduct calls the service with id and data', async () => {
    productsService.update.mockResolvedValue({ success: true })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useUpdateProduct(), { wrapper })

    await act(async () => {
      result.current.mutate({ id: '2', data: { price: 120 } })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(productsService.update).toHaveBeenCalledWith('2', { price: 120 })
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: productsKeys.all })
  })

  it('useDeleteProduct calls the service with id', async () => {
    productsService.remove.mockResolvedValue({ success: true })
    const { wrapper, queryClient } = createWrapper()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useDeleteProduct(), { wrapper })

    await act(async () => {
      result.current.mutate('2')
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(productsService.remove).toHaveBeenCalledWith('2')
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: productsKeys.all })
  })
})
