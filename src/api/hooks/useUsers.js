import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userKeys } from '../keys/userKeys'
import { usersService } from '../services/usersService'

// ----------------------------------
// QUERIES
// ----------------------------------

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: usersService.getAll,
    refetchInterval: 30000,
  })
}

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: userKeys.detail(id),
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
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}

export const useAddUser = () => useUserMutation((data) => usersService.add(data))
export const useUpdateUser = () => useUserMutation(({ id, data }) => usersService.update(id, data))
export const useDeleteUser = () => useUserMutation((id) => usersService.remove(id))
