import { useQuery } from '@tanstack/react-query'

import { storeAuthKeys } from '../constants/authKeys'
import { storeAuthService } from '../services/storeAuthService'

export const useStoreCurrentUser = () => {
  return useQuery({
    queryKey: storeAuthKeys.currentUser,
    queryFn: storeAuthService.getCurrentUser,
    staleTime: Infinity,
    retry: false,
  })
}