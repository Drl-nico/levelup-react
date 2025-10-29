describe('RegistroLogic', function () {

  beforeEach(function () {
    localStorage.clear();
  });

  describe('cargarComunas()', function () {
    it('Debe devolver comunas de Región Metropolitana', function () {
      var comunas = window.RegistroLogic.cargarComunas("Región Metropolitana");
      expect(comunas).toContain("Santiago");
    });

    it('Debe devolver arreglo vacío para región inválida', function () {
      var comunas = window.RegistroLogic.cargarComunas("Región Fantasma");
      expect(comunas.length).toBe(0);
    });

    it('Debe devolver arreglo vacío si no se pasa región', function () {
      var comunas = window.RegistroLogic.cargarComunas(null);
      expect(comunas.length).toBe(0);
    });
  });

  describe('validarFormulario()', function () {
    var baseForm;

    beforeEach(function () {
      baseForm = {
        nombre: "Ana",
        email: "ana@test.com",
        edad: "28",
        clave1: "abcdef",
        clave2: "abcdef",
        region: "Región Metropolitana",
        comuna: "Santiago"
      };
    });

    it('Debe devolver arreglo vacío si todo es válido', function () {
      var errores = window.RegistroLogic.validarFormulario(baseForm, "[]");
      expect(errores.length).toBe(0);
    });

    it('Debe detectar error si falta el nombre', function () {
      baseForm.nombre = "";
      var errores = window.RegistroLogic.validarFormulario(baseForm, "[]");
      expect(errores).toContain("El nombre no puede estar vacío.");
    });

    it('Debe detectar contraseñas distintas', function () {
      baseForm.clave2 = "distinta";
      var errores = window.RegistroLogic.validarFormulario(baseForm, "[]");
      expect(errores).toContain("Las contraseñas no coinciden.");
    });

    it('Debe detectar duplicado de correo', function () {
      var usuarios = JSON.stringify([{ email: "ana@test.com" }]);
      var errores = window.RegistroLogic.validarFormulario(baseForm, usuarios);
      expect(errores).toContain("Ya existe un usuario registrado con ese correo.");
    });
  });
  describe('guardarUsuario()', function () {
    it('Debe guardar usuario en localStorage', function () {
      var form = {
        nombre: "Pedro",
        email: "pedro@test.com",
        edad: "25",
        region: "Región de Valparaíso",
        comuna: "Viña del Mar",
        clave1: "123456"
      };
      var exito = window.RegistroLogic.guardarUsuario(form);
      expect(exito).toBeTrue();
      var data = JSON.parse(localStorage.getItem("usuarios"));
      expect(data[0].email).toBe("pedro@test.com");
    });

    it('Debe manejar JSON inválido en localStorage sin error', function () {
      localStorage.setItem("usuarios", "INVALIDO");
      var form = {
        nombre: "Luis",
        email: "luis@test.com",
        edad: "33",
        region: "Región del Biobío",
        comuna: "Concepción",
        clave1: "abcdef"
      };
      var exito = window.RegistroLogic.guardarUsuario(form);
      expect(exito).toBeTrue();
    });

    it('Debe devolver false si el formulario es nulo', function () {
      var exito = window.RegistroLogic.guardarUsuario(null);
      expect(exito).toBeFalse();
    });
  });
});