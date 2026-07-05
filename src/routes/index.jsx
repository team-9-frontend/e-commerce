import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import NotFound from '@/pages/NotFound'
import ForgetPassword from '@/pages/auth/ForgetPassword'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import VerifyOTP from '@/pages/auth/VerifyOTP'
import Checkout from '@/pages/checkout/Checkout'
import OrderSuccess from '@/pages/checkout/OrderSuccess'
import Payment from '@/pages/checkout/Payment'
import DynamicProduct from '@/pages/store/DynamicProduct'
import Home from '@/pages/store/Home'
import Products from '@/pages/store/Products'
import Cart from '@/pages/user/Cart'
import DynamicOrder from '@/pages/user/DynamicOrder'
import Orders from '@/pages/user/Orders'
import Profile from '@/pages/user/Profile'
import Wishlist from '@/pages/user/Wishlist'

import DashboardRoutes from './DashboardRoutes'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<DynamicProduct />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/orders" element={<Orders />} />
          <Route path="/profile/orders/:id" element={<DynamicOrder />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          <Route path="/payment" element={<Payment />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
