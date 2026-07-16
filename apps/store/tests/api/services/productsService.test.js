import { beforeEach, describe, expect, it, vi } from 'vitest'

import api from '@repo/api'
import { productsService } from '@repo/api/services/productsService'

vi.mock('@repo/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('productsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('search calls GET /products/search with params', async () => {
    const params = { query: 'shoes' }
    api.get.mockResolvedValue({ data: { results: [] } })
    const result = await productsService.search(params)
    expect(api.get).toHaveBeenCalledWith('/products/search', { params })
    expect(result).toEqual({ results: [] })
  })

  it('getAll calls GET /products with params', async () => {
    const params = { page: 1 }
    api.get.mockResolvedValue({ data: { products: [] } })
    const result = await productsService.getAll(params)
    expect(api.get).toHaveBeenCalledWith('/products', { params })
    expect(result).toEqual({ products: [] })
  })

  it('getById calls GET /products/:id', async () => {
    api.get.mockResolvedValue({ data: { id: '1' } })
    const result = await productsService.getById('1')
    expect(api.get).toHaveBeenCalledWith('/products/1')
    expect(result).toEqual({ id: '1' })
  })

  it('create calls POST /products with data', async () => {
    const payload = { name: 'Shoe', price: 100 }
    api.post.mockResolvedValue({ data: { id: '2', ...payload } })
    const result = await productsService.create(payload)
    expect(api.post).toHaveBeenCalledWith('/products', payload)
    expect(result).toEqual({ id: '2', ...payload })
  })

  it('update calls PATCH /products/update/:id with data', async () => {
    const payload = { price: 120 }
    api.patch.mockResolvedValue({ data: { success: true } })
    const result = await productsService.update('2', payload)
    expect(api.patch).toHaveBeenCalledWith('/products/update/2', payload)
    expect(result).toEqual({ success: true })
  })

  it('remove calls DELETE /products/:id', async () => {
    api.delete.mockResolvedValue({ data: { success: true } })
    const result = await productsService.remove('2')
    expect(api.delete).toHaveBeenCalledWith('/products/2')
    expect(result).toEqual({ success: true })
  })
})
