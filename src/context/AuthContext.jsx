import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import * as authService from "../services/authService";
import { registerUser as registerApi } from "../services/UserService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    // initialize api auth header if token exists
    try {
      const token = localStorage.getItem("token");
      if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (e) {}
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result && result.token) {
      const newUser = result.user || JSON.parse(localStorage.getItem("user") || "null");
      setUser(newUser);
      return { token: result.token, user: newUser };
    }
    return null;
  };

  const register = async (userPayload) => {
    // use existing register API (will set token/user in localStorage)
    const result = await registerApi(userPayload);
    if (result && result.token) {
      const newUser = result.user || JSON.parse(localStorage.getItem("user") || "null");
      setUser(newUser);
      return { token: result.token, user: newUser };
    }
    return null;
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];
    } catch (e) {}
    setUser(null);
    // redirect to login
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
