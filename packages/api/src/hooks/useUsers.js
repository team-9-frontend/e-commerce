import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { authKeys } from '../keys/authKeys'
import { usersKeys } from '../keys/usersKeys'
import { usersService } from '../services/usersService'

// ----------------------------------
// QUERIES
// ----------------------------------

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: usersKeys.lists(),
    queryFn: usersService.getAll,
    refetchInterval: 30000,
  })
}

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersService.getById(id),
    enabled: !!id,
    refetchInterval: 30000,
  })
}

// ----------------------------------
// MUTATIONS
// ----------------------------------

const useUserMutation = (mutationFn) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all })
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser })
    },
  })
}

export const useAddUser = () => useUserMutation((data) => usersService.add(data))
export const useUpdateUser = () => useUserMutation(({ id, data }) => usersService.update(id, data))
export const useDeleteUser = () => useUserMutation((id) => usersService.remove(id))
