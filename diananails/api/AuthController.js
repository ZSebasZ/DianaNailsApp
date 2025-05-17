import { api } from "./ApiService";

export const registroCliente = async (datos) => {
    try {
        const clienteRegistrado = await api("POST", "register-cliente", datos); // Llamamos al servicio
        return clienteRegistrado;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const loginCliente = async (datos) => {
    try {
        const clienteLogueado = await api("POST", "login", datos); // Llamamos al servicio
        return clienteLogueado;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};