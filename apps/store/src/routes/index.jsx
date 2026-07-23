import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import VerifyOtp from '@/pages/auth/VerifyOtp'
import Checkout from '@/pages/checkout/Checkout'
import OrderSuccess from '@/pages/checkout/OrderSuccess'
import Payment from '@/pages/checkout/Payment'
import NotFound from '@/pages/NotFound'
import Home from '@/pages/store/Home'
import Products from '@/pages/store/Products'
import ProductView from '@/pages/store/ProductView'
import Cart from '@/pages/user/Cart'
import Orders from '@/pages/user/Orders'
import OrderView from '@/pages/user/OrderView'
import Profile from '@/pages/user/Profile'
import Wishlist from '@/pages/user/Wishlist'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductView />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderView />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/payment" element={<Payment />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
