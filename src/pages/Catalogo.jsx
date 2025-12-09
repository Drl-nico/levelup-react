import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getAllProducts } from "../services/ProductService";
import "../styles/styles2.css";
import "../styles/catalogo.css";

import ps5Img from "../assets/ps5-producto.webp";

const principal = ps5Img;

export default function Catalogo() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();  // ✔ Ahora conectado al backend
        setProducts(data);
      } catch (err) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f || f === "all") return products;

    return products.filter(
      (p) =>
        p.category.toLowerCase().includes(f) ||
        p.title.toLowerCase().includes(f)
    );
  }, [filter, products]);

  if (loading) return <div className="container py-4">Cargando productos...</div>;
  if (error) return <div className="container py-4">Error: {error}</div>;

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
                  src={p.img || principal}
                  alt={p.title}
                  className="img-fluid"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
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
                      navigate("/Carrito");
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
            <div className="card card-dark p-3">
              No se encontraron productos que coincidan.
            </div>
          </div>
        )}
      </section>

      <footer className="page-footer mt-4">
        <div>© {new Date().getFullYear()} Tienda Level Up</div>
      </footer>
    </div>
  );
}
