import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/diseno.css"; // Importa tu archivo de estilos
import "../styles/styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = () => {
    // Limpia mensajes previos
    setMensaje("");

    // Intentar validar contra usuarios guardados en localStorage
    let usuarios = [];
    try {
      usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    } catch (err) {
      usuarios = [];
    }

    const encontrado = usuarios.find((u) => u.email === email && u.password === password);

    if (encontrado) {
      // Redirige al inicio (SPA: usamos location para demo)
      window.location.href = "/";
      return;
    }

    // Fallback: credenciales administradoras hardcodeadas (mantener compatibilidad)
    const usuarioValido = "admin@gmail.com";
    const contrasenaValida = "123";
    if (email === usuarioValido && password === contrasenaValida) {
      window.location.href = "/";
      return;
    }

    setMensaje(
      '<div class="alert alert-danger">Usuario o contraseña incorrectos o datos faltantes.</div>'
    );
  };

  return (
    <div>
      {/* Barra de navegación */}
      <nav className="diseñobarraBusqueda">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="barradebusqueda" href="/">
            Level Up
          </a>
          <div>
            <a href="/">Home</a>
            <a href="#">Productos</a>
            <a href="#">Nosotros</a>
            <a href="#">Blogs</a>
            <a href="#">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Logo */}
      <div className="centrado-del-logo text-center my-4">
        <img
          src="/img/Level-up-Logo-Final_PNG-1.png"
          alt="logo empresa"
          className="logo mb-2"
        />
        <h2>
          <a href="/Administrador/Admin.html">Level-Up</a>
        </h2>
      </div>

      {/* Formulario */}
      <div className="container d-flex justify-content-center">
        <form className="formulariodiseñologin">
          <div className="form-body-custom">
            {/* Mensajes */}
            {mensaje && (
              <div
                id="mensajes"
                dangerouslySetInnerHTML={{ __html: mensaje }}
              ></div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-uppercase">
                correo
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-uppercase">
                contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
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
