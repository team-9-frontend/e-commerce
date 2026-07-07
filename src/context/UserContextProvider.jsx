import { createContext, useContext, useEffect, useState } from 'react'

import { getCurrentUser } from '@/api/authApi'

const userContext = createContext()

export const useUserContext = () => useContext(userContext)

export default function userContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const {
        data: { success, user },
      } = await getCurrentUser()
      if (!success) return
      setUser(user)
    } catch (error) {
      console.error(error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <userContext.Provider
      value={{
        user,
        loading,
        refreshUser: fetchCurrentUser,
      }}
    >
      {children}
    </userContext.Provider>
  )
}
