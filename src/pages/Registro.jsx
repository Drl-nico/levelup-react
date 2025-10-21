import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/diseno.css";

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    edad: "",
    clave1: "",
    clave2: "",
    region: "",
    comuna: "",
  });

  const [mensajes, setMensajes] = useState([]);
  const [success, setSuccess] = useState(false);

  const comunasPorRegion = {
    "Región Metropolitana": ["Santiago", "Las Condes", "Providencia", "La Florida"],
    "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Región del Biobío": ["Concepción", "Talcahuano", "Chiguayante"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validarFormulario = (e) => {
    e && e.preventDefault();
    const errores = [];

    const nombre = form.nombre.trim();
    const email = form.email.trim();
    const edad = parseInt(form.edad, 10);
    const clave1 = form.clave1;
    const clave2 = form.clave2;
    const region = form.region;
    const comuna = form.comuna;

    if (nombre === "") errores.push("El nombre no puede estar vacío.");
    if (!email.includes("@")) errores.push("El correo electrónico no es válido.");
    if (isNaN(edad) || edad <= 0) errores.push("Ingrese una edad válida.");
    if (region === "") errores.push("Debe seleccionar una región.");
    if (comuna === "") errores.push("Debe seleccionar una comuna.");
    if (clave1.length < 6) errores.push("La contraseña debe tener al menos 6 caracteres.");
    if (clave1 !== clave2) errores.push("Las contraseñas no coinciden.");

    // Verificar duplicados en localStorage (por email)
    let usuarios = [];
    try {
      usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    } catch (err) {
      usuarios = [];
    }
    const existe = usuarios.some((u) => u.email === email);
    if (existe) {
      errores.push("Ya existe un usuario registrado con ese correo.");
    }

    if (errores.length > 0) {
      setMensajes(errores);
      setSuccess(false);
      return;
    }

  // Guardar nuevo usuario en localStorage (sin hashing; solo demo)
  const nuevo = { nombre, email, edad, region, comuna, password: clave1, createdAt: Date.now() };
    usuarios.push(nuevo);
    try {
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    } catch (err) {
      // si falla el storage, mostrar error
      setMensajes(["No se pudo guardar el usuario en el almacenamiento local."]);
      setSuccess(false);
      return;
    }

    setMensajes([]);
    setSuccess(true);

    // Redirigir al inicio después de un pequeño delay para mostrar el mensaje
    setTimeout(() => navigate("/"), 800);
  };

  const cargarComunas = () => {
    return comunasPorRegion[form.region] || [];
  };

  return (
    <div className="container d-flex justify-content-center py-5">
      <form className="formulariodiseñologin" onSubmit={validarFormulario}>
        <div className="form-body-custom p-4">
          <div id="mensajes">
            {mensajes.length > 0 && (
              <div className="alert alert-danger">
                <ul>
                  {mensajes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
            {success && <div className="alert alert-success">✅ Registro exitoso</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="nombre" className="form-label text-uppercase">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-uppercase">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Correo electrónico"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="edad" className="form-label text-uppercase">
              Edad
            </label>
            <input
              id="edad"
              name="edad"
              type="number"
              value={form.edad}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="clave1" className="form-label text-uppercase">
              Contraseña
            </label>
            <input
              id="clave1"
              name="clave1"
              type="password"
              value={form.clave1}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="clave2" className="form-label text-uppercase">
              Confirmar contraseña
            </label>
            <input
              id="clave2"
              name="clave2"
              type="password"
              value={form.clave2}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="region" className="form-label text-uppercase">
              Región
            </label>
            <select
              id="region"
              name="region"
              className="form-select"
              value={form.region}
              onChange={handleChange}
            >
              <option value="">Seleccione una región</option>
              {Object.keys(comunasPorRegion).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="comuna" className="form-label text-uppercase">
              Comuna
            </label>
            <select
              id="comuna"
              name="comuna"
              className="form-select"
              value={form.comuna}
              onChange={handleChange}
            >
              <option value="">Seleccione una comuna</option>
              {cargarComunas().map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="center-button d-flex gap-2">
            <button type="submit" className="btn BotonLogin">
              Registrarse
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
