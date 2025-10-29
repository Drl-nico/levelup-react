describe('HomeLogic', function () {
  describe('obtenerProductos()', function () {
    it('Debe devolver una lista de productos', function () {
      var productos = window.HomeLogic.obtenerProductos();
      expect(Array.isArray(productos)).toBeTrue();
      expect(productos.length).toBe(3);
    });

    it('Cada producto debe tener id, title, price, img, href y alt', function () {
      var productos = window.HomeLogic.obtenerProductos();
      productos.forEach(function (p) {
        expect(p.id).toBeDefined();
        expect(p.title).toBeDefined();
        expect(p.price).toBeDefined();
        expect(p.img).toBeDefined();
        expect(p.href).toBeDefined();
        expect(p.alt).toBeDefined();
      });
    });

    it('El primer producto debe ser la PlayStation 5', function () {
      var productos = window.HomeLogic.obtenerProductos();
      expect(productos[0].title).toBe("PlayStation 5");
    });
  });


  describe('manejarErrorImagen()', function () {
    it('Debe asignar una imagen de respaldo al producirse un error', function () {
      var fakeEvent = {
        currentTarget: { src: '', onerror: function () {} }
      };
      var nuevoSrc = window.HomeLogic.manejarErrorImagen(fakeEvent);
      expect(nuevoSrc).toContain('placeholder.com');
    });

    it('Debe devolver null si no se pasa evento', function () {
      var result = window.HomeLogic.manejarErrorImagen(null);
      expect(result).toBeNull();
    });

    it('Debe eliminar la propiedad onerror después de ejecutar', function () {
      var fake = { currentTarget: { onerror: function () {}, src: '' } };
      window.HomeLogic.manejarErrorImagen(fake);
      expect(fake.currentTarget.onerror).toBeNull();
    });
  });

  describe('validarEnlaceProducto()', function () {
    it('Debe devolver true si el href empieza con /Detalle', function () {
      var producto = { href: "/Detalle3" };
      var esValido = window.HomeLogic.validarEnlaceProducto(producto);
      expect(esValido).toBeTrue();
    });

    it('Debe devolver false si el href no empieza con /Detalle', function () {
      var producto = { href: "/otraRuta" };
      var esValido = window.HomeLogic.validarEnlaceProducto(producto);
      expect(esValido).toBeFalse();
    });

    it('Debe devolver false si el producto es nulo', function () {
      var esValido = window.HomeLogic.validarEnlaceProducto(null);
      expect(esValido).toBeFalse();
    });
  });

});