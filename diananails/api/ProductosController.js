import { api } from "./ApiService";

export const obtenerProductosTienda = async (carrito) => {
    try {
        //console.log(`get-productos?carrito=${carrito}`)
        const productos = await api("GET", `get-productos?carrito=${carrito}`,); // Llamamos al servicio
        return productos;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const obtenerProductoDetalles = async (carrito, producto) => {
    try {
        //console.log(`get-productos?carrito=${carrito}`)
        const productoDetalles = await api("GET", `get-producto-detalles?carrito=${carrito}&producto=${producto}`,); // Llamamos al servicio
        return productoDetalles;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};


