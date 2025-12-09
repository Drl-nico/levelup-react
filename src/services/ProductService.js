import axios from 'axios';

// URL base del backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/products';

// Obtener todos los productos (GET)
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Productos obtenidos:', response.data);  // Verifica la respuesta en consola
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};
