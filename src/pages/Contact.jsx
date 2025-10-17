// Importamos el hook useState para manejar estado local dentro del componente
import { useState } from "react";

// Componente funcional Contact
export default function Contact() {

  // values → guarda lo que el usuario escribe en cada input
  // errors → guarda mensajes de error por campo
  // sent → indica si el formulario se envió exitosamente
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  // Maneja el cambio de cada input (onChange)
  const onChange = (e) => {
    // Actualiza el campo correspondiente manteniendo el resto igual
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));

    // Limpia el error de ese campo si lo había
    setErrors(err => ({ ...err, [e.target.name]: "" }));

    // Si se vuelve a editar después de enviar, oculta el mensaje de éxito
    setSent(false);
  };

  // Función auxiliar para validar emails usando expresión regular
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  // Función auxiliar para validar teléfonos (opcional)
  // Acepta vacío o + y 7 a 15 dígitos
  const isPhone = (v) => !v || /^\+?\d{7,15}$/.test(v);

  // Valida todos los campos del formulario
  const validate = () => {
    const e = {}; // objeto temporal de errores

    // Nombre obligatorio
    if (!values.name.trim()) e.name = "El nombre es obligatorio.";

    // Email obligatorio y con formato válido
    if (!values.email.trim()) {
      e.email = "El email es obligatorio.";
    } else if (!isEmail(values.email.trim())) {
      e.email = "Formato de email no válido.";
    }

    // Teléfono opcional, pero si está presente debe cumplir patrón
    if (!isPhone(values.phone.trim())) {
      e.phone = "El teléfono debe tener 7 a 15 dígitos (opcional).";
    }

    // Mensaje obligatorio
    if (!values.message.trim()) e.message = "El mensaje es obligatorio.";

    return e; // devuelve los errores encontrados
  };

  // Maneja el envío del formulario
  const onSubmit = (e) => {
    e.preventDefault(); // evita que el navegador recargue la página

    const eobj = validate(); // validamos los campos
    setErrors(eobj);         // guardamos los errores en el estado

    // Si hay errores (el objeto no está vacío), detenemos el envío
    if (Object.keys(eobj).length) return;

    // Si no hay errores → se "envían" los datos (ej. backend)
    console.log("Datos validados:", values);

    // Mostramos mensaje de éxito
    setSent(true);

    // Limpiamos el formulario
    setValues({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="container my-5" style={{maxWidth: 560}}>
      <h1>Contacto</h1>

      {/* noValidate desactiva la validación nativa del navegador */}
      <form onSubmit={onSubmit} noValidate>

        {/* Campo Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            name="name"
            value={values.name}
            onChange={onChange}
          />
          {/* Si existe error.name → se muestra debajo del input */}
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        {/* Campo Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        {/* Campo Teléfono (opcional) */}
        <div className="mb-3">
          <label className="form-label">Teléfono (opcional)</label>
          <input
            className="form-control"
            type="tel"
            name="phone"
            value={values.phone}
            onChange={onChange}
            placeholder="+56912345678"
          />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>

        {/* Campo Mensaje */}
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea
            className="form-control"
            rows="4"
            name="message"
            value={values.message}
            onChange={onChange}
          />
          {errors.message && <div className="text-danger">{errors.message}</div>}
        </div>

        {/* Botón de envío */}
        <button className="btn btn-primary" type="submit">Enviar</button>

        {/* Mensaje de éxito (visible solo cuando sent === true) */}
        {sent && <div className="text-success mt-2">¡Formulario enviado correctamente!</div>}
      </form>
    </section>
  );
}
