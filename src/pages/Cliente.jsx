import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function Cliente() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Verificar que el usuario actual sea admin
    let current = null;
    try {
      current = JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch (err) {
      current = null;
    }

    if (!current || current.role !== "admin") {
      // Si no es admin, redirigir a login
      navigate("/login", { replace: true });
      return;
    }

    // Cargar usuarios desde localStorage (guardados por Registro.jsx)
    let us = [];
    try {
      us = JSON.parse(localStorage.getItem("usuarios") || "[]");
    } catch (err) {
      us = [];
    }
    setUsuarios(us);
  }, [navigate]);

  return (
    <div className="admin-page-root">
      <aside className="sidebar">
        <div className="top-section">
          <div className="logo mb-3">Company</div>
          <nav>
            <ul>
              <li>Clientes</li>
              <li>Inventario</li>
              <li>Reportes</li>
              <li>Empleados</li>
              <li>Customisacion</li>
            </ul>
          </nav>
        </div>
      </aside>

      <div className="main-content">
        <header className="d-flex align-items-center">
          <h1>Usuarios</h1>
        </header>

        <main>
          <section className="content-bottom">
            <div className="table-responsive">
              <table className="table table-striped" id="usuariosTable">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Edad</th>
                    <th>Región</th>
                    <th>Comuna</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No hay usuarios registrados.
                      </td>
                    </tr>
                  ) : (
                    usuarios.map((u, idx) => (
                      <tr key={idx}>
                        <td>{u.nombre || u.name || "-"}</td>
                        <td>{u.email || "-"}</td>
                        <td>{u.edad || u.age || "-"}</td>
                        <td>{u.region || "-"}</td>
                        <td>{u.comuna || "-"}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() => {
                              if (!window.confirm(`¿Eliminar usuario ${u.email}?`)) return;
                              // eliminar usuario por email
                              const nuevos = usuarios.filter((x) => x.email !== u.email);
                              try {
                                localStorage.setItem("usuarios", JSON.stringify(nuevos));
                              } catch (err) {
                                console.error("No se pudo actualizar localStorage", err);
                              }
                              setUsuarios(nuevos);
                            }}
                          >
                            Eliminar
                          </button>
                          {/* future: editar */}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center gap-2 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/administrador")}
              >
                Volver
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/nuevo-cliente")}
              >
                Crear Usuario
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
