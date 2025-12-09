import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/ProductService";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const data = await getAllProducts();
      setProductos(data);
    } catch (err) {
      console.error("Error cargando productos:", err);
    }
  };

  return (
    <div className="admin-page-root">
      <aside className="sidebar">
        <div className="top-section">
          <div className="logo mb-3">Company</div>
          <nav>
            <ul>
              <li onClick={() => navigate("/cliente")}>Clientes</li>
              <li className="active">Inventario</li>
              <li onClick={() => navigate("/Boleta")}>Boletas</li>
              <li>Empleados</li>
              <li>Customización</li>
            </ul>
          </nav>
        </div>
      </aside>

      <div className="main-content p-4">
        <h1>Inventario de Productos</h1>

        <div className="table-responsive bg-white p-3 shadow rounded">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
              </tr>
            </thead>

            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No hay productos registrados.
                  </td>
                </tr>
              ) : (
                productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>${p.price?.toLocaleString()} CLP</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
