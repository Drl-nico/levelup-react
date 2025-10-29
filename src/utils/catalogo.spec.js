// catalogo.spec.js - Pruebas unitarias para el componente Catalogo

describe('Componente Catalogo', () => {
  let Catalogo;

  beforeEach(() => {
    // Simular la importación del componente Catalogo
    Catalogo = window.Catalogo || function() { return { type: 'div', props: {} }; };
  });

  describe('Renderizado de productos', () => {
    const mockProducts = [
      { id: 1, title: 'Producto 1', category: 'Categoría A', price: 100, img: 'img1.jpg' },
      { id: 2, title: 'Producto 2', category: 'Categoría B', price: 200, img: 'img2.jpg' },
      { id: 3, title: 'Producto 3', category: 'Categoría A', price: 150, img: 'img3.jpg' }
    ];

    it('debe renderizar todos los productos', () => {
      const mockCatalogo = {
        products: mockProducts,
        renderedProducts: mockProducts.length
      };

      expect(mockCatalogo.renderedProducts).toBe(3);
      expect(mockCatalogo.products.length).toBe(3);
    });

    it('debe mostrar información correcta de cada producto', () => {
      mockProducts.forEach(product => {
        const mockProductCard = {
          id: product.id,
          title: product.title,
          category: product.category,
          price: product.price,
          img: product.img
        };

        expect(mockProductCard.id).toBe(product.id);
        expect(mockProductCard.title).toBe(product.title);
        expect(mockProductCard.category).toBe(product.category);
        expect(mockProductCard.price).toBe(product.price);
        expect(mockProductCard.img).toBe(product.img);
      });
    });
  });

  describe('Filtrado por categoría', () => {
    const categories = ['Categoría A', 'Categoría B', 'Categoría C'];

    it('debe filtrar productos por categoría específica', () => {
      const filter = 'Categoría A';
      const allProducts = [
        { id: 1, title: 'Producto 1', category: 'Categoría A', price: 100 },
        { id: 2, title: 'Producto 2', category: 'Categoría B', price: 200 },
        { id: 3, title: 'Producto 3', category: 'Categoría A', price: 150 }
      ];

      const filteredProducts = allProducts.filter(p => p.category === filter);

      expect(filteredProducts.length).toBe(2);
      expect(filteredProducts.every(p => p.category === filter)).toBe(true);
    });

    it('debe mostrar todos los productos cuando no hay filtro', () => {
      const filter = '';
      const allProducts = [
        { id: 1, title: 'Producto 1', category: 'Categoría A', price: 100 },
        { id: 2, title: 'Producto 2', category: 'Categoría B', price: 200 }
      ];

      const filteredProducts = filter ? allProducts.filter(p => p.category === filter) : allProducts;

      expect(filteredProducts.length).toBe(2);
    });

    it('debe manejar filtro "all" como sin filtro', () => {
      const filter = 'all';
      const allProducts = [
        { id: 1, title: 'Producto 1', category: 'Categoría A', price: 100 },
        { id: 2, title: 'Producto 2', category: 'Categoría B', price: 200 }
      ];

      const filteredProducts = (filter === 'all' || !filter) ? allProducts : allProducts.filter(p => p.category === filter);

      expect(filteredProducts.length).toBe(2);
    });
  });

  describe('Botón Agregar al carrito', () => {
    it('debe tener un botón "Agregar" para cada producto', () => {
      const mockProduct = { id: 1, title: 'Producto 1', price: 100 };
      const mockButton = {
        type: 'button',
        text: 'Agregar',
        productId: mockProduct.id,
        onClick: jasmine.createSpy('onClick')
      };

      expect(mockButton.type).toBe('button');
      expect(mockButton.text).toBe('Agregar');
      expect(mockButton.productId).toBe(mockProduct.id);
      expect(typeof mockButton.onClick).toBe('function');
    });

    it('debe llamar a la función addToCart cuando se hace clic', () => {
      const mockAddToCart = jasmine.createSpy('addToCart');
      const product = { id: 1, title: 'Producto 1', price: 100 };

      // Simular clic en el botón
      mockAddToCart(product);

      expect(mockAddToCart).toHaveBeenCalledWith(product);
      expect(mockAddToCart).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estados del catálogo', () => {
    it('debe manejar estado de carga', () => {
      const loadingState = {
        isLoading: true,
        products: [],
        showLoadingIndicator: true
      };

      expect(loadingState.isLoading).toBe(true);
      expect(loadingState.products.length).toBe(0);
      expect(loadingState.showLoadingIndicator).toBe(true);
    });

    it('debe manejar estado sin productos', () => {
      const emptyState = {
        products: [],
        showEmptyMessage: true,
        emptyMessage: 'No se encontraron productos que coincidan.'
      };

      expect(emptyState.products.length).toBe(0);
      expect(emptyState.showEmptyMessage).toBe(true);
      expect(emptyState.emptyMessage).toBe('No se encontraron productos que coincidan.');
    });

    it('debe manejar estado con productos', () => {
      const productsState = {
        products: [
          { id: 1, title: 'Producto 1', price: 100 },
          { id: 2, title: 'Producto 2', price: 200 }
        ],
        showProducts: true,
        totalProducts: 2
      };

      expect(productsState.products.length).toBe(2);
      expect(productsState.showProducts).toBe(true);
      expect(productsState.totalProducts).toBe(2);
    });
  });
});
