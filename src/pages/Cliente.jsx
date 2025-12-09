import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../services/UserService";
import "../styles/admin.css";

export default function Cliente() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Cargar usuarios desde el backend real
  const cargarUsuarios = async () => {
    try {
      const data = await getAllUsers();
      setUsuarios(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al cargar usuarios desde el servidor.");
    }
  };

  // Eliminar usuario
  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await deleteUser(id);
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el usuario.");
    }
  };

  return (
    <div className="admin-page-root">
      <aside className="sidebar">
        <div className="top-section">
          <div className="logo mb-3">Company</div>
          <nav>
            <ul>
              <li className="active">Clientes</li>
              <li onClick={() => navigate("/inventario")}>Inventario</li>
              <li onClick={() => navigate("/Boleta")}>Boletas</li>
              <li>Empleados</li>
              <li>Customización</li>
            </ul>
          </nav>
        </div>
      </aside>

      <div className="main-content p-4">
        <header className="d-flex align-items-center justify-content-between">
          <h1>Usuarios Registrados</h1>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/nuevo-cliente")}
          >
            Crear Usuario
          </button>
        </header>

        <main className="mt-4">
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <div className="table-responsive">
            <table className="table table-dark table-striped">
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
                    <td colSpan="6" className="text-center">
                      No hay usuarios registrados.
                    </td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr key={u.id}>
                      <td>{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>{u.edad}</td>
                      <td>{u.region}</td>
                      <td>{u.comuna}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarUsuario(u.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
