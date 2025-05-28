import { createContext } from 'react'; // Importamos React y creamos el contexto
import { useColorScheme } from 'react-native'; // Hook para detectar si el teléfono usa tema claro u oscuro
import { lightTheme, darkTheme } from './../themes/theme'; // Importamos los temas

// Creamos un contexto para poder compartir el tema con todos los componentes
export const ThemeContext = createContext();

// Este componente va a envolver toda la app y dar acceso al tema actual
export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme(); // Detectamos el tema del sistema
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme; // Elegimos el tema según el sistema

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
