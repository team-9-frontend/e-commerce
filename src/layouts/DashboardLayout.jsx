import { Outlet } from 'react-router-dom'

import { useState } from 'react'

import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-neutral-100 text-neutral-950 dark:bg-neutral-50">
      <Navbar
        open={open}
        setOpen={setOpen}
        className="realtive z-50 col-start-1 col-end-3 row-start-1 row-end-2"
      />

      <Sidebar open={open} className="relative z-40 col-start-1 col-end-2 row-start-2 row-end-3" />

      <main className="col-start-1 col-end-3 row-start-2 row-end-3 lg:col-start-2">
        <Outlet />
      </main>
    </div>
  )
}
