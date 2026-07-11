import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { authKeys } from '../keys/authKeys'
import { authService } from '../services/authService'

// ----------------------------------
// QUERIES
// ----------------------------------

export const useCurrentUser = () => {
  const token = localStorage.getItem('token')

  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: authService.getCurrentUser,
    staleTime: Infinity,
    enabled: !!token,
    retry: false,
  })
}

export const useAdminTest = () => {
  return useQuery({
    queryKey: authKeys.adminTest,
    queryFn: authService.adminTest,
  })
}

// ----------------------------------
// MUTATIONS
// ----------------------------------

export const useLogin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser })
      if (data.user.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem('token')
      queryClient.clear()
      navigate('/login')
    },
  })
}

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser })
    },
  })
}

// Simple mutations (no cache invalidation needed)
export const useSendRegisterOtp = () => useMutation({ mutationFn: authService.sendRegisterOtp })
export const useVerifyRegisterOtp = () => useMutation({ mutationFn: authService.verifyRegisterOtp })
export const useForgotPasswordOtp = () =>
  useMutation({ mutationFn: authService.sendForgotPasswordOtp })
export const useVerifyForgotPasswordOtp = () =>
  useMutation({ mutationFn: authService.verifyForgotPasswordOtp })
