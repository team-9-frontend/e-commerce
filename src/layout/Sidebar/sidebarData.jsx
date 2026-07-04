import {
    FaTachometerAlt,
    FaUsers,
    FaBoxOpen,
    FaPlusSquare,
    FaClipboardList,
    FaShoppingCart,
    FaCog,
  } from "react-icons/fa";
  
  export const sidebarData = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Users",
      path: "/users",
      icon: <FaUsers />,
    },
    {
      title: "Products",
      path: "/products",
      icon: <FaBoxOpen />,
    },
    {
      title: "Add Product",
      path: "/products/add",
      icon: <FaPlusSquare />,
    },
    {
      title: "Orders",
      path: "/orders",
      icon: <FaClipboardList />,
    },
    {
      title: "Carts",
      path: "/carts",
      icon: <FaShoppingCart />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];