// app/navegacion/cliente/index.js
import { useEffect } from "react";
import { router } from "expo-router";

export default function ManicuristaRedirect() {
  useEffect(() => {
    router.replace("/navegacion/manicurista/(tabs-manicurista)/citas");
  }, []);

  return null; // No necesita renderizar nada
}
