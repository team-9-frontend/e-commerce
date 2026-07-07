import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { reviewKeys } from '../keys/reviewKeys'
import { reviewsService } from '../services/reviewsService'

// ----------------------------------
// QUERIES (GET Requests)
// ----------------------------------

export const useGetReviews = (productId) => {
  return useQuery({
    queryKey: reviewKeys.list(productId),
    queryFn: () => reviewsService.getByProductId(productId),
    enabled: !!productId,
  })
}

// ----------------------------------
// MUTATIONS (POST / PATCH / DELETE)
// ----------------------------------

export const usePostReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => reviewsService.create(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.list(variables.id) })
    },
  })
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, reviewId }) => reviewsService.remove(id, reviewId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.list(variables.id) })
    },
  })
}
