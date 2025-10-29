import React from "react";
import "../styles/styles.css";
import sillaImg from "../assets/silla_gamer-removebg-preview(3).png";

export default function Detalle3() {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg nav-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">Level-Up</a>
        </div>
      </nav>

      <main className="container py-4">
        <div id="detailArea" className="row">
          <div className="col-md-6">
            <img
              src={sillaImg}
              alt="Producto 3"
              className="img-fluid rounded"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://via.placeholder.com/600x400?text=Imagen+no+disponible";
              }}
            />
          </div>
          <div className="col-md-6">
            <h2>Silla Gamer Secretlab Titan</h2>
            <p>
              Secretlab Titan — silla gamer de gama alta (varias variantes).
            </p>
            <ul>
              <li>
                Tamaños y variantes: Regular / XL / Small; materiales: NEO™ Hybrid Leatherette o
                tejido SoftWeave.
              </li>
              <li>Ajustes: soporte lumbar integrado ajustable, inclinación, reposabrazos 4D.</li>
              <li>
                Carga máxima y rango recomendado dependen de la variante (ver comparativa de
                Secretlab).
              </li>
              <li>Extras: cojín para la cabeza, ruedas de alta calidad, base de aluminio.</li>
            </ul>
            <p>
              <strong>Precio:</strong> $199.99
            </p>
          </div>
        </div>
      </main>

      <footer className="footer-dark text-center py-3">&copy; 2025 Level-Up Gamers</footer>
    </div>
  );
}