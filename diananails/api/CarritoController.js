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

export const actualizarCarritoCantidadProducto = async (carrito, producto, cantidad) => {
    try {
        //console.log(`get-productos?carrito=${carrito}`)
        const productoAnadido = await api("PATCH", `update-carrito-producto`, { idCarrito: carrito, idProducto: producto, cantidad: cantidad }); // Llamamos al servicio
        return productoAnadido;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const hacerPedidoCarrito = async (carrito, cliente, metodoPago, total) => {
    try {
        //console.log(`get-productos?carrito=${carrito}`)
        const productoAnadido = await api("PATCH", `nuevo-pedido-cliente`, {idCarrito: carrito, idCliente: cliente, idMetodoPago: metodoPago, total: total}); // Llamamos al servicio
        return productoAnadido;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const vaciarCarrito = async (carrito) => {
    try {
        //console.log(`get-productos?carrito=${carrito}`)
        const carritoVaciado = await api("DELETE", `vaciar-carrito`, {idCarrito: carrito}); // Llamamos al servicio
        return carritoVaciado;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};