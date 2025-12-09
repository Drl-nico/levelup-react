import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser, tokenHasRole } from "../services/authService";

export default function RequireAuth({ requiredRole }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && !tokenHasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
