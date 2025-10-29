// cart.logic.spec.js - Pruebas unitarias para la lógica del carrito

describe('Lógica del Carrito', () => {
  let logicaCarrito;

  beforeEach(() => {
    // Cargar la lógica del carrito
    logicaCarrito = window.cartLogic;
  });

  describe('addToCart', () => {
    it('debe agregar un producto nuevo a un carrito vacío', () => {
      const itemsCarrito = [];
      const producto = { id: '1', title: 'Producto de Prueba', price: 100 };

      const resultado = logicaCarrito.addToCart(itemsCarrito, producto);

      expect(resultado.length).toBe(1);
      expect(resultado[0]).toEqual({ id: '1', title: 'Producto de Prueba', price: 100, quantity: 1 });
    });

    it('debe aumentar la cantidad de un producto existente', () => {
      const itemsCarrito = [{ id: '1', title: 'Producto de Prueba', price: 100, quantity: 1 }];
      const producto = { id: '1', title: 'Producto de Prueba', price: 100 };

      const resultado = logicaCarrito.addToCart(itemsCarrito, producto);

      expect(resultado.length).toBe(1);
      expect(resultado[0].quantity).toBe(2);
    });

    it('debe agregar productos diferentes por separado', () => {
      const itemsCarrito = [{ id: '1', title: 'Producto 1', price: 100, quantity: 1 }];
      const producto = { id: '2', title: 'Producto 2', price: 200 };

      const resultado = logicaCarrito.addToCart(itemsCarrito, producto);

      expect(resultado.length).toBe(2);
      expect(resultado[1]).toEqual({ id: '2', title: 'Producto 2', price: 200, quantity: 1 });
    });
  });

  describe('removeFromCart', () => {
    it('debe remover un producto del carrito', () => {
      const itemsCarrito = [
        { id: '1', title: 'Producto 1', price: 100, quantity: 1 },
        { id: '2', title: 'Producto 2', price: 200, quantity: 1 }
      ];

      const resultado = logicaCarrito.removeFromCart(itemsCarrito, '1');

      expect(resultado.length).toBe(1);
      expect(resultado[0].id).toBe('2');
    });

    it('debe devolver el mismo carrito si el producto no se encuentra', () => {
      const itemsCarrito = [{ id: '1', title: 'Producto 1', price: 100, quantity: 1 }];

      const resultado = logicaCarrito.removeFromCart(itemsCarrito, '2');

      expect(resultado).toEqual(itemsCarrito);
    });
  });

  describe('updateQuantity', () => {
    it('debe actualizar la cantidad de un producto existente', () => {
      const itemsCarrito = [{ id: '1', title: 'Producto 1', price: 100, quantity: 1 }];

      const resultado = logicaCarrito.updateQuantity(itemsCarrito, '1', 3);

      expect(resultado[0].quantity).toBe(3);
    });

    it('debe remover el producto cuando la cantidad es menor a 1', () => {
      const itemsCarrito = [{ id: '1', title: 'Producto 1', price: 100, quantity: 1 }];

      const resultado = logicaCarrito.updateQuantity(itemsCarrito, '1', 0);

      expect(resultado.length).toBe(0);
    });

    it('debe devolver el mismo carrito si el producto no se encuentra', () => {
      const itemsCarrito = [{ id: '1', title: 'Producto 1', price: 100, quantity: 1 }];

      const resultado = logicaCarrito.updateQuantity(itemsCarrito, '2', 2);

      expect(resultado).toEqual(itemsCarrito);
    });
  });

  describe('calculateCartTotal', () => {
    it('debe calcular el total para un carrito vacío', () => {
      const itemsCarrito = [];

      const total = logicaCarrito.calculateCartTotal(itemsCarrito);

      expect(total).toBe(0);
    });

    it('debe calcular el total para un carrito con items', () => {
      const itemsCarrito = [
        { id: '1', title: 'Producto 1', price: 100, quantity: 2 },
        { id: '2', title: 'Producto 2', price: 200, quantity: 1 }
      ];

      const total = logicaCarrito.calculateCartTotal(itemsCarrito);

      expect(total).toBe(400); // (100 * 2) + (200 * 1)
    });
  });

  describe('calculateCartCount', () => {
    it('debe calcular el conteo para un carrito vacío', () => {
      const itemsCarrito = [];

      const conteo = logicaCarrito.calculateCartCount(itemsCarrito);

      expect(conteo).toBe(0);
    });

    it('debe calcular el conteo para un carrito con items', () => {
      const itemsCarrito = [
        { id: '1', title: 'Producto 1', price: 100, quantity: 2 },
        { id: '2', title: 'Producto 2', price: 200, quantity: 3 }
      ];

      const conteo = logicaCarrito.calculateCartCount(itemsCarrito);

      expect(conteo).toBe(5); // 2 + 3
    });
  });
});
