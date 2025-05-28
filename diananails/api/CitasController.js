import { api } from "./ApiService";

// Funcion para obtener las citas de la API
export const obtenerCitas = async (idCliente) => {
    try {
        const citasCliente = await api("GET", `get-citas-cliente/${idCliente}`);
        return citasCliente;
    } catch (error) {
        throw error;
    }
};

// Funcion para cancelar la cita de la API
export const cancelarCita = async (idCliente, idCita) => {
    try {
        const citaEliminada = await api("DELETE", `delete-cita-cliente/${idCliente}/${idCita}`);
        return citaEliminada;
    } catch (error) {
        throw error;
    }
};

// Funcion para obtener las citas de los clientes de la API
export const obtenerCitasClientes = async (idAdmin) => {
    try {
        const citasClientes = await api("POST", `get-citas-clientes`, {idAdmin: idAdmin});
        return citasClientes;
    } catch (error) {
        throw error;
    }
};

// Funcion para obtener las citas de las manicuristas de la API
export const obtenerCitasPorManicurista = async (manicurista) => {
    try {
        const citasManicurista = await api("POST", `get-citas-clientes-manicurista`, {idManicurista: manicurista});
        return citasManicurista;
    } catch (error) {
        throw error;
    }
};


