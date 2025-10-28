import React from "react";
import "../styles/styles.css";
import ps5Img from "../assets/ps5-producto.webp";

export default function DetalleBlog2() {
  return (
    <div className="container py-4">
      <article className="detalle-blog">
        <h2>La PS5 sigue liderando las ventas en 2025</h2>
        <img src={ps5Img} alt="PlayStation 5"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://via.placeholder.com/800x450?text=Imagen+no+disponible";
          }}
        />
        <p>
          La PlayStation 5 continúa siendo la consola más vendida en Chile. Su catálogo de
          juegos exclusivos, sumado al gran rendimiento gráfico, la mantienen como la favorita
          de los gamers. Además, la integración con servicios de streaming y su nuevo sistema
          de realidad virtual VR2 han impulsado las ventas.
        </p>
      </article>
    </div>
  );
}