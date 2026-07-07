import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import api from './axios'

// ----------------------------------
// QUERIES (GET Requests)
// ----------------------------------

export const useGetReviews = (id) => {
  return useQuery({
    queryKey: ['reviews', id],
    queryFn: () => api.get(`/products/${id}/reviews`).then((res) => res.data),
    enabled: !!id,
  })
}

// ----------------------------------
// MUTATIONS (POST / PATCH / DELETE)
// ----------------------------------

export const usePostReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => api.post(`/products/${id}/reviews`, data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.id] })
    },
  })
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reviewId }) =>
      api.delete(`/products/${id}/reviews/${reviewId}`).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.id] })
    },
  })
}
