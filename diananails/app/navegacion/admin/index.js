import { useEffect } from "react";
import { router } from "expo-router";

export default function AdminRedirect() {
  // Redirigir a la pantalla de citas
  useEffect(() => {
    router.replace("/navegacion/admin/(tabs-admin)/citas");
  }, []);

  return null; // No necesita renderizar nada
}
