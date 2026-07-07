import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import api from './axios'

// ----------------------------------
// QUERIES (GET Requests)
// ----------------------------------

// Admin Queries
export const useGetOrdersStats = () => {
  return useQuery({
    queryKey: ['admin', 'orders', 'stats'],
    queryFn: () => api.get('/orders/admin/dashboard').then((res) => res.data),
  })
}

export const useGetAdminOrderById = (id) => {
  return useQuery({
    queryKey: ['admin', 'orders', 'details', id],
    queryFn: () => api.get(`/orders/admin/${id}`).then((res) => res.data),
    enabled: !!id,
  })
}

export const useGetAllOrders = (params) => {
  return useQuery({
    queryKey: ['admin', 'orders', 'list', params],
    queryFn: () => api.get('/orders/admin', { params }).then((res) => res.data),
  })
}

export const useGetAdminCarts = (params) => {
  return useQuery({
    queryKey: ['admin', 'carts', 'list', params],
    queryFn: () => api.get('/orders/admin/carts', { params }).then((res) => res.data),
  })
}

// User Queries
export const useGetOrderById = (id) => {
  return useQuery({
    queryKey: ['user', 'orders', 'details', id],
    queryFn: () => api.get(`/orders/my/${id}`).then((res) => res.data),
    enabled: !!id,
  })
}

export const useGetMyOrders = (params) => {
  return useQuery({
    queryKey: ['user', 'orders', 'list', params],
    queryFn: () => api.get('/orders/my', { params }).then((res) => res.data),
  })
}

// ----------------------------------
// MUTATIONS (POST / PATCH)
// ----------------------------------

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => api.post('/orders', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'orders'] })
      queryClient.invalidateQueries({ queryKey: ['user', 'cart'] })
    },
  })
}

export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => api.patch(`/orders/my/${id}/cancel`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'orders'] })
      queryClient.invalidateQueries({ queryKey: ['user', 'cart'] })
    },
  })
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) =>
      api.patch(`/orders/admin/${id}/status`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] })
    },
  })
}
