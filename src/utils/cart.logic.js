// cart.logic.js - Lógica del carrito extraída para pruebas unitarias

// Función para agregar un producto al carrito
function addToCart(cartItems, product) {
  const existingItem = cartItems.find(item => item.id === product.id);
  if (existingItem) {
    return cartItems.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...product, quantity: 1 }];
}

// Función para remover un producto del carrito
function removeFromCart(cartItems, productId) {
  return cartItems.filter(item => item.id !== productId);
}

// Función para actualizar la cantidad de un producto
function updateQuantity(cartItems, productId, quantity) {
  if (quantity < 1) {
    return removeFromCart(cartItems, productId);
  }
  return cartItems.map(item =>
    item.id === productId ? { ...item, quantity } : item
  );
}

// Función para calcular el total del carrito
function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Función para calcular el conteo total de items en el carrito
function calculateCartCount(cartItems) {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
}

// Exponer las funciones globalmente para Karma/Jasmine
if (typeof window !== 'undefined') {
  window.cartLogic = {
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateCartTotal,
    calculateCartCount
  };
}
