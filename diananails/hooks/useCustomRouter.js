import { useContext, useEffect } from "react";
import { NavigationContainerRefContext } from "@react-navigation/native";
import { navigationRef } from "../utils/navigationRef";

export function useCustomRouter() {
  // Accedemos al objeto de navegación desde el contexto
  const nav = useContext(NavigationContainerRefContext);

  useEffect(() => {
    // Si el navegador ya esta listo y aun no esta registrado,lo asignamos a nuestro navigationRef global
    if (nav && !navigationRef.isReady()) {
      navigationRef.current = nav;
    }
  }, [nav]);
}
