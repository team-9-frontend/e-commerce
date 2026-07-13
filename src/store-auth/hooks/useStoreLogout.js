import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { storeAuthService } from '../services/storeAuthService'
import { removeToken } from '../utils/token'

export const useStoreLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: storeAuthService.logout,

    onSuccess: () => {
      removeToken()

      queryClient.clear()

      navigate('/storelogin')
    },
  })
}