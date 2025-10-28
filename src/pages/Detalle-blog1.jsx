import React from "react";
import "../styles/styles.css";
import eventImg from "../assets/principal.png";

export default function DetalleBlog1() {
  return (
    <div className="container py-4">
      <article className="detalle-blog">
        <h2>Level-Up Gamer organiza un torneo nacional</h2>
        <img
          src={eventImg}
          alt="Evento Gamer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://via.placeholder.com/800x450?text=Imagen+no+disponible";
          }}
        />
        <p>
          Este mes, Santiago será sede del torneo nacional organizado por Level-Up Gamer.
          Más de 500 jugadores competirán en títulos como League of Legends, Valorant y FIFA.
          Los ganadores no solo recibirán premios en efectivo, sino también puntos LevelUp que podrán canjear en la tienda.
        </p>
      </article>
    </div>
  );
}

 