export  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    navigate("/dashboard/login", { replace: true });
  };