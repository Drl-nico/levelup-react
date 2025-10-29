// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/utils/Carrito.logic.js',
      'src/utils/Carrito.logic.spec.js',
      'src/utils/Navbar.logic.js',
      'src/utils/Navbar.logic.spec.js',
      'src/utils/Home.logic.js',
      'src/utils/Home.logic.spec.js',
      'src/utils/Blog.logic.js',
      'src/utils/Blog.logic.spec.js',
      'src/utils/Contact.logic.js',
      'src/utils/Contact.logic.spec.js',
      'src/utils/Detalle.logic.js',
      'src/utils/Detalle.logic.spec.js',
      'src/utils/Catalogo.logic.js',
      'src/utils/Catalogo.logic.spec.js',
      'src/utils/NuevoCliente.logic.js',
      'src/utils/NuevoCliente.logic.spec.js',
      'src/utils/Login.logic.js',
      'src/utils/Login.logic.spec.js',
      'src/utils/Registro.logic.js',
      'src/utils/Registro.logic.spec.js'
    ],
    reporters: ['spec'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};