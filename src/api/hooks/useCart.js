import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { cartKeys } from '../keys/cartKeys'
import { cartService } from '../services/cartService'

// ----------------------------------
// QUERIES
// ----------------------------------

export const useGetCart = () => {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: cartService.getCart,
  })
}

// ----------------------------------
// MUTATIONS
// ----------------------------------

const useCartMutation = (mutationFn) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all })
    },
  })
}

export const useAddToCart = () => useCartMutation(cartService.addItem)
export const useApplyCoupon = () => useCartMutation(cartService.applyCoupon)
export const useUpdateCartItem = () => useCartMutation(cartService.updateItem)
export const useRemoveCartItem = () => useCartMutation(cartService.removeItem)
export const useClearCart = () => useCartMutation(cartService.clear)
export const useRemoveCoupon = () => useCartMutation(cartService.removeCoupon)
