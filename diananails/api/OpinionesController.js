import { api } from "./ApiService";

// Funcion para realizar una nueva opinion con la API
export const realizarOpinion = async (datos) => {
    try {
        const opinion = await api("POST", "nueva-opinion", datos);
        return opinion;
    } catch (error) {
        throw error;
    }
};

// Funcion para obtener las opiniones de la API
export const obtenerOpiniones = async (datos) => {
    try {
        const opiniones = await api("GET", `get-opiniones?antiguedad=${datos.antiguedad}&estrellas=${datos.estrellas}`,);
        return opiniones;
    } catch (error) {
        throw error;
    }
};


