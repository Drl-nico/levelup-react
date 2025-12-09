import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/diseno.css";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const { login } = useAuth();

  const iniciarSesion = async () => {
    setMensaje("");

    try {
      const result = await login(email, password);

      if (!result || !result.token) {
        setMensaje(
          `<div class="alert alert-danger">Usuario o contraseña incorrectos.</div>`
        );
        return;
      }

      const storedUser = result.user || JSON.parse(localStorage.getItem("user") || "null");
      if (storedUser && (storedUser.role === "admin" || storedUser.role === "ADMIN")) {
        window.location.href = "/administrador";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      setMensaje(
        `<div class="alert alert-danger">Error en el servidor. Intente nuevamente.</div>`
      );
    }
  };

  return (
    <div className="login-form">
      <nav className="diseñobarraBusqueda">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="barradebusqueda" href="/"> Level Up </a>
          <div>
            <a href="/">Home</a>
            <a>Productos</a>
            <a>Blogs</a>
            <a>Contacto</a>
          </div>
        </div>
      </nav>

      <div className="centrado-del-logo text-center my-4">
        <img src="/img/Level-up-Logo-Final_PNG-1.png" alt="logo" />
        <h2><a href="/">Level-Up</a></h2>
      </div>

      <div className="container d-flex justify-content-center">
        <form className="formulariodiseñologin">
          <div className="form-body-custom">
            {mensaje && (
              <div dangerouslySetInnerHTML={{ __html: mensaje }}></div>
            )}

            <div className="mb-3">
              <label className="form-label text-uppercase">Correo</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-uppercase">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn BotonLogin me-2"
                onClick={iniciarSesion}
              >
                Iniciar sesión
              </button>

              <a href="/registro" className="btn btn-register">
                Registrarse
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
