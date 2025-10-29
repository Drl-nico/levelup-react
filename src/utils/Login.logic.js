window.LoginLogic = {


  validarCredenciales: function (email, password, usuariosGuardados) {
    if (!email || !password) {
      return { ok: false, mensaje: "Faltan datos." };
    }

    var usuarios = [];
    try {
      usuarios = JSON.parse(usuariosGuardados || "[]");
    } catch (err) {
      usuarios = [];
    }

    var encontrado = usuarios.find(function (u) {
      return u.email === email && u.password === password;
    });

    if (encontrado) {
      return { ok: true, role: "user", destino: "/", mensaje: "Usuario válido." };
    }

    // Fallback admin
    if (email === "Admin123@gmail.com" && password === "admin123") {
      return { ok: true, role: "admin", destino: "/administrador", mensaje: "Admin válido." };
    }

    // Si nada coincide
    return { ok: false, mensaje: "Usuario o contraseña incorrectos." };
  },


  guardarUsuarioSesion: function (email, role) {
    if (!email || !role) return false;
    try {
      localStorage.setItem("currentUser", JSON.stringify({ email: email, role: role }));
      return true;
    } catch (err) {
      return false;
    }
  },


  obtenerDestinoRedireccion: function (resultado) {
    if (!resultado || !resultado.ok) return null;
    return resultado.destino;
  }
};
