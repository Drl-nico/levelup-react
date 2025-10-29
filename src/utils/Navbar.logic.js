window.NavbarLogic = {

  obtenerRutas: function () {
    return [
      { nombre: "Inicio", path: "/" },
      { nombre: "Catálogo", path: "/catalogo" },
      { nombre: "Contacto", path: "/Contact" },
      { nombre: "Blogs", path: "/Blog" },
      { nombre: "Carrito", path: "/carrito" },
      { nombre: "Inicio de sesión", path: "/login" },
      { nombre: "Registrarse", path: "/registro" }
    ];
  },


  buscarRutaPorNombre: function (nombre) {
    if (!nombre) return null;
    var rutas = window.NavbarLogic.obtenerRutas();
    return rutas.find(function (r) {
      return r.nombre.toLowerCase() === nombre.toLowerCase();
    }) || null;
  },


  validarRuta: function (path) {
    if (!path) return false;
    var rutas = window.NavbarLogic.obtenerRutas();
    return rutas.some(function (r) {
      return r.path === path;
    });
  }

};