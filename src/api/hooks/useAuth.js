import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { authKeys } from '../keys/authKeys'
import { authService } from '../services/authService'

// ----------------------------------
// QUERIES
// ----------------------------------

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: authService.getCurrentUser,
    staleTime: Infinity,
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
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser })
      localStorage.setItem('token', data.token)
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
      queryClient.clear()
      localStorage.removeItem('token')
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
