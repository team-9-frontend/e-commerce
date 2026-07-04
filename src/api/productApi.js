import api from "./axios";

export const getProducts = (params) => api.get("/products", { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const searchProducts = (params) => api.get("/products/search", { params });