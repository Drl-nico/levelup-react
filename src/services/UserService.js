import axios from "axios";

const API_URL = "http://localhost:8081/api/users";

// Obtener usuario por email con manejo de 404
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/email`, {
      params: { email },
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return null; // Usuario no existe
    }
    throw err;
  }
};

// Login usando backend
export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
};

// Registrar
export const registerUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// Obtener todos
export const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Eliminar
export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
