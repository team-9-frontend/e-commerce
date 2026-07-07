import { useQuery, useQueryClient } from '@tanstack/react-query'

import { createContext, useContext, useState } from 'react'

import { getCurrentUser } from '@/api/authApi'

const userContext = createContext()
export const useUserContext = () => useContext(userContext)

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    enabled: !!token,
    retry: false,
  })

  const user = data?.data?.success ? data.data.user : null

  const refreshUser = () => {
    const currentToken = localStorage.getItem('token')
    setToken(currentToken)
    if (!currentToken) {
      return queryClient.clear()
    }
    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  return (
    <userContext.Provider value={{ user, isLoading, refreshUser }}>{children}</userContext.Provider>
  )
}
