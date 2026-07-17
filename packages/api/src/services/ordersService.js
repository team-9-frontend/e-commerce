import api from '../client'

export const ordersService = {
  // ---- admin ----
  getOrdersDashboard: () => api.get('/orders/admin/dashboard').then((res) => res.data),
  getAdminOrderById: (id) => api.get(`/orders/admin/${id}`).then((res) => res.data),
  getAllOrders: (params) => api.get('/orders/admin', { params }).then((res) => res.data),
  getAdminCarts: (params) => api.get('/orders/admin/carts', { params }).then((res) => res.data),
  updateOrderStatus: (id, data) =>
    api.patch(`/orders/admin/${id}/status`, data).then((res) => res.data),

  // ---- user ----
  getOrderById: (id) => api.get(`/orders/my/${id}`).then((res) => res.data),
  getMyOrders: (params) => api.get('/orders/my', { params }).then((res) => res.data),
  createOrder: (data) => api.post('/orders', data).then((res) => res.data),
  cancelOrder: (id) => api.patch(`/orders/my/${id}/cancel`).then((res) => res.data),
}
