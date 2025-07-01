// babel.config.js
//este codigo lo que hace es configurar Babel para que use el preset de Expo y el plugin de Reanimated.
// Babel es el compilador que transforma nuestro código moderno de JavaScript/TypeScript a un formato que pueda entender React Native y otros entornos.
// El preset de Expo incluye todas las configuraciones necesarias para que nuestra app funcione correctamente con Expo.
// El plugin de Reanimated es necesario para que las animaciones de Reanimated funcionen correctamente
module.exports = function (api) {
  api.cache(true);
  return {
    // 1) Preset de Expo por defecto
    presets: ['babel-preset-expo'],
    plugins: [
      // 2) Plugin de Reanimated: debe ir primero para inicializar correctamente reanimated
      'react-native-reanimated/plugin',
      // aquí se puede añadir más plugins si los necesitaramos
    ],
  };
};