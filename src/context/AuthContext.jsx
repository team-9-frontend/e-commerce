import { createContext, useContext, useEffect, useState } from 'react'
import {
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
} from '@/api/authApi'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   void loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        setLoading(false)
        return
      }

      const { data } = await getCurrentUser()
      setUser(data)
    } catch (error) {
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (formData) => {
    await loginApi(formData)

    const { data } = await getCurrentUser()

    setUser(data)
  }

  const logout = async () => {
    try {
      await logoutApi()
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        setUser,
        loadUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}