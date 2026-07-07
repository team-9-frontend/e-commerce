import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import api from './axios'

// ----------------------------------
// QUERIES (GET Requests)
// ----------------------------------

export const useGetWishlist = () => {
  return useQuery({
    queryKey: ['user', 'wishlist'],
    queryFn: () => api.get('/wishlists/my').then((res) => res.data),
  })
}

export const useGetAllWishlist = () => {
  return useQuery({
    queryKey: ['admin', 'wishlist', 'all'],
    queryFn: () => api.get('/wishlists/admin/all').then((res) => res.data),
  })
}

export const useGetWishlistStats = () => {
  return useQuery({
    queryKey: ['admin', 'wishlist', 'stats'],
    queryFn: () => api.get('/wishlists/admin/stats').then((res) => res.data),
  })
}

// ----------------------------------
// MUTATIONS (POST / PATCH / DELETE)
// ----------------------------------

export const useAddToWishlist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (productId) => api.post(`/wishlists/add/${productId}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'wishlist'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'wishlist'] })
    },
  })
}

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (productId) => api.delete(`/wishlists/remove/${productId}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'wishlist'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'wishlist'] })
    },
  })
}

export const useClearWishlist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.delete('/wishlists/clear').then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'wishlist'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'wishlist'] })
    },
  })
}
