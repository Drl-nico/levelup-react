import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/styles2.css";
import "../styles/catalogo.css";
import ps5Img from "../assets/ps5-producto.webp";
import asusImg from "../assets/asus-removebg-preview.png";
import sillaImg from "../assets/silla_gamer-removebg-preview(3).png";
import Catan from "../assets/JM001-removebg-preview.png";
import Audifonos from "../assets/AC002-removebg-preview.png";
import ControlXbox from "../assets/AC001-removebg-preview.png";
import Carcasssone from "../assets/JM002-removebg-preview.png";
import Mouse from "../assets/MS001-removebg-preview.png";
import Mousepad from "../assets/MP001-removebg-preview.png";
import Polera from "../assets/PP001-removebg-preview.png";
export default function Catalogo() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = useMemo(
    () => [
      { id: 1, title: "PlayStation 5", category: "Consolas", price: 549990, img: ps5Img, href: "/detalle" },
      { id: 2, title: "PC Gamer ASUS ROG Strix", category: "Computadores Gamers", price: 1299990, img: asusImg, href: "/detalle2" },
      { id: 3, title: "Silla Gamer Secretlab Titan", category: "Muebles", price: 349990, img: sillaImg, href: "/detalle3" },
      { id: 4, title: "Catan", category: "Juegos de Mesa", price: 29990, img: Catan, href: "/detalle4" },
      { id: 5, title: "Audífonos Gamer HyperX Cloud II", category: "Accesorios", price: 79990, img: Audifonos, href: "/detalle5" },
      { id: 6, title: "Joystick Xbox Series X", category: "Accesorios", price: 59990, img: ControlXbox, href: "/detalle6" },
      { id: 7, title: "Carcassonne", category: "Juegos de Mesa", price: 24990, img: Carcasssone, href: "/detalle7" },
      { id: 8, title: "Mouse Logitech G502 HERO", category: "Accesorios", price: 49990, img: Mouse, href: "/detalle8" },
      { id: 9, title: "Mousepad Razer Goliathus", category: "Accesorios", price: 29990, img: Mousepad, href: "/detalle9" },
      { id: 10, title: "Polera Gamer Personalizada 'Level-Up'", category: "Merchandising", price: 14990, img: Polera, href: "/detalle10" }
    ],
    []
  );

  const [filter, setFilter] = useState("");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f || f === "all") return products;
    return products.filter(
      (p) => p.category.toLowerCase().includes(f) || p.title.toLowerCase().includes(f)
    );
  }, [filter, products]);

  return (
    <div className="container py-4">
      <header className="page-header mb-4">
        <h1>Catálogo de productos</h1>

        <div className="controls d-flex align-items-center gap-2">
          <label className="filter-label mb-0">
            Categoría:
            <input
              list="category-list"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Escribe para filtrar (ej. Accesorios)"
              className="form-control ms-2"
            />
            <datalist id="category-list">
              <option value="all">Todos</option>
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setFilter("")}
          >
            Limpiar
          </button>
        </div>
      </header>

      <section className="row g-3" aria-live="polite">
        {filtered.map((p) => (
          <article key={p.id} className="col-md-4">
            <div className="card card-dark h-100">
              <div className="product-image">
                <img
                // eslint-disbable-next-line no-undef
                  src={p.img || principal}
                  alt={p.title}
                  className="img-fluid"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    // eslint-disbable-next-line no-undef
                    e.currentTarget.src = principal;
                  }}
                />
              </div>
              <div className="p-3">
                <h3>{p.title}</h3>
                <p className="section-title">{p.category}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <p className="h5 mb-0">${p.price.toLocaleString()} CLP</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addToCart(p);
                      navigate('/Carrito');
                    }}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="col-12">
            <div className="card card-dark p-3">No se encontraron productos que coincidan.</div>
          </div>
        )}
      </section>

      <footer className="page-footer mt-4">
        <div>© {new Date().getFullYear()} Tienda Level Up</div>
      </footer>
    </div>
  );
}
