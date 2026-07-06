import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { sidebarData } from "./sidebarData";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "@/utils/logout";
export default function Sidebar({open ,setOpen}) {
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // const handleLogout = () => {
  // localStorage.removeItem("token");
  // navigate("/dashboard/login", { replace: true });
  //             };
  return (
    <>
      {/* <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-md bg-white p-2 shadow md:hidden"
      >
        <FaBars size={22} />
      </button> */}
      {/* {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )} */}
      {/* <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-lg transition-transform duration-300
        ${
          open ? "translate-x-0" : "-translate-x-full"
        }
        md:static md:translate-x-0`}
      > */}
        {/* <div className="flex justify-end p-4 md:hidden">
          <button onClick={() => setOpen(false)}>
            <FaTimes size={22} />
          </button>
        </div> */}
        <nav className="flex flex-col gap-2 px-4">
          {sidebarData.map((item) => (
            <SidebarItem
              key={item.path}
              title={item.title}
              path={item.path}
              icon={item.icon}
            />
          ))}
        </nav>


        <div className="absolute bottom-6 left-0 w-full px-4">
          <button
            className="w-full rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600"
            onClick={() => handleLogout(navigate)}
          >
            Logout
          </button>
        </div>
      {/* </aside> */}
    </>
  );
}