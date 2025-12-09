import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/diseno.css";
import { useAuth } from "../context/AuthContext";

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

  const { register } = useAuth();

  const validarFormulario = async (e) => {
    e.preventDefault();

    const { nombre, email, edad, clave1, clave2, region, comuna } = form;
    const errores = [];

    if (nombre.trim() === "") errores.push("El nombre no puede estar vacío.");
    if (!email.includes("@")) errores.push("El correo no es válido.");
    if (!edad || edad <= 0) errores.push("Edad inválida.");
    if (!region) errores.push("Seleccione región.");
    if (!comuna) errores.push("Seleccione comuna.");
    if (clave1.length < 6) errores.push("Contraseña mínima 6 caracteres.");
    if (clave1 !== clave2) errores.push("Las contraseñas no coinciden.");

    if (errores.length > 0) {
      setMensajes(errores);
      return;
    }

    try {
      const result = await register({
        nombre,
        email,
        edad: parseInt(edad, 10),
        region,
        comuna,
        password: clave1,
        role: "user",
      });

      setSuccess(true);
      setMensajes([]);

      // if registration returned token and user, navigate to home automatically
      if (result && result.token) {
        setTimeout(() => navigate("/"), 800);
      } else {
        setTimeout(() => navigate("/login"), 800);
      }
    } catch (err) {
      console.error(err);
      setMensajes(["Error al registrar usuario."]);
    }
  };

  const cargarComunas = () => comunasPorRegion[form.region] || [];

  return (
    <div className="container d-flex justify-content-center py-5 login-form">
      <form className="formulariodiseñologin" onSubmit={validarFormulario}>
        <div className="form-body-custom p-4">
          <div id="mensajes">
            {mensajes.length > 0 && (
              <div className="alert alert-danger">
                <ul>{mensajes.map((m, i) => <li key={i}>{m}</li>)}</ul>
              </div>
            )}
            {success && (
              <div className="alert alert-success">✔ Registro exitoso</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input name="nombre" className="form-control" value={form.nombre} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Edad</label>
            <input name="edad" type="number" className="form-control" value={form.edad} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input name="clave1" type="password" className="form-control" value={form.clave1} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar contraseña</label>
            <input name="clave2" type="password" className="form-control" value={form.clave2} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Región</label>
            <select name="region" className="form-select" value={form.region} onChange={handleChange}>
              <option value="">Seleccione</option>
              {Object.keys(comunasPorRegion).map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Comuna</label>
            <select name="comuna" className="form-select" value={form.comuna} onChange={handleChange}>
              <option value="">Seleccione</option>
              {cargarComunas().map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <button className="btn BotonLogin w-100">Registrarse</button>
        </div>
      </form>
    </div>
  );
}
