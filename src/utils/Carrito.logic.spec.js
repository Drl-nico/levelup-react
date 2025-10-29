describe('CarritoLogic', function () {
  
  var productosBase, carritoVacio;

  beforeEach(function () {
    productosBase = [
      { id: 'P1', title: 'Mouse', price: 10000, img: 'img1', category: 'Accesorios' },
      { id: 'P2', title: 'Teclado', price: 20000, img: 'img2', category: 'Accesorios' }
    ];
    carritoVacio = [];
  });

  describe('inicializarProductos()', function () {
    it('Debe devolver productos iniciales si no hay localStorage', function () {
      var resultado = window.CarritoLogic.inicializarProductos(productosBase);
      expect(resultado.length).toBe(2);
    });

    it('Debe devolver productos del localStorage si existen', function () {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{ id: 'P3' }]));
      var resultado = window.CarritoLogic.inicializarProductos(productosBase);
      expect(resultado[0].id).toBe('P3');
    });

    it('Debe devolver iniciales si el JSON es inválido', function () {
      spyOn(localStorage, 'getItem').and.returnValue('INVALIDO');
      var resultado = window.CarritoLogic.inicializarProductos(productosBase);
      expect(resultado.length).toBe(2);
    });
  });


  describe('agregarAlCarrito()', function () {
    it('Debe agregar un nuevo producto al carrito vacío', function () {
      var result = window.CarritoLogic.agregarAlCarrito(carritoVacio, productosBase[0]);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('P1');
    });

    it('Debe aumentar cantidad si el producto ya existe', function () {
      var cart = [{ id: 'P1', quantity: 1, title: 'Mouse', price: 10000 }];
      var result = window.CarritoLogic.agregarAlCarrito(cart, productosBase[0]);
      expect(result[0].quantity).toBe(2);
    });

    it('Debe ignorar si el producto es nulo', function () {
      var result = window.CarritoLogic.agregarAlCarrito(carritoVacio, null);
      expect(result.length).toBe(0);
    });
  });


  describe('eliminarDelCarrito()', function () {
    it('Debe eliminar el producto con el ID indicado', function () {
      var cart = [{ id: 'P1' }, { id: 'P2' }];
      var result = window.CarritoLogic.eliminarDelCarrito(cart, 'P1');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('P2');
    });

    it('Debe devolver el mismo carrito si el ID no existe', function () {
      var cart = [{ id: 'P1' }];
      var result = window.CarritoLogic.eliminarDelCarrito(cart, 'P3');
      expect(result.length).toBe(1);
    });

    it('Debe manejar ID nulo sin error', function () {
      var result = window.CarritoLogic.eliminarDelCarrito([{ id: 'X' }], null);
      expect(result.length).toBe(1);
    });
  });

  describe('actualizarCantidad()', function () {
    it('Debe actualizar la cantidad de un producto existente', function () {
      var cart = [{ id: 'P1', quantity: 1 }];
      var result = window.CarritoLogic.actualizarCantidad(cart, 'P1', 3);
      expect(result[0].quantity).toBe(3);
    });

    it('Debe ignorar si el ID no existe', function () {
      var cart = [{ id: 'P1', quantity: 1 }];
      var result = window.CarritoLogic.actualizarCantidad(cart, 'P2', 2);
      expect(result[0].quantity).toBe(1);
    });

    it('Debe ignorar cantidades inválidas', function () {
      var cart = [{ id: 'P1', quantity: 1 }];
      var result = window.CarritoLogic.actualizarCantidad(cart, 'P1', 0);
      expect(result[0].quantity).toBe(1);
    });
  });

  describe('calcularTotal()', function () {
    it('Debe calcular correctamente el total', function () {
      var cart = [
        { price: 1000, quantity: 2 },
        { price: 500, quantity: 1 }
      ];
      var result = window.CarritoLogic.calcularTotal(cart);
      expect(result).toBe(2500);
    });

    it('Debe devolver 0 si el carrito está vacío', function () {
      var result = window.CarritoLogic.calcularTotal([]);
      expect(result).toBe(0);
    });

    it('Debe manejar entradas no válidas', function () {
      var result = window.CarritoLogic.calcularTotal(null);
      expect(result).toBe(0);
    });
  });

});