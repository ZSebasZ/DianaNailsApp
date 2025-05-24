import { api } from "./ApiService";

export const obtenerCitas = async (idCliente) => {
    try {
        const citasCliente = await api("GET", `get-citas-cliente/${idCliente}`); // Llamamos al servicio
        return citasCliente;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const cancelarCita = async (idCliente, idCita) => {
    try {
        const citaEliminada = await api("DELETE", `delete-cita-cliente/${idCliente}/${idCita}`); // Llamamos al servicio
        return citaEliminada;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const obtenerCitasClientes = async (idAdmin) => {
    try {
        const citasClientes = await api("POST", `get-citas-clientes`, {idAdmin: idAdmin}); // Llamamos al servicio
        return citasClientes;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const obtenerCitasPorManicurista = async (manicurista) => {
    try {
        const citasManicurista = await api("POST", `get-citas-clientes-manicurista`, {idManicurista: manicurista}); // Llamamos al servicio
        return citasManicurista;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};


