import { Outlet, useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'

import { useCurrentUser } from '@/api'
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import { cn } from '@/utils/cn'

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const { data: user, isLoading, isError } = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return
    if (isError || !user) return navigate('/login')
    if (user.role !== 'admin') {
      navigate('/')
    }
  }, [user, isLoading, isError])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-neutral-100 text-neutral-950 dark:bg-neutral-50">
      <Header
        open={open}
        setOpen={setOpen}
        minimized={minimized}
        setMinimized={setMinimized}
        className="relative z-50 col-start-1 col-end-3 row-start-1 row-end-2"
      />

      <Sidebar
        open={open}
        minimized={minimized}
        className="relative z-50 col-start-1 col-end-2 row-start-2 row-end-3"
      />

      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed inset-0 z-10 cursor-default bg-black/50 lg:hidden',
          open ? 'block' : 'hidden',
        )}
      ></button>

      <main className="col-start-1 col-end-3 row-start-2 row-end-3 overflow-y-scroll lg:col-start-2">
        <div className="flex min-h-screen flex-col lg:container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
