// app/navegacion/cliente/_layout.js
import { Slot, Stack } from "expo-router";
import { CarritoProvider } from "../../../contexts/carritoContext";
import BarraSuperior from "../../../components/BarraSuperior";

export default function ClienteLayout() {
  return (
    <CarritoProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      ></Stack>
    </CarritoProvider>
  );
}
