import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { reviewsKeys } from '../keys/reviewsKeys'
import { reviewsService } from '../services/reviewsService'

// ----------------------------------
// QUERIES
// ----------------------------------

export const useGetReviews = (productId) => {
  return useQuery({
    queryKey: reviewsKeys.list(productId),
    queryFn: () => reviewsService.getByProductId(productId),
    enabled: !!productId,
  })
}

// ----------------------------------
// MUTATIONS
// ----------------------------------

export const usePostReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ productId, data }) => reviewsService.create(productId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewsKeys.list(variables.id) })
    },
  })
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ productId, reviewId }) => reviewsService.remove(productId, reviewId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewsKeys.list(variables.id) })
    },
  })
}
