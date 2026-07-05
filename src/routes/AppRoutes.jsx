import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import NotFound from '@/pages/e-commerce/NotFound'
import ForgetPassword from '@/pages/e-commerce/auth/ForgetPassword'
import Login from '@/pages/e-commerce/auth/Login'
import Register from '@/pages/e-commerce/auth/Register'
import VerifyOTP from '@/pages/e-commerce/auth/VerifyOTP'
import Checkout from '@/pages/e-commerce/checkout/Checkout'
import OrderSuccess from '@/pages/e-commerce/checkout/OrderSuccess'
import Payment from '@/pages/e-commerce/checkout/Payment'
import DynamicProduct from '@/pages/e-commerce/products/DynamicProduct'
import Products from '@/pages/e-commerce/products/Products'
import Cart from '@/pages/e-commerce/user/Cart'
import DynamicOrder from '@/pages/e-commerce/user/DynamicOrder'
import Orders from '@/pages/e-commerce/user/Orders'
import Profile from '@/pages/e-commerce/user/Profile'
import Wishlist from '@/pages/e-commerce/user/Wishlist'

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
