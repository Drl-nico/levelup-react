import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/UserService";
import "../styles/admin.css";

export default function NuevoCliente() {
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

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!current || current.role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMensajes([]);
    setSuccess(false);
  };

  const validarFormulario = async (e) => {
    e.preventDefault();
    const errores = [];
    const { nombre, email, edad, clave1, clave2, region, comuna } = form;

    if (!nombre.trim()) errores.push("El nombre no puede estar vacío.");
    if (!email.includes("@")) errores.push("El correo electrónico no es válido.");
    if (!edad || edad <= 0) errores.push("Ingrese una edad válida.");
    if (!region) errores.push("Debe seleccionar una región.");
    if (!comuna) errores.push("Debe seleccionar una comuna.");
    if (clave1.length < 6) errores.push("La contraseña debe tener al menos 6 caracteres.");
    if (clave1 !== clave2) errores.push("Las contraseñas no coinciden.");

    if (errores.length > 0) {
      setMensajes(errores);
      setSuccess(false);
      return;
    }

    const usuario = {
      nombre,
      email,
      edad: parseInt(edad, 10),
      region,
      comuna,
      password: clave1,
      role: "user",
    };

    try {
      await registerUser(usuario);
      setSuccess(true);
      setForm({
        nombre: "",
        email: "",
        edad: "",
        clave1: "",
        clave2: "",
        region: "",
        comuna: "",
      });

      setTimeout(() => navigate("/cliente"), 800);
    } catch (err) {
      setMensajes(["Error al registrar usuario en el servidor"]);
    }
  };

  const cargarComunas = () => comunasPorRegion[form.region] || [];

  return (
    <div className="admin-page-root">
      <aside className="sidebar">
        <div className="top-section">
          <div className="logo mb-3">Company</div>
          <nav>
            <ul>
              <li onClick={() => navigate("/cliente")}>Clientes</li>
              <li>Inventario</li>
              <li>Reportes</li>
              <li>Empleados</li>
              <li>Customización</li>
            </ul>
          </nav>
        </div>
      </aside>

      <div className="main-content p-4">
        <h1>Registrar Nuevo Usuario</h1>

        <form onSubmit={validarFormulario} className="p-3 bg-white shadow rounded" style={{ maxWidth: "700px" }}>
          {mensajes.length > 0 && (
            <div className="alert alert-danger">
              <ul>{mensajes.map((m, i) => <li key={i}>{m}</li>)}</ul>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              Usuario registrado con éxito 
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Edad</label>
            <input name="edad" type="number" value={form.edad} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input name="clave1" type="password" value={form.clave1} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar contraseña</label>
            <input name="clave2" type="password" value={form.clave2} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Región</label>
            <select name="region" value={form.region} onChange={handleChange} className="form-select">
              <option value="">Seleccione una región</option>
              {Object.keys(comunasPorRegion).map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Comuna</label>
            <select name="comuna" value={form.comuna} onChange={handleChange} className="form-select">
              <option value="">Seleccione una comuna</option>
              {cargarComunas().map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
      </div>
    </div>
  );
}
