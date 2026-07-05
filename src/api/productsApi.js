import api from './axios'

// post requests
export const createProduct = (data) => api.post('/products', data)

// get requests
export const searchProducts = (params) => api.get('/products/search', { params })
export const getProducts = (params) => api.get('/products', { params })
export const getProductById = (id) => api.get(`/products/${id}`)

// patch requests
export const updateProduct = (id, data) => api.patch(`/products/update/${id}`, data)

// delete requests
export const deleteProduct = (id) => api.delete(`/products/${id}`)
