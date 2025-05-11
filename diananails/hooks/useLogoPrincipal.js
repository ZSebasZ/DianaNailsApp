// hooks/useLogo.js
import { useColorScheme } from 'react-native';

export const useLogoPrincipal = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark'
    ? require('../assets/images/logoDark.png')
    : require('../assets/images/logoLight.png');
};
