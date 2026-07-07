import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { productKeys } from '../keys/productKeys'
import { productsService } from '../services/productsService'

// ----------------------------------
// QUERIES (GET Requests)
// ----------------------------------

export const useSearchProducts = (params) => {
  return useQuery({
    queryKey: productKeys.search(params),
    queryFn: () => productsService.search(params),
    enabled: !!params?.query || Object.keys(params || {}).length > 0,
  })
}

export const useGetProducts = (params) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productsService.getAll(params),
  })
}

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsService.getById(id),
    enabled: !!id,
  })
}

// ----------------------------------
// MUTATIONS (POST / PATCH / DELETE)
// ----------------------------------

const useProductMutation = (mutationFn) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}

export const useCreateProduct = () => useProductMutation(productsService.create)

export const useUpdateProduct = () =>
  useProductMutation(({ id, data }) => productsService.update(id, data))

export const useDeleteProduct = () => useProductMutation((id) => productsService.remove(id))
