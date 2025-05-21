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


