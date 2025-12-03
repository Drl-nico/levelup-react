import axios from "axios";

const API_URL = "http://localhost:8081/api/boletas";

// Crear boleta
export const crearBoleta = async (boleta) => {
  const response = await axios.post(API_URL, boleta);
  return response.data;
};

// Obtener todas las boletas (para ver historial)
export const getBoletas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
