import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { crearBoleta } from "../services/BoletaService";
import { getAllProducts } from "../services/ProductService";
import { getCurrentUser } from "../services/authService";
import '../utils/Carrito.logic.js';
import '../styles/carrito.css';

const Carrito = () => {
  const location = useLocation();
  const productoSeleccionado = location.state?.productoSeleccionado;

  const { cartItems, removeFromCart, cartTotal, addToCart } = useCart();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        console.log('Productos cargados desde backend:', data);
        setProductos(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Manejo del pago (creación de la boleta)
  const handlePagar = async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        alert("Debes iniciar sesión para realizar una compra");
        return;
      }

      const boleta = {
        userId: user.id,
        total: cartTotal,
        items: cartItems.map(item => ({
          productId: item.id,
          amount: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity
        }))
      };

      // Enviar la boleta al backend
      await crearBoleta(boleta);

      alert("Compra realizada con éxito 🎉");

      // Vaciar el carrito después de realizar la compra
      cartItems.forEach(item => removeFromCart(item.id));

    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || err.message || "Error desconocido";
      alert(`Error al procesar la compra: ${errorMessage}`);
    }
  };

  return (
    <div className="carrito-container">

      {/* Mostrar producto seleccionado desde Catálogo */}
      {productoSeleccionado && (
        <section className="producto-seleccionado">
          <h2>Producto seleccionado:</h2>
          <div className="producto-detalle">
            <img src={productoSeleccionado.img} alt={productoSeleccionado.title} />
            <h3>{productoSeleccionado.title}</h3>
            <p>Categoría: {productoSeleccionado.category}</p>
            <p>Precio: ${productoSeleccionado.price.toLocaleString()} CLP</p>

            <button
              onClick={() => addToCart({
                id: productoSeleccionado.id,
                title: productoSeleccionado.title,
                price: productoSeleccionado.price,
                img: productoSeleccionado.img,
                category: productoSeleccionado.category
              })}
              className="btn-agregar"
            >
              🛒 Agregar al carrito
            </button>
          </div>
        </section>
      )}

      {/* Lista de productos disponibles */}
      <section className="productos" id="product-list">
        <h2>Productos Disponibles</h2>

        {loading ? (
          <p className="loading">Cargando productos...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : productos.length === 0 ? (
          <p className="no-productos">No hay productos disponibles</p>
        ) : (
          <div className="productos-grid">
            {productos.map((p) => (
              <article key={p.codigo || p.id} className="producto">
                <img src={p.img || p.imagen} alt={p.nombre || p.title} />
                <h3>{p.nombre || p.title}</h3>
                <p className="precio">${(p.precio || p.price).toLocaleString()} CLP</p>
                <p className="descripcion">{p.descripcion || p.description}</p>
                <div className="producto-botones">
                  <button
                    onClick={() => addToCart({
                      id: p.codigo || p.id,
                      title: p.nombre || p.title,
                      price: p.precio || p.price,
                      img: p.img || p.imagen,
                      category: p.descripcion || p.description
                    })}
                    className="btn-agregar"
                  >
                    🛒 Agregar al carrito
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Carrito actual */}
      <aside className="carrito-actual">
        <h2>Tu Carrito</h2>

        <div id="cart-list">
          {cartItems.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="carrito-item">
                <div className="item-info">
                  <span className="item-nombre">{item.title}</span>
                  <span className="item-cantidad">x{item.quantity}</span>
                </div>

                <div className="item-precio-acciones">
                  <span className="item-precio">
                    ${(item.price * item.quantity).toLocaleString()} CLP
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn-eliminar"
                    title="Eliminar del carrito"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <div id="cart-total">
              Total: ${cartTotal.toLocaleString()} CLP
            </div>

            <div className="carrito-acciones">
              <button
                onClick={() => cartItems.forEach(item => removeFromCart(item.id))}
                className="btn-vaciar"
              >
                Vaciar Carrito
              </button>

              <button
                className="btn-pagar"
                onClick={handlePagar}
              >
                Proceder al pago
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default Carrito;
