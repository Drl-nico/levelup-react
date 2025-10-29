describe('NavbarLogic', function () {

  describe('obtenerRutas()', function () {
    it('Debe devolver una lista de rutas', function () {
      var rutas = window.NavbarLogic.obtenerRutas();
      expect(Array.isArray(rutas)).toBeTrue();
      expect(rutas.length).toBeGreaterThan(0);
    });

    it('Cada ruta debe tener nombre y path', function () {
      var rutas = window.NavbarLogic.obtenerRutas();
      rutas.forEach(function (r) {
        expect(r.nombre).toBeDefined();
        expect(r.path).toBeDefined();
      });
    });

    it('Debe contener la ruta "/carrito"', function () {
      var rutas = window.NavbarLogic.obtenerRutas();
      var carrito = rutas.find(function (r) { return r.path === "/carrito"; });
      expect(carrito).toBeDefined();
    });
  });


  describe('buscarRutaPorNombre()', function () {
    it('Debe encontrar una ruta existente por nombre', function () {
      var ruta = window.NavbarLogic.buscarRutaPorNombre("Inicio");
      expect(ruta).not.toBeNull();
      expect(ruta.path).toBe("/");
    });

    it('Debe devolver null si el nombre no existe', function () {
      var ruta = window.NavbarLogic.buscarRutaPorNombre("Inexistente");
      expect(ruta).toBeNull();
    });

    it('Debe devolver null si el nombre es nulo', function () {
      var ruta = window.NavbarLogic.buscarRutaPorNombre(null);
      expect(ruta).toBeNull();
    });
  });

  describe('validarRuta()', function () {
    it('Debe devolver true para una ruta válida', function () {
      var esValida = window.NavbarLogic.validarRuta("/carrito");
      expect(esValida).toBeTrue();
    });

    it('Debe devolver false para una ruta inexistente', function () {
      var esValida = window.NavbarLogic.validarRuta("/noexiste");
      expect(esValida).toBeFalse();
    });

    it('Debe devolver false si el path es nulo', function () {
      var esValida = window.NavbarLogic.validarRuta(null);
      expect(esValida).toBeFalse();
    });
  });

});