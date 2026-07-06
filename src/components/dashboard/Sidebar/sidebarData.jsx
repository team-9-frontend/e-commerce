import {
    FaTachometerAlt,
    FaUsers,
    FaBoxOpen,
    FaPlusSquare,
    FaClipboardList,
    FaShoppingCart,
    FaCog,
  } from "react-icons/fa";
  
  export const sidebarData =[
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      title: "Products",
      path: "/dashboard/products",
      icon: <FaBoxOpen />,
    },
    {
      title: "Add Product",
      path: "/dashboard/products/new",
      icon: <FaPlusSquare />,
    },
    {
      title: "Orders",
      path: "/dashboard/orders",
      icon: <FaClipboardList />,
    },
    {
      title: "Carts",
      path: "/dashboard/cart",
      icon: <FaShoppingCart />,
    },
    {
      title: "Settings",
      path: "/dashboard/settings",
      icon: <FaCog />,
    },
  ];