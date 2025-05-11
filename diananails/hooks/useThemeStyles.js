import { useContext } from "react"; //Importamos el hook useContext de React para acceder al contexto de tema
import { ThemeContext } from "../contexts/themeContext"; //Importamos el contexto de tema que hemos creado
import { useSafeAreaInsets } from "react-native-safe-area-context";

/*
useThemedStyles es un hook personalizado que permite aplicar estilos
dinamicamente basados en el tema actual de la aplicación (oscuro o claro).
Este hook toma una función `styleGenerator` que define los estilos y la adapta
según el tema (colores) actual.
*/
export const useThemedStyles = (styleGenerator, usarInsets = false) => {
  //Obtenemos los colores actuales del contexto de tema
  const { colors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  //Llamamos a la función styleGenerator con los colores actuales y devolvemos los estilos generados
  //Esto permite que los estilos se actualicen automáticamente cuando el tema cambia
  if (styleGenerator === undefined) {
    return colors;
  } else {
    if (usarInsets == true) {
      return styleGenerator(colors, insets);
    } else {
      return styleGenerator(colors);
    }
  }
};
