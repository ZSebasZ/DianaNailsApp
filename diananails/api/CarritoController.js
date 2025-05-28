import { api } from "./ApiService";

// Funciones para obtener los productos del carrito de la API
export const obtenerCarritoProductos = async (carrito, cliente) => {
    try {
        const carritoCliente = await api("POST", `get-carrito-productos`, { idCarrito: carrito, idCliente: cliente });
        return carritoCliente;
    } catch (error) {
        throw error;
    }
};

// Funcion para añadir un producto al carrito con la API
export const anadirCarritoProducto = async (carrito, producto, cantidad) => {
    try {
        const productoAnadido = await api("POST", `nuevo-carrito-producto`, { idCarrito: carrito, idProducto: producto, cantidad: cantidad });
        return productoAnadido;
    } catch (error) {
        throw error;
    }
};

// Funcion para actualizar la cantidad de un producto en el carrito con la API
export const actualizarCarritoCantidadProducto = async (carrito, producto, cantidad) => {
    try {
        const productoAnadido = await api("PATCH", `update-carrito-producto`, { idCarrito: carrito, idProducto: producto, cantidad: cantidad });
        return productoAnadido;
    } catch (error) {
        throw error;
    }
};

// Funcion para hacer el pedido del carrito con la API
export const hacerPedidoCarrito = async (carrito, cliente, metodoPago, total) => {
    try {
        const productoAnadido = await api("PATCH", `nuevo-pedido-cliente`, {idCarrito: carrito, idCliente: cliente, idMetodoPago: metodoPago, total: total});
        return productoAnadido;
    } catch (error) {
        throw error;
    }
};

// Funcion para vaciar el carrito con la API
export const vaciarCarrito = async (carrito) => {
    try {
        const carritoVaciado = await api("DELETE", `vaciar-carrito`, {idCarrito: carrito});
        return carritoVaciado;
    } catch (error) {
        throw error;
    }
};