const Sidebar = ({ open }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 border-r border-gray-200 bg-white text-black transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} `}
    >
      <div className="flex h-16 items-center justify-center border-b dark:border-zinc-800">
        <h2 className="text-2xl font-bold dark:text-white">Ecommerce</h2>
      </div>
    </aside>
  )
}

export default Sidebar
