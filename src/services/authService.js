import axios from "axios";
import api from "./api";
import { getUserByEmail } from "./UserService";

// Decode JWT payload without extra dependency
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    // atob might throw on Unicode, so use decodeURIComponent trick
    const json = decodeURIComponent(
      atob(payload)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export const login = async (email, password) => {
  const resp = await api.post("/auth/login", { email, password });
  const data = resp.data;
  if (data && data.token) {
    localStorage.setItem("token", data.token);
    // set Authorization header immediately for api instance
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    } catch (e) {}

    // If backend returned user object, store it. Otherwise try to fetch user by email from token
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      return { token: data.token, user: data.user };
    }

    // decode token to extract username/email
    const payload = decodeToken(data.token);
    const subject = payload?.sub || payload?.email || payload?.username;
    if (subject) {
      try {
        const user = await getUserByEmail(subject);
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          return { token: data.token, user };
        }
      } catch (e) {
        // ignore fetch error, still return token
      }
    }
  }
  return { token: data?.token };
};

export const logout = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (e) {}
  // clear api instance auth header
  try {
    delete api.defaults.headers.common["Authorization"];
  } catch (e) {}
  window.location.href = "/login";
};

export const getCurrentUser = () => {
  const u = localStorage.getItem("user");
  if (!u) return null;
  try {
    return JSON.parse(u);
  } catch (e) {
    return null;
  }
};

export const tokenHasRole = (role) => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const payload = decodeToken(token);
  if (!payload) return false;
  // possible claim names: roles, role, authority, authorities
  const roles = payload.roles || payload.role || payload.authorities || payload.authority;
  if (!roles) return false;
  if (Array.isArray(roles)) return roles.includes(role) || roles.some(r => r.toUpperCase() === role.toUpperCase());
  return roles.toString().toUpperCase().includes(role.toUpperCase());
};
