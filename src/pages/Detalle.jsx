import React from "react";
import "../styles/styles.css";
import ps5Img from "../assets/ps5-producto.webp";

export default function Detalle() {
  return (
    <>
      <nav className="navbar navbar-expand-lg nav-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Level-Up</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMain3"
            aria-controls="navMain3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navMain3">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/catalogo">Catálogo</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/carrito">
                  Carrito <span className="badge badge-accent cart-badge">0</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div id="detailArea" className="row">
          <div className="col-md-6">
            <img
              src={ps5Img}
              alt="PlayStation 5"
              className="img-fluid rounded"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://via.placeholder.com/600x400?text=Imagen+no+disponible";
              }}
            />
          </div>
          <div className="col-md-6">
            <h2>PlayStation 5</h2>
            <p>
              La consola PlayStation 5 ofrece una experiencia de juego de próxima generación
              con gráficos impresionantes y tiempos de carga ultrarrápidos.
            </p>
            <ul>
              <li>Procesador AMD Ryzen Zen 2</li>
              <li>Unidad SSD ultra rápida</li>
              <li>Compatibilidad con juegos en 4K</li>
              <li>Control inalámbrico DualSense</li>
            </ul>
            <p>
              <strong>Precio:</strong> $499.99
            </p>
          </div>
        </div>
      </main>

      <footer className="footer-dark text-center py-3">&copy; 2025 Level-Up Gamers</footer>
    </>
  );
}

