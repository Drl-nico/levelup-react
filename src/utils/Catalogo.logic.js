const baseProducts = [
  { id: 1, title: "PlayStation 5", category: "Consolas", price: 549990 },
  { id: 2, title: "PC Gamer ASUS ROG Strix", category: "Computadores Gamers", price: 1299990 },
  { id: 3, title: "Silla Gamer Secretlab Titan", category: "Muebles", price: 349990 },
  { id: 4, title: "Catan", category: "Juegos de Mesa", price: 29990 },
  { id: 5, title: "Audífonos Gamer HyperX Cloud II", category: "Accesorios", price: 79990 },
  { id: 6, title: "Joystick Xbox Series X", category: "Accesorios", price: 59990 },
  { id: 7, title: "Carcassonne", category: "Juegos de Mesa", price: 24990 },
  { id: 8, title: "Mouse Logitech G502 HERO", category: "Accesorios", price: 49990 },
  { id: 9, title: "Mousepad Razer Goliathus", category: "Accesorios", price: 29990 },
  { id: 10, title: "Polera Gamer Personalizada 'Level-Up'", category: "Merchandising", price: 14990 },
];

// Obtiene categorías únicas desde la lista de productos
function getCategories(products) {
  const set = new Set(products.map(p => p.category));
  return Array.from(set);
}

// Aplica filtro de búsqueda por categoría o título
function getFilteredProducts(products, filter) {
  const f = filter.trim().toLowerCase();
  if (!f || f === "all") return products;
  return products.filter(
    (p) => p.category.toLowerCase().includes(f) || p.title.toLowerCase().includes(f)
  );
}

// Exponemos las funciones para Jasmine + Karma
window.catalogoLogic = {
  baseProducts,
  getCategories,
  getFilteredProducts
};