// app/navegacion/cliente/_layout.js
import { Stack } from "expo-router";
import { CarritoProvider } from "../../../contexts/carritoContext";

export default function ClienteLayout() {
  //Envolvemos el Stack con el proveedor de carrito
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
