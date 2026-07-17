import api from '../client'

export const authService = {
  getCurrentUser: () => api.get('/auth/me').then((res) => res.data.user),
  adminTest: () => api.get('/auth/admin-test').then((res) => res.data),

  login: (data) => api.post('/auth/login', data).then((res) => res.data),
  logout: () => api.post('/auth/logout').then((res) => res.data),
  updateUserRole: (data) => api.patch('/auth/change-role', data).then((res) => res.data),

  sendRegisterOtp: (data) => api.post('/auth/register/send-otp', data).then((res) => res.data),
  verifyRegisterOtp: (data) => api.post('/auth/register/verify-otp', data).then((res) => res.data),
  sendForgotPasswordOtp: (data) =>
    api.post('/auth/forgot-password/send-otp', data).then((res) => res.data),
  verifyForgotPasswordOtp: (data) =>
    api.post('/auth/forgot-password/verify-otp', data).then((res) => res.data),
}
