import api from "./api";

// Crear boleta
export const crearBoleta = async (boleta) => {
  const response = await api.post("/boletas", boleta);
  return response.data;
};

// Obtener todas las boletas (para ver historial)
export const getBoletas = async () => {
  const response = await api.get("/boletas");
  return response.data;
};
