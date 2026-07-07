import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import api from './axios'

// ----------------------------------
// QUERIES (GET Requests)
// ----------------------------------

export const useGetCart = () => {
  return useQuery({
    queryKey: ['user', 'cart'],
    queryFn: () => api.get('/carts').then((res) => res.data),
  })
}

// ----------------------------------
// MUTATIONS (POST / PATCH Requests)
// ----------------------------------

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => api.post('/carts/items', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'cart'] })
    },
  })
}

export const useApplyCoupon = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => api.post('/carts/coupon', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'cart'] })
    },
  })
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => api.patch('/carts/items', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'cart'] })
    },
  })
}

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => api.delete(`/carts/items/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'cart'] })
    },
  })
}

export const useClearCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => api.delete('/carts/clear').then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'cart'] })
    },
  })
}

export const useRemoveCoupon = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => api.delete('/carts/coupon').then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'cart'] })
    },
  })
}
