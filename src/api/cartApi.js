import api from './axios'

// post requests
export const addToCart = (data) => api.post('/carts/items', data)
export const applyCoupon = (data) => api.post('/carts/coupon', data)

// get requests
export const getCart = () => api.get('/carts')

// patch requests
export const updateCartItem = (data) => api.patch('/carts/items', data)

// delete requests
export const clearCart = () => api.delete('/carts/clear')
export const removeCoupon = () => api.delete('/carts/coupon')
export const removeCartItem = (id) => api.delete(`/carts/items/${id}`)
