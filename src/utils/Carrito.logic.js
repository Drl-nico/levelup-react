window.CarritoLogic = {
  inicializarProductos: function (productosIniciales) {
    if (typeof localStorage === 'undefined') return productosIniciales;
    var saved = localStorage.getItem("productosAdmin");
    try {
      return saved ? JSON.parse(saved) : productosIniciales;
    } catch (e) {
      return productosIniciales;
    }
  },

  agregarAlCarrito: function (cartItems, producto) {
    if (!producto || !producto.id) return cartItems;
    var existente = cartItems.find(function (item) {
      return item.id === producto.id;
    });
    if (existente) {
      existente.quantity += 1;
      return cartItems;
    } else {
      var nuevo = {
        id: producto.id,
        title: producto.title,
        price: producto.price,
        img: producto.img,
        category: producto.category,
        quantity: 1
      };
      cartItems.push(nuevo);
      return cartItems;
    }
  },

  eliminarDelCarrito: function (cartItems, id) {
    if (!id) return cartItems;
    return cartItems.filter(function (item) {
      return item.id !== id;
    });
  },

  actualizarCantidad: function (cartItems, id, nuevaCantidad) {
    if (!id || typeof nuevaCantidad !== 'number' || nuevaCantidad < 1) return cartItems;
    return cartItems.map(function (item) {
      if (item.id === id) {
        item.quantity = nuevaCantidad;
      }
      return item;
    });
  },

  calcularTotal: function (cartItems) {
    if (!Array.isArray(cartItems) || cartItems.length === 0) return 0;
    return cartItems.reduce(function (acc, item) {
      return acc + (item.price * item.quantity);
    }, 0);
  }
};