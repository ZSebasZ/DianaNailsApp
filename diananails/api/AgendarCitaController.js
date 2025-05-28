import { api } from "./ApiService";

// Funcion para obtener las horas de manicuristas disponibles de la API
export const obtenerHorasManicuristasDisponibles = async (datos) => {
    try {
        const horasManicuristas = await api("POST", "get-hors-mancrts-disponibles", datos);
        return horasManicuristas;
    } catch (error) {
        throw error;
    }
};

// Funcion para agendar una cita con la API
export const agendarCita = async (datos) => {
    try {
        const citaAgendada = await api("POST", "nueva-cita", datos);
        return citaAgendada;
    } catch (error) {
        throw error;
    }
};


