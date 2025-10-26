import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    // Protege la página: solo admin puede acceder
    let current = null;
    try {
      current = JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch (err) {
      current = null;
    }
    if (!current || current.role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    // Cuando cambia la región, actualizar comunas si es necesario.
    if (form.region && !comunasPorRegion[form.region]?.includes(form.comuna)) {
      setForm((f) => ({ ...f, comuna: "" }));
    }
  }, [form.region]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMensajes([]);
    setSuccess(false);
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

    if (errores.length > 0) {
      setMensajes(errores);
      setSuccess(false);
      return;
    }

    // Guardar nuevo usuario en localStorage
    let usuarios = [];
    try {
      usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    } catch (err) {
      usuarios = [];
    }

    usuarios.push({
      nombre,
      email,
      edad,
      region,
      comuna,
      password: clave1,
      createdAt: Date.now(),
    });

    try {
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    } catch (err) {
      setMensajes(["No se pudo guardar el usuario en el almacenamiento local."]);
      setSuccess(false);
      return;
    }

    setMensajes([]);
    setSuccess(true);

    // Volver a la lista de clientes después de un delay
    setTimeout(() => navigate("/cliente"), 800);
  };

  const cargarComunas = () => {
    return comunasPorRegion[form.region] || [];
  };

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
        <header className="d-flex align-items-center justify-content-between">
          <h1>Nuevos Usuarios</h1>
        </header>

        <main className="p-3">
          <form onSubmit={validarFormulario} className="p-2">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label text-uppercase">nombre completo</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} type="text" className="form-control" id="nombre" placeholder="Nombre completo" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-uppercase">correo</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" className="form-control" id="email" placeholder="Correo electrónico" />
            </div>

            <div className="mb-3">
              <label htmlFor="edad" className="form-label text-uppercase">edad</label>
              <input name="edad" value={form.edad} onChange={handleChange} type="number" className="form-control" id="edad" placeholder="Edad" />
            </div>

            <div className="mb-3">
              <label htmlFor="clave1" className="form-label text-uppercase">contraseña</label>
              <input name="clave1" value={form.clave1} onChange={handleChange} type="password" className="form-control" id="clave1" placeholder="Contraseña" />
            </div>

            <div className="mb-3">
              <label htmlFor="clave2" className="form-label text-uppercase">confirmar contraseña</label>
              <input name="clave2" value={form.clave2} onChange={handleChange} type="password" className="form-control" id="clave2" placeholder="Confirmar contraseña" />
            </div>

            <div className="mb-3">
              <label htmlFor="region" className="form-label text-uppercase">Región</label>
              <select name="region" id="region" value={form.region} onChange={handleChange} className="form-select">
                <option value="">Seleccione una región</option>
                {Object.keys(comunasPorRegion).map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="comuna" className="form-label text-uppercase">Comuna</label>
              <select name="comuna" id="comuna" value={form.comuna} onChange={handleChange} className="form-select">
                <option value="">Seleccione una comuna</option>
                {cargarComunas().map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div id="mensajes">
              {mensajes.length > 0 && (
                <div className="alert alert-danger"><ul>{mensajes.map((m,i)=>(<li key={i}>{m}</li>))}</ul></div>
              )}
              {success && <div className="alert alert-success">✅ Registro exitoso</div>}
            </div>

            <div className="mt-2">
              <button type="submit" className="btn btn-primary">Registrar</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
