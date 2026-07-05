import { Route, Routes } from 'react-router-dom'

import DashboardLayout from '../layouts/DashboardLayout'
import AdminCart from '../pages/dashboard/Cart'
import AdminDashboard from '../pages/dashboard/Dashboard'
import AdminLogin from '../pages/dashboard/Login'
import AdminUsers from '../pages/dashboard/Users'
import AdminDynamicOrder from '../pages/dashboard/orders/DynamicOrder'
import AdminOrders from '../pages/dashboard/orders/Orders'
import AdminProductCreate from '../pages/dashboard/products/ProductCreate'
import AdminProductEdit from '../pages/dashboard/products/ProductEdit'
import AdminProducts from '../pages/dashboard/products/Products'

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      <Route element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/:id/edit" element={<AdminProductEdit />} />
        <Route path="products/new" element={<AdminProductCreate />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminDynamicOrder />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="cart" element={<AdminCart />} />
      </Route>
    </Routes>
  )
}
