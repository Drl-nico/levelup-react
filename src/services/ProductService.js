import api from "./api";

const BASE = "/products";

export const getAllProducts = async () => {
  try {
    const response = await api.get(BASE);
    console.log('Productos obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const getProducts = () => api.get(BASE);
export const getProduct = (id) => api.get(`${BASE}/${id}`);
export const createProduct = (data) => api.post(BASE, data);
export const updateProduct = (id, data) => api.put(`${BASE}/${id}`, data);
export const deleteProduct = (id) => api.delete(`${BASE}/${id}`);


