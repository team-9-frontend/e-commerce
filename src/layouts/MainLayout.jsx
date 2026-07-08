import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="container flex min-h-screen flex-col">
      <Outlet />
    </div>
  )
}
