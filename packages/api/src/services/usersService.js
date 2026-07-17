import api from '../client'

export const usersService = {
  getAll: () => api.get('/users/all').then((res) => res.data),
  getById: (id) => api.get(`/users/${id}`).then((res) => res.data),

  add: (data) => api.post('/users/add', data).then((res) => res.data),
  update: (id, data) => api.patch(`/users/${id}`, data).then((res) => res.data),
  remove: (id) => api.delete(`/users/${id}`).then((res) => res.data),
}
