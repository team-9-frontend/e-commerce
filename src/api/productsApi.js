import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import api from './axios'

// ----------------------------------
// QUERIES (GET Requests)
// ----------------------------------

export const useSearchProducts = (params) => {
  return useQuery({
    queryKey: ['products', 'search', params],
    queryFn: () => api.get('/products/search', { params }).then((res) => res.data),
  })
}

export const useGetProducts = (params) => {
  return useQuery({
    queryKey: ['products', 'list', params],
    queryFn: () => api.get('/products', { params }).then((res) => res.data),
  })
}

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ['products', 'detail', id],
    queryFn: () => api.get(`/products/${id}`).then((res) => res.data),
    enabled: !!id,
  })
}

// ----------------------------------
// MUTATIONS (POST / PATCH / DELETE)
// ----------------------------------

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => api.post('/products', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`/products/update/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => api.delete(`/products/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
