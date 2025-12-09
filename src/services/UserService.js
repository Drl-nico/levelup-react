import api from "./api";

const USERS_URL = "/users"; // api base is set in src/services/api.js

// Obtener usuario por email con manejo de 404
export const getUserByEmail = async (email) => {
  try {
    const response = await api.get(`${USERS_URL}/email`, {
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

// Login usando backend (/api/auth/login) - guarda token/user si el backend lo devuelve
export const loginUser = async (email, password) => {
  const resp = await api.post(`/auth/login`, { email, password });
  const data = resp.data;
  if (data && data.token) {
    try {
      localStorage.setItem("token", data.token);
      // set Authorization header immediately for api instance
      try { api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`; } catch(e) {}
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
    } catch (e) {}
  }
  return data;
};

// Registrar (delegar a /api/auth/register). Guarda token/user si se devuelve.
export const registerUser = async (user) => {
  const resp = await api.post(`/auth/register`, user);
  const data = resp.data;
  if (data && data.token) {
    try {
      localStorage.setItem("token", data.token);
      // set Authorization header immediately for api instance
      try { api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`; } catch(e) {}
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
    } catch (e) {}
  }
  return data;
};

// Obtener todos (requiere autorización en backend)
export const getAllUsers = async () => {
  const response = await api.get(USERS_URL);
  return response.data;
};

// Eliminar
export const deleteUser = async (id) => {
  return await api.delete(`${USERS_URL}/${id}`);
};
