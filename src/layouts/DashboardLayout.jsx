import { Outlet } from 'react-router-dom'

import { useState } from 'react'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const DashboardLayout = () => {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-gray-100 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
      {' '}
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-1 lg:ml-64">
        <Navbar open={open} setOpen={setOpen} />

        <main className="p-4 pt-16 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
