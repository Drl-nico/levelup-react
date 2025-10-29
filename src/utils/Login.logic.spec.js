describe('LoginLogic', function () {

  beforeEach(function () {
    localStorage.clear();
  });


  describe('validarCredenciales()', function () {
    it('Debe devolver error si faltan datos', function () {
      var result = window.LoginLogic.validarCredenciales("", "", "[]");
      expect(result.ok).toBeFalse();
      expect(result.mensaje).toContain("Faltan");
    });

    it('Debe validar un usuario existente en localStorage', function () {
      var usuarios = JSON.stringify([{ email: "test@test.com", password: "1234" }]);
      var result = window.LoginLogic.validarCredenciales("test@test.com", "1234", usuarios);
      expect(result.ok).toBeTrue();
      expect(result.role).toBe("user");
      expect(result.destino).toBe("/");
    });

    it('Debe validar usuario admin hardcodeado', function () {
      var result = window.LoginLogic.validarCredenciales("Admin123@gmail.com", "admin123", "[]");
      expect(result.ok).toBeTrue();
      expect(result.role).toBe("admin");
      expect(result.destino).toBe("/administrador");
    });

    it('Debe devolver error para credenciales incorrectas', function () {
      var usuarios = JSON.stringify([{ email: "x@test.com", password: "pass" }]);
      var result = window.LoginLogic.validarCredenciales("otro@test.com", "pass", usuarios);
      expect(result.ok).toBeFalse();
      expect(result.mensaje).toContain("incorrectos");
    });

    it('Debe manejar JSON inválido sin romper', function () {
      var result = window.LoginLogic.validarCredenciales("a@a.com", "b", "INVALIDO");
      expect(result.ok).toBeFalse();
    });
  });

  describe('guardarUsuarioSesion()', function () {
    it('Debe guardar currentUser en localStorage', function () {
      var ok = window.LoginLogic.guardarUsuarioSesion("test@test.com", "user");
      expect(ok).toBeTrue();
      var data = JSON.parse(localStorage.getItem("currentUser"));
      expect(data.email).toBe("test@test.com");
      expect(data.role).toBe("user");
    });

    it('Debe devolver false si faltan datos', function () {
      var ok = window.LoginLogic.guardarUsuarioSesion("", "");
      expect(ok).toBeFalse();
    });

    it('Debe devolver false si localStorage falla', function () {
      spyOn(localStorage, 'setItem').and.throwError("Falla de almacenamiento");
      var ok = window.LoginLogic.guardarUsuarioSesion("x", "y");
      expect(ok).toBeFalse();
    });
  });

  describe('obtenerDestinoRedireccion()', function () {
    it('Debe devolver "/" para usuarios normales', function () {
      var res = { ok: true, destino: "/" };
      var out = window.LoginLogic.obtenerDestinoRedireccion(res);
      expect(out).toBe("/");
    });

    it('Debe devolver null si el resultado no es válido', function () {
      var out = window.LoginLogic.obtenerDestinoRedireccion({ ok: false });
      expect(out).toBeNull();
    });

    it('Debe devolver "/administrador" para admin', function () {
      var res = { ok: true, destino: "/administrador" };
      var out = window.LoginLogic.obtenerDestinoRedireccion(res);
      expect(out).toBe("/administrador");
    });
  });

});
