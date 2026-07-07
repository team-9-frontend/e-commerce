import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import api from './axios'

// ----------------------------------
// QUERIES (GET Requests)
// ----------------------------------

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => api.get('/auth/me').then((res) => res.data),
    select: (data) => data.user,
    staleTime: Infinity,
    retry: false,
  })
}

export const useAdminTest = () => {
  return useQuery({
    queryKey: ['user', 'adminTest'],
    queryFn: () => api.get('/auth/admin-test').then((res) => res.data),
  })
}

// ----------------------------------
// MUTATIONS (POST / PATCH Requests)
// ----------------------------------

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => api.post('/auth/login', data).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => api.post('/auth/logout').then((res) => res.data),
    onSuccess: () => {
      localStorage.removeItem('token')
      queryClient.clear()
    },
  })
}

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => api.patch('/auth/change-role', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

// Simple Mutations (No cache invalidation needed)
export const useSendRegisterOtp = () => {
  return useMutation({
    mutationFn: (data) => api.post('/auth/register/send-otp', data),
  })
}

export const useVerifyRegisterOtp = () => {
  return useMutation({
    mutationFn: (data) => api.post('/auth/register/verify-otp', data),
  })
}

export const useForgotPasswordOtp = () => {
  return useMutation({
    mutationFn: (data) => api.post('/auth/forgot-password/send-otp', data),
  })
}

export const useVerifyForgotPasswordOtp = () => {
  return useMutation({
    mutationFn: (data) => api.post('/auth/forgot-password/verify-otp', data),
  })
}
