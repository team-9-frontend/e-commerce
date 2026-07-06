import { Outlet } from 'react-router-dom'

import { useState } from 'react'

import Navbar from '@/components/dashboard/Navbar'
// import Sidebar from '@/components/dashboard/Sidebar'
import { cn } from '@/utils/cn'
import Sidebar from '../components/dashboard/Sidebar/Sidebar'

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-neutral-100 text-neutral-950 dark:bg-neutral-50">
      <div className="realtive z-50 col-start-1 col-end-3 row-start-1 row-end-2">
        <Navbar open={open} setOpen={setOpen} />
      </div>
      <aside
        className={cn(
          'relative z-40 col-start-1 col-end-2 row-start-2 row-end-3 grid grid-rows-subgrid bg-white text-neutral-950 transition-all dark:bg-neutral-100',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <Sidebar open={open} setOpen={setOpen} />
      </aside>
      <main className="col-start-1 col-end-3 row-start-2 row-end-3 lg:col-start-2">
        <Outlet />
      </main>
    </div>
  )
}
