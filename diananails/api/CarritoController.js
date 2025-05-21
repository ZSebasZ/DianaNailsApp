import { api } from "./ApiService";

export const obtenerCarritoProductos = async (carrito, cliente) => {
    try {
        //console.log(`get-productos?carrito=${carrito}`)
        const carritoCliente = await api("POST", `get-carrito-productos`, { idCarrito: carrito, idCliente: cliente }); // Llamamos al servicio
        return carritoCliente;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const anadirCarritoProducto = async (carrito, producto, cantidad) => {
    try {
        //console.log(`get-productos?carrito=${carrito}`)
        const productoAnadido = await api("POST", `nuevo-carrito-producto`, { idCarrito: carrito, idProducto: producto, cantidad: cantidad }); // Llamamos al servicio
        return productoAnadido;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};
