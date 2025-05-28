import { api } from "./ApiService";

// Funcion para obtener los pedidos de la API
export const obtenerPedidosCliente = async (cliente, filtro) => {
    try {
        const pedidos = await api("POST", `get-pedidos-cliente`, { idCliente: cliente, filtro: filtro });
        return pedidos;
    } catch (error) {
        throw error;
    }
};

// Funcion para cancelar el pedido de un cliente con la API
export const cancelarPedidoCliente = async (pedido) => {
    try {
        console.log({ idPedido: pedido })
        const pedidoCancelado = await api("DELETE", `delete-pedido-cliente`, { idPedido: pedido });
        return pedidoCancelado;
    } catch (error) {
        throw error;
    }
};

// Funcion para obtener los pedidos de los clientes de la API
export const obtenerPedidosClientes = async (idAdmin, filtro) => {
    try {
        const pedidosClientes = await api("POST", `get-pedidos-clientes`, { idAdmin: idAdmin, filtro: filtro });
        return pedidosClientes;
    } catch (error) {
        throw error;
    }
};

// Funcion para actualizar el estado del pedido con la API
export const actualizarPedidoEstado = async (pedido, filtro) => {
    try {
        const pedidoActualizado = await api("PUT", `update-estado-pedido`, { idPedido: pedido, filtro: filtro });
        return pedidoActualizado;
    } catch (error) {
        throw error;
    }
};