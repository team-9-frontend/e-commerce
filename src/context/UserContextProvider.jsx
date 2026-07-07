import { useQuery } from '@tanstack/react-query'

import { createContext, useContext, useState } from 'react'

import { getCurrentUser } from '@/api/authApi'

const userContext = createContext()
export const useUserContext = () => useContext(userContext)

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['currentUser', token],
    queryFn: getCurrentUser,
    enabled: !!token,
    retry: false,
  })

  const user = data?.data?.success ? data.data.user : null

  const refreshUser = () => {
    setToken(localStorage.getItem('token'))
    refetch()
  }

  return (
    <userContext.Provider value={{ user, isLoading, refreshUser }}>{children}</userContext.Provider>
  )
}
