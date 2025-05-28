import { useColorScheme } from 'react-native';

// Hook para detectar si el teléfono usa tema claro u oscuro y devolver la imagen correspondiente
export const useLogoTopBar = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark'
    ? require('../assets/images/logoTopBarDark.png')
    : require('../assets/images/logoTopBarLight.png');
};
