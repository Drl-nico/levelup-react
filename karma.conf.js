// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/utils/cart.logic.js', // Incluye la lógica del carrito primero
      'src/utils/cart.logic.spec.js' // Luego el archivo de prueba
    ],
    reporters: ['spec'], // Reporter legible
    browsers: ['ChromeHeadless'], // Ejecuta en modo invisible
    singleRun: true, // Corre una vez y termina
    concurrency: Infinity
  });
};
