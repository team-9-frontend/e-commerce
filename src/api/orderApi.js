import api from "./axios";

export const createOrder = (data) => api.post("/orders", data);
export const getMyOrders = () => api.get("/orders/my");
export const getOrderById = (id) => api.get(`/orders/my/${id}`);