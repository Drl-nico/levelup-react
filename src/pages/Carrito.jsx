import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [productos, setProductos] = useState(() => {
    const savedProducts = localStorage.getItem("productosAdmin");
    return savedProducts ? JSON.parse(savedProducts) : productosIniciales;
  });

  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (indice) => {
    const producto = productos[indice];
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.codigo === producto.codigo);
      if (existe) {
        return prevCarrito.map(item =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (indice) => {
    setCarrito(prevCarrito => prevCarrito.filter((_, i) => i !== indice));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  return (
    <div className="carrito-container">
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
                <Link to={`/detalle/${i}`} className="btn-detalle">
                  <button>Ver detalle</button>
                </Link>
                <button 
                  onClick={() => agregarAlCarrito(i)}
                  className="btn-agregar"
                >
                  🛒 Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="carrito-actual">
        <h2>Tu Carrito</h2>
        <div id="cart-list">
          {carrito.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          ) : (
            carrito.map((item, i) => (
              <div key={item.codigo} className="carrito-item">
                <div className="item-info">
                  <span className="item-nombre">{item.nombre}</span>
                  <span className="item-cantidad">x{item.cantidad}</span>
                </div>
                <div className="item-precio-acciones">
                  <span className="item-precio">
                    ${(item.precio * item.cantidad).toLocaleString()} CLP
                  </span>
                  <button 
                    onClick={() => eliminarDelCarrito(i)}
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
        {carrito.length > 0 && (
          <>
            <div id="cart-total">
              Total: ${calcularTotal().toLocaleString()} CLP
            </div>
            <div className="carrito-acciones">
              <button 
                onClick={vaciarCarrito}
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
