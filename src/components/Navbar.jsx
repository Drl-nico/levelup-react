import React from "react";
import { Link } from "react-router-dom";
import "../styles/diseno.css"; // Importa tu archivo de estilos
import "../styles/styles.css";

export default function Navbar() {
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
              <Link className="nav-link" to="/blogs">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                Carrito{" "}
                <span className="badge badge-accent cart-badge">0</span>
              </Link>
            </li>
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
          </ul>
        </div>
      </div>
    </nav>
  );
}