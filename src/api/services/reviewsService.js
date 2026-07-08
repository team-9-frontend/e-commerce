import api from '../client'

export const reviewsService = {
  getByProductId: (productId) => api.get(`/products/${productId}/reviews`).then((res) => res.data),
  create: (productId, data) =>
    api.post(`/products/${productId}/reviews`, data).then((res) => res.data),
  remove: (productId, reviewId) =>
    api.delete(`/products/${productId}/reviews/${reviewId}`).then((res) => res.data),
}
