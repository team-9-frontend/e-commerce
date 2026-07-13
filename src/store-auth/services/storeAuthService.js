import api from '@/api/client'

export const storeAuthService = {
  getCurrentUser: () =>
    api.get('/auth/me').then((res) => res.data.user),

  login: (data) =>
    api.post('/auth/login', data).then((res) => res.data),

  logout: () =>
    api.post('/auth/logout').then((res) => res.data),
}