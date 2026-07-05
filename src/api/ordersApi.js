import api from './axios'

// post requests
export const createOrder = (data) => api.post('/orders', data)

// get requests
export const getOrdersStates = () => api.get('/orders/admin/dashboard')
export const getAdminOrderById = (id) => api.get(`/orders/admin/${id}`)
export const getOrderById = (id) => api.get(`/orders/my/${id}`)
export const getMyOrders = (params) => api.get('/orders/my', { params })
export const getCarts = (params) => api.get('/orders/admin/carts', { params })
export const getAllOrders = (params) => api.get('/orders/admin', { params })

// patch requests
export const cancelOrder = (id) => api.patch(`/orders/my/${id}/cancel`)
export const updateOrderStatus = (id, data) => api.patch(`/orders/admin/${id}/status`, { data })
