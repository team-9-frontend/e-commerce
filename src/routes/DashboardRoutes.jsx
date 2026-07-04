
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Orders from "../pages/Orders";
import Users from "../pages/Users";

import Login from "../pages/dashboard/Login";
import Signup from "../pages/dashboard/Signup";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="products" element={<Products />} />
      <Route path="categories" element={<Categories />} />
      <Route path="orders" element={<Orders />} />
      <Route path="users" element={<Users />} />
    </Routes>
  );             
 } 