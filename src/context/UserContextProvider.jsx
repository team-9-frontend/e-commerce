import { createContext, useContext, useEffect, useState } from 'react'

import { getCurrentUser } from '@/api/authApi'
import { getCart } from '@/api/cartApi'
import { getAllOrders, getCarts, getMyOrders, getOrdersStates } from '@/api/ordersApi'
import { getAllUsers } from '@/api/usersApi'
import { getAllWishlist, getWishlist, getWishlistStates } from '@/api/wishlistApi'

const userContext = createContext()

export default function userContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setUser(null)
      setUserData(null)
      setAdminData(null)
      setLoading(false)
      return
    }

    try {
      const { data: userResponse } = await getCurrentUser()
      if (!userResponse.success) return

      const currentUser = userResponse.user
      setUser(currentUser)

      // User data
      const [ordersResponse, cartResponse, wishlistResponse] = await Promise.all([
        getMyOrders(),
        getCart(),
        getWishlist(),
      ])

      setUserData({
        orders: ordersResponse.data.orders,
        cart: cartResponse.data,
        wishlist: wishlistResponse.data.wishlist,
      })

      // Admin only
      if (currentUser.role === 'admin') {
        const [
          usersResponse,
          allOrdersResponse,
          dashboardResponse,
          cartsResponse,
          allWishlistResponse,
          wishlistStatsResponse,
        ] = await Promise.all([
          getAllUsers(),
          getAllOrders(),
          getOrdersStates(),
          getCarts(),
          getAllWishlist(),
          getWishlistStates(),
        ])

        setAdminData({
          users: usersResponse.data.users,
          orders: allOrdersResponse.data.orders,
          dashboard: dashboardResponse.data.dashboard,
          carts: cartsResponse.data.carts,
          wishlists: allWishlistResponse.data.wishlists,
          wishlistStats: wishlistStatsResponse.data.statistics,
        })
      } else {
        setAdminData(null)
      }
    } catch (error) {
      console.error(error)
      setUser(null)
      setUserData(null)
      setAdminData(null)
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
        userData,
        adminData,
        loading,
        refreshUser: fetchCurrentUser,
      }}
    >
      {children}
    </userContext.Provider>
  )
}

export const useUserContext = () => useContext(userContext)
