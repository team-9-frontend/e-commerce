import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { wishlistKeys } from '../keys/wishlistKeys'
import { wishlistService } from '../services/wishlistService'

// ----------------------------------
// QUERIES
// ----------------------------------

export const useGetWishlist = () => {
  return useQuery({
    queryKey: wishlistKeys.user,
    queryFn: wishlistService.getMyWishlist,
  })
}

export const useGetAllWishlist = () => {
  return useQuery({
    queryKey: wishlistKeys.admin.list,
    queryFn: wishlistService.getAllWishlist,
    refetchInterval: 30000,
  })
}

export const useGetWishlistStats = () => {
  return useQuery({
    queryKey: wishlistKeys.admin.stats,
    queryFn: wishlistService.getWishlistStats,
    refetchInterval: 30000,
  })
}

// ----------------------------------
// MUTATIONS
// ----------------------------------

const useWishlistMutation = (mutationFn) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.user })
      queryClient.invalidateQueries({ queryKey: wishlistKeys.admin.all })
    },
  })
}

export const useAddToWishlist = () => useWishlistMutation(wishlistService.add)
export const useRemoveFromWishlist = () => useWishlistMutation(wishlistService.remove)
export const useClearWishlist = () => useWishlistMutation(wishlistService.clear)
