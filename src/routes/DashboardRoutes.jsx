import { Route, Routes } from 'react-router-dom'
import DashboardLayout from 'src/layouts/DashboardLayout'
import AdminCart from 'src/pages/dashboard/Cart'
import AdminDashboard from 'src/pages/dashboard/Dashboard'
import AdminLogin from 'src/pages/dashboard/Login'
import AdminUsers from 'src/pages/dashboard/Users'
import AdminDynamicOrder from 'src/pages/dashboard/orders/DynamicOrders'
import AdminOrders from 'src/pages/dashboard/orders/Orders'
import AdminProducts from 'src/pages/dashboard/products/Products'
import AdminProductCreate from 'src/pages/dashboard/products/ProductsCreate'
import AdminProductEdit from 'src/pages/dashboard/products/ProductsEdit'

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
        <Route path="users" element={<AdminUsers />} />
        <Route path="cart" element={<AdminCart />} />
        <Route path="orders/:id" element={<AdminDynamicOrder />} />
      </Route>
    </Routes>
  )
}
