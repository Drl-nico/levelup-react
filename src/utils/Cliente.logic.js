describe("👥 clienteLogic", function () {
  const { isAdminUser, getUsuarios, deleteUsuario } = window.clienteLogic;

  // Limpia localStorage antes de cada test
  beforeEach(function () {
    localStorage.clear();
  });

  // --- Pruebas para isAdminUser ---
  describe("isAdminUser", function () {
    it("debe retornar true si el currentUser tiene rol 'admin'", function () {
      localStorage.setItem("currentUser", JSON.stringify({ role: "admin" }));
      expect(isAdminUser()).toBeTrue();
    });

    it("debe retornar false si el currentUser no tiene rol 'admin'", function () {
      localStorage.setItem("currentUser", JSON.stringify({ role: "cliente" }));
      expect(isAdminUser()).toBeFalse();
    });

    it("debe retornar false si no hay currentUser en localStorage", function () {
      expect(isAdminUser()).toBeFalse();
    });

    it("debe manejar errores de parseo JSON sin romper", function () {
      localStorage.setItem("currentUser", "{invalid-json}");
      expect(isAdminUser()).toBeFalse();
    });
  });

  // --- Pruebas para getUsuarios ---
  describe("getUsuarios", function () {
    it("debe retornar un arreglo vacío si no hay usuarios", function () {
      const result = getUsuarios();
      expect(result).toEqual([]);
    });

    it("debe retornar los usuarios almacenados", function () {
      const fakeUsers = [
        { email: "a@test.com", nombre: "Ana" },
        { email: "b@test.com", nombre: "Ben" },
      ];
      localStorage.setItem("usuarios", JSON.stringify(fakeUsers));
      const result = getUsuarios();
      expect(result.length).toBe(2);
      expect(result[0].email).toBe("a@test.com");
    });

    it("debe manejar errores de JSON sin romper", function () {
      localStorage.setItem("usuarios", "{invalid-json}");
      const result = getUsuarios();
      expect(result).toEqual([]);
    });
  });

  // --- Pruebas para deleteUsuario ---
  describe("deleteUsuario", function () {
    beforeEach(function () {
      const fakeUsers = [
        { email: "a@test.com", nombre: "Ana" },
        { email: "b@test.com", nombre: "Ben" },
      ];
      localStorage.setItem("usuarios", JSON.stringify(fakeUsers));
    });

    it("debe eliminar al usuario indicado por su email", function () {
      const nuevos = deleteUsuario("a@test.com");
      expect(nuevos.length).toBe(1);
      expect(nuevos[0].email).toBe("b@test.com");
    });

    it("debe dejar la lista igual si el email no existe", function () {
      const nuevos = deleteUsuario("noexiste@test.com");
      expect(nuevos.length).toBe(2);
    });

    it("debe actualizar el localStorage correctamente", function () {
      deleteUsuario("a@test.com");
      const guardados = JSON.parse(localStorage.getItem("usuarios"));
      expect(guardados.length).toBe(1);
    });
  });
});