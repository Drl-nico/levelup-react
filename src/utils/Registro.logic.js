window.RegistroLogic = {
  comunasPorRegion: {
    "Región Metropolitana": ["Santiago", "Las Condes", "Providencia", "La Florida"],
    "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Región del Biobío": ["Concepción", "Talcahuano", "Chiguayante"],
  },


  cargarComunas: function (region) {
    if (!region || !window.RegistroLogic.comunasPorRegion[region]) return [];
    return window.RegistroLogic.comunasPorRegion[region];
  },


  validarFormulario: function (form, usuariosGuardados) {
    var errores = [];
    if (!form) return ["Formulario no definido."];

    var nombre = (form.nombre || "").trim();
    var email = (form.email || "").trim();
    var edad = parseInt(form.edad, 10);
    var clave1 = form.clave1 || "";
    var clave2 = form.clave2 || "";
    var region = form.region || "";
    var comuna = form.comuna || "";

    if (nombre === "") errores.push("El nombre no puede estar vacío.");
    if (!email.includes("@")) errores.push("El correo electrónico no es válido.");
    if (isNaN(edad) || edad <= 0) errores.push("Ingrese una edad válida.");
    if (region === "") errores.push("Debe seleccionar una región.");
    if (comuna === "") errores.push("Debe seleccionar una comuna.");
    if (clave1.length < 6) errores.push("La contraseña debe tener al menos 6 caracteres.");
    if (clave1 !== clave2) errores.push("Las contraseñas no coinciden.");

    // Verificar duplicados (por email)
    var usuarios = [];
    try {
      usuarios = JSON.parse(usuariosGuardados || "[]");
    } catch (err) {
      usuarios = [];
    }
    var existe = usuarios.some(function (u) {
      return u.email === email;
    });
    if (existe) {
      errores.push("Ya existe un usuario registrado con ese correo.");
    }

    return errores;
  },


  guardarUsuario: function (form) {
    if (!form) return false;
    var usuarios = [];
    try {
      usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    } catch (e) {
      usuarios = [];
    }

    var nuevo = {
      nombre: form.nombre,
      email: form.email,
      edad: parseInt(form.edad, 10),
      region: form.region,
      comuna: form.comuna,
      password: form.clave1,
      createdAt: Date.now()
    };

    usuarios.push(nuevo);
    try {
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      return true;
    } catch (err) {
      return false;
    }
  }
};