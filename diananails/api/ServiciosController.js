import { api } from "./ApiService";

// Funcion para obtener los servicios de la API
export const obtenerServicios = async () => {
    try {
        const servicios = await api("GET", "get-servicios");
        return servicios;
    } catch (error) {
        throw error;
    }
};

// Funcion para insertar un nuevo servicio con la API
export const nuevoServicio = async (nombre, precio, tiempoRequerido) => {
    try {
        const nuevoServicio = await api("POST", "nuevo-servicio", {nombre: nombre, precio: precio, horas_requeridas: tiempoRequerido});
        return nuevoServicio;
    } catch (error) {
        throw error;
    }
};

// Funcion para obtener los detalles de un servicio con la API
export const obtenerServicio = async (servicio) => {
    try {
        const datosServicio = await api("POST", "get-servicio", {idServicio: servicio});
        return datosServicio;
    } catch (error) {
        throw error;
    }
};

// Funcion para actualizar un servicio con la API
export const actualizarServicio = async (id, nombre, precio, tiempoRequerido) => {
    try {
        const servicioActualizado = await api("PUT", "update-servicio", {idServicio: id, nombre: nombre, precio: precio, horas_requeridas: tiempoRequerido});
        return servicioActualizado;
    } catch (error) {
        throw error;
    }
};


