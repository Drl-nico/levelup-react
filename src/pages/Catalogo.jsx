import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getAllProducts } from "../services/ProductService";
import "../styles/styles2.css";
import "../styles/catalogo.css";

// Imágenes locales (IMPORTANTE: todas las rutas correctas)
import ps5Img from "../assets/ps5-producto.webp";
import asusImg from "../assets/asus-removebg-preview.png";
import sillaImg from "../assets/silla_gamer-removebg-preview(3).png";
import CatanImg from "../assets/JM001-removebg-preview.png";
import AudifonosImg from "../assets/AC002-removebg-preview.png";
import ControlXboxImg from "../assets/AC001-removebg-preview.png";
import CarcassonneImg from "../assets/JM002-removebg-preview.png";
import MouseImg from "../assets/MS001-removebg-preview.png";
import MousepadImg from "../assets/MP001-removebg-preview.png";
import PoleraImg from "../assets/PP001-removebg-preview.png";

// Mapa título → imagen (las claves deben coincidir EXACTAMENTE con la BD)
const imageMap = {
  "Catan": CatanImg,
  "Carcassonne": CarcassonneImg,
  "Joystick Xbox Series X": ControlXboxImg,
  "Auriculares Gamer HyperX Cloud II": AudifonosImg,
  "Mouse Logitech G502 HERO": MouseImg,
  "Mousepad Razer Goliathus": MousepadImg,
  "PlayStation 5": ps5Img,
  "PC Gamer ASUS ROG Strix": asusImg,
  "Silla Gamer Secretlab Titan": sillaImg,
  "Polera Gamer Personalizada 'Level-Up'": PoleraImg,
};

export default function Catalogo() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Categorías sin duplicados
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || ""));
    return Array.from(set).filter(Boolean);
  }, [products]);

  // Filtro por categoría o título
  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f || f === "all") return products;

    return products.filter((p) => {
      const cat = (p.category || "").toLowerCase();
      const title = (p.title || "").toLowerCase();
      return cat.includes(f) || title.includes(f);
    });
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
        {filtered.map((p) => {
          // Imagen del producto:
          // NO usamos p.img porque no son URLs válidas aún
          const src = imageMap[p.title] || ps5Img;

          return (
            <article key={p.id} className="col-md-4">
              <div className="card card-dark h-100">
                <div className="product-image">
                  <img
                    src={src}
                    alt={p.title}
                    className="img-fluid"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = ps5Img;
                    }}
                  />
                </div>
                <div className="p-3">
                  <h3>{p.title}</h3>
                  <p className="section-title">{p.category}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="h5 mb-0">
                      ${p.price.toLocaleString()} CLP
                    </p>
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
          );
        })}

        {/* Sin coincidencias */}
        {!loading && !error && filtered.length === 0 && (
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
