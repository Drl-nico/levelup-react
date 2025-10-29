import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../utils/Carrito.logic.js';
import '../styles/carrito.css';

const productosIniciales = [
  { codigo: "JM001", nombre: "Catan", precio: 29990, descripcion: "Juego de mesa clásico.", img: "img/Sebas/JM001" },
  { codigo: "JM002", nombre: "Carcassonne", precio: 24990, descripcion: "Juego de losetas con meeples.", img: "img/URL_AQUI.jpg" },
  { codigo: "AC001", nombre: "Joystick Xbox Series X", precio: 59990, descripcion: "Control inalámbrico para Xbox.", img: "img/URL_AQUI.jpg" },
  { codigo: "AC002", nombre: "Auriculares Gamer HyperX Cloud II", precio: 79990, descripcion: "Auriculares gaming con micrófono.", img: "img/URL_AQUI.jpg" },
  { codigo: "CO001", nombre: "PlayStation 5", precio: 549990, descripcion: "Consola de última generación.", img: "img/URL_AQUI.jpg" },
  { codigo: "CG001", nombre: "PC Gamer ASUS ROG Strix", precio: 1299990, descripcion: "Computadora gamer potente.", img: "img/URL_AQUI.jpg" },
  { codigo: "SG001", nombre: "Silla Gamer Secretlab Titan", precio: 349990, descripcion: "Silla ergonómica para gamers.", img: "img/URL_AQUI.jpg" },
  { codigo: "MS001", nombre: "Mouse Logitech G502 HERO", precio: 49990, descripcion: "Mouse gaming de alta precisión.", img: "img/URL_AQUI.jpg" },
  { codigo: "MP001", nombre: "Mousepad Razer Goliathus", precio: 29990, descripcion: "Mousepad RGB extendido.", img: "img/URL_AQUI.jpg" },
  { codigo: "PP001", nombre: "Polera Gamer Personalizada 'Level-Up'", precio: 14990, descripcion: "Polera personalizada para gamers.", img: "img/URL_AQUI.jpg" }
];

const Carrito = () => {
  const location = useLocation();
  const productoSeleccionado = location.state?.productoSeleccionado;

  const { cartItems, removeFromCart, updateQuantity, cartTotal, addToCart } = useCart();

  const [productos, setProductos] = useState(() => {
    const savedProducts = localStorage.getItem("productosAdmin");
    return savedProducts ? JSON.parse(savedProducts) : productosIniciales;
  });



  return (
    <div className="carrito-container">
      
      {/* Mostrar producto seleccionado desde Catalogo */}
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
        <div className="productos-grid">
          {productos.map((p, i) => (
            <article key={p.codigo} className="producto">
              <img src={p.img} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p className="precio">${p.precio.toLocaleString()} CLP</p>
              <p className="descripcion">{p.descripcion}</p>
              <div className="producto-botones">
                <button
                  onClick={() => addToCart({
                    id: p.codigo,
                    title: p.nombre,
                    price: p.precio,
                    img: p.img,
                    category: p.descripcion
                  })}
                  className="btn-agregar"
                >
                  🛒 Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Carrito actual */}
      <aside className="carrito-actual">
        <h2>Tu Carrito</h2>
        <div id="cart-list">
          {cartItems.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          ) : (
            cartItems.map((item, i) => (
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
                onClick={() => {
                  cartItems.forEach(item => removeFromCart(item.id));
                }}
                className="btn-vaciar"
              >
                Vaciar Carrito
              </button>
              <button
                className="btn-pagar"
                onClick={() => alert('¡Gracias por tu compra!')}
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
