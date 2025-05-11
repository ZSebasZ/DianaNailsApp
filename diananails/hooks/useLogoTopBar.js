// hooks/useLogo.js
import { useColorScheme } from 'react-native';

export const useLogoTopBar = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark'
    ? require('../assets/images/logoTopBarDark.png')
    : require('../assets/images/logoTopBarLight.png');
};
