describe("contactLogic", function () {
  const { isEmail, isPhone, validate } = window.contactLogic;

  describe("isEmail()", function () {
    it("debe validar un correo con formato correcto", function () {
      expect(isEmail("usuario@correo.com")).toBeTrue();
    });

    it("debe rechazar un correo sin @ o dominio", function () {
      expect(isEmail("usuario.com")).toBeFalse();
      expect(isEmail("usuario@correo")).toBeFalse();
    });
  });

  describe("isPhone()", function () {
    it("debe aceptar teléfono vacío (opcional)", function () {
      expect(isPhone("")).toBeTrue();
    });

    it("debe aceptar un número válido con código internacional", function () {
      expect(isPhone("+56912345678")).toBeTrue();
    });

    it("debe rechazar un número demasiado corto", function () {
      expect(isPhone("123")).toBeFalse();
    });

    it("debe rechazar un número con letras", function () {
      expect(isPhone("+56abc123")).toBeFalse();
    });
  });

  describe("validate()", function () {
    it("debe devolver errores cuando los campos están vacíos", function () {
      const values = { name: "", email: "", phone: "", message: "" };
      const errors = validate(values);

      expect(errors.name).toBe("El nombre es obligatorio.");
      expect(errors.email).toBe("El email es obligatorio.");
      expect(errors.message).toBe("El mensaje es obligatorio.");
    });

    it("debe devolver error de formato para email inválido", function () {
      const values = {
        name: "Juan",
        email: "correo_invalido",
        phone: "",
        message: "Hola",
      };
      const errors = validate(values);

      expect(errors.email).toBe("Formato de email no válido.");
    });

    it("debe devolver error si el teléfono no cumple el patrón", function () {
      const values = {
        name: "Juan",
        email: "juan@correo.com",
        phone: "1234",
        message: "Hola",
      };
      const errors = validate(values);

      expect(errors.phone).toBe(
        "El teléfono debe tener 7 a 15 dígitos (opcional)."
      );
    });

    it("no debe devolver errores cuando los datos son válidos", function () {
      const values = {
        name: "María",
        email: "maria@correo.com",
        phone: "+56912345678",
        message: "Consulta general",
      };
      const errors = validate(values);

      expect(Object.keys(errors).length).toBe(0);
    });
  });
});
