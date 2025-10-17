import React from "react";
import "../styles/styles2.css"; // Importación del archivo CSS
import "../styles/diseno.css"; // Importación del archivo CSS


// Importa imágenes desde src/assets (coloca las imágenes en src/assets)
import ps5Img from "../assets/ps5-producto.webp";
import asusImg from "../assets/asus.jpeg";

export default function Home() {
  const products = [
    {
      id: 1,
      title: "PlayStation 5",
      price: "$549,990 CLP",
      img: ps5Img,
      href: "/detalle",
      alt: "PlayStation 5",
    },
    {
      id: 2,
      title: "PC Gamer ASUS ROG Strix",
      price: "$1,299,990 CLP",
      img: asusImg,
      href: "/detalle2",
      alt: "PC Gamer ASUS ROG Strix",
    },
    {
      id: 3,
      title: "Silla Gamer Secretlab Titan",
      price: "$349,990 CLP",
      // Usar placeholder para evitar el error. Reemplaza por la importación real si añades el archivo.
      img: "https://via.placeholder.com/600x400?text=Imagen+no+disponible",
      href: "/detalle3",
      alt: "Silla Gamer Secretlab Titan",
    },
  ];

  // Componente local para cada tarjeta de producto
  function ProductCard({ product }) {
    return (
      <div className="col-md-4">
        <div className="card p-3">
          <img
            src={product.img}
            alt={product.alt}
            className="img-fluid mb-2"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';
            }}
          />
          <h3>{product.title}</h3>
          <p>Precio: {product.price}</p>
          <a href={product.href} className="btn btn-primary">
            Ver detalle
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header: título, subtítulo y CTA agrupados y ordenados */}
      <header className="container text-center py-5">
        <h1 className="title">Level-Up Gamer</h1>
        <p className="section-title">Tienda de juegos gamers — Proyecto didáctico</p>
        <nav>
          <a className="btn btn-accent btn-lg" href="/catalogo">
            Ver catálogo
          </a>
        </nav>
      </header>

      {/* Main: sección de productos destacados usando map */}
      <main className="container pb-5">
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="section-title">
            Productos destacados
          </h2>

          <div id="featured" className="row g-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer: moved to App component so it renders consistently */}
    </>
  );
}