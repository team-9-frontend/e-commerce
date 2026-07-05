import api from './axios'

// post requests
export const postReview = (id, data) => api.post(`/products/${id}/reviews`, data)

// get requests
export const getReviews = (id) => api.get(`/products/${id}/reviews`)

// delete requests
export const deleteReview = (id, reviewId) => api.delete(`/products/${id}/reviews/${reviewId}`)
