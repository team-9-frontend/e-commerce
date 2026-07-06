export  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };