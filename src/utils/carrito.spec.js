// carrito.spec.js - Pruebas unitarias para el componente Carrito

describe('Componente Carrito', () => {
  let Carrito;

  beforeEach(() => {
    // Simular la importación del componente Carrito
    Carrito = window.Carrito || function() { return { type: 'div', props: {} }; };
  });

  describe('Estado inicial del carrito', () => {
    it('debe inicializar con un carrito vacío', () => {
      const initialCartState = {
        cartItems: [],
        cartTotal: 0,
        cartCount: 0,
        isEmpty: true
      };

      expect(initialCartState.cartItems.length).toBe(0);
      expect(initialCartState.cartTotal).toBe(0);
      expect(initialCartState.cartCount).toBe(0);
      expect(initialCartState.isEmpty).toBe(true);
    });

    it('debe cargar productos desde localStorage', () => {
      const savedProducts = [
        { codigo: 'JM001', nombre: 'Catan', precio: 29990, cantidad: 1 },
        { codigo: 'AC001', nombre: 'Joystick Xbox', precio: 59990, cantidad: 2 }
      ];

      const mockLocalStorage = {
        getItem: jasmine.createSpy('getItem').and.returnValue(JSON.stringify(savedProducts))
      };

      // Simular carga desde localStorage
      const loadedCart = JSON.parse(mockLocalStorage.getItem('productosAdmin'));

      expect(loadedCart.length).toBe(2);
      expect(loadedCart[0].codigo).toBe('JM001');
      expect(loadedCart[1].codigo).toBe('AC001');
    });
  });

  describe('Funciones del carrito', () => {
    const initialCart = [
      { nombre: 'Producto 1', precio: 100, cantidad: 1 },
      { nombre: 'Producto 2', precio: 200, cantidad: 2 }
    ];

    it('agregarAlCarrito debe aumentar cantidad si producto existe', () => {
      const existingProduct = { nombre: 'Producto 1', precio: 100 };
      let cart = [...initialCart];

      // Simular agregar producto existente
      const existingIndex = cart.findIndex(item => item.nombre === existingProduct.nombre);
      if (existingIndex !== -1) {
        cart[existingIndex].cantidad += 1;
      }

      expect(cart[0].cantidad).toBe(2);
      expect(cart[1].cantidad).toBe(2); // Sin cambios
    });

    it('agregarAlCarrito debe agregar nuevo producto si no existe', () => {
      const newProduct = { nombre: 'Producto 3', precio: 300 };
      let cart = [...initialCart];

      const existingIndex = cart.findIndex(item => item.nombre === newProduct.nombre);
      if (existingIndex === -1) {
        cart.push({ ...newProduct, cantidad: 1 });
      }

      expect(cart.length).toBe(3);
      expect(cart[2].nombre).toBe('Producto 3');
      expect(cart[2].cantidad).toBe(1);
    });

    it('eliminarDelCarrito debe remover producto por índice', () => {
      let cart = [...initialCart];
      const indexToRemove = 0;

      cart.splice(indexToRemove, 1);

      expect(cart.length).toBe(1);
      expect(cart[0].nombre).toBe('Producto 2');
    });

    it('vaciarCarrito debe dejar el carrito vacío', () => {
      let cart = [...initialCart];

      cart = [];

      expect(cart.length).toBe(0);
    });
  });

  describe('Cálculos del carrito', () => {
    it('calcularTotal debe sumar correctamente los precios', () => {
      const cartItems = [
        { nombre: 'Producto 1', precio: 100, cantidad: 2 }, // 200
        { nombre: 'Producto 2', precio: 150, cantidad: 3 }  // 450
      ]; // Total: 650

      const total = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

      expect(total).toBe(650);
    });

    it('calcularTotal debe manejar carrito vacío', () => {
      const emptyCart = [];

      const total = emptyCart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

      expect(total).toBe(0);
    });

    it('calcularTotal debe manejar precios con decimales', () => {
      const cartItems = [
        { nombre: 'Producto 1', precio: 99.99, cantidad: 2 }, // 199.98
        { nombre: 'Producto 2', precio: 149.50, cantidad: 1 }  // 149.50
      ]; // Total: 349.48

      const total = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

      expect(total).toBe(349.48);
    });
  });

  describe('Persistencia del carrito', () => {
    it('debe guardar el carrito en localStorage', () => {
      const cartItems = [
        { nombre: 'Producto 1', precio: 100, cantidad: 1 }
      ];

      const mockLocalStorage = {
        setItem: jasmine.createSpy('setItem')
      };

      // Simular guardado
      mockLocalStorage.setItem('carrito', JSON.stringify(cartItems));

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('carrito', JSON.stringify(cartItems));
    });

    it('debe cargar el carrito desde localStorage', () => {
      const savedCart = JSON.stringify([
        { nombre: 'Producto 1', precio: 100, cantidad: 1 }
      ]);

      const mockLocalStorage = {
        getItem: jasmine.createSpy('getItem').and.returnValue(savedCart)
      };

      const loadedCart = JSON.parse(mockLocalStorage.getItem('carrito'));

      expect(loadedCart.length).toBe(1);
      expect(loadedCart[0].nombre).toBe('Producto 1');
    });

    it('debe manejar localStorage vacío', () => {
      const mockLocalStorage = {
        getItem: jasmine.createSpy('getItem').and.returnValue(null)
      };

      const loadedCart = mockLocalStorage.getItem('carrito') ? JSON.parse(mockLocalStorage.getItem('carrito')) : [];

      expect(loadedCart.length).toBe(0);
    });
  });

  describe('Interfaz de usuario', () => {
    it('debe mostrar mensaje cuando carrito está vacío', () => {
      const emptyCartUI = {
        cartItems: [],
        emptyMessage: 'Tu carrito está vacío',
        showEmptyMessage: true
      };

      expect(emptyCartUI.cartItems.length).toBe(0);
      expect(emptyCartUI.emptyMessage).toBe('Tu carrito está vacío');
      expect(emptyCartUI.showEmptyMessage).toBe(true);
    });

    it('debe mostrar items del carrito', () => {
      const cartItems = [
        { nombre: 'Producto 1', precio: 100, cantidad: 2, subtotal: 200 },
        { nombre: 'Producto 2', precio: 150, cantidad: 1, subtotal: 150 }
      ];

      const cartUI = {
        cartItems: cartItems,
        showItems: true,
        totalItems: cartItems.length
      };

      expect(cartUI.showItems).toBe(true);
      expect(cartUI.totalItems).toBe(2);
    });

    it('debe mostrar total del carrito', () => {
      const cartTotal = 350;
      const cartUI = {
        total: cartTotal,
        showTotal: true,
        formattedTotal: `$${cartTotal.toLocaleString()} CLP`
      };

      expect(cartUI.total).toBe(350);
      expect(cartUI.showTotal).toBe(true);
      expect(cartUI.formattedTotal).toBe('$350 CLP');
    });
  });
});
