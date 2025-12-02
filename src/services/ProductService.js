import api from "./api";

const BASE = "/api/products";

export const getProducts = () => api.get(BASE);
export const getProduct = (id) => api.get(`${BASE}/${id}`);
export const createProduct = (data) => api.post(BASE, data);
export const updateProduct = (id, data) => api.put(`${BASE}/${id}`, data);
export const deleteProduct = (id) => api.delete(`${BASE}/${id}`);

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};