import { useStoreCurrentUser } from './useStoreCurrentUser'

export const useStoreAuth = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useStoreCurrentUser()

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
    error,
  }
}  