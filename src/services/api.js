import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082/api",
});

// Attach token from localStorage to each request
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    // ignore
  }
  return config;
});

// Handle 401/403 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch (e) { }
      // redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
