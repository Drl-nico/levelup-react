describe("catalogoLogic", function () {
  const { baseProducts, getCategories, getFilteredProducts } = window.catalogoLogic;

  describe("getCategories", function () {
    it("debe retornar una lista de categorías únicas", function () {
      const result = getCategories(baseProducts);
      expect(result).toContain("Consolas");
      expect(result).toContain("Accesorios");
      expect(result).toContain("Juegos de Mesa");
      expect(result.length).toBeGreaterThan(1);
    });
  });

  describe("getFilteredProducts", function () {
    it("debe retornar todos los productos si el filtro está vacío", function () {
      const result = getFilteredProducts(baseProducts, "");
      expect(result.length).toBe(baseProducts.length);
    });

    it("debe retornar todos los productos si el filtro es 'all'", function () {
      const result = getFilteredProducts(baseProducts, "all");
      expect(result.length).toBe(baseProducts.length);
    });

    it("debe filtrar por categoría correctamente (ej. 'Accesorios')", function () {
      const result = getFilteredProducts(baseProducts, "Accesorios");
      expect(result.every(p => p.category === "Accesorios")).toBeTrue();
    });

    it("debe filtrar por parte del nombre del producto (ej. 'play')", function () {
      const result = getFilteredProducts(baseProducts, "play");
      expect(result.length).toBe(1);
      expect(result[0].title).toBe("PlayStation 5");
    });

    it("debe retornar un arreglo vacío si no hay coincidencias", function () {
      const result = getFilteredProducts(baseProducts, "Nintendo");
      expect(result.length).toBe(0);
    });

    it("no debe ser sensible a mayúsculas/minúsculas", function () {
      const lower = getFilteredProducts(baseProducts, "accesorios");
      const upper = getFilteredProducts(baseProducts, "ACCESORIOS");
      expect(lower.length).toBe(upper.length);
    });
  });
});