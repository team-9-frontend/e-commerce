import { Route, Routes } from 'react-router-dom'

import DashboardLayout from '@/layouts/DashboardLayout'
import AdminCarts from '@/pages/dashboard/Carts'
import AdminDashboard from '@/pages/dashboard/Dashboard'
import AdminOrders from '@/pages/dashboard/Orders'
import AdminProductCreate from '@/pages/dashboard/ProductCreate'
import AdminProductEdit from '@/pages/dashboard/ProductEdit'
import AdminProductView from '@/pages/dashboard/ProductView'
import AdminProducts from '@/pages/dashboard/Products'
import AdminUsers from '@/pages/dashboard/Users'

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/edit/:id" element={<AdminProductEdit />} />
        <Route path="products/view/:id" element={<AdminProductView />} />
        <Route path="products/create" element={<AdminProductCreate />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="carts" element={<AdminCarts />} />
      </Route>
    </Routes>
  )
}
