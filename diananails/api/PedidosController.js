import { api } from "./ApiService";

const IMGUR_CLIENT_ID = "fe29c6d3f1dde1a";

export const obtenerPedidosCliente = async (cliente, filtro) => {
    try {
        //console.log({idCliente: cliente, filtro: filtro})
        const pedidos = await api("POST", `get-pedidos-cliente`, { idCliente: cliente, filtro: filtro }); // Llamamos al servicio
        return pedidos;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const cancelarPedidoCliente = async (pedido) => {
    try {
        console.log({ idPedido: pedido })
        const pedidoCancelado = await api("DELETE", `delete-pedido-cliente`, { idPedido: pedido }); // Llamamos al servicio
        return pedidoCancelado;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const obtenerPedidosClientes = async (idAdmin, filtro) => {
    try {
        //console.log({idCliente: cliente, filtro: filtro})
        const pedidosClientes = await api("POST", `get-pedidos-clientes`, { idAdmin: idAdmin, filtro: filtro }); // Llamamos al servicio
        return pedidosClientes;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const actualizarPedidoEstado = async (pedido, filtro) => {
    try {
        //console.log({idCliente: cliente, filtro: filtro})
        const pedidoActualizado = await api("PUT", `update-estado-pedido`, { idPedido: pedido, filtro: filtro }); // Llamamos al servicio
        return pedidoActualizado;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};