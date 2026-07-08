import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { authKeys } from '../keys/authKeys'
import { authService } from '../services/authService'

// ----------------------------------
// QUERIES
// ----------------------------------

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: authService.getCurrentUser,
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

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem('token')
      queryClient.clear()
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
