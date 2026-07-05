
import { logout } from "../../api/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


  const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.log(error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }
};

  return (
    <div>
      <h1>Home Page</h1>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition duration-300 shadow-md"
      >
        Logout
      </button>
    </div>
  );
}