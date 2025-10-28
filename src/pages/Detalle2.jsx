import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import asusImg from "../assets/asus.jpeg";

export default function Detalle2() {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg nav-dark mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">Level-Up</Link>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-6">
          <img
            src={asusImg}
            alt="PC Gamer ASUS ROG Strix"
            className="img-fluid rounded"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://via.placeholder.com/600x400?text=Imagen+no+disponible";
            }}
          />
        </div>
        <div className="col-md-6">
          <h2>PC Gamer ASUS ROG Strix</h2>
          <p>
            Potente PC gamer ASUS ROG Strix diseñada para rendimiento extremo en juegos y streaming.
            Incluye componentes de gama alta para asegurar altas tasas de frames y estabilidad.
          </p>
          <ul>
            <li>Procesador Intel/AMD de última generación</li>
            <li>Tarjeta gráfica RTX/AMD Radeon de alta gama</li>
            <li>Memoria RAM ampliable</li>
            <li>Refrigeración optimizada</li>
          </ul>
          <p>
            <strong>Precio:</strong> $1,299,990 CLP
          </p>
        </div>
      </div>
    </div>
  );
}
