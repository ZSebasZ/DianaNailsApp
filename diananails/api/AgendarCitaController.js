import { api } from "./ApiService";

export const obtenerHorasManicuristasDisponibles = async (datos) => {
    try {
        //console.log(datos)
        const horasManicuristas = await api("POST", "get-hors-mancrts-disponibles", datos); // Llamamos al servicio
        return horasManicuristas;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const agendarCita = async (datos) => {
    try {
        console.log(datos)
        const citaAgendada = await api("POST", "nueva-cita", datos); // Llamamos al servicio
        return citaAgendada;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};


