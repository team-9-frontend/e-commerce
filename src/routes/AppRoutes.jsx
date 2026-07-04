import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from 'src/pages/e-commerce/Home'
import NotFound from 'src/pages/e-commerce/NotFound'
import ForgetPassword from 'src/pages/e-commerce/auth/ForgetPassword'
import Login from 'src/pages/e-commerce/auth/Login'
import Register from 'src/pages/e-commerce/auth/Register'
import VerifyOTP from 'src/pages/e-commerce/auth/VerifyOTP'
import Checkout from 'src/pages/e-commerce/checkout/Checkout'
import OrderSuccess from 'src/pages/e-commerce/checkout/OrderSuccess'
import Payment from 'src/pages/e-commerce/checkout/Payment'
import DynamicProduct from 'src/pages/e-commerce/products/DynamicProduct'
import Products from 'src/pages/e-commerce/products/Products'
import Cart from 'src/pages/e-commerce/user/Cart'
import DynamicOrder from 'src/pages/e-commerce/user/DynamicOrder'
import Orders from 'src/pages/e-commerce/user/Orders'
import Profile from 'src/pages/e-commerce/user/Profile'
import Wishlist from 'src/pages/e-commerce/user/Wishlist'

import DashboardRoutes from './DashboardRoutes'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

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

        <Route path="/dashboard/*" element={<DashboardRoutes />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
