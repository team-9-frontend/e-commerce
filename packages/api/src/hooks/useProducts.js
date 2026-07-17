import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { productsKeys } from '../keys/productsKeys'
import { productsService } from '../services/productsService'

// ----------------------------------
// QUERIES
// ----------------------------------

export const useSearchProducts = (params) => {
  return useQuery({
    queryKey: productsKeys.search(params),
    queryFn: () => productsService.search(params),
    enabled: !!params?.query || Object.keys(params || {}).length > 0,
  })
}

export const useGetProducts = (params) => {
  return useQuery({
    queryKey: productsKeys.list(params),
    queryFn: () => productsService.getAll(params),
    placeholderData: (previousData) => previousData,
  })
}

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => productsService.getById(id),
    enabled: !!id,
    refetchInterval: 30000,
  })
}

// ----------------------------------
// MUTATIONS
// ----------------------------------

const useProductMutation = (mutationFn) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.all })
    },
  })
}

export const useCreateProduct = () => useProductMutation(productsService.create)
export const useUpdateProduct = () =>
  useProductMutation(({ id, data }) => productsService.update(id, data))
export const useDeleteProduct = () => useProductMutation((id) => productsService.remove(id))
