import React from "react";
import "../styles/diseno.css"; // Importa tu archivo de estilos
import "../styles/styles.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg nav-dark">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          Level-Up Gamer
        </a>

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
              <a className="nav-link" href="index.html">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="catalogo.html">
                Catálogo
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="contacto.html">
                Contacto
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="blog.html">
                Blogs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="carrito.html">
                Carrito{" "}
                <span className="badge badge-accent cart-badge">0</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="login.html">
                Inicio de sesión
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="registro.html">
                Registrarse
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}