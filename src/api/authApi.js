import api from './axios'

// post requests
export const login = (data) =>
  api.post('/auth/login', data).then((res) => {
    localStorage.setItem('token', res.data.token)
    return res
  })
export const logout = () =>
  api.post('/auth/logout').then(() => {
    localStorage.removeItem('token')
  })
export const sendRegisterOtp = (data) => api.post('/auth/register/send-otp', data)
export const verifyRegisterOtp = (data) => api.post('/auth/register/verify-otp', data)
export const forgotPasswordOtp = (data) => api.post('/auth/forgot-password/send-otp', data)
export const verifyForgotPasswordOtp = (data) => api.post('/auth/forgot-password/verify-otp', data)

// get requests
export const getCurrentUser = () => api.get('/auth/me')
export const getAdminTest = () => api.get('/auth/admin-test')

// patch requests
export const updateUserRole = (data) => api.patch('/auth/change-role', data)
