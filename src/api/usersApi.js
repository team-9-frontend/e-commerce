import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import api from './axios'

// ----------------------------------
// QUERIES (GET Requests)
// ----------------------------------

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users', 'list'],
    queryFn: () => api.get('/users/all').then((res) => res.data),
  })
}

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ['admin', 'users', 'detail', id],
    queryFn: () => api.get(`/users/${id}`).then((res) => res.data),
    enabled: !!id,
  })
}

// ----------------------------------
// MUTATIONS (POST / PATCH / DELETE)
// ----------------------------------

export const useAddUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.post('/users/add', data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`/users/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.delete(`/users/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    },
  })
}
