import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { wishlistService } from '../services/wishlistService'
import { wishlistKeys } from '../keys/wishlistKeys'

// ----------------------------------
// QUERIES (GET Requests)
// ----------------------------------

export const useGetWishlist = () => {
  return useQuery({
    queryKey: wishlistKeys.user,
    queryFn: wishlistService.getMy,
  })
}

export const useGetAllWishlist = () => {
  return useQuery({
    queryKey: wishlistKeys.admin.list,
    queryFn: wishlistService.getAllAdmin,
  })
}

export const useGetWishlistStats = () => {
  return useQuery({
    queryKey: wishlistKeys.admin.stats,
    queryFn: wishlistService.getStats,
  })
}

// ----------------------------------
// MUTATIONS (POST / PATCH / DELETE)
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
