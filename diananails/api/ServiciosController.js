import { api } from "./ApiService";

export const obtenerServicios = async () => {
    try {
        const servicios = await api("GET", "get-servicios"); // Llamamos al servicio
        return servicios;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const nuevoServicio = async (nombre, precio, tiempoRequerido) => {
    try {
        const nuevoServicio = await api("POST", "nuevo-servicio", {nombre: nombre, precio: precio, horas_requeridas: tiempoRequerido}); // Llamamos al servicio
        return nuevoServicio;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const obtenerServicio = async (servicio) => {
    try {
        const datosServicio = await api("POST", "get-servicio", {idServicio: servicio}); // Llamamos al servicio
        return datosServicio;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const actualizarServicio = async (id, nombre, precio, tiempoRequerido) => {
    try {
        const servicioActualizado = await api("PUT", "update-servicio", {idServicio: id, nombre: nombre, precio: precio, horas_requeridas: tiempoRequerido}); // Llamamos al servicio
        return servicioActualizado;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};


