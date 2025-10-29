describe("detalleLogic", function () {
  const { getProductInfo, isValidProduct, formatPrice, getImageOrFallback } = window.detalleLogic;

  describe("getProductInfo()", function () {
    it("debe devolver el nombre del producto correctamente", function () {
      const product = getProductInfo();
      expect(product.name).toBe("PlayStation 5");
    });

    it("debe contener una lista de características", function () {
      const product = getProductInfo();
      expect(Array.isArray(product.features)).toBeTrue();
      expect(product.features.length).toBeGreaterThan(0);
    });

    it("debe devolver un precio numérico", function () {
      const product = getProductInfo();
      expect(typeof product.price).toBe("number");
    });
  });

  describe("isValidProduct()", function () {
    it("debe validar correctamente un producto completo", function () {
      const validProduct = {
        name: "PlayStation 5",
        price: 499.99,
        features: ["SSD", "4K"],
      };
      expect(isValidProduct(validProduct)).toBeTrue();
    });

    it("debe rechazar un producto sin nombre o precio", function () {
      const invalidProduct = { features: ["SSD"] };
      expect(isValidProduct(invalidProduct)).toBeFalse();
    });

    it("debe rechazar un producto con lista vacía de características", function () {
      const invalidProduct = { name: "PS5", price: 499.99, features: [] };
      expect(isValidProduct(invalidProduct)).toBeFalse();
    });
  });

  describe("formatPrice()", function () {
    it("debe formatear correctamente el precio con el símbolo $", function () {
      const result = formatPrice(499.99);
      expect(result).toBe("$499.99");
    });

    it("debe incluir dos decimales incluso si el número es entero", function () {
      const result = formatPrice(500);
      expect(result).toBe("$500.00");
    });
  });

  describe("getImageOrFallback()", function () {
    it("debe devolver la imagen proporcionada si existe", function () {
      const src = "imagen.jpg";
      const result = getImageOrFallback(src);
      expect(result).toBe("imagen.jpg");
    });

    it("debe devolver imagen de respaldo si el src es nulo", function () {
      const result = getImageOrFallback(null);
      expect(result).toContain("placeholder.com");
    });
  });
});
