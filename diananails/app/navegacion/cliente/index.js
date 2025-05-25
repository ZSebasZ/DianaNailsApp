// app/navegacion/cliente/index.js
import { useEffect } from "react";
import { router } from "expo-router";

export default function ClienteRedirect() {
  useEffect(() => {
    router.replace("/navegacion/cliente/(tabs-cliente)/(agendarCita)");
  }, []);

  return null; // No necesita renderizar nada
}
