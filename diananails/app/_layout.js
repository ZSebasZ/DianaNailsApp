import { useFonts } from 'expo-font';
import { Slot } from "expo-router";
import { ThemeProvider } from './../contexts/themeContext';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'GantariRegular': require('./../assets/fonts/Gantari/Gantari-Regular.ttf'),
    'GantariBold': require('./../assets/fonts/Gantari/Gantari-Bold.ttf'),
    'CaveatRegular': require('./../assets/fonts/Caveat/Caveat-Regular.ttf'),
    'CaveatBold': require('./../assets/fonts/Caveat/Caveat-Bold.ttf')
  });
  return (
    <ThemeProvider>
        <Slot />
    </ThemeProvider>
  );
}