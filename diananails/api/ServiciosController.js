import { api } from "./ApiService";

export const obtenerServicios = async () => {
    try {
        const servicios = await api("GET", "get-servicios"); // Llamamos al servicio
        return servicios;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};


