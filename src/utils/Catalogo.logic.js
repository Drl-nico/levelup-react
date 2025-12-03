// Función para obtener categorías únicas
function getCategories(products) {
  const set = new Set(products.map(p => p.category));
  return Array.from(set);
}

// Función para filtrar productos
function getFilteredProducts(products, filter) {
  const f = filter.trim().toLowerCase();
  if (!f || f === "all") return products;
  return products.filter(
    (p) => p.category.toLowerCase().includes(f) || p.title.toLowerCase().includes(f)
  );
}

// Export para test y utilidades
export { getCategories, getFilteredProducts };
