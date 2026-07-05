import api from './axios'

// post requests
export const addToWishlist = (productId) => api.post(`/wishlists/add/${productId}`)

// get requests
export const getWishlist = () => api.get('/wishlists/my')
export const getAllWishlist = () => api.get('/wishlists/admin/all')
export const getWishlistStates = () => api.get('/wishlists/admin/stats')

// delete requests
export const removeFromWishlist = (productId) => api.delete(`/wishlists/remove/${productId}`)
export const clearWishlist = () => api.delete('/wishlists/clear')
