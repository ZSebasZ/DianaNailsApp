import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { ThemeProvider } from './../contexts/themeContext';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/authContext';

export default function Layout() {
  //Cargamos las fuentes
  const [fontsLoaded] = useFonts({
    'GantariRegular': require('./../assets/fonts/Gantari/Gantari-Regular.ttf'),
    'GantariBold': require('./../assets/fonts/Gantari/Gantari-Bold.ttf'),
    'CaveatRegular': require('./../assets/fonts/Caveat/Caveat-Regular.ttf'),
    'CaveatBold': require('./../assets/fonts/Caveat/Caveat-Bold.ttf')
  });

  //Esperamos a que las fuentes se carguen
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // o un splash temporal
  }
  return (
    <AuthProvider>
        <ThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
        </ThemeProvider>
    </AuthProvider>

  );
}