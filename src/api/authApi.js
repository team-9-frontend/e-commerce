import api from "./axios";

export const login = (data) => api.post("/auth/login", data);
export const sendRegisterOtp = (data) => api.post("/auth/register/send-otp", data);
export const verifyRegisterOtp = (data) => api.post("/auth/register/verify-otp", data);
export const getCurrentUser = () => api.get("/auth/me");
export const logout = () => api.post("/auth/logout");