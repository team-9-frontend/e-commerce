import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div>
      <h1>E-Commerce Dashboard</h1>
      <hr />
      <Outlet />
    </div>
  )
}
