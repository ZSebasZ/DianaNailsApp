import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
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
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
    </ThemeProvider>
  );
}