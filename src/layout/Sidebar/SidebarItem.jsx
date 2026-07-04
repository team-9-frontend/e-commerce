import { NavLink } from "react-router-dom";

const SidebarItem = ({ title, path, icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{title}</span>
    </NavLink>
  );
};

export default SidebarItem;