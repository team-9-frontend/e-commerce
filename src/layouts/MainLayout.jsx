import { Outlet } from 'react-router-dom'
import { useStoreCurrentUser } from '@/store-auth/hooks/useStoreCurrentUser'
export default function MainLayout() {
  useStoreCurrentUser()
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  )
}
