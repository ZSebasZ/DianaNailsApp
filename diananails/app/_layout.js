import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { ThemeProvider } from './../contexts/themeContext';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'GantariRegular': require('./../assets/fonts/Gantari/Gantari-Regular.ttf'),
    'GantariBold': require('./../assets/fonts/Gantari/Gantari-Bold.ttf'),
    'CaveatRegular': require('./../assets/fonts/Caveat/Caveat-Regular.ttf'),
    'CaveatBold': require('./../assets/fonts/Caveat/Caveat-Bold.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // o un splash temporal
  }
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