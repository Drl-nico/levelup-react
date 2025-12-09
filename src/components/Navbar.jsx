import React from "react";
import { Link } from "react-router-dom";
import "../styles/diseno.css"; // Importa tu archivo de estilos
import "../styles/styles.css";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const tokenHasAdmin = () => {
    if (!user) return false;
    const role = (user.role || user.roleName || "").toString().toUpperCase();
    return role === "ADMIN" || role === "ROLE_ADMIN";
  };

  return (
    <nav className="navbar navbar-expand-lg nav-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Level-Up Gamer
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain1"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMain1">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">
                Catálogo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Contact">
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Blog">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                Carrito
              </Link>
            </li>

            {/* Show admin link only if user has ADMIN role */}
            {user && tokenHasAdmin() && (
              <li className="nav-item">
                <Link className="nav-link" to="/administrador">
                  Administrador
                </Link>
              </li>
            )}

            {/* If user is logged in show logout, otherwise show login/register */}
            {user ? (
              <>
                <li className="nav-item nav-user">
                  <span className="nav-link">{user.nombre || user.email}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Inicio de sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}