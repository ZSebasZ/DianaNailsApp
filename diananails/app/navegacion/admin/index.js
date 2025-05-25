// app/navegacion/cliente/index.js
import { useEffect } from "react";
import { router } from "expo-router";

export default function AdminRedirect() {
  useEffect(() => {
    router.replace("/navegacion/admin/(tabs-admin)/citas");
  }, []);

  return null; // No necesita renderizar nada
}
