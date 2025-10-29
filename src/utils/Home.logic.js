window.HomeLogic = {
  obtenerProductos: function () {
    return [
      {
        id: 1,
        title: "PlayStation 5",
        price: "$549,990 CLP",
        img: "ps5-producto.webp",
        href: "/Detalle",
        alt: "PlayStation 5"
      },
      {
        id: 2,
        title: "PC Gamer ASUS ROG Strix",
        price: "$1,299,990 CLP",
        img: "asus-removebg-preview.png",
        href: "/Detalle2",
        alt: "PC Gamer ASUS ROG Strix"
      },
      {
        id: 3,
        title: "Silla Gamer Secretlab Titan",
        price: "$349,990 CLP",
        img: "silla_gamer-removebg-preview(3).png",
        href: "/Detalle3",
        alt: "Silla Gamer Secretlab Titan"
      }
    ];
  },

  manejarErrorImagen: function (event) {
    if (!event || !event.currentTarget) return null;
    event.currentTarget.onerror = null;
    event.currentTarget.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';
    return event.currentTarget.src;
  },


  validarEnlaceProducto: function (producto) {
    if (!producto || !producto.href) return false;
    return producto.href.startsWith('/Detalle');
  }

};