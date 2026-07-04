const Sidebar = ({ open }) => {
  return (
    <aside
      className={`
    fixed
    top-0
    left-0
    h-screen
    w-64

    bg-white
    dark:bg-zinc-900

    text-black
    dark:text-white

    border-r
    border-gray-200
    dark:border-zinc-800

    transition-all
    duration-300

    ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
    >
      <div className="h-16 flex items-center justify-center border-b dark:border-zinc-800">
        <h2 className="text-2xl font-bold dark:text-white">Ecommerce</h2>
      </div>
    </aside>
  );
};

export default Sidebar;
