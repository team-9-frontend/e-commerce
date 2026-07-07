import api from '../client'

export const cartService = {
  getCart: () => api.get('/carts').then((res) => res.data),

  addItem: (data) => api.post('/carts/items', data).then((res) => res.data),
  applyCoupon: (data) => api.post('/carts/coupon', data).then((res) => res.data),
  updateItem: (data) => api.patch('/carts/items', data).then((res) => res.data),
  removeItem: (id) => api.delete(`/carts/items/${id}`).then((res) => res.data),
  clear: () => api.delete('/carts/clear').then((res) => res.data),
  removeCoupon: () => api.delete('/carts/coupon').then((res) => res.data),
}
