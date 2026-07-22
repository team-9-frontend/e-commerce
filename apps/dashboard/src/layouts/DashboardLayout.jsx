import { useEffect, useState } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

import { useCurrentUser } from '@repo/api'
import { LoadingSpinner } from '@repo/ui'
import { cn } from '@repo/utils'

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)

  const { data: user, isLoading } = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return
    if (!user) return navigate('/login')
    if (user.role !== 'admin') return navigate('/login')
  }, [user, isLoading, navigate])

  return isLoading ? (
    <div className="flex-center min-h-screen py-8">
      <LoadingSpinner className="size-24" />
    </div>
  ) : (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-neutral-100 dark:bg-neutral-50">
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
        className="relative z-40 col-start-1 col-end-2 row-start-2 row-end-3"
      />

      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed inset-0 z-10 cursor-default bg-neutral-50/50 backdrop-blur-sm transition-all lg:hidden',
          open ? 'opacity-100' : 'invisible opacity-0',
        )}
      ></button>

      <main className="col-start-1 col-end-3 row-start-2 row-end-3 overflow-y-scroll lg:col-start-2">
        <div className="container flex min-h-full flex-col py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
