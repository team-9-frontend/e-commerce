import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockInterceptors = {
  request: { use: vi.fn() },
  response: { use: vi.fn() },
}

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      interceptors: mockInterceptors,
    })),
  },
}))

describe('api client', () => {
  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()
    window.localStorage.clear()
  })

  it('creates an axios instance passing a baseURL option', async () => {
    const axios = (await import('axios')).default
    await import('@/api/client')
    expect(axios.create).toHaveBeenCalledTimes(1)
    expect(axios.create.mock.calls[0][0]).toHaveProperty('baseURL')
  })

  it('registers a request interceptor and a response interceptor', async () => {
    await import('@/api/client')
    expect(mockInterceptors.request.use).toHaveBeenCalledTimes(1)
    expect(mockInterceptors.response.use).toHaveBeenCalledTimes(1)
  })

  it('request interceptor adds Authorization header when a token exists', async () => {
    window.localStorage.setItem('token', 'abc123')
    await import('@/api/client')
    const onFulfilled = mockInterceptors.request.use.mock.calls[0][0]
    const config = onFulfilled({ headers: {} })
    expect(config.headers.Authorization).toBe('Bearer abc123')
  })

  it('request interceptor does not add Authorization header when there is no token', async () => {
    await import('@/api/client')
    const onFulfilled = mockInterceptors.request.use.mock.calls[0][0]
    const config = onFulfilled({ headers: {} })
    expect(config.headers.Authorization).toBeUndefined()
  })

  it('request interceptor rejects on error', async () => {
    await import('@/api/client')
    const onRejected = mockInterceptors.request.use.mock.calls[0][1]
    const error = new Error('request failed')
    await expect(onRejected(error)).rejects.toBe(error)
  })

  it('response interceptor passes successful responses through unchanged', async () => {
    await import('@/api/client')
    const onFulfilled = mockInterceptors.response.use.mock.calls[0][0]
    const response = { data: { ok: true } }
    expect(onFulfilled(response)).toBe(response)
  })

  it('response interceptor removes the token on a 401 response', async () => {
    window.localStorage.setItem('token', 'abc123')
    await import('@/api/client')
    const onRejected = mockInterceptors.response.use.mock.calls[0][1]
    const error = { response: { status: 401 } }
    await expect(onRejected(error)).rejects.toBe(error)
    expect(window.localStorage.getItem('token')).toBeNull()
  })

  it('response interceptor keeps the token for non-401 errors', async () => {
    window.localStorage.setItem('token', 'abc123')
    await import('@/api/client')
    const onRejected = mockInterceptors.response.use.mock.calls[0][1]
    const error = { response: { status: 500 } }
    await expect(onRejected(error)).rejects.toBe(error)
    expect(window.localStorage.getItem('token')).toBe('abc123')
  })
})
