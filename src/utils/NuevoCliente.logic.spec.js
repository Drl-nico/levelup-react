describe('NuevoClienteLogic', function () {


  describe('cargarComunas()', function () {
    it('Debe devolver comunas de la Región Metropolitana', function () {
      var comunas = window.NuevoClienteLogic.cargarComunas("Región Metropolitana");
      expect(comunas).toContain("Santiago");
    });

    it('Debe devolver arreglo vacío si la región no existe', function () {
      var comunas = window.NuevoClienteLogic.cargarComunas("Región Fantasma");
      expect(comunas.length).toBe(0);
    });

    it('Debe devolver arreglo vacío si no se pasa región', function () {
      var comunas = window.NuevoClienteLogic.cargarComunas(null);
      expect(comunas.length).toBe(0);
    });
  });


  describe('validarFormulario()', function () {
    var baseForm;

    beforeEach(function () {
      baseForm = {
        nombre: "Juan",
        email: "juan@test.com",
        edad: "25",
        clave1: "123456",
        clave2: "123456",
        region: "Región Metropolitana",
        comuna: "Santiago"
      };
    });

    it('Debe devolver arreglo vacío si todo es válido', function () {
      var errores = window.NuevoClienteLogic.validarFormulario(baseForm);
      expect(errores.length).toBe(0);
    });

    it('Debe detectar error si falta el nombre', function () {
      baseForm.nombre = "";
      var errores = window.NuevoClienteLogic.validarFormulario(baseForm);
      expect(errores).toContain("El nombre no puede estar vacío.");
    });

    it('Debe detectar contraseñas diferentes', function () {
      baseForm.clave2 = "otra";
      var errores = window.NuevoClienteLogic.validarFormulario(baseForm);
      expect(errores).toContain("Las contraseñas no coinciden.");
    });
  });


  describe('guardarUsuario()', function () {
    beforeEach(function () {
      localStorage.clear();
    });

    it('Debe guardar un usuario en localStorage', function () {
      var form = {
        nombre: "Pedro",
        email: "pedro@test.com",
        edad: "30",
        region: "Región del Biobío",
        comuna: "Concepción",
        clave1: "123456"
      };
      var exito = window.NuevoClienteLogic.guardarUsuario(form);
      expect(exito).toBeTrue();
      var usuarios = JSON.parse(localStorage.getItem("usuarios"));
      expect(usuarios.length).toBe(1);
    });

    it('Debe manejar JSON corrupto en localStorage sin error', function () {
      localStorage.setItem("usuarios", "INVALIDO");
      var form = {
        nombre: "Luis",
        email: "luis@test.com",
        edad: "22",
        region: "Región de Valparaíso",
        comuna: "Viña del Mar",
        clave1: "abcdef"
      };
      var exito = window.NuevoClienteLogic.guardarUsuario(form);
      expect(exito).toBeTrue();
    });

    it('Debe devolver false si el form es nulo', function () {
      var exito = window.NuevoClienteLogic.guardarUsuario(null);
      expect(exito).toBeFalse();
    });
  });
});