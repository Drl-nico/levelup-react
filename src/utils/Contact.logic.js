window.contactLogic = {
  // Valida formato de email
  isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  },

  // Valida formato de teléfono (opcional)
  isPhone(v) {
    return !v || /^\+?\d{7,15}$/.test(v);
  },

  // Valida todos los campos del formulario (mismo comportamiento que el componente)
  validate(values) {
    const e = {};

    if (!values.name.trim()) e.name = "El nombre es obligatorio.";

    if (!values.email.trim()) {
      e.email = "El email es obligatorio.";
    } else if (!window.contactLogic.isEmail(values.email.trim())) {
      e.email = "Formato de email no válido.";
    }

    if (!window.contactLogic.isPhone(values.phone.trim())) {
      e.phone = "El teléfono debe tener 7 a 15 dígitos (opcional).";
    }

    if (!values.message.trim()) e.message = "El mensaje es obligatorio.";

    return e;
  },
};
