import { api } from "./ApiService";

export const realizarOpinion = async (datos) => {
    try {
        const opinion = await api("POST", "nueva-opinion", datos); // Llamamos al servicio
        return opinion;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const obtenerOpiniones = async (datos) => {
    try {
        const opiniones = await api("GET", `get-opiniones?antiguedad=${datos.antiguedad}&estrellas=${datos.estrellas}`,); // Llamamos al servicio
        return opiniones;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};


