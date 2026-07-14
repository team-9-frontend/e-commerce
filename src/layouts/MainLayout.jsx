import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  )
}
