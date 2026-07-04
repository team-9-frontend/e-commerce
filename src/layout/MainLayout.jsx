
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <h1>E-Commerce Dashboard</h1>
      <hr />
      <Outlet />
    </div>
  );
}

export default MainLayout;