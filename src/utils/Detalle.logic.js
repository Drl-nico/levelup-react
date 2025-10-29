window.detalleLogic = {
  // Retorna los datos del producto mostrado en el detalle
  getProductInfo() {
    return {
      name: "PlayStation 5",
      price: 499.99,
      features: [
        "Procesador AMD Ryzen Zen 2",
        "Unidad SSD ultra rápida",
        "Compatibilidad con juegos en 4K",
        "Control inalámbrico DualSense",
      ],
    };
  },

  // Verifica si un producto tiene todos los campos requeridos
  isValidProduct(product) {
    return (
      product &&
      typeof product.name === "string" &&
      typeof product.price === "number" &&
      Array.isArray(product.features) &&
      product.features.length > 0
    );
  },

  // Formatea el precio con el símbolo de dólar y dos decimales
  formatPrice(price) {
    return `$${price.toFixed(2)}`;
  },

  // Simula la carga de imagen: si falla, devuelve una imagen alternativa
  getImageOrFallback(src) {
    return src || "https://via.placeholder.com/600x400?text=Imagen+no+disponible";
  },
};
