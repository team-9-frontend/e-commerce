import api from '../client'

export const productsService = {
  search: (params) => api.get('/products/search', { params }).then((res) => res.data),
  getAll: (params) => api.get('/products', { params }).then((res) => res.data),
  getById: (id) => api.get(`/products/${id}`).then((res) => res.data),

  create: (data) => api.post('/products', data).then((res) => res.data),
  update: (id, data) => api.patch(`/products/update/${id}`, data).then((res) => res.data),
  remove: (id) => api.delete(`/products/${id}`).then((res) => res.data),
}
