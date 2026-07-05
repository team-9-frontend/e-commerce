import api from './axios'

// post requests
export const addUser = (data) => api.post('/users/add', data)

// get requests
export const getAllUsers = () => api.get('/users/all')
export const getUserById = (id) => api.get(`/users/${id}`)

// patch requests
export const updateUser = (id, data) => api.patch(`/users/${id}`, data)

// delete requests
export const deleteUser = (id) => api.delete(`/users/${id}`)
