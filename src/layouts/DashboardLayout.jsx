/*import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900">
      <Sidebar open={open} setOpen={setOpen} />

      <Navbar open={open} setOpen={setOpen} />

      <main
        className={`
          pt-20
          transition-all
          duration-300

          ${open ? "lg:ml-64" : "lg:ml-20"}

          ml-0
        `}
      >
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
*/

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
      {" "}
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-1 lg:ml-64">
        <Navbar open={open} setOpen={setOpen} />

        <main className="pt-16 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
