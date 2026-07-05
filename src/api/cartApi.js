import api from './axios'

export const getCart = () => api.get('/carts')
export const addToCart = (data) => api.post('/carts/items', data)
export const updateCartItem = (data) => api.patch('/carts/items', data)
export const removeCartItem = (id) => api.delete(`/carts/items/${id}`)
