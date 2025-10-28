import React from "react";
import "../styles/styles.css";
import ps5Img from "../assets/ps5-producto.webp";
import eventImg from "../assets/534355bc13402cf564762cd0c6fae65f.jpg";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "La PS5 sigue liderando las ventas en 2025",
      img: ps5Img,
      href: "/DetalleBlog2",
      excerpt:
        "La consola de Sony mantiene su popularidad en Chile gracias a sus exclusivos y su potencia gráfica...",
    },
    {
      id: 2,
      title: "Level-Up Gamer organiza un torneo nacional",
      img: eventImg,
      href: "/DetalleBlog1",
      excerpt:
        "La comunidad gamer se reúne este mes en Santiago para competir, ganar premios y acumular puntos LevelUp...",
    },
  ];

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="title">🎮 Level-Up Gamer</h1>
        <nav>
          <a href="/">Inicio</a> | <a href="/productos">Productos</a> | <a href="/registro">Registro</a> | <a href="/login">Login</a> | <a href="/Contact">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="blog">
          <h2>📰 Noticias y Comunidad Gamer</h2>

          <div className="row">
            {posts.map((p) => (
              <article key={p.id} className="col-md-6 blog-card">
                <img
                  src={p.img}
                  alt={p.title}
                  className="img-fluid mb-2"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=Imagen+no+disponible";
                  }}
                />
                <h3>
                  <a href={p.href}>{p.title}</a>
                </h3>
                <p>{p.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer-dark text-center py-3">© 2025 Level-Up Gamer</footer>
    </div>
  );
}
