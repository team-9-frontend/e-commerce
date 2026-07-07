import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { usersService } from '../services/usersService'
import { userKeys } from '../keys/userKeys'

// ----------------------------------
// QUERIES (GET Requests)
// ----------------------------------

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: usersService.getAll,
  })
}

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersService.getById(id),
    enabled: !!id,
  })
}

// ----------------------------------
// MUTATIONS (POST / PATCH / DELETE)
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

export const useAddUser = () => useUserMutation(usersService.add)

export const useUpdateUser = () =>
  useUserMutation(({ id, data }) => usersService.update(id, data))

export const useDeleteUser = () => useUserMutation((id) => usersService.remove(id))
