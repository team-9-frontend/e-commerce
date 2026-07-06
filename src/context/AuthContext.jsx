import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../api/authApi";

import {
  getMyOrders,
  getAllOrders,
  getOrdersStates,
  getCarts,
} from "../api/ordersApi";

import { getCart } from "../api/cartApi";

import {
  getWishlist,
  getAllWishlist,
  getWishlistStates,
} from "../api/wishlistApi";

import { getAllUsers } from "../api/usersApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [userData, setUserData] = useState({
    orders: null,
    cart: null,
    wishlist: null,
  });

  const [adminData, setAdminData] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);

      // Get current logged user
      const userResponse = await getCurrentUser();

      if (!userResponse.data.success) {
        setUser(null);
        return;
      }

      const currentUser = userResponse.data.user;

      setUser(currentUser);

      // User data
      const [ordersResponse, cartResponse, wishlistResponse] =
        await Promise.all([
          getMyOrders(),
          getCart(),
          getWishlist(),
        ]);

      setUserData({
        orders: ordersResponse.data.orders,
        cart: cartResponse.data,
        wishlist: wishlistResponse.data.wishlist,
      });

      // Admin only
      if (currentUser.role === "admin") {
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
        ]);

        setAdminData({
          users: usersResponse.data.users,
          orders: allOrdersResponse.data.orders,
          dashboard: dashboardResponse.data.dashboard,
          carts: cartsResponse.data.carts,
          wishlists: allWishlistResponse.data.wishlists,
          wishlistStats: wishlistStatsResponse.data.statistics,
        });
      } else {
        setAdminData(null);
      }
    } catch (error) {
      console.error("AuthContext Error:", error);;

      setUser(null);

      setUserData({
        orders: null,
        cart: null,
        wishlist: null,
      });

      setAdminData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        adminData,
        loading,
        refreshUser: fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);