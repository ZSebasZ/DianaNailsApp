import { createNavigationContainerRef } from "@react-navigation/native";

// Exportamos una referencia global de navegación principalmente para hacer un reset a la hora de cerrar la sesion
export const navigationRef = createNavigationContainerRef();