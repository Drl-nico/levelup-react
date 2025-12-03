import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBoletas } from "../services/BoletaService";
import "../styles/admin.css";

export default function Boletas() {
  const navigate = useNavigate();
  const [boletas, setBoletas] = useState([]);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!current || current.role !== "admin") {
      navigate("/login", { replace: true });
      return;
    }

    loadBoletas();
  }, [navigate]);

  const loadBoletas = async () => {
    try {
      const data = await getBoletas();
      setBoletas(data);
    } catch (error) {
      console.error("Error obteniendo boletas", error);
    }
  };

  return (
    <div className="admin-page-root">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="top-section">
          <div className="logo mb-3">Company</div>
          <nav>
            <ul>
              <li onClick={() => navigate("/cliente")}>Clientes</li>
              <li onClick={() => navigate("/inventario")}>Inventario</li>
              <li onClick={() => navigate("/Boleta")}>Boletas</li>
              <li>Empleados</li>
              <li>Customización</li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-content p-4">
        <h1>Historial de Boletas</h1>

        <div className="content-bottom">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Items</th>
                </tr>
              </thead>

              <tbody>
                {boletas.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No hay boletas registradas.
                    </td>
                  </tr>
                ) : (
                  boletas.map((b) => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>{b.purchaseDate.replace("T", " • ")}</td>
                      <td>${b.total.toLocaleString()}</td>
                      <td>
                        <ul>
                          {b.items.map((item) => (
                            <li key={item.id}>
                              Producto: {item.productId} • Cant: {item.amount} •
                              Subtotal: ${item.subtotal.toLocaleString()}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
