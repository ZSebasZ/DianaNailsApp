import { useColorScheme } from 'react-native';

// Hook para detectar si el teléfono usa tema claro u oscuro y devolver la imagen correspondiente
export const useLogoPrincipal = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark'
    ? require('../assets/images/logo_dark.png')
    : require('../assets/images/logo_light.png');
};
