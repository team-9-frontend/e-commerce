import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { storeAuthKeys } from '../constants/authKeys'
import { storeAuthService } from '../services/storeAuthService'
import { saveToken } from '../utils/token'

export const useStoreLogin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: storeAuthService.login,

    onSuccess: (data) => {
      saveToken(data.token)

      queryClient.invalidateQueries({
        queryKey: storeAuthKeys.currentUser,
      })

      navigate('/')
    },
  })
}