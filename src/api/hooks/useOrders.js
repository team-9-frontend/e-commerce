import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { ordersService } from '../services/ordersService'
import { orderKeys } from '../keys/orderKeys'
import { cartKeys } from '../keys/cartKeys'

// ----------------------------------
// ADMIN QUERIES
// ----------------------------------

export const useGetOrdersStates = () => {
  return useQuery({
    queryKey: orderKeys.admin.dashboard,
    queryFn: ordersService.getOrdersDashboard,
  })
}

export const useGetAdminOrderById = (id) => {
  return useQuery({
    queryKey: orderKeys.admin.detail(id),
    queryFn: () => ordersService.getAdminOrderById(id),
    enabled: !!id,
  })
}

export const useGetAllOrders = (params) => {
  return useQuery({
    queryKey: orderKeys.admin.list(params),
    queryFn: () => ordersService.getAllOrders(params),
  })
}

export const useGetAdminCarts = (params) => {
  return useQuery({
    queryKey: orderKeys.adminCarts(params),
    queryFn: () => ordersService.getAdminCarts(params),
  })
}

// ----------------------------------
// USER QUERIES
// ----------------------------------

export const useGetOrderById = (id) => {
  return useQuery({
    queryKey: orderKeys.user.detail(id),
    queryFn: () => ordersService.getOrderById(id),
    enabled: !!id,
  })
}

export const useGetMyOrders = (params) => {
  return useQuery({
    queryKey: orderKeys.user.list(params),
    queryFn: () => ordersService.getMyOrders(params),
  })
}

// ----------------------------------
// MUTATIONS
// ----------------------------------

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ordersService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.user.all })
      queryClient.invalidateQueries({ queryKey: cartKeys.all })
    },
  })
}

export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => ordersService.cancelOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.user.all })
      queryClient.invalidateQueries({ queryKey: cartKeys.all })
    },
  })
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => ordersService.updateOrderStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.admin.all })
    },
  })
}
