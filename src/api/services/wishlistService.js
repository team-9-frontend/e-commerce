import api from '../client'

export const wishlistService = {
  getMyWishlist: () => api.get('/wishlists/my').then((res) => res.data),
  getAllAdmin: () => api.get('/wishlists/admin/all').then((res) => res.data),
  getWishlistStats: () => api.get('/wishlists/admin/stats').then((res) => res.data),

  add: (productId) => api.post(`/wishlists/add/${productId}`).then((res) => res.data),
  remove: (productId) => api.delete(`/wishlists/remove/${productId}`).then((res) => res.data),
  clear: () => api.delete('/wishlists/clear').then((res) => res.data),
}
